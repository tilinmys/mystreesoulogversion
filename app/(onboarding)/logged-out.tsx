/**
 * logged-out.tsx
 *
 * "Your sanctuary is resting." — Logged-out / data-cleared confirmation screen.
 * Pixel-perfect match to the reference design mockup.
 *
 * Background: warm peach-white #FFF0EA
 * Hero: blended full-width illustration, seamless with background
 * Copy: extra-bold heading + muted subtitle + botanical SVG divider
 * CTAs: gradient orange pill (primary) + white bordered pill (secondary)
 */
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { LockKeyhole, Leaf } from "lucide-react-native";
import { Image } from "expo-image";
import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

// Hero illustration — journal + mirror + vase + pebbles
const heroImage = require("@/images/webp/sanctuary_hero.png");

// ── Brand constants ────────────────────────────────────────────────────────
const BG         = "#FFF0EA";   // warm peach-white (entire screen)
const TEXT_DARK  = "#1B1714";   // near-black heading
const TEXT_MUTED = "#A89490";   // muted subtitle
const BORDER     = "#EAD8D2";   // very soft pink-beige border

export default function LoggedOutScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();

  // Hero occupies ~55% of screen height, constrained to 440px max
  const heroH = Math.min(height * 0.55, 440);
  const bottomPad = Math.max(insets.bottom + 8, 24);

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.screen}>

      {/* ── Hero illustration ────────────────────────────────── */}
      <View style={[styles.heroWrap, { height: heroH, width }]}>
        <Image
          source={heroImage}
          style={styles.heroImg}
          contentFit="cover"
          transition={300}
          accessibilityLabel="A peaceful pink journal resting by a sunset mirror"
        />
        {/* Fade bottom edge into BG seamlessly */}
        <LinearGradient
          colors={["transparent", BG]}
          locations={[0.6, 1]}
          style={StyleSheet.absoluteFillObject}
          pointerEvents="none"
        />
      </View>

      {/* ── Copy block ──────────────────────────────────────── */}
      <View style={styles.copy}>
        <Text maxFontSizeMultiplier={1.05} style={styles.heading}>
          Your sanctuary{"\n"}is resting.
        </Text>
        <Text maxFontSizeMultiplier={1.1} style={styles.subtitle}>
          You have successfully logged out.{"\n"}Your space will be here when you return.
        </Text>

        {/* Botanical heart divider — matches reference exactly */}
        <BotanicalDivider />
      </View>

      {/* ── Spacer ──────────────────────────────────────────── */}
      <View style={styles.spacer} />

      {/* ── Sticky CTA group ────────────────────────────────── */}
      <View style={[styles.ctas, { paddingBottom: bottomPad }]}>

        {/* PRIMARY — gradient orange pill */}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Sign back in"
          onPress={() => router.replace({ pathname: "/(auth)/login", params: { mode: "login" } })}
          style={({ pressed }) => pressed && styles.pressed}
        >
          <LinearGradient
            colors={["#FF7043", "#F97316"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.primaryBtn}
          >
            <LockKeyhole size={20} color="#FFFFFF" strokeWidth={2.2} />
            <Text style={styles.primaryText}>Sign Back In</Text>
          </LinearGradient>
        </Pressable>

        {/* SECONDARY — white ghost pill */}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Create account again"
          onPress={() => router.replace({ pathname: "/(auth)/login", params: { mode: "signup" } })}
          style={({ pressed }) => [styles.secondaryBtn, pressed && styles.pressed]}
        >
          <Leaf size={18} color={TEXT_DARK} strokeWidth={2.2} />
          <Text style={styles.secondaryText}>Create Account Again</Text>
        </Pressable>

      </View>
    </SafeAreaView>
  );
}

/* ── Botanical divider (matches the decorative element in the mockup) ── */
function BotanicalDivider() {
  return (
    <View style={divStyles.row}>
      {/* Left branch */}
      <View style={divStyles.branch}>
        <View style={divStyles.stem} />
        <View style={[divStyles.leaf, divStyles.leafL1]} />
        <View style={[divStyles.leaf, divStyles.leafL2]} />
      </View>

      {/* Centre heart */}
      <Text style={divStyles.heart}>♡</Text>

      {/* Right branch (mirrored) */}
      <View style={[divStyles.branch, { transform: [{ scaleX: -1 }] }]}>
        <View style={divStyles.stem} />
        <View style={[divStyles.leaf, divStyles.leafL1]} />
        <View style={[divStyles.leaf, divStyles.leafL2]} />
      </View>
    </View>
  );
}

// ── Styles ─────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: BG,
  },
  heroWrap: {
    overflow: "hidden",
  },
  heroImg: {
    width: "100%",
    height: "100%",
  },
  copy: {
    alignItems: "center",
    paddingHorizontal: 32,
    marginTop: -8,
    gap: 10,
  },
  heading: {
    color: TEXT_DARK,
    fontFamily: "Poppins_700Bold",
    fontSize: 34,
    lineHeight: 43,
    textAlign: "center",
    letterSpacing: -0.3,
  },
  subtitle: {
    color: TEXT_MUTED,
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    lineHeight: 22,
    textAlign: "center",
  },
  spacer: { flex: 1 },
  ctas: {
    paddingHorizontal: 24,
    gap: 12,
  },
  primaryBtn: {
    height: 58,
    borderRadius: 29,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    shadowColor: "#F97316",
    shadowOpacity: 0.32,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  primaryText: {
    color: "#FFFFFF",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    lineHeight: 24,
  },
  secondaryBtn: {
    height: 58,
    borderRadius: 29,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: BORDER,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  secondaryText: {
    color: TEXT_DARK,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    lineHeight: 22,
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.983 }],
  },
});

// ── Botanical divider styles ────────────────────────────────────────────────
const divStyles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 6,
  },
  branch: {
    width: 48,
    height: 20,
    position: "relative",
    justifyContent: "center",
  },
  stem: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 1.5,
    backgroundColor: "#D4B5AA",
    borderRadius: 1,
  },
  leaf: {
    position: "absolute",
    width: 10,
    height: 6,
    borderRadius: 5,
    backgroundColor: "#D4B5AA",
  },
  leafL1: { top: -6, left: 12, transform: [{ rotate: "-40deg" }] },
  leafL2: { top: -6, left: 28, transform: [{ rotate: "-30deg" }] },
  heart: {
    color: "#D4B5AA",
    fontSize: 13,
    lineHeight: 18,
  },
});
