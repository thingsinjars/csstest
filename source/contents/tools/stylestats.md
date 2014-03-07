---
template: layout.jade
section: tools
title: StyleStats
---

## StyleStats

StyleStats is a efficient Node.js library for keeping stylesheet statistics. 

```
$ stylestats path/to/stylesheet.css
StyleStats!
┌──────────────────────────┬───────────────┐
│ Size                     │ 498.0B        │
├──────────────────────────┼───────────────┤
│ Rules                    │ 7             │
├──────────────────────────┼───────────────┤
│ Selectors                │ 11            │
├──────────────────────────┼───────────────┤
│ Simplicity               │ 63.64%        │
├──────────────────────────┼───────────────┤
│ Lowest Cohesion          │ 6             │
├──────────────────────────┼───────────────┤
│ Lowest Cohesion Selector │ hr            │
├──────────────────────────┼───────────────┤
│ Total Unique Font Sizes  │ 5             │
├──────────────────────────┼───────────────┤
│ Unique Font Size         │ 10px          │
│                          │ 12px          │
│                          │ 14px          │
│                          │ 16px          │
│                          │ 18px          │
├──────────────────────────┼───────────────┤
│ Total Unique Colors      │ 2             │
├──────────────────────────┼───────────────┤
│ Unique Color             │ #333          │
│                          │ #CCC          │
├──────────────────────────┼───────────────┤
│ Id Selectors             │ 1             │
├──────────────────────────┼───────────────┤
│ Universal Selectors      │ 0             │
├──────────────────────────┼───────────────┤
│ Important Keywords       │ 1             │
├──────────────────────────┼───────────────┤
│ Media Queries            │ 1             │
├──────────────────────────┼───────────────┤
│ Properties Count         │ font-size: 5  │
│                          │ margin: 4     │
│                          │ padding: 3    │
│                          │ color: 2      │
│                          │ display: 1    │
│                          │ height: 1     │
│                          │ border: 1     │
│                          │ border-top: 1 │
└──────────────────────────┴───────────────┘
```
### Links

  * [Project site](https://github.com/t32k/stylestats)