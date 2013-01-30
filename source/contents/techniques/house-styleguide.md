---
template: layout.jade
section: techniques
---

## House styleguide

The more consistency between different developers' code, the lower the chance of [unintended consequences](/guides/unintended-consequences.html). This can also make it easier to spot mistakes. The house styleguide is something agreed upon within a team that is applicable to all projects. This can range from decisions over tabs vs. spaces to whether to allow `!important` in rules.

CSSLint is useful for this if you take time to choose the rules that are applicable to you. For example, specifying `width` and `padding` on an element will produce a warning from CSSLint's default setting.

    div {
        width:100px;
        padding:0 10px;
    }

    1: warning at line 3, col 2
    Using width with padding can sometimes 
    make elements larger than you expect.

Perhaps for your team, using `width` with `padding` makes elements exactly the size you expected.

### Tools

  * [CSSLint](/tools/csslint.html)