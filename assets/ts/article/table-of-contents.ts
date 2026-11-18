export function initTableOfContents(): void {
  const toc = document.querySelector<HTMLElement>('.toc nav');
  if (!toc) return;
  const details = toc.closest<HTMLDetailsElement>('details');
  const wide = window.matchMedia('(min-width: 1281px)');
  if (details) {
    details.open = wide.matches;
    wide.addEventListener('change', () => {
      details.open = wide.matches;
    });
  }
  const links = Array.from(
    toc.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')
  );
  const byId = new Map(
    links.map((link) => [decodeURIComponent(link.hash.slice(1)), link])
  );
  const headings = document.querySelectorAll<HTMLElement>(
    '.article-post :is(h1, h2, h3, h4, h5, h6)[id]'
  );
  let current: HTMLAnchorElement | undefined;
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const selected = byId.get(entry.target.id);
        if (!selected || selected === current) continue;
        current?.removeAttribute('aria-current');
        selected.setAttribute('aria-current', 'location');
        current = selected;
      }
    },
    { rootMargin: '-10% 0px -75% 0px' }
  );
  headings.forEach((heading) => observer.observe(heading));
}
