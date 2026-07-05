import React, { useEffect } from "react";
import { Text, View, ActivityIndicator } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  Easing,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "@/constants/Colors";
import styles from "@/styles/LoaderStyles";

export interface LoaderProps {
  progress: number; // Value between 0 and 1
  message?: string; // Optional loading message
  logo?: any;       // Optional custom logo source
}

// Fallback logo in case custom is not provided
const DefaultLogo = require("../../assets/expo.icon/Assets/logo.png");

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

