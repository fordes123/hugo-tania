import Fuse from '../../vendor/fuse/fuse.mjs';

export interface SearchArticle {
  title: string;
  tags: string[];
  categories: string[];
  contents: string;
  permalink: string;
  date: string;
  dateTime: string;
}

interface SearchIndex {
  articles: SearchArticle[];
  fuse: Fuse<SearchArticle>;
}

type ArticleSearch = (
  query: string,
  categories: ReadonlySet<string>
) => Promise<SearchArticle[]>;

function isStringArray(value: unknown): value is string[] {
  return (
    Array.isArray(value) && value.every((item) => typeof item === 'string')
  );
}

function parseSearchArticles(value: unknown, pageUrl: URL): SearchArticle[] {
  if (!Array.isArray(value)) throw new Error('搜索索引不是数组');
  return value.map((item: unknown) => {
    if (typeof item !== 'object' || item === null)
      throw new Error('搜索索引条目不是对象');
    const data = item as Record<string, unknown>;
    if (
      typeof data.title !== 'string' ||
      typeof data.contents !== 'string' ||
      typeof data.permalink !== 'string' ||
      typeof data.date !== 'string' ||
      typeof data.dateTime !== 'string' ||
      !isStringArray(data.tags) ||
      !isStringArray(data.categories)
    ) {
      throw new Error('搜索索引条目包含无效字段');
    }
    const url = new URL(data.permalink, pageUrl);
    if (
      url.origin !== pageUrl.origin ||
      !['http:', 'https:'].includes(url.protocol)
    ) {
      throw new Error('搜索索引包含无效链接');
    }
    return {
      title: data.title,
      contents: data.contents,
      permalink: url.href,
      date: data.date,
      dateTime: data.dateTime,
      tags: data.tags,
      categories: data.categories
    };
  });
}

export function createArticleSearch(indexUrl: string): ArticleSearch {
  let pendingIndex: Promise<SearchIndex> | undefined;

  function loadIndex(): Promise<SearchIndex> {
    if (!pendingIndex) {
      pendingIndex = fetch(indexUrl)
        .then((response) => {
          if (!response.ok)
            throw new Error(
              `搜索索引请求失败: ${response.status} ${response.statusText}, ${indexUrl}`
            );
          return response.json() as Promise<unknown>;
        })
        .then((value) =>
          parseSearchArticles(value, new URL(window.location.href))
        )
        .then((articles) => ({
          articles,
          fuse: new Fuse(articles, {
            keys: [
              { name: 'title', weight: 0.8 },
              { name: 'contents', weight: 0.5 },
              { name: 'tags', weight: 0.3 },
              { name: 'categories', weight: 0.3 }
            ],
            threshold: 0.3,
            ignoreLocation: true
          })
        }))
        .catch((error: unknown) => {
          pendingIndex = undefined;
          throw error;
        });
    }
    return pendingIndex;
  }

  return async (query, categories) => {
    const { articles, fuse } = await loadIndex();
    const matches = query
      ? fuse.search(query).map((result) => result.item)
      : articles;
    const selectedCategories = Array.from(categories);
    return matches.filter((article) =>
      selectedCategories.every((category) =>
        article.categories.includes(category)
      )
    );
  };
}
