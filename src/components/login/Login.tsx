import React, { useCallback, useRef } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import * as SecureStore from "expo-secure-store";
import { useLoading } from "@/providers/LoadingProvider";
import { simulateLogin } from "@/utils/auth-api";
import { loginSchema, LoginFormData } from "@/types/login-types";
import styles from "@/styles/LoginStyles";
import Colors from "@/constants/Colors";

const RobotLogo = require("../../../assets/expo.icon/Assets/logo.png");

export default function Login() {
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const { showLoader, hideLoader } = useLoading();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = useCallback(async (data: LoginFormData) => {
    try {
      showLoader("Logging in...");
      // Simulate API call to get access token and refresh token
      const tokens = await simulateLogin();
      // Store the refresh token in SecureStore
      await SecureStore.setItemAsync("refreshToken", tokens.refreshToken);
      hideLoader();
      router.replace("/onboarding");
    } catch (error) {
      hideLoader();
      Alert.alert("Login Failed", "Something went wrong. Please try again.");
    }
  }, [showLoader, hideLoader]);

  const handleForgotPassword = useCallback(() => {
    Alert.alert(
      "Forgot Password",
      "Password reset link has been simulated. Check your mock console.",
      [{ text: "OK" }]
    );
  }, []);

  const formContent = (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="always"
      showsVerticalScrollIndicator={false}
    >
      {/* Logo Section */}
      <View style={styles.logoSection}>
        <View style={styles.diamondContainer}>
          <Image
            source={RobotLogo}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Form Section */}
      <View style={styles.formSection}>

        {/* Email Field */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email Address</Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={[
                styles.inputWrapper,
                errors.email && styles.inputError,
              ]}>
                <TextInput
                  ref={emailRef}
                  style={styles.input}
                  placeholder="Enter your email"
                  placeholderTextColor={Colors.textDim}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  returnKeyType="next"
                  onSubmitEditing={() => passwordRef.current?.focus()}
                  blurOnSubmit={false}
                />
              </View>
            )}
          />
          {errors.email && (
            <Text style={styles.errorText}>{errors.email.message}</Text>
          )}
        </View>

        {/* Password Field */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={[
                styles.inputWrapper,
                errors.password && styles.inputError,
              ]}>
                <TextInput
                  ref={passwordRef}
                  style={styles.input}
                  placeholder="Enter your password"
                  placeholderTextColor={Colors.textDim}
                  secureTextEntry={true}
                  autoCapitalize="none"
                  autoCorrect={false}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  returnKeyType="done"
                />
              </View>
            )}
          />
          {errors.password && (
            <Text style={styles.errorText}>{errors.password.message}</Text>
          )}
        </View>

        {/* Forgot Password Trigger */}
        <TouchableOpacity
          style={styles.forgotPasswordWrapper}
          onPress={handleForgotPassword}
          activeOpacity={0.7}
        >
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity
          style={[
            styles.loginButton,
            isSubmitting && styles.loginButtonDisabled,
          ]}
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          activeOpacity={0.8}
        >
          <Text style={styles.loginButtonText}>
            {isSubmitting ? "Logging in..." : "LOG IN"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  // On iOS, wrap with KeyboardAvoidingView. On Android, render directly.
  if (Platform.OS === "ios") {
    return (
      <LinearGradient colors={Colors.bgGradient} style={styles.container}>
        <KeyboardAvoidingView
          behavior="padding"
          style={styles.keyboardAvoid}
        >
          {formContent}
        </KeyboardAvoidingView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={Colors.bgGradient} style={styles.container}>
      <View style={styles.keyboardAvoid}>
        {formContent}
      </View>
    </LinearGradient>
  );
}
