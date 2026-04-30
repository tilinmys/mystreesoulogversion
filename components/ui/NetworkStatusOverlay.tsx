import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, Text, View, Animated, Easing } from "react-native";
import { WifiOff } from "lucide-react-native";
import { BlurView } from "expo-blur";
import NetInfo from "@react-native-community/netinfo";
import { colors, spacing, radius, shadows } from "@/lib/design-tokens";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function NetworkStatusOverlay() {
  const [isOffline, setIsOffline] = useState(false);
  const slideAnim = useRef(new Animated.Value(-150)).current; // Start hidden above screen
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();

  useEffect(() => {
    // Listen to network changes
    const unsubscribe = NetInfo.addEventListener((state) => {
      // isConnected can be null on first render, so we check explicitly for false
      // Also consider "isInternetReachable" if you want strict internet checking
      const offline = state.isConnected === false;
      
      if (offline && !isOffline) {
        setIsOffline(true);
        // Animate in
        Animated.parallel([
          Animated.spring(slideAnim, {
            toValue: insets.top + spacing.md, // Slide down just below status bar
            useNativeDriver: true,
            friction: 8,
            tension: 40,
          }),
          Animated.timing(opacityAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          })
        ]).start();
      } else if (!offline && isOffline) {
        // Animate out
        Animated.parallel([
          Animated.timing(slideAnim, {
            toValue: -150,
            duration: 300,
            easing: Easing.in(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true,
          })
        ]).start(() => {
          setIsOffline(false);
        });
      }
    });

    return () => unsubscribe();
  }, [isOffline, slideAnim, opacityAnim, insets.top]);

  if (!isOffline) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY: slideAnim }],
          opacity: opacityAnim,
        },
      ]}
      pointerEvents="none" // Allow user to still click things if they want, this is just a warning banner
    >
      <BlurView intensity={60} tint="light" style={styles.blurBackground}>
        <View style={styles.content}>
          <View style={styles.iconRing}>
            <WifiOff size={22} color={colors.dangerText} />
          </View>
          <View style={styles.textStack}>
            <Text style={styles.title}>You are offline</Text>
            <Text style={styles.subtitle}>Take a breath. We'll sync your health data when your connection returns.</Text>
          </View>
        </View>
      </BlurView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: spacing.lg,
    right: spacing.lg,
    zIndex: 99999, // Ensure it sits above all navigation stacks and modals
    borderRadius: radius.large,
    overflow: "hidden",
    ...shadows.lg,
  },
  blurBackground: {
    backgroundColor: "rgba(255, 245, 246, 0.85)", // Soft pinkish-white tint
    borderRadius: radius.large,
    borderWidth: 1,
    borderColor: "rgba(255, 180, 180, 0.4)", // Subtle red/pink border
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.lg,
    gap: spacing.md,
  },
  iconRing: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.dangerSurface, // Soft red surface
    alignItems: "center",
    justifyContent: "center",
  },
  textStack: {
    flex: 1,
    flexDirection: "column",
    gap: 2,
  },
  title: {
    color: colors.primaryText,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 15,
    lineHeight: 20,
  },
  subtitle: {
    color: colors.secondaryText,
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    lineHeight: 16,
  },
});
