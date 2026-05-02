import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type RecordType = "Lab Result" | "Doctor Note" | "Prescription" | "AI Summary";

export type HealthRecord = {
  id: string;
  title: string;
  type: RecordType;
  source: string;
  date: string;
  notes: string;
};

export type DailyLog = {
  id: string;
  date: string;
  mood: string;
  pain: number;
  fatigue: number;
  sleep: string;
  bp: string;
  weight: string;
  notes: string;
};

type DemoState = {
  hasHydrated: boolean;
  userName: string;
  selectedGoals: string[];
  lastPeriodDate: string;
  cycleLength: number;
  periodLength: number;
  dailyMood: string;
  dailyPain: number;
  dailyFatigue: number;
  dailyNotes: string;
  vaultUnlocked: boolean;
  records: HealthRecord[];
  logs: DailyLog[];
  consentAccepted: boolean;
  cycleTrackingSkipped: boolean;
  wellnessMode: boolean;
  hasCompletedOnboarding: boolean;
  onboardingCompleted: boolean;
  hasSeenBloopIntro: boolean;
  hasSeenFounderQuotes: boolean;
  // Profile
  avatarUri: string;
  dateOfBirth: string;
  phone: string;
  healthGoalSummary: string;
  setHasHydrated: (value: boolean) => void;
  beginAuthFlow: () => void;
  resumeExistingSession: () => void;
  acceptConsent: () => void;
  setHasSeenBloopIntro: (value: boolean) => void;
  markFounderQuotesSeen: () => void;
  setHasCompletedOnboarding: (value: boolean) => void;
  setUserName: (name: string) => void;
  toggleGoal: (goal: string) => void;
  setCycleSetup: (values: {
    userName: string;
    lastPeriodDate: string;
    cycleLength: number;
    periodLength: number;
  }) => void;
  skipCycleSetup: (userName?: string) => void;
  setDailyMood: (mood: string) => void;
  setBloopVisible: (visible: boolean) => void;
  sanitizeCycleValues: () => void;
  updateProfile: (fields: { userName?: string; avatarUri?: string; dateOfBirth?: string; phone?: string; healthGoalSummary?: string }) => void;
  unlockVault: () => void;
  addRecord: (record: Omit<HealthRecord, "id" | "date">) => void;
  addLog: (log: Omit<DailyLog, "id" | "date">) => void;
  resetDemo: () => void;
  hasSeenAppTour: boolean;
  tourStep: number;
  startAppTour: () => void;
  nextTourStep: () => void;
  skipAppTour: () => void;
  finishAppTour: () => void;
  isBloopVisible: boolean;
};

const initialRecords: HealthRecord[] = [
  {
    id: "record-1",
    title: "PCOS Management Plan",
    type: "Doctor Note",
    source: "Dr. Anika Sharma",
    date: "Apr 20",
    notes: "Lifestyle plan and symptom tracking guidance for the next visit.",
  },
  {
    id: "record-2",
    title: "Blood Panel Results",
    type: "Lab Result",
    source: "City Wellness Lab",
    date: "Apr 14",
    notes: "CBC, thyroid, glucose, and hormone markers for review.",
  },
  {
    id: "record-3",
    title: "AI Triage Summary",
    type: "AI Summary",
    source: "Bloop Demo",
    date: "Apr 22",
    notes: "Fatigue and mild cramps summarized for doctor discussion.",
  },
  {
    id: "record-4",
    title: "Doctor Visit Notes",
    type: "Doctor Note",
    source: "Women's Health Clinic",
    date: "Mar 29",
    notes: "Questions to revisit during the next appointment.",
  },
];

const MIN_CYCLE_LENGTH = 21;
const MAX_CYCLE_LENGTH = 45;
const DEFAULT_CYCLE_LENGTH = 28;
const MIN_PERIOD_LENGTH = 3;
const MAX_PERIOD_LENGTH = 10;
const DEFAULT_PERIOD_LENGTH = 5;

function sanitizeCycleLength(value: number) {
  const safeValue = Number.isFinite(value) ? Math.round(value) : DEFAULT_CYCLE_LENGTH;
  return Math.min(MAX_CYCLE_LENGTH, Math.max(MIN_CYCLE_LENGTH, safeValue));
}

function sanitizePeriodLength(value: number) {
  const safeValue = Number.isFinite(value) ? Math.round(value) : DEFAULT_PERIOD_LENGTH;
  return Math.min(MAX_PERIOD_LENGTH, Math.max(MIN_PERIOD_LENGTH, safeValue));
}

const initialState = {
  hasHydrated: false,
  userName: "Aarya",
  selectedGoals: ["Track my period", "Organize health records"],
  lastPeriodDate: "April 18, 2026",
  cycleLength: 28,
  periodLength: 5,
  dailyMood: "Calm",
  dailyPain: 2,
  dailyFatigue: 4,
  dailyNotes: "",
  vaultUnlocked: false,
  records: initialRecords,
  logs: [],
  consentAccepted: false,
  cycleTrackingSkipped: false,
  wellnessMode: false,
  hasCompletedOnboarding: false,
  onboardingCompleted: false,
  hasSeenBloopIntro: false,
  hasSeenFounderQuotes: false,
  hasSeenAppTour: false,
  tourStep: 0,
  isBloopVisible: true,
  // Profile
  avatarUri: "",
  dateOfBirth: "",
  phone: "",
  healthGoalSummary: "",
};

export const useAppStore = create<DemoState>()(
  persist(
    (set) => ({
      ...initialState,
      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
      beginAuthFlow: () =>
        set({
          consentAccepted: false,
          hasCompletedOnboarding: false,
          onboardingCompleted: false,
          hasSeenBloopIntro: false,
          hasSeenFounderQuotes: false,
          hasSeenAppTour: false,
          tourStep: 0,
          isBloopVisible: true,
        }),
      resumeExistingSession: () =>
        set({
          consentAccepted: true,
          hasCompletedOnboarding: true,
          onboardingCompleted: true,
          hasSeenBloopIntro: true,
          hasSeenAppTour: true,
          tourStep: 0,
          isBloopVisible: true,
        }),
      acceptConsent: () => set({ consentAccepted: true }),
      setHasSeenBloopIntro: (hasSeenBloopIntro) =>
        set((state) => ({
          hasSeenBloopIntro,
          tourStep: hasSeenBloopIntro && state.tourStep < 0 ? 0 : state.tourStep,
        })),
      markFounderQuotesSeen: () => set({ hasSeenFounderQuotes: true }),
      setHasCompletedOnboarding: (value) => set({ hasCompletedOnboarding: value }),
      setUserName: (userName) => set({ userName }),
      toggleGoal: (goal) =>
        set((state) => ({
          selectedGoals: state.selectedGoals.includes(goal)
            ? state.selectedGoals.filter((item) => item !== goal)
            : [...state.selectedGoals, goal],
        })),
      setCycleSetup: ({ userName, lastPeriodDate, cycleLength, periodLength }) =>
        set({
          userName: userName.trim() || "beautiful",
          lastPeriodDate,
          cycleLength: sanitizeCycleLength(cycleLength),
          periodLength: sanitizePeriodLength(periodLength),
          cycleTrackingSkipped: false,
          wellnessMode: false,
          hasCompletedOnboarding: true,
          onboardingCompleted: true,
        }),
      skipCycleSetup: (userName) =>
        set({
          userName: userName?.trim() || "beautiful",
          lastPeriodDate: "I don't remember",
          cycleTrackingSkipped: true,
          wellnessMode: true,
          hasCompletedOnboarding: true,
          onboardingCompleted: true,
        }),
      setDailyMood: (dailyMood) => set({ dailyMood }),
      setBloopVisible: (isBloopVisible) => set({ isBloopVisible }),
      sanitizeCycleValues: () =>
        set((state) => ({
          cycleLength: sanitizeCycleLength(state.cycleLength),
          periodLength: sanitizePeriodLength(state.periodLength),
        })),
      updateProfile: (fields) => set((state) => ({
        userName: fields.userName?.trim() || state.userName,
        avatarUri: fields.avatarUri !== undefined ? fields.avatarUri : state.avatarUri,
        dateOfBirth: fields.dateOfBirth !== undefined ? fields.dateOfBirth : state.dateOfBirth,
        phone: fields.phone !== undefined ? fields.phone : state.phone,
        healthGoalSummary: fields.healthGoalSummary !== undefined ? fields.healthGoalSummary : state.healthGoalSummary,
      })),
      unlockVault: () => set({ vaultUnlocked: true }),
      addRecord: (record) =>
        set((state) => ({
          records: [
            {
              ...record,
              id: `record-${Date.now()}`,
              date: "Today",
            },
            ...state.records,
          ],
          vaultUnlocked: true,
        })),
      addLog: (log) =>
        set((state) => ({
          dailyMood: log.mood,
          dailyPain: log.pain,
          dailyFatigue: log.fatigue,
          dailyNotes: log.notes,
          logs: [
            {
              ...log,
              id: `log-${Date.now()}`,
              date: "Today",
            },
            ...state.logs,
          ],
        })),
      resetDemo: () => set({ ...initialState, hasHydrated: true, records: initialRecords }),
      startAppTour: () => set({ tourStep: 0 }),
      nextTourStep: () => set((state) => ({ tourStep: state.tourStep + 1 })),
      skipAppTour: () => set({ hasSeenAppTour: true }),
      finishAppTour: () => set({ hasSeenAppTour: true }),
    }),
    {
      name: "mystree-soul-demo-state",
      storage: createJSONStorage(() => AsyncStorage),
      version: 1,
      onRehydrateStorage: () => (state) => {
        state?.sanitizeCycleValues();
        state?.setHasHydrated(true);
      },
      partialize: (state) => ({
        userName: state.userName,
        selectedGoals: state.selectedGoals,
        lastPeriodDate: state.lastPeriodDate,
        cycleLength: state.cycleLength,
        periodLength: state.periodLength,
        dailyMood: state.dailyMood,
        dailyPain: state.dailyPain,
        dailyFatigue: state.dailyFatigue,
        dailyNotes: state.dailyNotes,
        vaultUnlocked: state.vaultUnlocked,
        records: state.records,
        logs: state.logs,
        consentAccepted: state.consentAccepted,
        cycleTrackingSkipped: state.cycleTrackingSkipped,
        wellnessMode: state.wellnessMode,
        hasCompletedOnboarding: state.hasCompletedOnboarding,
        onboardingCompleted: state.onboardingCompleted,
        hasSeenBloopIntro: state.hasSeenBloopIntro,
        hasSeenFounderQuotes: state.hasSeenFounderQuotes,
        hasSeenAppTour: state.hasSeenAppTour,
        tourStep: state.tourStep,
        isBloopVisible: state.isBloopVisible,
      }),
    },
  ),
);
