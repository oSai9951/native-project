import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function QuickActions() {
  const actions = [
    { label: "CHECK IN", icon: "👤" },
    { label: "WORK", icon: "📝" },
    { label: "VIRTUAL", icon: "📹" },
    { label: "INBOX", icon: "💬" },
  ];

  return (
    <View className="flex-row justify-around items-center mt-6 px-2">
      {actions.map((act, idx) => (
        <TouchableOpacity key={idx} className="items-center">
          <View className="w-12 h-12 rounded-full bg-white/95 border border-slate-100 shadow-sm flex items-center justify-center mb-2">
            <Text className="text-lg">{act.icon}</Text>
          </View>
          <Text className="text-[9px] font-bold text-slate-500 tracking-wider">
            {act.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
