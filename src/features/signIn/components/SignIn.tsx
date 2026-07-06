import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  StyleSheet,
} from "react-native";
import { router } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LinearGradient } from "expo-linear-gradient";
import * as SecureStore from "expo-secure-store";
import { loginSchema, LoginFormData } from "../types/signIn-types";
import { useLoading } from "@/providers/LoadingProvider";
import { simulateLogin } from "@/utils/auth-api";

export default function SignIn() {
  const { showLoader, hideLoader } = useLoading();
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      showLoader("Signing in...");
      const response = await simulateLogin();

      await SecureStore.setItemAsync("accessToken", response.accessToken);
      await SecureStore.setItemAsync("refreshToken", response.refreshToken);

      if (rememberMe) {
        await SecureStore.setItemAsync("rememberedEmail", data.email);
      } else {
        await SecureStore.deleteItemAsync("rememberedEmail");
      }

      hideLoader();
      router.replace("/home");
    } catch (error) {
      hideLoader();
      Alert.alert("Sign In Failed", "An error occurred during authentication.");
    }
  };

  const handleForgotPassword = () => {
    router.push("/reset-password");
  };

  const handleSocialSignIn = (provider: string) => {
    Alert.alert("Social Sign In", `Sign in with ${provider} is not configured yet.`);
  };

  return (
    <LinearGradient
      colors={["#c1d3c9", "#d8e6eb", "#f6e5ed", "#fffdd1"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.gradient}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          style={styles.scroll}
          showsVerticalScrollIndicator={false}
        >

          {/* Form Card Container */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Welcome Back</Text>
            <Text style={styles.cardSubtitle}>
              Sign in to manage your learning workspace.
            </Text>

            {/* Email Field */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Email Address</Text>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View style={[styles.inputRow, errors.email && styles.inputError]}>
                    <TextInput
                      style={styles.textInput}
                      placeholder="name@school.edu"
                      placeholderTextColor="#9ca3af"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      autoCapitalize="none"
                      keyboardType="email-address"
                    />
                    <Text style={styles.inputIcon}>✉️</Text>
                  </View>
                )}
              />
              {errors.email && (
                <Text style={styles.errorText}>{errors.email.message}</Text>
              )}
            </View>

            {/* Password Field */}
            <View style={styles.fieldGroup}>
              <View style={styles.passwordHeader}>
                <Text style={styles.fieldLabel}>Password</Text>
                <TouchableOpacity onPress={handleForgotPassword} activeOpacity={0.7}>
                  <Text style={styles.forgotText}>Forgot Password?</Text>
                </TouchableOpacity>
              </View>
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View style={[styles.inputRow, errors.password && styles.inputError]}>
                    <TextInput
                      style={styles.textInput}
                      placeholder="••••••••"
                      placeholderTextColor="#9ca3af"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      secureTextEntry={secureTextEntry}
                      autoCapitalize="none"
                    />
                    <TouchableOpacity onPress={() => setSecureTextEntry(!secureTextEntry)} activeOpacity={0.7}>
                      <Text style={styles.inputIcon}>{secureTextEntry ? "👁️" : "🙈"}</Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
              {errors.password && (
                <Text style={styles.errorText}>{errors.password.message}</Text>
              )}
            </View>

            {/* Remember Me */}
            <TouchableOpacity
              style={styles.rememberRow}
              onPress={() => setRememberMe(!rememberMe)}
              activeOpacity={0.8}
            >
              <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                {rememberMe && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.rememberText}>Remember this device</Text>
            </TouchableOpacity>

            {/* Submit Button */}
            <TouchableOpacity
              style={styles.submitBtn}
              onPress={handleSubmit(onSubmit)}
              activeOpacity={0.85}
            >
              <Text style={styles.submitBtnText}>Sign In  ➔</Text>
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR CONTINUE WITH</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Social Logins */}
            <View style={styles.socialRow}>
              <TouchableOpacity
                style={styles.socialBtn}
                onPress={() => handleSocialSignIn("Google")}
                activeOpacity={0.7}
              >
                <Text style={styles.socialIcon}>🌐</Text>
                <Text style={styles.socialText}>Google</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.socialBtn}
                onPress={() => handleSocialSignIn("Apple")}
                activeOpacity={0.7}
              >
                <Text style={styles.socialIcon}>🍎</Text>
                <Text style={styles.socialText}>Apple</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.footerRow}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity
              onPress={() => Alert.alert("Sign Up", "Registration flow is not configured.")}
              activeOpacity={0.7}
            >
              <Text style={styles.footerLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  scroll: {
    paddingHorizontal: 24,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 48,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },
  logoBox: {
    width: 44,
    height: 44,
    backgroundColor: "#0b0b0b",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  logoIcon: {
    fontSize: 20,
  },
  brandName: {
    fontSize: 22,
    fontWeight: "800",
    marginLeft: 12,
    color: "#0b0b0b",
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 32,
    width: "100%",
    padding: 28,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
  },
  cardTitle: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "800",
    color: "#0b0b0b",
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  cardSubtitle: {
    textAlign: "center",
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 28,
    lineHeight: 18,
  },
  fieldGroup: {
    marginBottom: 18,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#0b0b0b",
    marginBottom: 6,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 13,
    borderWidth: 1.5,
    borderColor: "transparent",
  },
  inputError: {
    borderColor: "#ef4444",
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    color: "#0b0b0b",
    padding: 0,
    margin: 0,
  },
  inputIcon: {
    fontSize: 16,
    color: "#9ca3af",
  },
  errorText: {
    color: "#ef4444",
    fontSize: 10,
    marginTop: 4,
    fontWeight: "600",
    paddingLeft: 4,
  },
  passwordHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  forgotText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#0b0b0b",
    textDecorationLine: "underline",
  },
  rememberRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: "#d1d5db",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: "#0b0b0b",
    borderColor: "#0b0b0b",
  },
  checkmark: {
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "800",
  },
  rememberText: {
    fontSize: 12,
    color: "#6b7280",
    fontWeight: "500",
  },
  submitBtn: {
    backgroundColor: "#0b0b0b",
    borderRadius: 999,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  submitBtnText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 22,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#e5e7eb",
  },
  dividerText: {
    fontSize: 10,
    color: "#9ca3af",
    fontWeight: "700",
    letterSpacing: 1,
    marginHorizontal: 10,
  },
  socialRow: {
    flexDirection: "row",
    gap: 12,
  },
  socialBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    paddingVertical: 12,
    backgroundColor: "#ffffff",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  socialIcon: {
    fontSize: 18,
  },
  socialText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#0b0b0b",
    marginLeft: 8,
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  footerText: {
    fontSize: 12,
    color: "#6b7280",
  },
  footerLink: {
    fontSize: 12,
    fontWeight: "800",
    color: "#0b0b0b",
    textDecorationLine: "underline",
  },
});
