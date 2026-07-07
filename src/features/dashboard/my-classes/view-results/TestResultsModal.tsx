import React from "react";
import { 
  Modal, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Image 
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface StudentResultRow {
  id: string;
  name: string;
  studentId: string;
  score: string;
  status: "Pass" | "Fail" | "Absent";
  avatarUrl?: string;
  bgColor: string;
  borderColor: string;
}

const RESULTS_STUDENTS_MOCK: StudentResultRow[] = [
  {
    id: "1",
    name: "Alex Sterling",
    studentId: "ID: 40221",
    score: "94%",
    status: "Pass",
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBKz-aePdX5WbJUOhUDuOLjWIF2a8Z9VCW5LaEsFEuFcHd7jUW0IU0yaFUmipr2CwrGfdLjBjrcjQ_lEEtsc-NfxuFOYzV5m9KpunjWNqrbNAQZtV0-Dj23Pb72TAa9NA-HwdkS27X-gUDk-ZNiSSI9b_qGZE6lEM0jXQdZtrt3PoBPqZIaTuvIqIfwcN-4DuV4lUPLuKvih65_kn6gJd6lEmjHy7g_EGEVd6BOb6ADhUXgmA7j6T6s",
    bgColor: "#E8F5E9",
    borderColor: "#A5D6A7",
  },
  {
    id: "2",
    name: "Maya Rodriguez",
    studentId: "ID: 40225",
    score: "68%",
    status: "Pass",
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAsmwbmNGDXILh_GHhRZvsIRpHWdM00f1DqBes-MqtyjfS-ZqohtPifaZuRu_PKGg-td1rsY2h3QyUvYyD7SNNzJNkHQSMFOI7Bdm5Y5QtiISeDpU-1_MEBogF16iIoL6M_AzXmHwsuVG_C2Y6Ldkj0l2NcT8JtCLIPJVUppJBj_DBMRlylVcxJ1NTPwxd2cELxnYNBAiyvheRqu_CrX8ZKKtf5wXj5xTcW3iuoKAjzPTJOiY5Jmnke",
    bgColor: "#FFF8E1",
    borderColor: "#FFE082",
  },
  {
    id: "3",
    name: "Julian Chen",
    studentId: "ID: 40231",
    score: "42%",
    status: "Fail",
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCvD_2uD8Lezk1iQ1XdPxhw9k17MO2-fvW6ZqirF46s1x_zMYQ5dKqhjy6CrN-IsU_n_29t8rQ27Xa5PPfKZFRdcBdYa_SD00zHDegJ1LQmZes0irmdvfRX0hnepU8nPvqHDC8xTLnkFwJHc0wxVXhEeGV0yUTAkmuTvDFDyOYQ0Gc9K5plGYqCZ3ZZp5em0xTofoiddwMcq2z6m9zARJFBllOVp48Jjtw-LfnPSzVMGdPCgmK00ydr",
    bgColor: "#FFEBEE",
    borderColor: "#EF9A9A",
  },
  {
    id: "4",
    name: "Samantha Vane",
    studentId: "ID: 40238",
    score: "--",
    status: "Absent",
    bgColor: "#F3F4F5",
    borderColor: "#E1E3E4",
  },
  {
    id: "5",
    name: "Leo Martinez",
    studentId: "ID: 40245",
    score: "88%",
    status: "Pass",
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAWzjCLNJhJX2zZSDyA-5733V8zifZhDhuhkX8KUADyuWazoZPlv4a4x2EoMEsEqpxDU1k8rRruth22qBAJ2R-CmR4wmhQrpeuyf1_Z7lmTsFsBWP8pgry8T1QDiDG9T-JUw9EGxbhvQaFp3XqWNpbA-5NcrPA6Duk3Sk_UidzlA7tU5QceLOyFr3TlZDCzu3Ev_FWMk3_5wHqLI1VUK4Wp3D5BvTRquCY87cOji_xyY5jgsozUbc_T",
    bgColor: "#E8F5E9",
    borderColor: "#A5D6A7",
  },
];

interface TestResultsModalProps {
  visible: boolean;
  onClose: () => void;
  testTitle: string;
}

export default function TestResultsModal({ visible, onClose, testTitle }: TestResultsModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      {/* Dimmed sheet backdrop */}
      <View className="flex-1 bg-black/40 justify-end">
        {/* Click outside backdrop area to dismiss sheet */}
        <TouchableOpacity 
          className="flex-1" 
          activeOpacity={1} 
          onPress={onClose} 
        />

        {/* Bottom Sheet Sheet panel container */}
        <View className="bg-surface-container-lowest w-full rounded-t-card max-h-[85%] pb-6">
          {/* Pull handle indicator */}
          <View className="flex-row justify-center py-3">
            <View className="w-10 h-1.5 bg-outline-variant rounded-full opacity-60" />
          </View>

          {/* Scrollable Form Content */}
          <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 24,
              paddingBottom: 40,
            }}
          >
            {/* Header Title Section */}
            <View className="mb-6 mt-2">
              <Text className="font-headline-lg-mobile text-[22px] leading-[28px] font-bold text-primary mb-2">
                {testTitle || "Advanced Calculus: Phase 1"}
              </Text>
              
              {/* Metadata tags */}
              <View className="flex-row items-center gap-2">
                <View className="flex-row items-center gap-1">
                  <Ionicons name="calendar-outline" size={14} color="#747878" />
                  <Text className="font-label-lg text-label-lg text-on-surface-variant">Oct 24, 2023</Text>
                </View>
                <View className="w-1 h-1 bg-outline-variant rounded-full" />
                
                <View className="flex-row items-center gap-1">
                  <Ionicons name="time-outline" size={14} color="#747878" />
                  <Text className="font-label-lg text-label-lg text-on-surface-variant">60m</Text>
                </View>
                <View className="w-1 h-1 bg-outline-variant rounded-full" />

                <View className="flex-row items-center gap-1">
                  <Ionicons name="star-outline" size={14} color="#747878" />
                  <Text className="font-label-lg text-label-lg text-on-surface-variant">100 pts</Text>
                </View>
              </View>
            </View>

            {/* 4-Cell Summary Strip */}
            <View className="border border-outline-variant rounded-xl overflow-hidden bg-surface mb-6">
              <View className="flex-row divide-x divide-outline-variant w-full">
                <View className="flex-1 py-4 flex-col items-center justify-center text-center">
                  <Text className="font-headline-lg-mobile text-headline-lg-mobile text-primary mb-0.5">28</Text>
                  <Text className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-wider">Subs</Text>
                </View>
                <View className="flex-1 py-4 flex-col items-center justify-center text-center">
                  <Text className="font-headline-lg-mobile text-headline-lg-mobile text-primary mb-0.5">72%</Text>
                  <Text className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-wider">Avg</Text>
                </View>
                <View className="flex-1 py-4 flex-col items-center justify-center text-center">
                  <Text className="font-headline-lg-mobile text-headline-lg-mobile text-primary mb-0.5">84%</Text>
                  <Text className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-wider">Pass</Text>
                </View>
                <View className="flex-1 py-4 flex-col items-center justify-center text-center">
                  <Text className="font-headline-lg-mobile text-headline-lg-mobile text-primary mb-0.5">98</Text>
                  <Text className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-wider">High</Text>
                </View>
              </View>
            </View>

            {/* Student Performance List */}
            <View className="mb-6">
              <View className="flex-row justify-between items-center px-1 mb-4">
                <Text className="font-title-md text-title-md text-primary font-semibold">
                  Student Performance
                </Text>
                <TouchableOpacity className="flex-row items-center gap-1">
                  <Text className="text-primary font-label-lg text-label-lg">Sort</Text>
                  <Ionicons name="swap-vertical-outline" size={16} color="#000000" />
                </TouchableOpacity>
              </View>

              {/* Rows List */}
              <View className="gap-3">
                {RESULTS_STUDENTS_MOCK.map((student) => {
                  const isPass = student.status === "Pass";
                  const isFail = student.status === "Fail";
                  const isAbsent = student.status === "Absent";

                  return (
                    <View 
                      key={student.id}
                      className="flex-row items-center justify-between p-3 bg-white border border-outline-variant rounded-2xl shadow-sm"
                    >
                      {/* Left Block: Avatar and Info */}
                      <View className="flex-row items-center gap-3">
                        <View className="w-10 h-10 rounded-full border border-outline-variant overflow-hidden bg-surface items-center justify-center">
                          {student.avatarUrl ? (
                            <Image 
                              source={{ uri: student.avatarUrl }}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Ionicons name="person-outline" size={20} color="#747878" />
                          )}
                        </View>
                        <View className="flex-col">
                          <Text className="font-label-lg text-label-lg text-primary font-bold">
                            {student.name}
                          </Text>
                          <Text className="font-label-sm text-[11px] text-on-surface-variant mt-0.5">
                            {student.studentId}
                          </Text>
                        </View>
                      </View>

                      {/* Right Block: Score & Status badges */}
                      <View className="flex-row items-center gap-3">
                        {/* Score bubble badge */}
                        <View 
                          style={{ backgroundColor: student.bgColor, borderColor: student.borderColor }}
                          className="px-3 py-1 border rounded-full items-center justify-center"
                        >
                          <Text className="text-primary font-bold text-label-lg">
                            {student.score}
                          </Text>
                        </View>

                        {/* Status label tag */}
                        {isPass && (
                          <View className="bg-[#1C1B1B] px-2 py-0.5 rounded-lg">
                            <Text className="text-white font-label-sm text-[10px] uppercase font-bold">Pass</Text>
                          </View>
                        )}
                        {isFail && (
                          <View className="bg-error px-2 py-0.5 rounded-lg">
                            <Text className="text-white font-label-sm text-[10px] uppercase font-bold">Fail</Text>
                          </View>
                        )}
                        {isAbsent && (
                          <View className="bg-surface-container-high px-2 py-0.5 rounded-lg">
                            <Text className="text-on-surface-variant font-label-sm text-[10px] uppercase font-bold">Absent</Text>
                          </View>
                        )}
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>

            {/* Footer Actions */}
            <View className="mt-4 gap-2">
              <TouchableOpacity 
                className="w-full py-4 bg-[#1C1B1B] rounded-xl items-center justify-center active:scale-95 shadow-sm"
                activeOpacity={0.8}
              >
                <Text className="font-label-lg text-label-lg text-white">
                  Download Report PDF
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={onClose}
                className="w-full py-4 rounded-xl items-center justify-center active:bg-slate-200"
                activeOpacity={0.8}
              >
                <Text className="font-label-lg text-label-lg text-primary">
                  Close Results
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
