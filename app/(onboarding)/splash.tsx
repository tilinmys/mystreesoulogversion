import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
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
import Svg, { Circle, Defs, RadialGradient, Stop } from "react-native-svg";

import { PastelWaves } from "@/components/brand/PastelWaves";
import { SparkleField } from "@/components/brand/SparkleField";
import { FlowerAccent } from "@/components/visuals/FlowerAccent";
import { colors, spacing } from "@/lib/design-tokens";

const { width, height } = Dimensions.get("window");
const contentWidth = Math.min(width - spacing.xl * 1.25, 348);
const waveHeight = Math.min(height * 0.24, 190);
const mystreeLetters = "MyStree".split("");
const soulLetters = "Soul".split("");
const MYSTREE_SIZE = Math.min(contentWidth * 0.148, 52);
const SOUL_SIZE = Math.min(contentWidth * 0.132, 46);

function SoftAura() {
  const size = Math.min(width * 0.94, 380);

  return (
    <Svg width={size} height={size} viewBox="0 0 360 360">
      <Defs>
        <RadialGradient id="softSplashAura" cx="50%" cy="50%" r="50%">
          <Stop offset="0" stopColor={colors.backgroundWhite} stopOpacity="0.95" />
          <Stop offset="0.4" stopColor={colors.peachGlow} stopOpacity="0.44" />
          <Stop offset="0.72" stopColor={colors.coralSoftSurface} stopOpacity="0.2" />
          <Stop offset="1" stopColor={colors.warmWhite} stopOpacity="0" />
        </RadialGradient>
      </Defs>
      <Circle cx="180" cy="180" r="174" fill="url(#softSplashAura)" />
      {Array.from({ length: 8 }).map((_, index) => (
        <Circle
          key={index}
          cx="180"
          cy="180"
          r={112 + index * 7}
          stroke={colors.backgroundWhite}
          strokeOpacity={0.16 - index * 0.012}
          strokeWidth="1"
          fill="none"
        />
      ))}
    </Svg>
  );
}

function SoftBloom({ tone }: { tone: "coral" | "teal" }) {
  const size = tone === "coral" ? Math.min(width * 1.16, 450) : Math.min(width * 0.82, 330);
  const color = tone === "coral" ? colors.paleCoral : colors.softTeal;

  return (
    <Svg width={size} height={size} viewBox="0 0 360 360">
      <Defs>
        <RadialGradient id={`splashBloom-${tone}`} cx="50%" cy="50%" r="50%">
          <Stop offset="0" stopColor={color} stopOpacity={tone === "coral" ? "0.22" : "0.16"} />
          <Stop offset="0.54" stopColor={colors.peachGlow} stopOpacity="0.12" />
          <Stop offset="1" stopColor={colors.warmWhite} stopOpacity="0" />
        </RadialGradient>
      </Defs>
      <Circle cx="180" cy="180" r="176" fill={`url(#splashBloom-${tone})`} />
    </Svg>
  );
}

export default function SplashScreenRoute() {
  const router = useRouter();
  const contentOpacity = useRef(new Animated.Value(0)).current;
  const contentScale = useRef(new Animated.Value(0.96)).current;
  const auraPulse = useRef(new Animated.Value(0)).current;
  const waveDrift = useRef(new Animated.Value(0)).current;
  const loaderPulse = useRef(new Animated.Value(0)).current;
  const sparkleMotion = useRef(new Animated.Value(0)).current;
  const flowerDrift = useRef(new Animated.Value(0)).current;
  const heartMotion = useRef(new Animated.Value(0)).current;
  const mystreeReveal = useRef(mystreeLetters.map(() => new Animated.Value(0))).current;
  const soulReveal = useRef(soulLetters.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    mystreeReveal.forEach((letter) => letter.setValue(0));
    soulReveal.forEach((letter) => letter.setValue(0));
    heartMotion.setValue(0);

    Animated.parallel([
      Animated.timing(contentOpacity, {
        toValue: 1,
        duration: 720,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(contentScale, {
        toValue: 1,
        duration: 720,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();

    Animated.sequence([
      Animated.delay(120),
      Animated.stagger(
        55,
        mystreeReveal.map((letter) =>
          Animated.timing(letter, {
            toValue: 1,
            duration: 360,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
        ),
      ),
      Animated.stagger(
        70,
        soulReveal.map((letter) =>
          Animated.timing(letter, {
            toValue: 1,
            duration: 420,
            easing: Easing.out(Easing.back(1.25)),
            useNativeDriver: true,
          }),
        ),
      ),
      Animated.spring(heartMotion, {
        toValue: 1,
        useNativeDriver: true,
        damping: 9,
        stiffness: 180,
        mass: 0.8,
      }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(auraPulse, {
          toValue: 1,
          duration: 2400,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(auraPulse, {
          toValue: 0,
          duration: 2400,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ]),
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(waveDrift, {
          toValue: 1,
          duration: 5600,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(waveDrift, {
          toValue: 0,
          duration: 5600,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ]),
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(loaderPulse, {
          toValue: 1,
          duration: 1100,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(loaderPulse, {
          toValue: 0,
          duration: 1100,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ]),
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(sparkleMotion, {
          toValue: 1,
          duration: 1700,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(sparkleMotion, {
          toValue: 0,
          duration: 1700,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ]),
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(flowerDrift, {
          toValue: 1,
          duration: 3600,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(flowerDrift, {
          toValue: 0,
          duration: 3600,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ]),
    ).start();

    const navigationTimer = setTimeout(() => {
      router.replace("/(onboarding)/welcome");
    }, 3000);

    return () => clearTimeout(navigationTimer);
  }, [
    auraPulse,
    contentOpacity,
    contentScale,
    flowerDrift,
    heartMotion,
    loaderPulse,
    mystreeReveal,
    router,
    soulReveal,
    sparkleMotion,
    waveDrift,
  ]);

  const auraScale = auraPulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.98, 1.04],
  });
  const auraOpacity = auraPulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.76, 1],
  });
  const waveTranslate = waveDrift.interpolate({
    inputRange: [0, 1],
    outputRange: [-14, 14],
  });
  const loaderScale = loaderPulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.94, 1.08],
  });
  const loaderOpacity = loaderPulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.66, 1],
  });
  const sparkleScale = sparkleMotion.interpolate({
    inputRange: [0, 1],
    outputRange: [0.86, 1.18],
  });
  const sparkleOpacity = sparkleMotion.interpolate({
    inputRange: [0, 1],
    outputRange: [0.32, 0.72],
  });
  const flowerTranslateY = flowerDrift.interpolate({
    inputRange: [0, 1],
    outputRange: [8, -8],
  });
  const flowerRotate = flowerDrift.interpolate({
    inputRange: [0, 1],
    outputRange: ["-4deg", "5deg"],
  });
  const heartScale = heartMotion.interpolate({
    inputRange: [0, 0.72, 1],
    outputRange: [0.2, 1.22, 1],
  });
  const heartTranslateY = heartMotion.interpolate({
    inputRange: [0, 1],
    outputRange: [8, 0],
  });

  return (
    <SafeAreaView
      style={styles.screen}
      accessibilityRole="summary"
      accessibilityLabel="MyStree Soul is preparing your health companion."
    >
      <StatusBar style="dark" translucent backgroundColor="transparent" />
      <SparkleField width={width} height={height} />

      <Animated.View pointerEvents="none" style={[styles.coralBloom, { opacity: auraOpacity }]}>
        <SoftBloom tone="coral" />
      </Animated.View>
      <Animated.View pointerEvents="none" style={[styles.tealBloom, { opacity: auraOpacity }]}>
        <SoftBloom tone="teal" />
      </Animated.View>

      <Animated.View
        pointerEvents="none"
        style={[
          styles.auraLayer,
          {
            opacity: auraOpacity,
            transform: [{ scale: auraScale }],
          },
        ]}
      >
        <SoftAura />
      </Animated.View>

      <Animated.View
        pointerEvents="none"
        style={[styles.waveLayer, { transform: [{ translateX: waveTranslate }] }]}
      >
        <PastelWaves width={width * 1.14} height={waveHeight} opacity={0.72} />
      </Animated.View>

      <Animated.View
        pointerEvents="none"
        style={[
          styles.flowerTopLeft,
          { transform: [{ translateY: flowerTranslateY }, { rotate: flowerRotate }] },
        ]}
      >
        <FlowerAccent size={78} opacity={0.22} />
      </Animated.View>
      <Animated.View
        pointerEvents="none"
        style={[
          styles.flowerBottomRight,
          { transform: [{ translateY: flowerTranslateY }, { rotate: "-14deg" }] },
        ]}
      >
        <FlowerAccent size={96} opacity={0.18} />
      </Animated.View>
      <Animated.View
        pointerEvents="none"
        style={[
          styles.flowerLowLeft,
          { transform: [{ translateY: flowerTranslateY }, { rotate: "10deg" }] },
        ]}
      >
        <FlowerAccent size={62} opacity={0.16} />
      </Animated.View>

      <Animated.View
        style={[
          styles.centerStack,
          {
            opacity: contentOpacity,
            transform: [{ scale: contentScale }],
          },
        ]}
      >
        <Animated.View
          style={[
            styles.sparkDot,
            {
              opacity: sparkleOpacity,
              transform: [{ scale: sparkleScale }],
            },
          ]}
        />

        <View
          style={styles.wordmarkWrap}
          accessibilityLabel="MyStree Soul"
          accessibilityRole="text"
        >
          <View style={styles.lockupLine}>
            <View style={styles.mystreeRow}>
              {mystreeLetters.map((letter, index) => {
                const opacity = mystreeReveal[index];
                const translateY = mystreeReveal[index].interpolate({
                  inputRange: [0, 1],
                  outputRange: [14, 0],
                });
                const translateX = mystreeReveal[index].interpolate({
                  inputRange: [0, 1],
                  outputRange: [-5, 0],
                });

                return (
                  <Animated.Text
                    key={`mystree-${letter}-${index}`}
                    allowFontScaling={false}
                    style={[
                      styles.mystreeLetter,
                      {
                        opacity,
                        transform: [{ translateX }, { translateY }],
                      },
                    ]}
                  >
                    {letter}
                  </Animated.Text>
                );
              })}
            </View>

            <View style={styles.soulWrap}>
              <View style={styles.soulRow}>
                {soulLetters.map((letter, index) => {
                  const opacity = soulReveal[index];
                  const translateY = soulReveal[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [12, 0],
                  });
                  const translateX = soulReveal[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [-4, 0],
                  });
                  const rotate = soulReveal[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: ["-7deg", "0deg"],
                  });

                  return (
                    <Animated.Text
                      key={`soul-${letter}-${index}`}
                      allowFontScaling={false}
                      style={[
                        styles.soulLetter,
                        {
                          opacity,
                          transform: [{ translateX }, { translateY }, { rotate }],
                        },
                      ]}
                    >
                      {letter}
                    </Animated.Text>
                  );
                })}
              </View>
              <Animated.Text
                style={[
                  styles.heartMark,
                  {
                    opacity: heartMotion,
                    transform: [{ translateY: heartTranslateY }, { scale: heartScale }],
                  },
                ]}
              >
                {"♡"}
              </Animated.Text>
            </View>
          </View>
        </View>

        <Text style={styles.anchorLine}>YOUR HEALTH, HEARD.</Text>
      </Animated.View>

      <Animated.View
        style={[
          styles.loader,
          {
            opacity: loaderOpacity,
            transform: [{ scale: loaderScale }],
          },
        ]}
      >
        <View style={styles.loadingPetals}>
          {Array.from({ length: 6 }).map((_, index) => (
            <View
              key={index}
              style={[
                styles.loadingPetal,
                { transform: [{ rotate: `${index * 60}deg` }, { translateY: -9 }] },
              ]}
            />
          ))}
        </View>
      </Animated.View>
      <Text style={styles.loadingText}>Preparing your health companion...</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.warmWhite,
    alignItems: "center",
    overflow: "hidden",
  },
  coralBloom: {
    position: "absolute",
    top: -height * 0.08,
    left: -width * 0.16,
  },
  tealBloom: {
    position: "absolute",
    top: height * 0.16,
    right: -width * 0.12,
  },
  auraLayer: {
    position: "absolute",
    top: height * 0.16,
    width: Math.min(width * 0.94, 380),
    height: Math.min(width * 0.94, 380),
    alignItems: "center",
    justifyContent: "center",
  },
  waveLayer: {
    position: "absolute",
    left: -width * 0.07,
    bottom: 0,
  },
  flowerTopLeft: {
    position: "absolute",
    top: height * 0.13,
    left: width * 0.08,
  },
  flowerBottomRight: {
    position: "absolute",
    right: width * 0.06,
    bottom: height * 0.19,
  },
  flowerLowLeft: {
    position: "absolute",
    left: width * 0.14,
    bottom: height * 0.12,
  },
  centerStack: {
    width: contentWidth,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: Math.max(height * 0.19, 150),
    paddingTop: Math.max(height * 0.04, 32),
  },
  sparkDot: {
    position: "absolute",
    top: height * 0.31,
    right: Math.max(width * 0.12, 36),
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: colors.primaryOrange,
    shadowColor: colors.primaryOrange,
    shadowOpacity: 0.28,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 0 },
  },
  wordmarkWrap: {
    alignItems: "center",
    width: "100%",
  },
  lockupLine: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "center",
    gap: spacing.xs,
  },
  mystreeRow: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  mystreeLetter: {
    color: colors.primaryOrange,
    fontFamily: "PlayfairDisplay_600SemiBold",
    fontSize: MYSTREE_SIZE,
    lineHeight: MYSTREE_SIZE * 1.12,
    letterSpacing: 0,
    includeFontPadding: false,
  },
  soulWrap: {
    position: "relative",
    transform: [{ rotate: "-6deg" }],
    marginLeft: 16,
  },
  soulRow: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  soulLetter: {
    color: colors.roseGold,
    fontFamily: "GreatVibes_400Regular",
    fontSize: SOUL_SIZE,
    lineHeight: SOUL_SIZE * 1.08,
    letterSpacing: 0,
    includeFontPadding: false,
  },
  heartMark: {
    position: "absolute",
    top: -10,
    right: -17,
    color: colors.paleCoral,
    fontFamily: "Poppins_500Medium",
    fontSize: 20,
    lineHeight: 20,
    opacity: 0.56,
  },
  anchorLine: {
    marginTop: spacing.md,
    color: colors.secondaryText,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: 2.4,
    textAlign: "center",
  },
  loader: {
    position: "absolute",
    bottom: Math.max(height * 0.076, 68),
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingPetals: {
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingPetal: {
    position: "absolute",
    width: 7,
    height: 18,
    borderRadius: 999,
    backgroundColor: colors.primaryOrange,
    opacity: 0.44,
  },
  loadingText: {
    position: "absolute",
    bottom: Math.max(height * 0.042, 38),
    color: colors.secondaryText,
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
    letterSpacing: 0,
  },
});
