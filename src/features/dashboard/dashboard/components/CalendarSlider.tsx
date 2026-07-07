import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";

export default function CalendarSlider() {
  const days = [
    { name: "MON", date: "12", active: false },
    { name: "TUE", date: "13", active: false },
    { name: "WED", date: "14", active: true },
    { name: "THU", date: "15", active: false },
    { name: "FRI", date: "16", active: false },
    { name: "SAT", date: "17", active: false },
  ];

  return (
    <View className="mt-5 px-1">
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 12, justifyContent: "space-between", width: "100%" }}
      >
        {days.map((day, idx) => (
          <TouchableOpacity 
            key={idx} 
            className={`items-center py-2 px-3 rounded-2xl ${day.active ? "bg-slate-900 border border-slate-900 shadow-sm" : ""}`}
          >
            <Text className={`text-[9px] font-bold tracking-wider ${day.active ? "text-slate-300" : "text-slate-400"}`}>
              {day.name}
            </Text>
            <Text className={`text-sm font-bold mt-1 ${day.active ? "text-white" : "text-slate-700"}`}>
              {day.date}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
