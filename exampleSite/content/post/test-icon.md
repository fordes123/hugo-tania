---
author: Hugo Authors
title: Hugomods icons test
date: 2024-12-18
description: Use Hugo icons in your content
categories:
- syntax
---

We have imported the [Font Awesome](https://fontawesome.com/) module from [hugomods/icons](https://github.com/hugomods/icons) by default,
so you can use them directly in Markdown through the `ico` shortcode. The first argument selects the icon style:
`fab` for brands, `fas` for solid icons, and `far` for regular icons.

For example, the following code adds a {{< ico fab github >}} icon:
```markdown
{{</* ico fab github */>}}
```

To change the size, add a third argument: {{< ico fab github 3em >}}

```markdown
{{</* ico fab github 3em */>}}
```

To set the color or other properties, use named parameters: {{< ico vendor=fab name=github size=3em color=red >}}

```markdown
{{</* ico vendor=fab name=github size=3em color=red */>}}
```

You can find the icons you need in [Font Awesome](https://fontawesome.com/icons).
The existing `icons/icon` shortcode is still available. For more information about icon usage, please refer to the [hugomods/icons](https://icons.hugomods.com/docs/usages/) documentation.

---
<br>

You can add more icon libraries supported by hugomods icons to the module imports in your site's `hugo.yaml`:

```yaml
module:
  imports:
    - path: github.com/hugomods/icons/vendors/font-awesome
    - path: github.com/hugomods/icons/vendors/bootstrap
    - path: github.com/hugomods/icons/vendors/lucide
```

After editing, run `hugo mod get github.com/hugomods/icons/vendors/bootstrap github.com/hugomods/icons/vendors/lucide`
to add the modules to your site's dependencies. The theme continues to provide Font Awesome.



