/**
 * AppTourOverlay.tsx
 *
 * Premium guided tutorial overlay for MyStree Soul.
 *
 * Design highlights:
 * - Per-step color theming (accent, soft surface, icon tint)
 * - Glassmorphism backdrop with spotlight cutout
 * - Icon badge with soft circular container
 * - Animated progress bar spanning all steps
 * - Kicker label above headline for editorial feel
 * - Spring-scale + fade entrance animation per step
 * - Accessible touch targets ≥ 48pt
 */
import React, { useEffect, useRef } from "react";
import {
  Animated,
  LayoutRectangle,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { tourSteps, type TourStepData } from "@/lib/tour-steps";
import { colors, radius, shadows, spacing } from "@/lib/design-tokens";

// ─── Layout constants ─────────────────────────────────────────────────────────
const CARD_MARGIN   = 20;
const NAV_CLEARANCE = 110;
const CUTOUT_PAD    = 10;
const CARD_MIN_H    = 260;

type Props = {
  step: number;
  targetLayout?: LayoutRectangle;
  onNext: () => void;
  onSkip: () => void;
  onFinish: () => void;
};

export function AppTourOverlay({ step, targetLayout, onNext, onSkip, onFinish }: Props) {
  const fadeAnim  = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.92)).current;
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    fadeAnim.setValue(0);
    scaleAnim.setValue(0.92);
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 320, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, damping: 18, stiffness: 200 }),
    ]).start();
  }, [step, fadeAnim, scaleAnim]);

  // ── Guards ──────────────────────────────────────────────────────────────────
  const isAskPhase  = step === -1;
  const currentStep = tourSteps[step] as TourStepData | undefined;
  if (!isAskPhase && !currentStep) return null;

  const isLastStep = step === tourSteps.length - 1;
  const hasTarget  = !!targetLayout && !isAskPhase;

  // ── Spotlight geometry ──────────────────────────────────────────────────────
  const cx = hasTarget ? targetLayout!.x - CUTOUT_PAD : 0;
  const cy = hasTarget ? targetLayout!.y - CUTOUT_PAD : 0;
  const cw = hasTarget ? targetLayout!.width  + CUTOUT_PAD * 2 : 0;
  const ch = hasTarget ? targetLayout!.height + CUTOUT_PAD * 2 : 0;

  // ── Card positioning ───────────────────────────────────────────────────────
  const cardTopWhenBottom = height - insets.bottom - NAV_CLEARANCE - CARD_MIN_H;
  const cardTopY          = insets.top + spacing.xl;
  const cardBottomWhenTop = cardTopY + CARD_MIN_H;
  const cardAnchorTop     = hasTarget && (cy + ch + spacing.xl) > cardTopWhenBottom;

  // ── Arrow geometry ─────────────────────────────────────────────────────────
  const spotlightCentreX = cx + cw / 2;
  const arrowX = Math.max(CARD_MARGIN + 20, Math.min(width - CARD_MARGIN - 20, spotlightCentreX));
  const arrowFromY = cardAnchorTop ? cardBottomWhenTop + 4 : cardTopWhenBottom - 4;
  const arrowToY   = cardAnchorTop ? cy - 8 : cy + ch + 8;
  const arrowH     = Math.max(8, Math.abs(arrowToY - arrowFromY));
  const arrowTop   = Math.min(arrowFromY, arrowToY);
  const showArrow  = hasTarget && arrowH > 10;

  // ── Per-step theme ─────────────────────────────────────────────────────────
  const theme = currentStep?.theme ?? {
    accent: colors.primaryOrange,
    softBg: colors.softSurfaceTint,
    iconTint: colors.primaryOrange,
  };

  return (
    <Modal transparent visible animationType="none" statusBarTranslucent onRequestClose={onSkip}>
      <Animated.View style={[styles.root, { opacity: fadeAnim }]}>

        {/* ── Backdrop ─────────────────────────────────────────────────── */}
        {isAskPhase || !hasTarget ? (
          <BlurView intensity={28} tint="dark" style={[StyleSheet.absoluteFill, styles.overlayTint]} />
        ) : (
          <>
            <BlurView intensity={28} tint="dark"
              style={[styles.overlayTint, { position: "absolute", top: 0, left: 0, right: 0, height: Math.max(0, cy) }]} />
            <BlurView intensity={28} tint="dark"
              style={[styles.overlayTint, { position: "absolute", top: cy + ch, left: 0, right: 0, bottom: 0 }]} />
            <BlurView intensity={28} tint="dark"
              style={[styles.overlayTint, { position: "absolute", top: cy, left: 0, width: Math.max(0, cx), height: ch }]} />
            <BlurView intensity={28} tint="dark"
              style={[styles.overlayTint, { position: "absolute", top: cy, left: cx + cw, right: 0, height: ch }]} />
          </>
        )}

        {/* ── Spotlight glow ring ──────────────────────────────────────── */}
        {hasTarget && (
          <View
            pointerEvents="none"
            style={[
              styles.spotlightRing,
              {
                top: cy, left: cx, width: cw, height: ch,
                borderColor: theme.accent,
                shadowColor: theme.accent,
              },
            ]}
          />
        )}

        {/* ── Connecting line ──────────────────────────────────────────── */}
        {showArrow && (
          <View
            pointerEvents="none"
            style={[styles.arrowLine, { left: arrowX, top: arrowTop, height: arrowH, backgroundColor: theme.accent }]}
          >
            {cardAnchorTop
              ? <View style={[styles.arrowHead, styles.arrowDown, { borderTopColor: theme.accent }]} />
              : <View style={[styles.arrowHead, styles.arrowUp, { borderBottomColor: theme.accent }]} />
            }
          </View>
        )}

        {/* ── Tour Card ────────────────────────────────────────────────── */}
        <Animated.View
          style={[
            styles.card,
            cardAnchorTop ? { top: cardTopY } : { bottom: insets.bottom + NAV_CLEARANCE },
            { transform: [{ scale: scaleAnim }] },
          ]}
        >
          {isAskPhase ? <AskPhaseContent onSkip={onSkip} onNext={onNext} /> : (
            <StepContent
              step={step}
              data={currentStep!}
              isLastStep={isLastStep}
              onSkip={onSkip}
              onNext={isLastStep ? onFinish : onNext}
            />
          )}
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

// ── Ask Phase (step -1) ───────────────────────────────────────────────────────
function AskPhaseContent({ onSkip, onNext }: { onSkip: () => void; onNext: () => void }) {
  return (
    <>
      {/* Icon badge */}
      <View style={[styles.iconBadge, { backgroundColor: colors.softSurfaceTint }]}>
        <Text style={{ fontSize: 32 }}>🌸</Text>
      </View>

      <Text style={styles.askTitle}>Welcome to your sanctuary</Text>
      <Text style={styles.askBody}>
        Take a quick 30-second tour to discover where everything lives — Bloop, your cycle dashboard,
        insights, vault, and privacy controls.
      </Text>

      <View style={styles.askActions}>
        <Pressable
          accessibilityRole="button"
          onPress={onSkip}
          style={styles.ghostBtn}
        >
          <Text style={styles.ghostText}>Skip tour</Text>
        </Pressable>
        <Pressable accessibilityRole="button" onPress={onNext}>
          <LinearGradient
            colors={["#FB923C", "#F97316"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientBtn}
          >
            <Text style={styles.gradientBtnText}>Begin tour ✨</Text>
          </LinearGradient>
        </Pressable>
      </View>
    </>
  );
}

// ── Step Content ──────────────────────────────────────────────────────────────
function StepContent({
  step,
  data,
  isLastStep,
  onSkip,
  onNext,
}: {
  step: number;
  data: TourStepData;
  isLastStep: boolean;
  onSkip: () => void;
  onNext: () => void;
}) {
  const Icon = data.icon;
  const { accent, softBg, iconTint } = data.theme;
  const progress = (step + 1) / tourSteps.length;

  return (
    <>
      {/* ── Top row: icon badge + kicker + step indicator ──── */}
      <View style={styles.stepHeader}>
        <View style={[styles.iconBadge, { backgroundColor: softBg }]}>
          <Icon size={26} color={iconTint} strokeWidth={2.2} />
        </View>
        <View style={styles.headerMeta}>
          <Text style={[styles.kicker, { color: accent }]}>{data.kicker}</Text>
          <View style={[styles.stepPill, { backgroundColor: accent }]}>
            <Text style={styles.stepPillText}>{step + 1}/{tourSteps.length}</Text>
          </View>
        </View>
      </View>

      {/* ── Title + body ──────────────────────────────────── */}
      <Text style={styles.title} numberOfLines={2}>{data.title}</Text>
      <Text style={styles.body} numberOfLines={4}>{data.body}</Text>

      {/* ── Progress bar ──────────────────────────────────── */}
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${progress * 100}%`, backgroundColor: accent }]} />
      </View>

      {/* ── Actions ───────────────────────────────────────── */}
      <View style={styles.actions}>
        <Pressable accessibilityRole="button" onPress={onSkip} style={styles.ghostBtn}>
          <Text style={[styles.ghostText, { textDecorationLine: "underline" }]}>Skip</Text>
        </Pressable>

        {/* Step dots */}
        <View style={styles.dots}>
          {tourSteps.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                i === step && [styles.dotActive, { backgroundColor: accent }],
                i < step && { backgroundColor: accent, opacity: 0.35 },
              ]}
            />
          ))}
        </View>

        <Pressable accessibilityRole="button" onPress={onNext}>
          <LinearGradient
            colors={[accent, accent]}
            style={[styles.nextBtn, isLastStep && styles.finishBtn]}
          >
            <Text style={styles.nextBtnText}>{data.buttonText}</Text>
          </LinearGradient>
        </Pressable>
      </View>
    </>
  );
}

// ── Styles ─────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 9999,
  },
  overlayTint: {
    backgroundColor: "rgba(25, 22, 18, 0.52)",
  },

  // ── Spotlight
  spotlightRing: {
    position: "absolute",
    borderRadius: 20,
    borderWidth: 2.5,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.45,
    shadowRadius: 24,
    elevation: 10,
  },

  // ── Arrow
  arrowLine: {
    position: "absolute",
    width: 2.5,
    opacity: 0.9,
    borderRadius: 2,
  },
  arrowHead: {
    position: "absolute",
    width: 0,
    height: 0,
    left: -5,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
  },
  arrowDown: {
    bottom: -2,
    borderTopWidth: 9,
  },
  arrowUp: {
    top: -2,
    borderBottomWidth: 9,
  },

  // ── Card
  card: {
    position: "absolute",
    left: CARD_MARGIN,
    right: CARD_MARGIN,
    minHeight: CARD_MIN_H,
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "rgba(241, 230, 221, 0.8)",
    paddingHorizontal: 22,
    paddingTop: 22,
    paddingBottom: 18,
    gap: 10,
    // Premium shadow
    shadowColor: "rgba(0,0,0,0.2)",
    shadowOpacity: 0.16,
    shadowRadius: 32,
    shadowOffset: { width: 0, height: 16 },
    elevation: 12,
  },

  // ── Icon badge
  iconBadge: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
  },

  // ── Step header
  stepHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  headerMeta: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  kicker: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  stepPill: {
    borderRadius: radius.full,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  stepPillText: {
    color: "#FFFFFF",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 11,
    lineHeight: 16,
  },

  // ── Typography
  title: {
    color: colors.primaryText,
    fontFamily: "Poppins_700Bold",
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: -0.2,
  },
  body: {
    color: colors.secondaryText,
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    lineHeight: 22,
  },

  // ── Progress bar
  progressTrack: {
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.divider,
    overflow: "hidden",
    marginTop: 4,
  },
  progressFill: {
    height: "100%",
    borderRadius: 2,
  },

  // ── Action row
  actions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 4,
  },
  dots: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.divider,
  },
  dotActive: {
    width: 20,
    height: 6,
    borderRadius: 3,
  },
  ghostBtn: {
    minHeight: 48,
    paddingHorizontal: spacing.xs,
    justifyContent: "center",
  },
  ghostText: {
    color: colors.mutedText,
    fontFamily: "Poppins_500Medium",
    fontSize: 13,
    lineHeight: 18,
  },
  nextBtn: {
    minHeight: 44,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  finishBtn: {
    paddingHorizontal: 22,
  },
  nextBtnText: {
    color: "#FFFFFF",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    lineHeight: 20,
  },

  // ── Ask phase
  askTitle: {
    color: colors.primaryText,
    fontFamily: "Poppins_700Bold",
    fontSize: 22,
    lineHeight: 30,
    letterSpacing: -0.2,
    textAlign: "center",
    marginTop: 4,
  },
  askBody: {
    color: colors.secondaryText,
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    lineHeight: 22,
    textAlign: "center",
    paddingHorizontal: 8,
  },
  askActions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },
  gradientBtn: {
    minHeight: 48,
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 22,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.primaryOrange,
    shadowOpacity: 0.28,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  gradientBtnText: {
    color: "#FFFFFF",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 15,
    lineHeight: 22,
  },
});
