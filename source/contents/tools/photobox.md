---
template: layout.jade
section: tools
title: Photobox
---

## Grunt-Photobox

This project's purpose is to make the check for changed or broken layout easier. If you use [Grunt](http://gruntjs.com) you can easily set it up inside of your Gruntfile.

It will take pictures of your site in defined resolutions (perfect for RWD check) and give you the opportunity to compare it with the pictures of the previous run of Photobox via a generated index.html file.

Photobox includes two working modes. The first one works without any dependencies and will generate an index page that included some JavaScript functionality to overlay the previous and the current picture. A tutorial of this mode can be found [here](http://4waisenkinder.de/blog/2013/07/26/grunt-photobox-secure-yourself-against-broken-layout/).

The second mode make usage of ImageMagick and will generate nice diff images for easier and quicker comparison. Using this layout changes can be detected easily by just scrolling down the generated site looking for the defined highlight color.

### Links

  * [Project site](https://npmjs.org/package/grunt-photobox)
  * [Source](https://github.com/stefanjudis/grunt-photoBox)
