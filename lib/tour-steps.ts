export type TourStepData = {
  id: string;
  targetKey: string;
  title: string;
  body: string;
  buttonText: string;
};

export const tourSteps: TourStepData[] = [
  {
    id: "step-1",
    targetKey: "bloopButton",
    title: "Bloop stays close",
    body: "Tap Bloop anytime you want to talk through mood shifts, cramps, cycle questions, or doctor-prep notes.",
    buttonText: "Show profile",
  },
  {
    id: "step-2",
    targetKey: "profileAvatar",
    title: "Profile and settings",
    body: "Your profile, privacy controls, reminders, Bloop settings, and delete/reset data actions live behind this avatar now.",
    buttonText: "Show dashboard",
  },
  {
    id: "step-3",
    targetKey: "cycleSummary",
    title: "Today at a glance",
    body: "Start with your cycle prediction and current rhythm before deciding what to log or review.",
    buttonText: "Show insights",
  },
  {
    id: "step-4",
    targetKey: "dailyInsights",
    title: "Curated daily insights",
    body: "Swipe these cards for cycle guidance, symptom patterns, smart checks, and doctor-prep shortcuts.",
    buttonText: "Show check-in",
  },
  {
    id: "step-5",
    targetKey: "dailyCheckIn",
    title: "Quick daily check-in",
    body: "Log mood, pain, and energy in seconds. These small entries make your pattern history more useful.",
    buttonText: "Show navbar",
  },
  {
    id: "step-6",
    targetKey: "tabBar",
    title: "Focused navigation",
    body: "The bottom bar is now focused on Home, Cycle, and Vault. Profile and settings stay in the top avatar.",
    buttonText: "Show vault",
  },
  {
    id: "step-7",
    targetKey: "vaultPreview",
    title: "Memory Vault",
    body: "Keep health records, notes, and doctor-ready summaries organized in one private place.",
    buttonText: "Start using app",
  },
];
