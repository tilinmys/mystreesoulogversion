import { FileUp, X } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import { AppCard } from "@/components/ui/AppCard";
import { Pill } from "@/components/ui/Pill";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SafeScreen } from "@/components/layout/SafeScreen";
import { colors, radius, spacing } from "@/lib/design-tokens";
import { strings } from "@/lib/strings";
import { type RecordType, useAppStore } from "@/store/app-store";

const types: RecordType[] = ["Lab Result", "Doctor Note", "Prescription", "AI Summary"];

export default function UploadRecordModal() {
  const router = useRouter();
  const addRecord = useAppStore((state) => state.addRecord);
  const [title, setTitle] = useState("New health record");
  const [type, setType] = useState<RecordType>("Lab Result");
  const [source, setSource] = useState("Demo Clinic");
  const [notes, setNotes] = useState("");
  const [saved, setSaved] = useState(false);

  const save = () => {
    addRecord({ title, type, source, notes: notes || "Demo upload added for future care context." });
    setSaved(true);
  };

  return (
    <SafeScreen keyboardAware contentStyle={styles.content}>
      <View style={styles.topRow}>
        <View>
          <Text style={styles.title}>{strings.modals.uploadRecord.title}</Text>
          <Text style={styles.subtitle}>{strings.modals.uploadRecord.subtitle}</Text>
        </View>
        <Pressable accessibilityRole="button" accessibilityLabel="Close upload record" onPress={() => router.back()} style={styles.close}>
          <X size={22} color={colors.primaryText} />
        </Pressable>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.scroll}
      >
        <AppCard style={styles.uploadCard}>
          <FileUp size={34} color={colors.primaryOrange} />
          <Text style={styles.uploadText}>{strings.modals.uploadRecord.chooseFile}</Text>
          <Text style={styles.uploadMeta}>Demo upload only</Text>
        </AppCard>
        <DemoInput label="Record title" value={title} onChangeText={setTitle} />
        <View>
          <Text style={styles.label}>Record type</Text>
          <View style={styles.pills}>
            {types.map((item) => (
              <Pill key={item} label={item} selected={type === item} onPress={() => setType(item)} />
            ))}
          </View>
        </View>
        <DemoInput label="Source / Doctor" value={source} onChangeText={setSource} />
        <DemoInput label="Notes" value={notes} onChangeText={setNotes} multiline />
        {saved ? <Text style={styles.success}>{strings.modals.uploadRecord.success}</Text> : null}
        <PrimaryButton label={saved ? "Done" : strings.modals.uploadRecord.cta} onPress={saved ? router.back : save} />
      </ScrollView>
    </SafeScreen>
  );
}

function DemoInput({
  label,
  value,
  onChangeText,
  multiline = false,
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  multiline?: boolean;
}) {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        placeholderTextColor={colors.mutedText}
        style={[styles.input, multiline ? styles.textArea : null]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
    backgroundColor: colors.warmWhite,
  },
  topRow: {
    flexDirection: "row",
    gap: spacing.md,
  },
  title: {
    color: colors.primaryText,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 29,
    lineHeight: 36,
  },
  subtitle: {
    color: colors.secondaryText,
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    lineHeight: 21,
    marginTop: spacing.xs,
  },
  close: {
    marginLeft: "auto",
    width: 48,
    height: 48,
    borderRadius: radius.button,
    backgroundColor: colors.backgroundWhite,
    alignItems: "center",
    justifyContent: "center",
  },
  scroll: {
    flexGrow: 1,
    gap: spacing.md,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
  },
  uploadCard: {
    alignItems: "center",
    gap: spacing.xs,
    borderWidth: 1.5,
    borderColor: colors.orangeBorder,
    borderStyle: "dashed",
  },
  uploadText: {
    color: colors.primaryText,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 15,
  },
  uploadMeta: {
    color: colors.secondaryText,
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
  },
  label: {
    color: colors.primaryText,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    marginBottom: spacing.xs,
  },
  pills: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xs,
  },
  input: {
    minHeight: 52,
    borderRadius: radius.input,
    backgroundColor: colors.backgroundWhite,
    borderWidth: 1,
    borderColor: colors.divider,
    paddingHorizontal: spacing.md,
    color: colors.primaryText,
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
  },
  textArea: {
    minHeight: 108,
    paddingTop: spacing.md,
    textAlignVertical: "top",
  },
  success: {
    color: colors.successText,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    textAlign: "center",
  },
});
