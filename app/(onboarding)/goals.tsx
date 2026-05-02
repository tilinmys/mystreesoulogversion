import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  ArrowRight,
  Baby,
  Brain,
  Check,
  Droplets,
  Flower2,
  Heart,
  Leaf,
  MoonStar,
  MoreHorizontal,
  RefreshCcw,
  ShieldCheck,
  Smile,
  Sun,
  Utensils,
  type LucideIcon,
} from "lucide-react-native";
import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  ViewStyle,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { G, Path } from "react-native-svg";

import { preloadFounderQuoteImages } from "@/lib/image-preloader";
import { useAppStore } from "@/store/app-store";

// ── Brand palette ──────────────────────────────────────────────────────────────
const palette = {
  warmIvory: "#FFF8F5",
  white: "#FFFFFF",
  primaryText: "#2C2A29",
  secondaryText: "#8D8582",
  mutedText: "#A69B98",
  coral: "#FF7356",
  coralDeep: "#FF5A3D",
  coralSoft: "#FFF0EC",
  peachSoft: "#FFF2EC",
  line: "#E9DEDC",
  shadowTint: "#D98268",
  cardBorder: "#F5E0DA",
};

const softShadow = {
  shadowColor: palette.shadowTint,
  shadowOffset: { width: 0, height: 16 },
  shadowOpacity: 0.06,
  shadowRadius: 32,
  elevation: 6,
};

// ── Goal data ──────────────────────────────────────────────────────────────────
type GoalItem = {
  label: string;
  Icon: LucideIcon;
  /** Per-goal icon tint for the unselected state */
  tint: string;
};

const goalItems: GoalItem[] = [
  { label: "Track Cycle",       Icon: RefreshCcw, tint: "#F97316" },
  { label: "Manage PMS",        Icon: Smile,      tint: "#F59E0B" },
  { label: "Improve Sleep",     Icon: MoonStar,   tint: "#8B5CF6" },
  { label: "Reduce Stress",     Icon: Flower2,    tint: "#F97316" },
  { label: "Try to Conceive",   Icon: Heart,      tint: "#EC4899" },
  { label: "Understand Moods",  Icon: Brain,       tint: "#A855F7" },
  { label: "Pregnancy Support", Icon: Baby,       tint: "#10B981" },
  { label: "Boost Energy",      Icon: Sun,        tint: "#F59E0B" },
  { label: "Menopause Support", Icon: Leaf,       tint: "#14B8A6" },
  { label: "Hormonal Balance",  Icon: Flower2,    tint: "#EC4899" },
  { label: "Nutrition & Diet",  Icon: Utensils,   tint: "#A855F7" },
  { label: "Skin & Hair Health",Icon: Droplets,   tint: "#06B6D4" },
];

const defaultSelections = ["Track Cycle", "Improve Sleep", "Reduce Stress"];

// ── Decorative SVG components ──────────────────────────────────────────────────
function LeafDecoration() {
  return (
    <View pointerEvents="none" style={styles.leafDecoration}>
      <Svg width={112} height={160} viewBox="0 0 112 160">
        <G opacity={0.44}>
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

function Sparkle({ style }: { style: StyleProp<ViewStyle> }) {
  return (
    <View pointerEvents="none" style={style}>
      <Svg width={30} height={30} viewBox="0 0 24 24">
        <Path d="M12 1 L15 9 L23 12 L15 15 L12 23 L9 15 L1 12 L9 9Z" fill="#FFAA98" opacity={0.72} />
      </Svg>
    </View>
  );
}

function FeatherWatermark() {
  return (
    <View pointerEvents="none" style={styles.feather}>
      <Svg width={88} height={104} viewBox="0 0 88 104">
        <G opacity={0.42}>
          <Path d="M64 4 C82 28 75 57 47 84 C34 59 39 24 64 4Z" fill="#F8C7BE" />
          <Path d="M50 87 C58 65 63 43 64 14" stroke="#F7AA9C" strokeWidth={2} fill="none" />
          <Path d="M55 60 L30 74" stroke="#F7AA9C" strokeWidth={2} />
          <Path d="M60 42 L38 54" stroke="#F7AA9C" strokeWidth={2} />
          <Path d="M62 25 L46 34" stroke="#F7AA9C" strokeWidth={2} />
          <Path d="M75 86 L77 92 L83 94 L77 96 L75 102 L73 96 L67 94 L73 92Z" fill="#FFAA98" />
        </G>
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
        <View className="items-center justify-center" style={[styles.stepCircle, styles.stepCircleDone]}>
          <Check size={20} color={palette.white} strokeWidth={3} />
        </View>
      </View>
      <Text style={styles.stepText}>Step 3 of 3</Text>
    </View>
  );
}

// ── Goal Card (3-column grid tile) ─────────────────────────────────────────────
function GoalCard({
  goal,
  selected,
  cardSize,
  tileStyle,
  onPress,
}: {
  goal: GoalItem;
  selected: boolean;
  cardSize: number;
  tileStyle?: StyleProp<ViewStyle>;
  onPress: () => void;
}) {
  const Icon = goal.Icon;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={goal.label}
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.goalCard,
        { width: cardSize, height: cardSize },
        tileStyle,
        selected && styles.goalCardSelected,
        pressed && styles.pressed,
      ]}
    >
      {/* Selection badge */}
      {selected && (
        <View style={styles.checkBadge}>
          <Check size={12} color={palette.white} strokeWidth={3} />
        </View>
      )}

      {/* Icon container */}
      <View style={[styles.iconCircle, { backgroundColor: selected ? `${goal.tint}18` : `${goal.tint}14` }]}>
        <Icon size={28} color={goal.tint} strokeWidth={1.8} />
      </View>

      {/* Label */}
      <Text
        numberOfLines={2}
        adjustsFontSizeToFit
        minimumFontScale={0.82}
        style={[styles.goalText, selected && styles.goalTextSelected]}
      >
        {goal.label}
      </Text>
    </Pressable>
  );
}

// ── "Other" option ─────────────────────────────────────────────────────────────
function OtherOption({
  selected,
  onPress,
}: {
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Other"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={[styles.otherPill, selected && styles.otherPillSelected]}
    >
      <View style={[styles.otherRadio, selected && styles.otherRadioSelected]}>
        {selected && <View style={styles.otherRadioDot} />}
      </View>
      <Text style={[styles.otherText, selected && styles.otherTextSelected]}>Other</Text>
    </Pressable>
  );
}

// ── Main screen ────────────────────────────────────────────────────────────────
export default function GoalsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const selectedGoals = useAppStore((state) => state.selectedGoals);
  const toggleGoal = useAppStore((state) => state.toggleGoal);
  const hasSeenFounderQuotes = useAppStore((state) => state.hasSeenFounderQuotes);

  // 3-column grid sizing: screen width - 2*32 padding - 2*12 gap = available / 3
  const gridPad = 32;
  const gridGap = 12;
  const cardSize = Math.max(56, Math.min(104, Math.floor((width - gridPad * 2 - gridGap * 2) / 3)));
  const goalGridWidth = cardSize * 3 + gridGap * 2;

  const allLabels = useMemo(() => [...goalItems.map((g) => g.label), "Other"], []);

  const initialGoals = useMemo(() => {
    const matching = selectedGoals.filter((g) => allLabels.includes(g));
    return matching.length > 0 ? matching : defaultSelections;
  }, [selectedGoals, allLabels]);

  const [localGoals, setLocalGoals] = useState<string[]>(initialGoals);

  useEffect(() => preloadFounderQuoteImages(), []);

  const toggleLocalGoal = (label: string) => {
    setLocalGoals((current) =>
      current.includes(label) ? current.filter((item) => item !== label) : [...current, label],
    );
  };

  const completeSetup = () => {
    if (localGoals.length === 0) {
      Alert.alert("Choose one goal", "Select at least one wellness goal to personalize your setup.");
      return;
    }

    // Sync local state → Zustand store
    allLabels.forEach((label) => {
      const shouldBeSelected = localGoals.includes(label);
      const isSelected = selectedGoals.includes(label);
      if (shouldBeSelected !== isSelected) {
        toggleGoal(label);
      }
    });

    if (hasSeenFounderQuotes) {
      router.replace("/(tabs)/home");
      return;
    }
    router.push("/(onboarding)/founder-quotes");
  };

  return (
    <SafeAreaView className="flex-1" style={styles.screen} edges={["top", "left", "right"]}>
      <LeafDecoration />
      <Sparkle style={styles.sparkleOne} />
      <Sparkle style={styles.sparkleTwo} />
      <Sparkle style={styles.sparkleThree} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 136 }]}
      >
        <View style={{ paddingHorizontal: gridPad }}>
          <ProgressBar />

          <View style={styles.header}>
            <Text style={styles.title}>What are your{"\n"}primary goals?</Text>
            <Text style={styles.subtitle}>Select all that apply.</Text>
          </View>

          {/* ── 3-column grid ──────────────────────────────────── */}
          <View style={[styles.goalGrid, { width: goalGridWidth }]}>
            {goalItems.map((goal, index) => (
              <GoalCard
                key={goal.label}
                goal={goal}
                cardSize={cardSize}
                selected={localGoals.includes(goal.label)}
                tileStyle={{
                  marginRight: (index + 1) % 3 === 0 ? 0 : gridGap,
                  marginBottom: gridGap,
                }}
                onPress={() => toggleLocalGoal(goal.label)}
              />
            ))}
          </View>

          {/* ── Other pill ─────────────────────────────────────── */}
          <View style={styles.otherWrap}>
            <OtherOption
              selected={localGoals.includes("Other")}
              onPress={() => toggleLocalGoal("Other")}
            />
          </View>

          {/* ── Info card ──────────────────────────────────────── */}
          <View className="flex-row items-center" style={styles.infoCard}>
            <ShieldCheck size={40} color="#FF9D83" strokeWidth={1.9} />
            <View className="flex-1" style={styles.infoCopy}>
              <Text numberOfLines={1} ellipsizeMode="tail" style={styles.infoTitle}>
                Your wellness, your way.
              </Text>
              <Text style={styles.infoText}>
                You can update your goals anytime in Settings.{"\n"}Your data is always private and secure.
              </Text>
            </View>
            <FeatherWatermark />
          </View>
        </View>
      </ScrollView>

      {/* ── Sticky CTA ─────────────────────────────────────── */}
      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        <View style={{ paddingHorizontal: gridPad }}>
          <Pressable accessibilityRole="button" accessibilityLabel="Complete setup" onPress={completeSetup}>
            <LinearGradient
              colors={[palette.coral, palette.coralDeep]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.cta}
            >
              <Text style={styles.ctaText}>Complete Setup</Text>
              <ArrowRight size={32} color={palette.white} strokeWidth={2.3} style={styles.ctaIcon} />
            </LinearGradient>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

// ── Styles ──────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  screen: {
    backgroundColor: palette.warmIvory,
  },
  leafDecoration: {
    position: "absolute",
    top: 112,
    left: -8,
  },
  sparkleOne: { position: "absolute", top: 140, right: 36 },
  sparkleTwo: { position: "absolute", top: 168, right: 56 },
  sparkleThree: { position: "absolute", top: 152, right: 16 },
  scrollContent: {
    flexGrow: 1,
  },

  // ── Progress bar
  progressWrap: {
    paddingTop: 36,
    height: 120,
  },
  progressTrack: {
    position: "absolute",
    top: 60,
    width: 240,
    height: 4,
    borderRadius: 2,
    backgroundColor: palette.line,
  },
  progressFill: {
    position: "absolute",
    top: 60,
    left: "50%",
    marginLeft: -120,
    width: 240,
    height: 4,
    borderRadius: 2,
    backgroundColor: palette.coral,
  },
  progressDots: {
    width: 288,
  },
  stepCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: palette.warmIvory,
    borderWidth: 3,
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
    fontSize: 14,
    lineHeight: 20,
    marginTop: 10,
  },

  // ── Header
  header: {
    marginTop: 20,
  },
  title: {
    color: palette.primaryText,
    fontFamily: "Poppins_700Bold",
    fontSize: 32,
    lineHeight: 42,
    letterSpacing: -0.3,
  },
  subtitle: {
    color: palette.secondaryText,
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    lineHeight: 24,
    marginTop: 12,
  },

  // ── 3-column goal grid
  goalGrid: {
    alignSelf: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    marginTop: 28,
  },

  // ── Goal card tile
  goalCard: {
    backgroundColor: palette.white,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: palette.cardBorder,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingHorizontal: 6,
    paddingVertical: 12,
    position: "relative",
  },
  goalCardSelected: {
    borderColor: palette.coral,
    borderWidth: 2,
    backgroundColor: "#FFF8F5",
  },
  pressed: {
    transform: [{ scale: 0.96 }],
    opacity: 0.9,
  },

  // ── Selection check badge (top-right orange circle)
  checkBadge: {
    position: "absolute",
    top: -6,
    right: -6,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: palette.coral,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
    shadowColor: palette.coral,
    shadowOpacity: 0.35,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },

  // ── Icon circle inside card
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },

  // ── Card label
  goalText: {
    color: palette.primaryText,
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    lineHeight: 16,
    textAlign: "center",
  },
  goalTextSelected: {
    color: palette.coral,
    fontFamily: "Poppins_600SemiBold",
  },

  // ── "Other" pill
  otherWrap: {
    alignItems: "center",
    marginTop: 16,
  },
  otherPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: palette.cardBorder,
    backgroundColor: palette.white,
  },
  otherPillSelected: {
    borderColor: palette.coral,
    backgroundColor: "#FFF8F5",
  },
  otherRadio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: palette.line,
    alignItems: "center",
    justifyContent: "center",
  },
  otherRadioSelected: {
    borderColor: palette.coral,
  },
  otherRadioDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: palette.coral,
  },
  otherText: {
    color: palette.primaryText,
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    lineHeight: 20,
  },
  otherTextSelected: {
    color: palette.coral,
    fontFamily: "Poppins_600SemiBold",
  },

  // ── Info card
  infoCard: {
    minHeight: 120,
    borderRadius: 20,
    backgroundColor: palette.peachSoft,
    gap: 16,
    marginTop: 28,
    overflow: "hidden",
    padding: 20,
  },
  infoCopy: {
    paddingRight: 16,
  },
  infoTitle: {
    color: palette.primaryText,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 15,
    lineHeight: 22,
  },
  infoText: {
    color: palette.secondaryText,
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    lineHeight: 20,
    marginTop: 4,
  },
  feather: {
    position: "absolute",
    right: 4,
    bottom: 4,
  },

  // ── Footer / CTA
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
    fontSize: 20,
    lineHeight: 28,
  },
  ctaIcon: {
    position: "absolute",
    right: 32,
  },
});
