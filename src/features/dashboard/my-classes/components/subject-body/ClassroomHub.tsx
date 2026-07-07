import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { MY_CLASSES_DATA } from "../../data/index";

interface ClassroomHubProps {
  classId: string;
  onBack: () => void;
  onOpenMaterials: () => void;
  onOpenChat: () => void;
  onOpenTests: () => void;
  onOpenRatings: () => void;
  onOpenAttendance: () => void;
  onOpenRoom: () => void;
}

export default function ClassroomHub({ classId, onBack, onOpenMaterials, onOpenChat, onOpenTests, onOpenRatings, onOpenAttendance, onOpenRoom }: ClassroomHubProps) {
  // Find the selected class details from the mock database
  const selectedClass = MY_CLASSES_DATA.classes.find((item) => item.id === classId) || MY_CLASSES_DATA.classes[0];

  return (
    <LinearGradient 
      colors={["#c1d3c9", "#d8e6eb", "#f6e5ed", "#fffdd1"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        {/* Custom Header */}
        <View className="px-gutter py-base w-full flex-row justify-between items-center z-50">
          <View className="flex-row items-center">
            {/* Back button and profile circle */}
            <TouchableOpacity 
              onPress={onBack}
              className="flex-row items-center mr-3"
            >
              <Text className="text-[20px] mr-2">⬅️</Text>
              <View className="w-10 h-10 rounded-full overflow-hidden bg-surface-container-high border border-black/5">
                <Image 
                  source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuAYEzci-vxxcqCSSihQXNot5-71biFi6eN-ddqHYwNS4B_sFxgxMvthY50BNDFFMNBu4cWxOGTLp8whAAwqrBFIa4tmgCSDD3AtfcPsrJ1L4S38nII1vlb9HmP917V0JP3Clc-VLpcOKCf1OkN0b-KFV0IOXCt77_ZA6_mL0P1X5KYNuvuaLh_jGNlgztZ7PNHxoymI_08Bnw8Q3epmAR42AwYGngEhdqLqwpz-Ks3fSG2AkjV4vqb-" }}
                  className="w-full h-full object-cover"
                />
              </View>
            </TouchableOpacity>
            <Text className="font-headline-lg-mobile text-headline-lg-mobile text-primary tracking-tighter">
              Classroom Hub
            </Text>
          </View>

          {/* Notification Button */}
          <TouchableOpacity className="p-1">
            <Text className="text-[20px]">🔔</Text>
          </TouchableOpacity>
        </View>

        {/* Main Content Area */}
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingTop: 12,
            paddingBottom: 120,
          }}
        >
          {/* Main Classroom Hero Card */}
          <View 
            style={{
              backgroundColor: selectedClass.bgColor,
              borderColor: selectedClass.borderColor,
            }}
            className="border rounded-card p-6 shadow-sm overflow-hidden"
          >
            <Text className="font-label-sm text-[10px] text-slate-500 uppercase tracking-widest opacity-80">
              BETA CLASSROOM
            </Text>

            <View className="flex-row justify-between items-start mt-2">
              <View>
                <Text className="font-headline-lg text-headline-lg text-primary tracking-tighter">
                  {selectedClass.title}
                </Text>
                <Text className="font-title-md text-title-md text-slate-500 mt-0.5">
                  {`Class ${selectedClass.section.split(" ")[1] || selectedClass.section}`}
                </Text>
              </View>

              {/* Progress Tracker (Top Right) */}
              <View className="items-end">
                <View className="flex-row items-center mb-1">
                  <Text className="text-[14px] mr-1">📈</Text>
                  <Text className="font-label-sm text-label-sm text-primary">
                    {`Avg progress ${selectedClass.classAverage}%`}
                  </Text>
                </View>
                <View className="w-24 h-1.5 bg-white/40 rounded-full overflow-hidden">
                  <View 
                    style={{ width: `${selectedClass.classAverage}%` }}
                    className="h-full bg-primary rounded-full"
                  />
                </View>
              </View>
            </View>

            {/* Metadata List */}
            <View className="mt-6 space-y-3">
              <View className="flex-row items-center">
                <View className="w-8 h-8 rounded-full bg-white flex items-center justify-center mr-3 border border-black/5 shadow-sm">
                  <Text className="text-[15px]">👥</Text>
                </View>
                <Text className="font-body-md text-body-md text-slate-600">
                  {`${selectedClass.studentsCount * 1.5} students`}
                </Text>
              </View>

              <View className="flex-row items-center">
                <View className="w-8 h-8 rounded-full bg-white flex items-center justify-center mr-3 border border-black/5 shadow-sm">
                  <Text className="text-[15px]">📅</Text>
                </View>
                <Text className="font-body-md text-body-md text-slate-600">
                  {selectedClass.id === "1" 
                    ? "Mon, Wed, Fri • 9:00–9:45 AM" 
                    : selectedClass.id === "2"
                    ? "Tue, Thu • 10:00–11:30 AM"
                    : "Mon, Wed, Fri • 11:00–12:00 PM"}
                </Text>
              </View>

              <View className="flex-row items-center">
                <View className="w-8 h-8 rounded-full bg-white flex items-center justify-center mr-3 border border-black/5 shadow-sm">
                  <Text className="text-[15px]">📍</Text>
                </View>
                <Text className="font-body-md text-body-md text-slate-600">
                  {`Block ${selectedClass.room.split("Room ")[1]?.split("-")[0] || "C"} • ${selectedClass.room.split("-")[1] || "101"}`}
                </Text>
              </View>
            </View>

            {/* Bento Sub-tiles */}
            <View className="flex-row gap-3 mt-8">
              {/* Tile 1: Pending */}
              <View className="flex-1 bg-white/60 border border-white/80 p-4 rounded-xl items-center justify-center">
                <Text className="text-[22px] mb-1">⚠️</Text>
                <Text className="font-headline-lg text-headline-lg leading-none">
                  {selectedClass.pendingCount || 8}
                </Text>
                <Text className="font-label-sm text-label-sm text-slate-500 opacity-60 mt-1 uppercase tracking-wide">
                  PENDING
                </Text>
              </View>

              {/* Tile 2: Materials */}
              <View className="flex-1 bg-white/60 border border-white/80 p-4 rounded-xl items-center justify-center">
                <Text className="text-[22px] mb-1">📖</Text>
                <Text className="font-headline-lg text-headline-lg leading-none">
                  3
                </Text>
                <Text className="font-label-sm text-label-sm text-slate-500 opacity-60 mt-1 uppercase tracking-wide">
                  MATERIALS
                </Text>
              </View>
            </View>

            {/* Bottom Badges */}
            <View className="flex-row gap-2 mt-6">
              <View className="bg-emerald-100 border border-emerald-200 px-3 py-1.5 rounded-full">
                <Text className="font-label-sm text-label-sm text-emerald-800">
                  {selectedClass.allGraded ? "All graded" : "1 graded"}
                </Text>
              </View>
              <View className="border border-black/10 px-3 py-1.5 rounded-full">
                <Text className="font-label-sm text-label-sm text-slate-600">
                  2 total tests
                </Text>
              </View>
            </View>
          </View>

          {/* Quick Links Section */}
          <View className="mt-8">
            <Text className="font-label-sm text-label-sm text-slate-400 uppercase tracking-widest mb-4">
              Quick Links
            </Text>

            <View className="flex-row flex-wrap -mx-1.5">
              {/* Materials */}
              <TouchableOpacity 
                onPress={onOpenMaterials}
                className="w-1/2 px-1.5 mb-3"
                activeOpacity={0.8}
              >
                <View className="bg-white border border-surface-container-high rounded-xl p-4 flex-row items-center shadow-sm">
                  <View className="w-10 h-10 rounded-full bg-pastel-sky flex items-center justify-center mr-3">
                    <Text className="text-[18px]">📁</Text>
                  </View>
                  <Text className="font-label-lg text-label-lg text-primary">
                    Materials
                  </Text>
                </View>
              </TouchableOpacity>

              {/* Chat */}
              <TouchableOpacity 
                onPress={() => {
                  console.log("Chat card clicked inside ClassroomHub!");
                  onOpenChat();
                }}
                className="w-1/2 px-1.5 mb-3"
                activeOpacity={0.8}
              >
                <View className="bg-white border border-surface-container-high rounded-xl p-4 flex-row items-center shadow-sm">
                  <View className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mr-3">
                    <Text className="text-[18px]">💬</Text>
                  </View>
                  <Text className="font-label-lg text-label-lg text-primary">
                    Chat
                  </Text>
                </View>
              </TouchableOpacity>

              {/* Tests */}
              <TouchableOpacity 
                onPress={onOpenTests}
                className="w-1/2 px-1.5 mb-3"
                activeOpacity={0.8}
              >
                <View className="bg-white border border-surface-container-high rounded-xl p-4 flex-row items-center shadow-sm">
                  <View className="w-10 h-10 rounded-full bg-pastel-amber flex items-center justify-center mr-3">
                    <Text className="text-[18px]">📝</Text>
                  </View>
                  <Text className="font-label-lg text-label-lg text-primary">
                    Tests
                  </Text>
                </View>
              </TouchableOpacity>

              {/* Attendance */}
              <TouchableOpacity 
                onPress={onOpenAttendance}
                className="w-1/2 px-1.5 mb-3"
                activeOpacity={0.8}
              >
                <View className="bg-white border border-surface-container-high rounded-xl p-4 flex-row items-center shadow-sm">
                  <View className="w-10 h-10 rounded-full bg-pastel-violet flex items-center justify-center mr-3">
                    <Text className="text-[18px]">📋</Text>
                  </View>
                  <Text className="font-label-lg text-label-lg text-primary">
                    Attendance
                  </Text>
                </View>
              </TouchableOpacity>

              {/* Ratings */}
              <TouchableOpacity 
                onPress={onOpenRatings}
                className="w-1/2 px-1.5 mb-3"
                activeOpacity={0.8}
              >
                <View className="bg-white border border-surface-container-high rounded-xl p-4 flex-row items-center shadow-sm">
                  <View className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center mr-3">
                    <Text className="text-[18px]">⭐</Text>
                  </View>
                  <Text className="font-label-lg text-label-lg text-primary">
                    Ratings
                  </Text>
                </View>
              </TouchableOpacity>

              {/* Room */}
              <TouchableOpacity
                onPress={onOpenRoom}
                className="w-1/2 px-1.5 mb-3"
                activeOpacity={0.8}
              >
                <View className="bg-white border border-surface-container-high rounded-xl p-4 flex-row items-center shadow-sm">
                  <View className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <Text className="text-[18px]">📹</Text>
                  </View>
                  <Text className="font-label-lg text-label-lg text-primary">
                    Room
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
