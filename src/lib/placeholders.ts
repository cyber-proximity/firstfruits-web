import type { ImageMetadata } from 'astro';

// Looks up a photo in src/assets/placeholders/ by file name (without .jpg).
// Used where content (e.g. teachings.json) refers to an image by name.
const files = import.meta.glob<{ default: ImageMetadata }>('../assets/placeholders/*.jpg', { eager: true });

export function placeholder(name: string): ImageMetadata {
  const file = files[`../assets/placeholders/${name}.jpg`];
  if (!file) throw new Error(`Placeholder image not found: ${name}.jpg`);
  return file.default;
}
