import { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { spacing } from "@/lib/design-tokens";

const logoSource = require("@/images/webp/mystreesoullogo.webp");
const { width, height } = Dimensions.get("window");
const logoSize = Math.min(width * 0.44, height < 760 ? 144 : 164);
const contentWidth = Math.min(width - spacing.lg * 2, 390);
const startupMystreeSize = Math.min(width * 0.19, height < 760 ? 66 : 74);
const startupSoulSize = Math.min(width * 0.1, height < 760 ? 38 : 42);
const soulLetters = "Soul".split("");

type StartupSplashOverlayProps = {
  onFinish: () => void;
};

export function StartupSplashOverlay({ onFinish }: StartupSplashOverlayProps) {
  const logoScale = useRef(new Animated.Value(3)).current;
  const logoTranslateY = useRef(new Animated.Value(0)).current;
  const textTranslateY = useRef(new Animated.Value(20)).current;
  const mystreeProgress = useRef(new Animated.Value(0)).current;
  const soulLetterProgress = useRef(soulLetters.map(() => new Animated.Value(0))).current;
  const heartScale = useRef(new Animated.Value(0)).current;
  const heartRotate = useRef(new Animated.Value(0)).current;
  const heartPulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    logoScale.setValue(3);
    logoTranslateY.setValue(0);
    textTranslateY.setValue(20);
    mystreeProgress.setValue(0);
    soulLetterProgress.forEach((progress) => progress.setValue(0));
    heartScale.setValue(0);
    heartRotate.setValue(0);
    heartPulse.setValue(1);

    Animated.sequence([
      Animated.parallel([
        Animated.timing(logoScale, {
          toValue: 1,
          duration: 1350,
          easing: Easing.out(Easing.exp),
          useNativeDriver: true,
        }),
        Animated.timing(logoTranslateY, {
          toValue: -30,
          duration: 1350,
          easing: Easing.out(Easing.exp),
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(textTranslateY, {
          toValue: 0,
          duration: 760,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(mystreeProgress, {
          toValue: 1,
          duration: 900,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.stagger(
          70,
          soulLetterProgress.map((progress) =>
            Animated.timing(progress, {
              toValue: 1,
              duration: 380,
              easing: Easing.out(Easing.cubic),
              useNativeDriver: true,
            }),
          ),
        ),
        Animated.sequence([
          Animated.delay(120),
          Animated.parallel([
            Animated.spring(heartScale, {
              toValue: 1,
              speed: 16,
              bounciness: 9,
              useNativeDriver: true,
            }),
            Animated.timing(heartRotate, {
              toValue: 1,
              duration: 560,
              easing: Easing.out(Easing.back(1.5)),
              useNativeDriver: true,
            }),
          ]),
          Animated.loop(
            Animated.sequence([
              Animated.timing(heartPulse, {
                toValue: 1.08,
                duration: 260,
                easing: Easing.inOut(Easing.cubic),
                useNativeDriver: true,
              }),
              Animated.timing(heartPulse, {
                toValue: 1,
                duration: 300,
                easing: Easing.inOut(Easing.cubic),
                useNativeDriver: true,
              }),
            ]),
            { iterations: 2 },
          ),
        ]),
      ]),
    ]).start();

    const finishTimer = setTimeout(onFinish, 3000);
    return () => clearTimeout(finishTimer);
  }, [
    heartPulse,
    heartRotate,
    heartScale,
    logoScale,
    logoTranslateY,
    mystreeProgress,
    onFinish,
    soulLetterProgress,
    textTranslateY,
  ]);

  const heartRotation = heartRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ["-18deg", "0deg"],
  });
  const mystreeScale = mystreeProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [0.96, 1],
  });
  const mystreeSweepX = mystreeProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [-contentWidth * 0.28, contentWidth * 0.28],
  });
  const mystreeSweepOpacity = mystreeProgress.interpolate({
    inputRange: [0, 0.12, 0.86, 1],
    outputRange: [0, 0.9, 0.9, 0],
  });

  return (
    <SafeAreaView
      pointerEvents="auto"
      style={styles.screen}
      accessibilityRole="summary"
      accessibilityLabel="MyStree Soul is preparing your health companion."
    >
      <View pointerEvents="none" style={styles.backdrop}>
        <View style={styles.skyBloomTop} />
        <View style={styles.skyBloomBottom} />
      </View>

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

        <Animated.View style={[styles.textWrap, { transform: [{ translateY: textTranslateY }] }]}>
          <View style={styles.mystreeLine} accessibilityLabel="MyStree">
            <Animated.Text
              allowFontScaling={false}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.82}
              style={[
                styles.mystreeText,
                {
                  opacity: mystreeProgress,
                  transform: [{ scale: mystreeScale }],
                },
              ]}
            >
              MyStree
            </Animated.Text>
            <Animated.View
              pointerEvents="none"
              style={[
                styles.writeSheen,
                {
                  opacity: mystreeSweepOpacity,
                  transform: [{ translateX: mystreeSweepX }],
                },
              ]}
            />
          </View>

          <View style={styles.soulCluster} accessibilityLabel="Soul">
            <View style={styles.soulLine}>
              {soulLetters.map((letter, index) => {
                const progress = soulLetterProgress[index];
                const translateY = progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [12, 0],
                });

                return (
                  <Animated.Text
                    key={`soul-${letter}-${index}`}
                    allowFontScaling={false}
                    style={[
                      styles.soulText,
                      {
                        opacity: progress,
                        transform: [{ translateY }],
                      },
                    ]}
                  >
                    {letter}
                  </Animated.Text>
                );
              })}
            </View>
            <Animated.Text
              allowFontScaling={false}
              style={[
                styles.heartText,
                {
                  transform: [{ scale: Animated.multiply(heartScale, heartPulse) }, { rotate: heartRotation }],
                },
              ]}
            >
              <Text>{"\u2665"}</Text>
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
    backgroundColor: "#AFDBF5",
    alignItems: "center",
    justifyContent: "center",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    overflow: "hidden",
  },
  skyBloomTop: {
    position: "absolute",
    top: -height * 0.14,
    right: -width * 0.2,
    width: width * 0.82,
    height: width * 0.82,
    borderRadius: width,
    backgroundColor: "rgba(255, 255, 255, 0.34)",
  },
  skyBloomBottom: {
    position: "absolute",
    bottom: -height * 0.18,
    left: -width * 0.25,
    width: width * 0.92,
    height: width * 0.92,
    borderRadius: width,
    backgroundColor: "rgba(61, 126, 166, 0.14)",
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
    marginTop: 30,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  mystreeLine: {
    width: "100%",
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "center",
    overflow: "visible",
  },
  mystreeText: {
    width: "100%",
    color: "#08344E",
    fontFamily: "GreatVibes_400Regular",
    fontSize: startupMystreeSize,
    lineHeight: startupMystreeSize * 1.24,
    letterSpacing: 0,
    textAlign: "center",
    textShadowColor: "rgba(255, 255, 255, 0.56)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 7,
  },
  writeSheen: {
    position: "absolute",
    bottom: startupMystreeSize * 0.17,
    width: 34,
    height: 3,
    borderRadius: 2,
    backgroundColor: "rgba(255, 255, 255, 0.78)",
  },
  soulCluster: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
    marginTop: -1,
  },
  soulLine: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  soulText: {
    color: "#FFFFFF",
    fontFamily: "PlayfairDisplay_600SemiBold",
    fontSize: startupSoulSize,
    lineHeight: startupSoulSize * 1.18,
    letterSpacing: 0.6,
    textAlign: "center",
    textShadowColor: "rgba(13, 59, 87, 0.2)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 7,
  },
  heartText: {
    color: "#F97316",
    fontFamily: "Poppins_600SemiBold",
    fontSize: Math.max(21, startupSoulSize * 0.56),
    lineHeight: Math.max(24, startupSoulSize * 0.64),
    marginTop: -8,
    textShadowColor: "rgba(249, 115, 22, 0.28)",
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 8,
  },
});
