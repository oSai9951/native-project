export interface AiSubject {
  id: string;
  label: string;
}

export const AI_SUBJECTS: AiSubject[] = [
  { id: "mathematics", label: "Mathematics" },
  { id: "physics", label: "Physics" },
  { id: "literature", label: "Literature" },
  { id: "biology", label: "Biology" },
];

export interface AiMessageItem {
  id: string;
  sender: "user" | "aria";
  time: string;
  text?: string;
  headline?: string;
  intro?: string;
  checklist?: string[];
  codeSnippet?: string;
  note?: string;
  attachment?: {
    name: string;
    meta: string;
  };
}

export interface AiToolOption {
  id: "files" | "thinking" | "deepResearch" | "webResearch";
  title: string;
  subtitle: string;
  icon: string;
  dotColor?: string;
}

export const AI_TOOL_OPTIONS: AiToolOption[] = [
  { id: "files", title: "Add photos & files", subtitle: "Upload documents or images", icon: "📎" },
  { id: "thinking", title: "Thinking", subtitle: "Solve complex problems step-by-step", icon: "💡", dotColor: "#FFBF00" },
  { id: "deepResearch", title: "Deep Research", subtitle: "In-depth academic verification", icon: "✨", dotColor: "#0EA5E9" },
  { id: "webResearch", title: "Web Research", subtitle: "Browse the latest curriculum data", icon: "🌐", dotColor: "#10B981" },
];

export const AI_CHAT_THREAD: AiMessageItem[] = [
  {
    id: "1",
    sender: "user",
    time: "10:42 AM",
    text: "Can you explain the Fundamental Theorem of Calculus and provide some practice examples?",
  },
  {
    id: "2",
    sender: "aria",
    time: "10:43 AM",
    headline: "The Fundamental Theorem of Calculus",
    intro:
      "Essentially, it establishes a deep connection between differentiation and integration. Here's a breakdown:",
    checklist: [
      "Part 1: The derivative of an integral is the original function.",
      "Part 2: The definite integral can be computed using any antiderivative.",
    ],
    codeSnippet: "∫[a, b] f(x)dx = F(b) - F(a)",
    note: "I've prepared a specialized worksheet for you to practice these concepts:",
    attachment: {
      name: "Algebra_Helper.pdf",
      meta: "2.4 MB · PDF Document",
    },
  },
];
