import { StyleSheet, Dimensions } from "react-native";
import Colors from "@/constants/Colors";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  glowOverlay: {
    position: "absolute",
    width: width * 1.5,
    height: width * 1.5,
    borderRadius: (width * 1.5) / 2,
    backgroundColor: Colors.primaryGlow,
    opacity: 0.15,
    top: -width * 0.2,
    left: -width * 0.25,
    transform: [{ scale: 0.8 }],
  },
  logoWrapper: {
    marginBottom: 60,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  logo: {
    width: 140,
    height: 140,
  },
  dotsContainer: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    
  },
  rotatingContainer: {
    width: 30,
    height: 30,
    justifyContent: "space-between",
    alignItems: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary, // Neon green dot
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 3,
  },
  messageText: {
    fontFamily: "System",
    fontSize: 13,
    color: Colors.textMuted,
    fontWeight: "500",
    textAlign: "center",
    letterSpacing: 0.5,
  },
});

export default styles;
