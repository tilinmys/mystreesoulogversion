/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: {
          white: "#FFFFFF",
          warm: "#FFF8F5",
        },
        primary: {
          orange: "#F97316",
          gradientStart: "#FB923C",
          softSurface: "#FFF1E8",
          border: "#FED7AA",
          peachGlow: "#FDE7DC",
        },
        accent: {
          teal: "#5BBFB5",
          tealSoftSurface: "#E8F7F5",
          coral: "#FF8A7A",
          coralSoftSurface: "#FFE8E3",
          softPink: "#F9A8D4",
          pinkSoftSurface: "#FCE7F3",
          roseGold: "#C98F7A",
          lavenderMist: "#EDE7F6",
        },
        status: {
          successText: "#2F7D55",
          successSurface: "#EAF7EF",
          warningText: "#9A5B00",
          warningSurface: "#FFF4D8",
          dangerText: "#B94A48",
          dangerSurface: "#FDECEC",
        },
        text: {
          primary: "#2D2A26",
          secondary: "#6B665F",
          muted: "#9B928A",
          white: "#FFFFFF",
        },
      },
      borderRadius: {
        appSm: 16,
        appMd: 20,
        appLg: 24,
        appFull: 999,
      },
      spacing: {
        1: 4,
        2: 8,
        3: 12,
        4: 16,
        6: 24,
        8: 32,
        10: 40,
      },
      fontSize: {
        screenTitle: [28, { lineHeight: 34, fontWeight: "700" }],
        sectionTitle: [20, { lineHeight: 26, fontWeight: "700" }],
        body: [16, { lineHeight: 24, fontWeight: "400" }],
        helper: [13, { lineHeight: 18, fontWeight: "400" }],
        button: [16, { lineHeight: 22, fontWeight: "700" }],
      },
      boxShadow: {
        soft: "0 8px 24px rgba(255, 138, 122, 0.08)",
      },
    },
  },
  plugins: [],
};
