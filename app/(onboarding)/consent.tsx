import { Circle, CheckCircle2, FileText } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

import { SafeScreen } from "@/components/layout/SafeScreen";
import { OnboardingBackButton } from "@/components/ui/OnboardingBackButton";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { colors, radius, shadows, spacing } from "@/lib/design-tokens";
import { strings } from "@/lib/strings";
import { useAppStore } from "@/store/app-store";

const MAX_CONTENT_WIDTH = 340;

export default function ConsentScreen() {
  const router = useRouter();
  const acceptConsent = useAppStore((state) => state.acceptConsent);
  const [hasAgreed, setHasAgreed] = useState(false);

  const { width, height } = useWindowDimensions();
  const compactWidth = width < 380;
  const compactHeight = height < 720;
  const sidePadding = compactWidth ? spacing.lg : spacing.xl;
  const contentWidth = Math.max(272, Math.min(width - sidePadding * 2, MAX_CONTENT_WIDTH));
  const heroHeight = compactHeight ? 140 : 180;
  const heroMotion = useRef(new Animated.Value(0)).current;

  const toggleAgreement = () => {
    setHasAgreed((prev) => !prev);
  };

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(heroMotion, {
          toValue: 1,
          duration: 2800,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(heroMotion, {
          toValue: 0,
          duration: 2800,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [heroMotion]);

  const heroTranslateY = heroMotion.interpolate({
    inputRange: [0, 1],
    outputRange: [5, -5],
  });
  const heroScale = heroMotion.interpolate({
    inputRange: [0, 1],
    outputRange: [0.99, 1.03],
  });
  const glowScale = heroMotion.interpolate({
    inputRange: [0, 1],
    outputRange: [0.92, 1.1],
  });
  const glowOpacity = heroMotion.interpolate({
    inputRange: [0, 1],
    outputRange: [0.24, 0.44],
  });

  return (
    <SafeScreen bottomInset={false} contentStyle={[styles.content, { paddingHorizontal: sidePadding }]}>
      <OnboardingBackButton />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={[styles.scroll, { alignItems: "center" }]}
      >
        <View style={[styles.hero, { width: contentWidth, height: heroHeight }]} pointerEvents="none">
          <Animated.View
            style={[
              styles.heroGlow,
              {
                opacity: glowOpacity,
                transform: [{ scale: glowScale }],
              },
            ]}
          />
          <Animated.Image
            source={require("@/images/webp/privacy_hero_logo.webp")}
            style={[
              styles.heroImage,
              {
                transform: [{ translateY: heroTranslateY }, { scale: heroScale }],
              },
            ]}
            resizeMode="contain"
          />
        </View>

        <View style={[styles.header, { width: contentWidth }]}>
          <Text style={[styles.title, compactWidth ? styles.titleCompact : null]}>
            {strings.onboarding.consent.title}
          </Text>
        </View>

        <View style={[styles.consentBox, { width: contentWidth }]}>
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.7}
            onPress={toggleAgreement}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: hasAgreed }}
          >
            <View style={styles.iconWrap}>
              {hasAgreed ? (
                <CheckCircle2 size={24} color={colors.primaryOrange} strokeWidth={2.2} />
              ) : (
                <Circle size={24} color={colors.mutedText} strokeWidth={2} />
              )}
            </View>
            <View style={styles.cardCopy}>
              <Text style={[styles.cardTitle, hasAgreed ? styles.cardTitleActive : null]}>
                I confirm that I am 18+ and I agree to the Privacy Policy. I also understand that MyStree Soul provides wellness guidance, not medical diagnoses.
              </Text>
            </View>
          </TouchableOpacity>
          
          <View style={styles.divider} />
          
          <TouchableOpacity
            style={styles.readRow}
            activeOpacity={0.7}
            onPress={() => router.push("/(modals)/privacy")}
          >
            <FileText size={18} color={colors.primaryOrange} />
            <Text style={styles.readRowText}>Read Full Privacy Details</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      <View style={[styles.footer, { width: contentWidth, alignSelf: "center" }]}>
        <PrimaryButton
          label={strings.onboarding.consent.cta}
          disabled={!hasAgreed}
          onPress={() => {
            acceptConsent();
            router.push("/(onboarding)/how-it-works");
          }}
        />
        <SecondaryButton
          label={strings.onboarding.consent.secondary}
          onPress={() => {
            if (router.canGoBack()) {
              router.back();
            } else {
              router.replace("/(onboarding)/intro");
            }
          }}
          style={styles.secondary}
        />
      </View>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    flexDirection: "column",
    paddingTop: spacing.md,
    paddingBottom: 0,
    backgroundColor: colors.warmWhite,
  },
  scrollView: {
    flex: 1,
    flexDirection: "column",
  },
  scroll: {
    flexGrow: 1,
    flexDirection: "column",
    paddingBottom: spacing.sm,
  },
  hero: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.xl,
    zIndex: 0,
  },
  heroGlow: {
    position: "absolute",
    width: "68%",
    height: "72%",
    borderRadius: 999,
    backgroundColor: colors.peachGlow,
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  header: {
    flexDirection: "column",
    gap: spacing.sm,
    marginBottom: spacing.md,
    zIndex: 1,
  },
  title: {
    color: colors.primaryText,
    fontFamily: "Poppins_500Medium",
    fontSize: 29,
    lineHeight: 37,
    textAlign: "center",
    letterSpacing: 0,
  },
  titleCompact: {
    fontSize: 26,
    lineHeight: 34,
  },
  subtitle: {
    color: colors.secondaryText,
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
    lineHeight: 23,
    textAlign: "center",
    letterSpacing: 0,
  },
  consentBox: {
    backgroundColor: colors.backgroundWhite,
    borderRadius: radius.large,
    ...shadows.sm,
    overflow: "hidden",
  },
  card: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.sm,
  },
  iconWrap: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  cardCopy: {
    flex: 1,
    flexDirection: "column",
    gap: 2,
  },
  cardTitle: {
    color: colors.secondaryText,
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    lineHeight: 20,
    letterSpacing: 0,
  },
  cardTitleActive: {
    color: colors.primaryText,
    fontFamily: "Poppins_500Medium",
  },
  divider: {
    height: 1,
    backgroundColor: colors.divider,
    marginHorizontal: spacing.md,
  },
  readRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    paddingVertical: spacing.md,
    backgroundColor: colors.warmWhite,
  },
  readRowText: {
    color: colors.primaryOrange,
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
  },
  footer: {
    flexDirection: "column",
    gap: spacing.sm,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
    backgroundColor: colors.warmWhite,
  },
  secondary: {
    borderWidth: 0,
    backgroundColor: "transparent",
    borderRadius: 8,
  },
});
