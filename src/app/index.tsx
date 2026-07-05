import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import * as LocalAuthentication from "expo-local-authentication";
import { LinearGradient } from "expo-linear-gradient";
import Login from "@/components/login/Login";
import Colors from "@/constants/Colors";
import { useLoading } from "@/providers/LoadingProvider";
import { simulateRefresh } from "@/utils/auth-api";

export default function Index() {
  const [hasToken, setHasToken] = useState<boolean | null>(null); // null means checking
  const { showLoader, hideLoader } = useLoading();

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    try {
      const token = await SecureStore.getItemAsync("refreshToken");
      if (token) {
        setHasToken(true);
        // Prompt biometric unlock immediately after loader hides
        triggerBiometric(token);
      } else {
        setHasToken(false);
      }
    } catch (e) {
      setHasToken(false);
    }
  };

  const triggerBiometric = async (token: string) => {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (!hasHardware || !isEnrolled) {
        // Fallback: Clear invalid/unusable token and direct to login
        await SecureStore.deleteItemAsync("refreshToken");
        setHasToken(false);
        return;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Unlock CashPay",
        cancelLabel: "Use Password",
        disableDeviceFallback: true,
      });

      if (result.success) {
        showLoader("Verifying secure token...");
        // Request token refresh simulation from helper
        const tokens = await simulateRefresh(token);
        await SecureStore.setItemAsync("refreshToken", tokens.refreshToken);
        hideLoader();
        
        // Bypass login and onboarding, go straight to home
        router.replace("/home");
      }
    } catch (e) {
      hideLoader();
      Alert.alert("Authentication Error", "Something went wrong during biometric unlock.");
    }
  };

  const handleUsePassword = async () => {
    await SecureStore.deleteItemAsync("refreshToken");
    setHasToken(false);
  };

  const handleRetry = async () => {
    const token = await SecureStore.getItemAsync("refreshToken");
    if (token) {
      triggerBiometric(token);
    } else {
      setHasToken(false);
    }
  };

  // Still checking for token availability
  if (hasToken === null) {
    return (
      <LinearGradient colors={Colors.bgGradient} style={styles.container}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </LinearGradient>
    );
  }

  // No active token found: show standard Login form
  if (!hasToken) {
    return <Login />;
  }

  // Token found but biometric was cancelled or pending unlock
  return (
    <LinearGradient colors={Colors.bgGradient} style={styles.container}>
      <View style={styles.content}>
        <View style={styles.lockContainer}>
          <Text style={styles.lockIcon}>🔐</Text>
        </View>

        <Text style={styles.title}>CashPay is Locked</Text>
        <Text style={styles.subtitle}>
          Verify your face recognition or fingerprint scanner to safely unlock your account.
        </Text>

        <TouchableOpacity style={styles.retryButton} onPress={handleRetry} activeOpacity={0.8}>
          <Text style={styles.retryButtonText}>Tap to Unlock</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.passwordButton} onPress={handleUsePassword} activeOpacity={0.7}>
          <Text style={styles.passwordButtonText}>Log In with Password</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  content: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  lockContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "rgba(76, 59, 255, 0.08)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    borderWidth: 1.5,
    borderColor: "rgba(76, 59, 255, 0.15)",
  },
  lockIcon: {
    fontSize: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: Colors.text,
    marginBottom: 10,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textMuted,
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  retryButton: {
    width: "80%",
    height: 52,
    backgroundColor: "#111111",
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 16,
  },
  retryButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  passwordButton: {
    paddingVertical: 12,
  },
  passwordButtonText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
});
