import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  FileHeart,
  FileText,
  FlaskConical,
  LockKeyhole,
  MoreVertical,
  Pill,
  Plus,
  Share2,
} from "lucide-react-native";
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useMemo, useState } from "react";
import Svg, {
  Circle,
  Defs,
  G,
  LinearGradient as SvgLinearGradient,
  Path,
  Stop,
} from "react-native-svg";

import { type HealthRecord, type RecordType, useAppStore } from "@/store/app-store";

const palette = {
  white: "#FFFFFF",
  primaryText: "#2C2A29",
  secondaryText: "#817673",
  mutedText: "#A79B98",
  coral: "#FF6F55",
  coralDeep: "#FF533D",
  coralSoft: "#FFF0EC",
  coralBorder: "#FFCFC4",
  shadowTint: "#D98268",
};

const softShadow = {
  shadowColor: palette.shadowTint,
  shadowOffset: { width: 0, height: 16 },
  shadowOpacity: 0.06,
  shadowRadius: 32,
  elevation: 6,
};

const filters = ["All", "Lab Results", "Prescriptions", "Cycle Notes"] as const;
type VaultFilter = (typeof filters)[number];

const filterType: Partial<Record<VaultFilter, RecordType>> = {
  "Lab Results": "Lab Result",
  Prescriptions: "Prescription",
  "Cycle Notes": "Doctor Note",
};

function getRecordIcon(type: RecordType) {
  if (type === "Lab Result") {
    return FlaskConical;
  }
  if (type === "Prescription") {
    return Pill;
  }
  if (type === "Doctor Note") {
    return FileHeart;
  }
  if (type === "AI Summary") {
    return Share2;
  }
  return FileText;
}

function FaceLockMark() {
  return (
    <View className="items-center justify-center" style={styles.faceGlow}>
      <Svg width={72} height={72} viewBox="0 0 96 96">
        <G stroke={palette.coral} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round">
          <Path d="M27 20 H18 C12 20 8 24 8 30 V39" />
          <Path d="M69 20 H78 C84 20 88 24 88 30 V39" />
          <Path d="M27 76 H18 C12 76 8 72 8 66 V57" />
          <Path d="M69 76 H78 C84 76 88 72 88 66 V57" />
          <Path d="M48 38 V52 L43 58" />
          <Path d="M34 39 V42" />
          <Path d="M63 39 V42" />
          <Path d="M37 65 C43 71 53 71 59 65" />
        </G>
      </Svg>
    </View>
  );
}

function EmptyVaultArt() {
  return (
    <Svg width={144} height={120} viewBox="0 0 168 144">
      <Defs>
        <SvgLinearGradient id="emptyFolder" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#FF7D63" />
          <Stop offset="1" stopColor="#FFE3DA" />
        </SvgLinearGradient>
      </Defs>
      <Circle cx="84" cy="66" r="62" fill="#FFF4F0" />
      <Path d="M44 78 C28 68 18 54 16 38" stroke="#F3BBB0" strokeWidth={3} fill="none" opacity={0.7} />
      <Path d="M26 57 C15 55 8 49 6 40 C18 40 25 47 26 57Z" fill="#F3BBB0" opacity={0.62} />
      <Path d="M36 72 C24 74 15 69 10 60 C23 58 32 62 36 72Z" fill="#F3BBB0" opacity={0.62} />
      <Path d="M124 78 C140 68 150 54 152 38" stroke="#B9AAA7" strokeWidth={3} fill="none" opacity={0.32} />
      <Path d="M142 57 C153 55 160 49 162 40 C150 40 143 47 142 57Z" fill="#B9AAA7" opacity={0.28} />
      <Path d="M132 72 C144 74 153 69 158 60 C145 58 136 62 132 72Z" fill="#B9AAA7" opacity={0.28} />
      <Path d="M49 52 H78 L86 60 H119 C126 60 130 64 130 71 V105 H38 V63 C38 57 43 52 49 52Z" fill="url(#emptyFolder)" />
      <Path d="M39 69 H119 C125 69 129 73 129 79 V105 H39Z" fill="#FFE1D7" />
      <Circle cx="84" cy="88" r="14" fill="#FF8A72" opacity={0.9} />
      <Path d="M79 87 V83 C79 80 81 78 84 78 C87 78 89 80 89 83 V87" stroke={palette.white} strokeWidth={3} fill="none" strokeLinecap="round" />
      <Path d="M84 88 V94" stroke={palette.white} strokeWidth={3} strokeLinecap="round" />
      <Path d="M34 126 H136" stroke="#F1D9D2" strokeWidth={2} strokeLinecap="round" />
      <Path d="M38 26 L40 30 L44 32 L40 34 L38 38 L36 34 L32 32 L36 30Z" fill="#FF9B86" opacity={0.7} />
      <Path d="M127 18 L129 22 L133 24 L129 26 L127 30 L125 26 L121 24 L125 22Z" fill="#FF9B86" opacity={0.55} />
      <Path d="M142 82 L144 86 L148 88 L144 90 L142 94 L140 90 L136 88 L140 86Z" fill="#FF9B86" opacity={0.55} />
    </Svg>
  );
}

function Header({ onLockPress }: { onLockPress: () => void }) {
  return (
    <View className="pt-6">
      <FaceLockMark />
      <View className="flex-row items-end justify-between mt-6">
        <View className="flex-1 pr-6">
          <Text style={styles.title}>Memory Vault</Text>
          <Text style={styles.subtitle}>Your private, encrypted health records</Text>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="View vault security details"
          onPress={onLockPress}
          className="items-center justify-center bg-white"
          style={styles.lockOrb}
        >
          <LockKeyhole size={28} color={palette.coral} strokeWidth={2.2} />
        </Pressable>
      </View>
    </View>
  );
}

function FilterPills({
  activeFilter,
  onChange,
}: {
  activeFilter: VaultFilter;
  onChange: (filter: VaultFilter) => void;
}) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="mt-6"
      contentContainerStyle={styles.filterContent}
    >
      {filters.map((filter) => {
        const active = activeFilter === filter;
        return (
          <Pressable
            key={filter}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
            accessibilityLabel={`Filter records by ${filter}`}
            onPress={() => onChange(filter)}
            className="items-center justify-center"
            style={[styles.filterPill, active ? styles.activeFilter : styles.inactiveFilter]}
          >
            <Text style={[styles.filterText, active ? styles.activeFilterText : styles.inactiveFilterText]}>
              {filter}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

function VaultRecordCard({
  record,
  onOpen,
  onMore,
}: {
  record: HealthRecord;
  onOpen: (record: HealthRecord) => void;
  onMore: (record: HealthRecord) => void;
}) {
  const Icon = getRecordIcon(record.type);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Open ${record.title}`}
      onPress={() => onOpen(record)}
      className="bg-white"
      style={styles.recordCard}
    >
      <View className="items-center justify-center" style={styles.recordIconWrap}>
        <Icon size={28} color={palette.coral} strokeWidth={1.8} />
      </View>
      <View className="flex-1 ml-4">
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.recordTitle}>
          {record.title.trim() || "Untitled record"}
        </Text>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.recordDate}>
          {record.date} · {record.type}
        </Text>
      </View>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`More actions for ${record.title}`}
        onPress={() => onMore(record)}
        hitSlop={8}
        className="items-center justify-center"
        style={styles.moreButton}
      >
        <MoreVertical size={24} color="#6F6461" strokeWidth={2.8} />
      </Pressable>
    </Pressable>
  );
}

function EmptyState({ filter, onUpload }: { filter: VaultFilter; onUpload: () => void }) {
  const isFiltered = filter !== "All";

  return (
    <View className="items-center mt-8">
      <EmptyVaultArt />
      <Text style={styles.emptyTitle}>
        {isFiltered ? `No ${filter.toLowerCase()} yet.` : "Your secure sanctuary is empty."}
      </Text>
      <Text style={styles.emptySubtitle}>
        {isFiltered ? "Try another filter or upload a matching record." : "Upload your first record."}
      </Text>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Upload first record"
        onPress={onUpload}
        className="items-center justify-center"
        style={styles.emptyUploadButton}
      >
        <Text style={styles.emptyUploadText}>Upload Record</Text>
      </Pressable>
    </View>
  );
}

export default function VaultScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const records = useAppStore((state) => state.records);
  const [activeFilter, setActiveFilter] = useState<VaultFilter>("All");

  const filteredRecords = useMemo(() => {
    const targetType = filterType[activeFilter];
    if (!targetType) {
      return records;
    }

    return records.filter((record) => record.type === targetType);
  }, [activeFilter, records]);

  const openUpload = () => {
    router.push("/(modals)/upload-record");
  };

  const showSecurityDetails = () => {
    Alert.alert(
      "Vault protection",
      "Your Memory Vault keeps demo records private in this app. Avoid uploading real medical documents in this demo build.",
      [{ text: "Got it" }],
    );
  };

  const openRecord = (record: HealthRecord) => {
    Alert.alert(record.title.trim() || "Untitled record", `${record.type} · ${record.source}\n${record.notes}`, [
      { text: "Close" },
    ]);
  };

  const openMoreActions = (record: HealthRecord) => {
    Alert.alert(record.title.trim() || "Record actions", "Choose an action for this record.", [
      { text: "Preview", onPress: () => openRecord(record) },
      { text: "Share summary", onPress: () => Alert.alert("Demo action", "Sharing is disabled in this demo.") },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "left", "right"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 24 }]}
      >
        <View className="px-6">
          <Header onLockPress={showSecurityDetails} />
          <FilterPills activeFilter={activeFilter} onChange={setActiveFilter} />

          <View className="mt-6">
            {filteredRecords.length > 0 ? (
              filteredRecords.map((record) => (
                <VaultRecordCard
                  key={record.id}
                  record={record}
                  onOpen={openRecord}
                  onMore={openMoreActions}
                />
              ))
            ) : (
              <EmptyState filter={activeFilter} onUpload={openUpload} />
            )}
          </View>

          <View className="flex-row justify-end mt-4 mb-4">
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Upload new record"
              onPress={openUpload}
              style={styles.fabTouchTarget}
            >
              <LinearGradient
                colors={[palette.coralDeep, palette.coral]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              style={styles.fab}
            >
                <Plus size={36} color={palette.white} strokeWidth={1.8} />
              </LinearGradient>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
  faceGlow: {
    width: 112,
    height: 112,
    alignSelf: "center",
    borderRadius: 56,
    backgroundColor: "#FFF0EA",
    shadowColor: palette.shadowTint,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
  },
  title: {
    color: palette.primaryText,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 34,
    lineHeight: 40,
    letterSpacing: 0,
  },
  subtitle: {
    color: palette.secondaryText,
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
    lineHeight: 24,
    letterSpacing: 0,
    marginTop: 8,
  },
  lockOrb: {
    width: 80,
    height: 80,
    borderRadius: 40,
    ...softShadow,
  },
  filterContent: {
    gap: 8,
    paddingRight: 24,
  },
  filterPill: {
    minHeight: 48,
    minWidth: 88,
    borderRadius: 24,
    paddingHorizontal: 16,
    borderWidth: 1,
  },
  activeFilter: {
    backgroundColor: palette.coralDeep,
    borderColor: palette.coralDeep,
    ...softShadow,
  },
  inactiveFilter: {
    backgroundColor: palette.white,
    borderColor: palette.coralBorder,
  },
  filterText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0,
  },
  activeFilterText: {
    color: palette.white,
  },
  inactiveFilterText: {
    color: palette.primaryText,
  },
  recordCard: {
    minHeight: 88,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    ...softShadow,
  },
  recordIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: palette.coralSoft,
  },
  recordTitle: {
    color: palette.primaryText,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 17,
    lineHeight: 24,
    letterSpacing: 0,
  },
  recordDate: {
    color: palette.mutedText,
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    lineHeight: 20,
    letterSpacing: 0,
    marginTop: 2,
  },
  moreButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  emptyTitle: {
    color: palette.primaryText,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    letterSpacing: 0,
    marginTop: 8,
  },
  emptySubtitle: {
    color: palette.secondaryText,
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    lineHeight: 24,
    textAlign: "center",
    letterSpacing: 0,
    marginTop: 8,
  },
  emptyUploadButton: {
    minWidth: 144,
    minHeight: 48,
    borderRadius: 24,
    backgroundColor: palette.coralDeep,
    marginTop: 24,
    paddingHorizontal: 24,
  },
  emptyUploadText: {
    color: palette.white,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    lineHeight: 20,
  },
  fabTouchTarget: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  fab: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: palette.white,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: palette.shadowTint,
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.18,
    shadowRadius: 28,
    elevation: 10,
  },
});
