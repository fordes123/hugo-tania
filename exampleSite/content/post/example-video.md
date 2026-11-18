---
title: "Resources Embeds"
date: "2026-11-18"
description: "Native video and iframe elements, a video shortcode, and Hugo's YouTube shortcode."
tags:
  - video
  - html
comments: false
---

Embed video files and webpages using native HTML or Hugo shortcodes. The theme keeps native playback controls and applies responsive sizing, rounded corners, and consistent spacing without video JavaScript.

<!--more-->

## Video shortcode

The `video` shortcode adds native controls, inline playback, and metadata preloading. Supply `src`, `title`, and the actual `width` and `height`. The optional `poster` parameter supplies your own cover image; omitting it leaves the browser's native first-frame behavior.

{{< video src="https://mdn.github.io/shared-assets/videos/flower.mp4" title="Flowers moving in the breeze" width=960 height=540 >}}

```text
{{</* video src="https://mdn.github.io/shared-assets/videos/flower.mp4" title="Flowers moving in the breeze" width=960 height=540 */>}}
```

Local `src` and `poster` paths resolve from the page bundle, then `assets/`, then the site root for files in `static/`. HTTP(S) URLs remain unchanged. For a page bundle containing `clip.mp4` and `cover.webp`, write:

```text
{{</* video src="clip.mp4" poster="cover.webp" title="A short demo" width=1280 height=720 */>}}
```

## Hugo's YouTube shortcode

Hugo also provides a built-in [`youtube` shortcode](https://gohugo.io/shortcodes/youtube/). Pass the video ID instead of the full URL. The `video-embed` class uses the theme's responsive iframe styles and gives the player the same spacing as the other examples.

{{< youtube id="0RKpf3rK57I" title="Hugo YouTube shortcode example" class="video-embed" loading="lazy" >}}

```text
{{</* youtube id="0RKpf3rK57I" title="Hugo YouTube shortcode example" class="video-embed" loading="lazy" */>}}
```

Raw HTML requires `markup.goldmark.renderer.unsafe: true`. The shortcode examples work without enabling raw HTML. Embedded providers may receive requests when their players load.

## Native video

Use `<video>` for a direct video file. This flower clip comes from [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/video). Its actual dimensions reserve the aspect ratio before it loads.

<video controls playsinline width="960" height="540" aria-label="Flowers moving in the breeze">
  <source src="https://mdn.github.io/shared-assets/videos/flower.mp4" type="video/mp4">
</video>

```html
<video controls playsinline width="960" height="540" aria-label="Flowers moving in the breeze">
  <source src="https://mdn.github.io/shared-assets/videos/flower.mp4" type="video/mp4">
</video>
```

## Native iframe

This `<iframe>` embeds the Example Domain webpage. Frames fill the article width with a default 16:9 ratio. For another ratio, set an inline style such as `aspect-ratio: 4 / 3`.

<iframe src="https://example.com/" title="Example Domain webpage" width="960" height="540" loading="lazy"></iframe>

```html
<iframe
  src="https://example.com/"
  title="Example Domain webpage"
  width="960"
  height="540"
  loading="lazy"
></iframe>
```

