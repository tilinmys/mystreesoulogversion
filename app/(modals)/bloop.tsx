import { Bot, Mic, RefreshCcw, Send, X } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import { AppCard } from "@/components/ui/AppCard";
import { Pill } from "@/components/ui/Pill";
import { SafeScreen } from "@/components/layout/SafeScreen";
import { AuraBlob } from "@/components/visuals/AuraBlob";
import { colors, radius, spacing } from "@/lib/design-tokens";
import { strings } from "@/lib/strings";

export default function BloopModal() {
  const router = useRouter();
  const [reply,   setReply]   = useState("");
  const [typing,  setTyping]  = useState(false);
  const [input,   setInput]   = useState("");
  const [timedOut, setTimedOut] = useState(false);

  // Simulates a real AI call with timeout handling.
  // In production: replace with your actual fetch() wrapped in a Promise.race()
  const TIMEOUT_MS = 3000;

  const respond = () => {
    if (!input.trim() && reply) return; // prevent double-fire
    setTyping(true);
    setReply("");
    setTimedOut(false);

    const controller = { cancelled: false };

    const timeout = setTimeout(() => {
      if (controller.cancelled) return;
      setTyping(false);
      setTimedOut(true);   // show fallback instead of crashing
    }, TIMEOUT_MS);

    // Demo: simulate successful response after 650ms
    const success = setTimeout(() => {
      if (controller.cancelled) return;
      clearTimeout(timeout);
      setTyping(false);
      setTimedOut(false);
      setReply(strings.modals.bloop.response);
      setInput("");
    }, 650);

    return () => {
      controller.cancelled = true;
      clearTimeout(timeout);
      clearTimeout(success);
    };
  };

  return (
    <SafeScreen keyboardAware contentStyle={styles.content}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.scroll}
      >
        <View style={styles.header}>
          <View style={styles.orb}>
            <AuraBlob size={132} opacity={0.8} />
            <View style={styles.bot}>
              <Bot size={34} color={colors.whiteText} strokeWidth={2.2} />
            </View>
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Close Bloop"
            onPress={() => {
              if (router.canGoBack()) {
                router.back();
              } else {
                router.replace("/(tabs)/home");
              }
            }}
            style={styles.close}
          >
            <X size={22} color={colors.primaryText} />
          </Pressable>
        </View>

        <Text style={styles.title}>{strings.modals.bloop.title}</Text>
        <Text style={styles.subtitle}>{strings.modals.bloop.subtitle}</Text>

        <View style={styles.promptWrap}>
          {strings.modals.bloop.prompts.map((prompt) => (
            <Pill key={prompt} label={prompt} onPress={respond} style={styles.prompt} />
          ))}
        </View>

        <AppCard style={styles.replyCard}>
          {timedOut ? (
            // ── Timeout / error fallback ──────────────────────────────────────────
            <View style={styles.timeoutWrap}>
              <Text style={styles.timeoutText}>
                Bloop is taking a little longer than usual to think — please try again.
              </Text>
              <TouchableOpacity
                onPress={respond}
                style={styles.retryBtn}
                accessibilityRole="button"
                accessibilityLabel="Retry Bloop"
              >
                <RefreshCcw size={15} color={colors.primaryOrange} strokeWidth={2.2} />
                <Text style={styles.retryText}>Retry</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <Text style={styles.replyText}>
              {typing ? "Bloop is thinking gently..." : reply || "Choose a prompt or ask Bloop anything."}
            </Text>
          )}
        </AppCard>
      </ScrollView>

      <View style={styles.inputBar}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder={strings.modals.bloop.placeholder}
          placeholderTextColor={colors.mutedText}
          style={styles.input}
        />
        <Pressable accessibilityRole="button" accessibilityLabel="Microphone visual" style={styles.iconButton}>
          <Mic size={20} color={colors.roseGold} />
        </Pressable>
        <Pressable accessibilityRole="button" accessibilityLabel="Send to Bloop" onPress={respond} style={styles.send}>
          <Send size={19} color={colors.whiteText} />
        </Pressable>
      </View>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
    backgroundColor: colors.warmWhite,
  },
  scroll: {
    flexGrow: 1,
    paddingBottom: spacing.lg,
  },
  header: {
    alignItems: "center",
  },
  orb: {
    width: 132,
    height: 132,
    alignItems: "center",
    justifyContent: "center",
  },
  bot: {
    position: "absolute",
    width: 72,
    height: 72,
    borderRadius: radius.full,
    backgroundColor: colors.primaryOrange,
    alignItems: "center",
    justifyContent: "center",
  },
  close: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 48,
    height: 48,
    borderRadius: radius.button,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.backgroundWhite,
  },
  title: {
    color: colors.primaryText,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 31,
    lineHeight: 38,
    textAlign: "center",
  },
  subtitle: {
    color: colors.secondaryText,
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
    lineHeight: 23,
    textAlign: "center",
    marginTop: spacing.xs,
  },
  promptWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xs,
    marginTop: spacing.lg,
  },
  prompt: {
    flexGrow: 1,
  },
  replyCard: {
    marginTop: spacing.lg,
    minHeight: 148,
  },
  replyText: {
    color: colors.primaryText,
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
    lineHeight: 23,
  },
  timeoutWrap: {
    flexDirection: "column",
    alignItems: "center",
    gap: spacing.md,
    paddingVertical: spacing.md,
  },
  timeoutText: {
    color: colors.secondaryText,
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    lineHeight: 22,
    textAlign: "center",
  },
  retryBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: colors.primaryOrange,
  },
  retryText: {
    color: colors.primaryOrange,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 13,
    lineHeight: 18,
  },
  inputBar: {
    minHeight: 60,
    borderRadius: radius.input,
    backgroundColor: colors.backgroundWhite,
    borderWidth: 1,
    borderColor: colors.orangeBorder,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: spacing.md,
    paddingRight: spacing.xs,
    gap: spacing.xs,
  },
  input: {
    flex: 1,
    color: colors.primaryText,
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: radius.button,
    backgroundColor: colors.lavenderMist,
    alignItems: "center",
    justifyContent: "center",
  },
  send: {
    width: 44,
    height: 44,
    borderRadius: radius.button,
    backgroundColor: colors.primaryOrange,
    alignItems: "center",
    justifyContent: "center",
  },
});
