---
template: layout.jade
section: tools
---

## Hardy

_Formerly known as [GhostStory 2: The Ghostening](ghoststory.html)._

This project allows developers to test their layouts using [Cucumber story files](http://cukes.info/). The project runs on [Node.JS](http://nodejs.org/) and uses [Selenium](http://docs.seleniumhq.org/) to enable full cross-browser testing. There is also a [Google Chrome extension](https://chrome.google.com/webstore/detail/hardy/ckiieicelchfbbpmdbeacaidfjedfmph "Chrome Web Store - Hardy") to simplify the process of creating tests.

The reason for using Cucumber files is that they are simple, plain-text files that can be shared between everyone involved in the project - developers, designers, product owners - so that everyone agrees on what is being made.

### Sample Cucumber file

<pre><code class="language-gherkin">
    Feature: Website layout test
    As a user I want visual consistency on the http://csste.st/ website

    Scenario: Content layout
    Given I visit "http://csste.st/"
    Then "section > p" should have "color" of "rgb(68, 68, 68)"
</code></pre>

### Tutorial

There is an introductory tutorial on the [Hardy website](http://hardy.io/getting-started.html "Hardy - Getting Started") to make setting up and running your first test simple.

### Techniques

  * [Project Styleguide](/techniques/project-styleguide.html)
  * [Image Diff](/techniques/image-diff.html)

### Links

  * [Project site](http://hardy.io/)
  * [Source](https://github.com/thingsinjars/Hardy)