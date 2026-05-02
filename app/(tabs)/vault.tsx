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
import { Alert, FlatList, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useMemo, useState } from "react";
import Svg, {
  Circle,
  G,
  Path,
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

function EmptyVaultIllustration() {
  return (
    <Svg width={144} height={120} viewBox="0 0 168 144">
      <Circle cx="84" cy="70" r="56" fill="#FFF3EF" />
      <Path
        d="M48 54 H120 C126 54 130 58 130 64 V104 C130 110 126 114 120 114 H48 C42 114 38 110 38 104 V64 C38 58 42 54 48 54Z"
        stroke={palette.coral}
        strokeWidth={4}
        fill="none"
        opacity={0.72}
        strokeLinejoin="round"
      />
      <Path
        d="M58 54 V43 C58 30 69 20 84 20 C99 20 110 30 110 43 V54"
        stroke={palette.coral}
        strokeWidth={4}
        fill="none"
        opacity={0.54}
        strokeLinecap="round"
      />
      <Circle cx="84" cy="84" r="15" stroke={palette.coral} strokeWidth={4} fill="none" opacity={0.7} />
      <Path d="M84 99 V106" stroke={palette.coral} strokeWidth={4} strokeLinecap="round" opacity={0.7} />
      <Path d="M54 70 H66" stroke={palette.coral} strokeWidth={3} strokeLinecap="round" opacity={0.44} />
      <Path d="M102 70 H114" stroke={palette.coral} strokeWidth={3} strokeLinecap="round" opacity={0.44} />
      <Path d="M30 120 H138" stroke="#F1D9D2" strokeWidth={2} strokeLinecap="round" />
      <Path d="M31 34 L34 41 L41 44 L34 47 L31 54 L28 47 L21 44 L28 41Z" fill="#FF9B86" opacity={0.56} />
      <Path d="M132 28 L134 33 L139 35 L134 37 L132 42 L130 37 L125 35 L130 33Z" fill="#FF9B86" opacity={0.48} />
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

function EmptyVaultState({
  filter,
  hasAnyRecords,
  onAdd,
}: {
  filter: VaultFilter;
  hasAnyRecords: boolean;
  onAdd: () => void;
}) {
  const isFiltered = hasAnyRecords && filter !== "All";

  return (
    <View className="flex-1 items-center justify-center px-6" style={styles.emptyState}>
      <EmptyVaultIllustration />
      <Text style={styles.emptyTitle}>
        {isFiltered ? `No ${filter.toLowerCase()} yet` : "Your Vault is Empty"}
      </Text>
      <Text style={styles.emptySubtitle}>
        {isFiltered
          ? "Try another filter or add a matching record."
          : "Your private sanctuary awaits. Log your first symptom or memory today."}
      </Text>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Add vault entry"
        onPress={onAdd}
        className="items-center justify-center"
        style={styles.emptyUploadButton}
      >
        <Text style={styles.emptyUploadText}>+ Add Entry</Text>
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
      <FlatList
        data={filteredRecords}
        keyExtractor={(record) => record.id}
        renderItem={({ item }) => (
          <View style={styles.recordItem}>
            <VaultRecordCard record={item} onOpen={openRecord} onMore={openMoreActions} />
          </View>
        )}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[styles.listContent, { paddingBottom: insets.bottom + 24 }]}
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <Header onLockPress={showSecurityDetails} />
            <FilterPills activeFilter={activeFilter} onChange={setActiveFilter} />
            {filteredRecords.length > 0 ? <View style={styles.recordsTopGap} /> : null}
          </View>
        }
        ListEmptyComponent={
          <EmptyVaultState filter={activeFilter} hasAnyRecords={records.length > 0} onAdd={openUpload} />
        }
        ListFooterComponent={
          filteredRecords.length > 0 ? (
            <View className="flex-row justify-end" style={styles.footerAddWrap}>
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
          ) : null
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  listContent: {
    flexGrow: 1,
  },
  listHeader: {
    paddingHorizontal: 24,
  },
  recordsTopGap: {
    height: 24,
  },
  recordItem: {
    paddingHorizontal: 24,
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
    fontSize: 18,
    lineHeight: 26,
    textAlign: "center",
    letterSpacing: 0,
    marginTop: 16,
  },
  emptySubtitle: {
    color: palette.secondaryText,
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    lineHeight: 22,
    textAlign: "center",
    letterSpacing: 0,
    marginTop: 8,
    maxWidth: 288,
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
  emptyState: {
    minHeight: 376,
  },
  footerAddWrap: {
    paddingHorizontal: 24,
    marginTop: 16,
    marginBottom: 16,
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
