import { useEffect } from 'react';
import {
  ActivityIndicator,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

import { useAuth } from '@/providers/auth-provider';
import { LoginForm } from '@/components/login-form';
import { BiometricPrompt } from '@/components/biometric-prompt';
import { AuthColors } from '@/constants/colors';

export default function IndexScreen() {
  const { state, logout } = useAuth();

  // Hide splash once auth state is determined
  useEffect(() => {
    if (state.status !== 'loading') {
      SplashScreen.hideAsync();
    }
  }, [state.status]);

  /* ── Loading ────────────────────────────────────────────────── */
  if (state.status === 'loading') {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color={AuthColors.primary} />
      </View>
    );
  }

  /* ── Biometric gate ─────────────────────────────────────────── */
  if (state.status === 'biometric_prompt') {
    return <BiometricPrompt />;
  }

  /* ── Authenticated home ─────────────────────────────────────── */
  if (state.status === 'authenticated') {
    return (
      <View style={styles.centeredContainer}>
        <View style={styles.homeContent}>
          <View style={styles.successCircle}>
            <Text style={styles.successEmoji}>✅</Text>
          </View>

          <Text style={styles.homeTitle}>You're In!</Text>
          <Text style={styles.homeSubtitle}>
            Successfully authenticated. Your tokens are securely stored.
          </Text>

          {/* Token preview card */}
          <View style={styles.tokenCard}>
            <Text style={styles.tokenLabel}>Access Token</Text>
            <Text style={styles.tokenValue} numberOfLines={1}>
              {state.accessToken
                ? `${state.accessToken.slice(0, 32)}…`
                : '—'}
            </Text>
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.logoutButton,
              pressed && styles.logoutButtonPressed,
            ]}
            onPress={logout}
          >
            <Text style={styles.logoutText}>Sign Out</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  /* ── Unauthenticated – login form ───────────────────────────── */
  return <LoginForm />;
}

/* ── Styles ──────────────────────────────────────────────────────── */

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    backgroundColor: AuthColors.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  homeContent: {
    alignItems: 'center',
    width: '100%',
    maxWidth: 340,
  },
  successCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: 'rgba(78, 203, 113, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    borderWidth: 2,
    borderColor: AuthColors.success,
  },
  successEmoji: { fontSize: 40 },
  homeTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: AuthColors.text,
    marginBottom: 8,
  },
  homeSubtitle: {
    fontSize: 16,
    color: AuthColors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  tokenCard: {
    width: '100%',
    backgroundColor: AuthColors.surface,
    borderRadius: 14,
    padding: 16,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: AuthColors.inputBorder,
  },
  tokenLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: AuthColors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 6,
  },
  tokenValue: {
    fontSize: 14,
    color: AuthColors.textMuted,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  logoutButton: {
    width: '100%',
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 107, 0.3)',
    backgroundColor: 'rgba(255, 107, 107, 0.08)',
  },
  logoutButtonPressed: {
    backgroundColor: 'rgba(255, 107, 107, 0.15)',
    transform: [{ scale: 0.98 }],
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: AuthColors.error,
  },
});
