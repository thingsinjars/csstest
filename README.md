# NO LONGER MAINTAINED

*This project is no longer maintained. If there's anything useful here, feel free to take it.*

csste.st
=======

The source for [csste.st - A collection of resources on automated CSS testing](http://csste.st)

This site aims to be a community-driven collection of knowledge around CSS testing.


How to get involved
===

If you're familiar with git and have some contributions to make directly to the project, jump straight into checking it out:

    git clone https://github.com/thingsinjars/csstest.git

If you're not that into git but want to write something, you can either [raise an issue](https://github.com/thingsinjars/csstest/issues) or draft something [in the wiki](https://github.com/thingsinjars/csstest/wiki)

Even if you haven't got anything to write about but you've got an improvement for the site - including its stylesheets :D - we welcome any contributions.

How to get the source
---

Start with cloning the project:

    git clone https://github.com/thingsinjars/csstest.git

The source for the page content is in 

https://github.com/thingsinjars/csstest/tree/gh-pages/source 

and detailed build instructions are available in:

https://github.com/thingsinjars/csstest/blob/gh-pages/source/README.md

Site structure
---

The site is built using [Wintersmith](http://jnordberg.github.com/wintersmith/) with [SASS](http://sass-lang.com/) for the CSS, [Jade](http://jade-lang.com/) for the templates and [Markdown](http://daringfireball.net/projects/markdown/) for the formatting.

In the project [top level](https://github.com/thingsinjars/csstest), you can find all the flattened files as well as the production assets (CSS, images). This is because this project is directly copied to the root of [csste.st](http://csste.st/). The content is structured like so:

  * index.html
    * techniques/
      * index.html
      * other-techniques-files.html
    * tools/
      * index.html
      * tools-files.html
    * guides/
      * index.html
      * other-guides.html
    * getting-started/
      * index.html
      * other-starter-files.html

This structure is mirrored in the `/source/contents/` directory where the original content is created as Markdown.

Because we're using Wintersmith for the build process, the Markdown files need an extra couple of lines at the top to describe them. 

    ---
    template: layout.jade
    section: techniques
    ---

The original sass files are kept in `/source/contents/styles/` while the templates are kept in `/source/templates/`.


How to set up the build system
---

Check the source README for more detailed instructions on setting up the build system:

https://github.com/thingsinjars/csstest/blob/gh-pages/source/README.md

It's perfectly acceptable to submit a pull request with just the Markdown files. The site will get build automatically when the fork is pulled in.

Submitting pull requests
---

This project can only get better the more people contribute so feel free to submit your changes or suggest improvements as [issues](https://github.com/thingsinjars/csstest/issues).

If you have any suggestions for improvements on the build process or even this documentation, they're also welcome.


