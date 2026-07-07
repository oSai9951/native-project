import React from "react";
import { View, Text } from "react-native";

export default function ClassesStudentsGrid() {
  return (
    <View className="flex-row space-x-4 mt-4">
      {/* Classes Card */}
      <View className="flex-1 bg-white/80 rounded-2xl p-4 border border-slate-100 shadow-sm flex-col justify-between">
        <View className="flex-row justify-between items-start mb-2">
          <Text className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            CLASSES
          </Text>
          <View className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
            <Text className="text-sm">📊</Text>
          </View>
        </View>
        <View className="mt-1">
          <Text className="text-2xl font-bold text-slate-800 font-sans">12</Text>
          <Text className="text-[10px] font-semibold text-emerald-600 mt-0.5">
            +2 this month
          </Text>
        </View>
      </View>

      {/* Students Card */}
      <View className="flex-1 bg-white/80 rounded-2xl p-4 border border-slate-100 shadow-sm flex-col justify-between">
        <View className="flex-row justify-between items-start mb-2">
          <Text className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            STUDENTS
          </Text>
          <View className="w-8 h-8 rounded-lg bg-pink-50 flex items-center justify-center">
            <Text className="text-sm">👥</Text>
          </View>
        </View>
        <View className="mt-1">
          <Text className="text-2xl font-bold text-slate-800 font-sans">248</Text>
          <Text className="text-[10px] font-semibold text-slate-400 mt-0.5">
            Active now
          </Text>
        </View>
      </View>
    </View>
  );
}
