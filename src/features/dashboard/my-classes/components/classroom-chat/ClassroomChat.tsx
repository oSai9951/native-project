import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { STUDENT_ROSTER_DATA, StudentRosterItem } from "../../data/index";

interface ClassroomChatProps {
  classId: string;
  onBack: () => void;
}

export default function ClassroomChat({ classId, onBack }: ClassroomChatProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock reference section info based on classId
  const sectionName = classId === "1" ? "Section 8A" : classId === "2" ? "Section 10B" : "Section 12C";
  const subjectName = classId === "1" ? "Mathematics" : classId === "2" ? "Physics" : "Calculus";

  // Filter students dynamically based on search input
  const filteredStudents = STUDENT_ROSTER_DATA.filter((student) => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <LinearGradient 
      colors={["#c1d3c9", "#d8e6eb", "#f6e5ed", "#fffdd1"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        {/* Top App Bar Header */}
        <View className="px-gutter py-4 w-full flex-row justify-between items-center border-b border-surface-container-highest bg-surface/30 z-50">
          <View className="flex-row items-center">
            <TouchableOpacity 
              onPress={onBack}
              className="mr-3 p-1"
            >
              <Text className="text-[20px]">⬅️</Text>
            </TouchableOpacity>
            <View className="flex-col">
              <Text className="font-headline-lg-mobile text-[20px] font-bold text-primary leading-tight">
                Classroom Roster
              </Text>
              <Text className="font-label-lg text-on-surface-variant font-medium">
                {`${subjectName} · ${sectionName}`}
              </Text>
            </View>
          </View>

          {/* Search Button */}
          <TouchableOpacity className="w-10 h-10 items-center justify-center rounded-full bg-white/20">
            <Text className="text-[18px]">🔍</Text>
          </TouchableOpacity>
        </View>

        {/* Search Input Box */}
        <View className="px-gutter py-4">
          <View className="relative flex-row items-center bg-white/60 border border-black/5 rounded-xl px-4 py-3 shadow-sm">
            <Text className="text-[16px] mr-3">🔍</Text>
            <TextInput 
              className="flex-1 font-body-md text-on-surface outline-none"
              placeholder="Search students..."
              placeholderTextColor="#94a3b8"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Student List Scrollable */}
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 120,
          }}
          className="flex-1 bg-white/50 border-t border-black/5"
        >
          {filteredStudents.map((item: StudentRosterItem) => (
            <TouchableOpacity 
              key={item.id}
              className="flex-row items-center justify-between px-gutter py-4 border-b border-slate-100 active:bg-slate-200"
              activeOpacity={0.7}
            >
              <View className="flex-row items-center gap-4">
                {/* Initials Avatar container */}
                <View className="relative">
                  <View 
                    className={`w-12 h-12 rounded-full items-center justify-center border border-black/5 ${item.avatarBgColor}`}
                  >
                    <Text className={`font-title-md text-[16px] font-semibold ${item.avatarTextColor}`}>
                      {item.initials}
                    </Text>
                  </View>
                  {/* Active Indicator dot */}
                  {item.isOnline && (
                    <View className="w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full absolute bottom-0 right-0" />
                  )}
                </View>

                {/* Name & roll details */}
                <View className="flex-col">
                  <View className="flex-row items-center gap-2">
                    <Text className="font-label-lg text-primary font-bold">
                      {item.name}
                    </Text>
                    <Text className="font-label-sm text-[11px] text-on-surface-variant font-medium">
                      {item.rollNumber}
                    </Text>
                  </View>
                  <Text 
                    numberOfLines={1}
                    className="font-body-md text-on-surface-variant mt-0.5 max-w-[180px]"
                  >
                    {item.lastMessage}
                  </Text>
                </View>
              </View>

              {/* Message indicators */}
              <View className="flex-col items-end justify-center">
                <Text className="font-label-sm text-on-surface-variant text-[11px]">
                  {item.timeAgo}
                </Text>
                {item.unreadCount && (
                  <View className="bg-primary px-2 py-0.5 rounded-full mt-1.5 min-w-[20px] items-center justify-center">
                    <Text className="text-white text-[10px] font-bold">
                      {item.unreadCount}
                    </Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
