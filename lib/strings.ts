export const strings = {
  appName: "MyStree Soul",
  onboarding: {
    welcome: {
      title: "MyStree Soul",
      subtitle: "Your private health companion.",
      startDemo: "Get Started",
      existingAccount: "I have an account",
      privacy: "Private & protected.",
    },
    consent: {
      title: "Before we begin",
      subtitle: "Quick things to know.",
      cards: [
        {
          title: "Not medical advice",
          body: "Bloop guides, not diagnoses.",
        },
        {
          title: "Data stays here",
          body: "Nothing leaves your device.",
        },
        {
          title: "You're in control",
          body: "Delete everything, anytime.",
        },
        {
          title: "Demo only",
          body: "Don't upload real medical records.",
        },
      ],
      cta: "Got it, let's go",
      secondary: "Not now",
      disclaimer: "Demo — no real medical records.",
    },
    introSlides: [
      {
        title: "Know your rhythm",
        body: "Cycle phases, predictions & patterns at a glance.",
      },
      {
        title: "Vault your records",
        body: "Notes, reports & summaries in one safe place.",
      },
      {
        title: "Ask Bloop",
        body: "Gentle guidance & doctor-prep notes, no judgment.",
      },
    ],
    goals: {
      title: "What matters to you?",
      subtitle: "Pick one or more. Change anytime.",
      cta: "Continue",
      options: [
        "Period tracking",
        "Symptoms",
        "PCOS patterns",
        "Doctor prep",
        "Health records",
        "General wellness",
      ],
    },
    cycleSetup: {
      title: "Quick setup",
      subtitle: "You can update these anytime.",
      nameLabel: "Your name",
      namePlaceholder: "Name or nickname",
      lastPeriodLabel: "Last period",
      lastPeriodOptions: ["Today", "This week", "Don't remember"],
      cycleLengthLabel: "Cycle length",
      periodLengthLabel: "Period length",
      helper: "Estimates are fine.",
      cta: "Create My Dashboard",
      skipTracking: "I don't track cycles",
      skipSetup: "Skip",
    },
  },
  tabs: {
    home: "Home",
    cycle: "Cycle",
    vault: "Vault",
    profile: "Profile",
  },
  home: {
    subtext: "Here's what your body may be telling you today.",
    cycleDay: "Cycle Day 14",
    phase: "Ovulation Window",
    prediction: "Next period may start in 5 days",
    checkInTitle: "How are you feeling today?",
    quickActions: "Quick actions",
    vaultPreview: "Vault preview",
    openVault: "Open Vault",
  },
  cycle: {
    title: "Your Cycle Hub",
    subtitle: "A gentle view of your body's rhythm.",
    phaseTitle: "Ovulation Window",
    phaseBody:
      "Ovulation is when an ovary releases an egg. Some people notice more energy, discharge changes, or mild cramps around this time.",
    prediction: "Next period may start in 5 days",
    chartTitle: "Hormone trend",
    tip: "You may feel more energetic today. Listen to your body and stay hydrated.",
    cta: "Log how you feel",
  },
  vault: {
    lockedTitle: "Your Memory Vault is protected",
    lockedSubtitle: "Unlock to view your records, notes, and health summaries.",
    unlock: "Unlock Vault",
    title: "Memory Vault",
    subtitle: "Your records, notes, and summaries in one safe place.",
    trustBadge: "Private demo vault",
    upload: "Upload New Record",
    bloopContext:
      "Bloop can use your vault context to prepare better doctor notes.",
  },
  profile: {
    title: "Your Profile",
    goals: "Health Goals",
    notifications: "Notifications",
    privacy: "Privacy & Safety",
    preferences: "App Preferences",
    aboutBloop: "About Bloop",
    editGoals: "Edit Goals",
    privacySettings: "Privacy Settings",
    resetDemo: "Reset Demo",
    demoDisclaimer: "This is a demo version. Please do not upload real medical records yet.",
  },
  modals: {
    bloop: {
      title: "Hi, I'm Bloop",
      subtitle:
        "I can help you understand what your body has been trying to tell you.",
      prompts: [
        "Why am I tired today?",
        "Summarize my symptoms this week",
        "Prepare notes for my doctor",
        "What does my cycle phase mean?",
      ],
      placeholder: "Ask Bloop anything...",
      response:
        "You logged more fatigue this week, and your cycle is near the ovulation window. That can happen for some people. If this feels unusual or intense, it may be worth discussing with a doctor.",
    },
    logDay: {
      title: "Log today gently",
      subtitle:
        "A few quick taps help MyStree Soul remember your patterns.",
      mood: "How do you feel?",
      pain: "Pain",
      fatigue: "Fatigue",
      vitals: "Vitals",
      notes: "Anything you want Bloop to remember?",
      notesPlaceholder: "Add a gentle note...",
      cta: "Save Today's Log",
      success: "Logged. Bloop will remember this context.",
      safety:
        "Severe pain can be important. If this feels unusual, intense, or worrying, please consider contacting a healthcare professional.",
    },
    uploadRecord: {
      title: "Add to Memory Vault",
      subtitle:
        "Keep reports, notes, and summaries together for future care.",
      chooseFile: "Tap to choose a file",
      cta: "Save to Memory Vault",
      success: "Record added to your demo vault.",
    },
    doctorPrep: {
      title: "Doctor Prep Summary",
      subtitle:
        "A gentle summary to help you explain your patterns clearly.",
      bloopNote:
        "This summary is not a diagnosis. It is designed to help you have a clearer conversation with your healthcare professional.",
      copy: "Copy Summary",
      done: "Close Doctor Prep",
      copied: "Summary copied for your demo.",
    },
  },
} as const;
