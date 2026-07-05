import React from "react";
import { Text, View, Image, TouchableOpacity, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import Colors, { OnboardingColors } from "@/constants/Colors";
import styles from "@/styles/onboardingStyles";

const RobotLogo = require("../../../assets/expo.icon/Assets/logo.png");

export default function Onboarding() {
  const handleNext = () => {
    router.replace("/home");
  };

  const handleSkip = () => {
    router.replace("/home");
  };

  return (
    <LinearGradient colors={Colors.bgGradient} style={{ flex: 1 }}>
      <SafeAreaView style={[styles.container, { backgroundColor: "transparent" }]}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />

        {/* Robot Mascot & Capsule Diagram Badges Area */}
        <View style={styles.illustrationArea}>
          <View style={styles.relativeWrapper}>
            
            {/* Badge 1: 40% Instruction (Top-Left) */}
            <View style={[styles.badge, styles.badgeInstruction]}>
              <View style={styles.badgeCircle}>
                <Text style={{ fontSize: 13 }}>👥</Text>
              </View>
              <View style={styles.badgeTextWrapper}>
                <Text style={[styles.badgePercentText, { color: OnboardingColors.badgeBlueText }]}>
                  40%
                </Text>
                <Text style={styles.badgeCategoryText}>Instruction</Text>
              </View>
            </View>

            {/* Connection Pin Dot (Purple) */}
            <View style={[styles.pinDot, styles.pinPurple]} />

            {/* Centered Robot Avatar */}
            <Image source={RobotLogo} style={styles.robotImage} resizeMode="contain" />

            {/* Connection Pin Dot (Pink) */}
            <View style={[styles.pinDot, styles.pinPink]} />

            {/* Connection Pin Dot (Blue) */}
            <View style={[styles.pinDot, styles.pinBlue]} />

            {/* Badge 2: 30% Enrichment (Middle-Right) */}
            <View style={[styles.badge, styles.badgeEnrichment]}>
              <View style={styles.badgeCircle}>
                <Text style={{ fontSize: 13 }}>📦</Text>
              </View>
              <View style={styles.badgeTextWrapper}>
                <Text style={[styles.badgePercentText, { color: OnboardingColors.badgePurpleText }]}>
                  30%
                </Text>
                <Text style={styles.badgeCategoryText}>Enrichment</Text>
              </View>
            </View>

            {/* Badge 3: 30% Training (Bottom-Left) */}
            <View style={[styles.badge, styles.badgeTraining]}>
              <View style={styles.badgeCircle}>
                <Text style={{ fontSize: 13 }}>📝</Text>
              </View>
              <View style={styles.badgeTextWrapper}>
                <Text style={[styles.badgePercentText, { color: OnboardingColors.badgePinkText }]}>
                  30%
                </Text>
                <Text style={styles.badgeCategoryText}>Training</Text>
              </View>
            </View>

          </View>
        </View>

        {/* Discover Smarter Learning With AI Text */}
        <View style={styles.textSection}>
          <Text style={styles.titleText}>Discover Smarter</Text>
          <View style={styles.titleRow}>
            <Text style={styles.titleText}>Learning With </Text>
            <View style={styles.aiHighlightContainer}>
              <Text style={styles.aiHighlightText}>AI</Text>
            </View>
          </View>
          <Text style={styles.subtitleText}>
            Personalized courses designed to match your unique learning journey
          </Text>
        </View>

        {/* Footer Navigation (Skip / Next) */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.skipButton} onPress={handleSkip} activeOpacity={0.7}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.nextButton} onPress={handleNext} activeOpacity={0.8}>
            <View style={styles.nextArrowCircle}>
              <Text style={styles.nextArrowText}>➔</Text>
            </View>
            <Text style={styles.nextText}>Next</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
