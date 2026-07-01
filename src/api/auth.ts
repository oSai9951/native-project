import { apiFetch } from './client';
import { AUTH_ENDPOINTS } from '@/constants/api';
import type { LoginCredentials, TokenPair } from '@/types/auth';

export async function loginWithCredentials(
  credentials: LoginCredentials,
): Promise<TokenPair> {
  const res = await apiFetch(AUTH_ENDPOINTS.LOGIN, {
    method: 'POST',
    body: JSON.stringify(credentials),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message ?? 'Login failed');
  }

  return res.json();
}

export async function refreshTokens(
  refreshToken: string,
): Promise<TokenPair> {
  const res = await apiFetch(AUTH_ENDPOINTS.REFRESH, {
    method: 'POST',
    body: JSON.stringify({ refreshToken }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message ?? 'Token refresh failed');
  }

  return res.json();
}
