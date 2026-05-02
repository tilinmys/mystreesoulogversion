import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ArrowRight, CalendarDays, Check, ChevronDown, ShieldCheck, UserRound } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  Alert,
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
import Svg, { G, Path } from "react-native-svg";

import { preloadFounderQuoteImages } from "@/lib/image-preloader";
import { useAppStore } from "@/store/app-store";

const palette = {
  warmIvory: "#FFF8F5",
  white: "#FFFFFF",
  primaryText: "#2C2A29",
  secondaryText: "#8D8582",
  mutedText: "#A69B98",
  coral: "#FF7356",
  coralDeep: "#FF5A3D",
  coralSoft: "#FFF0EC",
  line: "#E9DEDC",
  shadowTint: "#D98268",
};

const premiumShadow = {
  shadowColor: palette.shadowTint,
  shadowOffset: { width: 0, height: 16 },
  shadowOpacity: 0.06,
  shadowRadius: 32,
  elevation: 6,
};

function LeafDecoration() {
  return (
    <View pointerEvents="none" style={styles.leafDecoration}>
      <Svg width={128} height={176} viewBox="0 0 128 176">
        <G opacity={0.42}>
          <Path d="M0 164 C28 106 60 55 108 8" stroke="#F8B9AD" strokeWidth={3} fill="none" />
          <Path d="M20 107 C8 87 10 67 28 51 C44 74 42 94 20 107Z" fill="#F8CEC6" />
          <Path d="M40 78 C26 57 33 35 56 22 C68 49 62 68 40 78Z" fill="#F8CEC6" />
          <Path d="M61 50 C53 27 62 10 88 2 C94 30 84 45 61 50Z" fill="#F8CEC6" />
          <Path d="M11 137 C30 123 52 122 76 134 C53 151 30 152 11 137Z" fill="#F8CEC6" />
          <Path d="M34 107 C55 93 80 95 105 111 C79 127 56 126 34 107Z" fill="#F8CEC6" />
        </G>
      </Svg>
    </View>
  );
}

function Sparkle({ style }: { style: object }) {
  return (
    <View pointerEvents="none" style={style}>
      <Svg width={24} height={24} viewBox="0 0 24 24">
        <Path d="M12 1 L15 9 L23 12 L15 15 L12 23 L9 15 L1 12 L9 9Z" fill="#FFAA98" opacity={0.72} />
      </Svg>
    </View>
  );
}

function ProgressBar() {
  return (
    <View className="items-center" style={styles.progressWrap}>
      <View style={styles.progressTrack} />
      <View style={styles.progressFill} />
      <View className="flex-row items-center justify-between" style={styles.progressDots}>
        <View className="items-center justify-center" style={[styles.stepCircle, styles.stepCircleActive]}>
          <Check size={22} color={palette.coral} strokeWidth={3} />
        </View>
        <View style={styles.stepCircle} />
        <View style={styles.stepCircle} />
      </View>
      <Text style={styles.stepText}>Step 1 of 3</Text>
    </View>
  );
}

export default function CycleSetupScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const store = useAppStore();
  const setCycleSetup = useAppStore((state) => state.setCycleSetup);
  const updateProfile = useAppStore((state) => state.updateProfile);
  const [preferredName, setPreferredName] = useState(store.userName === "Aarya" ? "" : store.userName);
  const [dateOfBirth, setDateOfBirth] = useState(store.dateOfBirth);
  const [focusedField, setFocusedField] = useState<"name" | "dob" | null>(null);

  useEffect(() => preloadFounderQuoteImages(), []);

  const goNext = () => {
    const cleanName = preferredName.trim();
    const cleanDob = dateOfBirth.trim();

    if (!cleanName) {
      Alert.alert("Preferred name required", "Please enter the name you would like MyStree Soul to use.");
      return;
    }

    if (!cleanDob) {
      Alert.alert("Date of birth required", "Please enter your date of birth before continuing.");
      return;
    }

    updateProfile({ userName: cleanName, dateOfBirth: cleanDob });
    router.push("/(onboarding)/cycle-details");
  };

  return (
    <SafeAreaView className="flex-1" style={styles.screen} edges={["top", "left", "right"]}>
      <LeafDecoration />
      <Sparkle style={styles.sparkleOne} />
      <Sparkle style={styles.sparkleTwo} />
      <Sparkle style={styles.sparkleThree} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 136 }]}
        >
          <View className="px-8">
            <ProgressBar />

            <View style={styles.header}>
              <Text style={styles.title}>Let's get to know you.</Text>
              <Text style={styles.subtitle}>This helps us personalize your experience.</Text>
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Preferred Name</Text>
              <View style={[styles.nameInputCard, focusedField === "name" ? styles.inputFocused : null]}>
                <UserRound size={32} color={palette.coral} strokeWidth={2} />
                <View className="flex-1 ml-6">
                  <TextInput
                    value={preferredName}
                    onChangeText={setPreferredName}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Enter your name"
                    placeholderTextColor={palette.mutedText}
                    accessibilityLabel="Preferred Name"
                    returnKeyType="next"
                    style={styles.textInput}
                  />
                  <View style={styles.inputUnderline} />
                </View>
              </View>
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Date of Birth</Text>
              <Text style={styles.helper}>You must be 18 years or older to continue.</Text>
              <View style={[styles.dobInputCard, focusedField === "dob" ? styles.inputFocused : null]}>
                <View className="items-center justify-center" style={styles.calendarBubble}>
                  <CalendarDays size={32} color={palette.coral} strokeWidth={2} />
                </View>
                <TextInput
                  value={dateOfBirth}
                  onChangeText={setDateOfBirth}
                  onFocus={() => setFocusedField("dob")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Select your date of birth"
                  placeholderTextColor={palette.primaryText}
                  accessibilityLabel="Date of Birth"
                  style={styles.dobInput}
                />
                <ChevronDown size={32} color={palette.coral} strokeWidth={2.4} />
              </View>
            </View>

            <View className="flex-row items-center" style={styles.privacyCard}>
              <ShieldCheck size={40} color={palette.coral} strokeWidth={1.9} />
              <Text style={styles.privacyText}>Your data is private and stored securely on your device.</Text>
            </View>
          </View>
        </ScrollView>

        <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
          <View className="px-8">
            <Pressable accessibilityRole="button" accessibilityLabel="Next" onPress={goNext}>
              <LinearGradient
                colors={[palette.coralDeep, palette.coral]}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={styles.cta}
              >
                <Text style={styles.ctaText}>Next</Text>
                <ArrowRight size={32} color={palette.white} strokeWidth={2.3} style={styles.ctaIcon} />
              </LinearGradient>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: palette.warmIvory,
  },
  leafDecoration: {
    position: "absolute",
    top: 112,
    left: -16,
  },
  sparkleOne: {
    position: "absolute",
    top: 224,
    right: 72,
  },
  sparkleTwo: {
    position: "absolute",
    top: 256,
    right: 104,
  },
  sparkleThree: {
    position: "absolute",
    top: 264,
    right: 40,
  },
  scrollContent: {
    flexGrow: 1,
  },
  progressWrap: {
    paddingTop: 56,
    height: 144,
  },
  progressTrack: {
    position: "absolute",
    top: 80,
    width: 240,
    height: 4,
    borderRadius: 2,
    backgroundColor: palette.line,
  },
  progressFill: {
    position: "absolute",
    top: 80,
    left: "50%",
    marginLeft: -120,
    width: 120,
    height: 4,
    borderRadius: 2,
    backgroundColor: palette.coral,
  },
  progressDots: {
    width: 288,
  },
  stepCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: palette.warmIvory,
    borderWidth: 4,
    borderColor: palette.line,
  },
  stepCircleActive: {
    borderColor: palette.coral,
    backgroundColor: palette.white,
    ...premiumShadow,
  },
  stepText: {
    color: palette.coral,
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    lineHeight: 24,
    marginTop: 16,
  },
  header: {
    marginTop: 32,
  },
  title: {
    color: palette.primaryText,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 40,
    lineHeight: 48,
    letterSpacing: 0,
  },
  subtitle: {
    color: palette.secondaryText,
    fontFamily: "Poppins_400Regular",
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 0,
    marginTop: 24,
  },
  fieldGroup: {
    marginTop: 64,
  },
  label: {
    color: palette.primaryText,
    fontFamily: "Poppins_500Medium",
    fontSize: 20,
    lineHeight: 24,
    letterSpacing: 0,
    marginBottom: 24,
  },
  helper: {
    color: palette.secondaryText,
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    lineHeight: 24,
    letterSpacing: 0,
    marginTop: -16,
    marginBottom: 24,
  },
  nameInputCard: {
    minHeight: 128,
    borderRadius: 24,
    backgroundColor: palette.white,
    borderWidth: 1,
    borderColor: "transparent",
    paddingHorizontal: 32,
    flexDirection: "row",
    alignItems: "center",
    ...premiumShadow,
  },
  dobInputCard: {
    minHeight: 96,
    borderRadius: 24,
    backgroundColor: palette.white,
    borderWidth: 1,
    borderColor: "transparent",
    paddingHorizontal: 32,
    flexDirection: "row",
    alignItems: "center",
    ...premiumShadow,
  },
  inputFocused: {
    borderColor: palette.coral,
    borderWidth: 2,
  },
  textInput: {
    minHeight: 56,
    color: palette.primaryText,
    fontFamily: "Poppins_400Regular",
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 0,
    paddingVertical: 0,
  },
  inputUnderline: {
    height: 1,
    backgroundColor: "#F5B5A8",
    marginTop: 8,
  },
  calendarBubble: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: palette.coralSoft,
    marginRight: 24,
  },
  dobInput: {
    flex: 1,
    minHeight: 56,
    color: palette.primaryText,
    fontFamily: "Poppins_400Regular",
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 0,
    paddingVertical: 0,
  },
  privacyCard: {
    minHeight: 104,
    borderRadius: 24,
    backgroundColor: palette.coralSoft,
    paddingHorizontal: 32,
    gap: 24,
    marginTop: 64,
  },
  privacyText: {
    flex: 1,
    color: palette.primaryText,
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0,
  },
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: 16,
    backgroundColor: "rgba(255, 248, 245, 0.96)",
  },
  cta: {
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: palette.shadowTint,
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.16,
    shadowRadius: 32,
    elevation: 8,
  },
  ctaText: {
    color: palette.white,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: 0,
  },
  ctaIcon: {
    position: "absolute",
    right: 32,
  },
});
