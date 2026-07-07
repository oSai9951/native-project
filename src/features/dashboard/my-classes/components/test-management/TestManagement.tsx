import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { CLASS_ASSESSMENTS_DATA, AssessmentItem } from "../../data/index";
import TestResultsModal from "../../view-results/TestResultsModal";

interface TestManagementProps {
  classId: string;
  onBack: () => void;
}

export default function TestManagement({ classId, onBack }: TestManagementProps) {
  const [resultsModalVisible, setResultsModalVisible] = React.useState(false);
  // Reference section name dynamically
  const sectionName = classId === "1" ? "Section 8A" : classId === "2" ? "Section 10B" : "Section 12C";

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
          <View className="flex-row items-center gap-3">
            <TouchableOpacity 
              onPress={onBack}
              className="w-10 h-10 items-center justify-center rounded-full bg-white/20 active:bg-white/40"
              activeOpacity={0.7}
            >
              <Ionicons name="arrow-back" size={24} color="#1C1B1B" />
            </TouchableOpacity>
            
            <View className="w-10 h-10 rounded-full bg-surface-variant overflow-hidden border border-outline-variant">
              <Image 
                source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuB8wFC0n9ru6-sE7iOqr63YbZws2GBqAvjxmFmt7Q0BplQHH1Sy0-DuV0spv_zhN4ej3vOI25d3q3w1blmUJ_3nK6j4xdCLoycZyFdrNPrZ93lpy84bn6Xzr0GJqW-vaw_1fj0-d9gSdWFTPSqK-UrAIsjabD5KiAEzXUgjEiXUJYlOH4oW5sQ8cpWMXjJGKZMYGs5QX2QFBMB8wCn_9aYy38r3LZDTfWkrIN1WUCCHYDFPkCo0CAN1" }}
                className="w-full h-full object-cover"
              />
            </View>
            <Text className="font-headline-lg-mobile text-headline-lg-mobile text-primary tracking-tighter">
              Classroom Hub
            </Text>
          </View>

          {/* Notifications button */}
          <TouchableOpacity 
            className="w-10 h-10 items-center justify-center rounded-full bg-white/20 active:bg-white/40"
            activeOpacity={0.7}
          >
            <Ionicons name="notifications-outline" size={24} color="#1C1B1B" />
          </TouchableOpacity>
        </View>

        {/* Scrollable Form Content */}
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingTop: 24,
            paddingBottom: 120,
          }}
        >
          {/* Title Header Section */}
          <View className="mb-6 gap-4">
            <View>
              <Text className="font-headline-lg-mobile text-[22px] leading-[28px] font-semibold text-primary">
                Test Management
              </Text>
              <Text className="font-body-md text-on-surface-variant mt-1">
                {`Managing 6 assessments for ${sectionName}`}
              </Text>
            </View>
            <TouchableOpacity 
              className="bg-primary px-6 py-3.5 rounded-full flex-row items-center justify-center gap-2 self-start shadow-sm active:scale-95"
              activeOpacity={0.8}
            >
              <Ionicons name="add" size={18} color="#FFFFFF" />
              <Text className="font-label-lg text-label-lg text-white">
                Create Test
              </Text>
            </TouchableOpacity>
          </View>

          {/* 2x2 Stats Grid */}
          <View className="flex-row flex-wrap -mx-2 mb-8">
            {/* Total Tests */}
            <View className="w-1/2 px-2 mb-4">
              <View 
                style={{ height: 110, backgroundColor: "#FEF9E7", borderColor: "rgba(249, 231, 159, 0.3)" }}
                className="p-5 rounded-[18px] border shadow-sm justify-between"
              >
                <Text className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">
                  Total Tests
                </Text>
                <View className="flex-row items-end gap-2">
                  <Text className="font-display-lg text-[32px] leading-none">06</Text>
                  <View className="bg-pastel-mint px-1.5 py-0.5 rounded-full mb-1">
                    <Text className="text-[9px] font-bold text-green-700">+2 this wk</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Avg Attendance */}
            <View className="w-1/2 px-2 mb-4">
              <View 
                style={{ height: 110, backgroundColor: "#EBF5FB", borderColor: "rgba(174, 214, 241, 0.3)" }}
                className="p-5 rounded-[18px] border shadow-sm justify-between"
              >
                <Text className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">
                  Avg. Attendance
                </Text>
                <Text className="font-display-lg text-[32px] leading-none">94%</Text>
                <View className="w-full bg-white bg-opacity-50 h-1.5 rounded-full overflow-hidden mt-1">
                  <View style={{ width: "94%" }} className="bg-primary h-full rounded-full" />
                </View>
              </View>
            </View>

            {/* Pass Rate */}
            <View className="w-1/2 px-2 mb-4">
              <View 
                style={{ height: 110, backgroundColor: "#E9F7EF", borderColor: "rgba(171, 235, 198, 0.3)" }}
                className="p-5 rounded-[18px] border shadow-sm justify-between"
              >
                <Text className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">
                  Pass Rate
                </Text>
                <Text className="font-display-lg text-[32px] leading-none font-bold">
                  88%
                </Text>
              </View>
            </View>

            {/* Pending Grading */}
            <View className="w-1/2 px-2 mb-4">
              <View 
                style={{ height: 110, backgroundColor: "#FDEDEC", borderColor: "rgba(250, 219, 216, 0.3)" }}
                className="p-5 rounded-[18px] border shadow-sm justify-between"
              >
                <Text className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">
                  Pending Grading
                </Text>
                <Text className="font-display-lg text-[32px] leading-none">12</Text>
                <View className="bg-[#FEF5E7] px-2 py-0.5 rounded-full self-start">
                  <Text className="text-[9px] font-bold text-[#D68910]">needs review</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Test Cards List */}
          <View className="mb-8 gap-5">
            {CLASS_ASSESSMENTS_DATA.map((item: AssessmentItem) => {
              const isLive = item.status === "LIVE";
              const isGraded = item.status === "GRADED";
              const isUpcoming = item.status === "UPCOMING";

              return (
                <View 
                  key={item.id}
                  className="bg-white border border-outline-variant rounded-card overflow-hidden flex-row shadow-sm relative"
                >
                  {/* Left accent bar */}
                  <View 
                    style={{ backgroundColor: item.sideBorderColor }}
                    className="w-1.5 absolute left-0 top-0 bottom-0" 
                  />

                  <View className="pl-6 pr-5 py-5 w-full">
                    {/* Header: Status badges & Options */}
                    <View className="flex-row justify-between items-start mb-3">
                      <View className="flex-row gap-2">
                        {isLive && (
                          <View className="bg-primary px-2.5 py-1 rounded-full flex-row items-center gap-1">
                            <View className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                            <Text className="text-white text-[10px] font-bold">LIVE</Text>
                          </View>
                        )}
                        {isGraded && (
                          <View className="bg-[#ABEBC6] px-2.5 py-1 rounded-full">
                            <Text className="text-[#1D8348] text-[10px] font-bold">GRADED</Text>
                          </View>
                        )}
                        {isUpcoming && (
                          <View className="bg-[#F9E79F] px-2.5 py-1 rounded-full">
                            <Text className="text-[#9A7D0A] text-[10px] font-bold">UPCOMING</Text>
                          </View>
                        )}
                        <View className="border border-outline px-2.5 py-1 rounded-full">
                          <Text className="text-on-surface-variant text-[10px] font-bold uppercase">
                            {item.type}
                          </Text>
                        </View>
                      </View>

                      {/* Options menu dot trigger */}
                      <TouchableOpacity className="p-1">
                        <Ionicons name="ellipsis-vertical" size={18} color="#747878" />
                      </TouchableOpacity>
                    </View>

                    {/* Title */}
                    <Text className="font-title-md text-title-md text-primary mb-3">
                      {item.title}
                    </Text>

                    {/* Conditional details block based on status */}
                    {isLive && (
                      <View className="mb-4">
                        {/* Parameters grid */}
                        <View className="flex-row flex-wrap mb-4">
                          <View className="w-1/2 flex-row items-center mb-2.5 gap-2">
                            <Ionicons name="calendar-outline" size={14} color="#747878" />
                            <Text className="text-xs text-on-surface-variant font-medium">{item.date}</Text>
                          </View>
                          <View className="w-1/2 flex-row items-center mb-2.5 gap-2">
                            <Ionicons name="time-outline" size={14} color="#747878" />
                            <Text className="text-xs text-on-surface-variant font-medium">{item.duration}</Text>
                          </View>
                          <View className="w-1/2 flex-row items-center mb-2.5 gap-2">
                            <Ionicons name="help-circle-outline" size={14} color="#747878" />
                            <Text className="text-xs text-on-surface-variant font-medium">{item.questions}</Text>
                          </View>
                          <View className="w-1/2 flex-row items-center mb-2.5 gap-2">
                            <Ionicons name="star-outline" size={14} color="#747878" />
                            <Text className="text-xs text-on-surface-variant font-medium">{item.marks}</Text>
                          </View>
                        </View>

                        {/* Submission Progress bar */}
                        <View className="mb-2">
                          <View className="flex-row justify-between text-[11px] font-bold uppercase mb-1.5">
                            <Text className="text-slate-500">{`Submissions: ${item.submissionCount}`}</Text>
                            <Text className="text-slate-700">{`${item.submissionPercent}%`}</Text>
                          </View>
                          <View className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                            <View 
                              style={{ width: `${item.submissionPercent ?? 0}%` }}
                              className="bg-primary h-full rounded-full"
                            />
                          </View>
                        </View>
                      </View>
                    )}

                    {isGraded && (
                      <View className="mb-4">
                        <View className="flex-row justify-between text-[11px] font-bold uppercase mb-1.5 text-on-surface-variant">
                          <Text className="text-slate-500">{`Class Avg: ${item.classAverage}%`}</Text>
                        </View>
                        <View className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                          <View 
                            style={{ width: `${item.classAverage ?? 0}%` }}
                            className="bg-[#2ECC71] h-full rounded-full"
                          />
                        </View>
                      </View>
                    )}

                    {isUpcoming && (
                      <Text className="text-xs text-on-surface-variant mb-4">
                        {item.scheduledTime}
                      </Text>
                    )}

                    {/* Actions buttons row */}
                    {isLive && (
                      <View className="flex-row gap-3">
                        <TouchableOpacity className="flex-1 py-2.5 rounded-full border border-primary items-center justify-center">
                          <Text className="font-label-lg text-label-lg text-primary">Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="flex-1 py-2.5 rounded-full bg-primary items-center justify-center">
                          <Text className="font-label-lg text-label-lg text-white">View Live</Text>
                        </TouchableOpacity>
                      </View>
                    )}

                    {isGraded && (
                      <TouchableOpacity 
                        onPress={() => setResultsModalVisible(true)}
                        className="w-full py-2.5 rounded-full border border-primary items-center justify-center"
                      >
                        <Text className="font-label-lg text-label-lg text-primary">View Results</Text>
                      </TouchableOpacity>
                    )}

                    {isUpcoming && (
                      <TouchableOpacity className="w-full py-2.5 rounded-full border border-primary items-center justify-center">
                        <Text className="font-label-lg text-label-lg text-primary">Manage Schedule</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              );
            })}
          </View>

          {/* Class Performance Trend Bar Chart */}
          <View className="bg-white border border-outline-variant rounded-card p-6 mb-8 shadow-sm">
            <View className="flex-row justify-between items-center mb-6">
              <Text className="font-title-md text-title-md text-primary font-semibold">
                Class Performance Trend
              </Text>
              <TouchableOpacity className="flex-row items-center gap-1 border border-outline-variant rounded-full px-3 py-1 bg-surface-container-low">
                <Text className="text-[10px] font-bold uppercase tracking-wider text-slate-700">Last 6 Months</Text>
                <Text className="text-[10px]">▼</Text>
              </TouchableOpacity>
            </View>

            {/* Custom chart columns bar layout */}
            <View className="h-48 flex-row items-end justify-between px-2 pt-4">
              <View className="flex-col items-center flex-1">
                <View className="w-5 bg-primary rounded-t-lg" style={{ height: 75 }} />
                <Text className="text-[10px] mt-2 font-semibold text-slate-500">MAY</Text>
              </View>
              <View className="flex-col items-center flex-1">
                <View className="w-5 bg-primary rounded-t-lg" style={{ height: 100 }} />
                <Text className="text-[10px] mt-2 font-semibold text-slate-500">JUN</Text>
              </View>
              <View className="flex-col items-center flex-1">
                <View className="w-5 bg-primary rounded-t-lg" style={{ height: 92 }} />
                <Text className="text-[10px] mt-2 font-semibold text-slate-500">JUL</Text>
              </View>
              <View className="flex-col items-center flex-1">
                <View className="w-5 bg-primary rounded-t-lg" style={{ height: 134 }} />
                <Text className="text-[10px] mt-2 font-semibold text-slate-500">AUG</Text>
              </View>
              <View className="flex-col items-center flex-1">
                <View className="w-5 bg-primary rounded-t-lg" style={{ height: 117 }} />
                <Text className="text-[10px] mt-2 font-semibold text-slate-500">SEP</Text>
              </View>
              <View className="flex-col items-center flex-1">
                <View className="w-5 bg-[#2ECC71] rounded-t-lg border-2 border-white" style={{ height: 151 }} />
                <Text className="text-[10px] mt-2 font-bold text-[#27AE60]">OCT</Text>
              </View>
            </View>
          </View>

          {/* AI Grading Assistant Card Banner */}
          <View className="bg-primary-container p-6 rounded-card mb-10 flex-col items-center text-center">
            <View className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4">
              <Ionicons name="sparkles" size={32} color="#FEF9C3" />
            </View>
            <Text className="font-headline-lg-mobile text-[20px] text-white font-bold mb-2 text-center">
              AI Grading Assistant
            </Text>
            <Text className="font-body-md text-on-primary-container mb-6 max-w-[240px] text-center">
              Speed up your feedback loop with automated scoring and sentiment analysis on written papers.
            </Text>
            <TouchableOpacity 
              className="bg-[#ABEBC6] px-8 py-3.5 rounded-full flex-row items-center gap-2 active:scale-95"
              activeOpacity={0.8}
            >
              <Text className="text-[#0E6655] font-bold font-label-lg text-label-lg">
                Launch Assistant
              </Text>
              <Text className="text-[16px]">🚀</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
      <TestResultsModal 
        visible={resultsModalVisible}
        onClose={() => setResultsModalVisible(false)}
        testTitle="Advanced Calculus: Phase 1"
      />
    </LinearGradient>
  );
}
