import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

// TODO: Replace with `@/api/auth` when backend is ready
import { loginWithCredentials, refreshTokens } from '@/utils/mock-auth';
import {
  clearTokens,
  getRefreshToken,
  storeTokenPair,
} from '@/lib/secure-store';
import {
  authenticateWithBiometrics,
  isBiometricAvailable,
} from '@/lib/biometrics';
import type { AuthState } from '@/types/auth';

/* ── Context shape ────────────────────────────────────────────────── */

interface AuthContextValue {
  state: AuthState;
  login: (email: string, password: string) => Promise<void>;
  loginWithBiometric: () => Promise<void>;
  logout: () => Promise<void>;
  skipBiometric: () => void;
  hasBiometrics: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

/* ── Provider ─────────────────────────────────────────────────────── */

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    status: 'loading',
    accessToken: null,
  });
  const [hasBiometrics, setHasBiometrics] = useState(false);

  /* Determine initial auth state on mount */
  useEffect(() => {
    (async () => {
      try {
        const [refreshToken, biometricAvailable] = await Promise.all([
          getRefreshToken(),
          isBiometricAvailable(),
        ]);

        setHasBiometrics(biometricAvailable);

        if (refreshToken && biometricAvailable) {
          // Has stored token + biometrics → prompt biometric gate
          setState({ status: 'biometric_prompt', accessToken: null });
        } else {
          // No token or no biometric hardware → fresh login required
          setState({ status: 'unauthenticated', accessToken: null });
        }
      } catch {
        setState({ status: 'unauthenticated', accessToken: null });
      }
    })();
  }, []);

  /* Email / password login */
  const login = useCallback(async (email: string, password: string) => {
    const tokens = await loginWithCredentials({ email, password });
    await storeTokenPair(tokens);
    setState({ status: 'authenticated', accessToken: tokens.accessToken });
  }, []);

  /* Biometric-gated token refresh */
  const loginWithBiometric = useCallback(async () => {
    const { success, error } = await authenticateWithBiometrics();
    if (!success) {
      throw new Error(error ?? 'Biometric authentication failed');
    }

    const refreshToken = await getRefreshToken();
    if (!refreshToken) {
      await clearTokens();
      setState({ status: 'unauthenticated', accessToken: null });
      throw new Error('Session expired. Please sign in again.');
    }

    const tokens = await refreshTokens(refreshToken);
    await storeTokenPair(tokens);
    setState({ status: 'authenticated', accessToken: tokens.accessToken });
  }, []);

  /* Sign out */
  const logout = useCallback(async () => {
    await clearTokens();
    setState({ status: 'unauthenticated', accessToken: null });
  }, []);

  /* Fall back to email/password from biometric screen */
  const skipBiometric = useCallback(() => {
    setState({ status: 'unauthenticated', accessToken: null });
  }, []);

  const value = useMemo(
    () => ({
      state,
      login,
      loginWithBiometric,
      logout,
      skipBiometric,
      hasBiometrics,
    }),
    [state, login, loginWithBiometric, logout, skipBiometric, hasBiometrics],
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

/* ── Hook ─────────────────────────────────────────────────────────── */

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
