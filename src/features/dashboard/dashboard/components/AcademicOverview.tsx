import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ACADEMIC_OVERVIEW_DATA, AcademicOverviewItem } from "../data";

export default function AcademicOverview() {
  return (
    <View className="mt-6 px-4">
      {/* Section Header */}
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-xl font-bold text-slate-800 font-sans">Academic Overview</Text>
        <TouchableOpacity>
          <Text className="text-xs font-bold text-indigo-600 tracking-wider">SEE ALL</Text>
        </TouchableOpacity>
      </View>

      {/* List Items */}
      {ACADEMIC_OVERVIEW_DATA.map((item: AcademicOverviewItem) => (
        <View key={item.id} className="bg-white/80 rounded-2xl p-4 mb-4 border border-slate-100 shadow-sm">
          {/* Top Row: Icon and Badges */}
          <View className="flex-row justify-between items-center mb-3">
            <View className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100">
              <Text className="text-lg">{item.icon}</Text>
            </View>
            <View className="flex-row space-x-2">
              <View className="bg-slate-100 px-2.5 py-1 rounded-lg">
                <Text className="text-[10px] font-semibold text-slate-600">{item.grade}</Text>
              </View>
              <View className={`${item.badgeBg || "bg-indigo-50 text-indigo-600"} px-2.5 py-1 rounded-lg`}>
                <Text className="text-[10px] font-semibold">{item.subject}</Text>
              </View>
            </View>
          </View>

          {/* Title & Description */}
          <Text className="text-base font-bold text-slate-800 font-sans">{item.title}</Text>
          <Text className="text-xs text-slate-500 mt-1 leading-normal font-sans">{item.description}</Text>

          {/* Progress Section */}
          <View className="flex-row items-center justify-between mt-4">
            <View className="flex-1 h-1.5 bg-slate-100 rounded-full mr-4 overflow-hidden">
              <View 
                className={`h-full rounded-full ${item.color || "bg-indigo-600"}`} 
                style={{ width: `${item.progress * 100}%` }}
              />
            </View>
            {item.duration ? (
              <View className="flex-row items-center bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                <Text className="text-[10px] text-slate-400 mr-1">⏱️</Text>
                <Text className="text-[10px] font-semibold text-slate-500">{item.duration}</Text>
              </View>
            ) : (
              <Text className="text-[10px] text-slate-400">🤖</Text>
            )}
          </View>
        </View>
      ))}
    </View>
  );
}
