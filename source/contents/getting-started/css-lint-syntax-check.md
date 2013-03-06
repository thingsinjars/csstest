---
template: layout.jade
section: gettign-started
---

CSS Lint for syntax checks
---

The easiest way to get started with automated testing is to have your stylesheets [syntax checked](/techniques-syntax-checks.html) before committing.

To do this, we'll use [CSS lint](/tools/css-lint.html).

### What does it do?

First, try out CSS Lint online at [csslint.net](http://csslint.net/#warnings=box-model,display-property-grouping,duplicate-properties,empty-rules,known-propertiess). Here, we've disabled most of the extended style checks so that it simply returns warnings and errors based on syntax. We can figure out the rest later.

Just in case you don't have any CSS of your own lying around (unlikely but possible), you can copy-paste this into the big white box to check it out:

<pre><code>nav {
  position: absolute;
  top: 0;
  left: 50%;
  paddling: 250px;
}
nav ul {
  background: #red; 
}</code></pre>

You should see that we have one syntax error and two warnings (potential errors). Good. 

We won't fix that error just now, it'll be handy to test that we've got our stuff working.

### Download and install

Rather than repeat the instructions for downloading CSS Lint, it's best to follow the official guide:

  * [Installing CSS Lint on the command-line](https://github.com/stubbornella/csslint/wiki/Command-line-interface)
  
### Running from the command line

If you've followed the installation instructions, you should now be able to run csslint from the command line.

Open a terminal or command window and try it

    csslint
    
You should see the following
    
    Usage: csslint-rhino.js [options]* [file|dir]*

	Global Options
	  --help                                Displays this information.
	  --format=<format>                     Indicate which format to use for output.
	  --list-rules                          Outputs all of the rules available.
	  --quiet                               Only output when errors are present.
	  --errors=<rule[,rule]+>               Indicate which rules to include as errors.
	  --warnings=<rule[,rule]+>             Indicate which rules to include as warnings.
	  --ignore=<rule[,rule]+>               Indicate which rules to ignore completely.
	  --exclude-list=<file|dir[,file|dir]+> Indicate which files/directories to exclude from being linted.
	  --version                             Outputs the current version number.
	  

Now, we need to run it against our test file.

Create a file with our sample CSS above and open a terminal in the same directory.

    csslint test.css
    
The output should now be the same as we saw on the website:

	csslint: There are 3 problems in test.css.

	test.css
	1: warning at line 5, col 3
	Unknown property 'paddling'.
	  paddling: 250px;
	
	test.css
	2: warning at line 7, col 1
	Rule is empty.
	nav ul {
	
	test.css
	3: error at line 8, col 15
	Expected a hex color but found '#red' at line 8, col 15.
	  background: #red;

Cool. We've just got one more step to go: [automating](/getting-started/automate-anything.html).