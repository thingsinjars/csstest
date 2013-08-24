---
template: layout.jade
section: tools
---

## Wraith

Wraith is a screenshot comparison tool, created by developers at [BBC News](http://www.bbc.co.uk/news/).

In a slight departure from the standard image-diff process, Wraith compares two websites when testing. Normally, images are rendered and saved as 'reference cases' so that the testing tool tests a single target against the known layout. This tool generates the reference case live from one of the supplied sites then compares the other site to it. 

This technique minimises the impact of dynamic content changes on the rendered images by making it possible to pull in the same live content into both sites. In the [blog post announcing the tool](http://responsivenews.co.uk/post/56884056177/wraith), the team use the example of a twitter widget which would quickly be out of date in a standard image-diff test but can be used in this 'live generation' technique.


### Links

  * [Project site](http://responsivenews.co.uk/post/56884056177/wraith)
  * [Source](https://github.com/BBC-News/wraith)