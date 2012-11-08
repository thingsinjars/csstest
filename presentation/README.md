Examples
====

A small-scale simulation of a full deployment pipeline.

Installation
====

Most of the examples are completely included here but (to save space), you must install the SpookyJS dependencies in `Examples/GhostStory` with

    npm install

Usage
====

  1. Open Terminal
  2. `cd Deploy`
  3. run `make test`. It will fail.
  4. Edit `Examples/source/test.css` until it passes
  5. run `make deploy`
  6. It will show a different page than the output of make test
  7. run `make cssert` to identify the problem
  8. run `make cssert-show` to visually show the problem
  9. run `make full` to run regression tests in the pipeline
  10. Edit `Examples/source/thistle.css` until `make full` passes
  11. Done.
  12. `make reset` to start again