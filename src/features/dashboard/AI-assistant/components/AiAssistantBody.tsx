import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { AI_SUBJECTS, AI_CHAT_THREAD, AiMessageItem, AiToolOption } from "../data/index";
import AiToolsSheet from "./AiToolsSheet";
import VoiceModeScreen from "./VoiceModeScreen";

interface AiAssistantBodyProps {
  onBack: () => void;
}

export default function AiAssistantBody({ onBack }: AiAssistantBodyProps) {
  const insets = useSafeAreaInsets();
  const [activeSubject, setActiveSubject] = useState(AI_SUBJECTS[0].id);
  const [messages, setMessages] = useState<AiMessageItem[]>(AI_CHAT_THREAD);
  const [draft, setDraft] = useState("");
  const [thinkingModeOn, setThinkingModeOn] = useState(true);
  const [deepResearchOn, setDeepResearchOn] = useState(true);
  const [webResearchOn, setWebResearchOn] = useState(false);
  const [toolsSheetVisible, setToolsSheetVisible] = useState(false);
  const [voiceModeVisible, setVoiceModeVisible] = useState(false);

  const tabBarHeight = 64 + insets.bottom;

  const handleClearChat = () => {
    Alert.alert(
      "Clear conversation?",
      "This will remove the entire chat history with Aria.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Clear", style: "destructive", onPress: () => setMessages([]) },
      ]
    );
  };

  const handleSelectTool = (id: AiToolOption["id"]) => {
    if (id === "thinking") setThinkingModeOn(true);
    if (id === "deepResearch") setDeepResearchOn(true);
    if (id === "webResearch") setWebResearchOn(true);
    setToolsSheetVisible(false);
  };

  const handleSend = () => {
    if (!draft.trim()) return;
    const newMessage: AiMessageItem = {
      id: String(Date.now()),
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
      text: draft.trim(),
    };
    setMessages((prev) => [...prev, newMessage]);
    setDraft("");
  };

  return (
    <View className="flex-1 bg-background">
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
          {/* Header */}
          <View className="px-gutter pt-2 pb-2 border-b border-outline-variant bg-surface">
            <View className="flex-row items-center justify-between mb-3">
              <View className="flex-row items-center flex-1">
                <TouchableOpacity onPress={onBack} className="w-10 h-10 items-center justify-center rounded-full mr-1">
                  <Text className="text-[20px] text-primary">⬅️</Text>
                </TouchableOpacity>
                <View className="flex-col">
                  <View className="flex-row items-center gap-2">
                    <Text className="font-headline-lg-mobile text-headline-lg-mobile text-primary">Aria</Text>
                    <View className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />
                  </View>
                  <Text className="font-label-sm text-label-sm text-on-surface-variant">AI Tutor · Online</Text>
                </View>
              </View>

              <TouchableOpacity
                onPress={handleClearChat}
                className="w-10 h-10 items-center justify-center bg-white rounded-full border border-outline-variant"
                activeOpacity={0.8}
              >
                <Text className="text-[16px]">🗑️</Text>
              </TouchableOpacity>
            </View>

            {/* Subject Scroll Row */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
              {AI_SUBJECTS.map((subject) => {
                const isActive = activeSubject === subject.id;
                return (
                  <TouchableOpacity
                    key={subject.id}
                    onPress={() => setActiveSubject(subject.id)}
                    className={`px-5 py-2.5 rounded-full ${isActive ? "bg-primary" : "bg-transparent border-2 border-outline-variant"}`}
                    activeOpacity={0.8}
                  >
                    <Text className={`font-label-lg text-label-lg ${isActive ? "text-on-primary" : "text-on-surface-variant"}`}>
                      {subject.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {/* Chat Canvas */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 24, paddingBottom: 24, gap: 32 }}
            className="flex-1"
          >
            {messages.map((item) =>
              item.sender === "user" ? (
                <View key={item.id} className="items-end w-full">
                  <View className="max-w-[85%] bg-primary p-4 rounded-[24px]" style={{ borderBottomRightRadius: 4 }}>
                    <Text className="font-body-lg text-body-lg text-on-primary">{item.text}</Text>
                  </View>
                  <Text className="mt-2 font-label-sm text-label-sm text-on-surface-variant opacity-60">{item.time}</Text>
                </View>
              ) : (
                <View key={item.id} className="items-start w-full">
                  <View className="flex-row items-center gap-3 mb-3">
                    <View className="w-10 h-10 bg-pastel-sky items-center justify-center rounded-full">
                      <Text className="text-[16px]">✨</Text>
                    </View>
                    <Text className="font-label-lg text-label-lg text-primary">Aria</Text>
                  </View>

                  <View className="max-w-[92%] bg-pastel-sky p-5 rounded-[24px]" style={{ borderBottomLeftRadius: 4 }}>
                    {item.headline && (
                      <Text className="font-headline-lg-mobile text-headline-lg-mobile text-on-background mb-3">
                        {item.headline}
                      </Text>
                    )}
                    {item.intro && (
                      <Text className="font-body-lg text-body-lg text-on-background mb-4">{item.intro}</Text>
                    )}

                    {item.checklist && (
                      <View className="mb-4" style={{ gap: 10 }}>
                        {item.checklist.map((line, index) => (
                          <View key={index} className="flex-row" style={{ gap: 8 }}>
                            <Text className="text-[14px]">✅</Text>
                            <Text className="flex-1 font-body-md text-body-md text-on-background">{line}</Text>
                          </View>
                        ))}
                      </View>
                    )}

                    {item.codeSnippet && (
                      <View className="bg-white/50 p-4 rounded-xl mb-4">
                        <Text
                          className="text-on-background"
                          style={{ fontFamily: Platform.OS === "ios" ? "Courier" : "monospace", fontSize: 13 }}
                        >
                          {item.codeSnippet}
                        </Text>
                      </View>
                    )}

                    {item.note && (
                      <Text className="font-body-md text-body-md text-on-background mb-4">{item.note}</Text>
                    )}

                    {item.attachment && (
                      <TouchableOpacity
                        className="flex-row items-center bg-white p-3 rounded-2xl border-2 border-sky-200/50"
                        style={{ gap: 12 }}
                        activeOpacity={0.8}
                      >
                        <View style={{ backgroundColor: "#DCFCE7" }} className="w-10 h-10 rounded-full items-center justify-center">
                          <Text className="text-[16px]">📄</Text>
                        </View>
                        <View className="flex-1">
                          <Text className="font-label-lg text-label-lg text-on-background">{item.attachment.name}</Text>
                          <Text className="font-label-sm text-label-sm text-on-surface-variant">{item.attachment.meta}</Text>
                        </View>
                        <Text className="text-[16px] text-on-surface-variant">⬇️</Text>
                      </TouchableOpacity>
                    )}
                  </View>

                  {/* Action Row */}
                  <View className="flex-row items-center mt-1" style={{ gap: 8 }}>
                    <TouchableOpacity className="flex-row items-center px-3 py-1.5 rounded-full" style={{ gap: 6 }} activeOpacity={0.7}>
                      <Text className="text-[13px] text-on-surface-variant">📋</Text>
                      <Text className="font-label-sm text-label-sm text-on-surface-variant">Copy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-row items-center px-3 py-1.5 rounded-full bg-primary" style={{ gap: 6 }} activeOpacity={0.85}>
                      <Text className="text-[13px]">🔊</Text>
                      <Text className="font-label-sm text-label-sm text-on-primary">Narrate</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-row items-center px-3 py-1.5 rounded-full" style={{ gap: 6 }} activeOpacity={0.7}>
                      <Text className="text-[13px] text-on-surface-variant">🔄</Text>
                      <Text className="font-label-sm text-label-sm text-on-surface-variant">Regenerate</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )
            )}
          </ScrollView>

          {/* Composer */}
          <View style={{ paddingBottom: tabBarHeight }}>
            <View className="px-gutter pb-3" style={{ gap: 12 }}>
              {/* Mode Tags */}
              {(thinkingModeOn || deepResearchOn || webResearchOn) && (
                <View className="flex-row flex-wrap px-2" style={{ gap: 8 }}>
                  {thinkingModeOn && (
                    <TouchableOpacity
                      onPress={() => setThinkingModeOn(false)}
                      className="flex-row items-center bg-pastel-amber px-3 py-1.5 rounded-full"
                      style={{ gap: 6 }}
                      activeOpacity={0.8}
                    >
                      <Text className="text-[12px]">🧠</Text>
                      <Text className="font-label-sm text-label-sm text-amber-900">Thinking Mode</Text>
                      <Text className="text-[12px] text-amber-900">✕</Text>
                    </TouchableOpacity>
                  )}
                  {deepResearchOn && (
                    <TouchableOpacity
                      onPress={() => setDeepResearchOn(false)}
                      className="flex-row items-center bg-pastel-sky px-3 py-1.5 rounded-full"
                      style={{ gap: 6 }}
                      activeOpacity={0.8}
                    >
                      <Text className="text-[12px]">🔎</Text>
                      <Text className="font-label-sm text-label-sm text-sky-900">Deep Research</Text>
                      <Text className="text-[12px] text-sky-900">✕</Text>
                    </TouchableOpacity>
                  )}
                  {webResearchOn && (
                    <TouchableOpacity
                      onPress={() => setWebResearchOn(false)}
                      className="flex-row items-center bg-pastel-emerald px-3 py-1.5 rounded-full"
                      style={{ gap: 6 }}
                      activeOpacity={0.8}
                    >
                      <Text className="text-[12px]">🌐</Text>
                      <Text className="font-label-sm text-label-sm text-emerald-900">Web Research</Text>
                      <Text className="text-[12px] text-emerald-900">✕</Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}

              {/* Input Bar */}
              <View className="bg-[#171717] rounded-full p-2 flex-row items-center" style={{ gap: 8 }}>
                <TouchableOpacity
                  onPress={() => setToolsSheetVisible(true)}
                  className="w-10 h-10 items-center justify-center rounded-full bg-white/10"
                >
                  <Text className="text-[18px] text-white">➕</Text>
                </TouchableOpacity>
                <TextInput
                  className="flex-1 font-body-md text-body-md text-white outline-none px-2"
                  placeholder="Ask Aria anything..."
                  placeholderTextColor="rgba(255,255,255,0.4)"
                  value={draft}
                  onChangeText={setDraft}
                  onSubmitEditing={handleSend}
                  returnKeyType="send"
                />
                <TouchableOpacity
                  onPress={() => setVoiceModeVisible(true)}
                  className="w-10 h-10 items-center justify-center rounded-full bg-sky-400"
                >
                  <Text className="text-[16px]">🎙️</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleSend}
                  className="w-10 h-10 items-center justify-center rounded-full bg-white"
                  activeOpacity={0.85}
                >
                  <Text className="text-[16px]">⬆️</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>

      <AiToolsSheet
        visible={toolsSheetVisible}
        onClose={() => setToolsSheetVisible(false)}
        onSelect={handleSelectTool}
      />

      <VoiceModeScreen
        visible={voiceModeVisible}
        onClose={() => setVoiceModeVisible(false)}
      />
    </View>
  );
}
