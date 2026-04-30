import { ChevronRight } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, useWindowDimensions, View, TouchableOpacity } from "react-native";

import { SafeScreen } from "@/components/layout/SafeScreen";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { ProgressDots } from "@/components/ui/ProgressDots";
import { BloopAura } from "@/components/visuals/BloopAura";
import { CycleAura } from "@/components/visuals/CycleAura";
import { PrivacyAura } from "@/components/visuals/PrivacyAura";
import { colors, radius, spacing } from "@/lib/design-tokens";
import { strings } from "@/lib/strings";

const MAX_CONTENT_WIDTH = 340;

function SlideVisual({ index, width, height }: { index: number; width: number; height: number }) {
  if (index === 0) {
    return <CycleAura width={width} height={height} />;
  }

  if (index === 1) {
    return <PrivacyAura width={width} height={height} />;
  }

  return <BloopAura width={width} height={height} />;
}

export default function IntroScreen() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const slide = strings.onboarding.introSlides[index];
  const isLast = index === strings.onboarding.introSlides.length - 1;
  const compactWidth = width < 380;
  const compactHeight = height < 720;
  const sidePadding = compactWidth ? spacing.lg : spacing.xl;
  const contentWidth = Math.max(272, Math.min(width - sidePadding * 2, MAX_CONTENT_WIDTH));
  const visualHeight = compactHeight ? 188 : 238;
  const nextLabel = isLast ? "Choose Goals →" : "Next →";

  const goNext = () => {
    if (isLast) {
      router.push("/(onboarding)/goals");
      return;
    }
    setIndex((current) => current + 1);
  };

  return (
    <SafeScreen bottomInset={false} contentStyle={[styles.content, { paddingHorizontal: sidePadding }]}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        style={{ flex: 1, width: "100%" }}
        contentContainerStyle={{ flexGrow: 1, flexDirection: "column", alignItems: "center" }}
      >
        <View style={[styles.topRow, { width: contentWidth }]}>
          <ProgressDots total={3} currentIndex={index} />
        {!isLast ? (
          <TouchableOpacity
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="Skip intro"
            onPress={() => router.push("/(onboarding)/goals")}
            style={styles.skip}
          >
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.skipPlaceholder} />
        )}
      </View>

      <View style={[styles.visual, { width: contentWidth, height: visualHeight }]} pointerEvents="none">
        <SlideVisual index={index} width={contentWidth} height={visualHeight} />
      </View>

      <View style={[styles.card, { width: contentWidth, minHeight: compactHeight ? 148 : 168 }]}>
        <Text style={[styles.title, compactWidth ? styles.titleCompact : null]}>{slide.title}</Text>
        <Text style={styles.body}>{slide.body}</Text>
      </View>
      </ScrollView>

      <View style={[styles.footer, { width: contentWidth }]}>
        <PrimaryButton
          label={nextLabel}
          onPress={goNext}
          iconRight={!isLast ? <ChevronRight size={18} color={colors.whiteText} /> : null}
        />
      </View>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    flexDirection: "column",
    paddingTop: spacing.lg,
    paddingBottom: 0,
    backgroundColor: colors.warmWhite,
  },
  topRow: {
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  skip: {
    minWidth: 64,
    minHeight: 44,
    borderRadius: radius.small,
    alignItems: "center",
    justifyContent: "center",
  },
  skipPlaceholder: {
    width: 64,
    minHeight: 44,
  },
  skipText: {
    color: colors.secondaryText,
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0,
  },
  pressed: {
    opacity: 0.72,
  },
  visual: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacing.md,
  },
  card: {
    flexDirection: "column",
    borderRadius: radius.large,
    backgroundColor: colors.backgroundWhite,
    borderWidth: 1,
    borderColor: colors.orangeBorder,
    padding: spacing.lg,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
    shadowColor: colors.roseGold,
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 2,
  },
  title: {
    color: colors.primaryText,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 26,
    lineHeight: 34,
    textAlign: "center",
    letterSpacing: 0,
  },
  titleCompact: {
    fontSize: 24,
    lineHeight: 31,
  },
  body: {
    color: colors.secondaryText,
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
    lineHeight: 23,
    textAlign: "center",
    letterSpacing: 0,
  },
  footer: {
    flexShrink: 0,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
    backgroundColor: colors.warmWhite,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
  },
});
