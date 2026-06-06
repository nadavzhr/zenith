/**
 * Central site identity and configuration.
 *
 * Everything platform-specific (name, description, social links, navigation,
 * deployment base path) lives here so layouts and pages stay generic and the
 * whole site can be re-skinned from one file — no branding literals scattered
 * across the codebase.
 */

export interface NavItem {
  href: string;
  label: string;
}

export interface SiteConfig {
  /** Public site name, shown in the header, footer and page titles. */
  name: string;
  /** Short tagline used as the default meta description. */
  description: string;
  /** Absolute production origin (no trailing slash), used for canonical URLs and feeds. */
  site: string;
  /** Path the site is served from, e.g. "/zenith/". Must start and end with "/". */
  base: string;
  /** Primary navigation, rendered relative to `base`. */
  nav: NavItem[];
  /** Optional source-repository URL shown in the footer. */
  repoUrl?: string;
  /** Author/owner used for RSS and as a default byline. */
  author: {
    name: string;
    title: string;
    email: string;
  };
  /** Social links */
  links: {
    linkedin: string;
    github: string;
  };
}

export const SITE = {
  name: 'Zenith',
  description:
    'A technical portfolio exploring the intersection of structured environments, mechanical precision, and aesthetic intent.',
  site: 'https://nadavzhr.github.io',
  base: '/zenith/',
  nav: [
    { href: '', label: 'Home' },
    { href: 'articles', label: 'Articles' },
    { href: 'topics', label: 'Topics' },
    { href: 'about', label: 'About' },
  ],
  repoUrl: 'https://github.com/nadavzhr/zenith',
  author: {
    name: 'Nadav Zohar',
    title: 'Software Engineer',
    email: 'nadavzhr@gmail.com',
  },
  links: {
    linkedin: 'https://www.linkedin.com/in/nadavzhr/',
    github: 'https://github.com/nadavzhr',
  },
} satisfies SiteConfig;

/**
 * Top-level slugs that are reserved for real pages and must never be used as a
 * topic slug. Routing guards against collisions using this list.
 */
export const RESERVED_SLUGS = ['about', 'tags', 'rss.xml', 'sitemap-index.xml'];
