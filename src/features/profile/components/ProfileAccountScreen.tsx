import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import {
  PROFILE_STATS,
  PROFILE_DATA,
  ACCOUNT_SETTINGS_TOGGLES,
  AccountSettingToggle,
} from "../data/index";

interface ProfileAccountScreenProps {
  onBack: () => void;
}

function InfoRow({ label, value, isLast }: { label: string; value: string; isLast?: boolean }) {
  return (
    <View
      className={`flex-row justify-between items-center py-2 ${isLast ? "" : "border-b border-outline-variant"}`}
    >
      <Text className="font-label-lg text-label-lg text-on-surface-variant">{label}</Text>
      <Text className="font-body-md text-body-md text-primary font-medium">{value}</Text>
    </View>
  );
}

function ToggleSwitch({ value, onToggle }: { value: boolean; onToggle: () => void }) {
  return (
    <TouchableOpacity
      onPress={onToggle}
      activeOpacity={0.8}
      className={`w-12 h-6 rounded-full justify-center px-0.5 ${value ? "bg-primary" : "bg-surface-container-highest"}`}
    >
      <View
        style={{ transform: [{ translateX: value ? 22 : 0 }] }}
        className="w-5 h-5 bg-white rounded-full shadow"
      />
    </TouchableOpacity>
  );
}

export default function ProfileAccountScreen({ onBack }: ProfileAccountScreenProps) {
  const insets = useSafeAreaInsets();
  const tabBarHeight = 64 + insets.bottom;

  const [toggles, setToggles] = useState<Record<AccountSettingToggle["id"], boolean>>(
    Object.fromEntries(ACCOUNT_SETTINGS_TOGGLES.map((t) => [t.id, t.defaultValue])) as Record<
      AccountSettingToggle["id"],
      boolean
    >
  );

  const handleToggle = (id: AccountSettingToggle["id"]) => {
    setToggles((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleLogout = () => {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Log Out",
        style: "destructive",
        onPress: async () => {
          await SecureStore.deleteItemAsync("accessToken");
          await SecureStore.deleteItemAsync("refreshToken");
          router.replace("/");
        },
      },
    ]);
  };

  return (
    <View className="flex-1 bg-background">
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        {/* Header */}
        <View className="flex-row items-center justify-between px-gutter py-base border-b border-outline-variant bg-surface">
          <TouchableOpacity onPress={onBack} className="flex-row items-center gap-3">
            <Text className="text-[20px] text-primary">⬅️</Text>
            <Text className="font-headline-lg-mobile text-headline-lg-mobile text-primary">Account</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Alert.alert("Settings", "Content coming soon")}
            className="p-2 rounded-full"
          >
            <Text className="text-[18px]">⚙️</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 8, paddingBottom: tabBarHeight + 24 }}
        >
          {/* Profile Header */}
          <View className="items-center py-8">
            <View className="relative">
              <View className="w-32 h-32 rounded-full border-4 border-white items-center justify-center bg-surface-container-high overflow-hidden shadow-sm">
                <Text className="text-[48px]">👩‍🏫</Text>
              </View>
              <TouchableOpacity
                onPress={() => Alert.alert("Edit Photo", "Content coming soon")}
                className="absolute bottom-1 right-1 bg-primary w-10 h-10 rounded-full items-center justify-center border-4 border-surface"
                activeOpacity={0.85}
              >
                <Text className="text-[14px]">✏️</Text>
              </TouchableOpacity>
            </View>
            <View className="mt-6 items-center">
              <Text className="font-headline-lg text-headline-lg text-primary tracking-tight">
                {PROFILE_DATA.name}
              </Text>
              <Text className="font-title-md text-title-md text-on-surface-variant font-medium">
                {PROFILE_DATA.role}
              </Text>
            </View>
          </View>

          {/* Stats Grid */}
          <View className="flex-row gap-3 mb-8">
            {PROFILE_STATS.map((stat) => (
              <View
                key={stat.id}
                style={{ backgroundColor: stat.bgColor }}
                className="flex-1 p-4 rounded-2xl items-center border border-black/5"
              >
                <Text className="font-display-lg text-[24px] text-primary mb-1">{stat.value}</Text>
                <Text className="font-label-lg text-label-lg text-on-surface-variant uppercase tracking-wider text-center">
                  {stat.label}
                </Text>
              </View>
            ))}
          </View>

          {/* Personal Info */}
          <View className="bg-surface-container-lowest p-6 rounded-2xl border border-black/5 mb-4">
            <View className="flex-row items-center gap-3 mb-6">
              <View style={{ backgroundColor: "#F3E5F5" }} className="w-10 h-10 rounded-full items-center justify-center">
                <Text className="text-[16px]">👤</Text>
              </View>
              <Text className="font-headline-lg-mobile text-headline-lg-mobile text-primary">Personal Info</Text>
            </View>
            {PROFILE_DATA.personalInfo.map((row, index) => (
              <InfoRow
                key={row.label}
                label={row.label}
                value={row.value}
                isLast={index === PROFILE_DATA.personalInfo.length - 1}
              />
            ))}
          </View>

          {/* School Details */}
          <View className="bg-surface-container-lowest p-6 rounded-2xl border border-black/5 mb-4">
            <View className="flex-row items-center gap-3 mb-6">
              <View style={{ backgroundColor: "#E4F2E7" }} className="w-10 h-10 rounded-full items-center justify-center">
                <Text className="text-[16px]">🎓</Text>
              </View>
              <Text className="font-headline-lg-mobile text-headline-lg-mobile text-primary">School Details</Text>
            </View>
            {PROFILE_DATA.schoolDetails.map((row, index) => (
              <InfoRow
                key={row.label}
                label={row.label}
                value={row.value}
                isLast={index === PROFILE_DATA.schoolDetails.length - 1}
              />
            ))}
          </View>

          {/* Account Settings */}
          <View className="bg-surface-container-lowest p-6 rounded-2xl border border-black/5 mb-4">
            <View className="flex-row items-center gap-3 mb-6">
              <View style={{ backgroundColor: "#E3F2FD" }} className="w-10 h-10 rounded-full items-center justify-center">
                <Text className="text-[16px]">🛠️</Text>
              </View>
              <Text className="font-headline-lg-mobile text-headline-lg-mobile text-primary">Account Settings</Text>
            </View>
            <View style={{ gap: 24 }}>
              {ACCOUNT_SETTINGS_TOGGLES.map((toggle) => (
                <View key={toggle.id} className="flex-row items-center justify-between">
                  <View className="flex-1 pr-4">
                    <Text className="font-label-lg text-label-lg text-primary">{toggle.label}</Text>
                    <Text className="font-body-md text-[12px] text-on-surface-variant">{toggle.description}</Text>
                  </View>
                  <ToggleSwitch value={toggles[toggle.id]} onToggle={() => handleToggle(toggle.id)} />
                </View>
              ))}
            </View>
          </View>

          {/* Log Out Button */}
          <TouchableOpacity
            onPress={handleLogout}
            className="mt-4 py-4 px-6 bg-primary rounded-full flex-row items-center justify-center gap-2"
            activeOpacity={0.85}
          >
            <Text className="text-[16px]">↪️</Text>
            <Text className="font-label-lg text-label-lg text-on-primary">Log Out</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
