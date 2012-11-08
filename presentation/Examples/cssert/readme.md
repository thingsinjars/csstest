# cssert – CSS verification testing

## Make sure your styles don't change when your files do
When working on a large project, you sometimes need to refactor your CSS. If you aren't constantly aware of all the different dependencies, you can end up altering the styles somewhere unexpected. This framework is designed to help you create key test cases linked to your styles. If the tests pass after refactoring, you can be sure your design is intact.

## Design
This works by generating a simple HTML skeleton unit which matches the minimal page structure around the element whose styles you want to test. This unit contains references to your project's CSS. You can then refactor your CSS as much as you like and as long as the styles cascade down to the same visual appearance, the test will continue to pass.

## Usage
### Generating tests
The easiest way to create test cases is to use the bookmarklet. To generate a test unit, load a page whose styles you want to maintain then run the bookmarklet. If you click on an element, the test case will be generated in the floating panel. You can then either copy and paste this into the test section of the standard test page or drag the icon from the bottom of the panel to your desktop.

### Running the tests in-browser
Open the test page in a browser now and all the tests should pass. You can now refactor your CSS and the tests will let you know if something has changed unexpectedly.

### Running the tests on command-line
This same test page can also be used with the command-line interface. cssert uses [PhantomJS](http://www.phantomjs.org/) to run the tests in a headless webkit instance so that they can be integrated into an automated build-system. You'll need to install PhantomJS into your path after downloading it. Place your test case in the tests folder and run
```
$ ./cssert testcase.html
```

To run all tests in the tests folder at once, simply run with no
arguments:
```
$ ./cssert
```

## Spotting changes
If a test is marked as failed, you can view the current state of the markup and styles in the browser window by clicking
on the test title. When running via command-line, screenshots are saved
of the state the page was in at the time of the test.

## Installation
Just clone the git project from git@github.com:thingsinjars/cssert.git
and you're good to go.

The tests directory comes with some sample tests generated using Twitter's Bootstrap project. Put your tests in that same place.

## Limitations
Most of the limitations you'll run into are caused by using the
automatically generated tests. They're good for creating a starting
point but at the moment, they need to be tweaked for many cases.

### Sibling selectors
Because the test generates the DOM via following parents up the
structure, sibling elements are ignored. These styles are still
testable, though. Simply add the sibling element into your HTML test
block.

### Styles modified by JS
The styles are measured on the element as it is when the case is
generated. The test compares this against the styles provided by the
CSS. If the element contains JS-only styles not added by CSS, they will
not be correctly matched. Modify your test case to allow for this.

## Known Bugs
### @font-face not correctly matched
If your @font-face declaration contains a suggested 'local' source (as recommended in Paul Irish's [bulletproof syntax](http://paulirish.com/2009/bulletproof-font-face-implementation-syntax/)), a [bug in QTWebkit](https://bugs.webkit.org/show_bug.cgi?id=36351) will prevent the test case from running correctly.

## Bug Tracker
If you find any other bugs, please create an issue here on GitHub: https://github.com/thingsinjars/cssert/issues

