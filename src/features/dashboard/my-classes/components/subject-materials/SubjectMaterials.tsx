import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { CLASS_MATERIALS_DATA, MaterialItem } from "../../data/index";
import ShareMaterialModal from "../share-material/ShareMaterialModal";

interface SubjectMaterialsProps {
  classId: string;
  onBack: () => void;
}

export default function SubjectMaterials({ classId, onBack }: SubjectMaterialsProps) {
  const [materials, setMaterials] = useState(CLASS_MATERIALS_DATA);
  const [modalVisible, setModalVisible] = useState(false);

  // Mock reference section info based on classId
  const sectionName = classId === "1" ? "Section 8A" : classId === "2" ? "Section 10B" : "Section 12C";

  const handleShare = (title: string, type: string) => {
    const newMaterial: MaterialItem = {
      id: String(materials.length + 1),
      title: title,
      type: type === "Note" ? "PDF" : type === "Homework" ? "PDF" : "DOCX",
      size: "1.5 MB",
      timeAgo: "Shared just now",
      tag: type,
      downloadCount: 0,
      totalStudents: 24,
      downloadPercent: 0,
      bgColor: type === "Important" ? "#FEF9C3" : type === "Homework" ? "#FFE4E6" : "#E0F2FE",
      borderColor: type === "Important" ? "rgba(253, 224, 71, 0.1)" : type === "Homework" ? "rgba(251, 113, 133, 0.1)" : "rgba(125, 211, 252, 0.1)",
      barColor: type === "Important" ? "#FDE047" : type === "Homework" ? "#FDA4AF" : "#7DD3FC",
      icon: type === "Homework" ? "📄" : type === "Important" ? "📦" : "📝",
    };
    setMaterials([newMaterial, ...materials]);
    setModalVisible(false);
  };

  return (
    <LinearGradient 
      colors={["#c1d3c9", "#d8e6eb", "#f6e5ed", "#fffdd1"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        {/* Top App Bar Header */}
        <View className="px-gutter py-base w-full flex-row justify-between items-center border-b border-surface-variant z-50">
          <View className="flex-row items-center">
            <TouchableOpacity 
              onPress={onBack}
              className="mr-3 p-1"
            >
              <Text className="text-[20px]">⬅️</Text>
            </TouchableOpacity>
            <Text className="font-headline-lg-mobile text-headline-lg-mobile text-primary tracking-tighter">
              Materials
            </Text>
          </View>

          {/* Share Material Button */}
          <TouchableOpacity 
            onPress={() => setModalVisible(true)}
            className="bg-primary px-5 py-2.5 rounded-full flex-row items-center justify-center shadow-sm"
            activeOpacity={0.8}
          >
            <Text className="font-label-lg text-label-lg text-white">
              + Share Material
            </Text>
          </TouchableOpacity>
        </View>

        {/* Count Label sub-bar */}
        <View className="px-4 pt-2 pb-1">
          <Text className="font-body-md text-body-md text-on-surface-variant ml-12">
            {`12 materials shared with ${sectionName}`}
          </Text>
        </View>

        {/* Main Materials Content Stack */}
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingTop: 16,
            paddingBottom: 120,
          }}
        >
          {materials.map((item: MaterialItem) => (
            <View 
              key={item.id} 
              style={{
                backgroundColor: item.bgColor,
                borderColor: item.borderColor,
              }}
              className="border rounded-card p-6 mb-5 shadow-sm"
            >
              {/* Card Title & Icon */}
              <View className="flex-row items-start gap-4">
                <View className="w-12 h-12 bg-white rounded-full items-center justify-center border border-black/5 shadow-sm">
                  <Text className="text-[20px]">{item.icon}</Text>
                </View>

                <View className="flex-1 gap-1">
                  <Text className="font-title-md text-title-md text-primary leading-tight">
                    {item.title}
                  </Text>
                  <Text className="font-body-md text-body-md text-on-surface-variant">
                    {`${item.type} · ${item.size} · ${item.timeAgo}`}
                  </Text>

                  {/* Homework/Revision Tags */}
                  <View className="flex-row mt-2">
                    <View className="border-2 border-primary rounded-full px-3 py-1">
                      <Text className="font-label-sm text-label-sm text-primary uppercase tracking-wider">
                        {item.tag}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Progress bar container */}
              <View className="mt-5 space-y-2">
                <View className="flex-row justify-between items-end">
                  <Text className="font-label-lg text-label-lg text-on-surface-variant uppercase">
                    Downloaded by students
                  </Text>
                  <Text className="font-label-lg text-label-lg text-primary">
                    {`${item.downloadCount}/${item.totalStudents} · ${item.downloadPercent}%`}
                  </Text>
                </View>
                <View className="w-full h-3 bg-white/50 rounded-full overflow-hidden">
                  <View 
                    style={{
                      width: `${item.downloadPercent}%`,
                      backgroundColor: item.barColor,
                    }}
                    className="h-full rounded-full"
                  />
                </View>
              </View>

              {/* Action Buttons Row */}
              <View className="flex-row justify-between items-center mt-4">
                {/* Preview Trigger */}
                <TouchableOpacity 
                  className="bg-white/20 border-2 border-white rounded-full px-5 py-2 flex-row items-center gap-2"
                  activeOpacity={0.8}
                >
                  <Text className="text-[14px]">👁️</Text>
                  <Text className="font-label-lg text-label-lg text-primary">
                    Preview
                  </Text>
                </TouchableOpacity>

                {/* Delete Trigger */}
                <TouchableOpacity 
                  className="w-10 h-10 bg-primary rounded-full items-center justify-center shadow-sm"
                  activeOpacity={0.8}
                >
                  <Text className="text-[14px] color-white">🗑️</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
      <ShareMaterialModal 
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onShare={handleShare}
      />
    </LinearGradient>
  );
}
