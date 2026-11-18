export function initImagePlaceholders(): void {
  document
    .querySelectorAll<HTMLElement>('.prose [data-lqip]')
    .forEach((container) => {
      const image = container.querySelector<HTMLImageElement>(':scope > img');
      if (!image) throw new Error('正文 LQIP 容器缺少原图');

      const onLoad = (): void => {
        if (!image.hasAttribute('width')) {
          container.style.aspectRatio = `${image.naturalWidth} / ${image.naturalHeight}`;
        }
        container.dataset.lqip = 'loaded';
      };
      const onError = (): void => {
        container.dataset.lqip = 'error';
        console.error('正文图片加载失败', {
          src: image.currentSrc || image.src
        });
      };

      image.addEventListener('load', onLoad);
      image.addEventListener('error', onError);
      if (image.complete) {
        if (image.naturalWidth > 0) onLoad();
        else onError();
      } else {
        container.dataset.lqip = 'loading';
      }
    });
}
