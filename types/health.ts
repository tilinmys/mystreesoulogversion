// Health-related types for the MyStree Soul frontend demo.
// No backend connection. All values are local Zustand/demo state.

export type MoodLabel =
  | "Calm"
  | "Happy"
  | "Anxious"
  | "Tired"
  | "Sad"
  | "Energized"
  | "Irritable";

export type HealthLog = {
  id: string;
  date: string;
  mood: MoodLabel | string;
  /** 0-10 pain scale. Never displayed as "severe" unless user self-rates ≥ 8. */
  pain: number;
  /** 0-10 fatigue scale. */
  fatigue: number;
  sleep: string;
  bp: string;
  weight: string;
  notes: string;
};

export type CyclePhase =
  | "Menstrual"
  | "Follicular"
  | "Ovulation Window"
  | "Luteal";

export type CycleProfile = {
  lastPeriodDate: string;
  cycleLength: number;
  periodLength: number;
  phase: CyclePhase;
  /** True if the user chose "I don't track cycles". */
  trackingSkipped: boolean;
  /** True if the user is in general wellness mode. */
  wellnessMode: boolean;
};
