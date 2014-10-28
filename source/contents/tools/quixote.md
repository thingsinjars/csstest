---
template: layout.jade
section: tools
title: Quixote
---

## Quixote

This library uses a simple syntax for generating assertions not just based on the values of elements themselves but also how these elements relate to others. The example in the docs explains well:

    menu.assert({
      top: logo.bottom.plus(10)   // menu is 10px below logo
    });

Instead of specifying the value of the 'menu' element, we check that it is specifically 10px below the 'logo' element. This is more likely to lead to tests that can withstand minor modifications while maintaining specific layout relations.

It is designed to be used with existing testing frameworks such as [Karma](http://karma-runner.github.io/0.12/index.html), [Mocha](http://mochajs.org/) or [Jasmine](http://jasmine.github.io/).


### Techniques
  * [Computed Style](/techniques/computed-style.html)

### Links

  * [Source](https://github.com/jamesshore/quixote)