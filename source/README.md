Source files
===

These are the files used to generate the static site using [Wintersmith](http://jnordberg.github.com/wintersmith/).

Installation
===

Install Wintersmith
---

    npm install wintersmith -g

Install SASS
---

    gem install sass

Install Wintersmith SASS plugin
---

    npm install wintersmith-sass -g

Building
===

Once you have Wintersmith installed, you can preview the site by navigating into this folder (`./source`) then running

    wintersmith preview

The content of the pages is generated from the Markdown files in `./source/contents/`. To create the final static site, run

    wintersmith build

And the files will be generated then moved into the root folder.