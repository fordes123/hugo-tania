export function initNavigation(): void {
  const navigation = document.querySelector<HTMLElement>('.navbar');
  if (!navigation) return;

  const updateNavigationHeight = (): void => {
    document.documentElement.style.setProperty(
      '--tania-navigation-height',
      `${navigation.offsetHeight}px`
    );
  };
  new ResizeObserver(updateNavigationHeight).observe(navigation);
  updateNavigationHeight();
}
