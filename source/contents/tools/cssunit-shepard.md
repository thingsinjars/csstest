---
template: layout.jade
section: tools
title: CSSUnit
---

## CSSUnit

_Note: One of at least two tools with the same name._

A manual tool for checking that certain rules are applied across a site. You can provide a number of alternative rules for each CSS selector you want to test and, as long as the element matches at least one of the styles, the test passes. You could specify that all links on the site must match predefined brand guidelines and be either `navajowhite`, `hotpink` or `goldenrod`. The tool will scan the elements and if it finds a link that is `mintcream`, it will notify you.

The main drawback for this tool is that it still relies on a person to run the test in the browser. That could be fixed, though.

### Techniques
  * [Project Styleguide](/techniques/project-styleguide.html)

### Links

  * [Project site](http://www.trisis.co.uk/cssUnit/)
  * [Source](https://github.com/SimonKenyonShepard/cssunit)