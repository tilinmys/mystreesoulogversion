import {
  Bot,
  ClipboardList,
  FilePlus2,
  HeartPulse,
  Moon,
  NotebookPen,
  Smile,
  Sparkles,
  Zap,
} from "lucide-react-native";
import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  TouchableOpacity,
  Pressable,
  Animated,
  LayoutRectangle,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { BloopIntroOverlay } from "@/components/bloop/BloopIntroOverlay";
import { AppTourOverlay } from "@/components/tour/AppTourOverlay";
import { tourSteps } from "@/lib/tour-steps";

import { CycleWheel } from "@/components/health/CycleWheel";
import { HealthMetricCard } from "@/components/health/HealthMetricCard";
import { QuickLogCard } from "@/components/health/QuickLogCard";
import { RecordCard } from "@/components/health/RecordCard";
import { SafeScreen } from "@/components/layout/SafeScreen";
import { AppCard } from "@/components/ui/AppCard";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { colors, radius, shadows, spacing } from "@/lib/design-tokens";
import { strings } from "@/lib/strings";
import { useAppStore } from "@/store/app-store";

const sections = ["hero", "checkin", "metrics", "actions", "vault"] as const;
const tabScrollClearance = 94;

function ActionCard({ action, onPress }: { action: any; onPress: () => void }) {
  const scale = useRef(new Animated.Value(1)).current;
  const Icon = action.icon;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
      speed: 40,
      bounciness: 6,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 30,
      bounciness: 8,
    }).start();
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={action.label}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={{ width: "48%" }}
    >
      <Animated.View style={[styles.actionCard, { transform: [{ scale }] }]}>
        <Icon size={22} color={colors.primaryOrange} strokeWidth={2.2} />
        <Text style={styles.actionText}>{action.label}</Text>
      </Animated.View>
    </Pressable>
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const compactWidth = width < 380;
  const bottomPadding = 96; // Space for the Bloop FAB above the bottom tab bar
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

  const listRef = useRef<FlatList>(null);
  const cycleRef = useRef<View>(null);
  const checkinRef = useRef<View>(null);
  const vaultRef = useRef<View>(null);
  const lastScrollY = useRef(0);

  const [targetLayouts, setTargetLayouts] = useState<Record<string, LayoutRectangle>>({});
  const [isTourReady, setIsTourReady] = useState(false);

  useEffect(() => {
    // Tab bar: full width, height is 64 + insets.bottom, sits exactly at the bottom of the screen.
    const tabBarH = 64 + insets.bottom;
    const tabBarY = height - tabBarH;

    // Bloop FAB: 56x56 orb (let's say ~64 with text), sits at bottom: insets.bottom + 92, perfectly centered
    const fabSize = 64;
    const fabY = height - (insets.bottom + 92) - fabSize;
    const fabX = width - spacing.lg - fabSize;

    setTargetLayouts((prev) => ({
      ...prev,
      tabBar: {
        x: 0,
        y: tabBarY,
        width: width,
        height: tabBarH,
      },
      bloopButton: {
        x: fabX,
        y: fabY,
        width: fabSize,
        height: fabSize,
      },
    }));
  }, [insets.bottom, width, height]);

  useEffect(() => {
    if (hasHydrated && onboardingCompleted && hasSeenBloopIntro && !hasSeenAppTour && tourStep < 0) {
      startAppTour();
      return;
    }

    if (hasHydrated && onboardingCompleted && hasSeenBloopIntro && !hasSeenAppTour) {
      // Gate 1 — minimum 800ms so all onLayout/measureInWindow callbacks complete
      const timer = setTimeout(() => {
        setIsTourReady(true);
      }, 800);
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

  // Gate 2 — don't start until all target elements have been measured with
  // non-zero dimensions. This prevents the spotlight misalignment bug where
  // the tour fires before Flexbox has finished laying out the screen.
  const REQUIRED_TOUR_LAYOUTS = ["cycleSummary", "dailyCheckIn", "tabBar", "bloopButton"];
  const allLayoutsMeasured = REQUIRED_TOUR_LAYOUTS.every((key) => {
    const l = targetLayouts[key];
    return l && l.width > 0 && l.height > 0;
  });
  const canShowTour = isTourReady && allLayoutsMeasured;

  const handleNextTourStep = () => {
    const nextStepIndex = tourStep + 1;
    const nextTarget = tourSteps[nextStepIndex]?.targetKey;

    if (nextTarget === "vaultPreview") {
      // Scroll to bottom first, then wait for layout to settle,
      // then re-measure so the spotlight lands on the correct screen coords.
      listRef.current?.scrollToEnd({ animated: true });
      setTimeout(() => {
        vaultRef.current?.measureInWindow((x, y, w, h) => {
          if (w > 0 && h > 0) {
            setTargetLayouts((p) => ({ ...p, vaultPreview: { x, y, width: w, height: h } }));
          }
          nextTourStep();
        });
      }, 480); // wait for 400ms scroll animation to complete
      return;
    }

    if (nextTarget === "tabBar") {
      listRef.current?.scrollToEnd({ animated: true });
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
    <SafeScreen bottomInset={false} contentStyle={styles.content}>
      <FlatList
        ref={listRef}
        data={sections}
        keyExtractor={(item) => item}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.list, { paddingBottom: bottomPadding }]}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        onScroll={handleScroll}
        scrollEventThrottle={16}
        renderItem={({ item }) => {
          if (item === "hero") {
            return (
              <View style={styles.heroBlock}>
                <Text style={styles.greeting}>Hi, {userName}</Text>
                <Text style={styles.subtext}>{strings.home.subtext}</Text>
                <View
                  ref={cycleRef}
                  onLayout={() => {
                    cycleRef.current?.measureInWindow((x, y, w, h) => {
                      setTargetLayouts((p) => ({ ...p, cycleSummary: { x, y, width: w, height: h } }));
                    });
                  }}
                >
                  <AppCard style={[styles.cycleCard, compactWidth ? styles.cycleCardCompact : null]}>
                    <View style={styles.cycleCopy}>
                    <Text style={styles.kicker}>{strings.home.cycleDay}</Text>
                    <Text style={[styles.phase, compactWidth ? styles.phaseCompact : null]}>
                      {strings.home.phase}
                    </Text>
                    <Text style={styles.prediction}>{strings.home.prediction}</Text>
                  </View>
                  <CycleWheel size={compactWidth ? 104 : 136} day={14} phase="Ovulation" />
                </AppCard>
                </View>
              </View>
            );
          }

          if (item === "checkin") {
            // Each mood: label, icon, personal accent color, subtext shown after pick, CTA suggestion
            const moods: Array<{
              label: string;
              icon: React.ReactNode;
              bg: string;
              subtext: string;
              tip: string;
              action: { label: string; route: string };
            }> = [
              {
                label: "Calm",
                icon: <Smile size={24} color={colors.softTeal} />,
                bg: colors.tealSoftSurface,
                subtext: "Great energy today. A good day to review your health goals.",
                tip: "Staying calm supports a healthy cycle. Want to log your vitals while you're feeling good?",
                action: { label: "Log Today", route: "/(modals)/log-day" },
              },
              {
                label: "Tired",
                icon: <Moon size={24} color={colors.roseGold} />,
                bg: colors.lavenderMist,
                subtext: "Rest is healing. Let's check what your body might be telling you.",
                tip: "Fatigue can signal iron levels or late luteal phase. Ask Bloop for gentle insights.",
                action: { label: "Ask Bloop", route: "/(modals)/bloop" },
              },
              {
                label: "Pain",
                icon: <HeartPulse size={24} color={colors.dangerText} />,
                bg: colors.dangerSurface,
                subtext: "Pain logged. Let's track it carefully for your next doctor visit.",
                tip: "Logging pain patterns helps your doctor understand your cycle better.",
                action: { label: "Log Today", route: "/(modals)/log-day" },
              },
              {
                label: "Anxious",
                icon: <Sparkles size={24} color={colors.roseGold} />,
                bg: colors.pinkSoftSurface,
                subtext: "You're not alone. Bloop can help you prepare for what's worrying you.",
                tip: "Anxiety before your period is common. Want to prep questions for your doctor?",
                action: { label: "Doctor Prep", route: "/(modals)/doctor-prep" },
              },
              {
                label: "Energetic",
                icon: <Zap size={24} color={colors.primaryOrange} />,
                bg: colors.orangeSoftSurface,
                subtext: "You're in your power phase. Make the most of this energy.",
                tip: "Ovulation phase often brings peak energy. A great time to add a record or update your vault.",
                action: { label: "Add Record", route: "/(modals)/upload-record" },
              },
            ];

            const activeMood = moods.find((m) => m.label === dailyMood);

            return (
              <View
                style={styles.section}
                ref={checkinRef}
                onLayout={() => {
                  checkinRef.current?.measureInWindow((x, y, w, h) => {
                    setTargetLayouts((p) => ({ ...p, dailyCheckIn: { x, y, width: w, height: h } }));
                  });
                }}
              >
                <SectionHeader title={strings.home.checkInTitle} />

                {activeMood ? (
                  <AppCard style={styles.moodTipCard}>
                    <View style={styles.moodHeader}>
                      <View style={styles.moodSummary}>
                        <View style={[styles.moodIconWrap, { backgroundColor: activeMood.bg }]}>
                          {activeMood.icon}
                        </View>
                        <Text style={styles.moodSubtext}>{activeMood.label} today</Text>
                      </View>
                      <TouchableOpacity onPress={() => setDailyMood("")} style={styles.editMood}>
                        <Text style={styles.editMoodText}>Edit</Text>
                      </TouchableOpacity>
                    </View>
                    <Text style={styles.moodSubtext}>{activeMood.subtext}</Text>
                    <Text style={styles.moodTip}>{activeMood.tip}</Text>
                    <TouchableOpacity
                      style={styles.moodCta}
                      activeOpacity={0.75}
                      onPress={() => router.push(activeMood.action.route as any)}
                      accessibilityRole="button"
                      accessibilityLabel={activeMood.action.label}
                    >
                      <Text style={styles.moodCtaText}>{activeMood.action.label} →</Text>
                    </TouchableOpacity>
                  </AppCard>
                ) : (
                  <View style={styles.moodRow}>
                    {moods.map((mood) => (
                      <QuickLogCard
                        key={mood.label}
                        label={mood.label}
                        icon={mood.icon}
                        selected={dailyMood === mood.label}
                        selectedBg={mood.bg}
                        onPress={() => setDailyMood(mood.label)}
                      />
                    ))}
                  </View>
                )}
              </View>
            );
          }

          if (item === "metrics") {
            return (
              <View style={styles.metricGrid}>
                <HealthMetricCard
                  label="Sleep"
                  value="7.2h"
                  icon={<Moon size={20} color={colors.roseGold} />}
                  style={styles.metricCard}
                />
                <HealthMetricCard
                  label="BP"
                  value="118/76"
                  icon={<HeartPulse size={20} color={colors.softTeal} />}
                  style={styles.metricCard}
                />
                <HealthMetricCard
                  label="Resting HR"
                  value="72 bpm"
                  icon={<ActivityIcon />}
                  style={styles.metricCard}
                />
              </View>
            );
          }

          if (item === "actions") {
            const actions = [
              { label: "Log Today", icon: NotebookPen, route: "/(modals)/log-day" },
              { label: "Ask Bloop", icon: Bot, route: "/(modals)/bloop" },
              { label: "Add Record", icon: FilePlus2, route: "/(modals)/upload-record" },
              { label: "Doctor Prep", icon: ClipboardList, route: "/(modals)/doctor-prep" },
            ] as const;
            return (
              <View style={styles.section}>
                <SectionHeader title={strings.home.quickActions} />
                <View style={styles.actionGrid}>
                  {actions.map((action) => (
                    <ActionCard
                      key={action.label}
                      action={action}
                      onPress={() => router.push(action.route as any)}
                    />
                  ))}
                </View>
              </View>
            );
          }

          return (
            <View 
              style={styles.section}
              ref={vaultRef}
              onLayout={() => {
                vaultRef.current?.measureInWindow((x, y, w, h) => {
                  setTargetLayouts((p) => ({ ...p, vaultPreview: { x, y, width: w, height: h } }));
                });
              }}
            >
              <View style={styles.sectionTop}>
                <SectionHeader title={strings.home.vaultPreview} />
                <TouchableOpacity activeOpacity={0.7} onPress={() => router.push("/(tabs)/vault")}>
                  <Text style={styles.link}>{strings.home.openVault}</Text>
                </TouchableOpacity>
              </View>
              {records.slice(0, 2).map((record) => (
                <RecordCard key={record.id} record={record} />
              ))}
            </View>
          );
        }}
      />
      
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
    </SafeScreen>
  );
}

function ActivityIcon() {
  return <HeartPulse size={20} color={colors.primaryOrange} />;
}

const styles = StyleSheet.create({
  content: {
    flexDirection: "column",
    paddingHorizontal: spacing.lg,
  },
  list: {
    flexDirection: "column",
    paddingTop: spacing.xl,
    gap: spacing.lg,
  },
  heroBlock: {
    flexDirection: "column",
    gap: spacing.sm,
  },
  greeting: {
    color: colors.primaryText,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 28,
    lineHeight: 36,
    letterSpacing: 0,
  },
  subtext: {
    color: colors.secondaryText,
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
    lineHeight: 22,
  },
  cycleCard: {
    marginTop: spacing.xs,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.lg,
    padding: spacing.xl,
    borderRadius: radius.large,
    ...shadows.lg,
  },
  cycleCardCompact: {
    flexDirection: "column",
    padding: spacing.md,
    gap: spacing.sm,
  },
  cycleCopy: {
    flex: 1,
    flexDirection: "column",
    gap: spacing.xs,
  },
  kicker: {
    color: colors.primaryOrange,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 13,
    lineHeight: 18,
  },
  phase: {
    color: colors.primaryText,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 25,
    lineHeight: 31,
  },
  phaseCompact: {
    fontSize: 22,
    lineHeight: 28,
  },
  prediction: {
    color: colors.secondaryText,
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    lineHeight: 19,
  },
  section: {
    flexDirection: "column",
    gap: spacing.md,
  },
  moodRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  moodTipCard: {
    flexDirection: "column",
    gap: spacing.sm,
    padding: spacing.lg,
    backgroundColor: colors.backgroundWhite,
  },
  moodHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.xs,
  },
  moodSummary: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  moodIconWrap: {
    width: 36,
    height: 36,
    borderRadius: radius.small,
    alignItems: "center",
    justifyContent: "center",
  },
  editMood: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  editMoodText: {
    color: colors.primaryOrange,
    fontFamily: "Poppins_500Medium",
    fontSize: 13,
    lineHeight: 18,
  },
  moodSubtext: {
    color: colors.primaryText,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    lineHeight: 21,
  },
  moodTip: {
    color: colors.secondaryText,
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    lineHeight: 20,
  },
  moodCta: {
    alignSelf: "flex-start",
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: colors.primaryOrange,
    marginTop: spacing.xs,
  },
  moodCtaText: {
    color: colors.primaryOrange,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 13,
    lineHeight: 18,
  },
  metricGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  metricCard: {
    flex: 0,
    width: "48%",
  },
  actionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  actionCard: {
    flexDirection: "column",
    width: "100%",
    minHeight: 92,
    borderRadius: radius.medium,
    backgroundColor: colors.backgroundWhite,
    padding: spacing.lg,
    justifyContent: "space-between",
    ...shadows.card,
  },
  actionText: {
    color: colors.primaryText,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    lineHeight: 20,
  },
  sectionTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  link: {
    color: colors.primaryOrange,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 13,
    lineHeight: 18,
  },
});
