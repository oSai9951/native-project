export interface ProfileStat {
  id: string;
  label: string;
  value: string;
  bgColor: string;
}

export const PROFILE_STATS: ProfileStat[] = [
  { id: "classes", label: "Classes", value: "12", bgColor: "#E4F2E7" },
  { id: "students", label: "Students", value: "248", bgColor: "#E3F2FD" },
  { id: "rating", label: "Rating", value: "4.8", bgColor: "#FFF9E5" },
];

export interface ProfileInfoRow {
  label: string;
  value: string;
}

export const PROFILE_DATA = {
  name: "Mx. Robertson",
  role: "Lead Educator",
  personalInfo: [
    { label: "Email", value: "m.robertson@oakwood.edu" },
    { label: "Phone", value: "+1 (555) 234-8901" },
    { label: "Birthday", value: "September 12, 1988" },
  ] as ProfileInfoRow[],
  schoolDetails: [
    { label: "School Name", value: "Oakwood High" },
    { label: "Department", value: "Mathematics" },
    { label: "Years of Service", value: "8 years" },
  ] as ProfileInfoRow[],
};

export interface AccountSettingToggle {
  id: "notifications" | "darkMode" | "biometric";
  label: string;
  description: string;
  defaultValue: boolean;
}

export const ACCOUNT_SETTINGS_TOGGLES: AccountSettingToggle[] = [
  { id: "notifications", label: "Notifications", description: "Stay updated with class alerts", defaultValue: true },
  { id: "darkMode", label: "Dark Mode", description: "Easier on the eyes in the evening", defaultValue: false },
  { id: "biometric", label: "Bio-metric Login", description: "Fast access using FaceID/Fingerprint", defaultValue: true },
];
