import { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { spacing } from "@/lib/design-tokens";

const logoSource = require("@/images/webp/mystreesoullogo.webp");
const { width, height } = Dimensions.get("window");
const logoSize = Math.min(width * 0.44, height < 760 ? 144 : 164);
const contentWidth = Math.min(width - spacing.lg * 2, 390);
const startupMystreeSize = Math.min(width * 0.18, height < 760 ? 62 : 70);
const startupSoulSize = Math.min(width * 0.1, height < 760 ? 38 : 42);

type StartupSplashOverlayProps = {
  onFinish: () => void;
};

export function StartupSplashOverlay({ onFinish }: StartupSplashOverlayProps) {
  const logoScale = useRef(new Animated.Value(3)).current;
  const logoTranslateY = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const textTranslateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    logoScale.setValue(3);
    logoTranslateY.setValue(0);
    textOpacity.setValue(0);
    textTranslateY.setValue(20);

    Animated.sequence([
      Animated.parallel([
        Animated.timing(logoScale, {
          toValue: 1,
          duration: 1500,
          easing: Easing.out(Easing.exp),
          useNativeDriver: true,
        }),
        Animated.timing(logoTranslateY, {
          toValue: -30,
          duration: 1500,
          easing: Easing.out(Easing.exp),
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 800,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(textTranslateY, {
          toValue: 0,
          duration: 800,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    const finishTimer = setTimeout(onFinish, 3000);
    return () => clearTimeout(finishTimer);
  }, [logoScale, logoTranslateY, onFinish, textOpacity, textTranslateY]);

  return (
    <SafeAreaView
      pointerEvents="auto"
      style={styles.screen}
      accessibilityRole="summary"
      accessibilityLabel="MyStree Soul is preparing your health companion."
    >
      <View style={styles.revealStack}>
        <Animated.Image
          source={logoSource}
          resizeMode="contain"
          accessibilityLabel="MyStree Soul logo"
          style={[
            styles.logo,
            {
              width: logoSize,
              height: logoSize,
              transform: [{ translateY: logoTranslateY }, { scale: logoScale }],
            },
          ]}
        />

        <Animated.View
          style={[
            styles.textWrap,
            {
              opacity: textOpacity,
              transform: [{ translateY: textTranslateY }],
            },
          ]}
        >
          <Animated.Text
            allowFontScaling={false}
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.82}
            style={styles.mystreeText}
          >
            MyStree
          </Animated.Text>
          <View style={styles.soulCluster}>
            <Animated.Text
              allowFontScaling={false}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.9}
              style={styles.soulText}
            >
              Soul
            </Animated.Text>
            <Animated.Text allowFontScaling={false} style={styles.heartText}>
              ♥
            </Animated.Text>
          </View>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 999,
    elevation: 999,
    backgroundColor: "#FFF8F5",
    alignItems: "center",
    justifyContent: "center",
  },
  revealStack: {
    width: contentWidth,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    alignSelf: "center",
  },
  textWrap: {
    width: "100%",
    marginTop: 32,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  mystreeText: {
    width: "100%",
    color: "#F97316",
    fontFamily: "GreatVibes_400Regular",
    fontSize: startupMystreeSize,
    lineHeight: startupMystreeSize * 1.18,
    letterSpacing: 0,
    textAlign: "center",
  },
  soulCluster: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    gap: spacing.xs,
    marginTop: -2,
  },
  soulText: {
    color: "#2C2A29",
    fontFamily: "Poppins_600SemiBold",
    fontSize: startupSoulSize,
    lineHeight: startupSoulSize * 1.18,
    letterSpacing: 0,
    textAlign: "center",
  },
  heartText: {
    color: "#F97316",
    fontFamily: "Poppins_600SemiBold",
    fontSize: Math.max(19, startupSoulSize * 0.52),
    lineHeight: Math.max(22, startupSoulSize * 0.58),
    marginTop: 0,
    textShadowColor: "rgba(249, 115, 22, 0.18)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
});
