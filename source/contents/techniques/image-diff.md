---
template: layout.jade
section: techniques
title: Image Diff
---

## Image Diff

When you are happy your page looks how it should, take a screenshot. Whenever a new change is made anywhere in the project, take another screenshot and compare the differences. If there are none, everything looks how it should, if there are differences, something broke.

This is probably the most common technique employed for CSS testing as it directly matches what CSS Developers themselves do when checking pages after changes. CSS is a (mostly) visual tool, therefore, developers *look* for changes. They visually ensure that nothing has broken. As computers are particularly good at spotting differences in large amounts of data, this transfers easily into a testing tool.

## Problems with this technique

### Content Fragile

It is *content-fragile*. Any copy changes will break tests. Even something as simple as a 'last updated on' date in the footer of a page will trigger a failure exactly the same as an actual error would. This can be worked around by testing entirely with mocked content or by only running image diff tests against a '[living styleguide](guides/living-styleguide.html)' if your project uses one. The project '[Wraith](/tools/wraith.html)' generates the comparison images at run-time against the current production server to minimise any time-dependant content differences.

### DOM-unaware

Once the page or element has been flattened down to an image, it has no relation to the underlying DOM structure. This makes it harder to identify the root cause of the problem it has identified. You know that something has gone wrong but you'll still need to spend time figuring out exactly where.

### Tools

  * [CSSCritic](/tools/csscritic.html)
  * [PhantomCSS](/tools/phantomcss.html)
  * [Wraith](/tools/wraith.html)