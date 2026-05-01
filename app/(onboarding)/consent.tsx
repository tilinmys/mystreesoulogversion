import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ArrowLeft, Check, Heart } from "lucide-react-native";
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react";
import Svg, {
  Defs,
  G,
  LinearGradient as SvgLinearGradient,
  Path,
  Stop,
} from "react-native-svg";

import { useAppStore } from "@/store/app-store";

const palette = {
  white: "#FFFFFF",
  primaryText: "#2C2A29",
  secondaryText: "#8D8582",
  coral: "#FF7356",
  coralDeep: "#FF644A",
  coralSoft: "#FFF3EF",
  coralStroke: "#BFA7A2",
  shadowTint: "#D98268",
};

const premiumShadow = {
  shadowColor: palette.shadowTint,
  shadowOffset: { width: 0, height: 16 },
  shadowOpacity: 0.06,
  shadowRadius: 32,
  elevation: 6,
};

const consentItems = [
  {
    id: "age",
    title: "I am 18 years or older.",
    body: "Required to securely store reproductive health data.",
  },
  {
    id: "storage",
    title: "Secure Vault Storage.",
    body: "I consent to storing my cycle and health data locally on this device for beta testing.",
  },
  {
    id: "bloop",
    title: "Bloop AI Acknowledgement.",
    body: "I understand that Bloop AI is a supportive companion, not a medical diagnostic tool.",
  },
] as const;

type ConsentId = (typeof consentItems)[number]["id"];

function PrivacyHero() {
  return (
    <View className="items-center justify-center" style={styles.heroGlow}>
      <Svg width={80} height={80} viewBox="0 0 128 128">
        <Defs>
          <SvgLinearGradient id="shieldFill" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor="#FFC4B5" />
            <Stop offset="1" stopColor="#FF7356" />
          </SvgLinearGradient>
        </Defs>
        <G>
          <Path
            d="M64 18 C74 31 88 35 102 35 V61 C102 84 88 100 64 111 C40 100 26 84 26 61 V35 C40 35 54 31 64 18Z"
            fill="url(#shieldFill)"
          />
          <Path
            d="M64 18 C74 31 88 35 102 35 V61 C102 84 88 100 64 111 C40 100 26 84 26 61 V35 C40 35 54 31 64 18Z"
            stroke={palette.white}
            strokeWidth={10}
            strokeLinejoin="round"
            fillOpacity={0.82}
          />
          <Heart x={48} y={50} size={32} color={palette.white} fill={palette.white} strokeWidth={0} />
        </G>
      </Svg>
    </View>
  );
}

function LeafWatermark() {
  return (
    <View pointerEvents="none" style={styles.leafWatermark}>
      <Svg width={120} height={152} viewBox="0 0 176 224">
        <G opacity={0.42}>
          <Path d="M28 204 C74 142 96 84 122 14" stroke="#F8B9AD" strokeWidth={4} fill="none" />
          <Path d="M91 101 C121 86 141 63 158 26" stroke="#F8B9AD" strokeWidth={3} fill="none" />
          <Path d="M72 144 C105 136 130 144 158 164" stroke="#F8B9AD" strokeWidth={3} fill="none" />
          <Path d="M116 41 C106 19 113 4 136 0 C146 24 139 37 116 41Z" fill="#FAD4CE" />
          <Path d="M98 88 C74 69 72 46 88 29 C109 47 112 70 98 88Z" fill="#FAD4CE" />
          <Path d="M126 76 C140 50 158 38 176 39 C167 67 151 78 126 76Z" fill="#FAD4CE" />
          <Path d="M79 129 C52 116 43 92 54 72 C79 85 89 107 79 129Z" fill="#FAD4CE" />
          <Path d="M96 148 C124 137 149 143 168 160 C141 176 116 173 96 148Z" fill="#FAD4CE" />
        </G>
      </Svg>
    </View>
  );
}

function Sparkle({ style }: { style: object }) {
  return (
    <View pointerEvents="none" style={style}>
      <Svg width={16} height={16} viewBox="0 0 24 24">
        <Path d="M12 1 L15 9 L23 12 L15 15 L12 23 L9 15 L1 12 L9 9Z" fill="#F9B5A8" opacity={0.62} />
      </Svg>
    </View>
  );
}

function ConsentCard({
  title,
  body,
  checked,
  onPress,
}: {
  title: string;
  body: string;
  checked: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
      accessibilityLabel={title}
      onPress={onPress}
      className="bg-white"
      style={styles.consentCard}
    >
      <View className="items-center justify-center" style={[styles.checkbox, checked ? styles.checkboxActive : null]}>
        {checked ? <Check size={28} color={palette.white} strokeWidth={2.6} /> : null}
      </View>
      <View className="flex-1">
        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.cardTitle}>
          {title}
        </Text>
        <Text style={styles.cardBody}>{body}</Text>
      </View>
    </Pressable>
  );
}

export default function ConsentScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const acceptConsent = useAppStore((state) => state.acceptConsent);
  const [checkedIds, setCheckedIds] = useState<ConsentId[]>([]);

  const allAccepted = checkedIds.length === consentItems.length;

  const toggleConsent = (id: ConsentId) => {
    setCheckedIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  };

  const enterSanctuary = () => {
    if (!allAccepted) {
      Alert.alert("Review required", "Please confirm each privacy item before entering your sanctuary.");
      return;
    }

    acceptConsent();
    router.push("/(onboarding)/how-it-works");
  };

  const goBack = () => {
    if (router.canGoBack()) {
      router.back();
      return;
    }
    router.replace("/(onboarding)/welcome");
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "left", "right"]}>
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
      <Sparkle style={styles.sparkleTopLeft} />
      <Sparkle style={styles.sparkleTopRight} />
      <Sparkle style={styles.sparkleMidLeft} />
      <Sparkle style={styles.sparkleMidRight} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
          contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 32 }]}
      >
        <View className="px-8">
          <View className="items-center pt-4">
            <PrivacyHero />
          </View>

          <View style={styles.header}>
            <Text style={styles.title}>Your Privacy,{"\n"}Your Rules.</Text>
            <Text style={styles.subtitle}>
              We believe your body's data belongs to you.{"\n"}Please review your sanctuary settings.
            </Text>
          </View>

          <View style={styles.cardStack}>
            {consentItems.map((item) => (
              <ConsentCard
                key={item.id}
                title={item.title}
                body={item.body}
                checked={checkedIds.includes(item.id)}
                onPress={() => toggleConsent(item.id)}
              />
            ))}
          </View>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Enter My Sanctuary"
            onPress={enterSanctuary}
            style={styles.ctaPressable}
          >
            <LinearGradient
              colors={[palette.coralDeep, palette.coral]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.cta}
            >
              <Text style={styles.ctaText}>Enter My Sanctuary</Text>
            </LinearGradient>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  heroGlow: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: palette.coralSoft,
    shadowColor: palette.shadowTint,
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.16,
    shadowRadius: 32,
  },
  leafWatermark: {
    position: "absolute",
    right: 16,
    top: 144,
  },
  sparkleTopLeft: {
    position: "absolute",
    top: 48,
    left: 128,
  },
  sparkleTopRight: {
    position: "absolute",
    top: 72,
    right: 104,
  },
  sparkleMidLeft: {
    position: "absolute",
    top: 208,
    left: 120,
  },
  sparkleMidRight: {
    position: "absolute",
    top: 208,
    right: 120,
  },
  header: {
    marginTop: 24,
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
    marginTop: 16,
  },
  cardStack: {
    gap: 16,
    marginTop: 24,
  },
  consentCard: {
    minHeight: 96,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    ...premiumShadow,
  },
  checkbox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: palette.coralStroke,
    flexShrink: 0,
  },
  checkboxActive: {
    backgroundColor: palette.coral,
    borderColor: palette.coral,
  },
  cardTitle: {
    color: palette.primaryText,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: 0,
  },
  cardBody: {
    color: palette.secondaryText,
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    lineHeight: 20,
    letterSpacing: 0,
    marginTop: 4,
  },
  ctaPressable: {
    marginTop: 32,
    marginBottom: 16,
  },
  cta: {
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: palette.shadowTint,
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.14,
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
