import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import DashboardBody from "@/dashboard/dashboard/components/DashboardBody";
import MyClassesBody from "@/dashboard/my-classes/components/MyClassesBody";
import ClassroomHub from "@/dashboard/my-classes/components/subject-body/ClassroomHub";
import SubjectMaterials from "@/dashboard/my-classes/components/subject-materials/SubjectMaterials";
import ClassroomChat from "@/dashboard/my-classes/components/classroom-chat/ClassroomChat";
import TestManagement from "@/dashboard/my-classes/components/test-management/TestManagement";
import StudentsRating from "@/dashboard/my-classes/components/students-rating/StudentsRating";
import StudentAttendance from "@/dashboard/my-classes/components/StudentAttendance";
import ClassroomRoom from "@/dashboard/my-classes/components/rooms/ClassroomRoom";
import AiAssistantBody from "@/dashboard/AI-assistant/components/AiAssistantBody";
import ProfileAccountScreen from "@/profile/components/ProfileAccountScreen";

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState("home");
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const [showMaterials, setShowMaterials] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showTests, setShowTests] = useState(false);
  const [showRatings, setShowRatings] = useState(false);
  const [showAttendance, setShowAttendance] = useState(false);
  const [showRoom, setShowRoom] = useState(false);
  const insets = useSafeAreaInsets();

  const tabs = [
    { id: "home", label: "HOME", iconProvider: "Ionicons", iconName: "home-outline", iconActiveName: "home" },
    { id: "classes", label: "CLASSES", iconProvider: "Ionicons", iconName: "book-outline", iconActiveName: "book" },
    { id: "assistant", label: "AI ASSISTANT", iconProvider: "MaterialCommunityIcons", iconName: "head-cog-outline", iconActiveName: "head-cog" },
    { id: "schedule", label: "SCHEDULE", iconProvider: "Ionicons", iconName: "calendar-outline", iconActiveName: "calendar" },
    { id: "account", label: "ACCOUNT", iconProvider: "Ionicons", iconName: "person-outline", iconActiveName: "person" },
  ];

  const renderBody = () => {
    if (activeTab === "classes") {
      if (selectedClassId) {
        if (showMaterials) {
          return (
            <SubjectMaterials 
              classId={selectedClassId} 
              onBack={() => setShowMaterials(false)} 
            />
          );
        }
        if (showChat) {
          return (
            <ClassroomChat 
              classId={selectedClassId} 
              onBack={() => setShowChat(false)} 
            />
          );
        }
        if (showTests) {
          return (
            <TestManagement 
              classId={selectedClassId} 
              onBack={() => setShowTests(false)} 
            />
          );
        }
        if (showRatings) {
          return (
            <StudentsRating 
              classId={selectedClassId} 
              onBack={() => setShowRatings(false)} 
            />
          );
        }
        if (showAttendance) {
          return (
            <StudentAttendance
              classId={selectedClassId}
              onBack={() => setShowAttendance(false)}
            />
          );
        }
        if (showRoom) {
          return (
            <ClassroomRoom
              classId={selectedClassId}
              onBack={() => setShowRoom(false)}
            />
          );
        }
        return (
          <ClassroomHub
            classId={selectedClassId}
            onBack={() => setSelectedClassId(null)}
            onOpenMaterials={() => {
              console.log("home.tsx: toggling showMaterials -> true");
              setShowMaterials(true);
            }}
            onOpenChat={() => {
              console.log("home.tsx: toggling showChat -> true");
              setShowChat(true);
            }}
            onOpenTests={() => {
              console.log("home.tsx: toggling showTests -> true");
              setShowTests(true);
            }}
            onOpenRatings={() => {
              console.log("home.tsx: toggling showRatings -> true");
              setShowRatings(true);
            }}
            onOpenAttendance={() => {
              console.log("home.tsx: toggling showAttendance -> true");
              setShowAttendance(true);
            }}
            onOpenRoom={() => {
              console.log("home.tsx: toggling showRoom -> true");
              setShowRoom(true);
            }}
          />
        );
      }
      return <MyClassesBody onSelectClass={(id) => setSelectedClassId(id)} />;
    }
    if (activeTab === "assistant") {
      return <AiAssistantBody onBack={() => setActiveTab("home")} />;
    }
    if (activeTab === "account") {
      return <ProfileAccountScreen onBack={() => setActiveTab("home")} />;
    }
    return <DashboardBody onViewProfile={() => setActiveTab("account")} />;
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Active Screen body */}
      {renderBody()}

      {/* Bottom Tab Navigation Bar overlay */}
      <View 
        style={{ 
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 64 + insets.bottom, 
          paddingBottom: insets.bottom,
          paddingTop: 4,
          backgroundColor: "#ffffff",
          borderTopWidth: 1,
          borderTopColor: "rgba(241, 245, 249, 0.6)",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          paddingHorizontal: 8,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.05,
          shadowRadius: 10,
          elevation: 8,
        }}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const IconComponent = tab.iconProvider === "Ionicons" ? Ionicons : MaterialCommunityIcons;
          const iconName = isActive ? tab.iconActiveName : tab.iconName;

          return (
            <TouchableOpacity
              key={tab.id}
              onPress={() => {
                setActiveTab(tab.id);
                setSelectedClassId(null);
                setShowMaterials(false);
                setShowChat(false);
                setShowTests(false);
                setShowRatings(false);
                setShowAttendance(false);
                setShowRoom(false);
              }}
              style={{
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
              }}
              activeOpacity={0.7}
            >
              <View 
                style={{
                  width: 56,
                  height: 36,
                  borderRadius: 16,
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  backgroundColor: isActive ? "#0f172a" : "transparent",
                  shadowColor: isActive ? "#000" : "transparent",
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: isActive ? 0.1 : 0,
                  shadowRadius: 2,
                  elevation: isActive ? 2 : 0,
                }}
              >
                <IconComponent 
                  name={iconName as any} 
                  size={18} 
                  color={isActive ? "#FFFFFF" : "#64748b"} 
                />
                {/* Blue notification dot for AI Assistant when inactive */}
                {tab.id === "assistant" && !isActive && (
                  <View 
                    style={{
                      position: "absolute",
                      top: 6,
                      right: 14,
                      width: 8,
                      height: 8,
                      backgroundColor: "#3b82f6",
                      borderRadius: 4,
                      borderWidth: 1,
                      borderColor: "#ffffff",
                    }}
                  />
                )}
              </View>
              <Text 
                style={{
                  fontSize: 8,
                  letterSpacing: 0.5,
                  marginTop: 4,
                  fontWeight: isActive ? "700" : "500",
                  color: isActive ? "#0f172a" : "#94a3b8",
                }}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
