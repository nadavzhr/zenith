// @ts-check
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark'; // Import the new modern unified processor wrapper
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import pagefind from 'astro-pagefind';
import tailwindcss from '@tailwindcss/vite';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

import { SITE } from './src/site.config.ts';

// Single source of truth for the deployment base path. The site is served from
// a sub-path (e.g. GitHub Pages under "/blog/"), so keep this in one place and
// reuse it for the rehype link-rewriting plugin below.
const BASE = SITE.base.replace(/\/$/, '');

/**
 * Rehype plugin: rewrite root-absolute links and asset URLs inside MDX/Markdown
 * (e.g. `/python/asyncio` or `/favicon.svg`) so they are prefixed with the site
 * base. Authors can keep writing clean root-relative links and still have them
 * work when the site is hosted under a sub-path.
 */
function rehypeBaseLinks() {
  const attrs = ['href', 'src'];
  /** @param {any} node */
  const walk = (node) => {
    if (node.type === 'element' && node.properties) {
      for (const attr of attrs) {
        const val = node.properties[attr];
        if (typeof val === 'string' && val.startsWith('/') && !val.startsWith('//')) {
          node.properties[attr] = BASE + val;
        }
      }
    }
    if (Array.isArray(node.children)) node.children.forEach(walk);
  };
  /** @param {any} tree */
  return (tree) => walk(tree);
}

// https://astro.build/config
export default defineConfig({
  site: SITE.site,
  base: SITE.base,
  integrations: [
    mdx(),
    react(),
    sitemap(),
    pagefind(),
  ],
  markdown: {
    shikiConfig: {
      themes: {
        light: 'min-light',
        dark: 'min-dark',
      },
    },
    // Pass plugins directly to unified() to align with Astro 6 specs
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex, rehypeBaseLinks],
    })
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      target: 'esnext',
    },
  },
});
