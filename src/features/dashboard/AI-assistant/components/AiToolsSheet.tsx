import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AI_TOOL_OPTIONS, AiToolOption } from "../data/index";

interface AiToolsSheetProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (id: AiToolOption["id"]) => void;
}

export default function AiToolsSheet({ visible, onClose, onSelect }: AiToolsSheetProps) {
  const insets = useSafeAreaInsets();

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View className="flex-1 justify-end" style={{ backgroundColor: "rgba(0,0,0,0.4)" }}>
        {/* Click outside to close */}
        <TouchableOpacity className="flex-1" activeOpacity={1} onPress={onClose} />

        {/* Options Sheet */}
        <View className="bg-[#171717] rounded-t-[24px] p-2 pb-6 w-full" style={{ paddingBottom: 16 + insets.bottom }}>
          <View className="flex-col gap-1 p-2">
            {AI_TOOL_OPTIONS.map((option) => (
              <TouchableOpacity
                key={option.id}
                onPress={() => onSelect(option.id)}
                className="flex-row items-center gap-4 w-full p-4 rounded-2xl"
                activeOpacity={0.7}
              >
                <View className="w-12 h-12 rounded-full bg-white items-center justify-center">
                  <Text className="text-[20px]">{option.icon}</Text>
                  {option.dotColor && (
                    <View
                      style={{ backgroundColor: option.dotColor }}
                      className="absolute top-0 right-0 w-3 h-3 rounded-full border-2 border-[#171717]"
                    />
                  )}
                </View>
                <View className="flex-1">
                  <Text className="font-label-lg text-label-lg text-white">{option.title}</Text>
                  <Text className="font-body-md text-[13px] text-on-surface-variant/70">{option.subtitle}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Composer bar anchor, mirrors the real composer with a close action */}
          <View className="mt-2 px-4">
            <View className="flex-row items-center gap-3 bg-[#262626] rounded-full p-2 pl-4 border border-white/5">
              <Text className="flex-1 font-body-md text-body-md text-on-surface-variant/50">
                Ask anything...
              </Text>
              <TouchableOpacity
                onPress={onClose}
                className="w-10 h-10 rounded-full bg-white items-center justify-center"
                activeOpacity={0.85}
              >
                <Text className="text-[16px]">✕</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
