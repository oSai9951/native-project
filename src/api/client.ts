import { API_BASE_URL, AUTH_ENDPOINTS } from '@/constants/api';
import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  storeTokenPair,
} from '@/lib/secure-store';
import type { TokenPair } from '@/types/auth';

/* ── Silent refresh state ─────────────────────────────────────────── */

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

function processQueue(error: unknown) {
  failedQueue.forEach(({ resolve, reject }) => {
    error ? reject(error) : resolve();
  });
  failedQueue = [];
}

async function silentRefresh(): Promise<TokenPair> {
  const refreshToken = await getRefreshToken();
  if (!refreshToken) throw new Error('No refresh token');

  const res = await fetch(`${API_BASE_URL}${AUTH_ENDPOINTS.REFRESH}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });

  if (!res.ok) throw new Error('Token refresh failed');

  const data: TokenPair = await res.json();
  await storeTokenPair(data);
  return data;
}

/* ── Authenticated fetch wrapper ──────────────────────────────────── */

/**
 * Drop-in replacement for `fetch` that:
 * 1. Attaches the stored access token as a Bearer header.
 * 2. On a 401, attempts a silent token refresh and retries once.
 * 3. Queues concurrent requests while a refresh is in-flight.
 */
export async function apiFetch(
  path: string,
  options: RequestInit = {},
): Promise<Response> {
  const accessToken = await getAccessToken();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
  };

  let res = await fetch(`${API_BASE_URL}${path}`, { ...options, headers });

  if (res.status !== 401) return res;

  /* ── 401 → attempt silent refresh ─────────────────────────── */

  if (isRefreshing) {
    // Another request is already refreshing – wait for it
    await new Promise((resolve, reject) => {
      failedQueue.push({ resolve, reject });
    });
    // Retry with the new token
    const newToken = await getAccessToken();
    if (newToken) headers.Authorization = `Bearer ${newToken}`;
    return fetch(`${API_BASE_URL}${path}`, { ...options, headers });
  }

  isRefreshing = true;

  try {
    await silentRefresh();
    processQueue(null);

    const newToken = await getAccessToken();
    if (newToken) headers.Authorization = `Bearer ${newToken}`;
    res = await fetch(`${API_BASE_URL}${path}`, { ...options, headers });
    return res;
  } catch (refreshError) {
    processQueue(refreshError);
    await clearTokens();
    throw refreshError;
  } finally {
    isRefreshing = false;
  }
}
