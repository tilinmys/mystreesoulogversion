/**
 * image-preloader.ts
 *
 * Centralized image preloading pipeline.
 * Uses expo-image's Image.prefetch for disk+memory caching.
 * Falls back to expo-asset for local modules.
 *
 * All critical images are preloaded BEFORE SplashScreen.hideAsync()
 * so there is zero visual lag during navigation.
 */
import { Asset } from "expo-asset";
import { Image as ExpoImage } from "expo-image";
import { InteractionManager, Image as RNImage, type ImageSourcePropType } from "react-native";

// ── Critical images (preloaded before splash hides) ────────────────────────
export const criticalImages = [
  require("@/images/webp/welcome_hero_logo.webp") as ImageSourcePropType,
  require("@/images/webp/privacy_hero_logo.webp") as ImageSourcePropType,
  require("@/images/webp/mystreesoullogo.webp") as ImageSourcePropType,
  require("@/images/webp/blooppink1.webp") as ImageSourcePropType,
  require("@/images/webp/animegirl.webp") as ImageSourcePropType,
  require("@/images/webp/sanctuary_hero.png") as ImageSourcePropType,
  require("@/images/webp/heroimage.webp") as ImageSourcePropType,
] as const;

// ── Opening images (subset loaded first) ───────────────────────────────────
export const openingImages = criticalImages.slice(0, 5) as readonly ImageSourcePropType[];

// ── Founder quote images (deferred) ────────────────────────────────────────
export const founderQuoteImages = [
  require("@/images/webp/foundersmitha.webp") as ImageSourcePropType,
  require("@/images/webp/cofoundersurbhi.webp") as ImageSourcePropType,
] as const;

export const onboardingImagePipeline = [
  ...criticalImages,
  ...founderQuoteImages,
] as const;

// ── Internal cache to avoid duplicate loads ────────────────────────────────
const loaded = new Set<string>();

function getKey(source: ImageSourcePropType): string {
  if (typeof source === "number") return `mod:${source}`;
  if (typeof source === "string") return `uri:${source}`;
  const resolved = RNImage.resolveAssetSource(source);
  return resolved?.uri ? `uri:${resolved.uri}` : JSON.stringify(source);
}

async function cacheOne(source: ImageSourcePropType): Promise<boolean> {
  const key = getKey(source);
  if (loaded.has(key)) return true;

  try {
    if (typeof source === "number") {
      // Local require() module — use Asset.loadAsync
      await Asset.loadAsync(source);
      loaded.add(key);
      return true;
    }

    // URI string or object source — resolve and prefetch via expo-image
    const uri =
      typeof source === "string" ? source : RNImage.resolveAssetSource(source)?.uri;

    if (uri) {
      await ExpoImage.prefetch(uri);
      loaded.add(key);
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

async function cacheWithConcurrency(
  sources: readonly ImageSourcePropType[],
  concurrency: number,
) {
  let cursor = 0;
  const count = Math.max(1, Math.min(concurrency, sources.length));

  const workers = Array.from({ length: count }, async () => {
    while (cursor < sources.length) {
      const source = sources[cursor];
      cursor += 1;
      await cacheOne(source);
    }
  });

  await Promise.all(workers);
}

function schedulePreload(sources: readonly ImageSourcePropType[], concurrency = 2) {
  const task = InteractionManager.runAfterInteractions(() => {
    void cacheWithConcurrency(sources, concurrency);
  });
  return () => task.cancel();
}

// ── Public API ─────────────────────────────────────────────────────────────

/** Preloads ALL critical images synchronously — call before hiding splash. */
export async function preloadAllCriticalAssets(): Promise<void> {
  await cacheWithConcurrency(criticalImages, 4);
}

/** Schedule opening images after interactions settle. */
export function preloadOpeningImages() {
  return schedulePreload(openingImages, 2);
}

/** Schedule full onboarding pipeline after interactions settle. */
export function preloadOnboardingImages() {
  return schedulePreload(onboardingImagePipeline, 2);
}

/** Schedule founder quote images after interactions settle. */
export function preloadFounderQuoteImages() {
  return schedulePreload(founderQuoteImages, 2);
}

/** Cache founder images immediately (no interaction wait). */
export async function markFounderImagesForImmediatePreload() {
  return cacheWithConcurrency(founderQuoteImages, 2);
}

/** Legacy alias */
export async function cacheImages(images: readonly ImageSourcePropType[]) {
  return cacheWithConcurrency(images, 3);
}
