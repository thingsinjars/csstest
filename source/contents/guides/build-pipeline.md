---
template: layout.jade
section: guides
title: Build Pipeline
---

## Build Pipeline

A build pipelint is any automated process that can take your changes at least some of the way from your text editor to production.

This is an example [Make](http://www.gnu.org/software/make/) build script. Make isn't the prettiest or shiniest build system but it definitely works having been used for the best part of forever. In this script, we'll run [CSS Lint](/tools/csslint.html) then, if that passes, deploy the file to our website.

### Structure of our project

    project_directory/
        Makefile
        /source         (where we edit our files)
            /css
            /images
            index.html
        /deploy         (the live website)

This also assumes you have [csslint available globally](/guides/css-lint.html).

### Makefile

The contents of our file:

    TOP := $(dir $(lastword $(MAKEFILE_LIST)))
    source_dir = $(TOP)source
    deploy_dir = $(TOP)deploy

    syntaxcheck:
        csslint $(source_dir)

    publish:
        rm -rf $(deploy_dir)
        mkdir -p $(deploy_dir)
        cp -R $(source_dir)/* $(deploy_dir)/

    build: syntaxcheck publish

That's it. It's not a very good Makefile nor is it generally good practice to delete your entire website before deploying but it shows the basics. To run it, simply type:

    make build

Make will look in the Makefile for the `build` stage and see that it should run the `syntaxcheck` stage. It then runs csslint on the `/source` directory. If this fails, the build process will stop and nothing will be deployed. If this passes, Make runs the next stage in the list: `publish`. You can be confident that if the build pipeline gets as far as publishing, all the tests you want run have passed successfully.