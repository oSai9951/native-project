export interface AcademicOverviewItem {
  id: string;
  title: string;
  grade: string;
  subject: string;
  description: string;
  progress: number; // between 0 and 1
  duration?: string;
  icon?: string;
  color?: string;
  badgeBg?: string;
}

export const ACADEMIC_OVERVIEW_DATA: AcademicOverviewItem[] = [
  {
    id: "1",
    title: "Algebra Essentials",
    grade: "Grade 8",
    subject: "Maths",
    description: "Students are showing exceptional mastery of variables. Introduce complex equations next.",
    progress: 0.6,
    icon: "📐",
    color: "bg-indigo-600",
    badgeBg: "bg-indigo-100 text-indigo-700",
  },
  {
    id: "2",
    title: "Cellular Biology",
    grade: "Grade 9",
    subject: "Science",
    description: "Interactive lab session was a success. Review mitosis cycles in the next period.",
    progress: 0.45,
    duration: "40 min",
    icon: "🔬",
    color: "bg-teal-500",
    badgeBg: "bg-teal-100 text-teal-700",
  },
];
