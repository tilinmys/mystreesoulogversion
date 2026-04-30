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
  useFonts as usePoppinsFonts,
} from "@expo-google-fonts/poppins";
import * as SplashScreen from "expo-splash-screen";
import { Stack } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";

import { StartupSplashOverlay } from "@/components/brand/StartupSplashOverlay";
import { NetworkStatusOverlay } from "@/components/ui/NetworkStatusOverlay";
import { preloadOpeningImages } from "@/lib/image-preloader";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [showStartupSplash, setShowStartupSplash] = useState(true);
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
  });

  const fontsLoaded = playfairLoaded && greatVibesLoaded && poppinsLoaded;

  const finishStartupSplash = useCallback(() => {
    setShowStartupSplash(false);
  }, []);

  useEffect(() => {
    if (!fontsLoaded) {
      return;
    }

    SplashScreen.hideAsync().catch(() => undefined);
    return preloadOpeningImages();
  }, [fontsLoaded]);

  return (
    <View style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(onboarding)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(modals)" options={{ presentation: "modal" }} />
      </Stack>
      {fontsLoaded && showStartupSplash ? (
        <StartupSplashOverlay onFinish={finishStartupSplash} />
      ) : null}
      
      {/* Global Network Listener Overlay */}
      <NetworkStatusOverlay />
    </View>
  );
}
