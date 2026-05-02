import {
  Bot,
  CalendarDays,
  ChevronRight,
  HeartPulse,
  LockKeyhole,
  MessageCircle,
  Moon,
  Shield,
  Sparkles,
  SunMedium,
  Wind,
  Zap,
} from "lucide-react-native";
import { Link } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  LayoutChangeEvent,
  LayoutRectangle,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { Image } from "expo-image";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import { BloopIntroOverlay } from "@/components/bloop/BloopIntroOverlay";
import { AppTourOverlay } from "@/components/tour/AppTourOverlay";
import { spacing } from "@/lib/design-tokens";
import { tourSteps } from "@/lib/tour-steps";
import { useAppStore } from "@/store/app-store";

const PAGE_GUTTER = 32;
const RAIL_GAP = 16;
const bloopImage = require("@/images/webp/blooppink1.webp");

const calendarDays = [
  { day: "S", date: "26", active: false },
  { day: "M", date: "27", active: false },
  { day: "T", date: "28", active: false },
  { day: "W", date: "29", active: false },
  { day: "T", date: "30", active: false },
  { day: "F", date: "31", active: false },
  { day: "TODAY", date: "1", active: true },
] as const;

const symptomBubbleColumns = [
  [12, 20, 38],
  [28, 12],
  [8, 24, 16],
  [14, 32],
  [18, 46, 12],
  [12, 26, 22],
  [8, 38, 20],
  [24, 40],
  [16, 30, 12],
] as const;

const insightTones = {
  pink: {
    card: "#FFE8F1",
    soft: "#FFFFFF",
    button: "#D9467D",
    glow: "rgba(217, 70, 125, 0.28)",
    accent: "#B83269",
    icon: "#B83269",
    text: "#2C2A29",
    body: "#4A4642",
    buttonText: "#FFFFFF",
  },
  yellow: {
    card: "#FFF3BF",
    soft: "#FFF9E7",
    button: "#B86B00",
    glow: "rgba(184, 107, 0, 0.24)",
    accent: "#8A4D00",
    icon: "#8A4D00",
    text: "#2C2A29",
    body: "#4A4642",
    buttonText: "#FFFFFF",
  },
  orange: {
    card: "#FFE2D1",
    soft: "#FFF3EC",
    button: "#F97316",
    glow: "rgba(249, 115, 22, 0.28)",
    accent: "#C2410C",
    icon: "#C2410C",
    text: "#2C2A29",
    body: "#4A4642",
    buttonText: "#FFFFFF",
  },
  red: {
    card: "#B94A48",
    soft: "rgba(255, 255, 255, 0.92)",
    button: "#FFFFFF",
    glow: "rgba(185, 74, 72, 0.26)",
    accent: "#FFFFFF",
    icon: "#B94A48",
    text: "#FFFFFF",
    body: "rgba(255, 255, 255, 0.9)",
    buttonText: "#B94A48",
  },
} as const;

const insightCards = [
  {
    id: "prediction",
    tone: "pink",
    eyebrow: "Prediction",
    title: "Your next cycle may begin in 11 days",
    body: "Explore personalized wellness insights based on your cycle phase.",
    cta: "Log Flow",
    buttonHref: "/(modals)/log-day",
    icon: CalendarDays,
  },
  {
    id: "vitality",
    tone: "yellow",
    eyebrow: "Mid-cycle",
    title: "Mid-Cycle Vitality",
    body: "Energy, glow rituals, and hormonal harmony in one calm view.",
    cta: "Open Guidance",
    buttonHref: "/(tabs)/cycle",
    icon: SunMedium,
  },
  {
    id: "smartCheck",
    tone: "orange",
    eyebrow: "Smart Check",
    title: "Your body has its own language.",
    body: "A gentle 5-minute check-in assisted by Bloop.",
    cta: "Start Check-In",
    buttonHref: "/(modals)/log-day",
    icon: Wind,
  },
  {
    id: "cycleHistory",
    tone: "red",
    eyebrow: "My Cycles",
    title: "Your cycle has been consistent",
    body: "Current cycle: 19 days. Started Apr 13.",
    cta: "Prep Doctor Notes",
    buttonHref: "/(modals)/doctor-prep",
    icon: HeartPulse,
  },
  {
    id: "symptoms",
    tone: "pink",
    eyebrow: "Patterns",
    title: "Your Body's Rhythm",
    body: "Notice mood patterns before your cycle with more grace.",
    cta: "Log Symptoms",
    buttonHref: "/(modals)/log-day",
    icon: MessageCircle,
  },
  {
    id: "bodySignals",
    tone: "orange",
    eyebrow: "Signals",
    title: "Energy may feel steadier today",
    body: "A light movement day can support your current rhythm.",
    cta: "View Cycle",
    buttonHref: "/(tabs)/cycle",
    icon: Zap,
  },
] as const;

const lockedInsightHints = [
  { label: "Cycle trend maps", icon: CalendarDays },
  { label: "Bloop care plan", icon: Bot },
  { label: "Vault summaries", icon: Shield },
] as const;

const quickActions = [
  { label: "Ask Bloop", href: "/(modals)/bloop", icon: Bot, tone: "#F97316" },
  { label: "Cycle", href: "/(tabs)/cycle", icon: CalendarDays, tone: "#D9467D" },
  { label: "Vault", href: "/(tabs)/vault", icon: Shield, tone: "#5BBFB5" },
] as const;

type InsightCard = (typeof insightCards)[number];

export default function HomeScreen() {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const cardWidth = Math.max(1, Math.min(width - PAGE_GUTTER * 2, 344));
  const userName = useAppStore((state) => state.userName);
  const dailyMood = useAppStore((state) => state.dailyMood);
  const setDailyMood = useAppStore((state) => state.setDailyMood);
  const records = useAppStore((state) => state.records);
  const hasHydrated = useAppStore((state) => state.hasHydrated);
  const hasSeenAppTour = useAppStore((state) => state.hasSeenAppTour);
  const hasSeenBloopIntro = useAppStore((state) => state.hasSeenBloopIntro);
  const tourStep = useAppStore((state) => state.tourStep);
  const startAppTour = useAppStore((state) => state.startAppTour);
  const nextTourStep = useAppStore((state) => state.nextTourStep);
  const skipAppTour = useAppStore((state) => state.skipAppTour);
  const finishAppTour = useAppStore((state) => state.finishAppTour);
  const onboardingCompleted = useAppStore((state) => state.onboardingCompleted);
  const setBloopVisible = useAppStore((state) => state.setBloopVisible);

  const scrollRef = useRef<ScrollView>(null);
  const profileRef = useRef<View>(null);
  const cycleRef = useRef<View>(null);
  const insightsRef = useRef<View>(null);
  const checkinRef = useRef<View>(null);
  const vaultRef = useRef<View>(null);
  const lastScrollY = useRef(0);

  const [targetLayouts, setTargetLayouts] = useState<Record<string, LayoutRectangle>>({});
  const [targetOffsets, setTargetOffsets] = useState<Record<string, number>>({});
  const [isTourReady, setIsTourReady] = useState(false);

  const measureTarget = (key: string, ref: React.RefObject<View | null>) => {
    ref.current?.measureInWindow((x, y, w, h) => {
      if (w > 0 && h > 0) {
        setTargetLayouts((prev) => ({ ...prev, [key]: { x, y, width: w, height: h } }));
      }
    });
  };

  const registerTarget = (key: string, ref: React.RefObject<View | null>) => (event: LayoutChangeEvent) => {
    const layoutY = event.nativeEvent.layout.y;
    setTargetOffsets((prev) => (prev[key] === layoutY ? prev : { ...prev, [key]: layoutY }));
    requestAnimationFrame(() => measureTarget(key, ref));
  };

  const targetRefs: Record<string, React.RefObject<View | null>> = {
    profileAvatar: profileRef,
    cycleSummary: cycleRef,
    dailyInsights: insightsRef,
    dailyCheckIn: checkinRef,
    vaultPreview: vaultRef,
  };

  useEffect(() => {
    const tabBarH = 64 + insets.bottom;
    const tabBarY = height - tabBarH;
    const fabSize = 64;
    const fabY = height - (insets.bottom + 92) - fabSize;
    const fabX = width - spacing.lg - fabSize;

    setTargetLayouts((prev) => ({
      ...prev,
      tabBar: { x: 0, y: tabBarY, width, height: tabBarH },
      bloopButton: { x: fabX, y: fabY, width: fabSize, height: fabSize },
    }));
  }, [height, insets.bottom, width]);

  useEffect(() => {
    if (hasHydrated && onboardingCompleted && hasSeenBloopIntro && !hasSeenAppTour && tourStep < 0) {
      startAppTour();
      return;
    }

    if (hasHydrated && onboardingCompleted && hasSeenBloopIntro && !hasSeenAppTour) {
      const timer = setTimeout(() => setIsTourReady(true), 800);
      return () => clearTimeout(timer);
    }
  }, [
    hasHydrated,
    onboardingCompleted,
    hasSeenBloopIntro,
    hasSeenAppTour,
    tourStep,
    startAppTour,
  ]);

  const requiredTourLayouts = ["profileAvatar", "cycleSummary", "dailyInsights", "dailyCheckIn", "tabBar", "bloopButton"];
  const allLayoutsMeasured = requiredTourLayouts.every((key) => {
    const layout = targetLayouts[key];
    return layout && layout.width > 0 && layout.height > 0;
  });
  const canShowTour = tourStep >= 0 && isTourReady && allLayoutsMeasured;

  const handleNextTourStep = () => {
    const nextTarget = tourSteps[tourStep + 1]?.targetKey;
    const nextRef = nextTarget ? targetRefs[nextTarget] : undefined;

    if (nextTarget === "vaultPreview") {
      scrollRef.current?.scrollToEnd({ animated: true });
      setTimeout(() => {
        measureTarget("vaultPreview", vaultRef);
        nextTourStep();
      }, 480);
      return;
    }

    if (nextRef && targetOffsets[nextTarget] !== undefined) {
      const topTargets = nextTarget === "profileAvatar" || nextTarget === "cycleSummary";
      scrollRef.current?.scrollTo({
        y: topTargets ? 0 : Math.max(0, targetOffsets[nextTarget] - spacing.lg),
        animated: true,
      });
      setTimeout(() => {
        measureTarget(nextTarget, nextRef);
        nextTourStep();
      }, 360);
      return;
    }

    nextTourStep();
  };

  const handleScroll = (event: any) => {
    const currentY = event.nativeEvent.contentOffset.y;
    if (currentY <= 10) {
      setBloopVisible(true);
    } else if (currentY > lastScrollY.current + 15) {
      setBloopVisible(false);
    } else if (currentY < lastScrollY.current - 15) {
      setBloopVisible(true);
    }
    lastScrollY.current = currentY;
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FFF8F5]" edges={["top", "left", "right"]} style={styles.screen}>
      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        scrollEventThrottle={16}
        onScroll={handleScroll}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 132 + insets.bottom }]}
      >
        <View className="px-8" style={styles.pageHeader}>
          <View style={styles.headerCopy}>
            <Text style={styles.headerEyebrow}>Welcome back,</Text>
            <Text style={styles.headerTitle} numberOfLines={1}>
              {userName || "MyStree Soul"}
            </Text>
          </View>
          <View ref={profileRef} onLayout={registerTarget("profileAvatar", profileRef)}>
            <Link href="/(tabs)/profile" asChild>
              <Pressable accessibilityRole="button" accessibilityLabel="Open profile and settings" style={styles.avatar}>
                <Text style={styles.avatarText}>{(userName || "M").slice(0, 1).toUpperCase()}</Text>
              </Pressable>
            </Link>
          </View>
        </View>

        <View className="px-8" style={styles.heroWrap}>
          <View
            ref={cycleRef}
            onLayout={registerTarget("cycleSummary", cycleRef)}
            style={styles.heroCard}
          >
            <View style={styles.heroTopRow}>
              <Text style={styles.heroEyebrow}>Prediction</Text>
              <View style={styles.datePill}>
                <CalendarDays size={15} color="#F97316" strokeWidth={2.3} />
                <Text style={styles.datePillText}>May 1</Text>
              </View>
            </View>
            <Text style={styles.heroTitle}>Your next cycle may begin in 11 days</Text>
            <Text style={styles.heroBody}>
              Explore personalized guidance based on your current rhythm.
            </Text>
            <View style={styles.heroCalendarStrip}>
              {calendarDays.map((item) => (
                <View key={`${item.day}-${item.date}`} style={styles.heroCalendarDay}>
                  <Text style={[styles.calendarDayText, item.active ? styles.calendarDayActiveText : null]}>
                    {item.day}
                  </Text>
                  <View style={[styles.calendarDateBubble, item.active ? styles.calendarDateBubbleActive : null]}>
                    <Text
                      style={[styles.calendarDateText, item.active ? styles.calendarDateActiveText : null]}
                    >
                      {item.date}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View className="px-8" style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionKicker}>Curated for today</Text>
            <Text style={styles.sectionTitle}>Your Daily Insights</Text>
          </View>
          <Text style={styles.sectionMeta}>6 cards</Text>
        </View>

        <View ref={insightsRef} onLayout={registerTarget("dailyInsights", insightsRef)} style={styles.insightTourWrap}>
          <FlatList
            horizontal
            style={styles.insightRail}
            data={insightCards}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            snapToInterval={cardWidth + RAIL_GAP}
            decelerationRate="fast"
            contentContainerStyle={styles.insightRailContent}
            renderItem={({ item }) => <InsightPanel item={item} width={cardWidth} />}
          />
        </View>

        <View
          className="px-8"
          ref={checkinRef}
          onLayout={registerTarget("dailyCheckIn", checkinRef)}
          style={styles.checkInSection}
        >
          <View style={styles.checkInCard}>
            <View style={styles.checkInHeader}>
              <View>
                <Text style={styles.checkInKicker}>Bloop assisted</Text>
                <Text style={styles.checkInTitle}>Smart Check</Text>
              </View>
              <Image source={bloopImage} contentFit="contain" transition={300} style={styles.checkInBloop} />
            </View>
            <Text style={styles.checkInBody}>
              Track small changes today so your patterns become easier to understand tomorrow.
            </Text>
            <View style={styles.moodGrid}>
              {["Calm", "Tired", "Pain"].map((mood) => (
                <Pressable
                  key={mood}
                  accessibilityRole="button"
                  accessibilityLabel={`Set mood ${mood}`}
                  onPress={() => setDailyMood(mood)}
                  style={[styles.moodChip, dailyMood === mood ? styles.moodChipActive : null]}
                >
                  <Text style={[styles.moodChipText, dailyMood === mood ? styles.moodChipTextActive : null]}>
                    {mood}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        </View>

        <View className="px-8" style={styles.quickActionSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionGrid}>
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link key={action.label} href={action.href as any} asChild>
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={action.label}
                    style={styles.quickAction}
                  >
                    <View style={[styles.quickIcon, { backgroundColor: `${action.tone}1A` }]}>
                      <Icon size={20} color={action.tone} strokeWidth={2.3} />
                    </View>
                    <Text style={styles.quickLabel}>{action.label}</Text>
                  </Pressable>
                </Link>
              );
            })}
          </View>
        </View>

        <View
          className="px-8"
          ref={vaultRef}
          onLayout={registerTarget("vaultPreview", vaultRef)}
          style={styles.vaultSection}
        >
          <View style={styles.vaultCard}>
            <View style={styles.vaultIconWrap}>
              <Shield size={22} color="#5BBFB5" strokeWidth={2.4} />
            </View>
            <View style={styles.vaultCopy}>
              <Text style={styles.vaultTitle}>Memory Vault</Text>
              <Text style={styles.vaultBody}>
                {records.length > 0
                  ? `${records.length} record${records.length === 1 ? "" : "s"} organized for doctor prep.`
                  : "Your private space for records, summaries, and doctor notes."}
              </Text>
            </View>
            <Link href="/(tabs)/vault" asChild>
              <Pressable accessibilityRole="button" accessibilityLabel="Open Memory Vault">
                <ChevronRight size={22} color="#2C2A29" strokeWidth={2.2} />
              </Pressable>
            </Link>
          </View>
        </View>

        <View className="px-8" style={styles.lockedSection}>
          <View style={styles.lockedCard}>
            <View style={styles.lockedHeader}>
              <View style={styles.lockedIconWrap}>
                <LockKeyhole size={22} color="#F97316" strokeWidth={2.4} />
              </View>
              <View style={styles.lockedTitleWrap}>
                <Text style={styles.lockedEyebrow}>Advanced sanctuary</Text>
                <Text style={styles.lockedTitle}>Upgrade your health insights</Text>
              </View>
              <View style={styles.lockedBadge}>
                <Text style={styles.lockedBadgeText}>Locked</Text>
              </View>
            </View>

            <Text style={styles.lockedBody}>
              Deeper cycle patterns, doctor-ready summaries, and long-range wellness signals are being
              prepared for your account.
            </Text>

            <View style={styles.lockedHints}>
              {lockedInsightHints.map((hint) => {
                const Icon = hint.icon;
                return (
                  <View key={hint.label} style={styles.lockedHintChip}>
                    <Icon size={15} color="#C2410C" strokeWidth={2.2} />
                    <Text style={styles.lockedHintText}>{hint.label}</Text>
                  </View>
                );
              })}
            </View>

            <Pressable
              disabled
              accessibilityRole="button"
              accessibilityState={{ disabled: true }}
              accessibilityLabel="Advanced insights locked"
              style={styles.lockedButton}
            >
              <Text style={styles.lockedButtonText}>Locked for now</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      {canShowTour && !hasSeenAppTour && (
        <AppTourOverlay
          step={tourStep}
          targetLayout={targetLayouts[tourSteps[tourStep]?.targetKey]}
          onNext={handleNextTourStep}
          onSkip={skipAppTour}
          onFinish={finishAppTour}
        />
      )}
      <BloopIntroOverlay />
    </SafeAreaView>
  );
}

function InsightPanel({ item, width }: { item: InsightCard; width: number }) {
  const tone = insightTones[item.tone];
  const Icon = item.icon;

  return (
    <View
      style={[
        styles.insightCard,
        {
          width,
          backgroundColor: tone.card,
          shadowColor: tone.glow,
        },
      ]}
    >
      <View style={styles.insightTop}>
        <View style={styles.insightIconBubble}>
          <Icon size={20} color={tone.icon} strokeWidth={2.3} />
        </View>
        <View style={styles.insightTextWrap}>
          <Text style={[styles.insightEyebrow, { color: tone.accent }]}>{item.eyebrow}</Text>
          <Text style={[styles.insightTitle, { color: tone.text }]} numberOfLines={3}>
            {item.title}
          </Text>
        </View>
      </View>

      <View style={[styles.previewSurface, { backgroundColor: tone.soft }]}>
        {item.id === "prediction" ? <PredictionPreview /> : null}
        {item.id === "vitality" ? <VitalityPreview /> : null}
        {item.id === "smartCheck" ? <SmartCheckPreview /> : null}
        {item.id === "cycleHistory" ? <CycleHistoryPreview /> : null}
        {item.id === "symptoms" ? <SymptomPreview /> : null}
        {item.id === "bodySignals" ? <BodySignalsPreview /> : null}
      </View>

      <Text style={[styles.insightBody, { color: tone.body }]} numberOfLines={2}>
        {item.body}
      </Text>

      <Link href={item.buttonHref as any} asChild>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={item.cta}
          style={({ pressed }) => [pressed ? styles.softButtonPressed : null]}
        >
          <SoftButton
            label={item.cta}
            color={tone.button}
            glow={tone.glow}
            textColor={tone.buttonText}
          />
        </Pressable>
      </Link>
    </View>
  );
}

function SoftButton({
  label,
  color,
  glow,
  textColor,
}: {
  label: string;
  color: string;
  glow: string;
  textColor: string;
}) {
  return (
    <View
      style={[
        styles.softButton,
        {
          backgroundColor: color,
          shadowColor: glow,
        },
      ]}
    >
      <Text style={[styles.softButtonText, { color: textColor }]}>{label}</Text>
    </View>
  );
}

function PredictionPreview() {
  return (
    <View style={styles.previewStack}>
      <View style={styles.miniCalendarStrip}>
        {calendarDays.slice(1).map((item) => (
          <View key={`mini-${item.day}-${item.date}`} style={styles.miniCalendarDay}>
            <Text style={[styles.miniCalendarDayText, item.active ? styles.miniCalendarActiveText : null]}>
              {item.day}
            </Text>
            <View style={[styles.miniCalendarDate, item.active ? styles.miniCalendarDateActive : null]}>
              <Text style={[styles.miniCalendarDateText, item.active ? styles.miniCalendarActiveText : null]}>
                {item.date}
              </Text>
            </View>
          </View>
        ))}
      </View>
      <View style={styles.bloopInsight}>
        <Bot size={17} color="#F97316" strokeWidth={2.3} />
        <Text style={styles.bloopInsightText} numberOfLines={2}>
          Energy may feel stable today. Focus on balanced movement.
        </Text>
      </View>
    </View>
  );
}

function VitalityPreview() {
  const rows = ["Optimizing energy", "Natural glow rituals", "Hormonal harmony"];

  return (
    <View style={styles.previewStack}>
      {rows.map((row) => (
        <View key={row} style={styles.bulletRow}>
          <Sparkles size={14} color="#B86B00" strokeWidth={2.2} />
          <Text style={styles.previewText}>{row}</Text>
        </View>
      ))}
      <View style={styles.dualPreviewRow}>
        <MiniMetric label="Cycle" icon={<Moon size={15} color="#B86B00" />} />
        <MiniMetric label="Energy" icon={<Zap size={15} color="#F97316" />} />
      </View>
    </View>
  );
}

function SmartCheckPreview() {
  return (
    <View style={styles.smartPreview}>
      <View style={styles.smartCopy}>
        <View style={styles.featherOrb}>
          <Wind size={18} color="#FFFFFF" strokeWidth={2.3} />
        </View>
        <Text style={styles.previewText} numberOfLines={3}>
          Tracking small changes helps Bloop read long-term hormonal harmony.
        </Text>
      </View>
      <Image source={bloopImage} contentFit="contain" transition={300} style={styles.bloopPreviewImage} />
    </View>
  );
}

function CycleHistoryPreview() {
  return (
    <View style={styles.previewStack}>
      <View>
        <Text style={styles.previewStrong}>Current cycle: 19 days</Text>
        <Text style={styles.previewMuted}>Started Apr 13</Text>
      </View>
      <View style={styles.progressTrack}>
        <View style={styles.progressFill}>
          <View style={styles.progressHandle} />
        </View>
      </View>
      <View style={styles.sleepPatternRow}>
        <Moon size={17} color="#D9467D" strokeWidth={2.2} />
        <Text style={styles.previewText}>Sleep and cycle patterns</Text>
      </View>
    </View>
  );
}

function SymptomPreview() {
  return (
    <View style={styles.previewStack}>
      <View style={styles.bubbleChart}>
        {symptomBubbleColumns.map((column, columnIndex) => (
          <View key={`symptom-${columnIndex}`} style={styles.bubbleColumn}>
            <View style={styles.bubbleGuide} />
            {column.map((size, bubbleIndex) => (
              <View
                key={`${columnIndex}-${bubbleIndex}`}
                style={[
                  styles.bubbleDot,
                  {
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                    bottom: 8 + bubbleIndex * 22 + columnIndex,
                    marginLeft: -size / 2,
                    backgroundColor:
                      bubbleIndex === 0 ? "#FED7AA" : bubbleIndex === 1 ? "#FB923C" : "#F97316",
                    opacity: bubbleIndex === 2 ? 0.88 : 0.68,
                  },
                ]}
              />
            ))}
          </View>
        ))}
      </View>
      <View style={styles.symptomInsight}>
        <MessageCircle size={16} color="#B86B00" strokeWidth={2.2} />
        <Text style={styles.previewText} numberOfLines={2}>
          Most vibrant around day 12.
        </Text>
      </View>
    </View>
  );
}

function BodySignalsPreview() {
  return (
    <View style={styles.previewStack}>
      <View style={styles.trialRow}>
        <Text style={styles.previewStrong}>Energy window</Text>
        <Zap size={18} color="#F97316" strokeWidth={2.3} />
      </View>
      <View style={styles.dualPreviewRow}>
        <MiniMetric label="Hydrate" icon={<SunMedium size={15} color="#F97316" />} />
        <MiniMetric label="Stretch" icon={<HeartPulse size={15} color="#C2410C" />} />
      </View>
      <View style={styles.bloopInsight}>
        <Bot size={17} color="#F97316" strokeWidth={2.3} />
        <Text style={styles.bloopInsightText} numberOfLines={2}>
          Bloop suggests light movement and a calmer evening routine.
        </Text>
      </View>
    </View>
  );
}

function UpgradePreview() {
  return (
    <View style={styles.previewStack}>
      <View style={styles.trialRow}>
        <Text style={styles.previewStrong}>7-day trial</Text>
        <View style={styles.toggleTrack}>
          <View style={styles.toggleKnob} />
        </View>
      </View>
      <View style={styles.planRow}>
        <View style={styles.planCard}>
          <Text style={styles.planName}>Yearly</Text>
          <Text style={styles.planPrice}>Rs 1,299</Text>
        </View>
        <View style={styles.planCard}>
          <Text style={styles.planName}>Monthly</Text>
          <Text style={styles.planPrice}>Rs 319</Text>
        </View>
      </View>
      <View style={styles.bloopPremium}>
        <Image source={bloopImage} contentFit="contain" transition={300} style={styles.bloopPremiumImage} />
        <Text style={styles.previewText}>Bloop AI protects your privacy.</Text>
      </View>
    </View>
  );
}

function MiniMetric({ label, icon }: { label: string; icon: React.ReactNode }) {
  return (
    <View style={styles.miniMetric}>
      {icon}
      <Text style={styles.miniMetricText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFF8F5",
  },
  scrollContent: {
    paddingTop: spacing.lg,
    backgroundColor: "#FFF8F5",
  },
  pageHeader: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  headerCopy: {
    flex: 1,
  },
  headerEyebrow: {
    color: "#6B665F",
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    lineHeight: 20,
  },
  headerTitle: {
    color: "#2C2A29",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 28,
    lineHeight: 36,
    letterSpacing: 0,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FFE8F1",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(217, 70, 125, 0.14)",
  },
  avatarText: {
    color: "#B83269",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    lineHeight: 24,
  },
  heroWrap: {
    width: "100%",
    marginBottom: spacing.xl,
  },
  heroCard: {
    width: "100%",
    borderRadius: 28,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#F1E6DD",
    padding: spacing.lg,
    shadowColor: "rgba(249, 115, 22, 0.22)",
    shadowOpacity: 0.08,
    shadowRadius: 28,
    shadowOffset: { width: 0, height: 14 },
    elevation: 4,
  },
  heroTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  heroEyebrow: {
    color: "#F97316",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  datePill: {
    minHeight: 34,
    borderRadius: 17,
    backgroundColor: "#FFF3EC",
    paddingHorizontal: spacing.sm,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  datePillText: {
    color: "#2C2A29",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 12,
    lineHeight: 16,
  },
  heroTitle: {
    color: "#2C2A29",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 31,
    lineHeight: 39,
    letterSpacing: 0,
  },
  heroBody: {
    color: "#6B665F",
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    lineHeight: 21,
    marginTop: spacing.xs,
  },
  heroCalendarStrip: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 4,
    marginTop: spacing.lg,
  },
  heroCalendarDay: {
    alignItems: "center",
    gap: 4,
    minWidth: 30,
  },
  calendarDayText: {
    color: "#9B928A",
    fontFamily: "Poppins_500Medium",
    fontSize: 9,
    lineHeight: 13,
  },
  calendarDayActiveText: {
    color: "#F97316",
    fontFamily: "Poppins_600SemiBold",
  },
  calendarDateBubble: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#FFF8F5",
    alignItems: "center",
    justifyContent: "center",
  },
  calendarDateBubbleActive: {
    backgroundColor: "#F97316",
  },
  calendarDateText: {
    color: "#2C2A29",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 12,
    lineHeight: 17,
  },
  calendarDateActiveText: {
    color: "#FFFFFF",
  },
  sectionHeader: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  sectionKicker: {
    color: "#F97316",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: 0.6,
    textTransform: "uppercase",
  },
  sectionTitle: {
    color: "#2C2A29",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 22,
    lineHeight: 30,
  },
  sectionMeta: {
    color: "#9B928A",
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    lineHeight: 18,
  },
  insightRail: {
    width: "100%",
    marginBottom: spacing.xl,
  },
  insightTourWrap: {
    width: "100%",
  },
  insightRailContent: {
    paddingHorizontal: PAGE_GUTTER,
    gap: RAIL_GAP,
  },
  insightCard: {
    minHeight: 472,
    borderRadius: 16,
    padding: spacing.lg,
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  insightTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.md,
  },
  insightIconBubble: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.78)",
    alignItems: "center",
    justifyContent: "center",
  },
  insightTextWrap: {
    flex: 1,
    gap: 3,
  },
  insightEyebrow: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 11,
    lineHeight: 16,
    letterSpacing: 0.7,
    textTransform: "uppercase",
  },
  insightTitle: {
    color: "#2C2A29",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 24,
    lineHeight: 31,
    letterSpacing: 0,
  },
  previewSurface: {
    minHeight: 176,
    borderRadius: 20,
    marginTop: spacing.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.72)",
  },
  insightBody: {
    color: "#4A4642",
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    lineHeight: 21,
    marginTop: spacing.md,
    minHeight: 42,
  },
  softButton: {
    minHeight: 48,
    borderRadius: 99,
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.45)",
    shadowOpacity: 0.22,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 5,
  },
  softButtonPressed: {
    opacity: 0.92,
    transform: [{ scale: 0.985 }],
  },
  softButtonText: {
    color: "#FFFFFF",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 15,
    lineHeight: 21,
    textAlign: "center",
  },
  previewStack: {
    flex: 1,
    gap: spacing.sm,
  },
  miniCalendarStrip: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 4,
  },
  miniCalendarDay: {
    alignItems: "center",
    gap: 4,
  },
  miniCalendarDayText: {
    color: "#9B928A",
    fontFamily: "Poppins_500Medium",
    fontSize: 8,
    lineHeight: 12,
  },
  miniCalendarActiveText: {
    color: "#F97316",
    fontFamily: "Poppins_600SemiBold",
  },
  miniCalendarDate: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  miniCalendarDateActive: {
    backgroundColor: "#F97316",
  },
  miniCalendarDateText: {
    color: "#2C2A29",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 11,
    lineHeight: 15,
  },
  bloopInsight: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.xs,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    padding: spacing.sm,
  },
  bloopInsightText: {
    flex: 1,
    color: "#2C2A29",
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    lineHeight: 18,
  },
  bulletRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  previewText: {
    flex: 1,
    color: "#2C2A29",
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    lineHeight: 18,
  },
  dualPreviewRow: {
    flexDirection: "row",
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
  miniMetric: {
    flex: 1,
    minHeight: 56,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    padding: spacing.xs,
    justifyContent: "space-between",
  },
  miniMetricText: {
    color: "#2C2A29",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 11,
    lineHeight: 15,
  },
  smartPreview: {
    flex: 1,
    flexDirection: "row",
    gap: spacing.sm,
    alignItems: "center",
  },
  smartCopy: {
    flex: 1,
    gap: spacing.sm,
  },
  featherOrb: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#FF8A7A",
    alignItems: "center",
    justifyContent: "center",
  },
  bloopPreviewImage: {
    width: 86,
    height: 86,
  },
  previewStrong: {
    color: "#2C2A29",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 13,
    lineHeight: 19,
  },
  previewMuted: {
    color: "#6B665F",
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    lineHeight: 17,
  },
  progressTrack: {
    height: 12,
    borderRadius: 6,
    backgroundColor: "#FFFFFF",
    overflow: "visible",
  },
  progressFill: {
    position: "relative",
    width: "70%",
    height: "100%",
    borderRadius: 6,
    backgroundColor: "#F97316",
  },
  progressHandle: {
    position: "absolute",
    right: -3,
    top: -4,
    width: 6,
    height: 20,
    borderRadius: 3,
    backgroundColor: "#F97316",
  },
  sleepPatternRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    padding: spacing.sm,
  },
  bubbleChart: {
    height: 112,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 2,
  },
  bubbleColumn: {
    width: 22,
    height: "100%",
    position: "relative",
    alignItems: "center",
  },
  bubbleGuide: {
    position: "absolute",
    top: 0,
    bottom: 0,
    borderLeftWidth: 1,
    borderStyle: "dashed",
    borderColor: "rgba(45,42,38,0.10)",
  },
  bubbleDot: {
    position: "absolute",
    left: "50%",
  },
  symptomInsight: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    padding: spacing.sm,
  },
  trialRow: {
    minHeight: 46,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  toggleTrack: {
    width: 48,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#F97316",
    padding: 2,
    alignItems: "flex-end",
  },
  toggleKnob: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#FFFFFF",
  },
  planRow: {
    flexDirection: "row",
    gap: spacing.xs,
  },
  planCard: {
    flex: 1,
    minHeight: 58,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    padding: spacing.xs,
    justifyContent: "center",
    gap: 2,
  },
  planName: {
    color: "#6B665F",
    fontFamily: "Poppins_500Medium",
    fontSize: 10,
    lineHeight: 14,
  },
  planPrice: {
    color: "#2C2A29",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 13,
    lineHeight: 18,
  },
  bloopPremium: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    padding: spacing.sm,
  },
  bloopPremiumImage: {
    width: 34,
    height: 34,
  },
  checkInSection: {
    width: "100%",
    marginBottom: spacing.xl,
  },
  checkInCard: {
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#F1E6DD",
    padding: spacing.lg,
    shadowColor: "rgba(255, 138, 122, 0.18)",
    shadowOpacity: 0.08,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    elevation: 4,
  },
  checkInHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: spacing.md,
  },
  checkInKicker: {
    color: "#F97316",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: 0.6,
    textTransform: "uppercase",
  },
  checkInTitle: {
    color: "#2C2A29",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 24,
    lineHeight: 32,
  },
  checkInBloop: {
    width: 58,
    height: 58,
  },
  checkInBody: {
    color: "#6B665F",
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    lineHeight: 21,
    marginTop: spacing.sm,
  },
  moodGrid: {
    flexDirection: "row",
    gap: spacing.xs,
    marginTop: spacing.md,
  },
  moodChip: {
    flex: 1,
    minHeight: 46,
    borderRadius: 23,
    backgroundColor: "#FFF8F5",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#F1E6DD",
  },
  moodChipActive: {
    backgroundColor: "#F97316",
    borderColor: "#F97316",
  },
  moodChipText: {
    color: "#2C2A29",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 13,
    lineHeight: 18,
  },
  moodChipTextActive: {
    color: "#FFFFFF",
  },
  quickActionSection: {
    width: "100%",
    marginBottom: spacing.xl,
    gap: spacing.md,
  },
  quickActionGrid: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  quickAction: {
    flex: 1,
    minHeight: 96,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#F1E6DD",
    padding: spacing.sm,
    justifyContent: "space-between",
  },
  quickIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
  },
  quickLabel: {
    color: "#2C2A29",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 12,
    lineHeight: 17,
  },
  vaultSection: {
    width: "100%",
    marginBottom: spacing.xl,
  },
  vaultCard: {
    minHeight: 96,
    borderRadius: 22,
    backgroundColor: "#E8F7F5",
    padding: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  vaultIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  vaultCopy: {
    flex: 1,
    gap: 2,
  },
  vaultTitle: {
    color: "#2C2A29",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    lineHeight: 22,
  },
  vaultBody: {
    color: "#4A4642",
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    lineHeight: 18,
  },
  lockedSection: {
    width: "100%",
  },
  lockedCard: {
    borderRadius: 28,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#FED7AA",
    padding: spacing.lg,
    shadowColor: "rgba(249, 115, 22, 0.24)",
    shadowOpacity: 0.08,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
  },
  lockedHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  lockedIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FFF1E8",
    alignItems: "center",
    justifyContent: "center",
  },
  lockedTitleWrap: {
    flex: 1,
    gap: 2,
  },
  lockedEyebrow: {
    color: "#F97316",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 11,
    lineHeight: 16,
    letterSpacing: 0.7,
    textTransform: "uppercase",
  },
  lockedTitle: {
    color: "#2C2A29",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 20,
    lineHeight: 27,
  },
  lockedBadge: {
    minHeight: 30,
    borderRadius: 15,
    backgroundColor: "#2C2A29",
    paddingHorizontal: spacing.sm,
    alignItems: "center",
    justifyContent: "center",
  },
  lockedBadgeText: {
    color: "#FFFFFF",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 11,
    lineHeight: 15,
  },
  lockedBody: {
    color: "#6B665F",
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    lineHeight: 22,
    marginTop: spacing.md,
  },
  lockedHints: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xs,
    marginTop: spacing.md,
  },
  lockedHintChip: {
    minHeight: 38,
    borderRadius: 19,
    backgroundColor: "#FFF1E8",
    paddingHorizontal: spacing.sm,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  lockedHintText: {
    color: "#2C2A29",
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    lineHeight: 17,
  },
  lockedButton: {
    minHeight: 50,
    borderRadius: 25,
    backgroundColor: "#E8E2DC",
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.55)",
  },
  lockedButtonText: {
    color: "#6B665F",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 15,
    lineHeight: 21,
  },
});
