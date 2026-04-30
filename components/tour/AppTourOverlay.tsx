import React, { useEffect, useRef } from "react";
import {
  Animated,
  LayoutRectangle,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { BlurView } from "expo-blur";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { tourSteps } from "@/lib/tour-steps";
import { colors, radius, shadows, spacing } from "@/lib/design-tokens";

// ─── Tour card design tokens ───────────────────────────────────────────────────
const CARD_BG      = "#FFF5F6"; // Soft pinkish blush
const CARD_BORDER  = colors.paleCoral;
const CARD_ACCENT  = colors.primaryOrange;
const CARD_TITLE   = colors.primaryText;
const CARD_BODY    = colors.secondaryText;
const CARD_MUTED   = colors.secondaryText;

// ─── Layout constants ─────────────────────────────────────────────────────────
const CARD_MARGIN    = spacing.lg;         // 24px left/right
const NAV_CLEARANCE  = 106;               // tab bar 70 + gap ~16 + buffer 20
const CUTOUT_PAD     = 8;

type Props = {
  step: number;
  targetLayout?: LayoutRectangle;
  onNext: () => void;
  onSkip: () => void;
  onFinish: () => void;
};

// ─── Component ────────────────────────────────────────────────────────────────
export function AppTourOverlay({ step, targetLayout, onNext, onSkip, onFinish }: Props) {
  const fadeAnim  = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    fadeAnim.setValue(0);
    scaleAnim.setValue(0.95);
    Animated.parallel([
      Animated.timing(fadeAnim,  { toValue: 1, duration: 260, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, damping: 20, stiffness: 240 }),
    ]).start();
  }, [step, fadeAnim, scaleAnim]);

  // ── Guards ─────────────────────────────────────────────────────────────────
  const isAskPhase  = step === -1;
  const currentStep = tourSteps[step];
  if (!isAskPhase && !currentStep) return null;

  const isLastStep  = step === tourSteps.length - 1;
  const hasTarget   = !!targetLayout && !isAskPhase;

  // ── Spotlight geometry (screen coordinates) ─────────────────────────────────
  // Removing safeT clamping to guarantee exact pixel alignment with measureInWindow
  const cx = hasTarget ? targetLayout!.x - CUTOUT_PAD : 0;
  const cy = hasTarget ? targetLayout!.y - CUTOUT_PAD : 0;
  const cw = hasTarget ? targetLayout!.width  + CUTOUT_PAD * 2 : 0;
  const ch = hasTarget ? targetLayout!.height + CUTOUT_PAD * 2 : 0;

  // ── Card height — auto via minHeight so longer navbar copy fits ─────────────
  const CARD_MIN_H = 178;

  // ── Collision-aware anchor side ─────────────────────────────────────────────
  const cardTopWhenBottom = height - insets.bottom - NAV_CLEARANCE - CARD_MIN_H;
  const cardTopY          = insets.top + spacing.xl;
  const cardBottomWhenTop = cardTopY + CARD_MIN_H;

  const cardAnchorTop = hasTarget && (cy + ch + spacing.xl) > cardTopWhenBottom;

  // ── Arrow — X centre clamped to card interior ───────────────────────────────
  const spotlightCentreX = cx + cw / 2;
  const arrowX = Math.max(
    CARD_MARGIN + 20,
    Math.min(width - CARD_MARGIN - 20, spotlightCentreX),
  );

  // ── Arrow segment vertical bounds ───────────────────────────────────────────
  const arrowFromY = cardAnchorTop
    ? cardBottomWhenTop + 4
    : cardTopWhenBottom - 4;
  const arrowToY   = cardAnchorTop
    ? cy - 8
    : cy + ch + 8;
  const arrowLineHeight = Math.max(8, Math.abs(arrowToY - arrowFromY));
  const arrowLineTop    = Math.min(arrowFromY, arrowToY);

  const showArrow = hasTarget && arrowLineHeight > 10;

  return (
    <Modal
      transparent
      visible
      animationType="none"
      statusBarTranslucent
      onRequestClose={onSkip}
    >
      <Animated.View style={[styles.root, { opacity: fadeAnim }]}>

        {/* ── Blurred backdrop ─────────── */}
        {isAskPhase || !hasTarget ? (
          <BlurView intensity={24} tint="light" style={[StyleSheet.absoluteFill, styles.overlayPanel]} />
        ) : (
          <>
            <BlurView intensity={24} tint="light"
              style={[styles.overlayPanel, { position: "absolute", top: 0, left: 0, right: 0, height: Math.max(0, cy) }]} />
            <BlurView intensity={24} tint="light"
              style={[styles.overlayPanel, { position: "absolute", top: cy + ch, left: 0, right: 0, bottom: 0 }]} />
            <BlurView intensity={24} tint="light"
              style={[styles.overlayPanel, { position: "absolute", top: cy, left: 0, width: Math.max(0, cx), height: ch }]} />
            <BlurView intensity={24} tint="light"
              style={[styles.overlayPanel, { position: "absolute", top: cy, left: cx + cw, right: 0, height: ch }]} />
          </>
        )}

        {/* ── Spotlight ring ────────────────── */}
        {hasTarget && (
          <View
            pointerEvents="none"
            style={[styles.spotlightRing, { top: cy, left: cx, width: cw, height: ch }]}
          />
        )}

        {/* ── Connecting arrow ──────────────── */}
        {showArrow && (
          <View
            pointerEvents="none"
            style={[styles.arrowLine, { left: arrowX, top: arrowLineTop, height: arrowLineHeight }]}
          >
            {cardAnchorTop ? (
              <View style={[styles.arrowHead, styles.arrowDown]} />
            ) : (
              <View style={[styles.arrowHead, styles.arrowUp]} />
            )}
          </View>
        )}

        {/* ── Tour card ────────────────────────────────────────────────── */}
        <Animated.View
          style={[
            styles.card,
            cardAnchorTop
              ? { top: cardTopY }
              : { bottom: insets.bottom + NAV_CLEARANCE },
            { transform: [{ scale: scaleAnim }] },
          ]}
        >
          {isAskPhase ? (
            <>
              <Text style={styles.title}>Welcome to MyStree Soul 🌸</Text>
              <Text style={styles.body}>
                Take a 30-second tour to see how your health companion works.
              </Text>
              <View style={styles.actions}>
                <TouchableOpacity activeOpacity={0.7} onPress={onSkip}
                  style={styles.ghostBtn} accessibilityRole="button">
                  <Text style={styles.ghostText}>Skip Tour</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.85} onPress={onNext}
                  style={styles.primaryBtn} accessibilityRole="button">
                  <Text style={styles.primaryText}>Start 30-Second Tour</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <View style={styles.titleRow}>
                <View style={styles.stepPill}>
                  <Text style={styles.stepPillText}>{step + 1} / {tourSteps.length}</Text>
                </View>
                <Text style={styles.title} numberOfLines={1}>{currentStep.title}</Text>
              </View>

              <Text style={styles.body} numberOfLines={4}>{currentStep.body}</Text>

              <View style={styles.actions}>
                <TouchableOpacity activeOpacity={0.7} onPress={onSkip}
                  style={styles.ghostBtn} accessibilityRole="button">
                  <Text style={[styles.ghostText, { textDecorationLine: "underline" }]}>Skip Tour</Text>
                </TouchableOpacity>
                <View style={styles.dots}>
                  {tourSteps.map((_, i) => (
                    <View key={i} style={[styles.dot, i === step && styles.dotActive]} />
                  ))}
                </View>
                <TouchableOpacity activeOpacity={0.85}
                  onPress={isLastStep ? onFinish : onNext}
                  style={styles.primaryBtn} accessibilityRole="button">
                  <Text style={styles.primaryText}>{currentStep.buttonText}</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Animated.View>

      </Animated.View>
    </Modal>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 9999,
  },
  overlayPanel: {
    backgroundColor: "rgba(37, 25, 21, 0.45)", // darker overlay to make pink pop
  },

  spotlightRing: {
    position: "absolute",
    borderRadius: 18,
    borderWidth: 3,
    borderColor: CARD_ACCENT,
    shadowColor: CARD_ACCENT,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 18,
    elevation: 8,
  },

  // Thicker 3px arrow line
  arrowLine: {
    position: "absolute",
    width: 3,
    backgroundColor: CARD_ACCENT,
    opacity: 0.95,
    borderRadius: 1.5,
  },

  // Larger Arrowhead
  arrowHead: {
    position: "absolute",
    width: 0,
    height: 0,
    left: -5.5,
    borderLeftWidth: 7,
    borderRightWidth: 7,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
  },
  arrowDown: {
    bottom: -2,
    borderTopWidth: 10,
    borderTopColor: CARD_ACCENT,
  },
  arrowUp: {
    top: -2,
    borderBottomWidth: 10,
    borderBottomColor: CARD_ACCENT,
  },

  card: {
    position: "absolute",
    left: CARD_MARGIN,
    right: CARD_MARGIN,
    minHeight: 178,
    backgroundColor: CARD_BG,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: CARD_BORDER,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
    flexDirection: "column",
    justifyContent: "space-between",
    gap: spacing.sm,
    ...shadows.lg,
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  stepPill: {
    backgroundColor: CARD_ACCENT,
    borderRadius: radius.full,
    paddingHorizontal: 8,
    paddingVertical: 2,
    flexShrink: 0,
  },
  stepPillText: {
    color: colors.whiteText,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 11,
    lineHeight: 16,
  },
  title: {
    color: CARD_TITLE,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    lineHeight: 22,
    flex: 1,
  },
  body: {
    color: CARD_BODY,
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    lineHeight: 21,
  },

  // Action row
  actions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    backgroundColor: CARD_BORDER,
  },
  dotActive: {
    width: 18,
    height: 6,
    borderRadius: 3,
    backgroundColor: CARD_ACCENT,
  },
  ghostBtn: {
    minHeight: 44,
    paddingHorizontal: spacing.xs,
    justifyContent: "center",
  },
  ghostText: {
    color: CARD_MUTED,
    fontFamily: "Poppins_500Medium",
    fontSize: 13,
    lineHeight: 18,
  },
  primaryBtn: {
    backgroundColor: CARD_ACCENT,
    borderRadius: 8,
    minHeight: 44,
    paddingVertical: 10,
    paddingHorizontal: spacing.md,
    justifyContent: "center",
    alignItems: "center",
  },
  primaryText: {
    color: colors.whiteText,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    lineHeight: 20,
  },
});
