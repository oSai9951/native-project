import React, { useState } from "react";
import { Text, View, ScrollView, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "@/constants/Colors";
import { TabType } from "@/types/home-types";
import styles from "@/styles/homeStyles";

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

  const handleQuickAction = () => {
    Alert.alert("Quick Action", "Content coming soon");
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
                height: 50,
                borderWidth: 1.5,
                borderColor: "#EF4444",
                borderRadius: 12,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={handleLogout}
            >
              <Text style={{ color: "#EF4444", fontSize: 15, fontWeight: "700" }}>LOG OUT</Text>
            </TouchableOpacity>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <LinearGradient colors={Colors.bgGradient} style={{ flex: 1 }}>
      <SafeAreaView style={[styles.container, { backgroundColor: "transparent" }]}>
        {/* Top Header Bar */}
        <View style={styles.header}>
          {/* Profile Circle Icon (Left) */}
          <TouchableOpacity style={styles.profileButton} onPress={handleProfilePress} activeOpacity={0.7}>
            <Text style={{ fontSize: 16, color: Colors.primary }}>👤</Text>
          </TouchableOpacity>

          {/* Title */}
          <Text style={styles.headerTitle}>CashPay</Text>

          {/* Hamburger Menu Icon (Right) */}
          <TouchableOpacity style={styles.menuButton} onPress={handleMenuPress} activeOpacity={0.7}>
            <View style={styles.menuLine} />
            <View style={styles.menuLine} />
            <View style={styles.menuLine} />
          </TouchableOpacity>
        </View>

        {/* Main Screen Panel View */}
        <View style={styles.contentArea}>{renderContent()}</View>

        {/* Bottom Custom Navigation Bar */}
        <View style={styles.bottomTabContainer}>
          {/* Tab 1: Dashboard (Circle) */}
          <TouchableOpacity
            style={[styles.tabButtonCircle, activeTab === "dashboard" && styles.tabButtonCircleActive]}
            onPress={() => setActiveTab("dashboard")}
          >
            <Text style={{ fontSize: 18 }}>🏠</Text>
          </TouchableOpacity>

          {/* Tab 2: Analytics (Circle) */}
          <TouchableOpacity
            style={[styles.tabButtonCircle, activeTab === "analytics" && styles.tabButtonCircleActive]}
            onPress={() => setActiveTab("analytics")}
          >
            <Text style={{ fontSize: 18 }}>📊</Text>
          </TouchableOpacity>

          {/* Tab 3: Central Action (Capsule) */}
          <TouchableOpacity
            style={[styles.tabButtonCapsule, activeTab === "action" && styles.tabButtonCapsuleActive]}
            onPress={() => {
              setActiveTab("action");
              handleQuickAction();
            }}
          >
            <Text style={{ fontSize: 20 }}>➕</Text>
          </TouchableOpacity>

          {/* Tab 4: Budgets (Circle) */}
          <TouchableOpacity
            style={[styles.tabButtonCircle, activeTab === "budgets" && styles.tabButtonCircleActive]}
            onPress={() => setActiveTab("budgets")}
          >
            <Text style={{ fontSize: 18 }}>💼</Text>
          </TouchableOpacity>

          {/* Tab 5: Settings (Circle) */}
          <TouchableOpacity
            style={[styles.tabButtonCircle, activeTab === "settings" && styles.tabButtonCircleActive]}
            onPress={() => setActiveTab("settings")}
          >
            <Text style={{ fontSize: 18 }}>⚙️</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Absolute Popover Dialog Dropdown Menu for Profile */}
      {isProfileModalVisible && (
        <View style={StyleSheet.absoluteFill}>
          <TouchableOpacity
            style={styles.modalBackdrop}
            activeOpacity={1}
            onPress={() => setIsProfileModalVisible(false)}
          />
          <View style={styles.profileDropdownCard}>
            <Text style={styles.dropdownSectionTitle}>Account</Text>
            
            <TouchableOpacity style={styles.dropdownItem} onPress={handleDropdownAction}>
              <View style={[styles.premiumIcon, { backgroundColor: "#D97706" }]} />
              <Text style={styles.premiumText}>Reactivate Premium: 50% Off</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.dropdownItem} onPress={handleDropdownAction}>
              <Text style={styles.dropdownItemText}>Settings & Privacy</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.dropdownItem} onPress={handleDropdownAction}>
              <Text style={styles.dropdownItemText}>Help</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.dropdownItem} onPress={handleDropdownAction}>
              <Text style={styles.dropdownItemText}>Language</Text>
            </TouchableOpacity>

            <View style={styles.dropdownDivider} />

            <Text style={styles.dropdownSectionTitle}>Manage</Text>

            <TouchableOpacity style={styles.dropdownItem} onPress={handleDropdownAction}>
              <Text style={styles.dropdownItemText}>Posts & Activity</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.dropdownItem} onPress={handleDropdownAction}>
              <Text style={styles.dropdownItemText}>Job Posting Account</Text>
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
