---
template: layout.jade
section: techniques
title: Computed Style
---

## Computed style

This is related to the [Frozen DOM](/techniques/frozen-dom.html) but aims to hold slightly fewer variables fixed to increase the flexibility of the tools. With this technique, the test unit contains the CSS selector required to access the element under test and a list of styles which should be applied to the element. Unlike the Frozen DOM, this technique does not keep a local copy of the project DOM. This means that it can be more reliable. If the selector is specific enough to refer to a single element but generic enough to match it anywhere, the page can be restructured or the content modifed without requiring a rewrite of all tests.

This technique is called 'Computed Style' because most of the tools rely on measuring applied styles at runtime via the <code>[window.getComputedStyle](https://developer.mozilla.org/en-US/docs/Web/API/window.getComputedStyle)</code> function of JavaScript.

### Tools

  * [GhostStory](/tools/ghoststory.html)
  * [Needle](/tools/needle.html)
  * [CSSunit](/tools/cssunit.html)
  * [cssUnit](/tools/cssunit-shepard.html)
  * [CSS Test](/tools/css-test.html)