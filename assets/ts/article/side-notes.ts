interface SideNote {
  reference: HTMLAnchorElement;
  note: HTMLElement;
}

export function initSideNotes(): void {
  const rail = document.querySelector<HTMLElement>('.side-notes');
  const article = document.querySelector<HTMLElement>('.article-post');
  if (!rail || !article) return;

  const notes: SideNote[] = [];
  const rendered = new Set<string>();
  article
    .querySelectorAll<HTMLAnchorElement>('a.footnote-ref')
    .forEach((reference) => {
      const hash = new URL(reference.href).hash;
      if (!hash) return;
      const id = decodeURIComponent(hash.slice(1));
      const original = document.getElementById(id);
      if (!original || rendered.has(id)) return;
      rendered.add(id);

      const copy = original.cloneNode(true) as HTMLElement;
      copy
        .querySelectorAll('.footnote-backref')
        .forEach((element) => element.remove());
      copy
        .querySelectorAll('[id]')
        .forEach((element) => element.removeAttribute('id'));
      const note = document.createElement('div');
      note.className = 'side-note';
      const number = document.createElement('span');
      number.className = 'bg-number';
      number.textContent = reference.textContent?.trim() ?? '';
      const first = copy.firstElementChild;
      if (first?.tagName === 'P') {
        first.prepend(number, document.createTextNode(' '));
      } else {
        note.append(number, document.createTextNode(' '));
      }
      note.append(...copy.childNodes);
      rail.append(note);
      notes.push({ reference, note });
    });

  if (notes.length === 0) return;
  rail.hidden = false;

  function alignSideNotes(): void {
    if (!rail || rail.getClientRects().length === 0) return;
    const railTop = rail.getBoundingClientRect().top;
    let nextTop = 0;
    for (const { reference, note } of notes) {
      const top = Math.max(
        reference.getBoundingClientRect().top - railTop,
        nextTop
      );
      note.style.top = `${top}px`;
      nextTop = top + note.offsetHeight + 16;
    }
    rail.style.minHeight = `${Math.max(0, nextTop - 16)}px`;
  }

  window.addEventListener('resize', alignSideNotes);
  const observer = new ResizeObserver(alignSideNotes);
  observer.observe(article);
  notes.forEach(({ note }) => observer.observe(note));
  void document.fonts.ready.then(alignSideNotes);
  alignSideNotes();
}
