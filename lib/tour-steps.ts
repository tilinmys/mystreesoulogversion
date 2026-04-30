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
    title: "Your Bloop Chat Button",
    body: "Tap Bloop anytime you want to talk through mood swings, period pain, cycle questions, or doctor-prep notes.",
    buttonText: "Show Me Features",
  },
  {
    id: "step-2",
    targetKey: "cycleSummary",
    title: "Your Body's Rhythm",
    body: "See your cycle phase, gentle period predictions, and daily body patterns - all in one glance.",
    buttonText: "Log a Check-In",
  },
  {
    id: "step-3",
    targetKey: "dailyCheckIn",
    title: "Quick Daily Check-In",
    body: "Log your mood, pain, and energy with a single tap. Patterns build up quietly over time.",
    buttonText: "Explore Navigation",
  },
  {
    id: "step-4",
    targetKey: "tabBar",
    title: "Your Navigation Bar",
    body: "Home is your daily overview. Cycle tracks phases. Vault keeps records organized. Profile holds goals and settings.",
    buttonText: "Open Vault Preview",
  },
  {
    id: "step-5",
    targetKey: "vaultPreview",
    title: "Your Memory Vault",
    body: "A private space for records, doctor notes, and summaries - always organized and protected.",
    buttonText: "Start Using Dashboard",
  },
];
