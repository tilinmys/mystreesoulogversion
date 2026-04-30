import { Asset } from "expo-asset";
import { Image, InteractionManager, type ImageSourcePropType } from "react-native";

export const openingImages = [
  require("@/images/webp/welcome_hero_logo.webp") as ImageSourcePropType,
  require("@/images/webp/privacy_hero_logo.webp") as ImageSourcePropType,
  require("@/images/webp/mystreesoullogo.webp") as ImageSourcePropType,
  require("@/images/webp/blooppink1.webp") as ImageSourcePropType,
  require("@/images/webp/animegirl.webp") as ImageSourcePropType,
] as const;

export const founderQuoteImages = [
  require("@/images/webp/foundersmitha.webp") as ImageSourcePropType,
  require("@/images/webp/cofoundersurbhi.webp") as ImageSourcePropType,
] as const;

export const onboardingImagePipeline = [...openingImages, ...founderQuoteImages] as const;

const assetCache = new Map<string, Promise<boolean>>();

function getCacheKey(source: ImageSourcePropType) {
  if (typeof source === "number") {
    return `module:${source}`;
  }

  if (typeof source === "string") {
    return `uri:${source}`;
  }

  const resolved = Image.resolveAssetSource(source);
  return resolved?.uri ? `uri:${resolved.uri}` : JSON.stringify(source);
}

function cacheOne(source: ImageSourcePropType) {
  const key = getCacheKey(source);
  const cached = assetCache.get(key);

  if (cached) {
    return cached;
  }

  const task = (async () => {
    try {
      if (typeof source === "number") {
        await Asset.loadAsync(source);
        return true;
      }

      if (typeof source === "string") {
        return Image.prefetch(source);
      }

      const uri = Image.resolveAssetSource(source)?.uri;
      return uri ? Image.prefetch(uri) : false;
    } catch {
      return false;
    }
  })();

  assetCache.set(key, task);
  return task;
}

async function cacheWithConcurrency(
  sources: readonly ImageSourcePropType[],
  concurrency: number,
) {
  let cursor = 0;
  const workerCount = Math.max(1, Math.min(concurrency, sources.length));

  const workers = Array.from({ length: workerCount }, async () => {
    while (cursor < sources.length) {
      const source = sources[cursor];
      cursor += 1;
      await cacheOne(source);
    }
  });

  await Promise.all(workers);
  return true;
}

function schedulePreload(sources: readonly ImageSourcePropType[], concurrency = 2) {
  const task = InteractionManager.runAfterInteractions(() => {
    void cacheWithConcurrency(sources, concurrency);
  });

  return () => task.cancel();
}

export async function cacheImages(images: readonly ImageSourcePropType[]) {
  return cacheWithConcurrency(images, 3);
}

export async function preloadAllCriticalAssets() {
  return cacheImages(onboardingImagePipeline);
}

export function preloadOpeningImages() {
  return schedulePreload(openingImages, 2);
}

export function preloadOnboardingImages() {
  return schedulePreload(onboardingImagePipeline, 2);
}

export function preloadFounderQuoteImages() {
  return schedulePreload(founderQuoteImages, 2);
}

export function markFounderImagesForImmediatePreload() {
  return cacheWithConcurrency(founderQuoteImages, 2);
}
