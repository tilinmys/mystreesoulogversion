import "../global.css";

import {
  GreatVibes_400Regular,
  useFonts as useGreatVibesFonts,
} from "@expo-google-fonts/great-vibes";
import {
  PlayfairDisplay_400Regular,
  PlayfairDisplay_500Medium,
  PlayfairDisplay_600SemiBold,
  useFonts as usePlayfairFonts,
} from "@expo-google-fonts/playfair-display";
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
  useFonts as usePoppinsFonts,
} from "@expo-google-fonts/poppins";
import * as SplashScreen from "expo-splash-screen";
import { Stack, useRouter, useSegments, useRootNavigationState } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { InteractionManager, StyleSheet, View } from "react-native";

import { StartupSplashOverlay } from "@/components/brand/StartupSplashOverlay";
import { NetworkStatusOverlay } from "@/components/ui/NetworkStatusOverlay";
import { preloadAllCriticalAssets, preloadOnboardingImages } from "@/lib/image-preloader";
import { useAppStore } from "@/store/app-store";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [showStartupSplash, setShowStartupSplash] = useState(true);
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const hasHydrated = useAppStore((state) => state.hasHydrated);

  const [playfairLoaded] = usePlayfairFonts({
    PlayfairDisplay_400Regular,
    PlayfairDisplay_500Medium,
    PlayfairDisplay_600SemiBold,
  });
  const [greatVibesLoaded] = useGreatVibesFonts({
    GreatVibes_400Regular,
  });
  const [poppinsLoaded] = usePoppinsFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
  });

  const fontsLoaded = playfairLoaded && greatVibesLoaded && poppinsLoaded;

  // ── Preload critical images before revealing UI ──────────────────────────
  useEffect(() => {
    if (!fontsLoaded) return;
    let cancelled = false;

    (async () => {
      try {
        await preloadAllCriticalAssets();
      } catch {
        // Non-blocking: if images fail, UI still proceeds
      }
      if (!cancelled) setAssetsLoaded(true);
    })();

    return () => { cancelled = true; };
  }, [fontsLoaded]);

  const appReady = fontsLoaded && hasHydrated && assetsLoaded;

  const finishStartupSplash = useCallback(() => {
    setShowStartupSplash(false);
    // Schedule deferred onboarding images
    const task = InteractionManager.runAfterInteractions(() => {
      void preloadOnboardingImages();
    });
    return () => task.cancel();
  }, []);

  // ── Hide native splash once app is ready ─────────────────────────────────
  useEffect(() => {
    if (!appReady) return;
    SplashScreen.hideAsync().catch(() => undefined);
  }, [appReady]);

  if (!appReady) {
    return <HydrationSkeleton />;
  }

  return (
    <View style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(onboarding)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(modals)" options={{ presentation: "modal" }} />
      </Stack>

      {/* Routing guard — runs after navigation is mounted */}
      <RoutingGuard />

      {fontsLoaded && showStartupSplash ? (
        <StartupSplashOverlay onFinish={finishStartupSplash} />
      ) : null}

      {/* Global Network Listener Overlay */}
      <NetworkStatusOverlay />
    </View>
  );
}

/**
 * RoutingGuard
 *
 * Strict state-based routing logic that runs at the root level.
 * Handles the three states: Loading, Not Onboarded, Returning User.
 *
 * This runs IN ADDITION TO the per-tab useOnboardingGuard() which
 * handles granular step-level redirects within onboarding.
 */
function RoutingGuard() {
  const router = useRouter();
  const segments = useSegments();
  const rootNavigationState = useRootNavigationState();
  const guardRan = useRef(false);

  const hasHydrated = useAppStore((s) => s.hasHydrated);
  const consentAccepted = useAppStore((s) => s.consentAccepted);
  const hasCompletedOnboarding = useAppStore((s) => s.hasCompletedOnboarding);
  const onboardingCompleted = useAppStore((s) => s.onboardingCompleted);

  useEffect(() => {
    // Wait for navigation tree + store hydration
    if (!rootNavigationState?.key || !hasHydrated) return;
    // Only run once per mount to avoid fighting with user navigation
    if (guardRan.current) return;

    const isOnboarding = segments[0] === "(onboarding)";
    const isAuth = segments[0] === "(auth)";
    const isIndex = !segments[0];
    const completed = hasCompletedOnboarding || onboardingCompleted;

    if (isIndex) return;
    if (isAuth) return;

    // State D: Returning user with completed onboarding — let them through
    if (completed && consentAccepted) {
      if (isOnboarding && segments[1] !== "logged-out" && segments[1] !== "login-success") {
        // They're on onboarding but shouldn't be — send to home
        guardRan.current = true;
        InteractionManager.runAfterInteractions(() => {
          router.replace("/(tabs)/home");
        });
      }
      return;
    }

    // State B/C: Not fully onboarded — redirect to start if they're in tabs
    if (!isOnboarding) {
      guardRan.current = true;
      const target = !consentAccepted
        ? "/(onboarding)/consent"
        : "/(onboarding)/intro";
      InteractionManager.runAfterInteractions(() => {
        router.replace(target);
      });
    }
  }, [
    hasHydrated,
    consentAccepted,
    hasCompletedOnboarding,
    onboardingCompleted,
    segments,
    rootNavigationState?.key,
    router,
  ]);

  return null;
}

function HydrationSkeleton() {
  return (
    <View style={styles.skeletonScreen}>
      <View style={styles.skeletonHeader} />
      <View style={styles.skeletonTitle} />
      <View style={styles.skeletonLine} />
      <View style={styles.skeletonCard} />
      <View style={styles.skeletonCardSmall} />
    </View>
  );
}

const styles = StyleSheet.create({
  skeletonScreen: {
    flex: 1,
    backgroundColor: "#FFF8F5",
    paddingHorizontal: 32,
    paddingTop: 96,
  },
  skeletonHeader: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignSelf: "center",
    backgroundColor: "#FFF0EC",
  },
  skeletonTitle: {
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F9E5DE",
    marginTop: 40,
  },
  skeletonLine: {
    width: "68%",
    height: 16,
    borderRadius: 8,
    backgroundColor: "#F5DED7",
    marginTop: 16,
  },
  skeletonCard: {
    height: 136,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    marginTop: 40,
  },
  skeletonCardSmall: {
    height: 96,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    marginTop: 24,
  },
});
