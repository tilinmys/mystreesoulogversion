import { ChevronRight, RotateCcw, ShieldCheck } from "lucide-react-native";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import { colors, spacing } from "@/lib/design-tokens";

const animeGirl = require("@/images/webp/animegirl.webp");

export default function LoggedOutScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.screen}>
      <View style={[styles.content, { paddingBottom: Math.max(insets.bottom, spacing.lg) }]}>
        <View style={styles.topRow}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Create a new account"
            onPress={() => router.replace("/(onboarding)/welcome")}
            style={({ pressed }) => [styles.topButton, pressed ? styles.pressed : null]}
          >
            <Text style={styles.topButtonText}>New account</Text>
          </Pressable>
        </View>

        <View style={styles.illustrationWrap}>
          <Image source={animeGirl} resizeMode="contain" style={styles.illustration} />
        </View>

        <View style={styles.copy}>
          <View style={styles.statusPill}>
            <ShieldCheck size={15} color={colors.softTeal} strokeWidth={2.2} />
            <Text style={styles.statusText}>Signed out safely</Text>
          </View>
          <Text maxFontSizeMultiplier={1.1} style={styles.title}>
            Ready when you are
          </Text>
          <Text maxFontSizeMultiplier={1.1} style={styles.body}>
            Sign in to restore your saved profile, cycle rhythm, records, and privacy settings.
          </Text>
        </View>

        <View style={styles.edgeCaseCard}>
          <RotateCcw size={18} color={colors.primaryOrange} strokeWidth={2.2} />
          <Text maxFontSizeMultiplier={1.1} style={styles.edgeCaseText}>
            If you deleted or reset demo data, sign-in will rebuild a clean returning-user demo profile.
          </Text>
        </View>

        <View style={styles.footer}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Go to login"
            onPress={() => router.replace("/(onboarding)/login")}
            style={({ pressed }) => [styles.primaryButton, pressed ? styles.pressed : null]}
          >
            <Text style={styles.primaryText}>Log in</Text>
            <ChevronRight size={18} color={colors.primaryText} strokeWidth={2.3} />
          </Pressable>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Continue as new user"
            onPress={() => router.replace("/(onboarding)/welcome")}
            style={({ pressed }) => [styles.secondaryButton, pressed ? styles.pressed : null]}
          >
            <Text style={styles.secondaryText}>Start fresh instead</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.backgroundWhite,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  topRow: {
    minHeight: 54,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  topButton: {
    minHeight: 40,
    borderRadius: 20,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.backgroundWhite,
    borderWidth: 1,
    borderColor: colors.divider,
    alignItems: "center",
    justifyContent: "center",
  },
  topButtonText: {
    color: colors.primaryText,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 13,
    lineHeight: 18,
  },
  illustrationWrap: {
    height: "34%",
    minHeight: 210,
    maxHeight: 320,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  illustration: {
    width: "100%",
    height: "100%",
    maxWidth: 390,
  },
  copy: {
    alignItems: "center",
    paddingTop: spacing.xl,
  },
  statusPill: {
    minHeight: 32,
    borderRadius: 16,
    backgroundColor: colors.tealSoftSurface,
    paddingHorizontal: spacing.sm,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    marginBottom: spacing.md,
  },
  statusText: {
    color: colors.primaryText,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 12,
    lineHeight: 17,
  },
  title: {
    color: colors.primaryText,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 30,
    lineHeight: 38,
    textAlign: "center",
  },
  body: {
    color: colors.secondaryText,
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
    lineHeight: 24,
    textAlign: "center",
    marginTop: spacing.sm,
    maxWidth: 340,
  },
  edgeCaseCard: {
    minHeight: 64,
    borderRadius: 20,
    backgroundColor: colors.backgroundWhite,
    borderWidth: 1,
    borderColor: colors.divider,
    paddingHorizontal: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  edgeCaseText: {
    flex: 1,
    color: colors.secondaryText,
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    lineHeight: 18,
  },
  footer: {
    marginTop: "auto",
    gap: spacing.sm,
    paddingTop: spacing.lg,
  },
  primaryButton: {
    minHeight: 56,
    borderRadius: 28,
    backgroundColor: colors.backgroundWhite,
    borderWidth: 1.5,
    borderColor: colors.primaryOrange,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
    shadowColor: colors.coralShadow,
    shadowOpacity: 0.05,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 2,
  },
  primaryText: {
    color: colors.primaryText,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 15,
    lineHeight: 21,
  },
  secondaryButton: {
    minHeight: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryText: {
    color: colors.secondaryText,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    lineHeight: 20,
  },
  pressed: {
    opacity: 0.86,
    transform: [{ scale: 0.99 }],
  },
});
