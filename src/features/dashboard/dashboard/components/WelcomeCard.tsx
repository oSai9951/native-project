import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function WelcomeCard() {
  return (
    <View className="bg-white/80 rounded-3xl p-5 border border-slate-100 shadow-sm relative overflow-hidden flex-row justify-between items-center">
      {/* Left section */}
      <View className="flex-1 pr-4">
        <Text className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          GREENFIELD ACADEMY
        </Text>
        <Text className="text-2xl font-bold text-slate-800 mt-1 leading-tight font-sans">
          Good morning,{"\n"}Keelie
        </Text>
        
        <TouchableOpacity className="bg-slate-900 px-4 py-2.5 rounded-full mt-4 self-start flex-row items-center">
          <Text className="text-white text-xs font-semibold">View Schedule</Text>
        </TouchableOpacity>
      </View>

      {/* Right section: Joined progress representation */}
      <View className="items-center justify-center">
        <View className="w-16 h-16 rounded-full border-4 border-slate-100 flex items-center justify-center relative">
          {/* Accent border highlight simulating circular progress */}
          <View className="absolute top-[-4px] left-[-4px] right-[-4px] bottom-[-4px] border-4 border-slate-800 rounded-full opacity-60" style={{ borderBottomColor: "transparent", borderRightColor: "transparent" }} />
          <Text className="text-[10px] font-extrabold text-slate-700">2/10</Text>
        </View>
        <Text className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-2">
          JOINED
        </Text>
      </View>
    </View>
  );
}
