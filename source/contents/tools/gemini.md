---
template: layout.jade
section: tools
title: Gemini
---

# Gemini

_Gemini is the utility for regression testing of web pages appearance._

## Supported browsers

- Google Chrome (tested in latest version)
- Mozilla Firefox (tested in latest version)
- IE8+
- Opera 12+

## Additional features

- CSS test coverage statistics

## Requirements

1. Node

2. WebDriver server implementation

  1. Selenium Server (for testing in different browsers)

  2. ChromeDriver (for testing in Google Chrome)

  3. PhantomJS (launch with `phantomjs --webdriver=4444`)

  4. Cloud WebDriver services (e.g. SauceLabs, BrowserStack)

3. Compiler with support of C++11 (GCC@4.6 or higher). This is a png-img requirement.

## Techniques

- [Image diff](/techniques/image-diff.html)

## Links

- [Gemini on Github](https://github.com/gemini-testing/gemini)
