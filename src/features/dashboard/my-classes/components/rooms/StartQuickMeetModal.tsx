import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

interface StartQuickMeetModalProps {
  visible: boolean;
  onClose: () => void;
  onStartMeet: (meetingTitle: string, meetingLink: string) => void;
  sectionLabel: string;
}

const generateMeetingLink = (sectionLabel: string) => {
  const [sectionPart, subjectPart] = sectionLabel.split("·").map((part) => part.trim());
  const sectionSlug = (sectionPart || "section").toLowerCase().replace(/section\s*/, "sec").replace(/\s+/g, "");
  const subjectSlug = (subjectPart || "class").toLowerCase().slice(0, 4);
  const randomSlug = Math.random().toString(36).slice(2, 6);
  return `meet.eduflow.com/v/${sectionSlug}-${subjectSlug}-${randomSlug}`;
};

export default function StartQuickMeetModal({ visible, onClose, onStartMeet, sectionLabel }: StartQuickMeetModalProps) {
  const [meetingTitle, setMeetingTitle] = useState("");
  const [meetingLink, setMeetingLink] = useState(() => generateMeetingLink(sectionLabel));
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (visible) {
      setMeetingLink(generateMeetingLink(sectionLabel));
      setCopied(false);
    }
  }, [visible, sectionLabel]);

  const handleAutoGenerate = () => {
    setMeetingLink(generateMeetingLink(sectionLabel));
    setCopied(false);
  };

  const handleCopy = () => {
    setCopied(true);
  };

  const handleStart = () => {
    onStartMeet(meetingTitle, meetingLink);
    setMeetingTitle("");
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      {/* Blurred background overlay */}
      <View className="flex-1 bg-black/40 justify-end">
        {/* Click outside to close */}
        <TouchableOpacity className="flex-1" activeOpacity={1} onPress={onClose} />

        {/* Keyboard avoiding sheet */}
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} className="w-full">
          {/* Pull handle indicator */}
          <View className="w-12 h-1.5 bg-surface-container-highest rounded-full self-center mb-2 opacity-50" />

          {/* White sheet body */}
          <View className="bg-surface-container-lowest rounded-t-card pb-10 w-full">
            {/* Modal Header */}
            <View className="px-6 pt-8 pb-4">
              <Text className="font-headline-lg-mobile text-headline-lg-mobile text-primary">
                Start Quick Meet
              </Text>
              <Text className="font-body-md text-on-surface-variant mt-1">
                {`For ${sectionLabel}`}
              </Text>
            </View>

            {/* Form Content */}
            <View style={{ paddingHorizontal: 24 }}>
              {/* Meeting Title */}
              <View className="mb-5">
                <Text className="font-label-lg text-label-lg text-on-surface ml-1 mb-2">
                  Meeting Title
                </Text>
                <TextInput
                  className="w-full h-14 px-4 rounded-[16px] border-2 border-surface-container-highest bg-surface-container-low text-on-surface placeholder:text-outline-variant outline-none font-body-lg text-body-lg"
                  placeholder="e.g. Weekly Review"
                  placeholderTextColor="#94a3b8"
                  value={meetingTitle}
                  onChangeText={setMeetingTitle}
                />
              </View>

              {/* Meeting Link */}
              <View className="mb-5">
                <View className="flex-row items-center justify-between ml-1 mb-2">
                  <Text className="font-label-lg text-label-lg text-on-surface">
                    Meeting Link
                  </Text>
                  <TouchableOpacity onPress={handleAutoGenerate} activeOpacity={0.7}>
                    <Text className="font-label-lg text-label-lg text-primary underline">
                      Auto-generate
                    </Text>
                  </TouchableOpacity>
                </View>
                <View className="w-full h-14 px-4 rounded-[16px] border-2 border-surface-container-highest bg-surface-container-low flex-row items-center">
                  <Text numberOfLines={1} className="flex-1 font-body-md text-on-surface-variant">
                    {meetingLink}
                  </Text>
                  <TouchableOpacity onPress={handleCopy} className="ml-2 p-1" activeOpacity={0.7}>
                    <Text className="text-[16px]">{copied ? "✅" : "📋"}</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Info Banner */}
              <View className="flex-row bg-surface-container-low rounded-xl p-3">
                <Text className="text-[14px] mr-2">ℹ️</Text>
                <Text className="flex-1 font-body-md text-[12px] text-on-surface-variant">
                  This meeting link will be shared automatically to the room's main channel so students can join instantly.
                </Text>
              </View>
            </View>

            {/* Modal Footer Buttons */}
            <View className="p-6 bg-surface-container-lowest flex-row gap-4">
              <TouchableOpacity
                onPress={onClose}
                className="flex-1 h-14 rounded-full border-2 border-surface-container-highest items-center justify-center"
                activeOpacity={0.8}
              >
                <Text className="font-label-lg text-label-lg text-on-surface">
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleStart}
                className="flex-1 h-14 rounded-full bg-primary items-center justify-center flex-row"
                activeOpacity={0.8}
              >
                <Text className="text-[14px] mr-1.5">📹</Text>
                <Text className="font-label-lg text-label-lg text-on-primary">
                  Start Meet
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}
