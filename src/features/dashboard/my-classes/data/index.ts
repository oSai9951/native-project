export interface ClassItem {
  id: string;
  title: string;
  section: string;
  studentsCount: number;
  schedule: string;
  room: string;
  time: string;
  hasGreenTimeIndicator?: boolean;
  classAverage: number;
  pendingCount?: number;
  allGraded?: boolean;
  badgeText: string;
  badgeBg: string;
  badgeTextColor: string;
  badgeBorderColor: string;
  bgColor: string;      // Hex color for background
  borderColor: string;  // Hex color for border
  accentColor: string;  // Hex color for progress fill
  accentLineColor: string; // Hex color for top thin stripe
}

export interface MaterialItem {
  id: string;
  title: string;
  type: string;
  size: string;
  timeAgo: string;
  tag: string;
  downloadCount: number;
  totalStudents: number;
  downloadPercent: number;
  bgColor: string;
  borderColor: string;
  barColor: string;
  icon: string;
}

export const MY_CLASSES_DATA = {
  teacher: {
    name: "Mx. Robertson",
    initials: "MR",
    role: "Mathematics · Senior Teacher",
  },
  totalStudents: 72,
  pendingTasks: 8,
  classes: [
    {
      id: "1",
      title: "Mathematics",
      section: "Section 8A",
      studentsCount: 24,
      schedule: "Daily",
      room: "Room B-204",
      time: "Today 2:00 PM",
      hasGreenTimeIndicator: true,
      classAverage: 72,
      pendingCount: 3,
      badgeText: "3 pending",
      badgeBg: "#FEF9C3",
      badgeTextColor: "#F59E0B",
      badgeBorderColor: "rgba(245, 158, 11, 0.2)",
      bgColor: "#F3E8FF",
      borderColor: "rgba(126, 34, 206, 0.1)",
      accentColor: "#7E22CE",
      accentLineColor: "rgba(126, 34, 206, 0.3)",
    },
    {
      id: "2",
      title: "Physics",
      section: "Section 10B",
      studentsCount: 18,
      schedule: "Tue / Thu",
      room: "Lab 4",
      time: "Tomorrow 9:00 AM",
      classAverage: 88,
      allGraded: true,
      badgeText: "All graded",
      badgeBg: "#DCFCE7",
      badgeTextColor: "#15803D",
      badgeBorderColor: "rgba(21, 128, 61, 0.2)",
      bgColor: "#E0F2FE",
      borderColor: "rgba(3, 105, 161, 0.1)",
      accentColor: "#0369A1",
      accentLineColor: "rgba(3, 105, 161, 0.3)",
    },
    {
      id: "3",
      title: "Calculus",
      section: "Section 12C",
      studentsCount: 30,
      schedule: "Mon / Wed / Fri",
      room: "Room C-101",
      time: "Friday 11:00 AM",
      classAverage: 65,
      pendingCount: 5,
      badgeText: "5 pending",
      badgeBg: "#FEF9C3",
      badgeTextColor: "#F59E0B",
      badgeBorderColor: "rgba(245, 158, 11, 0.2)",
      bgColor: "#DCFCE7",
      borderColor: "rgba(21, 128, 61, 0.1)",
      accentColor: "#15803D",
      accentLineColor: "rgba(21, 128, 61, 0.3)",
    },
  ] as ClassItem[],
};

export const CLASS_MATERIALS_DATA: MaterialItem[] = [
  {
    id: "1",
    title: "Quadratic equations — practice set",
    type: "PDF",
    size: "2.4MB",
    timeAgo: "Shared 3 days ago",
    tag: "Homework",
    downloadCount: 18,
    totalStudents: 24,
    downloadPercent: 75,
    bgColor: "#FFE4E6",
    borderColor: "rgba(251, 113, 133, 0.1)",
    barColor: "#FDA4AF",
    icon: "📄",
  },
  {
    id: "2",
    title: "Algebra Unit 3 — summary notes",
    type: "DOCX",
    size: "852 KB",
    timeAgo: "Shared 2 days ago",
    tag: "Revision",
    downloadCount: 22,
    totalStudents: 24,
    downloadPercent: 92,
    bgColor: "#E0F2FE",
    borderColor: "rgba(125, 211, 252, 0.1)",
    barColor: "#7DD3FC",
    icon: "📝",
  },
  {
    id: "3",
    title: "Mid-term revision — all topics",
    type: "PDF",
    size: "4.8 MB",
    timeAgo: "Shared yesterday",
    tag: "Important",
    downloadCount: 12,
    totalStudents: 24,
    downloadPercent: 50,
    bgColor: "#FEF9C3",
    borderColor: "rgba(253, 224, 71, 0.1)",
    barColor: "#FDE047",
    icon: "📦",
  },
];

export interface StudentRosterItem {
  id: string;
  name: string;
  initials: string;
  rollNumber: string;
  lastMessage: string;
  timeAgo: string;
  isOnline: boolean;
  unreadCount?: number;
  avatarBgColor: string;
  avatarTextColor: string;
}

export const STUDENT_ROSTER_DATA: StudentRosterItem[] = [
  {
    id: "1",
    name: "John Smith",
    initials: "JS",
    rollNumber: "Roll 101",
    lastMessage: "Need help with the algebra homework...",
    timeAgo: "2m ago",
    isOnline: true,
    unreadCount: 2,
    avatarBgColor: "bg-secondary-container",
    avatarTextColor: "text-on-secondary-container",
  },
  {
    id: "2",
    name: "Alice Dubois",
    initials: "AD",
    rollNumber: "Roll 102",
    lastMessage: "Shared the project file",
    timeAgo: "15m ago",
    isOnline: true,
    unreadCount: 1,
    avatarBgColor: "bg-tertiary-fixed",
    avatarTextColor: "text-on-tertiary-fixed-variant",
  },
  {
    id: "3",
    name: "Brandon King",
    initials: "BK",
    rollNumber: "Roll 103",
    lastMessage: "Thank you teacher!",
    timeAgo: "1h ago",
    isOnline: false,
    avatarBgColor: "bg-primary-fixed",
    avatarTextColor: "text-primary",
  },
  {
    id: "4",
    name: "Chloe Lee",
    initials: "CL",
    rollNumber: "Roll 104",
    lastMessage: "Can I submit later today?",
    timeAgo: "3h ago",
    isOnline: true,
    unreadCount: 5,
    avatarBgColor: "bg-secondary-fixed",
    avatarTextColor: "text-on-secondary-fixed-variant",
  },
  {
    id: "5",
    name: "Ethan Moore",
    initials: "EM",
    rollNumber: "Roll 105",
    lastMessage: "Yesterday's quiz was tough",
    timeAgo: "5h ago",
    isOnline: false,
    avatarBgColor: "bg-surface-container-highest",
    avatarTextColor: "text-on-surface",
  },
  {
    id: "6",
    name: "Fiona Wong",
    initials: "FW",
    rollNumber: "Roll 106",
    lastMessage: "See you in class!",
    timeAgo: "1d ago",
    isOnline: false,
    avatarBgColor: "bg-tertiary-fixed-dim",
    avatarTextColor: "text-on-tertiary-fixed-variant",
  },
];

export interface AssessmentItem {
  id: string;
  status: "LIVE" | "GRADED" | "UPCOMING";
  type: string;
  title: string;
  date?: string;
  duration?: string;
  questions?: string;
  marks?: string;
  submissionCount?: string;
  submissionPercent?: number;
  classAverage?: number;
  scheduledTime?: string;
  accentBg: string;
  sideBorderColor: string;
}

export const CLASS_ASSESSMENTS_DATA: AssessmentItem[] = [
  {
    id: "1",
    status: "LIVE",
    type: "Written",
    title: "Mid-Term Literature Analysis",
    date: "Oct 24, 2023",
    duration: "90 Mins",
    questions: "15 Questions",
    marks: "100 Marks",
    submissionCount: "28/32",
    submissionPercent: 87,
    accentBg: "#1C1B1B",
    sideBorderColor: "#1C1B1B",
  },
  {
    id: "2",
    status: "GRADED",
    type: "Quiz",
    title: "Ancient Civilizations: Unit 2",
    classAverage: 74,
    accentBg: "#ABEBC6",
    sideBorderColor: "#ABEBC6",
  },
  {
    id: "3",
    status: "UPCOMING",
    type: "Written",
    title: "Quarterly Science Fair Prep",
    scheduledTime: "Scheduled for Oct 30, 09:00 AM",
    accentBg: "#F9E79F",
    sideBorderColor: "#F9E79F",
  },
];

export interface StudentRatingItem {
  id: string;
  name: string;
  rollNumber: string;
  initials: string;
  rating: number;
  trend: "up" | "flat" | "down";
  avatarBg: string;
  avatarText: string;
  ratings: {
    participation: number;
    understanding: number;
    behaviour: number;
    homework: number;
  };
}

export const STUDENT_RATINGS_DATA: StudentRatingItem[] = [
  {
    id: "1",
    name: "Aanya Sharma",
    rollNumber: "Roll 01",
    initials: "AS",
    rating: 4.5,
    trend: "up",
    avatarBg: "#E0E7FF",
    avatarText: "#4338CA",
    ratings: {
      participation: 4,
      understanding: 5,
      behaviour: 4,
      homework: 5,
    },
  },
  {
    id: "2",
    name: "Rohan Bose",
    rollNumber: "Roll 14",
    initials: "RB",
    rating: 4.0,
    trend: "flat",
    avatarBg: "#FFEDD5",
    avatarText: "#9A3412",
    ratings: {
      participation: 4,
      understanding: 3,
      behaviour: 5,
      homework: 4,
    },
  },
  {
    id: "3",
    name: "Kaira Zhang",
    rollNumber: "Roll 21",
    initials: "KZ",
    rating: 2.8,
    trend: "down",
    avatarBg: "#FCE7F3",
    avatarText: "#9D174D",
    ratings: {
      participation: 2,
      understanding: 3,
      behaviour: 3,
      homework: 4,
    },
  },
];

export interface RoomMessageItem {
  id: string;
  sender: "student" | "teacher";
  name: string;
  initials: string;
  avatarBgColor: string;
  avatarTextColor: string;
  message: string;
  time: string;
  attachment?: {
    name: string;
    meta: string;
  };
}

export const ROOM_MESSAGES_DATA: RoomMessageItem[] = [
  {
    id: "1",
    sender: "student",
    name: "Aanya Sharma",
    initials: "AS",
    avatarBgColor: "bg-secondary-fixed",
    avatarTextColor: "text-on-secondary-fixed",
    message:
      "Hello Teacher! I have finished the extra credit assignments. Should I upload them here or in the resources folder?",
    time: "10:12 AM",
  },
  {
    id: "2",
    sender: "teacher",
    name: "Mx. Robertson",
    initials: "MR",
    avatarBgColor: "",
    avatarTextColor: "",
    message:
      "Great work Aanya! Please upload them to the shared folder so everyone can see your methodology. I've also attached the notes from this morning's session for those who missed the live stream.",
    time: "10:15 AM",
    attachment: {
      name: "Calculus_Notes.pdf",
      meta: "PDF · 2.4 MB",
    },
  },
  {
    id: "3",
    sender: "student",
    name: "Rahul Jain",
    initials: "RJ",
    avatarBgColor: "bg-tertiary-fixed",
    avatarTextColor: "text-on-tertiary-fixed",
    message:
      "Thank you! The notes are very helpful. Will the quiz on Friday cover the new differentiation topics?",
    time: "10:18 AM",
  },
];

export interface AttendanceStudent {
  id: string;
  name: string;
  rollNumber: string;
  initials: string;
  status: "Present" | "Absent" | "Late" | "Excused" | null;
  note: string;
  avatarBg: string;
  avatarText: string;
}

export const ATTENDANCE_STUDENTS_DATA: AttendanceStudent[] = [
  {
    id: "1",
    name: "Amara Smith",
    rollNumber: "Roll 01",
    initials: "AS",
    status: "Present",
    note: "",
    avatarBg: "#ecdfba",
    avatarText: "#6b6245",
  },
  {
    id: "2",
    name: "Ben Johnson",
    rollNumber: "Roll 02",
    initials: "BJ",
    status: "Absent",
    note: "",
    avatarBg: "#E3F1FC",
    avatarText: "#1C4E7A",
  },
  {
    id: "3",
    name: "Chloe Lee",
    rollNumber: "Roll 03",
    initials: "CL",
    status: "Excused",
    note: "Dr. Appt",
    avatarBg: "#FCE3E3",
    avatarText: "#7A1C1C",
  },
  {
    id: "4",
    name: "David Wilson",
    rollNumber: "Roll 04",
    initials: "DW",
    status: "Late",
    note: "",
    avatarBg: "#D0F2E3",
    avatarText: "#0F4D32",
  },
];




