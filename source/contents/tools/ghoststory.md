---
template: layout.jade
section: tools
---

## GhostStory

The aim of this project is to allow developers to test their CSS using [Cucumber story files](http://cukes.info/). It uses [SpookyJS](https://github.com/WaterfallEngineering/SpookyJS) as an interface between [Node.JS](http://nodejs.org/) (server built on JS) and [CasperJS](http://casperjs.org/) which is an abstraction and testing layer for [PhantomJS](http://phantomjs.org/).

The reason for using Cucumber files is that they are simple, plain-text files that can be shared between everyone involved in the project - developers, designers, product owners - so that everyone agrees on what is being made.

### Sample Cucumber file

<pre><code class="language-gherkin">
    Feature: Navigation
    As a Web Designer
    I would like to test my CSS

    Scenario: CSS
    Given I go to "/empty.html"
     Then the "Main logo" should
          have "margin" of "1.5em"
      And the "Main logo" should 
          look the same as before
</code></pre>

This project integrates [PhantomCSS](phantomcss.html) to enable image diff testing as well as project styleguide verification.

Currently, SpookyJS is a dependency but with the inclusion of [WebDriver in PhantomJS 1.8](http://phantomjs.org/release-1.8.html), this may change.

### Techniques

  * [Project Styleguide](/techniques/project-styleguide.html)
  * [Image Diff](/techniques/image-diff.html)

### Links

  * [Source](https://github.com/thingsinjars/GhostStory)
  * [SpookyJS fork with GhostStory integrated](https://github.com/thingsinjars/SpookyJS)