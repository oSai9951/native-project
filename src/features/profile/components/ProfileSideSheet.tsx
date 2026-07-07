import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ProfileSideSheetProps {
  visible: boolean;
  onClose: () => void;
  onViewProfile?: () => void;
}

export default function ProfileSideSheet({ visible, onClose, onViewProfile }: ProfileSideSheetProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View className="flex-1 flex-row">
        {/* Light Side Panel */}
        <SafeAreaView className="bg-white w-[76%] max-w-[300px] h-full" edges={["top", "bottom"]}>
          <View className="flex-1 px-6 pt-10">
            {/* Profile Avatar */}
            <View className="w-24 h-24 rounded-full bg-slate-100 border border-slate-200 items-center justify-center overflow-hidden">
              <Text className="text-[40px]">👩‍🏫</Text>
            </View>

            {/* View Profile Button */}
            <TouchableOpacity
              onPress={onViewProfile}
              className="mt-6 border-2 border-primary rounded-full py-3 items-center"
              activeOpacity={0.8}
            >
              <Text className="font-label-lg text-label-lg text-primary">View Profile</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>

        {/* Backdrop - tap to close */}
        <TouchableOpacity className="flex-1 bg-black/40" activeOpacity={1} onPress={onClose} />
      </View>
    </Modal>
  );
}
