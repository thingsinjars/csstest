---
template: layout.jade
section: techniques
---

## Frozen DOM

In each of the different [techniques](/techniques/) available, there is always something kept the same so that other things can be modified. With Frozen DOM tests, the idea is to take a snapshot of the DOM structure of the page you wish to test and the styles that are currently applied to those DOM elements. When you make a change in your CSS, you apply the new stylesheet to the (old) Frozen DOM. If the styles that are applied to the element via the cascade are the ones measured earlier and expected, it counts as a pass. If not, it's a fail.

This technique has a few flaws and most of the benefits it provides are more easily and dependably available with [Computed Style](/techniques/computed-style.html) tests.

One drawback is that tests using this tend to require a lot of maintenance. They don't automatically match your structure so if you change the site, you must also change the test. This can lead to tests being abandoned due to little return for lots of effort. The main problem with this technique, however, is that the tests can still be run successfully even when out-of-date. They can cause a false sense of security by not actually representing the live state of the site.

On the plus side, they are easy to automate and, if the project DOM structure doesn't change often, easy to set up.

### Tools

  * [cssert](/tools/cssert.html)
  * [cssunit](/tools/cssunit.html)
  * [css-test](/tools/css-test.html)