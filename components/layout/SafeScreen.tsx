import { type ReactNode } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import { colors, spacing } from "@/lib/design-tokens";

type SafeScreenProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  scroll?: boolean;
  padded?: boolean;
  keyboardAware?: boolean;
  bottomInset?: boolean;
  keyboardVerticalOffset?: number;
  scrollViewStyle?: StyleProp<ViewStyle>;
};

export function SafeScreen({
  children,
  style,
  contentStyle,
  scroll = false,
  padded = false,
  keyboardAware = false,
  bottomInset = true,
  keyboardVerticalOffset = 0,
  scrollViewStyle,
}: SafeScreenProps) {
  const insets = useSafeAreaInsets();
  const insetPadding = bottomInset ? insets.bottom + spacing.lg : 0;
  const insetStyle = insetPadding ? { paddingBottom: insetPadding } : null;
  const baseContentStyle = [styles.content, padded ? styles.padded : null];

  const content = scroll ? (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
      showsVerticalScrollIndicator={false}
      style={[styles.scrollView, scrollViewStyle]}
      contentContainerStyle={[...baseContentStyle, styles.scrollContent, contentStyle, insetStyle]}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[...baseContentStyle, contentStyle, insetStyle]}>{children}</View>
  );

  const body = keyboardAware ? (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={keyboardVerticalOffset}
      style={styles.keyboard}
    >
      {content}
    </KeyboardAvoidingView>
  ) : (
    content
  );

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={[styles.screen, style]}>
      {body}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: colors.warmWhite,
  },
  content: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
    paddingHorizontal: spacing.md,
  },
  padded: {
    paddingHorizontal: spacing.lg,
  },
  keyboard: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    width: "100%",
  },
  scrollContent: {
    flexGrow: 1,
  },
});
