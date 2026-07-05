import { StyleSheet, Platform } from "react-native";
import { OnboardingColors } from "../constants/Colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: OnboardingColors.background,
    justifyContent: "space-between",
    paddingTop: Platform.OS === "ios" ? 50 : 30,
    paddingBottom: Platform.OS === "ios" ? 40 : 24,
  },
  illustrationArea: {
    flex: 1.2,
    justifyContent: "center",
    alignItems: "center",
  },
  relativeWrapper: {
    width: 380,
    height: 500,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  robotImage: {
    width: 380,
    height: 480,
    alignSelf: "center",
  },
  
  // Capsule Badge Styles
  badge: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 28,
    paddingVertical: 8,
    paddingHorizontal: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  badgeCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  badgeTextWrapper: {
    justifyContent: "center",
  },
  badgePercentText: {
    fontSize: 12,
    fontWeight: "700",
  },
  badgeCategoryText: {
    fontSize: 10,
    color: OnboardingColors.textGray,
    fontWeight: "500",
    marginTop: 1,
  },
  
  // Badge Positioning & Coloring
  badgeInstruction: {
    top: 60,
    left: 10,
    backgroundColor: OnboardingColors.badgeBlueBg,
  },
  badgeEnrichment: {
    top: 155,
    right: 12,
    backgroundColor: OnboardingColors.badgePurpleBg,
  },
  badgeTraining: {
    top: 270,
    left: 5,
    backgroundColor: OnboardingColors.badgePinkBg,
  },
  
  // Pin node dots
  pinDot: {
    position: "absolute",
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2.5,
    borderColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  pinPurple: {
    top: 75,
    left: 180,
    backgroundColor: OnboardingColors.dotPurple,
  },
  pinPink: {
    top: 180,
    left: 198,
    backgroundColor: OnboardingColors.dotPink,
  },
  pinBlue: {
    top: 288,
    left: 168,
    backgroundColor: OnboardingColors.dotBlue,
  },

  // Title and Text Section
  textSection: {
    paddingHorizontal: 28,
    marginBottom: 20,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    flexWrap: "wrap",
  },
  titleText: {
    fontSize: 30,
    fontWeight: "800",
    color: OnboardingColors.textDark,
    lineHeight: 38,
    letterSpacing: -0.5,
  },
  aiHighlightContainer: {
    backgroundColor: OnboardingColors.aiHighlightBg,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 1,
  },
  aiHighlightText: {
    color: OnboardingColors.aiHighlightText,
    fontWeight: "800",
  },
  subtitleText: {
    fontSize: 14,
    color: OnboardingColors.textGray,
    lineHeight: 22,
    marginTop: 10,
    fontWeight: "500",
  },

  // Footer Navigation Row
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  skipButton: {
    height: 52,
    paddingHorizontal: 26,
    borderRadius: 26,
    backgroundColor: OnboardingColors.skipBg,
    borderWidth: 1,
    borderColor: OnboardingColors.skipBorder,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  skipText: {
    color: OnboardingColors.textDark,
    fontSize: 15,
    fontWeight: "600",
  },
  nextButton: {
    flex: 1,
    marginLeft: 16,
    height: 52,
    backgroundColor: OnboardingColors.nextBg,
    borderRadius: 26,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 6,
    paddingRight: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  nextArrowCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: OnboardingColors.nextCircleBg,
    justifyContent: "center",
    alignItems: "center",
  },
  nextArrowText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
  nextText: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
    marginRight: 20,
  },
});

export default styles;
