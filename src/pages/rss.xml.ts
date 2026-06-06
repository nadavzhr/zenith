import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { SITE } from '../site.config';
import { getArticles, topicOf, articleSlug, articleDate } from '../lib/content';

export async function GET(context: APIContext) {
  const base = import.meta.env.BASE_URL; // e.g. "/bytelog/"
  const articles = await getArticles();
  const items = articles
    .map((article) => ({
      title: article.data.title,
      description: article.data.description,
      link: `${base}${topicOf(article)}/${articleSlug(article)}/`,
      pubDate: articleDate(article),
    }))
    .sort((a, b) => (b.pubDate?.getTime() ?? 0) - (a.pubDate?.getTime() ?? 0));

  return rss({
    title: SITE.name,
    description: SITE.description,
    site: context.site ?? SITE.site,
    items,
  });
}
