import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { MY_CLASSES_DATA, ROOM_MESSAGES_DATA, RoomMessageItem } from "../../data/index";
import StartQuickMeetModal from "./StartQuickMeetModal";

interface ClassroomRoomProps {
  classId: string;
  onBack: () => void;
}

export default function ClassroomRoom({ classId, onBack }: ClassroomRoomProps) {
  const [message, setMessage] = useState("");
  const [quickMeetVisible, setQuickMeetVisible] = useState(false);
  const insets = useSafeAreaInsets();

  // Find the selected class details from the mock database
  const selectedClass = MY_CLASSES_DATA.classes.find((item) => item.id === classId) || MY_CLASSES_DATA.classes[0];
  const onlineCount = Math.round(selectedClass.studentsCount * 0.75);

  // Height reserved for the app's global bottom tab bar (see src/app/home.tsx)
  const tabBarHeight = 64 + insets.bottom;

  return (
    <LinearGradient
      colors={["#c1d3c9", "#d8e6eb", "#f6e5ed", "#fffdd1"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        {/* Top App Bar Header */}
        <View className="px-gutter py-base w-full flex-row justify-between items-center border-b border-outline-variant bg-surface/30 z-50">
          <View className="flex-row items-center flex-1">
            <TouchableOpacity onPress={onBack} className="mr-3 p-1">
              <Text className="text-[20px]">⬅️</Text>
            </TouchableOpacity>
            <View className="flex-col flex-1">
              <Text
                numberOfLines={1}
                className="font-headline-lg-mobile text-[20px] font-bold text-primary leading-tight"
              >
                {`${selectedClass.section} · Room`}
              </Text>
              <Text className="font-body-md text-[11px] text-on-surface-variant">
                {`${onlineCount} online · ${selectedClass.studentsCount} members`}
              </Text>
            </View>
          </View>

          <TouchableOpacity className="w-10 h-10 items-center justify-center rounded-full border border-outline-variant bg-surface-container-lowest">
            <Text className="text-[16px] text-on-surface-variant">⋮</Text>
          </TouchableOpacity>
        </View>

        {/* Main Message Area */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingTop: 24,
            paddingBottom: 24,
          }}
          className="flex-1"
        >
          {/* Live Classroom Quick Action */}
          <View className="flex-row items-center justify-between bg-surface-container rounded-card p-4 border border-outline-variant mb-8">
            <View className="flex-row items-center flex-1 mr-3">
              <View className="w-12 h-12 rounded-full bg-tertiary-fixed items-center justify-center mr-3">
                <Text className="text-[18px]">👥</Text>
              </View>
              <View className="flex-1">
                <Text className="font-label-lg text-primary">Live Classroom</Text>
                <Text className="text-[11px] font-body-md text-on-surface-variant">
                  Ready to start today's session?
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => setQuickMeetVisible(true)}
              className="bg-primary py-3 px-5 rounded-full flex-row items-center"
              activeOpacity={0.85}
            >
              <Text className="text-[14px] mr-1.5">🎥</Text>
              <Text className="font-label-lg text-on-primary">Start Meet</Text>
            </TouchableOpacity>
          </View>

          {/* System Divider */}
          <View className="flex-row items-center mb-8">
            <View className="flex-1 border-t border-outline-variant" />
            <Text className="mx-4 font-label-sm text-[9px] text-on-surface-variant tracking-widest">
              ROOM CHANNEL CREATED FOR THIS CLASS
            </Text>
            <View className="flex-1 border-t border-outline-variant" />
          </View>

          {/* Messages */}
          {ROOM_MESSAGES_DATA.map((item: RoomMessageItem) => (
            <View
              key={item.id}
              className="mb-6 max-w-[85%]"
              style={item.sender === "teacher" ? { alignSelf: "flex-end", alignItems: "flex-end" } : { alignSelf: "flex-start" }}
            >
              {item.sender === "student" && (
                <View className="flex-row items-center gap-2 mb-1.5">
                  <View
                    className={`w-8 h-8 rounded-full items-center justify-center ${item.avatarBgColor}`}
                  >
                    <Text className={`text-[12px] font-bold ${item.avatarTextColor}`}>{item.initials}</Text>
                  </View>
                  <Text className="font-label-lg text-primary">{item.name}</Text>
                </View>
              )}

              {item.sender === "student" ? (
                <View
                  className="bg-surface-container-high p-4 rounded-3xl border border-outline-variant"
                  style={{ borderBottomLeftRadius: 4 }}
                >
                  <Text className="font-body-md text-on-surface">{item.message}</Text>
                </View>
              ) : (
                <View className="bg-primary p-4 rounded-3xl" style={{ borderBottomRightRadius: 4 }}>
                  <Text className="font-body-md text-on-primary">{item.message}</Text>

                  {item.attachment && (
                    <View className="mt-4 bg-primary-container rounded-2xl p-3">
                      <View className="flex-row items-center">
                        <View className="w-10 h-10 rounded-xl bg-[#333333] items-center justify-center mr-3">
                          <Text className="text-[16px]">📄</Text>
                        </View>
                        <View className="flex-1">
                          <Text numberOfLines={1} className="font-label-sm text-on-primary">
                            {item.attachment.name}
                          </Text>
                          <Text className="text-[10px] text-on-primary-container">{item.attachment.meta}</Text>
                        </View>
                      </View>
                      <View className="flex-row gap-2 mt-3">
                        <TouchableOpacity className="flex-1 py-1.5 border border-outline-variant rounded-full items-center">
                          <Text className="text-[10px] font-label-lg text-on-primary">Preview</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="flex-1 py-1.5 border border-outline-variant rounded-full items-center">
                          <Text className="text-[10px] font-label-lg text-on-primary">Download</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                </View>
              )}

              <View className="flex-row items-center mt-1.5 gap-1" style={{ marginHorizontal: 4 }}>
                <Text className="text-[10px] text-on-surface-variant">{item.time}</Text>
                {item.sender === "teacher" && <Text className="text-[11px] text-on-surface-variant">✓✓</Text>}
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Composer */}
        <View className="px-gutter pt-3" style={{ paddingBottom: 12 + tabBarHeight }}>
          <View className="flex-row items-center gap-1 bg-surface-container-lowest border border-outline-variant rounded-full py-1.5 px-1.5">
            <TouchableOpacity className="w-10 h-10 items-center justify-center">
              <Text className="text-[18px]">📎</Text>
            </TouchableOpacity>
            <TextInput
              className="flex-1 font-body-md text-on-surface py-2 outline-none"
              placeholder="Message the class..."
              placeholderTextColor="#94a3b8"
              value={message}
              onChangeText={setMessage}
            />
            <TouchableOpacity className="w-10 h-10 items-center justify-center">
              <Text className="text-[18px]">😊</Text>
            </TouchableOpacity>
            <TouchableOpacity className="w-10 h-10 items-center justify-center bg-primary rounded-full" activeOpacity={0.85}>
              <Text className="text-[16px] text-on-primary">⬆️</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

      <StartQuickMeetModal
        visible={quickMeetVisible}
        onClose={() => setQuickMeetVisible(false)}
        onStartMeet={() => setQuickMeetVisible(false)}
        sectionLabel={`${selectedClass.section} · ${selectedClass.title}`}
      />
    </LinearGradient>
  );
}
