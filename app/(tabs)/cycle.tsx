import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  Calendar,
  ChevronRight,
  Flower2,
  Moon,
  Smile,
  Zap,
} from "lucide-react-native";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, {
  Circle,
  Defs,
  G,
  LinearGradient as SvgLinearGradient,
  Path,
  Stop,
  Text as SvgText,
} from "react-native-svg";

import { useAppStore } from "@/store/app-store";

const colors = {
  warmWhite: "#FFF8F5",
  white: "#FFFFFF",
  primaryText: "#2C2A29",
  secondaryText: "#8D817C",
  coral: "#FF735C",
  palePink: "#FCE8EA",
  shadowTint: "#D98268",
};

const premiumShadow = {
  shadowColor: colors.shadowTint,
  shadowOffset: { width: 0, height: 16 },
  shadowOpacity: 0.06,
  shadowRadius: 32,
  elevation: 6,
};

const quickLogs = [
  { label: "Mood", Icon: Smile, color: "#FF7F62", bg: "#FFF0E8" },
  { label: "Symptoms", Icon: Flower2, color: "#EF8074", bg: "#FCE8EA" },
  { label: "Energy", Icon: Zap, color: "#F97316", bg: "#FFF2E4" },
  { label: "Sleep", Icon: Moon, color: "#9C83C8", bg: "#F0E9FB" },
] as const;

const bloopImage = require("@/images/webp/blooppink1.webp");

function CycleRing({ cycleLength }: { cycleLength: number }) {
  const center = 150;
  const radius = 106;
  const strokeWidth = 44;
  const circumference = 2 * Math.PI * radius;
  const safeCycleLength = Math.max(21, Number.isFinite(cycleLength) ? Math.round(cycleLength) : 28);
  const gap = circumference * 0.025;
  const drawableCircumference = Math.max(1, circumference - gap * 4);
  const phaseLengths = [5, 9, 4, Math.max(3, safeCycleLength - 18)];
  const arcs = phaseLengths.map((days) => Math.max(1, drawableCircumference * (days / safeCycleLength)));
  const offsets = arcs.map((_, index) =>
    -arcs.slice(0, index).reduce((total, arcLength) => total + arcLength + gap, 0),
  );

  return (
    <View className="items-center justify-center mt-8 mb-6">
      <View style={styles.ringGlow} />
      <Svg width={320} height={320} viewBox="0 0 300 300">
        <Defs>
          <SvgLinearGradient id="menstrual" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor="#FFB3B9" />
            <Stop offset="1" stopColor="#F58496" />
          </SvgLinearGradient>
          <SvgLinearGradient id="follicular" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor="#FFE4CA" />
            <Stop offset="1" stopColor="#FFB278" />
          </SvgLinearGradient>
          <SvgLinearGradient id="ovulation" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor="#FFA58F" />
            <Stop offset="1" stopColor="#FF7048" />
          </SvgLinearGradient>
          <SvgLinearGradient id="luteal" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor="#F6A4AD" />
            <Stop offset="1" stopColor="#E5859B" />
          </SvgLinearGradient>
        </Defs>

        <Circle cx={center} cy={center} r={radius} stroke="#FFF4EF" strokeWidth={strokeWidth} fill="none" />
        {[
          ["menstrual", offsets[0]],
          ["follicular", offsets[1]],
          ["ovulation", offsets[2]],
          ["luteal", offsets[3]],
        ].map(([id, offset], index) => {
          const arcLength = arcs[index];

          return (
            <Circle
              key={id}
              cx={center}
              cy={center}
              r={radius}
              stroke={`url(#${id})`}
              strokeWidth={strokeWidth}
              strokeDasharray={`${arcLength} ${circumference - arcLength}`}
              strokeDashoffset={Number(offset)}
              strokeLinecap="round"
              fill="none"
              rotation="-128"
              originX={center}
              originY={center}
            />
          );
        })}

        <Circle cx={center} cy={center} r={73} fill={colors.white} opacity={0.96} />
        <Circle cx={center} cy={center} r={85} stroke="#FFFFFF" strokeWidth={3} fill="none" opacity={0.9} />
        <Circle
          cx={center}
          cy={center}
          r={65}
          stroke="#F8DDD4"
          strokeWidth={1}
          strokeDasharray="1 7"
          fill="none"
          opacity={0.9}
        />

        <SvgText
          x={center}
          y={137}
          fill={colors.primaryText}
          fontSize={28}
          fontWeight="700"
          fontFamily="Poppins_600SemiBold"
          textAnchor="middle"
        >
          Day 14
        </SvgText>
        <SvgText
          x={center}
          y={164}
          fill={colors.coral}
          fontSize={14}
          fontWeight="600"
          fontFamily="Poppins_600SemiBold"
          textAnchor="middle"
        >
          Ovulation Phase
        </SvgText>

        <G>
          <Circle cx="178" cy="210" r="18" fill="#FF735C" opacity={0.12} />
          <Circle cx="178" cy="210" r="11" fill="#FF735C" opacity={0.24} />
          <Circle cx="178" cy="210" r="6" fill="#FF735C" />
        </G>
      </Svg>
    </View>
  );
}

function WomanFloralMark() {
  return (
    <Svg width={58} height={58} viewBox="0 0 120 120">
      <Defs>
        <SvgLinearGradient id="womanMark" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#F25D77" />
          <Stop offset="1" stopColor="#FF9E64" />
        </SvgLinearGradient>
      </Defs>
      <Circle cx="62" cy="60" r="52" fill="#FFF0EC" opacity={0.95} />
      <Path
        d="M67 27 C45 27 35 46 38 64 C41 83 59 92 76 91 C60 83 54 71 57 57 C59 46 68 40 80 39 C78 33 74 28 67 27Z"
        fill="url(#womanMark)"
      />
      <Path
        d="M74 38 C62 43 57 55 60 69 C63 83 75 91 89 92 C75 84 70 70 72 55 C73 47 78 42 86 39 C82 37 78 37 74 38Z"
        fill="#FFF8F5"
        opacity={0.95}
      />
      <Path
        d="M67 45 C62 52 60 61 62 70 C66 67 72 64 78 63 C72 58 68 52 67 45Z"
        fill="#FFF8F5"
      />
      <Path d="M32 82 C47 82 62 88 78 101" stroke="#FF8A62" strokeWidth={3} fill="none" />
      <Path d="M79 101 C88 94 97 91 108 90" stroke="#FF8A62" strokeWidth={3} fill="none" />
      <Path d="M92 88 C93 77 99 70 108 65 C111 77 105 85 92 88Z" fill="#FFB48A" />
      <Path d="M77 100 C72 88 76 79 85 73 C90 86 87 95 77 100Z" fill="#FFB48A" />
      <Path d="M99 101 C106 93 114 91 120 93 C116 102 108 105 99 101Z" fill="#FFB48A" />
      <Path d="M18 75 C28 62 29 48 25 35" stroke="#F6A79A" strokeWidth={3} fill="none" opacity={0.8} />
      <Path d="M23 55 C12 49 9 40 13 31 C24 38 27 46 23 55Z" fill="#F6A79A" opacity={0.72} />
      <Path d="M21 72 C10 69 4 61 4 51 C16 54 23 61 21 72Z" fill="#F6A79A" opacity={0.72} />
      <Path d="M28 43 C28 31 34 24 43 20 C44 32 38 40 28 43Z" fill="#F6A79A" opacity={0.72} />
      <Path d="M89 30 L93 38 L101 41 L93 45 L90 53 L86 45 L78 42 L86 38Z" fill="#FF8A7A" opacity={0.85} />
      <Path d="M106 50 L109 56 L116 58 L109 61 L106 68 L103 61 L96 58 L103 55Z" fill="#FF8A7A" opacity={0.8} />
    </Svg>
  );
}

function InsightSparkle() {
  return (
    <Svg width={14} height={14} viewBox="0 0 24 24">
      <Path d="M12 1 L15 9 L23 12 L15 15 L12 23 L9 15 L1 12 L9 9Z" fill="#FF9B86" />
    </Svg>
  );
}

function InsightWaves() {
  return (
    <Svg width="100%" height={42} viewBox="0 0 330 64" preserveAspectRatio="none">
      <Path
        d="M0 18 C44 -6 69 51 122 28 C178 3 202 60 256 40 C293 27 311 42 330 20 L330 64 L0 64Z"
        fill="#FFF0E8"
        opacity={0.82}
      />
      <Path
        d="M0 26 C46 2 73 50 126 34 C178 19 199 60 254 48 C288 40 311 45 330 30"
        stroke="#FFFFFF"
        strokeWidth={2}
        fill="none"
        opacity={0.95}
      />
      <Path
        d="M96 40 C142 11 169 17 213 45 C253 70 295 48 330 32"
        stroke="#FFC5B5"
        strokeWidth={1}
        strokeDasharray="2 4"
        fill="none"
        opacity={0.55}
      />
    </Svg>
  );
}

function TodayInsightCard() {
  return (
    <View className="bg-white" style={styles.insightCard}>
      <View pointerEvents="none" style={styles.insightWaveLayer}>
        <InsightWaves />
      </View>

      <View style={styles.insightMainRow}>
        <View style={styles.insightArtWrap}>
          <WomanFloralMark />
        </View>

        <View style={styles.insightCopy}>
          <View style={styles.insightEyebrowRow}>
            <Text style={styles.insightEyebrow}>TODAY'S INSIGHT</Text>
            <InsightSparkle />
          </View>
          <View style={styles.insightRule} />
          <Text style={styles.insightMessage}>
            Your energy may feel higher today. This is a great time to focus and take action.
          </Text>
        </View>

        <View style={styles.insightDivider} />

        <View style={styles.bloopPanel}>
          <View style={styles.bloopSparkle}>
            <InsightSparkle />
          </View>
          <Image source={bloopImage} contentFit="contain" transition={300} style={styles.bloopImage} />
          <Text style={styles.bloopName}>Bloop AI</Text>
          <Text style={styles.bloopDescription}>Your personal women's health companion</Text>
        </View>
      </View>
    </View>
  );
}

function FloralWatermark() {
  return (
    <Svg width={86} height={78} viewBox="0 0 86 78">
      <G opacity={0.34}>
        <Path d="M25 68 C40 50 46 35 47 12" stroke="#FF8A7A" strokeWidth={2} fill="none" />
        <Path d="M44 47 C58 42 68 34 76 21" stroke="#FF8A7A" strokeWidth={2} fill="none" />
        <Path d="M38 56 C51 57 60 61 68 69" stroke="#FF8A7A" strokeWidth={2} fill="none" />
        <Path d="M47 24 C37 19 34 9 37 2 C48 8 52 16 47 24Z" fill="#FFB5AA" />
        <Path d="M57 41 C54 29 59 20 70 14 C73 27 68 36 57 41Z" fill="#FFB5AA" />
        <Path d="M67 30 C67 19 73 12 84 8 C85 19 78 27 67 30Z" fill="#FFB5AA" />
        <Path d="M42 53 C31 47 27 38 30 29 C41 35 46 43 42 53Z" fill="#FFB5AA" />
        <Path d="M57 61 C66 55 77 55 84 62 C74 68 65 68 57 61Z" fill="#FFB5AA" />
      </G>
    </Svg>
  );
}

export default function CycleScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const cycleLength = useAppStore((state) => state.cycleLength);

  return (
    <SafeAreaView className="flex-1" style={styles.screen} edges={["top", "left", "right"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 20 }]}
      >
        <View className="px-8 pt-8">
          <View className="flex-row items-start justify-between">
            <View className="flex-1 pr-5">
              <Text style={styles.title}>Your Cycle</Text>
              <Text style={styles.subtitle}>Understanding your body's rhythm</Text>
            </View>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Open cycle calendar"
              className="items-center justify-center bg-white"
              style={styles.calendarButton}
            >
              <Calendar size={24} color={colors.coral} strokeWidth={2.2} />
            </Pressable>
          </View>
        </View>

        <View className="px-8">
          <CycleRing cycleLength={cycleLength} />
        </View>

        <View className="px-8">
          <TodayInsightCard />
        </View>

        <View className="px-8">
          <View className="flex-row justify-between mt-4">
            {quickLogs.map(({ label, Icon, color, bg }) => (
              <Pressable
                key={label}
                accessibilityRole="button"
                accessibilityLabel={`Log ${label.toLowerCase()}`}
                className="items-center justify-center bg-white"
                style={styles.quickCard}
              >
                <Text style={styles.quickLabel}>{label}</Text>
                <View className="items-center justify-center" style={[styles.quickIcon, { backgroundColor: bg }]}>
                  <Icon size={24} color={color} strokeWidth={2.3} />
                </View>
                <View className="items-center justify-center" style={styles.chevronBubble}>
                  <ChevronRight size={15} color={colors.secondaryText} strokeWidth={2.2} />
                </View>
              </Pressable>
            ))}
          </View>
        </View>

        <View className="px-8">
          <View className="flex-row items-center bg-white mt-4 overflow-hidden" style={styles.upcomingCard}>
            <View className="items-center justify-center" style={styles.upcomingIcon}>
              <Calendar size={28} color="#E96F82" strokeWidth={2.1} />
            </View>
            <View className="flex-1 ml-5">
              <Text style={styles.upcomingTitle}>Next cycle in 12 days</Text>
              <Text style={styles.upcomingSubtitle}>Fertility window approaching</Text>
            </View>
            <View style={styles.watermark}>
              <FloralWatermark />
            </View>
          </View>
        </View>

        <View className="px-8 mt-6 mb-8">
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Log today"
            onPress={() => router.push("/(modals)/log-day")}
          >
            <LinearGradient
              colors={["#FF7048", "#FFB179"]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.cta}
            >
              <Text style={styles.ctaText}>Log Today</Text>
            </LinearGradient>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.warmWhite,
  },
  scrollContent: {
    flexGrow: 1,
  },
  title: {
    color: colors.primaryText,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 32,
    lineHeight: 39,
  },
  subtitle: {
    color: colors.secondaryText,
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    lineHeight: 21,
    marginTop: 4,
  },
  calendarButton: {
    minHeight: 44,
    minWidth: 44,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#FFE1D8",
    ...premiumShadow,
  },
  ringGlow: {
    position: "absolute",
    width: 248,
    height: 248,
    borderRadius: 124,
    backgroundColor: "#FFECE4",
    opacity: 0.72,
    shadowColor: colors.coral,
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.1,
    shadowRadius: 42,
  },
  insightCard: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#FFE2D9",
    minHeight: 132,
    overflow: "hidden",
    paddingHorizontal: 14,
    paddingVertical: 14,
    ...premiumShadow,
  },
  insightWaveLayer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 42,
  },
  insightMainRow: {
    flexDirection: "row",
    alignItems: "center",
    zIndex: 1,
  },
  insightArtWrap: {
    width: 54,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  insightCopy: {
    flex: 1,
    minWidth: 0,
    paddingRight: 10,
  },
  insightEyebrowRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  insightEyebrow: {
    color: "#F0643F",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 8,
    letterSpacing: 2,
    lineHeight: 12,
  },
  insightRule: {
    width: "86%",
    height: 1,
    backgroundColor: "#FBD5CA",
    marginTop: 5,
    marginBottom: 7,
  },
  insightMessage: {
    color: colors.primaryText,
    fontFamily: "PlayfairDisplay_500Medium",
    fontSize: 15,
    lineHeight: 21,
  },
  insightDivider: {
    width: 1,
    height: 94,
    backgroundColor: "#F6DDD5",
    marginRight: 10,
  },
  bloopPanel: {
    width: 66,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  bloopSparkle: {
    position: "absolute",
    right: 0,
    top: 14,
    opacity: 0.8,
  },
  bloopImage: {
    width: 42,
    height: 42,
    marginBottom: 2,
  },
  bloopName: {
    color: "#F05F68",
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    lineHeight: 18,
    textAlign: "center",
  },
  bloopDescription: {
    color: colors.secondaryText,
    fontFamily: "Poppins_400Regular",
    fontSize: 8,
    lineHeight: 11,
    textAlign: "center",
    marginTop: 2,
  },
  quickCard: {
    width: 76,
    height: 76,
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 6,
    ...premiumShadow,
  },
  quickLabel: {
    color: colors.primaryText,
    fontFamily: "Poppins_500Medium",
    fontSize: 11,
    lineHeight: 15,
    marginBottom: 4,
  },
  quickIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  chevronBubble: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: "#F4DED8",
    marginTop: 3,
  },
  upcomingCard: {
    borderRadius: 16,
    padding: 24,
    minHeight: 112,
    ...premiumShadow,
  },
  upcomingIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#FCE8EA",
  },
  upcomingTitle: {
    color: colors.primaryText,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 17,
    lineHeight: 24,
  },
  upcomingSubtitle: {
    color: colors.secondaryText,
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    lineHeight: 21,
    marginTop: 4,
  },
  watermark: {
    position: "absolute",
    right: 12,
    bottom: 12,
  },
  cta: {
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.shadowTint,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 8,
  },
  ctaText: {
    color: colors.white,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    lineHeight: 24,
  },
});
