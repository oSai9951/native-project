import React from "react";
import { View, Text } from "react-native";

export default function GoalsCard() {
  return (
    <View className="bg-white/80 rounded-2xl p-4 mt-4 border border-slate-100 shadow-sm">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-3">
        <View className="flex-row items-center">
          <Text className="text-base mr-2">📚</Text>
          <Text className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            TODAY'S GOALS
          </Text>
        </View>
        <Text className="text-sm">🏆</Text>
      </View>

      {/* Progress & Target */}
      <View className="flex-row items-baseline justify-between mb-2">
        <Text className="text-2xl font-bold text-slate-800 font-sans">73%</Text>
        <Text className="text-[10px] font-semibold text-slate-400">
          Target: 80%
        </Text>
      </View>

      {/* Progress Bar Track */}
      <View className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <View className="h-full bg-indigo-600 rounded-full" style={{ width: "73%" }} />
      </View>
    </View>
  );
}
