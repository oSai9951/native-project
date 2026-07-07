import React from "react";
import { View, Text } from "react-native";

export default function PendingTasksCard() {
  return (
    <View className="bg-white/80 rounded-2xl p-4 mt-4 border border-slate-100 shadow-sm flex-row items-center justify-between">
      <View className="flex-row items-center flex-1 pr-2">
        {/* Green Checkmark Circle */}
        <View className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mr-3">
          <Text className="text-emerald-600 text-sm">✓</Text>
        </View>
        <View>
          <Text className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            PENDING TASKS
          </Text>
          <Text className="text-xs font-semibold text-slate-500 mt-0.5">
            All caught up for today
          </Text>
        </View>
      </View>
      <Text className="text-xl font-bold text-slate-800">0</Text>
    </View>
  );
}
