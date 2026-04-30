import { Heart, Shield } from "lucide-react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { SafeScreen } from "@/components/layout/SafeScreen";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { colors, spacing } from "@/lib/design-tokens";

export default function WelcomeScreen() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const compactWidth = width < 390;
  const compactHeight = height < 780;
  const sidePadding = compactWidth ? spacing.lg : spacing.xl;
  const contentWidth = Math.min(width - sidePadding * 2, 360);
  const heroHeight = Math.min(height * (compactHeight ? 0.54 : 0.58), 500);
  const mystreeFontSize = compactWidth ? 58 : 66;
  const soulFontSize = compactWidth ? 36 : 42;
  const heartSize = compactWidth ? 22 : 24;

  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />

      <View style={[styles.heroWrapper, { width, height: heroHeight }]}>
        <ImageBackground
          source={require("@/images/webp/heroimage.webp")}
          style={styles.heroImage}
          imageStyle={{ opacity: 0.9 }}
          resizeMode="cover"
        />
        <LinearGradient
          colors={["transparent", "rgba(253,252,251,0.8)", colors.warmWhite]}
          style={styles.gradientFade}
          locations={[0, 0.6, 1]}
        />
      </View>

      <SafeScreen bottomInset={false} style={styles.safeLayer} contentStyle={styles.content}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={[
            styles.scrollContent,
            {
              minHeight: height,
              paddingHorizontal: sidePadding,
              paddingTop: heroHeight * 0.68,
            },
          ]}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <View style={[styles.textAnchor, { width: contentWidth }]}>
            <Text style={styles.welcomeText}>WELCOME TO</Text>

            <View style={styles.brandColumn}>
              <Text
                allowFontScaling={false}
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.78}
                style={[
                  styles.mystreeText,
                  { fontSize: mystreeFontSize, lineHeight: mystreeFontSize * 1.22 },
                ]}
              >
                MyStree
              </Text>
              <View style={styles.soulLine}>
                <Text
                  allowFontScaling={false}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  minimumFontScale={0.9}
                  style={[styles.soulText, { fontSize: soulFontSize, lineHeight: soulFontSize * 1.2 }]}
                >
                  Soul
                </Text>
                <Heart
                  size={heartSize}
                  color={colors.primaryOrange}
                  fill={colors.primaryOrange}
                  style={styles.heartIcon}
                />
              </View>
            </View>

            <Text style={styles.subtitle}>
              Your curated sanctuary for reflection, safety, and empowerment.
            </Text>
          </View>

          <View style={[styles.footer, { width: contentWidth }]}>
            <PrimaryButton
              label="GET STARTED"
              accessibilityLabel="Start the MyStree Soul demo"
              onPress={() => router.push("/(onboarding)/consent")}
              style={styles.primaryButton}
              textStyle={styles.primaryButtonText}
            />

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => router.push("/(onboarding)/login")}
              style={styles.loginLink}
            >
              <Text style={styles.loginText}>I already have an account</Text>
            </TouchableOpacity>

            <View style={styles.privacy}>
              <Shield size={14} color={colors.dividerText} strokeWidth={2.2} />
              <Text style={styles.privacyText}>Your sanctuary is entirely private</Text>
            </View>
          </View>
        </ScrollView>
      </SafeScreen>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.warmWhite,
  },
  safeLayer: {
    zIndex: 1,
    elevation: 1,
    backgroundColor: "transparent",
  },
  heroWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 0,
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  gradientFade: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "60%",
  },
  content: {
    flex: 1,
    paddingHorizontal: 0,
    paddingBottom: 0,
    backgroundColor: "transparent",
    zIndex: 1,
  },
  scroll: {
    flex: 1,
    width: "100%",
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: spacing.xxl,
  },
  textAnchor: {
    alignItems: "center",
    marginBottom: spacing.xl,
  },
  welcomeText: {
    color: colors.secondaryText,
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    letterSpacing: 3,
    textTransform: "uppercase",
    marginBottom: spacing.xs,
  },
  brandColumn: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    gap: 0,
    overflow: "visible",
  },
  mystreeText: {
    width: "100%",
    color: colors.primaryOrange,
    fontFamily: "GreatVibes_400Regular",
    paddingTop: 8,
    paddingBottom: 2,
    textAlign: "center",
  },
  soulLine: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    gap: spacing.xs,
    marginTop: -4,
  },
  soulText: {
    color: colors.primaryText,
    fontFamily: "Poppins_600SemiBold",
  },
  heartIcon: {
    flexShrink: 0,
    marginTop: 1,
  },
  subtitle: {
    color: colors.secondaryText,
    fontFamily: "Poppins_300Light",
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    marginTop: spacing.sm,
    maxWidth: 300,
  },
  footer: {
    alignItems: "center",
    gap: spacing.md,
  },
  primaryButton: {
    width: "100%",
    borderRadius: 999,
    minHeight: 56,
  },
  primaryButtonText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    letterSpacing: 2,
  },
  loginLink: {
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    maxWidth: "100%",
  },
  loginText: {
    color: colors.primaryText,
    fontFamily: "Poppins_500Medium",
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
    textDecorationLine: "underline",
  },
  privacy: {
    width: "100%",
    minHeight: 32,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  privacyText: {
    flexShrink: 1,
    color: colors.dividerText,
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    lineHeight: 18,
    textAlign: "center",
  },
});
