import React, { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useMutation } from '@tanstack/react-query';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useAuth } from '@/providers/auth-provider';
import { loginSchema, type LoginFormData } from '@/utils/validations';
import { AuthColors } from '@/constants/colors';

export function LoginForm() {
  const { login } = useAuth();
  const [secureEntry, setSecureEntry] = useState(true);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const mutation = useMutation({
    mutationFn: (data: LoginFormData) => login(data.email, data.password),
  });

  const onSubmit = handleSubmit((data) => mutation.mutate(data));

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      {/* ── Header ──────────────────────────────────────────── */}
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>🔐</Text>
        </View>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to your account</Text>
      </View>

      {/* ── Form ────────────────────────────────────────────── */}
      <View style={styles.form}>
        {/* Email */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Email</Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, errors.email && styles.inputError]}
                placeholder="you@example.com"
                placeholderTextColor={AuthColors.textMuted}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                editable={!mutation.isPending}
              />
            )}
          />
          {errors.email && (
            <Text style={styles.errorText}>{errors.email.message}</Text>
          )}
        </View>

        {/* Password */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordWrapper}>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[
                    styles.input,
                    styles.passwordInput,
                    errors.password && styles.inputError,
                  ]}
                  placeholder="••••••••"
                  placeholderTextColor={AuthColors.textMuted}
                  secureTextEntry={secureEntry}
                  autoComplete="password"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  editable={!mutation.isPending}
                />
              )}
            />
            <Pressable
              style={styles.eyeButton}
              onPress={() => setSecureEntry((prev) => !prev)}
            >
              <Text style={styles.eyeIcon}>
                {secureEntry ? '👁' : '🙈'}
              </Text>
            </Pressable>
          </View>
          {errors.password && (
            <Text style={styles.errorText}>{errors.password.message}</Text>
          )}
        </View>

        {/* Server error */}
        {mutation.isError && (
          <View style={styles.errorBanner}>
            <Text style={styles.errorBannerText}>
              {mutation.error instanceof Error
                ? mutation.error.message
                : 'Login failed. Please try again.'}
            </Text>
          </View>
        )}

        {/* Submit */}
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
            mutation.isPending && styles.buttonDisabled,
          ]}
          onPress={onSubmit}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? (
            <ActivityIndicator color={AuthColors.text} />
          ) : (
            <Text style={styles.buttonText}>Sign In</Text>
          )}
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

/* ── Styles ──────────────────────────────────────────────────────── */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: AuthColors.background,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: AuthColors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: AuthColors.inputBorder,
  },
  icon: { fontSize: 36 },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: AuthColors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: AuthColors.textSecondary,
  },
  form: { gap: 20 },
  fieldGroup: { gap: 8 },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: AuthColors.textSecondary,
    marginLeft: 4,
  },
  input: {
    height: 52,
    backgroundColor: AuthColors.inputBg,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: AuthColors.inputBorder,
    paddingHorizontal: 16,
    fontSize: 16,
    color: AuthColors.text,
  },
  inputError: { borderColor: AuthColors.error },
  passwordWrapper: { position: 'relative' as const },
  passwordInput: { paddingRight: 52 },
  eyeButton: {
    position: 'absolute' as const,
    right: 16,
    top: 0,
    bottom: 0,
    justifyContent: 'center' as const,
  },
  eyeIcon: { fontSize: 20 },
  errorText: {
    fontSize: 12,
    color: AuthColors.error,
    marginLeft: 4,
  },
  errorBanner: {
    backgroundColor: AuthColors.errorBg,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 107, 0.2)',
  },
  errorBannerText: {
    color: AuthColors.error,
    fontSize: 14,
    textAlign: 'center',
  },
  button: {
    height: 52,
    backgroundColor: AuthColors.primary,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  buttonPressed: {
    backgroundColor: AuthColors.primaryDark,
    transform: [{ scale: 0.98 }],
  },
  buttonDisabled: { opacity: 0.7 },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: AuthColors.text,
  },
});
