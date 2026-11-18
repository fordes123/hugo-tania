type ThemePreference = 'auto' | 'light' | 'dark';
type ResolvedTheme = 'light' | 'dark';

export function initColorScheme(): void {
  const root = document.documentElement;
  const toggle = document.querySelector<HTMLButtonElement>('#theme-toggle');
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  const configured = root.dataset.themeDefault;
  const initial: ThemePreference =
    configured === 'light' || configured === 'dark' ? configured : 'auto';
  const saved = toggle ? localStorage.getItem('ThemeColorScheme') : null;
  let preference: ThemePreference =
    saved === 'light' || saved === 'dark' || saved === 'auto' ? saved : initial;
  const nextPreference: Record<ThemePreference, ThemePreference> = {
    auto: 'light',
    light: 'dark',
    dark: 'auto'
  };

  function applyColorScheme(): void {
    const resolved: ResolvedTheme =
      preference === 'auto' ? (media.matches ? 'dark' : 'light') : preference;
    root.dataset.themePreference = preference;
    root.dataset.userColorScheme = resolved;
    if (toggle) {
      const label = toggle.dataset[preference];
      if (!label) throw new Error(`缺少配色模式 ${preference} 的无障碍标签`);
      toggle.setAttribute('aria-label', label);
      toggle.title = label;
    }
    window.dispatchEvent(
      new CustomEvent<ResolvedTheme>('onColorSchemeChange', {
        detail: resolved
      })
    );
  }

  toggle?.addEventListener('click', () => {
    preference = nextPreference[preference];
    localStorage.setItem('ThemeColorScheme', preference);
    applyColorScheme();
  });
  media.addEventListener('change', () => {
    if (preference === 'auto') applyColorScheme();
  });
  applyColorScheme();
}
