import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useMutation } from '@tanstack/react-query';

import { useAuth } from '@/providers/auth-provider';
import { getBiometricType } from '@/lib/biometrics';
import { AuthColors } from '@/constants/colors';

export function BiometricPrompt() {
  const { loginWithBiometric, skipBiometric } = useAuth();
  const [biometricLabel, setBiometricLabel] = useState('Biometric');

  const mutation = useMutation({ mutationFn: loginWithBiometric });

  useEffect(() => {
    getBiometricType().then(setBiometricLabel);
  }, []);

  // Auto-trigger biometric prompt on mount
  useEffect(() => {
    mutation.mutate();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Icon */}
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>
            {biometricLabel === 'Face ID' ? '🧑' : '👆'}
          </Text>
        </View>

        <Text style={styles.title}>{biometricLabel}</Text>
        <Text style={styles.subtitle}>
          Authenticate to access your account
        </Text>

        {/* Error */}
        {mutation.isError && (
          <View style={styles.errorBanner}>
            <Text style={styles.errorText}>
              {mutation.error instanceof Error
                ? mutation.error.message
                : 'Authentication failed'}
            </Text>
          </View>
        )}

        {/* Actions */}
        <View style={styles.actions}>
          <Pressable
            style={({ pressed }) => [
              styles.retryButton,
              pressed && styles.retryButtonPressed,
              mutation.isPending && styles.buttonDisabled,
            ]}
            onPress={() => mutation.mutate()}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <ActivityIndicator color={AuthColors.text} />
            ) : (
              <Text style={styles.retryButtonText}>Try Again</Text>
            )}
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.skipButton,
              pressed && styles.skipButtonPressed,
            ]}
            onPress={skipBiometric}
          >
            <Text style={styles.skipButtonText}>
              Use Email & Password
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

/* ── Styles ──────────────────────────────────────────────────────── */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AuthColors.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  content: {
    alignItems: 'center',
    width: '100%',
    maxWidth: 340,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: AuthColors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
    borderWidth: 2,
    borderColor: AuthColors.primary,
  },
  icon: { fontSize: 44 },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: AuthColors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: AuthColors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
  },
  errorBanner: {
    backgroundColor: AuthColors.errorBg,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 107, 0.2)',
    marginBottom: 24,
    width: '100%',
  },
  errorText: {
    color: AuthColors.error,
    fontSize: 14,
    textAlign: 'center',
  },
  actions: { width: '100%', gap: 14 },
  retryButton: {
    height: 52,
    backgroundColor: AuthColors.primary,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  retryButtonPressed: {
    backgroundColor: AuthColors.primaryDark,
    transform: [{ scale: 0.98 }],
  },
  retryButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: AuthColors.text,
  },
  skipButton: {
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: AuthColors.inputBorder,
  },
  skipButtonPressed: { backgroundColor: AuthColors.inputBg },
  skipButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: AuthColors.textSecondary,
  },
  buttonDisabled: { opacity: 0.7 },
});
