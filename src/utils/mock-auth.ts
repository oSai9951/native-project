import type { LoginCredentials, TokenPair } from '@/types/auth';

/**
 * Simulated network delay (ms).
 */
const MOCK_DELAY = 1000;

/**
 * Valid test credentials for the mock.
 */
const MOCK_EMAIL = 'sai@gmail.com';
const MOCK_PASSWORD = 'Sai123456789';

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function generateToken(type: 'access' | 'refresh'): string {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(
    JSON.stringify({
      sub: '1',
      email: MOCK_EMAIL,
      type,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (type === 'access' ? 900 : 604800),
    }),
  );
  const signature = btoa(`mock-${type}-${Date.now()}`);
  return `${header}.${payload}.${signature}`;
}

function generateTokenPair(): TokenPair {
  return {
    accessToken: generateToken('access'),
    refreshToken: generateToken('refresh'),
  };
}

/**
 * Mock login — accepts `test@example.com` / `password123`.
 * Same signature as `@/api/auth.loginWithCredentials`.
 */
export async function loginWithCredentials(
  credentials: LoginCredentials,
): Promise<TokenPair> {
  await wait(MOCK_DELAY);

  if (
    credentials.email !== MOCK_EMAIL ||
    credentials.password !== MOCK_PASSWORD
  ) {
    throw new Error('Invalid email or password');
  }

  return generateTokenPair();
}

/**
 * Mock token refresh — always succeeds if a refresh token is provided.
 * Same signature as `@/api/auth.refreshTokens`.
 */
export async function refreshTokens(
  refreshToken: string,
): Promise<TokenPair> {
  await wait(MOCK_DELAY);

  if (!refreshToken) {
    throw new Error('Invalid refresh token');
  }

  return generateTokenPair();
}
