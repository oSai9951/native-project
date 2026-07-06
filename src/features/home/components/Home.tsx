import React, { useState } from "react";
import { Text, View, ScrollView, TouchableOpacity, Alert, StyleSheet, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "@/constants/colors";
import { TabType } from "../types/home-types";

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);

  const handleProfilePress = () => {
    setIsProfileModalVisible(true);
  };

  const handleDropdownAction = () => {
    setIsProfileModalVisible(false);
    Alert.alert("Action", "Content coming soon");
  };

  const handleSignOutClick = () => {
    setIsProfileModalVisible(false);
    handleLogout();
  };

  const handleMenuPress = () => {
    Alert.alert("Menu", "Content coming soon");
  };

  const handleLogout = () => {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", onPress: () => router.replace("/") },
    ]);
  };

  // Render content area based on active bottom tab selection
  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <View style={styles.genericContent}>
            <Text style={styles.genericTitle}>Content Coming Soon</Text>
          </View>
        );

      case "analytics":
        return (
          <View style={styles.genericContent}>
            <Text style={styles.genericTitle}>Content Coming Soon</Text>
          </View>
        );

      case "action":
        return (
          <View style={styles.genericContent}>
            <Text style={styles.genericTitle}>Content Coming Soon</Text>
          </View>
        );

      case "budgets":
        return (
          <View style={styles.genericContent}>
            <Text style={styles.genericTitle}>Content Coming Soon</Text>
          </View>
        );

      case "settings":
        return (
          <View style={styles.genericContent}>
            <Text style={[styles.genericTitle, { marginBottom: 30 }]}>Content Coming Soon</Text>
            <TouchableOpacity
              style={{
                width: "80%",
                height: 52,
                borderRadius: 26,
                backgroundColor: "rgba(0, 0, 0, 0.05)",
                borderWidth: 1.5,
                borderColor: "rgba(0, 0, 0, 0.08)",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={handleLogout}
              activeOpacity={0.7}
            >
              <Text style={{ fontSize: 15, fontWeight: "600", color: Colors.textMuted }}>Log Out</Text>
            </TouchableOpacity>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <LinearGradient colors={Colors.bgGradient} style={styles.container}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
        {/* Header Layout */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.profileButton} onPress={handleProfilePress} activeOpacity={0.8}>
            <Text style={{ fontSize: 18 }}>👤</Text>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Dashboard</Text>

          <TouchableOpacity style={styles.menuButton} onPress={handleMenuPress} activeOpacity={0.7}>
            <View style={styles.menuLine} />
            <View style={[styles.menuLine, { width: 14 }]} />
            <View style={styles.menuLine} />
          </TouchableOpacity>
        </View>

        {/* Content Area */}
        <View style={styles.contentArea}>{renderContent()}</View>

        {/* Bottom Navigation */}
        <View style={styles.bottomTabContainer}>
          <TouchableOpacity
            style={[styles.tabButtonCircle, activeTab === "dashboard" && styles.tabButtonCircleActive]}
            onPress={() => setActiveTab("dashboard")}
            activeOpacity={0.7}
          >
            <Text style={{ fontSize: 18, opacity: activeTab === "dashboard" ? 1.0 : 0.4 }}>📊</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabButtonCircle, activeTab === "analytics" && styles.tabButtonCircleActive]}
            onPress={() => setActiveTab("analytics")}
            activeOpacity={0.7}
          >
            <Text style={{ fontSize: 18, opacity: activeTab === "analytics" ? 1.0 : 0.4 }}>📈</Text>
          </TouchableOpacity>

          {/* Special center action button */}
          <TouchableOpacity
            style={[styles.tabButtonCapsule, activeTab === "action" && styles.tabButtonCapsuleActive]}
            onPress={() => setActiveTab("action")}
            activeOpacity={0.8}
          >
            <Text style={{ fontSize: 18, color: "#FFFFFF" }}>⚡</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabButtonCircle, activeTab === "budgets" && styles.tabButtonCircleActive]}
            onPress={() => setActiveTab("budgets")}
            activeOpacity={0.7}
          >
            <Text style={{ fontSize: 18, opacity: activeTab === "budgets" ? 1.0 : 0.4 }}>💰</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabButtonCircle, activeTab === "settings" && styles.tabButtonCircleActive]}
            onPress={() => setActiveTab("settings")}
            activeOpacity={0.7}
          >
            <Text style={{ fontSize: 18, opacity: activeTab === "settings" ? 1.0 : 0.4 }}>⚙️</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Floating profile modal backdrop / dropdown card */}
      {isProfileModalVisible && (
        <View style={StyleSheet.absoluteFill}>
          <TouchableOpacity style={styles.modalBackdrop} activeOpacity={1} onPress={() => setIsProfileModalVisible(false)} />
          <View style={styles.profileDropdownCard}>
            <Text style={styles.dropdownSectionTitle}>Profile Options</Text>

            <TouchableOpacity style={styles.dropdownItem} onPress={handleDropdownAction}>
              <View style={[styles.premiumIcon, { backgroundColor: "#FFB300" }]} />
              <Text style={styles.premiumText}>Go Premium</Text>
            </TouchableOpacity>

            <View style={styles.dropdownDivider} />

            <TouchableOpacity style={styles.dropdownItem} onPress={handleDropdownAction}>
              <Text style={styles.dropdownItemText}>Settings</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.dropdownItem} onPress={handleDropdownAction}>
              <Text style={styles.dropdownItemText}>Help</Text>
            </TouchableOpacity>

            <View style={styles.dropdownDivider} />

            <TouchableOpacity style={styles.dropdownItem} onPress={handleSignOutClick}>
              <Text style={styles.signOutText}>Sign out</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 60,
    paddingHorizontal: 16,
    borderBottomWidth: 1.5,
    borderColor: "rgba(76, 59, 255, 0.1)",
    backgroundColor: Colors.surface,
  },
  profileButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(76, 59, 255, 0.08)",
  },
  headerTitle: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  menuButton: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  menuLine: {
    width: 18,
    height: 2,
    backgroundColor: Colors.primary,
    borderRadius: 1,
    marginVertical: 2,
  },
  contentArea: {
    flex: 1,
  },
  bottomTabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 76,
    backgroundColor: Colors.surface,
    borderTopWidth: 1.5,
    borderColor: "rgba(76, 59, 255, 0.08)",
    paddingBottom: Platform.OS === "ios" ? 14 : 4,
  },
  tabButtonCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: "rgba(76, 59, 255, 0.15)",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.01)",
  },
  tabButtonCircleActive: {
    borderColor: Colors.primary,
    backgroundColor: "rgba(76, 59, 255, 0.1)",
  },
  tabButtonCapsule: {
    width: 76,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  tabButtonCapsuleActive: {
    backgroundColor: "#3125B3",
  },
  genericContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  genericTitle: {
    color: Colors.text,
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
  },
  modalBackdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.08)",
  },
  profileDropdownCard: {
    position: "absolute",
    top: 55,
    left: 12,
    width: 250,
    backgroundColor: Colors.surface,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.05)",
  },
  dropdownSectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.text,
    marginTop: 6,
    marginBottom: 6,
    letterSpacing: 0.3,
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 7,
  },
  premiumIcon: {
    width: 12,
    height: 12,
    borderRadius: 3,
    marginRight: 8,
  },
  premiumText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#D97706",
    flex: 1,
  },
  dropdownItemText: {
    fontSize: 13,
    color: Colors.textMuted,
    fontWeight: "500",
  },
  dropdownDivider: {
    height: 1,
    backgroundColor: "rgba(0, 0, 0, 0.06)",
    marginVertical: 8,
  },
  signOutText: {
    fontSize: 13,
    color: Colors.textMuted,
    fontWeight: "500",
  },
});
