import type { ImageMetadata } from 'astro';
import type { IconName } from './icons';

export interface Action {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary' | 'light' | 'outline';
}

export interface Feature {
  icon?: IconName;
  title: string;
  text: string;
  href?: string;
  linkLabel?: string;
  tags?: string[];
}

export interface ImageCard {
  image: ImageMetadata;
  alt: string;
  title: string;
  text?: string;
  href?: string;
  linkLabel?: string;
  tag?: string;
  meta?: string;
}

export interface QuoteItem {
  quote: string;
  cite: string;
  /** Shown under the name for testimonials, e.g. "Community member" */
  role?: string;
  image?: ImageMetadata;
}

export interface Stat {
  value: string;
  label: string;
  icon?: IconName;
}
