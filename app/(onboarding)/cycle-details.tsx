import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  Shield,
} from "lucide-react-native";
import { useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { G, Path } from "react-native-svg";

import { preloadFounderQuoteImages } from "@/lib/image-preloader";
import { useAppStore } from "@/store/app-store";

const palette = {
  warmIvory: "#FFF8F5",
  white: "#FFFFFF",
  primaryText: "#2C2A29",
  secondaryText: "#8D8582",
  mutedText: "#A69B98",
  coral: "#FF7356",
  coralDeep: "#FF5A3D",
  coralSoft: "#FFF0EC",
  line: "#E9DEDC",
  shadowTint: "#D98268",
};

const softShadow = {
  shadowColor: palette.shadowTint,
  shadowOffset: { width: 0, height: 16 },
  shadowOpacity: 0.06,
  shadowRadius: 32,
  elevation: 6,
};

const cycleOptions = Array.from({ length: 25 }, (_, index) => index + 21);
const periodOptions = [3, 4, 5, 6, 7, 8, 9, 10];

function safeOption(value: number, options: number[], fallback: number) {
  const roundedValue = Number.isFinite(value) ? Math.round(value) : fallback;
  return options.includes(roundedValue) ? roundedValue : fallback;
}

function LeafDecoration() {
  return (
    <View pointerEvents="none" style={styles.leafDecoration}>
      <Svg width={112} height={160} viewBox="0 0 112 160">
        <G opacity={0.42}>
          <Path d="M0 148 C25 95 52 48 96 8" stroke="#F8B9AD" strokeWidth={3} fill="none" />
          <Path d="M17 96 C6 78 10 60 27 47 C40 68 38 86 17 96Z" fill="#F8CEC6" />
          <Path d="M35 69 C24 49 31 30 52 20 C61 43 55 61 35 69Z" fill="#F8CEC6" />
          <Path d="M56 42 C49 21 59 7 82 0 C87 25 78 38 56 42Z" fill="#F8CEC6" />
          <Path d="M11 125 C30 111 50 111 72 122 C51 139 29 139 11 125Z" fill="#F8CEC6" />
        </G>
      </Svg>
    </View>
  );
}

function Sparkle({ style }: { style: object }) {
  return (
    <View pointerEvents="none" style={style}>
      <Svg width={28} height={28} viewBox="0 0 24 24">
        <Path d="M12 1 L15 9 L23 12 L15 15 L12 23 L9 15 L1 12 L9 9Z" fill="#FFAA98" opacity={0.72} />
      </Svg>
    </View>
  );
}

function ProgressBar() {
  return (
    <View className="items-center" style={styles.progressWrap}>
      <View style={styles.progressTrack} />
      <View style={styles.progressFill} />
      <View className="flex-row items-center justify-between" style={styles.progressDots}>
        <View className="items-center justify-center" style={[styles.stepCircle, styles.stepCircleDone]}>
          <Check size={20} color={palette.white} strokeWidth={3} />
        </View>
        <View className="items-center justify-center" style={[styles.stepCircle, styles.stepCircleDone]}>
          <Check size={20} color={palette.white} strokeWidth={3} />
        </View>
        <View style={styles.stepCircle} />
      </View>
      <Text style={styles.stepText}>Step 2 of 3</Text>
    </View>
  );
}

function NumberPicker({
  values,
  selected,
  onSelect,
}: {
  values: number[];
  selected: number;
  onSelect: (value: number) => void;
}) {
  return (
    <View className="items-center" style={styles.pickerWrap}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.numberScrollContent}
      >
        {values.map((value) => {
          const active = value === selected;
          return (
            <Pressable
              key={value}
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
              accessibilityLabel={`${value} days`}
              onPress={() => onSelect(value)}
              className="items-center justify-center"
              style={[styles.numberPill, active ? styles.numberPillActive : null]}
            >
              <Text style={[styles.numberText, active ? styles.numberTextActive : null]}>{value}</Text>
            </Pressable>
          );
        })}
      </ScrollView>
      <View className="items-center justify-center" style={styles.daysBadge}>
        <Text style={styles.daysText}>days</Text>
      </View>
    </View>
  );
}

export default function CycleDetailsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const store = useAppStore();
  const setCycleSetup = useAppStore((state) => state.setCycleSetup);
  const [cycleLength, setCycleLength] = useState(safeOption(store.cycleLength, cycleOptions, 28));
  const [periodLength, setPeriodLength] = useState(safeOption(store.periodLength, periodOptions, 5));
  const [lastPeriodDate] = useState("May 12, 2024");

  useEffect(() => preloadFounderQuoteImages(), []);

  const userName = useMemo(() => (store.userName || "beautiful").trim(), [store.userName]);

  const goNext = () => {
    setCycleSetup({
      userName,
      lastPeriodDate,
      cycleLength,
      periodLength,
    });
    router.push("/(onboarding)/goals");
  };

  return (
    <SafeAreaView className="flex-1" style={styles.screen} edges={["top", "left", "right"]}>
      <LeafDecoration />
      <Sparkle style={styles.sparkleOne} />
      <Sparkle style={styles.sparkleTwo} />
      <Sparkle style={styles.sparkleThree} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 136 }]}
      >
        <View className="px-8">
          <ProgressBar />

          <View style={styles.header}>
            <Text style={styles.title}>Tell us about your cycle.</Text>
            <Text style={styles.subtitle}>This helps us personalize your insights and predictions.</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Average Cycle Length</Text>
            <Text style={styles.sectionHelp}>Select the average number of days in your cycle.</Text>
            <NumberPicker values={cycleOptions} selected={cycleLength} onSelect={setCycleLength} />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Period Duration</Text>
            <Text style={styles.sectionHelp}>Select the average number of days your period lasts.</Text>
            <NumberPicker values={periodOptions} selected={periodLength} onSelect={setPeriodLength} />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Last Period Start Date</Text>
            <Text style={styles.sectionHelp}>Select the first day of your last period.</Text>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Select last period start date"
              className="flex-row items-center bg-white"
              style={styles.dateCard}
            >
              <View className="items-center justify-center" style={styles.calendarBubble}>
                <CalendarDays size={28} color={palette.coral} strokeWidth={2} />
              </View>
              <Text numberOfLines={1} ellipsizeMode="tail" style={styles.dateText}>
                {lastPeriodDate}
              </Text>
              <ChevronDown size={32} color={palette.coral} strokeWidth={2.4} />
            </Pressable>
          </View>

          <View className="flex-row items-center" style={styles.privacyCard}>
            <Shield size={40} color={palette.coral} strokeWidth={1.9} />
            <View className="flex-1">
              <Text style={styles.privacyTitle}>Your data is private and secure.</Text>
              <Text style={styles.privacyText}>We only use this to personalize your experience.</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        <View className="px-8">
          <Pressable accessibilityRole="button" accessibilityLabel="Next" onPress={goNext}>
            <LinearGradient
              colors={[palette.coralDeep, palette.coral]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.cta}
            >
              <Text style={styles.ctaText}>Next</Text>
              <ArrowRight size={32} color={palette.white} strokeWidth={2.3} style={styles.ctaIcon} />
            </LinearGradient>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: palette.warmIvory,
  },
  leafDecoration: {
    position: "absolute",
    top: 112,
    left: -8,
  },
  sparkleOne: {
    position: "absolute",
    top: 232,
    right: 80,
  },
  sparkleTwo: {
    position: "absolute",
    top: 264,
    right: 112,
  },
  sparkleThree: {
    position: "absolute",
    top: 272,
    right: 40,
  },
  scrollContent: {
    flexGrow: 1,
  },
  progressWrap: {
    paddingTop: 56,
    height: 144,
  },
  progressTrack: {
    position: "absolute",
    top: 80,
    width: 240,
    height: 4,
    borderRadius: 2,
    backgroundColor: palette.line,
  },
  progressFill: {
    position: "absolute",
    top: 80,
    left: "50%",
    marginLeft: -120,
    width: 168,
    height: 4,
    borderRadius: 2,
    backgroundColor: palette.coral,
  },
  progressDots: {
    width: 288,
  },
  stepCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: palette.warmIvory,
    borderWidth: 4,
    borderColor: palette.line,
  },
  stepCircleDone: {
    backgroundColor: palette.coral,
    borderColor: palette.coral,
    ...softShadow,
  },
  stepText: {
    color: palette.coral,
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    lineHeight: 24,
    marginTop: 16,
  },
  header: {
    marginTop: 32,
  },
  title: {
    color: palette.primaryText,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 32,
    lineHeight: 40,
    letterSpacing: 0,
  },
  subtitle: {
    color: palette.secondaryText,
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0,
    marginTop: 16,
  },
  section: {
    marginTop: 48,
  },
  sectionTitle: {
    color: palette.primaryText,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 0,
  },
  sectionHelp: {
    color: palette.secondaryText,
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    lineHeight: 24,
    letterSpacing: 0,
    marginTop: 8,
  },
  pickerWrap: {
    marginTop: 32,
  },
  numberScrollContent: {
    gap: 12,
    paddingHorizontal: 2,
  },
  numberPill: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: palette.white,
    ...softShadow,
  },
  numberPillActive: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: palette.coralDeep,
  },
  numberText: {
    color: palette.primaryText,
    fontFamily: "Poppins_500Medium",
    fontSize: 15,
    lineHeight: 24,
  },
  numberTextActive: {
    color: palette.white,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 22,
    lineHeight: 32,
  },
  daysBadge: {
    minHeight: 32,
    borderRadius: 16,
    backgroundColor: palette.coralSoft,
    paddingHorizontal: 16,
    marginTop: 16,
  },
  daysText: {
    color: palette.coral,
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    lineHeight: 20,
  },
  dateCard: {
    minHeight: 96,
    borderRadius: 24,
    paddingHorizontal: 32,
    marginTop: 24,
    ...softShadow,
  },
  calendarBubble: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: palette.coralSoft,
    marginRight: 24,
  },
  dateText: {
    flex: 1,
    color: palette.primaryText,
    fontFamily: "Poppins_500Medium",
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: 0,
  },
  privacyCard: {
    minHeight: 112,
    borderRadius: 24,
    backgroundColor: palette.coralSoft,
    paddingHorizontal: 32,
    gap: 24,
    marginTop: 40,
  },
  privacyTitle: {
    color: palette.primaryText,
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0,
  },
  privacyText: {
    color: palette.secondaryText,
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0,
    marginTop: 2,
  },
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: 16,
    backgroundColor: "rgba(255, 248, 245, 0.96)",
  },
  cta: {
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: palette.shadowTint,
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.16,
    shadowRadius: 32,
    elevation: 8,
  },
  ctaText: {
    color: palette.white,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: 0,
  },
  ctaIcon: {
    position: "absolute",
    right: 32,
  },
});
