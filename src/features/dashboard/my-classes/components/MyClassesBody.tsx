import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { MY_CLASSES_DATA, ClassItem } from "../data/index";

interface MyClassesBodyProps {
  onSelectClass: (id: string) => void;
}

export default function MyClassesBody({ onSelectClass }: MyClassesBodyProps) {
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
            {/* Menu icon (three lines) */}
            <TouchableOpacity className="mr-3 p-1">
              <View className="w-5 h-0.5 bg-on-surface mb-1" />
              <View className="w-5 h-0.5 bg-on-surface mb-1" />
              <View className="w-3 h-0.5 bg-on-surface" />
            </TouchableOpacity>
            <Text className="font-headline-lg-mobile text-headline-lg-mobile text-primary tracking-tighter">
              My Classes
            </Text>
          </View>

          {/* BETA Badge */}
          <View className="bg-black/5 border border-black/10 px-3 py-1 rounded-full">
            <Text className="font-label-sm text-label-sm text-slate-600 tracking-wider">
              BETA
            </Text>
          </View>
        </View>

        {/* Scrollable Container */}
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingTop: 12,
            paddingBottom: 120,
          }}
        >
          {/* Header Subtitle Section */}
          <View className="mb-6">
            <Text className="font-label-sm text-[10px] uppercase tracking-widest text-slate-400 opacity-80">
              Beta Preview
            </Text>
            <Text className="font-body-md text-body-md text-slate-500 mt-1">
              Manage and access each classroom workspace.
            </Text>
          </View>

          {/* Teacher Summary Row */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={{ paddingRight: 48 }}
            style={{
              marginLeft: -24,
              marginRight: -24,
              paddingLeft: 24,
              paddingRight: 24,
            }}
            className="mb-6"
          >
            <View className="flex-row">
              {/* Teacher Profile Card */}
              <View className="bg-white border border-black/5 rounded-xl p-4 flex-row items-center mr-4 shadow-sm w-64">
                <View className="w-12 h-12 bg-on-surface rounded-full items-center justify-center mr-4">
                  <Text className="font-label-lg text-label-lg text-white">
                    {MY_CLASSES_DATA.teacher.initials}
                  </Text>
                </View>
                <View className="flex-1">
                  <Text className="font-label-lg text-slate-900 leading-tight">
                    {MY_CLASSES_DATA.teacher.name}
                  </Text>
                  <Text className="font-body-md text-[12px] text-slate-500 mt-0.5">
                    {MY_CLASSES_DATA.teacher.role}
                  </Text>
                </View>
              </View>

              {/* Total Students Card */}
              <View className="bg-white border border-black/5 rounded-xl p-4 justify-between mr-4 shadow-sm w-40">
                <Text className="font-label-sm text-label-sm text-slate-400 uppercase tracking-wide">
                  Total Students
                </Text>
                <Text className="font-display-lg text-[24px] text-slate-900 mt-1">
                  {MY_CLASSES_DATA.totalStudents}
                </Text>
              </View>

              {/* Pending Card */}
              <View className="bg-pastel-butter border border-black/5 rounded-xl p-4 justify-between shadow-sm w-40">
                <Text className="font-label-sm text-label-sm text-amber-600 uppercase tracking-wide">
                  Pending
                </Text>
                <Text className="font-display-lg text-[24px] text-slate-900 mt-1">
                  {`0${MY_CLASSES_DATA.pendingTasks}`}
                </Text>
              </View>
            </View>
          </ScrollView>

          {/* Classroom Stack */}
          <View className="mt-2">
            {MY_CLASSES_DATA.classes.map((item: ClassItem) => (
              <View 
                key={item.id} 
                style={{ 
                  backgroundColor: item.bgColor, 
                  borderColor: item.borderColor,
                }}
                className="rounded-card border overflow-hidden mb-6 shadow-sm"
              >
                {/* Top Accent Line */}
                <View 
                  style={{ backgroundColor: item.accentLineColor }} 
                  className="h-1 w-full"
                />

                <View className="p-6">
                  {/* Card Header: Subject, Section & Badge */}
                  <View className="flex-row justify-between items-start mb-4">
                    <View>
                      <Text className="font-headline-lg text-headline-lg text-primary tracking-tighter">
                        {item.title}
                      </Text>
                      <Text className="font-body-md text-body-md text-slate-500 mt-0.5">
                        {item.section}
                      </Text>
                    </View>

                    {/* Status badge */}
                    <View 
                      style={{ 
                        backgroundColor: item.badgeBg, 
                        borderColor: item.badgeBorderColor 
                      }}
                      className="px-3 py-1 rounded-full flex-row items-center border"
                    >
                      <View 
                        style={{ backgroundColor: item.badgeTextColor }} 
                        className="w-1.5 h-1.5 rounded-full mr-1.5"
                      />
                      <Text 
                        style={{ color: item.badgeTextColor }}
                        className="font-label-sm text-[10px] tracking-wide"
                      >
                        {item.badgeText}
                      </Text>
                    </View>
                  </View>

                  {/* Attributes 2x2 Grid */}
                  <View className="flex-row flex-wrap mb-4 pt-2">
                    <View className="w-1/2 flex-row items-center mb-3 pr-2">
                      <View className="w-8 h-8 rounded-full bg-white items-center justify-center mr-2 border border-black/5 shadow-sm">
                        <Text className="text-[15px]">👥</Text>
                      </View>
                      <Text className="font-label-lg text-slate-700">
                        {`${item.studentsCount} students`}
                      </Text>
                    </View>
                    <View className="w-1/2 flex-row items-center mb-3 pr-2">
                      <View className="w-8 h-8 rounded-full bg-white items-center justify-center mr-2 border border-black/5 shadow-sm">
                        <Text className="text-[15px]">📅</Text>
                      </View>
                      <Text className="font-label-lg text-slate-700">
                        {item.schedule}
                      </Text>
                    </View>
                    <View className="w-1/2 flex-row items-center mb-3 pr-2">
                      <View className="w-8 h-8 rounded-full bg-white items-center justify-center mr-2 border border-black/5 shadow-sm">
                        <Text className="text-[15px]">🚪</Text>
                      </View>
                      <Text className="font-label-lg text-slate-700">
                        {item.room}
                      </Text>
                    </View>
                    <View className="w-1/2 flex-row items-center mb-3 pr-2">
                      <View className="w-8 h-8 rounded-full bg-white items-center justify-center mr-2 border border-black/5 shadow-sm">
                        <Text className="text-[15px]">🕒</Text>
                      </View>
                      <View className="flex-row items-center">
                        <Text className="font-label-lg text-slate-700">
                          {item.time}
                        </Text>
                        {item.hasGreenTimeIndicator && (
                          <View className="w-1.5 h-1.5 rounded-full bg-emerald-500 ml-1.5" />
                        )}
                      </View>
                    </View>
                  </View>

                  {/* Class Average Section */}
                  <View className="mb-5 pt-2">
                    <View className="flex-row justify-between items-baseline mb-1.5">
                      <Text className="font-body-md text-[12px] font-semibold text-slate-500">
                        Class average
                      </Text>
                      <Text className="font-body-md text-[12px] font-semibold text-slate-700">
                        {`${item.classAverage}%`}
                      </Text>
                    </View>
                    <View className="w-full h-2 bg-white rounded-full overflow-hidden">
                      <View 
                        style={{ 
                          width: `${item.classAverage}%`, 
                          backgroundColor: item.accentColor 
                        }}
                        className="h-full rounded-full"
                      />
                    </View>
                  </View>

                  {/* Open Classroom Button */}
                  <TouchableOpacity 
                    onPress={() => onSelectClass(item.id)}
                    className="bg-primary w-full py-4 rounded-xl flex-row items-center justify-center shadow-sm"
                    activeOpacity={0.8}
                  >
                    <Text className="color-white font-label-lg text-white mr-1.5">
                      Open classroom
                    </Text>
                    <Text className="color-white text-[14px]">➔</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
