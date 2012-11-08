/*globals $,console  */
  // cssert - cssert.js
  // version 0.1
  //
  // (C) Simon Madine (@thingsinjars) - Mit Style License
  //
  // [http://thingsinjars.mit-license.org/](http://thingsinjars.mit-license.org/)
  //
  // CSS regression test framework
  // ===
  //
  // http://csste.st
  //
  // Main testing script
  //
  // ---
  //
  // This loads and parses test files, creates test cases
  // and runs the assertions
  //

// Global to hold all our stuff
var CSSERT;
(function() {
  "use strict";
  var tests = [],
    init, assertStyles, actuallyEqual, parseTests, bufferAssets, unfilledBuffers, runAllTests, runTest, log, log_LEVEL = 1;

  // Load required libs, parse test file, prepare tests and run tests
  init = function() {
    var jQscript, iFrameScript;
    log('init', 2);

    // Add jQuery to simplify test parsing
    jQscript = document.createElement('script');
    jQscript.src = '../lib/jquery-1.6.4.min.js';
    document.body.appendChild(jQscript);

    jQscript.onload = function() {
      // Add a handy helper to allow injecting source into an iframe
      iFrameScript = document.createElement('script');
      iFrameScript.src = '../lib/jquery.iframe.inject.js';
      document.body.appendChild(iFrameScript);
      iFrameScript.onload = function() {

        // Kick things off by parsing the test cases
        var a, tests = parseTests();
        unfilledBuffers = tests.length;

        //Run the tests
        for (a = 0; a < tests.length; a++) {
          bufferAssets(tests[a]);
        }
        $('body').remove('iframe');
      };
    };
  };

  // The main assertion
  // This checks that the values rendered are equal to those we expected
  assertStyles = function(testElement, stylesToAssert) {
    var outcome = true,
      rule, styleMatches;

    log('assertStyles', 2);

    for (rule in stylesToAssert) {
      if (stylesToAssert.hasOwnProperty(rule)) {
        log('Asserting \'{3}' + rule + ' : ' + stylesToAssert[rule] + '{7}\' === \'{3}' + rule + ' : ' + testElement.css(rule) + '{7}\'', 3);
        styleMatches = (testElement.css(rule) === stylesToAssert[rule]);
        if (!styleMatches) {
          if (!actuallyEqual(testElement.css(rule), stylesToAssert[rule])) {
            outcome = false;
            log('Expected ' + rule + ' : ' + stylesToAssert[rule] + '; Found ' + rule + ' : ' + testElement.css(rule));
          }
        }
      }
    }

    return outcome;
  };

  // This is to cater for differences in specific rules which are
  // actually equivalent.
  // For example, it removes vendor prefixes and equates alpha = 0 to transparent
  actuallyEqual = function(measuredValue, expectedValue) {

    log('actuallyEqual', 2);

    if (measuredValue.replace(/-(webkit|moz|o|ms)-/g, '') === expectedValue.replace(/-(webkit|moz|o|ms)-/g, '')) {
      return true;
    } else if ((measuredValue.indexOf('rgba') === 0 || measuredValue.indexOf('hsla') === 0) && (measuredValue.indexOf(', 0)') > 0) && expectedValue === 'transparent') {
      return true;
    } else if ((expectedValue.indexOf('rgba') === 0 || expectedValue.indexOf('hsla') === 0) && (expectedValue.indexOf(', 0)') > 0) && measuredValue === 'transparent') {
      return true;
    } else {
      return false;
    }
  };

  // Test blocks are kept in the test file, separated by '=='
  // The individual elements are separated by '--'
  // This just figures out what's what and puts in in an array of test objects
  parseTests = function() {
    log('parseTests', 2);
    var tests = [];
    $('script[type="text/html"]').each(function() {
      var originalText, testBlocks, testObject, testParts, i;

      // The original contents of the test template block
      originalText = $(this).html().replace('/*', '').replace('*/', '');

      // Find each individual test in the block
      testBlocks = originalText.split("==\n");


      for (i = 0; i < testBlocks.length; i++) {
        testBlocks[i] = $.trim(testBlocks[i]);
        if (testBlocks[i] !== '') {

          // Create the actual testable unit
          testObject = {};

          // Separate the test unit into individual elements
          testParts = testBlocks[i].split("-\n");

          // Title
          testObject.title = $.trim(testParts[0]);

          // Chunk of DOM
          testObject.unit = $.trim(testParts[1]);

          // Very specific selector to target a single element
          testObject.selector = $.trim(testParts[2]);

          // The styles we expect the element to have
          testObject.styles = $.trim(testParts[3]);

          // Add it to the tests list
          tests[tests.length] = testObject;
        }
      }
    });
    log("Tests Found: " + tests.length, 3);
    return tests;
  };

  // To make sure that the style tests aren't affected by network speeds,
  // cache all assets first
  bufferAssets = function(testObject) {
    var $testframe = $('<iframe>');
    $('body').append($testframe);
    $testframe.load(function() {
      unfilledBuffers--;
      if (unfilledBuffers === 0) {
        runAllTests();
      }
    });
    if ($testframe.inject) {
      $testframe.inject(testObject.unit);
    }
  };

  // The output is generated for HTML and also pushed into the console.
  // The console output is used when running headless.
  runTest = function(testObject) {
    log('runTest', 2);
    var $resultHeader = $('<h1>Test result: </h1>');
    var $testIframe = $('<iframe/>');

    $('body').append($resultHeader);
    $('body').append($testIframe);

    $testIframe.load(function() {

      var testSubject = $(testObject.selector, this.contentWindow.document);
      var stylesToAssert = JSON.parse(testObject.styles);

      console.log("--\n" + 'Testing:', testObject.title);
      if (assertStyles(testSubject, stylesToAssert)) {
        $resultHeader.html(testObject.title + ' : Passed').addClass('pass');
        console.log(testObject.title + " passed");
      } else {
        $resultHeader.html(testObject.title + ' : Failed').addClass('fail');
        console.log(testObject.title + " failed");
      }
    });

    // Inject the test object into the frame to keep it
    // separate from the other tests
    if ($testIframe.inject) {
      $testIframe.inject(testObject.unit);
    }
  };

  // Run through all parsed tests
  runAllTests = function() {
    var a, tests = parseTests();
    for (a = 0; a < tests.length; a++) {
      runTest(tests[a]);
    }
  };

  log = function(message, level) {
    var colors = ["\\033[0;34m", "\\033[0;31m", "\\033[0;32m", "\\033[0;33m", "\\033[0;37m"],
      component = "CSSERT :: \\033[0;37m";
    level = level || 0;
    message = colors[level] + component + message;

    if (navigator.userAgent !== 'CSSERT') {
      message = message.replace(/\{(\d)\}/g, "").replace(/\\033\[0;3\dm/g, "");
    } else {
      message = message.replace(/\{(\d)\}/g, "\\033[0;3$1m");
    }
    if (log_LEVEL >= level) {
      console.log(message);
    }
  };

  // We're not running in headless mode, this is a browser
  if (navigator.userAgent !== 'CSSERT') {
    init();
  }

  CSSERT = {
    init: init,
    parseTests: parseTests,
    runTest: runTest,
    assertStyles: assertStyles
  };

})();