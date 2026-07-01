import * as SecureStore from 'expo-secure-store';

import { STORAGE_KEYS } from '@/constants/api';
import type { TokenPair } from '@/types/auth';

export async function getToken(key: string): Promise<string | null> {
  return SecureStore.getItemAsync(key);
}

export async function setToken(key: string, value: string): Promise<void> {
  await SecureStore.setItemAsync(key, value);
}

export async function deleteToken(key: string): Promise<void> {
  await SecureStore.deleteItemAsync(key);
}

export async function storeTokenPair(tokens: TokenPair): Promise<void> {
  await Promise.all([
    setToken(STORAGE_KEYS.ACCESS_TOKEN, tokens.accessToken),
    setToken(STORAGE_KEYS.REFRESH_TOKEN, tokens.refreshToken),
  ]);
}

export async function clearTokens(): Promise<void> {
  await Promise.all([
    deleteToken(STORAGE_KEYS.ACCESS_TOKEN),
    deleteToken(STORAGE_KEYS.REFRESH_TOKEN),
  ]);
}

export function getRefreshToken(): Promise<string | null> {
  return getToken(STORAGE_KEYS.REFRESH_TOKEN);
}

export function getAccessToken(): Promise<string | null> {
  return getToken(STORAGE_KEYS.ACCESS_TOKEN);
}
