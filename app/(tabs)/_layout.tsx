import { CalendarHeart, Home, UserRound, Vault } from "lucide-react-native";
import { Tabs } from "expo-router";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { FloatingBloopButton } from "@/components/bloop/FloatingBloopButton";
import { colors, radius, shadows, spacing } from "@/lib/design-tokens";
import { strings } from "@/lib/strings";
import { useOnboardingGuard } from "@/lib/useOnboardingGuard";

const tabIcon = {
  home: Home,
  cycle: CalendarHeart,
  vault: Vault,
  profile: UserRound,
};

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  useOnboardingGuard();

  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={({ route }) => {
          const Icon = tabIcon[route.name as keyof typeof tabIcon] ?? Home;
          return {
            headerShown: false,
            tabBarActiveTintColor: colors.primaryOrange,
            tabBarInactiveTintColor: colors.mutedText,
            tabBarStyle: {
              height: 64 + insets.bottom,
              paddingTop: spacing.sm,
              paddingBottom: insets.bottom + spacing.xs,
              backgroundColor: colors.backgroundWhite,
              borderTopWidth: 1,
              borderTopColor: colors.peachGlow,
            },
            tabBarLabelStyle: {
              fontFamily: "Poppins_600SemiBold",
              fontSize: 12,
              lineHeight: 16,
              marginTop: 1,
            },
            tabBarIcon: ({ color, focused }) => (
              <Icon size={focused ? 23 : 21} color={color} strokeWidth={focused ? 2.5 : 2.1} />
            ),
          };
        }}
      >
        <Tabs.Screen name="home" options={{ title: strings.tabs.home }} />
        <Tabs.Screen name="cycle" options={{ title: strings.tabs.cycle }} />
        <Tabs.Screen name="vault" options={{ title: strings.tabs.vault }} />
        <Tabs.Screen name="profile" options={{ title: strings.tabs.profile }} />
      </Tabs>
      <FloatingBloopButton />
    </View>
  );
}
