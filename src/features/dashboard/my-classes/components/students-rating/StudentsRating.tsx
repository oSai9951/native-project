import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { STUDENT_RATINGS_DATA, StudentRatingItem } from "../../data/index";
import StudentRatingDetail from "./StudentRatingDetail";

interface StudentsRatingProps {
  classId: string;
  onBack: () => void;
}

type SortOption = "name" | "rating" | "trend";

export default function StudentsRating({ classId, onBack }: StudentsRatingProps) {
  const [selectedStudent, setSelectedStudent] = useState<StudentRatingItem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("rating");

  if (selectedStudent) {
    return (
      <StudentRatingDetail 
        student={selectedStudent} 
        onBack={() => setSelectedStudent(null)}
        onSave={(updated) => {
          const idx = STUDENT_RATINGS_DATA.findIndex(s => s.id === updated.id);
          if (idx !== -1) {
            STUDENT_RATINGS_DATA[idx] = updated;
          }
          setSelectedStudent(null);
        }}
      />
    );
  }

  // Reference section name dynamically
  const sectionName = classId === "1" ? "Section 8A" : classId === "2" ? "Section 10B" : "Section 12C";
  const subjectName = classId === "1" ? "Mathematics" : classId === "2" ? "Physics" : "Calculus";

  // Filter students based on search query
  const filteredStudents = STUDENT_RATINGS_DATA.filter((student) => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort students based on selected option
  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    }
    if (sortBy === "rating") {
      return b.rating - a.rating;
    }
    if (sortBy === "trend") {
      // Up -> Flat -> Down ordering
      const trendWeight = { up: 3, flat: 2, down: 1 };
      return trendWeight[b.trend] - trendWeight[a.trend];
    }
    return 0;
  });

  // Helper component to render stars
  const renderStars = (count: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Ionicons 
          key={i}
          name={i <= count ? "star" : "star-outline"} 
          size={14} 
          color="#EAB308" 
          style={{ marginRight: 2 }}
        />
      );
    }
    return <View className="flex-row mt-1">{stars}</View>;
  };

  return (
    <LinearGradient 
      colors={["#c1d3c9", "#d8e6eb", "#f6e5ed", "#fffdd1"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        {/* Top App Bar */}
        <View className="px-container-padding pt-6 pb-4 w-full border-b border-surface-container-highest bg-surface/30 z-50">
          <View className="flex-row items-center gap-4 mb-2">
            <TouchableOpacity 
              onPress={onBack}
              className="w-10 h-10 items-center justify-center rounded-full bg-white/20 active:bg-white/40"
              activeOpacity={0.7}
            >
              <Ionicons name="arrow-back" size={24} color="#1C1B1B" />
            </TouchableOpacity>
            <Text className="font-headline-lg-mobile text-headline-lg-mobile text-primary tracking-tighter">
              Student Ratings
            </Text>
          </View>
          <Text className="font-body-md text-body-md text-on-surface-variant ml-12">
            {`Evaluations for ${subjectName} ${sectionName.split("Section ")[1] || sectionName}`}
          </Text>
        </View>

        {/* Scrollable Content */}
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingTop: 24,
            paddingBottom: 120,
          }}
        >
          {/* Summary Grid (2x2) */}
          <View className="flex-row flex-wrap -mx-2 mb-6">
            {/* Class Average */}
            <View className="w-1/2 px-2 mb-4">
              <View 
                style={{ height: 130, backgroundColor: "#FEF9C3", borderColor: "#FDE68A" }}
                className="rounded-2xl p-4 flex-col justify-between border shadow-sm"
              >
                <Text className="font-label-lg text-[13px] text-on-secondary-container font-semibold">
                  Class Average
                </Text>
                <View>
                  <Text className="font-headline-lg text-headline-lg text-primary">4.2</Text>
                  <Text className="font-label-sm text-label-sm text-on-surface-variant">out of 5.0</Text>
                </View>
              </View>
            </View>

            {/* Students Rated */}
            <View className="w-1/2 px-2 mb-4">
              <View 
                style={{ height: 130, backgroundColor: "#E0F2FE", borderColor: "#BAE6FD" }}
                className="rounded-2xl p-4 flex-col justify-between border shadow-sm"
              >
                <Text className="font-label-lg text-[13px] text-on-tertiary-container font-semibold">
                  Students Rated
                </Text>
                <View>
                  <Text className="font-headline-lg text-headline-lg text-primary">22</Text>
                  <Text className="font-label-sm text-label-sm text-on-surface-variant">of 24 students</Text>
                </View>
              </View>
            </View>

            {/* Top Performers */}
            <View className="w-1/2 px-2 mb-4">
              <View 
                style={{ height: 130, backgroundColor: "#DCFCE7", borderColor: "#BBF7D0" }}
                className="rounded-2xl p-4 flex-col justify-between border shadow-sm"
              >
                <Text className="font-label-lg text-[13px] text-[#166534] font-semibold">
                  Top Performers
                </Text>
                <View>
                  <Text className="font-headline-lg text-headline-lg text-[#15803d]">9</Text>
                  <Text className="font-label-sm text-label-sm text-[#166534]">rated 4.5+</Text>
                </View>
              </View>
            </View>

            {/* Needs Attention */}
            <View className="w-1/2 px-2 mb-4">
              <View 
                style={{ height: 130, backgroundColor: "#FEE2E2", borderColor: "#FECACA" }}
                className="rounded-2xl p-4 flex-col justify-between border shadow-sm"
              >
                <Text className="font-label-lg text-[13px] text-[#991B1B] font-semibold">
                  Needs Attention
                </Text>
                <View>
                  <Text className="font-headline-lg text-headline-lg text-[#B91C1C]">2</Text>
                  <Text className="font-label-sm text-label-sm text-[#991B1B]">rated below 3.0</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Search bar & Filter Toolbar */}
          <View className="mb-6 gap-4">
            {/* Search Box */}
            <View className="relative flex-row items-center bg-white/65 border border-black/5 rounded-2xl px-4 py-3 shadow-sm">
              <Text className="text-[16px] mr-3">🔍</Text>
              <TextInput 
                className="flex-1 font-body-md text-on-surface outline-none"
                placeholder="Search students..."
                placeholderTextColor="#94a3b8"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

            {/* Segmented Sort Buttons & Export */}
            <View className="flex-row items-center justify-between gap-2">
              <View className="flex-row bg-white/40 border border-black/5 rounded-full p-1">
                {(["name", "rating", "trend"] as SortOption[]).map((option) => {
                  const isActive = sortBy === option;
                  return (
                    <TouchableOpacity
                      key={option}
                      onPress={() => setSortBy(option)}
                      className={`px-4 py-1.5 rounded-full ${isActive ? "bg-primary" : ""}`}
                      activeOpacity={0.8}
                    >
                      <Text 
                        className={`font-label-lg text-[13px] font-semibold uppercase ${isActive ? "text-white" : "text-on-surface-variant"}`}
                      >
                        {option}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              <TouchableOpacity 
                className="flex-row items-center gap-2 px-5 py-2 border border-primary rounded-full bg-white active:scale-95 shadow-sm"
                activeOpacity={0.8}
              >
                <Text className="font-label-lg text-label-lg text-primary font-bold">
                  Export
                </Text>
                <Ionicons name="trending-up-outline" size={16} color="#000000" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Legend Criteria Bar */}
          <View className="bg-white/50 border border-black/5 rounded-2xl p-2 pr-4 flex-row items-center mb-6 shadow-sm">
            <View className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-3 border border-black/5">
              <Text className="text-[18px]">🏆</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row items-center gap-2 pr-4">
                <Text className="font-label-lg text-label-lg text-primary mr-1">Rating criteria:</Text>
                {["Participation", "Understanding", "Behaviour", "Homework"].map((criteria) => (
                  <View key={criteria} className="bg-primary px-3 py-1 rounded-full">
                    <Text className="font-label-sm text-[11px] text-white font-bold">{criteria}</Text>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Student Ratings List Stack */}
          <View className="gap-5">
            {sortedStudents.map((item: StudentRatingItem) => {
              const isUp = item.trend === "up";
              const isFlat = item.trend === "flat";
              const isDown = item.trend === "down";

              return (
                <TouchableOpacity 
                  key={item.id}
                  onPress={() => setSelectedStudent(item)}
                  className="bg-white border border-outline-variant rounded-card p-5 flex-col gap-4 shadow-sm"
                  activeOpacity={0.8}
                >
                  {/* Top card block */}
                  <View className="flex-row items-center gap-4">
                    {/* Circle Avatar Initials */}
                    <View 
                      style={{ backgroundColor: item.avatarBg }}
                      className="w-12 h-12 rounded-full items-center justify-center border border-black/5"
                    >
                      <Text style={{ color: item.avatarText }} className="font-title-md text-[16px] font-bold">
                        {item.initials}
                      </Text>
                    </View>

                    {/* Name details */}
                    <View className="flex-1">
                      <Text className="font-title-md text-title-md text-primary font-bold">
                        {item.name}
                      </Text>
                      <Text className="font-body-md text-body-md text-on-surface-variant mt-0.5">
                        {item.rollNumber}
                      </Text>
                    </View>

                    {/* Score & trend arrows */}
                    <View className="items-end justify-center">
                      <View className="flex-row items-center gap-1">
                        <Text className="font-headline-lg-mobile text-headline-lg-mobile text-primary font-bold">
                          {item.rating.toFixed(1)}
                        </Text>
                        {isUp && (
                          <Ionicons name="arrow-up" size={18} color="#15803d" />
                        )}
                        {isFlat && (
                          <Ionicons name="arrow-forward" size={18} color="#747878" />
                        )}
                        {isDown && (
                          <Ionicons name="arrow-down" size={18} color="#B91C1C" />
                        )}
                      </View>
                      
                      <TouchableOpacity className="p-0.5">
                        <Ionicons name="chevron-down-outline" size={18} color="#747878" />
                      </TouchableOpacity>
                    </View>
                  </View>

                  {/* Star criteria list grid details */}
                  <View className="grid grid-cols-2 gap-y-3 pt-4 border-t border-surface-container flex-row flex-wrap">
                    <View className="w-1/2 mb-2 pr-2">
                      <Text className="font-label-sm text-[11px] text-on-surface-variant font-medium uppercase tracking-wider">
                        Participation
                      </Text>
                      {renderStars(item.ratings.participation)}
                    </View>
                    <View className="w-1/2 mb-2 pr-2">
                      <Text className="font-label-sm text-[11px] text-on-surface-variant font-medium uppercase tracking-wider">
                        Understanding
                      </Text>
                      {renderStars(item.ratings.understanding)}
                    </View>
                    <View className="w-1/2 mb-2 pr-2">
                      <Text className="font-label-sm text-[11px] text-on-surface-variant font-medium uppercase tracking-wider">
                        Behaviour
                      </Text>
                      {renderStars(item.ratings.behaviour)}
                    </View>
                    <View className="w-1/2 mb-2 pr-2">
                      <Text className="font-label-sm text-[11px] text-on-surface-variant font-medium uppercase tracking-wider">
                        Homework
                      </Text>
                      {renderStars(item.ratings.homework)}
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
