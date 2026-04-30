import { StyleSheet, Text, View } from "react-native";

import { colors } from "@/lib/design-tokens";

type BrandWordmarkProps = {
  compact?: boolean;
  variant?: "modern" | "splash";
};

export function BrandWordmark({ compact = false, variant = "modern" }: BrandWordmarkProps) {
  const isSplash = variant === "splash";

  return (
    <View style={styles.wrap} accessibilityLabel="MyStree Soul">
      <Text
        allowFontScaling={false}
        style={[
          isSplash ? styles.myStreeSplash : styles.myStree,
          compact ? (isSplash ? styles.myStreeSplashCompact : styles.myStreeCompact) : null,
        ]}
      >
        MyStree
      </Text>
      <Text
        allowFontScaling={false}
        style={[
          isSplash ? styles.soulSplash : styles.soul,
          compact ? (isSplash ? styles.soulSplashCompact : styles.soulCompact) : null,
        ]}
      >
        Soul{"\u2661"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: "center",
  },
  myStree: {
    color: colors.primaryText,
    fontFamily: "Poppins_500Medium",
    fontSize: 25,
    lineHeight: 32,
    letterSpacing: 0,
    includeFontPadding: false,
  },
  myStreeCompact: {
    fontSize: 21,
    lineHeight: 27,
  },
  soul: {
    color: colors.paleCoral,
    fontFamily: "Poppins_500Medium",
    fontSize: 25,
    lineHeight: 32,
    letterSpacing: 0,
    includeFontPadding: false,
  },
  soulCompact: {
    fontSize: 21,
    lineHeight: 27,
  },
  myStreeSplash: {
    color: colors.primaryText,
    fontFamily: "PlayfairDisplay_500Medium",
    fontSize: 64,
    lineHeight: 72,
    letterSpacing: 0,
    includeFontPadding: false,
  },
  myStreeSplashCompact: {
    fontSize: 42,
    lineHeight: 48,
  },
  soulSplash: {
    color: colors.paleCoral,
    fontFamily: "GreatVibes_400Regular",
    fontSize: 62,
    lineHeight: 66,
    marginTop: -2,
    letterSpacing: 0,
    includeFontPadding: false,
  },
  soulSplashCompact: {
    fontSize: 42,
    lineHeight: 46,
    marginTop: 0,
  },
});
