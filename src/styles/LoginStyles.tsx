import { StyleSheet } from "react-native";
import Colors from "@/constants/Colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  logoSection: {
    alignItems: "center",
    marginBottom: 50,
  },
  diamondContainer: {
    width: 100,
    height: 100,
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: 12,
    transform: [{ rotate: "45deg" }],
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    backgroundColor: Colors.surface,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 4,
  },
  logoImage: {
    width: 70,
    height: 70,
    transform: [{ rotate: "-45deg" }], // Rotate back so image is upright
  },
  formSection: {
    width: "100%",
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: Colors.textMuted,
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "rgba(76, 59, 255, 0.15)",
    borderRadius: 12,
    backgroundColor: Colors.surface,
    paddingHorizontal: 16,
    height: 52,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  inputFocused: {
    borderColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  inputError: {
    borderColor: Colors.error,
  },
  input: {
    flex: 1,
    color: Colors.text,
    fontSize: 15,
    height: "100%",
    paddingVertical: 0,
  },
  errorText: {
    color: Colors.error,
    fontSize: 12,
    fontWeight: "500",
    marginTop: 6,
    marginLeft: 4,
  },
  forgotPasswordWrapper: {
    alignSelf: "flex-start",
    marginBottom: 28,
    marginTop: -4,
  },
  forgotPasswordText: {
    color: Colors.primary,
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  loginButton: {
    width: "100%",
    height: 52,
    backgroundColor: "#111111", // Sleek dark capsule button
    borderRadius: 26,           // Capsule style matching onboarding Next button
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 3,
    marginTop: 8,
  },
  loginButtonDisabled: {
    backgroundColor: "rgba(17, 17, 17, 0.4)",
    shadowOpacity: 0,
    elevation: 0,
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});

export default styles;
