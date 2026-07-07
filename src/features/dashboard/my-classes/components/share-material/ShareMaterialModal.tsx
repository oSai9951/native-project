import React, { useState } from "react";
import { 
  Modal, 
  View, 
  Text, 
  TextInput, 
  ScrollView, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform 
} from "react-native";

interface ShareMaterialModalProps {
  visible: boolean;
  onClose: () => void;
  onShare: (title: string, type: string) => void;
}

export default function ShareMaterialModal({ visible, onClose, onShare }: ShareMaterialModalProps) {
  const [title, setTitle] = useState("");
  const [selectedType, setSelectedType] = useState("Note");
  const [notifyStudents, setNotifyStudents] = useState(false);

  const materialTypes = ["Note", "Homework", "Revision", "Important", "Announcement", "Assignment"];

  const handleShare = () => {
    if (!title.trim()) return;
    onShare(title, selectedType);
    setTitle("");
    setSelectedType("Note");
    setNotifyStudents(false);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      {/* Blurred background overlay */}
      <View className="flex-1 bg-black/40 justify-end">
        {/* Click outside to close */}
        <TouchableOpacity 
          className="flex-1" 
          activeOpacity={1} 
          onPress={onClose} 
        />

        {/* Keyboard avoiding sheet */}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          className="w-full"
        >
          {/* Pull handle indicator */}
          <View className="w-12 h-1.5 bg-surface-container-highest rounded-full self-center mb-2 opacity-50" />

          {/* White sheet body */}
          <View className="bg-surface-container-lowest rounded-t-card pb-10 w-full max-h-[700px]">
            {/* Modal Header */}
            <View className="px-6 pt-8 pb-4">
              <Text className="font-headline-lg-mobile text-headline-lg-mobile text-primary">
                Upload Material
              </Text>
              <Text className="font-body-md text-on-surface-variant mt-1">
                Share resources with your classroom
              </Text>
            </View>

            {/* Scrollable Form Content */}
            <ScrollView 
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 16 }}
            >
              {/* Material Title */}
              <View className="mb-5">
                <Text className="font-label-lg text-label-lg text-on-surface ml-1 mb-2">
                  Material Title
                </Text>
                <TextInput
                  className="w-full h-14 px-4 rounded-[16px] border-2 border-surface-container-highest bg-surface-container-low text-on-surface placeholder:text-outline-variant outline-none font-body-lg text-body-lg"
                  placeholder="e.g. Unit 3: Introduction to Photosynthesis"
                  placeholderTextColor="#94a3b8"
                  value={title}
                  onChangeText={setTitle}
                />
              </View>

              {/* Material Type Selection */}
              <View className="mb-6">
                <Text className="font-label-lg text-label-lg text-on-surface ml-1 mb-3">
                  Material Type
                </Text>
                <ScrollView 
                  horizontal 
                  showsHorizontalScrollIndicator={false} 
                  contentContainerStyle={{ gap: 8 }}
                >
                  {materialTypes.map((type) => {
                    const isSelected = selectedType === type;
                    return (
                      <TouchableOpacity
                        key={type}
                        onPress={() => setSelectedType(type)}
                        className={`px-5 py-2.5 rounded-full border-2 ${isSelected ? "bg-primary border-primary" : "border-surface-container-highest bg-white"}`}
                        activeOpacity={0.8}
                      >
                        <Text 
                          className={`font-label-lg text-label-lg ${isSelected ? "text-on-primary" : "text-on-surface-variant"}`}
                        >
                          {type}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>

              {/* Drop Zone Area */}
              <TouchableOpacity
                className="min-h-[160px] flex-col items-center justify-center p-6 bg-white mb-5 border-2 border-dashed border-slate-350 rounded-xl"
                activeOpacity={0.7}
              >
                <View className="w-11 h-11 rounded-full bg-surface-container-highest flex items-center justify-center mb-3">
                  <Text className="text-[20px]">📤</Text>
                </View>
                <Text className="font-title-md text-title-md text-on-surface text-center">
                  Click to upload or drag and drop
                </Text>
                <Text className="font-body-md text-body-md text-on-surface-variant mt-1 text-center">
                  PDF, DOCX, or JPG (max. 50MB)
                </Text>
              </TouchableOpacity>

              {/* Toggle Switch */}
              <TouchableOpacity 
                onPress={() => setNotifyStudents(!notifyStudents)}
                className="flex-row items-center px-1 mt-1"
                activeOpacity={0.8}
              >
                <View 
                  className={`w-10 h-6 rounded-full relative flex items-center px-0.5 ${notifyStudents ? "bg-emerald-500" : "bg-surface-container-high"}`}
                >
                  <View 
                    style={{
                      transform: [{ translateX: notifyStudents ? 16 : 0 }]
                    }}
                    className="w-4 h-4 bg-white rounded-full shadow" 
                  />
                </View>
                <Text className="font-body-md text-body-md text-on-surface-variant ml-3">
                  Notify all students immediately
                </Text>
              </TouchableOpacity>
            </ScrollView>

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
                onPress={handleShare}
                style={{ opacity: title.trim() ? 1 : 0.5 }}
                className="flex-1 h-14 rounded-full bg-primary items-center justify-center"
                disabled={!title.trim()}
                activeOpacity={0.8}
              >
                <Text className="font-label-lg text-label-lg text-on-primary">
                  Share Material
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}
