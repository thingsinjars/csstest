/*globals phantom, require, CSSERT */
(function() {
  /* cssert - headless.js
   * version 0.1
   *
   * (C) Simon Madine (@thingsinjars) - Mit Style License
   * CSS verification test framework
   * @see http://thingsinjars.github.com/cssert
   *
   * PhantomJS headless control script
   *
   * This loads the same test file as in the browser
   * but instead of running the tests in iframes,
   * they are run in separate browser pages
   */

  var fs = require('fs'),
    log, init, main, runTest, bufferAssets, runAllTests, log_LEVEL = 1,

    // This is the page object we use to parse the tests
    // and generate individual runners
    page = require('webpage').create(),

    // To make the test creation/running synchronous
    outstandingTests = 0,

    // Pass logs through to terminal
    consoleMessage = function(msg) {
      console.log(msg);
    },

    // All the tests we find in the passed in test runner.
    tests = [];

  init = function() {
    log('Starting Headless', 2);
    page.settings.userAgent = 'CSSERT';

    // Pipe console logs from host page to command-line
    page.onConsoleMessage = consoleMessage;

    // Make sure we are called with at least one test runner
    if (phantom.args.length === 0) {
      log('Usage: cssert testcase.html');
      phantom.exit();
    }

    // Create the test files and begin running the tests
    page.open(phantom.args[0], main);
  };

  main = function(status) {
    log('Page Open', 2); // make sure we only create the test files once.
    if (status === "success") {

      // Inject jQuery and cssert into the test page so we can test the styles
      page.injectJs("../lib/jquery-1.6.4.min.js");
      page.injectJs("../lib/cssert.js");

      // Tell the test page to run the tests when it is loaded
      tests = page.evaluate(function() {
        return CSSERT.parseTests();
      });

      outstandingTests = tests.length - 1;

      // This writes out files containing each individual test in the runner
      // These will be read individually rather than injecting the content 
      // directly into the page object.
      for (var a = 0; a < tests.length; a++) {
        // testObject = tests[a];
        log('{3}Creating runner:{7} ' + tests[a].title, 3);
        fs.write('test-' + tests[a].title + '.html', tests[a].unit, 'w');
        bufferAssets('test-' + tests[a].title + '.html', tests[a].selector, JSON.parse(tests[a].styles), tests[a].title);
      }
    } else {
      log('Failed to create runner files', 1);
      log('{1}CSSERT : Failed to create runner files');
    }

    log('Running ' + tests.length + ' test' + (tests.length === 1 ? '' : 's'), 2);

    // for (var a = 0; a < tests.length; a++) {
    //   runTest('test-' + tests[a].title + '.html', tests[a].selector, JSON.parse(tests[a].styles), tests[a].title);
    // }
  };

  // This is here to download remote assets first 
  // so that the test can run with cached assets.
  bufferAssets = function(filename) {
    var page = require('webpage').create();
    page.onLoadFinished = function(status) {
      //This is to get round the asynchronous open calls
      if (outstandingTests-- <= 0) {
        runAllTests();
      }
      page.release();
    };

    page.open(filename);
  };

  // This takes the filename and the objects needed
  // for the test
  runTest = function(filename, testSubject, stylesToAssert, testTitle) {
    log('runTest :: ' + testTitle, 3);
    var testPage = require('webpage').create();

    // Arbitrary. Can be changed but suits most purposes.
    testPage.viewportSize = {
      width: 1600,
      height: 1600
    };

    testPage.onConsoleMessage = consoleMessage;

    testPage.onLoadStarted = function() {};

    testPage.onLoadFinished = function(status) {
      if (status === "success") {

        testPage.render('screenshots/test' + testTitle + '.png');

        //Inject our libraries into the page
        testPage.injectJs("../lib/jquery-1.6.4.min.js");
        testPage.injectJs("../lib/cssert.js");

        // Create a temporary JS file to inject variables into the page context
        var testData = "stylesToAssert = JSON.parse('" + JSON.stringify(stylesToAssert).replace(/'/g, "\\'") + "');" + "testSubject = $('" + testSubject + "');" + "testTitle = '" + testTitle + "'";
        var dataPath = fs.workingDirectory + fs.separator + 'data.js';
        var dataFile = fs.open(fs.workingDirectory + fs.separator + 'data.js', 'w');
        dataFile.write(testData);
        dataFile.close();
        testPage.injectJs(dataPath);

        //Run the actual test case
        testPage.evaluate(function() {
          console.log("--");
          if (CSSERT.assertStyles(testSubject, stylesToAssert)) {
            console.log('\033[0;32m' + testTitle + ' : Passed\033[0;37m');
          } else {
            console.log('\033[0;31m' + testTitle + ' : Failed\033[0;37m');
          }
        });

        //Remove test data
        fs.remove(dataPath);


      } else {
        log('Failed to open test page');
      }

      // Tidy up after ourselves
      fs.remove(filename);

      //This prevents PhantomJS quitting before we've run each individual test case.
      if (outstandingTests-- <= 0) {
        phantom.exit();
      }

      testPage.release();
    };

    testPage.open(filename);
  };

  // Once we've created all the files, open them again and do the actual testing
  runAllTests = function() {
    outstandingTests = tests.length - 1;
    for (var a = 0; a < tests.length; a++) {
      runTest('test-' + tests[a].title + '.html', tests[a].selector, JSON.parse(tests[a].styles), tests[a].title);
    }
  };

  log = function(message, level) {
    var colors = ['\033[0;34m', '\033[0;31m', '\033[0;32m', '\033[0;33m', '\033[0;37m'],
      component = 'HEADLESS :: \033[0;37m';
    level = level || 0;
    message = message.replace(/\{(\d)\}/g, '\033[0;3$1m');
    if (log_LEVEL >= level) {
      console.log(colors[level] + component + message);
    }

  };

  init();

})();