import { Image, type ImageSourcePropType, StyleSheet, Text, View } from "react-native";
import { colors, radius } from "@/lib/design-tokens";

export type TeamAvatarProps = {
  name: string;
  title?: string;
  image?: ImageSourcePropType;
  size?: number;
};

export function TeamAvatar({ name, title, image, size = 64 }: TeamAvatarProps) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const borderSize = size + 4;

  return (
    <View style={styles.wrapper}>
      <View
        style={[
          styles.border,
          {
            width: borderSize,
            height: borderSize,
            borderRadius: borderSize / 2,
          },
        ]}
      >
        {image ? (
          <Image
            source={image}
            style={{ width: size, height: size, borderRadius: size / 2 }}
            resizeMode="cover"
          />
        ) : (
          <View
            style={[
              styles.fallback,
              { width: size, height: size, borderRadius: size / 2 },
            ]}
          >
            <Text style={[styles.initials, { fontSize: size * 0.32 }]}>{initials}</Text>
          </View>
        )}
      </View>
      {title ? <Text style={styles.title} numberOfLines={1}>{title}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    gap: 6,
  },
  border: {
    borderWidth: 2,
    borderColor: colors.paleCoral,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.warmWhite,
  },
  fallback: {
    backgroundColor: colors.peachGlow,
    alignItems: "center",
    justifyContent: "center",
  },
  initials: {
    color: colors.primaryOrange,
    fontFamily: "Poppins_600SemiBold",
    lineHeight: undefined,
  },
  title: {
    color: colors.secondaryText,
    fontFamily: "Poppins_400Regular",
    fontSize: 11,
    lineHeight: 15,
    textAlign: "center",
    maxWidth: 72,
  },
});
