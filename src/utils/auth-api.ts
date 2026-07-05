/**
 * Dummy Authentication API helpers simulating network delay
 */

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

export function simulateLogin(): Promise<TokenResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        accessToken: `access_token_${Math.random().toString(36).substring(2)}`,
        refreshToken: `refresh_token_${Math.random().toString(36).substring(2)}`,
      });
    }, 1000); // 1s simulation delay
  });
}

export function simulateRefresh(oldRefreshToken: string): Promise<TokenResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        accessToken: `access_token_new_${Math.random().toString(36).substring(2)}`,
        refreshToken: `refresh_token_new_${Math.random().toString(36).substring(2)}`,
      });
    }, 1000); // 1s simulation delay
  });
}
