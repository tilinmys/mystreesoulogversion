import DateTimePicker, { type DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  ArrowRight,
  Baby,
  Brain,
  CalendarDays,
  Check,
  ChevronDown,
  Droplet,
  Flower2,
  Heart,
  MoonStar,
  MoreHorizontal,
  RefreshCcw,
  Shield,
  ShieldCheck,
  Smile,
  Sun,
  TrendingUp,
  Utensils,
  User,
  type LucideIcon,
} from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
  ViewStyle,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { G, Path } from "react-native-svg";

import { preloadFounderQuoteImages } from "@/lib/image-preloader";
import { useAppStore } from "@/store/app-store";

const palette = {
  background: "#FFF8F5",
  white: "#FFFFFF",
  primaryText: "#2C2A29",
  secondaryText: "#8D8582",
  mutedText: "#A69B98",
  coral: "#FF7356",
  coralDeep: "#FF5A3D",
  coralSoft: "#FFF0EC",
  palePeach: "#FFF3EE",
  line: "#E9DEDC",
  inputLine: "#EBDDD9",
  shadowTint: "#FF7F50",
};

const cardShadow = {
  shadowColor: palette.shadowTint,
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 0.1,
  shadowRadius: 16,
  elevation: 5,
};

const activeShadow = {
  shadowColor: palette.shadowTint,
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 0.2,
  shadowRadius: 16,
  elevation: 8,
};

type PickerTarget = "birth" | "lastPeriod";

type Goal = {
  label: string;
  Icon: LucideIcon;
  iconColor: string;
  bubbleColor: string;
};

const cycleLengths = Array.from({ length: 25 }, (_, index) => index + 21);
const periodLengths = Array.from({ length: 8 }, (_, index) => 3 + index);

const goals: Goal[] = [
  { label: "Track Cycle", Icon: RefreshCcw, iconColor: "#F06B80", bubbleColor: "#FDE9EC" },
  { label: "Manage PMS", Icon: Smile, iconColor: "#B17DE8", bubbleColor: "#F2E8FF" },
  { label: "Improve Sleep", Icon: MoonStar, iconColor: "#A56EE9", bubbleColor: "#F4E8FF" },
  { label: "Reduce Stress", Icon: Flower2, iconColor: "#F2A07D", bubbleColor: "#FFF0E8" },
  { label: "Try to Conceive", Icon: Heart, iconColor: "#EF7890", bubbleColor: "#FDEBF0" },
  { label: "Understand\nMoods", Icon: Brain, iconColor: "#A985F0", bubbleColor: "#F1E9FF" },
  { label: "Pregnancy\nSupport", Icon: Baby, iconColor: "#73CFAD", bubbleColor: "#EAF8F2" },
  { label: "Boost Energy", Icon: Sun, iconColor: "#EFB51C", bubbleColor: "#FFF6E5" },
  { label: "Menopause\nSupport", Icon: User, iconColor: "#6BD2B8", bubbleColor: "#E8F8F4" },
  { label: "Hormonal\nBalance", Icon: Shield, iconColor: "#F47B96", bubbleColor: "#FDEAF0" },
  { label: "Nutrition\n& Diet", Icon: Utensils, iconColor: "#B591F2", bubbleColor: "#F1E9FF" },
  { label: "Skin & Hair\nHealth", Icon: Droplet, iconColor: "#7BC7EF", bubbleColor: "#EAF7FF" },
];

const defaultGoals = ["Track Cycle", "Improve Sleep", "Reduce Stress"];

function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function goalKey(label: string) {
  return label.replace(/\n/g, " ");
}

function safeOption(value: number, options: number[], fallback: number) {
  const roundedValue = Number.isFinite(value) ? Math.round(value) : fallback;
  return options.includes(roundedValue) ? roundedValue : fallback;
}

function LeafGraphic() {
  return (
    <View pointerEvents="none" style={styles.leafGraphic}>
      <Svg width={120} height={168} viewBox="0 0 120 168">
        <G opacity={0.5}>
          <Path d="M-6 158 C23 105 50 56 98 8" stroke="#F8B9AD" strokeWidth={3} fill="none" />
          <Path d="M16 103 C4 84 9 63 28 50 C42 72 39 91 16 103Z" fill="#F8CEC6" />
          <Path d="M35 74 C23 52 30 32 54 20 C63 45 57 64 35 74Z" fill="#F8CEC6" />
          <Path d="M58 47 C51 24 62 8 86 1 C91 27 81 43 58 47Z" fill="#F8CEC6" />
          <Path d="M9 132 C31 116 54 116 78 128 C55 147 29 146 9 132Z" fill="#F8CEC6" />
        </G>
      </Svg>
    </View>
  );
}

function Sparkles() {
  return (
    <View pointerEvents="none" style={styles.sparkles}>
      <Svg width={80} height={80} viewBox="0 0 80 80">
        <Path d="M54 8 L59 23 L74 28 L59 33 L54 48 L49 33 L34 28 L49 23Z" fill="#FFAA98" opacity={0.58} />
        <Path d="M22 22 L25 31 L34 34 L25 37 L22 46 L19 37 L10 34 L19 31Z" fill="#FFAA98" opacity={0.54} />
        <Path d="M62 52 L65 61 L74 64 L65 67 L62 76 L59 67 L50 64 L59 61Z" fill="#FFAA98" opacity={0.64} />
      </Svg>
    </View>
  );
}

function RightLeafGraphic() {
  return (
    <View pointerEvents="none" style={styles.rightLeafGraphic}>
      <Svg width={120} height={168} viewBox="0 0 120 168">
        <G opacity={0.34}>
          <Path d="M118 158 C89 105 62 56 14 8" stroke="#F8B9AD" strokeWidth={3} fill="none" />
          <Path d="M98 103 C110 84 105 63 86 50 C72 72 75 91 98 103Z" fill="#F8CEC6" />
          <Path d="M79 74 C91 52 84 32 60 20 C51 45 57 64 79 74Z" fill="#F8CEC6" />
          <Path d="M55 47 C62 24 51 8 27 1 C22 27 32 43 55 47Z" fill="#F8CEC6" />
          <Path d="M111 132 C89 116 66 116 42 128 C65 147 91 146 111 132Z" fill="#F8CEC6" />
        </G>
      </Svg>
    </View>
  );
}

function FeatherWatermark() {
  return (
    <View pointerEvents="none" style={styles.featherWatermark}>
      <Svg width={96} height={112} viewBox="0 0 96 112">
        <G opacity={0.38}>
          <Path d="M70 5 C89 32 81 63 50 93 C35 65 43 27 70 5Z" fill="#F8C7BE" />
          <Path d="M53 96 C62 72 68 47 70 16" stroke="#F7AA9C" strokeWidth={2} fill="none" />
          <Path d="M58 67 L31 82" stroke="#F7AA9C" strokeWidth={2} />
          <Path d="M64 47 L40 60" stroke="#F7AA9C" strokeWidth={2} />
          <Path d="M67 29 L49 39" stroke="#F7AA9C" strokeWidth={2} />
          <Path d="M82 91 L84 97 L90 99 L84 101 L82 107 L80 101 L74 99 L80 97Z" fill="#FFAA98" />
        </G>
      </Svg>
    </View>
  );
}

function StepProgress({ step }: { step: number }) {
  return (
    <View className="items-center" style={styles.progressWrap}>
      <View style={styles.progressTrack} />
      <View style={[styles.progressFill, { width: step === 3 ? 240 : 120 }]} />
      <View className="flex-row items-center justify-between" style={styles.progressDots}>
        {[1, 2, 3].map((item) => {
          const active = item <= step;
          return (
            <View
              key={item}
              className="items-center justify-center"
              style={[styles.progressNode, active ? styles.progressNodeActive : null]}
            >
              {active ? (
                <Check size={18} color={palette.white} strokeWidth={3} />
              ) : (
                <Text style={styles.progressNumber}>{item}</Text>
              )}
            </View>
          );
        })}
      </View>
      <Text style={styles.progressLabel}>Step {step} of 3</Text>
    </View>
  );
}

function DateButton({
  label,
  value,
  onPress,
  large,
}: {
  label: string;
  value?: Date;
  onPress: () => void;
  large?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      className="flex-row items-center bg-white"
      style={[styles.dateCard, large ? styles.dateCardLarge : null]}
    >
      <View className="items-center justify-center" style={styles.dateIconBubble}>
        <CalendarDays size={26} color={palette.coral} strokeWidth={2.1} />
      </View>
      <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.dateText, value ? styles.dateTextSelected : null]}>
        {value ? formatDate(value) : label}
      </Text>
      <ChevronDown size={28} color={palette.coral} strokeWidth={2.4} />
    </Pressable>
  );
}

function Header({ step }: { step: number }) {
  const title =
    step === 1
      ? "Let's get to know you."
      : step === 2
        ? "Tell us about your cycle."
        : "What are your\nprimary goals?";
  const subtitle =
    step === 1
      ? "This helps us personalize your experience."
      : step === 2
        ? "This helps us personalize your insights and predictions."
        : "Select all that apply.";

  return (
    <View style={[styles.header, step === 3 ? styles.headerCentered : null]}>
      <Text style={[styles.title, step === 3 ? styles.titleCentered : null]}>{title}</Text>
      <Text style={[styles.subtitle, step === 3 ? styles.subtitleCentered : null]}>{subtitle}</Text>
    </View>
  );
}

function SectionLabel({ title, helper }: { title: string; helper?: string }) {
  return (
    <View>
      <Text style={styles.sectionLabel}>{title}</Text>
      {helper ? <Text style={styles.sectionHelper}>{helper}</Text> : null}
    </View>
  );
}

function NumberScroller({
  title,
  helper,
  values,
  selected,
  onSelect,
}: {
  title: string;
  helper: string;
  values: number[];
  selected: number;
  onSelect: (value: number) => void;
}) {
  return (
    <View style={styles.rhythmSection}>
      <SectionLabel title={title} helper={helper} />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.numberContent}
      >
        {values.map((value) => {
          const active = value === selected;
          return (
            <Pressable
              key={value}
              accessibilityRole="button"
              accessibilityLabel={`${value} days`}
              accessibilityState={{ selected: active }}
              onPress={() => onSelect(value)}
              className="items-center justify-center"
              style={styles.numberHitArea}
            >
              <View className="items-center justify-center" style={[styles.numberChip, active ? styles.numberChipActive : null]}>
                <Text style={[styles.numberText, active ? styles.numberTextActive : null]}>{value}</Text>
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
      <View className="items-center justify-center self-center" style={styles.daysBadge}>
        <Text style={styles.daysText}>days</Text>
      </View>
    </View>
  );
}

function GoalCard({
  goal,
  active,
  size,
  tileStyle,
  onPress,
}: {
  goal: Goal;
  active: boolean;
  size: number;
  tileStyle?: StyleProp<ViewStyle>;
  onPress: () => void;
}) {
  const Icon = goal.Icon;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={goal.label}
      accessibilityState={{ selected: active }}
      onPress={onPress}
      className="items-center justify-center bg-white"
      style={[
        styles.goalCard,
        { width: size, height: size },
        tileStyle,
        active ? styles.goalCardActive : null,
      ]}
    >
      {active ? (
        <View className="items-center justify-center" style={styles.goalCardCheck}>
          <Check size={18} color={palette.white} strokeWidth={3} />
        </View>
      ) : null}
      <View className="items-center justify-center" style={[styles.goalIconBubble, { backgroundColor: goal.bubbleColor }]}>
        <Icon size={34} color={goal.iconColor} strokeWidth={2.2} />
      </View>
      <Text
        numberOfLines={2}
        ellipsizeMode="tail"
        adjustsFontSizeToFit
        minimumFontScale={0.86}
        style={styles.goalCardText}
      >
        {goal.label}
      </Text>
    </Pressable>
  );
}

function OtherGoalCard({
  active,
  onPress,
}: {
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Other"
      accessibilityState={{ selected: active }}
      onPress={onPress}
      className="flex-row items-center justify-center bg-white"
      style={[styles.otherGoalCard, active ? styles.goalCardActive : null]}
    >
      {active ? (
        <View className="items-center justify-center" style={styles.otherCheck}>
          <Check size={14} color={palette.white} strokeWidth={3} />
        </View>
      ) : (
        <MoreHorizontal size={24} color="#8F8B89" strokeWidth={2.3} />
      )}
      <Text style={styles.otherGoalText}>Other</Text>
    </Pressable>
  );
}

export default function UserSetupScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width: viewportWidth } = useWindowDimensions();
  const store = useAppStore();
  const setCycleSetup = useAppStore((state) => state.setCycleSetup);
  const updateProfile = useAppStore((state) => state.updateProfile);
  const toggleGoal = useAppStore((state) => state.toggleGoal);
  const hasSeenFounderQuotes = useAppStore((state) => state.hasSeenFounderQuotes);

  const [step, setStep] = useState(1);
  const [name, setName] = useState(store.userName || "");
  const [nameFocused, setNameFocused] = useState(false);
  const [birthDate, setBirthDate] = useState<Date | undefined>(undefined);
  const [lastPeriodDate, setLastPeriodDate] = useState<Date | undefined>(new Date(2024, 4, 12));
  const [cycleLength, setCycleLength] = useState(safeOption(store.cycleLength, cycleLengths, 28));
  const [periodLength, setPeriodLength] = useState(safeOption(store.periodLength, periodLengths, 5));
  const [selectedGoals, setSelectedGoals] = useState<string[]>(defaultGoals);
  const [pickerTarget, setPickerTarget] = useState<PickerTarget | null>(null);
  const [draftDate, setDraftDate] = useState(new Date(2000, 0, 1));

  useEffect(() => preloadFounderQuoteImages(), []);

  const pickerTitle = pickerTarget === "birth" ? "Date of Birth" : "Last Period Start Date";
  const goalGridGap = 12;
  const goalGridWidth = Math.max(192, viewportWidth - 64);
  const goalCardSize = Math.max(56, Math.min(104, Math.floor((goalGridWidth - goalGridGap * 2) / 3)));
  const resolvedGoalGridWidth = goalCardSize * 3 + goalGridGap * 2;

  const openPicker = (target: PickerTarget) => {
    setPickerTarget(target);
    setDraftDate(target === "birth" ? birthDate ?? new Date(2000, 0, 1) : lastPeriodDate ?? new Date());
  };

  const closePicker = () => setPickerTarget(null);

  const confirmPicker = () => {
    if (pickerTarget === "birth") {
      setBirthDate(draftDate);
    }
    if (pickerTarget === "lastPeriod") {
      setLastPeriodDate(draftDate);
    }
    closePicker();
  };

  const onPickerChange = (_event: DateTimePickerEvent, selected?: Date) => {
    if (!selected) {
      if (Platform.OS === "android") {
        closePicker();
      }
      return;
    }

    setDraftDate(selected);
    if (Platform.OS === "android") {
      if (pickerTarget === "birth") {
        setBirthDate(selected);
      }
      if (pickerTarget === "lastPeriod") {
        setLastPeriodDate(selected);
      }
      closePicker();
    }
  };

  const toggleLocalGoal = (goal: string) => {
    setSelectedGoals((current) =>
      current.includes(goal) ? current.filter((item) => item !== goal) : [...current, goal],
    );
  };

  const completeSetup = () => {
    const finalName = name.trim() || "beautiful";

    updateProfile({
      userName: finalName,
      dateOfBirth: birthDate ? formatDate(birthDate) : store.dateOfBirth,
    });

    setCycleSetup({
      userName: finalName,
      lastPeriodDate: lastPeriodDate ? formatDate(lastPeriodDate) : "May 12, 2024",
      cycleLength,
      periodLength,
    });

    goals.forEach((goal) => {
      const key = goalKey(goal.label);
      const shouldSelect = selectedGoals.includes(key);
      const isSelected = store.selectedGoals.includes(key);
      if (shouldSelect !== isSelected) {
        toggleGoal(key);
      }
    });
    if (selectedGoals.includes("Other") !== store.selectedGoals.includes("Other")) {
      toggleGoal("Other");
    }

    router.replace(hasSeenFounderQuotes ? "/(tabs)/home" : "/(onboarding)/founder-quotes");
  };

  const goNext = () => {
    if (step < 3) {
      setStep((current) => current + 1);
      return;
    }
    completeSetup();
  };

  return (
    <SafeAreaView className="flex-1" style={styles.screen} edges={["top", "left", "right"]}>
      <LeafGraphic />
      <Sparkles />
      {step === 3 ? <RightLeafGraphic /> : null}

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 136 }]}
        >
          <View className="px-8">
            <StepProgress step={step} />
            <Header step={step} />

            {step === 1 ? (
              <View style={styles.stepOneContent}>
                <View style={styles.formSection}>
                  <SectionLabel title="Preferred Name" />
                  <View
                    className="flex-row items-center bg-white"
                    style={[styles.nameCard, nameFocused ? styles.inputFocused : null]}
                  >
                    <User size={28} color={palette.coral} strokeWidth={2} />
                    <View className="flex-1" style={styles.inputInnerLine}>
                      <TextInput
                        value={name}
                        onChangeText={setName}
                        onFocus={() => setNameFocused(true)}
                        onBlur={() => setNameFocused(false)}
                        placeholder="Enter your name"
                        placeholderTextColor={palette.mutedText}
                        autoCapitalize="words"
                        returnKeyType="done"
                        style={styles.nameInput}
                      />
                    </View>
                  </View>
                </View>

                <View style={styles.formSection}>
                  <SectionLabel title="Date of Birth" helper="You must be 18 years or older to continue." />
                  <DateButton
                    label="Select your date of birth"
                    value={birthDate}
                    onPress={() => openPicker("birth")}
                    large
                  />
                </View>

                <View className="flex-row items-center" style={styles.trustCard}>
                  <ShieldCheck size={36} color={palette.coral} strokeWidth={1.9} />
                  <Text style={styles.trustText}>Your data is private and stored securely on your device.</Text>
                </View>
              </View>
            ) : null}

            {step === 2 ? (
              <View style={styles.stepTwoContent}>
                <NumberScroller
                  title="Average Cycle Length"
                  helper="Select the average number of days in your cycle."
                  values={cycleLengths}
                  selected={cycleLength}
                  onSelect={setCycleLength}
                />
                <NumberScroller
                  title="Average Period Duration"
                  helper="Select the average number of days your period lasts."
                  values={periodLengths}
                  selected={periodLength}
                  onSelect={setPeriodLength}
                />
                <View style={styles.formSection}>
                  <SectionLabel title="When did your last cycle start?" />
                  <DateButton
                    label="Select last cycle start date"
                    value={lastPeriodDate}
                    onPress={() => openPicker("lastPeriod")}
                  />
                </View>
                <View className="flex-row items-center" style={styles.trustCard}>
                  <ShieldCheck size={34} color={palette.coral} strokeWidth={1.9} />
                  <View className="flex-1">
                    <Text style={styles.trustTitle}>Your data is private and secure.</Text>
                    <Text style={styles.trustTextSmall}>We only use this to personalize your experience.</Text>
                  </View>
                </View>
              </View>
            ) : null}

            {step === 3 ? (
              <View style={styles.stepThreeContent}>
                <View style={[styles.goalGrid, { width: resolvedGoalGridWidth }]}>
                  {goals.map((goal, index) => (
                    <GoalCard
                      key={goal.label}
                      goal={goal}
                      active={selectedGoals.includes(goalKey(goal.label))}
                      size={goalCardSize}
                      tileStyle={{
                        marginRight: (index + 1) % 3 === 0 ? 0 : goalGridGap,
                        marginBottom: goalGridGap,
                      }}
                      onPress={() => toggleLocalGoal(goalKey(goal.label))}
                    />
                  ))}
                </View>
                <OtherGoalCard
                  active={selectedGoals.includes("Other")}
                  onPress={() => toggleLocalGoal("Other")}
                />
                <View className="flex-row items-center" style={styles.priorityCard}>
                  <View className="items-center justify-center" style={styles.priorityIconBubble}>
                    <ShieldCheck size={34} color={palette.coral} strokeWidth={1.9} />
                  </View>
                  <View className="flex-1" style={styles.priorityCopy}>
                    <Text numberOfLines={1} ellipsizeMode="tail" style={styles.priorityTitle}>
                      Your wellness, your way.
                    </Text>
                    <Text style={styles.priorityText}>
                      You can update your goals anytime in Settings.{"\n"}Your data is always private and secure.
                    </Text>
                  </View>
                  <FeatherWatermark />
                </View>
              </View>
            ) : null}
          </View>
        </ScrollView>

        <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
          <View className="px-8">
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={step === 3 ? "Complete setup" : "Next"}
              disabled={step === 3 && selectedGoals.length === 0}
              onPress={goNext}
              style={step === 3 && selectedGoals.length === 0 ? styles.disabledPressable : null}
            >
              <LinearGradient
                colors={["#FF7048", "#FF3F43"]}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={styles.cta}
              >
                <Text style={styles.ctaText}>{step === 3 ? "Complete Setup" : "Next"}</Text>
                <ArrowRight size={30} color={palette.white} strokeWidth={2.4} style={styles.ctaIcon} />
              </LinearGradient>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>

      <Modal visible={pickerTarget !== null} transparent animationType="fade" onRequestClose={closePicker}>
        <View className="flex-1 justify-end" style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View className="flex-row items-center justify-between" style={styles.modalHeader}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Cancel date picker"
                onPress={closePicker}
                style={styles.modalAction}
              >
                <Text style={styles.modalActionText}>Cancel</Text>
              </Pressable>
              <Text style={styles.modalTitle}>{pickerTitle}</Text>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Confirm date"
                onPress={confirmPicker}
                style={styles.modalAction}
              >
                <Text style={[styles.modalActionText, styles.modalDoneText]}>Done</Text>
              </Pressable>
            </View>
            <DateTimePicker
              value={draftDate}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              maximumDate={new Date()}
              onChange={onPickerChange}
              style={styles.picker}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: palette.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  leafGraphic: {
    position: "absolute",
    top: 96,
    left: -16,
    zIndex: 0,
  },
  rightLeafGraphic: {
    position: "absolute",
    top: 292,
    right: -28,
    zIndex: 0,
  },
  sparkles: {
    position: "absolute",
    top: 216,
    right: 32,
    zIndex: 0,
  },
  progressWrap: {
    height: 136,
    paddingTop: 48,
  },
  progressTrack: {
    position: "absolute",
    top: 72,
    alignSelf: "center",
    width: 240,
    height: 4,
    borderRadius: 2,
    backgroundColor: palette.line,
  },
  progressFill: {
    position: "absolute",
    top: 72,
    left: "50%",
    marginLeft: -120,
    height: 4,
    borderRadius: 2,
    backgroundColor: palette.coral,
  },
  progressDots: {
    alignSelf: "center",
    width: 288,
  },
  progressNode: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: palette.line,
    backgroundColor: palette.white,
  },
  progressNodeActive: {
    borderColor: palette.coral,
    backgroundColor: palette.coral,
    ...activeShadow,
  },
  progressNumber: {
    color: palette.secondaryText,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    lineHeight: 20,
  },
  progressLabel: {
    color: palette.coral,
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    lineHeight: 18,
    marginTop: 16,
  },
  header: {
    marginTop: 24,
  },
  headerCentered: {
    alignItems: "center",
    marginTop: 32,
  },
  title: {
    color: palette.primaryText,
    fontFamily: "Poppins_800ExtraBold",
    fontSize: 36,
    lineHeight: 44,
    letterSpacing: 0,
  },
  titleCentered: {
    textAlign: "center",
  },
  subtitle: {
    color: palette.secondaryText,
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0,
    marginTop: 16,
  },
  subtitleCentered: {
    textAlign: "center",
  },
  stepOneContent: {
    gap: 32,
    marginTop: 48,
  },
  stepTwoContent: {
    gap: 40,
    marginTop: 48,
  },
  stepThreeContent: {
    marginTop: 40,
  },
  formSection: {
    gap: 12,
  },
  sectionLabel: {
    color: palette.primaryText,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0,
  },
  sectionHelper: {
    color: palette.secondaryText,
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: 0,
    marginTop: 4,
  },
  nameCard: {
    minHeight: 88,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "transparent",
    gap: 24,
    paddingHorizontal: 24,
    ...cardShadow,
  },
  inputFocused: {
    borderColor: palette.coral,
  },
  inputInnerLine: {
    borderBottomWidth: 1,
    borderBottomColor: palette.inputLine,
    paddingBottom: 8,
  },
  nameInput: {
    color: palette.primaryText,
    fontFamily: "Poppins_400Regular",
    fontSize: 18,
    lineHeight: 26,
    padding: 0,
  },
  dateCard: {
    minHeight: 72,
    borderRadius: 24,
    gap: 18,
    paddingHorizontal: 24,
    ...cardShadow,
  },
  dateCardLarge: {
    minHeight: 88,
  },
  dateIconBubble: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: palette.coralSoft,
  },
  dateText: {
    flex: 1,
    color: palette.primaryText,
    fontFamily: "Poppins_500Medium",
    fontSize: 18,
    lineHeight: 26,
    letterSpacing: 0,
  },
  dateTextSelected: {
    color: palette.primaryText,
  },
  trustCard: {
    minHeight: 96,
    borderRadius: 20,
    backgroundColor: palette.palePeach,
    gap: 24,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  trustTitle: {
    color: palette.primaryText,
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0,
  },
  trustText: {
    flex: 1,
    color: palette.primaryText,
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    lineHeight: 24,
    letterSpacing: 0,
  },
  trustTextSmall: {
    color: palette.secondaryText,
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    lineHeight: 21,
    letterSpacing: 0,
    marginTop: 2,
  },
  rhythmSection: {
    gap: 16,
  },
  numberContent: {
    gap: 12,
    paddingRight: 32,
  },
  numberHitArea: {
    width: 48,
    height: 48,
  },
  numberChip: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: palette.line,
    backgroundColor: palette.white,
  },
  numberChipActive: {
    borderColor: palette.coral,
    backgroundColor: palette.coral,
    ...activeShadow,
  },
  numberText: {
    color: palette.primaryText,
    fontFamily: "Poppins_500Medium",
    fontSize: 15,
    lineHeight: 22,
  },
  numberTextActive: {
    color: palette.white,
    fontFamily: "Poppins_700Bold",
    fontSize: 18,
  },
  daysBadge: {
    minHeight: 32,
    borderRadius: 16,
    backgroundColor: palette.coralSoft,
    paddingHorizontal: 16,
  },
  daysText: {
    color: palette.coral,
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    lineHeight: 20,
  },
  goalGrid: {
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  goalCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: palette.line,
    backgroundColor: palette.white,
    paddingHorizontal: 8,
    paddingVertical: 12,
    ...cardShadow,
  },
  goalCardActive: {
    borderColor: palette.coral,
    ...activeShadow,
  },
  goalCardCheck: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: palette.coral,
    zIndex: 2,
    ...activeShadow,
  },
  goalIconBubble: {
    width: 54,
    height: 54,
    borderRadius: 27,
    marginBottom: 8,
  },
  goalCardText: {
    color: palette.primaryText,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0,
    textAlign: "center",
  },
  otherGoalCard: {
    alignSelf: "center",
    width: 176,
    height: 48,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: palette.line,
    gap: 8,
    marginTop: 16,
    ...cardShadow,
  },
  otherCheck: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: palette.coral,
  },
  otherGoalText: {
    color: palette.primaryText,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0,
  },
  priorityCard: {
    minHeight: 104,
    borderRadius: 24,
    backgroundColor: palette.palePeach,
    gap: 16,
    marginTop: 32,
    overflow: "hidden",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  priorityIconBubble: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: palette.coralSoft,
  },
  priorityCopy: {
    paddingRight: 24,
  },
  priorityTitle: {
    color: palette.primaryText,
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0,
  },
  priorityText: {
    color: palette.secondaryText,
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0,
    marginTop: 8,
  },
  featherWatermark: {
    position: "absolute",
    right: 8,
    bottom: 8,
  },
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: 16,
    backgroundColor: "rgba(255, 255, 255, 0.96)",
  },
  cta: {
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    ...activeShadow,
  },
  ctaText: {
    color: palette.white,
    fontFamily: "Poppins_700Bold",
    fontSize: 18,
    lineHeight: 26,
    letterSpacing: 0,
  },
  ctaIcon: {
    position: "absolute",
    right: 24,
  },
  disabledPressable: {
    opacity: 0.5,
  },
  modalOverlay: {
    backgroundColor: "rgba(44, 42, 41, 0.28)",
  },
  modalCard: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: palette.white,
    paddingBottom: 24,
    ...cardShadow,
  },
  modalHeader: {
    minHeight: 56,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: palette.line,
    paddingHorizontal: 8,
  },
  modalAction: {
    minWidth: 72,
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  modalActionText: {
    color: palette.secondaryText,
    fontFamily: "Poppins_500Medium",
    fontSize: 15,
  },
  modalDoneText: {
    color: palette.coral,
  },
  modalTitle: {
    color: palette.primaryText,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    lineHeight: 24,
  },
  picker: {
    width: "100%",
  },
});
