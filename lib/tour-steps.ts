import {
  Bot,
  CalendarHeart,
  CircleUser,
  Compass,
  Heart,
  LayoutDashboard,
  Sparkles,
  Vault,
} from "lucide-react-native";
import type { LucideIcon } from "lucide-react-native";

export type TourStepData = {
  id: string;
  targetKey: string;
  /** Short kicker label above the title */
  kicker: string;
  title: string;
  body: string;
  buttonText: string;
  icon: LucideIcon;
  /** Per-step color theme — keeps each step visually distinct */
  theme: {
    accent: string;      // pill, active dot, button bg
    softBg: string;      // card tint / icon container
    iconTint: string;    // icon stroke color
  };
};

export const tourSteps: TourStepData[] = [
  {
    id: "step-bloop",
    targetKey: "bloopButton",
    kicker: "Your companion",
    title: "Meet Bloop — always nearby",
    body: "Tap Bloop anytime to talk through mood shifts, cramps, cycle questions, or to prepare doctor-ready notes.",
    buttonText: "Next →",
    icon: Bot,
    theme: {
      accent: "#F97316",
      softBg: "#FFF3EC",
      iconTint: "#EA580C",
    },
  },
  {
    id: "step-profile",
    targetKey: "profileAvatar",
    kicker: "Your space",
    title: "Profile & privacy controls",
    body: "Privacy settings, reminders, Bloop preferences, and all account actions live behind your avatar.",
    buttonText: "Next →",
    icon: CircleUser,
    theme: {
      accent: "#D946A8",
      softBg: "#FCE7F3",
      iconTint: "#BE185D",
    },
  },
  {
    id: "step-dashboard",
    targetKey: "cycleSummary",
    kicker: "Today's rhythm",
    title: "Your day at a glance",
    body: "See cycle predictions and your current phase before deciding what to log or review.",
    buttonText: "Next →",
    icon: LayoutDashboard,
    theme: {
      accent: "#5BBFB5",
      softBg: "#E8F7F5",
      iconTint: "#0F766E",
    },
  },
  {
    id: "step-insights",
    targetKey: "dailyInsights",
    kicker: "Curated for you",
    title: "Swipe daily insights",
    body: "Personalized cards covering cycle guidance, symptom patterns, smart health checks, and doctor-prep shortcuts.",
    buttonText: "Next →",
    icon: Sparkles,
    theme: {
      accent: "#F59E0B",
      softBg: "#FEF3C7",
      iconTint: "#B45309",
    },
  },
  {
    id: "step-checkin",
    targetKey: "dailyCheckIn",
    kicker: "Quick & gentle",
    title: "30-second daily check-in",
    body: "Log mood, pain, and energy in a tap. Small entries today build your long-term pattern history.",
    buttonText: "Next →",
    icon: Heart,
    theme: {
      accent: "#FF8A7A",
      softBg: "#FFE8E3",
      iconTint: "#DC2626",
    },
  },
  {
    id: "step-navbar",
    targetKey: "tabBar",
    kicker: "Navigate with ease",
    title: "Home · Cycle · Vault",
    body: "Three focused tabs keep everything within reach. Your profile and settings stay in the top avatar.",
    buttonText: "Next →",
    icon: Compass,
    theme: {
      accent: "#8B5CF6",
      softBg: "#EDE9FE",
      iconTint: "#6D28D9",
    },
  },
  {
    id: "step-vault",
    targetKey: "vaultPreview",
    kicker: "Private & secure",
    title: "Your Memory Vault",
    body: "Health records, personal notes, and doctor-ready summaries — organized and encrypted on your device.",
    buttonText: "Start exploring ✨",
    icon: Vault,
    theme: {
      accent: "#F97316",
      softBg: "#FFF3EC",
      iconTint: "#EA580C",
    },
  },
];
