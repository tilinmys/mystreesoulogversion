import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Check, ChevronRight, LockKeyhole, Mail, UserRound } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  ActivityIndicator,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";

import { AuthInput } from "@/components/auth/AuthInput";
import { SocialButton } from "@/components/auth/SocialButton";
import { AuthHeroIllustration } from "@/components/visuals/AuthHeroIllustration";
import { useAppStore } from "@/store/app-store";

const colors = {
  background: "#FFF8F5",
  surface: "#FFFFFF",
  primary: "#F97316",
  gradientStart: "#FB923C",
  gradientEnd: "#F97316",
  softTint: "#FFF1E8",
  textPrimary: "#2D2A26",
  textSecondary: "#6B665F",
  border: "#FED7AA",
  shadowTint: "#F97316",
};

type AuthMode = "login" | "signup";
const TEST_EMAIL = "tilinbijoykkr1@gmail.com";
const TEST_PASSWORD = "123456";

function LotusMark() {
  return (
    <Svg width={72} height={54} viewBox="0 0 96 72">
      <Path
        d="M48 9 C62 25 62 43 48 57 C34 43 34 25 48 9Z"
        stroke={colors.primary}
        strokeWidth={5}
        fill="none"
        strokeLinejoin="round"
      />
      <Path
        d="M18 30 C38 31 50 44 51 61 C32 61 20 50 18 30Z"
        stroke={colors.primary}
        strokeWidth={5}
        fill="none"
        strokeLinejoin="round"
      />
      <Path
        d="M78 30 C58 31 46 44 45 61 C64 61 76 50 78 30Z"
        stroke={colors.primary}
        strokeWidth={5}
        fill="none"
        strokeLinejoin="round"
      />
      <Path d="M22 63 H74" stroke={colors.primary} strokeWidth={5} strokeLinecap="round" />
    </Svg>
  );
}

function Divider() {
  return (
    <View className="flex-row items-center" style={styles.divider}>
      <View style={styles.dividerLine} />
      <Text style={styles.dividerText}>or continue with</Text>
      <View style={styles.dividerLine} />
    </View>
  );
}

export default function AuthLoginScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ mode?: string }>();
  const { width, height } = useWindowDimensions();
  const beginAuthFlow = useAppStore((state) => state.beginAuthFlow);
  const resumeExistingSession = useAppStore((state) => state.resumeExistingSession);
  const hasCompletedOnboarding = useAppStore((state) => state.hasCompletedOnboarding);
  const onboardingCompleted = useAppStore((state) => state.onboardingCompleted);
  const initialMode = params.mode === "signup" ? "signup" : "login";
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [segmentWidth, setSegmentWidth] = useState(0);
  const [rememberMe, setRememberMe] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState(TEST_EMAIL);
  const [password, setPassword] = useState(TEST_PASSWORD);
  const [isLoading, setIsLoading] = useState(false);
  const segmentMotion = useRef(new Animated.Value(initialMode === "login" ? 0 : 1)).current;
  const loadingMotion = useRef(new Animated.Value(0)).current;

  const compactHeight = height < 760;
  const sidePadding = width < 390 ? 24 : 32;
  const contentWidth = Math.min(width - sidePadding * 2, 420);
  const heroHeight = Math.max(216, Math.min(compactHeight ? 232 : 280, height * 0.34));
  const isLogin = mode === "login";
  const activeTranslate = segmentMotion.interpolate({
    inputRange: [0, 1],
    outputRange: [0, Math.max(0, (segmentWidth - 8) / 2)],
  });

  useEffect(() => {
    Animated.timing(segmentMotion, {
      toValue: isLogin ? 0 : 1,
      duration: 180,
      useNativeDriver: true,
    }).start();
  }, [isLogin, segmentMotion]);

  const switchMode = (nextMode: AuthMode) => {
    setMode(nextMode);
  };

  useEffect(() => {
    if (!isLoading) {
      loadingMotion.stopAnimation();
      loadingMotion.setValue(0);
      return;
    }

    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(loadingMotion, {
          toValue: 1,
          duration: 760,
          useNativeDriver: true,
        }),
        Animated.timing(loadingMotion, {
          toValue: 0,
          duration: 760,
          useNativeDriver: true,
        }),
      ]),
    );

    animation.start();
    return () => animation.stop();
  }, [isLoading, loadingMotion]);

  const handlePrimaryAction = () => {
    const cleanEmail = email.trim();
    const cleanPassword = password.trim();
    const cleanName = name.trim();

    if (isLoading) return;

    if (!isLogin && !cleanName) {
      Alert.alert("Name required", "Please enter your name to create your sanctuary account.");
      return;
    }

    if (!cleanEmail || !cleanPassword) {
      Alert.alert("Almost there", "Please enter your email or phone number and password.");
      return;
    }

    if (cleanEmail.toLowerCase() !== TEST_EMAIL || cleanPassword !== TEST_PASSWORD) {
      Alert.alert(
        "Testing login only",
        "Use tilinbijoykkr1@gmail.com with password 123456 to continue this flow.",
      );
      return;
    }

    startAuthLoading();
  };

  const handleSocialAuth = () => {
    if (isLoading) return;
    Alert.alert("Testing login only", "Please use the test email and password for this build.");
  };

  const startAuthLoading = () => {
    const canResumeHome = hasCompletedOnboarding || onboardingCompleted;
    if (canResumeHome) {
      resumeExistingSession();
    } else {
      beginAuthFlow();
    }

    setIsLoading(true);
    setTimeout(() => {
      router.replace(canResumeHome ? "/(tabs)/home" : "/(onboarding)/consent");
    }, 1100);
  };

  return (
    <SafeAreaView className="flex-1" style={styles.screen} edges={["top", "left", "right"]}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          contentContainerStyle={[
            styles.scrollContent,
            {
              paddingHorizontal: sidePadding,
              paddingBottom: insets.bottom + 32,
            },
          ]}
        >
          <View style={[styles.content, { maxWidth: contentWidth }]}>
            <View style={[styles.hero, { minHeight: heroHeight }]}>
              <View style={styles.heroAuraOne} />
              <View style={styles.heroAuraTwo} />
              <View style={styles.brandBlock}>
                <LotusMark />
                <View>
                  <View className="flex-row items-baseline">
                    <Text style={styles.brandMyStree}>MyStree</Text>
                    <Text style={styles.brandSoul}> Soul</Text>
                  </View>
                  <Text style={styles.brandTagline}>Women’s health & wellness</Text>
                </View>
              </View>
              <View style={styles.illustration}>
                <AuthHeroIllustration height={heroHeight} />
              </View>
            </View>

            <View
              className="bg-white"
              style={styles.segment}
              onLayout={(event) => setSegmentWidth(event.nativeEvent.layout.width)}
            >
              {segmentWidth > 0 ? (
                <Animated.View
                  pointerEvents="none"
                  style={[
                    styles.segmentActive,
                    {
                      width: (segmentWidth - 8) / 2,
                      transform: [{ translateX: activeTranslate }],
                    },
                  ]}
                />
              ) : null}
              <Pressable
                accessibilityRole="tab"
                accessibilityState={{ selected: isLogin }}
                accessibilityLabel="Log in"
                onPress={() => switchMode("login")}
                className="items-center justify-center"
                style={styles.segmentTab}
              >
                <Text style={[styles.segmentText, isLogin ? styles.segmentTextActive : null]}>Log In</Text>
              </Pressable>
              <Pressable
                accessibilityRole="tab"
                accessibilityState={{ selected: !isLogin }}
                accessibilityLabel="Sign up"
                onPress={() => switchMode("signup")}
                className="items-center justify-center"
                style={styles.segmentTab}
              >
                <Text style={[styles.segmentText, !isLogin ? styles.segmentTextActive : null]}>Sign Up</Text>
              </Pressable>
            </View>

            <View style={styles.headerCopy}>
              <Text style={styles.title}>{isLogin ? "Welcome back 🧡" : "Create your account"}</Text>
              <Text style={styles.subtitle}>
                {isLogin ? "We’re happy to see you again." : "Start your private health journey."}
              </Text>
            </View>

            <View style={styles.form}>
              {!isLogin ? (
                <AuthInput
                  icon={UserRound}
                  value={name}
                  onChangeText={setName}
                  placeholder="Full name"
                  autoCapitalize="words"
                  autoComplete="name"
                  textContentType="name"
                />
              ) : null}
              <AuthInput
                icon={Mail}
                value={email}
                onChangeText={setEmail}
                placeholder="Email or phone number"
                keyboardType="email-address"
                autoComplete="email"
                textContentType="emailAddress"
              />
              <AuthInput
                icon={LockKeyhole}
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                secureTextEntry
                autoComplete="password"
                textContentType={isLogin ? "password" : "newPassword"}
                returnKeyType="done"
              />
            </View>

            <View className="flex-row items-center justify-between" style={styles.utilityRow}>
              <Pressable
                accessibilityRole="checkbox"
                accessibilityState={{ checked: rememberMe }}
                accessibilityLabel="Remember me"
                onPress={() => setRememberMe((current) => !current)}
                className="flex-row items-center"
                style={styles.rememberTarget}
              >
                <View className="items-center justify-center" style={styles.checkbox}>
                  {rememberMe ? <Check size={16} color={colors.primary} strokeWidth={3} /> : null}
                </View>
                <Text style={styles.utilityText}>Remember me</Text>
              </Pressable>

              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Forgot password"
                onPress={() => Alert.alert("Password reset", "Password reset will be available when auth is connected.")}
                className="items-center justify-center"
                style={styles.forgotTarget}
              >
                <Text style={styles.forgotText}>Forgot password?</Text>
              </Pressable>
            </View>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel={isLogin ? "Log in" : "Create account"}
              onPress={handlePrimaryAction}
              disabled={isLoading}
              style={({ pressed }) => [styles.ctaPressable, pressed ? styles.ctaPressed : null]}
            >
              <LinearGradient
                colors={[colors.gradientStart, colors.gradientEnd]}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={styles.cta}
              >
                <Text style={styles.ctaText}>{isLoading ? "Entering..." : isLogin ? "Log In" : "Create Account"}</Text>
              </LinearGradient>
            </Pressable>

            <Divider />

            <View style={styles.socialStack}>
              <SocialButton provider="google" onPress={handleSocialAuth} />
              <SocialButton provider="apple" onPress={handleSocialAuth} />
            </View>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel={isLogin ? "Switch to sign up" : "Switch to log in"}
              onPress={() => switchMode(isLogin ? "signup" : "login")}
              className="flex-row items-center justify-center"
              style={styles.bottomSwitch}
            >
              <Text style={styles.bottomText}>{isLogin ? "New here?" : "Already have an account?"}</Text>
              <Text style={styles.bottomLink}>{isLogin ? " Sign up" : " Log in"}</Text>
              <ChevronRight size={20} color={colors.primary} strokeWidth={2.4} />
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {isLoading ? (
        <View style={styles.loadingOverlay} accessibilityViewIsModal accessibilityLabel="Preparing your sanctuary">
          <Animated.View
            className="items-center justify-center"
            style={[
              styles.loadingOrb,
              {
                opacity: loadingMotion.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.72, 1],
                }),
                transform: [
                  {
                    scale: loadingMotion.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.96, 1.04],
                    }),
                  },
                ],
              },
            ]}
          >
            <ActivityIndicator size="large" color={colors.primary} />
          </Animated.View>
          <Text style={styles.loadingTitle}>Preparing your sanctuary</Text>
          <Text style={styles.loadingSubtitle}>
            {hasCompletedOnboarding || onboardingCompleted
              ? "Opening your home dashboard."
              : "Taking you to privacy and consent."}
          </Text>
        </View>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
  },
  content: {
    width: "100%",
    alignSelf: "center",
  },
  hero: {
    width: "100%",
    overflow: "visible",
    justifyContent: "center",
    marginBottom: 24,
  },
  heroAuraOne: {
    position: "absolute",
    width: 208,
    height: 208,
    borderRadius: 104,
    backgroundColor: "#FFE6DA",
    opacity: 0.42,
    top: 8,
    right: -48,
  },
  heroAuraTwo: {
    position: "absolute",
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: "#FFFFFF",
    opacity: 0.9,
    left: -72,
    bottom: 8,
  },
  brandBlock: {
    zIndex: 2,
    width: "58%",
    gap: 8,
  },
  brandMyStree: {
    color: colors.textPrimary,
    fontFamily: "PlayfairDisplay_600SemiBold",
    fontSize: 31,
    lineHeight: 40,
    letterSpacing: 0,
  },
  brandSoul: {
    color: colors.primary,
    fontFamily: "PlayfairDisplay_400Regular",
    fontSize: 32,
    lineHeight: 40,
    letterSpacing: 0,
  },
  brandTagline: {
    color: colors.textSecondary,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 10,
    lineHeight: 16,
    letterSpacing: 2.4,
    textTransform: "uppercase",
  },
  illustration: {
    position: "absolute",
    top: 0,
    right: -76,
    width: "78%",
    zIndex: 1,
  },
  segment: {
    minHeight: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "rgba(254, 215, 170, 0.62)",
    padding: 4,
    flexDirection: "row",
    shadowColor: colors.shadowTint,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.07,
    shadowRadius: 24,
    elevation: 5,
    marginBottom: 32,
  },
  segmentActive: {
    position: "absolute",
    top: 4,
    bottom: 4,
    left: 4,
    borderRadius: 26,
    backgroundColor: colors.softTint,
  },
  segmentTab: {
    flex: 1,
    minHeight: 52,
    borderRadius: 26,
    zIndex: 2,
  },
  segmentText: {
    color: colors.textSecondary,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0,
  },
  segmentTextActive: {
    color: colors.primary,
  },
  headerCopy: {
    gap: 8,
    marginBottom: 24,
  },
  title: {
    color: colors.textPrimary,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 31,
    lineHeight: 40,
    letterSpacing: 0,
  },
  subtitle: {
    color: colors.textSecondary,
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
    lineHeight: 24,
    letterSpacing: 0,
  },
  form: {
    gap: 16,
  },
  utilityRow: {
    minHeight: 48,
    marginTop: 8,
    marginBottom: 16,
  },
  rememberTarget: {
    minHeight: 44,
    paddingRight: 12,
    gap: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: colors.surface,
  },
  utilityText: {
    color: colors.textSecondary,
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0,
  },
  forgotTarget: {
    minHeight: 44,
    paddingLeft: 12,
  },
  forgotText: {
    color: colors.primary,
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0,
  },
  ctaPressable: {
    borderRadius: 12,
    shadowColor: colors.shadowTint,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.18,
    shadowRadius: 24,
    elevation: 8,
  },
  ctaPressed: {
    transform: [{ scale: 0.97 }],
  },
  cta: {
    height: 56,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  ctaText: {
    color: colors.surface,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 17,
    lineHeight: 24,
    letterSpacing: 0,
  },
  divider: {
    gap: 16,
    marginVertical: 28,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(107, 102, 95, 0.18)",
  },
  dividerText: {
    color: colors.textSecondary,
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    lineHeight: 20,
    letterSpacing: 0,
  },
  socialStack: {
    gap: 16,
  },
  bottomSwitch: {
    minHeight: 56,
    marginTop: 28,
    marginBottom: 8,
  },
  bottomText: {
    color: colors.textSecondary,
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
    lineHeight: 22,
    letterSpacing: 0,
  },
  bottomLink: {
    color: colors.primary,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 15,
    lineHeight: 22,
    letterSpacing: 0,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 248, 245, 0.94)",
    paddingHorizontal: 32,
  },
  loadingOrb: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.surface,
    shadowColor: colors.shadowTint,
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.12,
    shadowRadius: 32,
    elevation: 8,
  },
  loadingTitle: {
    color: colors.textPrimary,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: 0,
    textAlign: "center",
    marginTop: 24,
  },
  loadingSubtitle: {
    color: colors.textSecondary,
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0,
    textAlign: "center",
    marginTop: 8,
  },
});
