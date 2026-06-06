import { getCollection, type CollectionEntry } from 'astro:content';
import type { ImageMetadata } from 'astro';

export type Topic = CollectionEntry<'topics'>;
export type Article = CollectionEntry<'articles'>;

/** The owning topic slug of an article, derived from its folder. */
export function topicOf(article: Article): string {
  return article.id.split('/')[0];
}

/** The article's own slug (the file name without the topic folder). */
export function articleSlug(article: Article): string {
  const parts = article.id.split('/');
  return parts[parts.length - 1];
}

/**
 * Resolve a cover image. Authors may set `cover` in frontmatter;
 * otherwise returns undefined if no cover is provided.
 */
export function coverFor(
  entry: { id: string; data: { cover?: ImageMetadata } },
): ImageMetadata | undefined {
  return entry.data.cover;
}

/** Format a date the same way everywhere. */
export function formatDate(date: Date | undefined): string {
  if (!date) return 'Unknown Date';
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/** Best-effort "last touched" date for an article (updated, else published). */
export function articleDate(article: Article): Date | undefined {
  return article.data.updated ?? article.data.pubDate;
}

/** Returns the article date or a default far-past date to avoid null checks in sort. */
export function articleDateOrEpoch(article: Article): Date {
  return articleDate(article) ?? new Date(0);
}

/** Finds articles in the same topic adjacent to the given one by date. */
export async function getAdjacentArticles(
  current: Article,
  limit: number = 2,
): Promise<Article[]> {
  const topicId = topicOf(current);
  const articles = (await getArticlesByTopic(topicId)).sort(
    (a, b) => articleDateOrEpoch(b).getTime() - articleDateOrEpoch(a).getTime(),
  );

  const idx = articles.findIndex((a) => a.id === current.id);
  if (idx === -1) return [];

  // Get articles before and after in the sorted list
  const related = [];
  if (idx > 0) related.push(articles[idx - 1]); // Newer
  if (idx < articles.length - 1) related.push(articles[idx + 1]); // Older

  // If we still have room and there are more articles, grab one more
  if (related.length < limit) {
    if (idx > 1) {
      related.push(articles[idx - 2]);
    } else if (idx < articles.length - 2) {
      related.push(articles[idx + 2]);
    }
  }

  return related.slice(0, limit);
}

/** All published topics, sorted by `order` then title. */
export async function getTopics(): Promise<Topic[]> {
  const topics = await getCollection('topics', ({ data }) => !data.draft);
  return topics.sort(
    (a, b) => a.data.order - b.data.order || a.data.title.localeCompare(b.data.title),
  );
}

/** All published articles. */
export async function getArticles(): Promise<Article[]> {
  return getCollection('articles', ({ data }) => !data.draft);
}

/** Published articles belonging to a topic, ordered then alphabetised. */
export async function getArticlesByTopic(topicId: string): Promise<Article[]> {
  const articles = await getArticles();
  return articles
    .filter((a) => topicOf(a) === topicId)
    .sort(
      (a, b) =>
        (a.data.order ?? Infinity) - (b.data.order ?? Infinity) ||
        a.data.title.localeCompare(b.data.title),
    );
}

/** Unique, sorted list of tags across the given articles. */
export function tagsOf(articles: Article[]): string[] {
  const seen = new Set<string>();
  for (const a of articles) for (const t of a.data.tags) seen.add(t);
  return [...seen].sort((a, b) => a.localeCompare(b));
}

/** Turn a tag into a URL-safe slug. */
export function tagSlug(tag: string): string {
  return tag.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

/**
 * Validate that every article lives under a folder matching a real topic.
 * Throws at build time with a clear message if an article is orphaned, which
 * keeps the topic→article relationship honest without repeating it in
 * frontmatter.
 */
export async function assertArticlesHaveTopics(): Promise<void> {
  const [topics, articles] = await Promise.all([getTopics(), getArticles()]);
  const known = new Set(topics.map((t) => t.id));
  const orphans = articles
    .map((a) => ({ id: a.id, topic: topicOf(a) }))
    .filter((a) => !known.has(a.topic));
  if (orphans.length > 0) {
    const list = orphans.map((o) => `  - ${o.id} (no topic "${o.topic}")`).join('\n');
    throw new Error(
      `Found article(s) with no matching topic landing page in src/content/topics/:\n${list}`,
    );
  }
}
