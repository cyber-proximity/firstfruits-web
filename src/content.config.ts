// Content collection schemas. Each collection is a folder (or file) in src/content/.
// Add an entry by adding a Markdown file; the pages pick it up automatically.
import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { icons } from './lib/icons';

const iconName = z.enum(Object.keys(icons) as [keyof typeof icons, ...(keyof typeof icons)[]]);

/** Programmes listed on /what-we-do, each with its own page. */
const programs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/programs' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      icon: iconName,
      cover: image(),
      coverAlt: z.string(),
      order: z.number(),
    }),
});

/** Team members on /team. Add `photo` once real portraits are supplied. */
const team = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/team' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      role: z.string(),
      bio: z.string(),
      photo: image().optional(),
      order: z.number(),
    }),
});

/** Articles, videos and courses in the learning hub (/learn). */
const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      type: z.enum(['article', 'video', 'course']),
      category: z.string(),
      date: z.coerce.date(),
      cover: image(),
      coverAlt: z.string(),
      featured: z.boolean().default(false),
      /** Videos: running time, e.g. "12 min". Courses: length, e.g. "4 weeks". */
      duration: z.string().optional(),
      /** Courses only */
      level: z.enum(['Beginner', 'Intermediate', 'Advanced']).optional(),
      /** Videos only: YouTube or Vimeo embed URL, once available */
      videoUrl: z.url().optional(),
    }),
});

/** VEG ELITES profiles (/veg-elites). */
const profiles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/profiles' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      title: z.string(),
      tagline: z.string(),
      summary: z.string(),
      photo: image().optional(),
      featured: z.boolean().default(false),
      order: z.number(),
      principles: z
        .array(z.object({ icon: iconName, title: z.string(), text: z.string() }))
        .optional(),
    }),
});

/** Quotes on /teachings, grouped by theme. */
const teachings = defineCollection({
  loader: file('./src/content/teachings.json'),
  schema: z.object({
    quote: z.string(),
    author: z.string(),
    theme: z.enum([
      'Presence & Inner Awakening',
      'Sacred Earth Wisdom',
      'Universal Love & Interconnectedness',
      'Mindfulness & Compassion',
      'Compassion & Planetary Stewardship',
    ]),
    image: z.string().optional(),
  }),
});

export const collections = { programs, team, articles, profiles, teachings };
