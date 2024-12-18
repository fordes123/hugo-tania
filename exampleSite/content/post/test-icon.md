---
author: Hugo Authors
title: Hugomods icons test
date: 2024-12-18
description: Use Hugo icons in your content
categories:
- syntax
---

We have imported the [Font Awesome](https://fontawesome.com/) module from [hugomods/icons](https://github.com/hugomods/icons) by default,
so you can use them directly in Markdown through shortcodes.

For example, the following code adds a {{< icons/icon vendor=fab name=github >}} icon
```markdown
{{</* icons/icon vendor=fab name=github */>}}
```

Through some built-in parameters, you can easily adjust the size, color, and other properties of the icon.

For example: {{< icons/icon vendor=fab name=github size=3em color=red >}}

```markdown
{{</* icons/icon vendor=fab name=github size=3em color=red */>}}
```

You can find the icons you need in [Font Awesome](https://fontawesome.com/icons).
For more information about icon usage, please refer to the [hugomods/icons](https://icons.hugomods.com/docs/usages/) documentation.

---
<br>

You can add more icon libraries supported by hugomods icons by editing `hugo.yaml` in the theme root directory:

```yaml
module:
  imports:
    - path: github.com/hugomods/icons/vendors/font-awesome
    - path: github.com/hugomods/icons/vendors/bootstrap
    - path: github.com/hugomods/icons/vendors/lucide
```

After editing, run the `yarn update` command (you may also need to manually clear the `_vendor` folder),
then you can use these icons in your Markdown content.



