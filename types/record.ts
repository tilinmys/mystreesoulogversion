// Record-related types for the MyStree Soul frontend demo.
// No backend connection. All values are local Zustand/demo state.

export type RecordType = "Lab Result" | "Doctor Note" | "Prescription" | "AI Summary";

export type HealthRecord = {
  id: string;
  title: string;
  type: RecordType;
  source: string;
  date: string;
  notes: string;
};

/** Vault display state. Vault is always demo-local, never cloud-synced in this build. */
export type VaultState = {
  unlocked: boolean;
  records: HealthRecord[];
};
