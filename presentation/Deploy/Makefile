# Simple deployment script to demonstrate different 
# CSS testing tools by simulating a full pipeline of 
# local tests -> integrate external changes -> regression tests -> push to production

# Set up some handy paths
TOP := $(dir $(lastword $(MAKEFILE_LIST)))
app_dir = $(TOP)app
src_dir = $(TOP)../Examples/source
csslint_dir = $(TOP)../Examples/csslint/node_modules/csslint
ghost_dir = $(TOP)../Examples/GhostStory
cssert_dir = $(TOP)../Examples/cssert/command-line

# CSSLint test step
csslint:
	node $(csslint_dir)/cli.js $(src_dir)/test.css

# Cucumber/Project styleguide checking
ghoststory:
	cp $(src_dir)/test.css $(ghost_dir)/tests/fixtures/test.css
	cp $(src_dir)/index.html $(ghost_dir)/tests/fixtures/index.html
	cd $(ghost_dir); make orangered

# Frozen DOM regression test
cssert: publish integrate
	cd $(cssert_dir); ./cssert little-em.html

# Frozen DOM regression test - Manual Runner
cssert-show: publish integrate
	open $(cssert_dir)/../test-runners/little-em.html

# Simulate pulling in another developer's changes
integrate:
	cat $(src_dir)/thistle.css >> $(app_dir)/test.css 

# Simulate copying the files to the shared development server
publish:
	rm -rf $(app_dir)
	mkdir -p $(app_dir)
	cp $(src_dir)/test.css $(app_dir)/test.css
	cp $(src_dir)/index.html $(app_dir)/index.html

# Show the current state of the page
view:
	open $(app_dir)/index.html

# Steps to run before merging with other developers
local-tests: csslint ghoststory publish

# Steps to run against the development server
regression-tests:
	cp $(app_dir)/test.css $(ghost_dir)/tests/fixtures/test.css
	cp $(app_dir)/index.html $(ghost_dir)/tests/fixtures/index.html
	cd $(ghost_dir); make orangered

# First Demo steps
test: local-tests view

# Second Demo steps
deploy: local-tests integrate view

# Complete simulated automatic deployment
full: local-tests integrate regression-tests view

# Put the files back the way they were before demonstrating
reset:
	cp $(src_dir)/../original/test.css $(src_dir)/test.css
	cp $(src_dir)/../original/thistle.css $(src_dir)/thistle.css
