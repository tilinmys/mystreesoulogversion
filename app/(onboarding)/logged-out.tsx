import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { colors, radius, spacing } from "@/lib/design-tokens";

const animeGirl = require("@/images/webp/animegirl.webp");

export default function LoggedOutScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const continueToLogin = () => {
    router.replace("/(onboarding)/welcome");
  };

  return (
    <SafeAreaView style={styles.screen}>
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel="Log in"
        activeOpacity={0.75}
        onPress={continueToLogin}
        style={[styles.loginButton, { top: insets.top + spacing.sm }]}
      >
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.hero}>
        <Image
          source={animeGirl}
          resizeMode="contain"
          style={styles.heroImage}
          accessibilityLabel="Woman holding a phone"
        />
      </View>

      <View style={styles.copy}>
        <Text style={styles.title}>Welcome back!</Text>
        <Text style={styles.body}>
          Continue to MyStree Soul whenever you are ready to return to your health journey.
        </Text>
      </View>

      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, spacing.lg) }]}>
        <PrimaryButton label="Continue" onPress={continueToLogin} style={styles.cta} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.backgroundWhite,
    alignItems: "center",
  },
  loginButton: {
    position: "absolute",
    right: spacing.lg,
    zIndex: 2,
    minHeight: 44,
    paddingHorizontal: spacing.md,
    borderRadius: radius.button,
    backgroundColor: colors.orangeSoftSurface,
    borderWidth: 1,
    borderColor: colors.orangeBorder,
    alignItems: "center",
    justifyContent: "center",
  },
  loginText: {
    color: colors.primaryOrange,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    lineHeight: 20,
  },
  hero: {
    width: "100%",
    height: "46%",
    backgroundColor: colors.warmWhite,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
  },
  heroImage: {
    width: "100%",
    height: "92%",
    maxWidth: 430,
  },
  copy: {
    width: "100%",
    maxWidth: 380,
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxl,
  },
  title: {
    color: colors.primaryText,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 32,
    lineHeight: 40,
    textAlign: "center",
    letterSpacing: 0,
  },
  body: {
    color: colors.secondaryText,
    fontFamily: "Poppins_400Regular",
    fontSize: 19,
    lineHeight: 31,
    textAlign: "center",
    marginTop: spacing.lg,
    letterSpacing: 0,
  },
  footer: {
    width: "100%",
    marginTop: "auto",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  cta: {
    width: "100%",
    maxWidth: 260,
    borderRadius: radius.large,
  },
});
