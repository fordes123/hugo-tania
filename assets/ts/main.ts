import { initColorScheme } from './site/color-scheme';
import { initNavigation } from './site/navigation';
import { initCodeBlocks } from './article/code-blocks';
import { initImagePlaceholders } from './article/image-placeholders';
import { initSideNotes } from './article/side-notes';
import { initTableOfContents } from './article/table-of-contents';

const script = document.currentScript as HTMLScriptElement | null;

initNavigation();
initColorScheme();
initImagePlaceholders();
if (script?.dataset.enableFootnotes === 'true') initSideNotes();
initCodeBlocks({
  region: script?.dataset.codeRegion,
  copy: script?.dataset.copy ?? 'Copy',
  copied: script?.dataset.copied ?? 'Copied',
  copyFailed: script?.dataset.copyFailed ?? 'Copy failed'
});
initTableOfContents();
