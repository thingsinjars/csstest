// Based on RegExp from:
// https://github.com/cucumber/gherkin-syntax-highlighters/blob/gh-pages/highlight.js/gherkin_en.js
// mapped to both cucumber and gherkin
// to save confusion

Prism.languages.cucumber = Prism.languages.gherkin = {
  'keyword':/^\s*(But |And |Then |When |Given |Scenarios|Examples|Scenario Template|Scenario Outline|Scenario|Background|Feature)/gm,
  'string': /("|')(\\?.)*?\1/g,
  'comment': /#[\w\W]*?\n/g,
  'annotation': /@[^@\r\n\t ]+/g,
  'punctuation': /[":]/g
};

