import React, { useState } from "react";
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  TextInput, 
  Image,
  Alert
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { StudentRatingItem } from "../../data/index";

interface StudentRatingDetailProps {
  student: StudentRatingItem;
  onBack: () => void;
  onSave: (updated: StudentRatingItem) => void;
}

export default function StudentRatingDetail({ student, onBack, onSave }: StudentRatingDetailProps) {
  // Local state for interactive criteria ratings
  const [participation, setParticipation] = useState(student.ratings.participation);
  const [homework, setHomework] = useState(student.ratings.homework);
  const [behavior, setBehavior] = useState(student.ratings.behaviour);
  const [criticalThinking, setCriticalThinking] = useState(student.ratings.understanding);
  const [observationText, setObservationText] = useState("");
  
  // Calculate average overall rating
  const overallRating = parseFloat(
    ((participation + homework + behavior + criticalThinking) / 4).toFixed(1)
  );

  // Render clickable stars for a specific metric
  const renderInteractiveStars = (currentVal: number, setVal: (val: number) => void) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity 
          key={i} 
          onPress={() => setVal(i)}
          className="p-1"
        >
          <Ionicons 
            name={i <= currentVal ? "star" : "star-outline"} 
            size={30} 
            color="#FFD700" 
          />
        </TouchableOpacity>
      );
    }
    return <View className="flex-row items-center gap-1">{stars}</View>;
  };

  // Render overall stars with half-star handling
  const renderOverallStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalf = rating - fullStars >= 0.3 && rating - fullStars <= 0.7;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<Ionicons key={i} name="star" size={20} color="#FFD700" />);
      } else if (i === fullStars + 1 && hasHalf) {
        stars.push(<Ionicons key={i} name="star-half" size={20} color="#FFD700" />);
      } else {
        stars.push(<Ionicons key={i} name="star-outline" size={20} color="#FFD700" />);
      }
    }
    return <View className="flex-row items-center gap-0.5">{stars}</View>;
  };

  const handleSave = () => {
    const updatedStudent: StudentRatingItem = {
      ...student,
      rating: overallRating,
      ratings: {
        participation,
        homework,
        behaviour: behavior,
        understanding: criticalThinking
      }
    };
    onSave(updatedStudent);
    Alert.alert("Success", "Student rating saved successfully!");
  };

  // Profile image fallbacks based on student initials/mock values
  const studentAvatarUrl = student.id === "1" 
    ? "https://lh3.googleusercontent.com/aida-public/AB6AXuA0AKvRnK-rFIuoQPb874LXVhwK9PUXwHqjuMyofHNEwMl5f6f3AASZ1zTXG_3y786zk12ktHu-gyu8r5v3HVzz-AZ9RSdGXIolNqyvl-YGR__tDwm6TL3dYD8X6eJgfsDYdUB4yEifchwbwUOfvGfyfxU2evyV42bbXZkVpU4A158npgv1wB9RMxY84Yqvgg9RvOKnr_wlSRvOJqKblJTeBpmuCKJHCuXku67UhwviCQlt7hyXBGgh"
    : student.id === "2"
    ? "https://lh3.googleusercontent.com/aida-public/AB6AXuAsmwbmNGDXILh_GHhRZvsIRpHWdM00f1DqBes-MqtyjfS-ZqohtPifaZuRu_PKGg-td1rsY2h3QyUvYyD7SNNzJNkHQSMFOI7Bdm5Y5QtiISeDpU-1_MEBogF16iIoL6M_AzXmHwsuVG_C2Y6Ldkj0l2NcT8JtCLIPJVUppJBj_DBMRlylVcxJ1NTPwxd2cELxnYNBAiyvheRqu_CrX8ZKKtf5wXj5xTcW3iuoKAjzPTJOiY5Jmnke"
    : "https://lh3.googleusercontent.com/aida-public/AB6AXuCvD_2uD8Lezk1iQ1XdPxhw9k17MO2-fvW6ZqirF46s1x_zMYQ5dKqhjy6CrN-IsU_n_29t8rQ27Xa5PPfKZFRdcBdYa_SD00zHDegJ1LQmZes0irmdvfRX0hnepU8nPvqHDC8xTLnkFwJHc0wxVXhEeGV0yUTAkmuTvDFDyOYQ0Gc9K5plGYqCZ3ZZp5em0xTofoiddwMcq2z6m9zARJFBllOVp48Jjtw-LfnPSzVMGdPCgmK00ydr";

  return (
    <LinearGradient 
      colors={["#c1d3c9", "#d8e6eb", "#f6e5ed", "#fffdd1"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        {/* Header App Bar */}
        <View className="px-container-padding pt-6 pb-4 w-full border-b border-surface-container-highest bg-surface/30 z-50 flex-row justify-between items-center">
          <View className="flex-row items-center gap-4">
            <TouchableOpacity 
              onPress={onBack}
              className="w-10 h-10 items-center justify-center rounded-full bg-white/20 active:bg-white/40"
              activeOpacity={0.7}
            >
              <Ionicons name="menu" size={24} color="#1C1B1B" />
            </TouchableOpacity>
            <Text className="font-display-lg text-headline-lg text-primary tracking-tighter">
              EduFlow
            </Text>
          </View>

          <View className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant">
            <Image 
              source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuAse4fzAszjzdCTgJ7VppMIMybuvB5PxN1wI12jYstzDsorYWRbhShnnYBTV8PRNjEzHwoUmZ863rzvUfHtLaG3oR_iNt9XKpTeP7fWOWzI5caRhmg7WgFjETY1KyJ6kX2yE1x44B5uBwxdMmpJyZ2sS5jVr1FQ61YkPRDYfXkXr7NVZO8eIcpipcFtRU73qF-i-4X__DzdcfD9TumztcAs1BpL0_qBhcTsSPkb9Z1fdqb5P1JbQmon" }}
              className="w-full h-full object-cover"
            />
          </View>
        </View>

        {/* Scrollable Container */}
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingTop: 24,
            paddingBottom: 140,
          }}
        >
          {/* Breadcrumbs Navigation */}
          <TouchableOpacity 
            onPress={onBack}
            className="flex-row items-center gap-1.5 mb-6 active:opacity-70"
            activeOpacity={0.7}
          >
            <Text className="text-on-surface-variant font-semibold text-[13px]">Class 10-A</Text>
            <Ionicons name="chevron-forward" size={14} color="#747878" />
            <Text className="text-[#1C1B1B] font-bold text-[13px]">Student Ratings</Text>
          </TouchableOpacity>

          {/* Collapsed/Expanded Unified Card Container */}
          <View className="bg-white border border-outline-variant rounded-[24px] overflow-hidden shadow-sm mb-8">
            {/* Header Block click to toggle/reveal details */}
            <View className="flex-row justify-between items-center p-5 border-b border-surface-container bg-surface/10">
              <View className="flex-row items-center gap-4">
                <View className="relative">
                  <View className="w-14 h-14 rounded-full bg-secondary-container flex items-center justify-center border-2 border-white overflow-hidden shadow-sm">
                    <Image 
                      source={{ uri: studentAvatarUrl }}
                      className="w-full h-full object-cover"
                    />
                  </View>
                  <View className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                    <Text className="text-white text-[10px] font-bold">
                      {student.rollNumber.replace(/[^0-9]/g, "") || "01"}
                    </Text>
                  </View>
                </View>

                <View>
                  <Text className="font-title-md text-title-md text-primary font-bold">
                    {student.name}
                  </Text>
                  <Text className="font-label-sm text-[11px] text-on-surface-variant uppercase tracking-wider mt-0.5">
                    {`${student.rollNumber} • Grade 10`}
                  </Text>
                </View>
              </View>

              {/* Expander display element */}
              <View className="flex-row items-center gap-4">
                <View className="items-end hidden sm:flex">
                  <View className="flex-row items-center gap-1">
                    <Text className="font-label-lg text-label-lg text-primary">Last Rating: {student.rating.toFixed(1)}</Text>
                    <Ionicons name="star" size={16} color="#FFD700" />
                  </View>
                  <Text className="text-[10px] text-on-surface-variant font-medium">March 12, 2024</Text>
                </View>
                <TouchableOpacity onPress={onBack}>
                  <Ionicons name="chevron-up" size={24} color="#1C1B1B" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Inner Details ratings lists */}
            <View className="p-6 bg-slate-50 gap-6">
              {/* Star Criteria Matrix Grid */}
              <View className="gap-4">
                {/* Participation */}
                <View className="bg-white p-5 rounded-2xl border border-surface-container shadow-sm">
                  <View className="flex-row justify-between items-center mb-3">
                    <Text className="font-label-lg text-label-lg text-on-surface-variant font-semibold">Participation</Text>
                    <View className="bg-secondary-container px-3 py-1 rounded-full">
                      <Text className="font-label-sm text-[11px] text-on-secondary-container font-bold">Classroom</Text>
                    </View>
                  </View>
                  {renderInteractiveStars(participation, setParticipation)}
                </View>

                {/* Homework Quality */}
                <View className="bg-white p-5 rounded-2xl border border-surface-container shadow-sm">
                  <View className="flex-row justify-between items-center mb-3">
                    <Text className="font-label-lg text-label-lg text-on-surface-variant font-semibold">Homework Quality</Text>
                    <View className="bg-secondary-container px-3 py-1 rounded-full">
                      <Text className="font-label-sm text-[11px] text-on-secondary-container font-bold">Academic</Text>
                    </View>
                  </View>
                  {renderInteractiveStars(homework, setHomework)}
                </View>

                {/* Behavior */}
                <View className="bg-white p-5 rounded-2xl border border-surface-container shadow-sm">
                  <View className="flex-row justify-between items-center mb-3">
                    <Text className="font-label-lg text-label-lg text-on-surface-variant font-semibold">Behavior</Text>
                    <View className="bg-secondary-container px-3 py-1 rounded-full">
                      <Text className="font-label-sm text-[11px] text-on-secondary-container font-bold">Social</Text>
                    </View>
                  </View>
                  {renderInteractiveStars(behavior, setBehavior)}
                </View>

                {/* Critical Thinking */}
                <View className="bg-white p-5 rounded-2xl border border-surface-container shadow-sm">
                  <View className="flex-row justify-between items-center mb-3">
                    <Text className="font-label-lg text-label-lg text-on-surface-variant font-semibold">Critical Thinking</Text>
                    <View className="bg-secondary-container px-3 py-1 rounded-full">
                      <Text className="font-label-sm text-[11px] text-on-secondary-container font-bold">Cognitive</Text>
                    </View>
                  </View>
                  {renderInteractiveStars(criticalThinking, setCriticalThinking)}
                </View>
              </View>

              {/* Observation notes */}
              <View className="gap-2">
                <View className="flex-row items-center gap-2 px-1">
                  <Ionicons name="chatbubble-outline" size={18} color="#000000" />
                  <Text className="font-label-lg text-label-lg text-primary font-bold">
                    Teacher Observation
                  </Text>
                </View>
                <TextInput 
                  className="w-full min-h-[100px] bg-white border border-surface-container rounded-2xl p-4 font-body-md text-on-surface"
                  placeholder="Add a private note about performance..."
                  placeholderTextColor="#94a3b8"
                  multiline
                  textAlignVertical="top"
                  value={observationText}
                  onChangeText={setObservationText}
                />
              </View>

              {/* Footer controls row */}
              <View className="flex-col gap-4 pt-4 border-t border-surface-container-high">
                <View className="flex-row items-center justify-between bg-white px-5 py-3 rounded-full border border-surface-container">
                  <Text className="font-title-md text-title-md text-primary">
                    Overall: <Text className="font-bold">{overallRating.toFixed(1)}</Text>
                  </Text>
                  {renderOverallStars(overallRating)}
                </View>
                
                <TouchableOpacity 
                  onPress={handleSave}
                  className="bg-primary w-full py-4 rounded-full items-center justify-center shadow-md active:scale-95"
                  activeOpacity={0.8}
                >
                  <Text className="font-label-lg text-label-lg text-white">
                    Save Rating
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Bento Recent Logs Section */}
          <View>
            <Text className="font-headline-lg text-[22px] font-bold text-primary mb-6 ml-1">
              Recent Performance Logs
            </Text>

            <View className="flex-row flex-wrap -mx-2">
              {/* Left Bento: Academic trend */}
              <View className="w-full md:w-2/3 px-2 mb-4">
                <View 
                  style={{ backgroundColor: "#ecdfba", minHeight: 180 }}
                  className="p-6 rounded-[24px] border border-black/5 justify-between shadow-sm"
                >
                  <View>
                    <Text className="font-label-lg text-[12px] text-slate-700 font-bold uppercase tracking-wider">
                      Academic Trend
                    </Text>
                    <Text className="font-display-lg text-[32px] text-[#211b05] font-bold mt-1 leading-[38px]">
                      Improving consistently
                    </Text>
                  </View>
                  <View className="flex-row gap-2 mt-4 items-end">
                    <View className="h-12 flex-1 bg-white/40 rounded-xl" />
                    <View className="h-20 flex-1 bg-white/40 rounded-xl" />
                    <View className="h-16 flex-1 bg-white/40 rounded-xl" />
                    <View className="h-28 flex-1 bg-primary rounded-xl" />
                  </View>
                </View>
              </View>

              {/* Right Bento: Top Performer */}
              <View className="w-full md:w-1/3 px-2 mb-4">
                <View 
                  style={{ minHeight: 180 }}
                  className="bg-white p-6 rounded-[24px] border border-outline-variant items-center justify-center text-center space-y-4 shadow-sm"
                >
                  <View className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center border border-black/5">
                    <Ionicons name="trophy-outline" size={28} color="#000000" />
                  </View>
                  <View className="items-center">
                    <Text className="font-title-md text-title-md font-bold text-primary">
                      Top Performer
                    </Text>
                    <Text className="font-body-md text-on-surface-variant mt-1 text-center">
                      English Literature
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
