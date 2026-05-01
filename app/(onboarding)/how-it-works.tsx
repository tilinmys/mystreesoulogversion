import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  ArrowLeft,
  CalendarDays,
  MessageCircle,
  PieChart,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react-native";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { G, Path } from "react-native-svg";

const palette = {
  warmIvory: "#FFF8F5",
  white: "#FFFFFF",
  primaryText: "#2C2A29",
  secondaryText: "#8D8582",
  line: "#EEDCD6",
  coral: "#FF6348",
  shadowTint: "#D98268",
};

const cardShadow = {
  shadowColor: palette.shadowTint,
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 0.05,
  shadowRadius: 16,
  elevation: 4,
};

type Step = {
  title: string;
  description: string;
  Icon: LucideIcon;
  iconColor: string;
  bubbleColor: string;
  dotColor: string;
};

const steps: Step[] = [
  {
    title: "1. Track Your Rhythm",
    description: "Log daily symptoms and uncover your body's patterns.",
    Icon: CalendarDays,
    iconColor: "#EF4B78",
    bubbleColor: "#FDECF1",
    dotColor: "#F9437C",
  },
  {
    title: "2. Chat with Bloop",
    description: "Get support for mood, period pain, and emotional wellness.",
    Icon: MessageCircle,
    iconColor: "#F97316",
    bubbleColor: "#FFF0E8",
    dotColor: "#FF7A1A",
  },
  {
    title: "3. Secure Your Vault",
    description: "Safely store private medical records locally.",
    Icon: ShieldCheck,
    iconColor: "#F3735E",
    bubbleColor: "#FFF0EA",
    dotColor: "#FF7356",
  },
  {
    title: "4. Gain Insights",
    description: "Receive weekly reports on your overall wellness.",
    Icon: PieChart,
    iconColor: "#EF4E38",
    bubbleColor: "#FFF0EC",
    dotColor: "#EF4E38",
  },
];

function LeafWatermark() {
  return (
    <View pointerEvents="none" style={styles.leafWatermark}>
      <Svg width={176} height={176} viewBox="0 0 176 176">
        <G opacity={0.4}>
          <Path d="M36 164 C76 112 102 58 138 8" stroke="#F6B8AA" strokeWidth={3} fill="none" />
          <Path d="M95 74 C118 62 139 42 160 16" stroke="#F6B8AA" strokeWidth={2} fill="none" />
          <Path d="M79 110 C109 105 136 113 168 132" stroke="#F6B8AA" strokeWidth={2} fill="none" />
          <Path d="M128 28 C116 11 121 0 144 0 C151 20 144 31 128 28Z" fill="#F9D8D1" />
          <Path d="M104 66 C82 52 80 30 96 16 C115 32 119 51 104 66Z" fill="#F9D8D1" />
          <Path d="M125 65 C139 45 154 36 176 37 C166 61 149 69 125 65Z" fill="#F9D8D1" />
          <Path d="M84 103 C61 90 54 69 66 53 C88 67 96 85 84 103Z" fill="#F9D8D1" />
          <Path d="M99 119 C126 109 149 115 168 131 C142 145 119 142 99 119Z" fill="#F9D8D1" />
        </G>
      </Svg>
    </View>
  );
}

function Sparkle({ style }: { style: object }) {
  return (
    <View pointerEvents="none" style={style}>
      <Svg width={24} height={24} viewBox="0 0 24 24">
        <Path d="M12 1 L15 9 L23 12 L15 15 L12 23 L9 15 L1 12 L9 9Z" fill="#F9B5A8" opacity={0.62} />
      </Svg>
    </View>
  );
}

function TimelineDot({ color }: { color: string }) {
  return (
    <View className="items-center justify-center" style={styles.dotOuter}>
      <View style={[styles.dotInner, { backgroundColor: color }]} />
    </View>
  );
}

function FeatureCard({ step }: { step: Step }) {
  const Icon = step.Icon;

  return (
    <View className="flex-row items-center bg-white" style={styles.featureCard}>
      <View className="items-center justify-center" style={[styles.iconBubble, { backgroundColor: step.bubbleColor }]}>
        <Icon size={32} color={step.iconColor} strokeWidth={2} />
      </View>
      <View className="flex-1 ml-3">
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.cardTitle}>
          {step.title}
        </Text>
        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.cardDescription}>
          {step.description}
        </Text>
      </View>
    </View>
  );
}

export default function HowItWorksScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const goBack = () => {
    if (router.canGoBack()) {
      router.back();
      return;
    }
    router.replace("/(onboarding)/consent");
  };

  return (
    <SafeAreaView className="flex-1" style={styles.screen} edges={["top", "left", "right"]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Go back"
        onPress={goBack}
        className="items-center justify-center"
        style={styles.backButton}
      >
        <ArrowLeft size={24} color={palette.primaryText} strokeWidth={2.2} />
      </Pressable>

      <LeafWatermark />
      <Sparkle style={styles.sparkleTop} />
      <Sparkle style={styles.sparkleMid} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 112 }]}
      >
        <View className="px-8">
          <View style={styles.header}>
            <Text style={styles.title}>How MyStree{"\n"}Soul Works</Text>
            <Text style={styles.subtitle}>
              Your personal sanctuary for cycle tracking, health records, and emotional wellness.
            </Text>
          </View>

          <View style={styles.timelineWrap}>
            <View style={styles.timelineLine} />
            {steps.map((step) => (
              <View key={step.title} className="flex-row" style={styles.stepRow}>
                <View style={styles.dotColumn}>
                  <TimelineDot color={step.dotColor} />
                </View>
                <View className="flex-1">
                  <FeatureCard step={step} />
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <View
        pointerEvents="box-none"
        style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}
      >
        <View className="px-8">
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="I Understand, Let's Begin"
            onPress={() => router.push("/(onboarding)/goals")}
          >
            <LinearGradient
              colors={["#FF5439", "#FF724E"]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.cta}
            >
              <Text style={styles.ctaText}>I Understand, Let's Begin</Text>
            </LinearGradient>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: palette.warmIvory,
  },
  leafWatermark: {
    position: "absolute",
    top: 96,
    right: -8,
  },
  sparkleTop: {
    position: "absolute",
    top: 152,
    right: 104,
  },
  sparkleMid: {
    position: "absolute",
    top: 232,
    right: 112,
  },
  scrollContent: {
    flexGrow: 1,
  },
  backButton: {
    position: "absolute",
    top: 16,
    left: 24,
    zIndex: 10,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: palette.white,
    shadowColor: palette.shadowTint,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 4,
  },
  header: {
    paddingTop: 88,
  },
  title: {
    color: palette.primaryText,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 32,
    lineHeight: 40,
    letterSpacing: 0,
  },
  subtitle: {
    color: palette.secondaryText,
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    lineHeight: 24,
    letterSpacing: 0,
    marginTop: 24,
    maxWidth: 304,
  },
  timelineWrap: {
    position: "relative",
    marginTop: 48,
  },
  timelineLine: {
    position: "absolute",
    left: 24,
    top: 32,
    bottom: 72,
    width: 1,
    backgroundColor: palette.line,
  },
  stepRow: {
    alignItems: "center",
    marginBottom: 16,
  },
  dotColumn: {
    width: 64,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  dotOuter: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: palette.warmIvory,
    borderWidth: 1,
    borderColor: palette.line,
  },
  dotInner: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  featureCard: {
    minHeight: 104,
    borderRadius: 16,
    padding: 12,
    ...cardShadow,
  },
  iconBubble: {
    width: 64,
    height: 64,
    borderRadius: 32,
    flexShrink: 0,
  },
  cardTitle: {
    color: palette.primaryText,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 15,
    lineHeight: 21,
    letterSpacing: 0,
  },
  cardDescription: {
    color: palette.secondaryText,
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    lineHeight: 20,
    letterSpacing: 0,
    marginTop: 4,
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
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 0,
  },
});
