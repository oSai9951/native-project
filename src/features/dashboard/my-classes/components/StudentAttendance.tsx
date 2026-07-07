import React, { useState } from "react";
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  TextInput 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { ATTENDANCE_STUDENTS_DATA, AttendanceStudent } from "../data/index";

interface StudentAttendanceProps {
  classId: string;
  onBack: () => void;
}

export default function StudentAttendance({ classId, onBack }: StudentAttendanceProps) {
  // Local state initialized from data store
  const [students, setStudents] = useState<AttendanceStudent[]>(ATTENDANCE_STUDENTS_DATA);

  // Reference section name dynamically
  const sectionName = classId === "1" ? "Section 8A" : classId === "2" ? "Section 10B" : "Section 12C";

  // Calculate live stats based on state
  const totalCount = students.length;
  const presentCount = students.filter(s => s.status === "Present").length;
  const absentCount = students.filter(s => s.status === "Absent").length;
  const lateCount = students.filter(s => s.status === "Late").length;
  
  // Calculate completion percentage
  const markedCount = students.filter(s => s.status !== null).length;
  const completionPercent = totalCount > 0 ? Math.round((markedCount / totalCount) * 100) : 0;

  // Toggle single student status
  const updateStatus = (studentId: string, status: AttendanceStudent["status"]) => {
    setStudents(prev => prev.map(s => {
      if (s.id === studentId) {
        return { ...s, status };
      }
      return s;
    }));
  };

  // Update single student note
  const updateNote = (studentId: string, note: string) => {
    setStudents(prev => prev.map(s => {
      if (s.id === studentId) {
        return { ...s, note };
      }
      return s;
    }));
  };

  // Mark all students as Present
  const markAllPresent = () => {
    setStudents(prev => prev.map(s => ({ ...s, status: "Present" })));
  };

  return (
    <LinearGradient 
      colors={["#c1d3c9", "#d8e6eb", "#f6e5ed", "#fffdd1"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        {/* Top App Bar */}
        <View className="px-gutter py-4 w-full flex-row justify-between items-center border-b border-surface-container-highest bg-surface/30 z-50">
          <TouchableOpacity 
            onPress={onBack}
            className="w-10 h-10 items-center justify-center rounded-full bg-white/20 active:bg-white/40"
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={24} color="#1C1B1B" />
          </TouchableOpacity>
          <Text className="font-headline-lg-mobile text-headline-lg-mobile text-primary tracking-tighter">
            Student Attendance
          </Text>
          <TouchableOpacity 
            className="w-10 h-10 items-center justify-center rounded-full bg-white/20 active:bg-white/40"
            activeOpacity={0.7}
          >
            <Ionicons name="ellipsis-vertical" size={20} color="#1C1B1B" />
          </TouchableOpacity>
        </View>

        {/* Scrollable Container */}
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingTop: 20,
            paddingBottom: 120,
          }}
        >
          {/* Subtext Section */}
          <View className="mb-4">
            <Text className="font-body-lg text-body-lg text-on-surface-variant">
              Record and manage daily attendance for {sectionName}
            </Text>
          </View>

          {/* Stat Chips Row */}
          <View className="flex-row gap-3 mb-6">
            {/* Total */}
            <View className="flex-1 bg-surface-container-highest p-3 rounded-2xl border border-black/5 justify-between">
              <Text className="text-[9px] font-bold tracking-widest text-on-surface-variant uppercase">TOTAL</Text>
              <Text className="font-title-md text-title-md text-primary mt-1 font-bold">{totalCount}</Text>
            </View>

            {/* Present */}
            <View style={{ backgroundColor: "#D0F2E3" }} className="flex-1 p-3 rounded-2xl border border-emerald-200 justify-between">
              <Text style={{ color: "#0F4D32" }} className="text-[9px] font-bold tracking-widest uppercase">PRESENT</Text>
              <Text style={{ color: "#0F4D32" }} className="font-title-md text-title-md mt-1 font-bold">{presentCount}</Text>
            </View>

            {/* Absent */}
            <View style={{ backgroundColor: "#FCE3E3" }} className="flex-1 p-3 rounded-2xl border border-red-200 justify-between">
              <Text style={{ color: "#7A1C1C" }} className="text-[9px] font-bold tracking-widest uppercase">ABSENT</Text>
              <Text style={{ color: "#7A1C1C" }} className="font-title-md text-title-md mt-1 font-bold">{absentCount}</Text>
            </View>

            {/* Late */}
            <View style={{ backgroundColor: "#E3F1FC" }} className="flex-1 p-3 rounded-2xl border border-sky-200 justify-between">
              <Text style={{ color: "#1C4E7A" }} className="text-[9px] font-bold tracking-widest uppercase">LATE</Text>
              <Text style={{ color: "#1C4E7A" }} className="font-title-md text-title-md mt-1 font-bold">{lateCount}</Text>
            </View>
          </View>

          {/* Filter Bar Row */}
          <View className="flex-row flex-wrap items-center justify-between gap-2 mb-6">
            <View className="flex-row gap-2">
              <TouchableOpacity className="bg-white/60 border border-outline-variant rounded-full px-4 py-2 flex-row items-center gap-1">
                <Text className="font-label-lg text-label-lg text-primary">{sectionName}</Text>
                <Ionicons name="chevron-down" size={14} color="#000" />
              </TouchableOpacity>

              <TouchableOpacity className="bg-white/60 border border-outline-variant rounded-full px-4 py-2 flex-row items-center gap-1.5">
                <Ionicons name="calendar-outline" size={14} color="#000" />
                <Text className="font-label-lg text-label-lg text-primary">05 Jul 2026</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity 
              onPress={markAllPresent}
              className="border border-primary rounded-full px-4 py-2.5 flex-row items-center gap-1.5 bg-white active:scale-95 shadow-sm"
              activeOpacity={0.8}
            >
              <Ionicons name="checkmark" size={16} color="#000" />
              <Text className="font-label-lg text-label-lg text-primary font-bold">Mark all as Present</Text>
            </TouchableOpacity>
          </View>

          {/* Completion Track Progress */}
          <View className="space-y-2 mb-6">
            <View className="flex-row justify-between items-end">
              <Text className="font-label-lg text-label-lg text-primary font-bold">
                {`Completion: ${completionPercent}%`}
              </Text>
            </View>
            <View className="w-full h-3 bg-surface-container-highest rounded-full overflow-hidden border border-black/5">
              <View 
                style={{ width: `${completionPercent}%` }} 
                className="h-full bg-primary rounded-full"
              />
            </View>
          </View>

          {/* Student List Container Card */}
          <View className="bg-white border border-outline-variant rounded-card overflow-hidden shadow-sm mb-6">
            {/* Header for list */}
            <View className="px-5 py-3.5 bg-slate-50 flex-row justify-between items-center border-b border-outline-variant">
              <Text className="font-label-lg text-label-lg text-primary font-bold">Students</Text>
              <Text className="font-label-sm text-label-sm text-on-surface-variant">Page 1 of 3</Text>
            </View>

            {/* List of Students */}
            <View className="divide-y divide-outline-variant">
              {students.map((student) => {
                const isPresent = student.status === "Present";
                const isAbsent = student.status === "Absent";
                const isLate = student.status === "Late";
                const isExcused = student.status === "Excused";

                return (
                  <View key={student.id} className="p-5 gap-3.5">
                    {/* Header Row */}
                    <View className="flex-row items-center justify-between">
                      <View className="flex-row items-center gap-3">
                        <View 
                          style={{ backgroundColor: student.avatarBg }}
                          className="w-12 h-12 rounded-full items-center justify-center border border-black/5"
                        >
                          <Text style={{ color: student.avatarText }} className="font-title-md text-[16px] font-bold">
                            {student.initials}
                          </Text>
                        </View>
                        <View>
                          <Text className="font-label-lg text-label-lg text-primary font-bold">{student.name}</Text>
                          <Text className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">{student.rollNumber}</Text>
                        </View>
                      </View>

                      {/* Add note text input */}
                      <TextInput 
                        className="w-28 text-right font-body-md text-xs italic text-on-surface-variant p-1 border-b border-transparent focus:border-slate-300"
                        placeholder="Add note..."
                        value={student.note}
                        onChangeText={(text) => updateNote(student.id, text)}
                      />
                    </View>

                    {/* Status Toggle Buttons bar */}
                    <View className="flex-row gap-2">
                      {/* Present Button */}
                      <TouchableOpacity 
                        onPress={() => updateStatus(student.id, "Present")}
                        className={`px-5 py-2 rounded-full border ${isPresent ? "bg-primary border-primary" : "border-outline-variant"}`}
                      >
                        <Text className={`font-label-sm text-[12px] font-bold ${isPresent ? "text-white" : "text-on-surface-variant"}`}>
                          Present
                        </Text>
                      </TouchableOpacity>

                      {/* Absent Button */}
                      <TouchableOpacity 
                        onPress={() => updateStatus(student.id, "Absent")}
                        className={`px-5 py-2 rounded-full border ${isAbsent ? "bg-error border-error" : "border-outline-variant"}`}
                      >
                        <Text className={`font-label-sm text-[12px] font-bold ${isAbsent ? "text-white" : "text-on-surface-variant"}`}>
                          Absent
                        </Text>
                      </TouchableOpacity>

                      {/* Late Button */}
                      <TouchableOpacity 
                        onPress={() => updateStatus(student.id, "Late")}
                        className={`px-5 py-2 rounded-full border ${isLate ? "bg-[#0c1e26] border-[#0c1e26]" : "border-outline-variant"}`}
                      >
                        <Text className={`font-label-sm text-[12px] font-bold ${isLate ? "text-white" : "text-on-surface-variant"}`}>
                          Late
                        </Text>
                      </TouchableOpacity>

                      {/* Excused Button */}
                      <TouchableOpacity 
                        onPress={() => updateStatus(student.id, "Excused")}
                        style={isExcused ? { backgroundColor: "#FEF3D1", borderColor: "#FFE082" } : {}}
                        className={`px-5 py-2 rounded-full border ${isExcused ? "" : "border-outline-variant"}`}
                      >
                        <Text 
                          style={isExcused ? { color: "#7A5E1C" } : {}}
                          className={`font-label-sm text-[12px] font-bold ${isExcused ? "" : "text-on-surface-variant"}`}
                        >
                          Excused
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>

          {/* Pagination Footer */}
          <View className="flex-row items-center justify-between pb-8">
            <Text className="font-body-md text-body-md text-on-surface-variant">
              Showing 1-4 of 24 students
            </Text>
            <View className="flex-row gap-2">
              <TouchableOpacity className="w-10 h-10 rounded-full bg-surface-container-highest items-center justify-center active:scale-90">
                <Ionicons name="chevron-back" size={20} color="#000" />
              </TouchableOpacity>
              <TouchableOpacity className="w-10 h-10 rounded-full bg-primary items-center justify-center active:scale-90">
                <Ionicons name="chevron-forward" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
