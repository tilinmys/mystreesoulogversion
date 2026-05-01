import { ChevronLeft, Eye, EyeOff, LockKeyhole, Mail, ShieldCheck } from "lucide-react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import { colors, radius, spacing } from "@/lib/design-tokens";
import { useAppStore } from "@/store/app-store";

function nameFromLogin(value: string) {
  const raw = value.split("@")[0]?.replace(/[._-]+/g, " ").trim();
  if (!raw) return "beautiful";
  return raw
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

export default function LoginScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const acceptConsent = useAppStore((state) => state.acceptConsent);
  const setCycleSetup = useAppStore((state) => state.setCycleSetup);
  const setHasSeenBloopIntro = useAppStore((state) => state.setHasSeenBloopIntro);
  const markFounderQuotesSeen = useAppStore((state) => state.markFounderQuotesSeen);
  const finishAppTour = useAppStore((state) => state.finishAppTour);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [hasTriedSubmit, setHasTriedSubmit] = useState(false);

  const emailValue = email.trim();
  const passwordValue = password.trim();
  const canSubmit = emailValue.length >= 2 && passwordValue.length >= 4;
  const helperText = useMemo(() => {
    if (!hasTriedSubmit || canSubmit) {
      return "Use any demo email and 4+ character password to restore the returning-user flow.";
    }
    if (emailValue.length < 2) return "Enter your email or username.";
    return "Password must be at least 4 characters for this demo.";
  }, [canSubmit, emailValue.length, hasTriedSubmit]);

  const handleSignIn = () => {
    setHasTriedSubmit(true);
    if (!canSubmit) return;

    acceptConsent();
    setCycleSetup({
      userName: nameFromLogin(emailValue),
      lastPeriodDate: "April 18, 2026",
      cycleLength: 28,
      periodLength: 5,
    });
    markFounderQuotesSeen();
    setHasSeenBloopIntro(true);
    finishAppTour();
    router.replace("/(onboarding)/login-success");
  };

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.screen}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 16 : 0}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={[styles.content, { paddingBottom: Math.max(insets.bottom, spacing.lg) + spacing.xl }]}
        >
          <View style={styles.topBar}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Go back"
              onPress={() => (router.canGoBack() ? router.back() : router.replace("/(onboarding)/welcome"))}
              style={({ pressed }) => [styles.backButton, pressed ? styles.pressed : null]}
            >
              <ChevronLeft size={22} color={colors.primaryText} strokeWidth={2.4} />
            </Pressable>
          </View>

          <View style={styles.hero}>
            <View style={styles.lockPlate}>
              <LockKeyhole size={28} color={colors.primaryOrange} strokeWidth={2.2} />
            </View>
            <Text maxFontSizeMultiplier={1.1} style={styles.title}>
              Welcome back
            </Text>
            <Text maxFontSizeMultiplier={1.1} style={styles.subtitle}>
              Sign in to restore your private health sanctuary and continue where you left off.
            </Text>
          </View>

          <View style={styles.formCard}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email or username</Text>
              <View style={styles.inputShell}>
                <Mail size={18} color={colors.mutedText} strokeWidth={2} />
                <TextInput
                  style={styles.input}
                  placeholder="you@example.com"
                  placeholderTextColor={colors.mutedText}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  returnKeyType="next"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputShell}>
                <LockKeyhole size={18} color={colors.mutedText} strokeWidth={2} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter password"
                  placeholderTextColor={colors.mutedText}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  returnKeyType="done"
                  onSubmitEditing={handleSignIn}
                />
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={showPassword ? "Hide password" : "Show password"}
                  onPress={() => setShowPassword((value) => !value)}
                  style={styles.iconButton}
                >
                  {showPassword ? (
                    <EyeOff size={19} color={colors.secondaryText} strokeWidth={2} />
                  ) : (
                    <Eye size={19} color={colors.secondaryText} strokeWidth={2} />
                  )}
                </Pressable>
              </View>
            </View>

            <Text
              maxFontSizeMultiplier={1.1}
              style={[styles.helper, hasTriedSubmit && !canSubmit ? styles.helperError : null]}
            >
              {helperText}
            </Text>

            <Pressable
              accessibilityRole="button"
              accessibilityState={{ disabled: !canSubmit }}
              accessibilityLabel="Sign in"
              onPress={handleSignIn}
              style={({ pressed }) => [
                styles.signInButton,
                !canSubmit ? styles.signInButtonDisabled : null,
                pressed && canSubmit ? styles.pressed : null,
              ]}
            >
              <Text style={[styles.signInText, !canSubmit ? styles.signInTextDisabled : null]}>Sign in</Text>
            </Pressable>
          </View>

          <View style={styles.trustRow}>
            <ShieldCheck size={17} color={colors.softTeal} strokeWidth={2.2} />
            <Text maxFontSizeMultiplier={1.1} style={styles.trustText}>
              Demo sign-in restores local progress only. No real password leaves this device.
            </Text>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>New here?</Text>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Create a new sanctuary"
              onPress={() => router.replace("/(onboarding)/welcome")}
              style={styles.footerLinkButton}
            >
              <Text style={styles.footerLink}>Create a new sanctuary</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.backgroundWhite,
  },
  keyboard: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xs,
  },
  topBar: {
    height: 52,
    justifyContent: "center",
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.backgroundWhite,
    borderWidth: 1,
    borderColor: colors.divider,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.coralShadow,
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  pressed: {
    opacity: 0.86,
    transform: [{ scale: 0.99 }],
  },
  hero: {
    alignItems: "center",
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
  },
  lockPlate: {
    width: 64,
    height: 64,
    borderRadius: 24,
    backgroundColor: colors.orangeSoftSurface,
    borderWidth: 1,
    borderColor: colors.orangeBorder,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md,
  },
  title: {
    color: colors.primaryText,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 32,
    lineHeight: 40,
    textAlign: "center",
  },
  subtitle: {
    color: colors.secondaryText,
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
    lineHeight: 23,
    textAlign: "center",
    marginTop: spacing.xs,
    maxWidth: 330,
  },
  formCard: {
    borderRadius: 28,
    backgroundColor: colors.backgroundWhite,
    borderWidth: 1,
    borderColor: colors.divider,
    padding: spacing.md,
    shadowColor: colors.coralShadow,
    shadowOpacity: 0.05,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 3,
  },
  inputGroup: {
    marginBottom: spacing.md,
  },
  label: {
    color: colors.primaryText,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 13,
    lineHeight: 18,
    marginBottom: spacing.xs,
  },
  inputShell: {
    minHeight: 54,
    borderRadius: 14,
    backgroundColor: colors.backgroundWhite,
    borderWidth: 1,
    borderColor: colors.divider,
    paddingLeft: spacing.md,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    minHeight: 54,
    paddingHorizontal: spacing.sm,
    color: colors.primaryText,
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
  },
  iconButton: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  helper: {
    color: colors.secondaryText,
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    lineHeight: 18,
    marginTop: -spacing.xs,
    marginBottom: spacing.md,
  },
  helperError: {
    color: colors.dangerText,
  },
  signInButton: {
    minHeight: 54,
    borderRadius: 27,
    backgroundColor: colors.primaryOrange,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.orangeShadow,
    shadowOpacity: 0.12,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
  },
  signInButtonDisabled: {
    backgroundColor: colors.softDisabled,
    shadowOpacity: 0,
    elevation: 0,
  },
  signInText: {
    color: colors.whiteText,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 15,
    lineHeight: 21,
  },
  signInTextDisabled: {
    color: colors.disabledText,
  },
  trustRow: {
    minHeight: 56,
    borderRadius: 18,
    backgroundColor: colors.tealSoftSurface,
    paddingHorizontal: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    marginTop: spacing.md,
  },
  trustText: {
    flex: 1,
    color: colors.primaryText,
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    lineHeight: 18,
  },
  footer: {
    marginTop: "auto",
    paddingTop: spacing.xl,
    alignItems: "center",
  },
  footerText: {
    color: colors.secondaryText,
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    lineHeight: 18,
  },
  footerLinkButton: {
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.md,
  },
  footerLink: {
    color: colors.primaryText,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    lineHeight: 20,
    textDecorationLine: "underline",
  },
});
