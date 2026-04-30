import {
  Activity,
  Baby,
  CalendarHeart,
  ChevronLeft,
  Dumbbell,
  HeartPulse,
  MoonStar,
  type LucideIcon,
} from "lucide-react-native";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import {
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { SafeScreen } from "@/components/layout/SafeScreen";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { colors, radius, shadows, spacing } from "@/lib/design-tokens";
import { preloadFounderQuoteImages } from "@/lib/image-preloader";
import { useAppStore } from "@/store/app-store";

type GoalItem = {
  label: string;
  Icon: LucideIcon;
  bubbleColor: string;
  iconColor: string;
};

const goals: GoalItem[] = [
  {
    label: "Track my cycle",
    Icon: CalendarHeart,
    bubbleColor: "#D1E4FF",
    iconColor: "#4B7CBF",
  },
  {
    label: "Plan a pregnancy",
    Icon: Baby,
    bubbleColor: "#FFD1DA",
    iconColor: "#CF5F78",
  },
  {
    label: "Monitor my health",
    Icon: HeartPulse,
    bubbleColor: "#D1F7E2",
    iconColor: "#2F8F60",
  },
  {
    label: "Improve sleep",
    Icon: MoonStar,
    bubbleColor: "#E5D1FF",
    iconColor: "#7C5DB8",
  },
  {
    label: "Manage stress",
    Icon: Activity,
    bubbleColor: "#FFDAB1",
    iconColor: "#C87920",
  },
  {
    label: "Daily activity",
    Icon: Dumbbell,
    bubbleColor: "#FFF1B1",
    iconColor: "#A98212",
  },
];

function GoalCard({
  item,
  selected,
  width,
  onToggle,
}: {
  item: GoalItem;
  selected: boolean;
  width: number;
  onToggle: (label: string) => void;
}) {
  const scale = useRef(new Animated.Value(1)).current;
  const Icon = item.Icon;

  const pressIn = () => {
    Animated.spring(scale, {
      toValue: 0.96,
      useNativeDriver: true,
      speed: 38,
      bounciness: 4,
    }).start();
  };

  const pressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 30,
      bounciness: 7,
    }).start();
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={item.label}
      accessibilityState={{ selected }}
      onPress={() => onToggle(item.label)}
      onPressIn={pressIn}
      onPressOut={pressOut}
    >
      <Animated.View
        style={[
          styles.card,
          { width, transform: [{ scale }] },
          selected ? styles.cardSelected : null,
        ]}
      >
        <View style={[styles.iconBubble, { backgroundColor: item.bubbleColor }]}>
          <Icon size={36} color={selected ? colors.primaryOrange : item.iconColor} strokeWidth={2.05} />
        </View>
        <Text numberOfLines={2} adjustsFontSizeToFit minimumFontScale={0.86} style={styles.cardLabel}>
          {item.label}
        </Text>
      </Animated.View>
    </Pressable>
  );
}

export default function GoalsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const selectedGoals = useAppStore((state) => state.selectedGoals);
  const toggleGoal = useAppStore((state) => state.toggleGoal);
  const { width, height } = useWindowDimensions();

  const compactWidth = width < 380;
  const compactHeight = height < 760;
  const sidePadding = compactWidth ? spacing.lg : spacing.xl;
  const contentWidth = Math.min(width - sidePadding * 2, 382);
  const cardGap = compactWidth ? spacing.sm : spacing.md;
  const cardWidth = (contentWidth - cardGap) / 2;
  const hasSelection = goals.some((goal) => selectedGoals.includes(goal.label));

  useEffect(() => preloadFounderQuoteImages(), []);

  return (
    <SafeScreen bottomInset={false} contentStyle={[styles.content, { paddingHorizontal: sidePadding }]}>
      <View style={[styles.topNav, { width: contentWidth }]}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          onPress={() => {
            if (router.canGoBack()) {
              router.back();
            } else {
              router.replace("/(onboarding)/how-it-works");
            }
          }}
          hitSlop={12}
          style={styles.backButton}
        >
          <ChevronLeft size={24} color="#1A1A1A" strokeWidth={2.2} />
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Log in"
          onPress={() => router.push("/(onboarding)/login")}
          hitSlop={12}
          style={styles.loginButton}
        >
          <Text style={styles.loginText}>Log in</Text>
        </Pressable>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={[
          styles.scrollContent,
          {
            minHeight: compactHeight ? undefined : height - 176,
            paddingBottom: spacing.lg,
          },
        ]}
      >
        <View style={[styles.header, { width: contentWidth }]}>
          <Text style={[styles.title, compactWidth ? styles.titleCompact : null]}>
            What can we help you do?
          </Text>
          <Text style={styles.subtitle}>Choose as many as you'd like.</Text>
        </View>

        <View style={[styles.grid, { width: contentWidth, gap: cardGap }]}>
          {goals.map((goal) => (
            <GoalCard
              key={goal.label}
              item={goal}
              selected={selectedGoals.includes(goal.label)}
              width={cardWidth}
              onToggle={toggleGoal}
            />
          ))}
        </View>
      </ScrollView>

      <View style={[styles.footer, { width: contentWidth, paddingBottom: Math.max(insets.bottom, spacing.md) }]}>
        <PrimaryButton
          label="Continue"
          disabled={!hasSelection}
          onPress={() => router.push("/(onboarding)/cycle-setup")}
          style={styles.continueButton}
          textStyle={styles.continueText}
        />
      </View>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.backgroundWhite,
    paddingTop: spacing.sm,
    paddingBottom: 0,
  },
  topNav: {
    minHeight: 44,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  loginButton: {
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.xs,
  },
  loginText: {
    color: "#1A1A1A",
    fontFamily: "Poppins_500Medium",
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 0,
  },
  scrollView: {
    flex: 1,
    width: "100%",
  },
  scrollContent: {
    alignItems: "center",
    flexGrow: 1,
  },
  header: {
    alignItems: "center",
    marginTop: spacing.sm,
    marginBottom: spacing.xxl,
  },
  title: {
    color: "#1A1A1A",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 32,
    lineHeight: 40,
    letterSpacing: 0,
    textAlign: "center",
  },
  titleCompact: {
    fontSize: 29,
    lineHeight: 37,
  },
  subtitle: {
    color: "#4A4A4A",
    fontFamily: "Poppins_400Regular",
    fontSize: 18,
    lineHeight: 26,
    marginTop: spacing.xs,
    textAlign: "center",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  card: {
    aspectRatio: 1,
    borderRadius: radius.large,
    backgroundColor: colors.backgroundWhite,
    padding: spacing.md,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(241, 230, 221, 0.7)",
    ...shadows.card,
  },
  cardSelected: {
    borderColor: colors.primaryOrange,
    backgroundColor: colors.orangeSoftSurface,
  },
  iconBubble: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.sm,
  },
  cardLabel: {
    color: "#1A1A1A",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0,
    textAlign: "center",
  },
  footer: {
    paddingTop: spacing.sm,
    backgroundColor: colors.backgroundWhite,
  },
  continueButton: {
    shadowOpacity: 0,
    elevation: 0,
  },
  continueText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    lineHeight: 26,
  },
});
