import React, { useEffect } from "react";
import { Text, View, ActivityIndicator, StyleSheet, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  Easing,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "@/constants/colors";

export interface LoaderProps {
  progress: number; // Value between 0 and 1
  message?: string; // Optional loading message
  logo?: any;       // Optional custom logo source
}

// Fallback logo in case custom is not provided
const DefaultLogo = require("../../../assets/expo.icon/Assets/logo.png");

export default function Loader({ progress, message = "Please wait...", logo }: LoaderProps) {
  const finalLogo = logo || DefaultLogo;

  // Reanimated shared values
  const logoScale = useSharedValue(1);
  const logoOpacity = useSharedValue(0.95);
  const rotation = useSharedValue(0);

  // Breathing pulse on logo and infinite clockwise rotation for dots
  useEffect(() => {
    logoScale.value = withRepeat(
      withSequence(
        withTiming(1.05, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.95, { duration: 1500, easing: Easing.inOut(Easing.ease) })
      ),
      -1, // Infinite repeat
      true // Reverse animation
    );

    logoOpacity.value = withRepeat(
      withSequence(
        withTiming(1.0, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.8, { duration: 1500, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );

    // Infinite clockwise circular rotation for the two dots
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 1500,
        easing: Easing.linear,
      }),
      -1, // Infinite repeat
      false // Do not reverse (so it keeps spinning clockwise)
    );
  }, []);

  // Animated styles
  const animatedLogoStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: logoScale.value }],
      opacity: logoOpacity.value,
    };
  });

  const animatedRotationStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  return (
    <LinearGradient colors={Colors.bgGradient} style={styles.container}>
      {/* Logo Container */}
      <View style={styles.logoWrapper}>
        <Animated.Image
          source={finalLogo}
          style={[styles.logo, animatedLogoStyle]}
          resizeMode="contain"
        />
      </View>

      {/* Rotating Dots Container */}
      <View style={styles.dotsContainer}>
        <Animated.View style={[styles.rotatingContainer, animatedRotationStyle]}>
          <View style={styles.dot} />
          <View style={styles.dot} />
        </Animated.View>
      </View>

      {/* Loading message */}
      <Text style={styles.messageText}>{message}</Text>
    </LinearGradient>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
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
    backgroundColor: Colors.primary,
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

