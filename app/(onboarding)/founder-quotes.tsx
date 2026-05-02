import { ChevronLeft } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { Image as ExpoImage } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  founderQuoteImages,
  markFounderImagesForImmediatePreload,
} from "@/lib/image-preloader";
import { colors, radius, shadows, spacing } from "@/lib/design-tokens";
import { useAppStore } from "@/store/app-store";

const AnimatedExpoImage = Animated.createAnimatedComponent(ExpoImage);

export default function FounderQuotesScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [readyCount, setReadyCount] = useState(0);
  const fadeFounder = useRef(new Animated.Value(1)).current;
  const fadeCofounder = useRef(new Animated.Value(0)).current;
  const markFounderQuotesSeen = useAppStore((state) => state.markFounderQuotesSeen);

  useEffect(() => {
    void markFounderImagesForImmediatePreload();
  }, []);

  const controlMetrics = useMemo(
    () => ({
      backTop: Math.max(insets.top + spacing.xl, height * 0.09),
      backLeft: Math.max(spacing.lg, width * 0.045),
      nextBottom: Math.max(insets.bottom + spacing.xxl, height * 0.055),
      nextWidth: Math.min(260, width * 0.56),
    }),
    [height, insets.bottom, insets.top, width],
  );

  const showFounder = () => {
    Animated.parallel([
      Animated.timing(fadeFounder, {
        toValue: 1,
        duration: 260,
        useNativeDriver: true,
      }),
      Animated.timing(fadeCofounder, {
        toValue: 0,
        duration: 260,
        useNativeDriver: true,
      }),
    ]).start(() => setIndex(0));
  };

  const showCofounder = () => {
    Animated.parallel([
      Animated.timing(fadeFounder, {
        toValue: 0,
        duration: 260,
        useNativeDriver: true,
      }),
      Animated.timing(fadeCofounder, {
        toValue: 1,
        duration: 260,
        useNativeDriver: true,
      }),
    ]).start(() => setIndex(1));
  };

  const goBack = () => {
    if (index === 1) {
      showFounder();
      return;
    }

    router.back();
  };

  const goNext = () => {
    if (index === 0) {
      showCofounder();
      return;
    }

    markFounderQuotesSeen();
    router.replace("/(tabs)/home");
  };

  return (
    <View style={[styles.root, { width, height }]}>
      <StatusBar hidden />

      <AnimatedExpoImage
        source={founderQuoteImages[0]}
        style={[styles.image, { opacity: fadeFounder }]}
        contentFit="cover"
        accessibilityLabel="Founder quote from Dr. Smitha A.P"
      />

      <AnimatedExpoImage
        source={founderQuoteImages[1]}
        style={[styles.image, { opacity: fadeCofounder }]}
        contentFit="cover"
        accessibilityLabel="Co-founder quote from Dr. Surbhi Sinha"
      />

      <TouchableOpacity
        activeOpacity={0.72}
        onPress={goBack}
        hitSlop={{ top: 18, bottom: 18, left: 18, right: 18 }}
        accessibilityRole="button"
        accessibilityLabel={index === 0 ? "Go back" : "Previous founder quote"}
        style={[
          styles.backButton,
          {
            top: controlMetrics.backTop,
            left: controlMetrics.backLeft,
          },
        ]}
      >
        <ChevronLeft size={22} color={colors.primaryText} strokeWidth={3} />
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.82}
        onPress={goNext}
        accessibilityRole="button"
        accessibilityLabel={index === 0 ? "Next founder quote" : "Continue to dashboard"}
        style={[
          styles.nextButton,
          {
            width: controlMetrics.nextWidth,
            bottom: controlMetrics.nextBottom,
          },
        ]}
      >
        <Text style={styles.nextText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.primaryOrange,
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
  },
  preloadWash: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.primaryOrange,
  },
  backButton: {
    position: "absolute",
    width: 38,
    height: 38,
    borderRadius: radius.full,
    backgroundColor: colors.backgroundWhite,
    alignItems: "center",
    justifyContent: "center",
    ...shadows.md,
  },
  nextButton: {
    position: "absolute",
    alignSelf: "center",
    minHeight: 66,
    borderRadius: radius.large,
    backgroundColor: colors.backgroundWhite,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    ...shadows.fab,
  },
  nextText: {
    color: colors.primaryText,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 24,
    lineHeight: 31,
    letterSpacing: 0,
  },
});
