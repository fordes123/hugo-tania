import { createArticleSearch, type SearchArticle } from './search-index';

function createResultRow(article: SearchArticle): HTMLDivElement {
  const row = document.createElement('div');
  row.className = 'post';
  const link = document.createElement('a');
  link.className = 'post-row';
  link.href = article.permalink;
  const time = document.createElement('time');
  time.dateTime = article.dateTime;
  time.textContent = article.date;
  const title = document.createElement('h3');
  title.textContent = article.title;
  link.append(time, title);
  row.append(link);
  return row;
}

function initArchiveSearch(root: HTMLElement): void {
  const input = root.querySelector<HTMLInputElement>('#search-query');
  const results = root.querySelector<HTMLElement>('#search-results');
  const articles = root.querySelector<HTMLElement>('#articles-list');
  const status = root.querySelector<HTMLElement>('#search-status');
  const indexUrl = root.dataset.index;
  if (!input || !results || !articles || !status || !indexUrl)
    throw new Error('搜索页面缺少必要元素或索引地址');

  const searchArticles = createArticleSearch(indexUrl);
  const categories = new Set<string>();
  let searchSequence = 0;

  const updateResults = async (): Promise<void> => {
    const currentSequence = ++searchSequence;
    const query = input.value.trim();
    const active = query.length > 0 || categories.size > 0;
    results.hidden = !active;
    articles.hidden = active;
    results.replaceChildren();
    status.textContent = '';
    if (!active) return;
    status.textContent = root.dataset.loading ?? '';
    try {
      const matches = await searchArticles(query, categories);
      if (currentSequence !== searchSequence) return;
      matches.forEach((article) => results.append(createResultRow(article)));
      status.textContent = matches.length
        ? (root.dataset.count ?? '{count}').replace(
            '{count}',
            String(matches.length)
          )
        : (root.dataset.empty ?? '');
    } catch (error) {
      if (currentSequence !== searchSequence) return;
      console.error('加载搜索索引失败', error);
      status.textContent = root.dataset.error ?? '';
    }
  };

  input.addEventListener('input', () => {
    void updateResults();
  });
  root
    .querySelectorAll<HTMLButtonElement>('[data-category]')
    .forEach((button) => {
      button.addEventListener('click', () => {
        const category = button.dataset.category;
        if (!category) return;
        if (categories.has(category)) categories.delete(category);
        else categories.add(category);
        button.setAttribute('aria-pressed', String(categories.has(category)));
        void updateResults();
      });
    });
}

const root = document.querySelector<HTMLElement>('#search');
if (root) initArchiveSearch(root);
