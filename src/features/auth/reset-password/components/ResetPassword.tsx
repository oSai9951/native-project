import React from "react";
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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LinearGradient } from "expo-linear-gradient";

const resetPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export default function ResetPassword() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: ResetPasswordFormData) => {
    Alert.alert(
      "Reset Link Sent",
      `A password reset link has been sent to ${data.email}.`
    );
  };

  const handleBackToLogin = () => {
    router.back();
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
            <Text style={styles.cardTitle}>Reset Password</Text>
            <Text style={styles.cardSubtitle}>
              Enter your email address and we'll send you a link to reset your password.
            </Text>

            {/* Email Field */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Email Address</Text>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View style={[styles.inputRow, errors.email && styles.inputError]}>
                    <Text style={styles.inputIconLeft}>✉️</Text>
                    <TextInput
                      style={styles.textInput}
                      placeholder="name@school.edu"
                      placeholderTextColor="#a3a3a3"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      autoCapitalize="none"
                      keyboardType="email-address"
                    />
                  </View>
                )}
              />
              {errors.email && (
                <Text style={styles.errorText}>{errors.email.message}</Text>
              )}
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              style={styles.submitBtn}
              onPress={handleSubmit(onSubmit)}
              activeOpacity={0.85}
            >
              <Text style={styles.submitBtnText}>Send Reset Link  ➔</Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            {/* Back to Login Link */}
            <TouchableOpacity
              style={styles.backLinkRow}
              onPress={handleBackToLogin}
              activeOpacity={0.7}
            >
              <Text style={styles.backLinkText}>‹  Back to login</Text>
            </TouchableOpacity>
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
    paddingHorizontal: 24,
    paddingVertical: 32,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#0b0b0b",
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  cardSubtitle: {
    fontSize: 13,
    color: "#737373",
    marginBottom: 28,
    lineHeight: 20,
  },
  fieldGroup: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#0b0b0b",
    marginBottom: 8,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1.5,
    borderColor: "transparent",
  },
  inputError: {
    borderColor: "#ef4444",
  },
  inputIconLeft: {
    fontSize: 16,
    color: "#737373",
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    color: "#0b0b0b",
    padding: 0,
    margin: 0,
  },
  errorText: {
    color: "#ef4444",
    fontSize: 11,
    marginTop: 6,
    fontWeight: "600",
    paddingLeft: 4,
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
    marginTop: 6,
  },
  submitBtnText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  divider: {
    height: 1,
    backgroundColor: "#f5f5f5",
    marginVertical: 24,
  },
  backLinkRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 4,
  },
  backLinkText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#0b0b0b",
  },
  creditFooter: {
    marginTop: 48,
    paddingHorizontal: 24,
  },
  creditText: {
    fontSize: 10,
    color: "#a3a3a3",
    textAlign: "center",
    lineHeight: 16,
    fontWeight: "500",
  },
});
