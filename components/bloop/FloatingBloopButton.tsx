
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, Image, StyleSheet, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { FloatingActionButton } from "@/components/ui/FloatingActionButton";
import { colors, radius, shadows, spacing } from "@/lib/design-tokens";
import { useAppStore } from "@/store/app-store";

export function FloatingBloopButton() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const isVisible = useAppStore((state) => state.isBloopVisible);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: isVisible ? 1 : 0.65, // shrink when scrolling down
      useNativeDriver: true,
      speed: 12,
      bounciness: 6,
    }).start();
  }, [isVisible, scaleAnim]);

  return (
    <Animated.View 
      pointerEvents="box-none"
      style={[
        styles.wrap, 
        { bottom: insets.bottom + 92, transform: [{ scale: scaleAnim }, { translateY: isVisible ? 0 : 20 }] }
      ]}
    >
      <FloatingActionButton
        accessibilityLabel="Open Bloop companion"
        onPress={() => router.push("/(modals)/bloop")}
        style={styles.button}
      >
        <Image 
          source={require("@/images/webp/blooppink1.webp")} 
          style={styles.bloopImage}
          resizeMode="contain"
        />
      </FloatingActionButton>
      <Text style={styles.label}>Bloop</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: "absolute",
    right: spacing.lg,
    alignItems: "center",
    gap: spacing.xxs,
  },
  button: {
    borderWidth: 2,
    borderColor: colors.orangeBorder,
    backgroundColor: colors.primaryOrange,
    alignItems: "center",
    justifyContent: "center",
    ...shadows.fab,
  },
  bloopImage: {
    width: 44,
    height: 44,
    alignSelf: "center",
  },
  label: {
    color: colors.primaryOrange,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 12,
    lineHeight: 16,
    backgroundColor: colors.backgroundWhite,
    borderRadius: radius.full,
    paddingHorizontal: spacing.xs,
    overflow: "hidden",
    ...shadows.xs,
  },
});
