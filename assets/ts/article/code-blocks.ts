interface CodeBlockLabels {
  region: string | undefined;
  copy: string;
  copied: string;
  copyFailed: string;
}

export function initCodeBlocks(labels: CodeBlockLabels): void {
  document
    .querySelectorAll<HTMLElement>('.prose pre:not([tabindex])')
    .forEach((pre) => {
      if (!labels.region) throw new Error('主题脚本缺少代码区域的无障碍名称');
      pre.tabIndex = 0;
      pre.setAttribute('role', 'region');
      pre.setAttribute('aria-label', labels.region);
    });

  document
    .querySelectorAll<HTMLElement>('.article-post .highlight')
    .forEach((highlight) => {
      const code = highlight.querySelector<HTMLElement>('code[data-lang]');
      if (!code) return;
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'copy-code-button';
      button.textContent = labels.copy;
      highlight.append(button);
      button.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(code.textContent ?? '');
          button.textContent = labels.copied;
        } catch (error) {
          console.error('复制代码失败', error);
          button.textContent = labels.copyFailed;
        }
        window.setTimeout(() => {
          button.textContent = labels.copy;
        }, 2000);
      });
    });
}
