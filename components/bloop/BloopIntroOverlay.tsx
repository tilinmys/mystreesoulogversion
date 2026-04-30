import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  type ImageSourcePropType,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors, radius, shadows, spacing } from "@/lib/design-tokens";
import { useAppStore } from "@/store/app-store";

const bloopImages = {
  pink: require("@/images/webp/blooppink1.webp") as ImageSourcePropType,
};

type BloopIntroOverlayProps = {
  variant?: keyof typeof bloopImages;
};

export function BloopIntroOverlay({ variant = "pink" }: BloopIntroOverlayProps) {
  const insets = useSafeAreaInsets();
  const hasHydrated = useAppStore((state) => state.hasHydrated);
  const onboardingCompleted = useAppStore((state) => state.onboardingCompleted);
  const hasSeenBloopIntro = useAppStore((state) => state.hasSeenBloopIntro);
  const setHasSeenBloopIntro = useAppStore((state) => state.setHasSeenBloopIntro);
  const [mounted, setMounted] = useState(false);
  const introMotion = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!hasHydrated || !onboardingCompleted || hasSeenBloopIntro) {
      setMounted(false);
      return;
    }

    setMounted(true);
    introMotion.setValue(0);
    Animated.timing(introMotion, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [hasHydrated, onboardingCompleted, hasSeenBloopIntro, introMotion]);

  if (!mounted) {
    return null;
  }

  const opacity = introMotion;
  const translateX = introMotion.interpolate({
    inputRange: [0, 1],
    outputRange: [200, 0],
  });

  const dismiss = () => {
    Animated.timing(introMotion, {
      toValue: 0,
      duration: 260,
      useNativeDriver: true,
    }).start(() => {
      setHasSeenBloopIntro(true);
      setMounted(false);
    });
  };

  return (
    <View
      style={styles.overlay}
      accessibilityViewIsModal
      accessibilityLabel="Bloop introduction"
    >
      <View style={styles.frost} />

      <Animated.View
        style={[
          styles.content,
          {
            paddingTop: insets.top + spacing.xl,
            paddingBottom: insets.bottom + spacing.xl,
            opacity,
            transform: [{ translateX }],
          },
        ]}
      >
        <Image
          source={bloopImages[variant]}
          style={styles.bloopImage}
          resizeMode="contain"
          accessibilityLabel="Bloop emotional health companion"
        />

        <View style={styles.bubble}>
          <Text style={styles.heading}>Hi, I am Bloop.</Text>
          <Text style={styles.body}>
            I am your empathetic emotional companion. You can chat with me anytime you have
            mood swings, period pain, or just need someone to listen.
          </Text>
          <TouchableOpacity
            activeOpacity={0.82}
            accessibilityRole="button"
            accessibilityLabel="Nice to meet you, Bloop"
            onPress={dismiss}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Nice to meet you, Bloop</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 50,
  },
  frost: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.softOverlay,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.lg,
  },
  bloopImage: {
    width: 120,
    height: 120,
  },
  bubble: {
    width: "100%",
    maxWidth: 360,
    borderRadius: radius.medium,
    backgroundColor: colors.backgroundWhite,
    padding: spacing.lg,
    gap: spacing.md,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    ...shadows.lg,
  },
  heading: {
    color: colors.primaryText,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 22,
    lineHeight: 30,
    letterSpacing: 0,
  },
  body: {
    color: colors.secondaryText,
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0,
  },
  button: {
    minHeight: 56,
    borderRadius: radius.button,
    backgroundColor: colors.primaryOrange,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.lg,
    marginTop: spacing.xs,
    ...shadows.md,
  },
  buttonText: {
    color: colors.whiteText,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 15,
    lineHeight: 22,
    letterSpacing: 0,
    textAlign: "center",
  },
});
