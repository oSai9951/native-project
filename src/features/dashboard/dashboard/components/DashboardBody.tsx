import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import WelcomeCard from "./WelcomeCard";
import ClassesStudentsGrid from "./ClassesStudentsGrid";
import PendingTasksCard from "./PendingTasksCard";
import GoalsCard from "./GoalsCard";
import CalendarSlider from "./CalendarSlider";
import AcademicOverview from "./AcademicOverview";
import QuickActions from "./QuickActions";
import ProfileSideSheet from "@/profile/components/ProfileSideSheet";

interface DashboardBodyProps {
  onViewProfile?: () => void;
}

export default function DashboardBody({ onViewProfile }: DashboardBodyProps) {
  const [showProfileSheet, setShowProfileSheet] = useState(false);

  return (
    <LinearGradient 
      colors={["#c1d3c9", "#d8e6eb", "#f6e5ed", "#fffdd1"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        {/* Custom Header */}
        <View className="flex-row justify-between items-center px-4 py-3">
          <TouchableOpacity
            onPress={() => setShowProfileSheet(true)}
            className="flex-row items-center"
            activeOpacity={0.8}
          >
            {/* User Avatar Circle */}
            <View className="w-9 h-9 rounded-full border border-slate-200 overflow-hidden bg-slate-200 flex items-center justify-center mr-3">
              <Text className="text-base">👩‍🏫</Text>
            </View>
            <Text className="text-base font-bold text-slate-800 font-sans">
              Keelie
            </Text>
          </TouchableOpacity>
          
          {/* Bell Notifications Button */}
          <TouchableOpacity className="w-8 h-8 rounded-full bg-white/20 items-center justify-center border border-white/30">
            <Text className="text-base">🔔</Text>
          </TouchableOpacity>
        </View>

        {/* Scrollable Dashboard Body */}
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 120 }}
        >
          {/* Welcome Card banner */}
          <WelcomeCard />

          {/* Classes & Students Grid metrics */}
          <ClassesStudentsGrid />

          {/* Pending Tasks card notifier */}
          <PendingTasksCard />

          {/* Goals progress */}
          <GoalsCard />

          {/* Calendar weekly selector */}
          <CalendarSlider />

          {/* Academic Overview listing */}
          <AcademicOverview />

          {/* Bottom circular Quick Action buttons */}
          <QuickActions />
        </ScrollView>
      </SafeAreaView>

      <ProfileSideSheet
        visible={showProfileSheet}
        onClose={() => setShowProfileSheet(false)}
        onViewProfile={() => {
          setShowProfileSheet(false);
          onViewProfile?.();
        }}
      />
    </LinearGradient>
  );
}
