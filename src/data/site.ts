// Site-wide details, navigation and footer links.
// Edit this file to change menus; Header and Footer read from it.

export const site = {
  name: 'First Fruits',
  tagline: 'Awakening Eco-Spiritual Consciousness',
  description:
    'First Fruits brings people together through mindful living, regenerative action, and a deep commitment to the communities and Earth we share.',
  email: 'info@1st-fruits.org',
  // Add social profiles when the client provides them, e.g. { label: 'Instagram', href: 'https://...' }
  social: [] as { label: string; href: string }[],
};

export interface NavLink {
  label: string;
  href: string;
}

export interface NavGroup {
  label: string;
  links: NavLink[];
}

export const mainNav: (NavGroup | NavLink)[] = [
  {
    label: 'About',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Manifesto', href: '/manifesto' },
      { label: 'Our Team', href: '/team' },
      { label: 'Future Vision', href: '/vision' },
    ],
  },
  {
    label: 'What We Do',
    links: [
      { label: 'Our Work', href: '/what-we-do' },
      { label: 'Our Path', href: '/our-path' },
      { label: 'Impact', href: '/impact' },
      { label: 'Plant-Based Living', href: '/plant-based-living' },
    ],
  },
  {
    label: 'Learn',
    links: [
      { label: 'Teachings', href: '/teachings' },
      { label: 'Learning Hub', href: '/learn' },
      { label: 'VEG ELITES', href: '/veg-elites' },
    ],
  },
  { label: 'Contact', href: '/contact' },
];

// Donate goes to the contact page until a donation page or provider exists.
export const donateLink: NavLink = { label: 'Donate', href: '/contact?topic=donation' };

export const isGroup = (item: NavGroup | NavLink): item is NavGroup => 'links' in item;
