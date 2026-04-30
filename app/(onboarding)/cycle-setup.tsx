import {
  CalendarClock,
  HeartHandshake,
} from "lucide-react-native";
import { useRouter } from "expo-router";
import { useState, useRef, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
  Pressable,
  Animated,
} from "react-native";

import { SafeScreen } from "@/components/layout/SafeScreen";
import { AppCard } from "@/components/ui/AppCard";
import { OnboardingBackButton } from "@/components/ui/OnboardingBackButton";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { colors, radius, spacing } from "@/lib/design-tokens";
import { preloadFounderQuoteImages } from "@/lib/image-preloader";
import { strings } from "@/lib/strings";
import { useAppStore } from "@/store/app-store";

const MAX_CONTENT_WIDTH = 340;
const cycleOptions = [26, 28, 30, 32] as const;
const periodOptions = [3, 4, 5, 6, 7] as const;

export default function CycleSetupScreen() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const store = useAppStore();

  useEffect(() => preloadFounderQuoteImages(), []);
  const setCycleSetup = useAppStore((state) => state.setCycleSetup);
  const skipCycleSetup = useAppStore((state) => state.skipCycleSetup);
  const [userName, setUserName] = useState(store.userName === "Aarya" ? "" : store.userName);
  const [lastPeriodDate, setLastPeriodDate] = useState("This week");
  const [cycleLength, setCycleLength] = useState(store.cycleLength);
  const [periodLength, setPeriodLength] = useState(store.periodLength);
  const [doesNotTrackCycles, setDoesNotTrackCycles] = useState(false);
  const compactWidth = width < 380;
  const compactHeight = height < 720;
  const sidePadding = compactWidth ? spacing.lg : spacing.xl;
  const contentWidth = Math.max(272, Math.min(width - sidePadding * 2, MAX_CONTENT_WIDTH));

  const enterDashboard = () => {
    if (doesNotTrackCycles) {
      skipCycleSetup(userName);
    } else {
      setCycleSetup({
        userName,
        lastPeriodDate,
        cycleLength,
        periodLength,
      });
    }
    router.push("/(onboarding)/founder-quotes");
  };

  const skipSetup = () => {
    skipCycleSetup(userName);
    router.push("/(onboarding)/founder-quotes");
  };

  return (
    <SafeScreen bottomInset={false} keyboardAware contentStyle={[styles.content, { paddingHorizontal: sidePadding }]}>
      <OnboardingBackButton />
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scroll}
        style={{ flex: 1, flexDirection: 'column' }}
        keyboardDismissMode="on-drag"
      >
        <View style={[styles.header, { width: contentWidth }]}>
          <View style={[styles.iconHero, compactHeight ? styles.iconHeroCompact : null]}>
            <HeartHandshake size={34} color={colors.primaryOrange} strokeWidth={1.9} />
          </View>
          <Text style={[styles.title, compactWidth ? styles.titleCompact : null]}>
            {strings.onboarding.cycleSetup.title}
          </Text>
          <Text style={styles.subtitle}>{strings.onboarding.cycleSetup.subtitle}</Text>
        </View>

        <AppCard style={[styles.card, { width: contentWidth }]}>
          <Text style={styles.label}>{strings.onboarding.cycleSetup.nameLabel}</Text>
          <TextInput
            value={userName}
            onChangeText={setUserName}
            placeholder={strings.onboarding.cycleSetup.namePlaceholder}
            placeholderTextColor={colors.mutedText}
            style={styles.input}
            accessibilityLabel={strings.onboarding.cycleSetup.nameLabel}
          />
        </AppCard>

        <AppCard style={[styles.card, { width: contentWidth }]}>
          <View style={styles.cardTitleRow}>
            <CalendarClock size={19} color={colors.roseGold} strokeWidth={2.1} />
            <Text style={styles.label}>{strings.onboarding.cycleSetup.lastPeriodLabel}</Text>
          </View>
          <View style={styles.choiceWrap}>
            {strings.onboarding.cycleSetup.lastPeriodOptions.map((option) => (
              <ChoiceChip
                key={option}
                label={option}
                selected={lastPeriodDate === option && !doesNotTrackCycles}
                onPress={() => {
                  setDoesNotTrackCycles(false);
                  setLastPeriodDate(option);
                }}
              />
            ))}
          </View>
          <ChoiceChip
            label={strings.onboarding.cycleSetup.skipTracking}
            selected={doesNotTrackCycles}
            onPress={() => setDoesNotTrackCycles((value) => !value)}
            fullWidth
          />
        </AppCard>

        {!doesNotTrackCycles ? (
          <>
            <AppCard style={[styles.card, { width: contentWidth }]}>
              <Text style={styles.label}>{strings.onboarding.cycleSetup.cycleLengthLabel}</Text>
              <View style={styles.choiceWrap}>
                {cycleOptions.map((value) => (
                  <ChoiceChip
                    key={value}
                    label={`${value} days`}
                    selected={cycleLength === value}
                    onPress={() => setCycleLength(value)}
                  />
                ))}
                <ChoiceChip
                  label="Custom"
                  selected={!cycleOptions.includes(cycleLength as (typeof cycleOptions)[number])}
                  onPress={() => setCycleLength(29)}
                />
              </View>
            </AppCard>

            <AppCard style={[styles.card, { width: contentWidth }]}>
              <Text style={styles.label}>{strings.onboarding.cycleSetup.periodLengthLabel}</Text>
              <View style={styles.choiceWrap}>
                {periodOptions.map((value) => (
                  <ChoiceChip
                    key={value}
                    label={`${value} days`}
                    selected={periodLength === value}
                    onPress={() => setPeriodLength(value)}
                  />
                ))}
              </View>
              <Text style={styles.helper}>{strings.onboarding.cycleSetup.helper}</Text>
            </AppCard>
          </>
        ) : (
          <AppCard style={[styles.generalCard, { width: contentWidth }]}>
            <Text style={styles.generalTitle}>General wellness mode</Text>
            <Text style={styles.generalBody}>
              You can still use Bloop, the vault, and gentle daily check-ins without cycle tracking.
            </Text>
          </AppCard>
        )}
      </ScrollView>

      <View style={[styles.footer, { width: contentWidth, alignSelf: "center" }]}>
        <PrimaryButton label={strings.onboarding.cycleSetup.cta} onPress={enterDashboard} />
        <SecondaryButton
          label={strings.onboarding.cycleSetup.skipSetup}
          onPress={skipSetup}
          style={styles.secondary}
        />
      </View>
    </SafeScreen>
  );
}

function ChoiceChip({
  label,
  selected,
  onPress,
  fullWidth = false,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
  fullWidth?: boolean;
}) {
  const scale = useRef(new Animated.Value(1)).current;

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
      toValue: selected ? 1.02 : 1,
      useNativeDriver: true,
      speed: 30,
      bounciness: 8,
    }).start();
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ selected }}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={fullWidth ? styles.choiceFull : null}
    >
      <Animated.View
        style={[
          styles.choice,
          { transform: [{ scale }] },
          selected ? styles.choiceSelected : null,
        ]}
      >
        <Text style={[styles.choiceText, selected ? styles.choiceTextSelected : null]}>{label}</Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  content: {
    flexDirection: "column",
    paddingTop: spacing.lg,
    paddingBottom: 0,
    backgroundColor: colors.warmWhite,
  },
  scroll: {
    flexGrow: 1,
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: spacing.sm,
    gap: spacing.md,
  },
  header: {
    flexDirection: "column",
    alignItems: "center",
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },
  iconHero: {
    width: 64,
    height: 64,
    borderRadius: radius.large,
    backgroundColor: colors.backgroundWhite,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.peachGlow,
  },
  iconHeroCompact: {
    width: 56,
    height: 56,
  },
  title: {
    color: colors.primaryText,
    fontFamily: "Poppins_500Medium",
    fontSize: 28,
    lineHeight: 36,
    textAlign: "center",
    letterSpacing: 0,
  },
  titleCompact: {
    fontSize: 25,
    lineHeight: 33,
  },
  subtitle: {
    color: colors.secondaryText,
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
    lineHeight: 23,
    textAlign: "center",
    letterSpacing: 0,
  },
  card: {
    flexDirection: "column",
    gap: spacing.sm,
    padding: spacing.md,
  },
  cardTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  label: {
    color: colors.primaryText,
    fontFamily: "Poppins_500Medium",
    fontSize: 15,
    lineHeight: 21,
    letterSpacing: 0,
  },
  input: {
    minHeight: 52,
    borderRadius: 8,
    backgroundColor: colors.warmWhite,
    borderWidth: 1,
    borderColor: colors.divider,
    paddingHorizontal: spacing.md,
    color: colors.primaryText,
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: 0,
  },
  choiceWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xs,
  },
  choice: {
    minHeight: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.divider,
    backgroundColor: colors.backgroundWhite,
    paddingHorizontal: spacing.md,
    alignItems: "center",
    justifyContent: "center",
  },
  choiceFull: {
    alignSelf: "stretch",
  },
  choiceSelected: {
    backgroundColor: colors.peachGlow,
    borderColor: colors.primaryOrange,
  },
  choiceText: {
    color: colors.primaryText,
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0,
  },
  choiceTextSelected: {
    color: colors.primaryText,
  },
  helper: {
    color: colors.secondaryText,
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: 0,
  },
  generalCard: {
    flexDirection: "column",
    gap: spacing.xs,
    padding: spacing.md,
    backgroundColor: colors.peachGlow,
  },
  generalTitle: {
    color: colors.primaryText,
    fontFamily: "Poppins_500Medium",
    fontSize: 15,
    lineHeight: 21,
  },
  generalBody: {
    color: colors.secondaryText,
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    lineHeight: 20,
  },
  footer: {
    flexDirection: "column",
    gap: spacing.sm,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
    backgroundColor: colors.warmWhite,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
  },
  secondary: {
    borderWidth: 0,
    backgroundColor: "transparent",
    borderRadius: 8,
  },
});
