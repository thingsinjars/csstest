/*globals $, jQuery, btoa, prompt,console */
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
  // When launched, this attaches a click handler to the entire page
  // which will create the skeleton DOM structure required by the test

// Test generation bookmarklet
(function() {
    //of course...
    "use strict";
    var generateUnit, elementToString, linkStylesheetToString, createTestUnit, generateStyleDeclaration, wrapInPage, outputTest, htmlEntities, makeInputs, jQs = document.createElement('script'),
        styles, cssertStyles,
        TEST_SEPARATOR = "==\n",
        UNIT_SEPARATOR = "\n-\n";


    //Given a node, this returns a simplified jQuery structure representing it
    generateUnit = function generateUnit(object) {
        var returnable = $('<' + object.tagName + '>').addClass(object.className);
        if (object.id && object.id !== '') {
            returnable.attr('id', object.id);
        }
        if (object.href && object.href !== '') {
            returnable.attr('href', object.href);
        }
        return returnable;
    };

    //Returns the string representation of the element
    elementToString = function elementToString($el) {
        if($el.hasClass('cssert-modal')) {
            return;
        }
        var elementAsString = $('<div>').append($el.clone()).remove().html().replace("\n", '');
        console.log(elementAsString);
        return elementAsString;
    };

    //Turns all the stylesheet links and style blocks into strings
    linkStylesheetToString = function linkStylesheetToString() {
        var $els = $('link[rel="stylesheet"], style').not('.cssert-modal'), stringifiedStyle = "";
        $.each($els, function(i, val) {stringifiedStyle+=elementToString($(val));});
        stringifiedStyle = stringifiedStyle.replace(/\/\*.*\*\//mg, '');
        console.log(stringifiedStyle);
        return stringifiedStyle;
    };

    //Gathers all the different bits of the test together
    // - title, selector, DOM, styles
    createTestUnit = function createTestUnit(target, chosenStyles) {
        var returnable = {},
            unit = generateUnit($(target).get()[0]),
            selector = target.tagName,
            $target = $(target),
            chain = $target.parents();

        unit.html($target.remove('.cssert-modal').html());

        chain.each(function() {
            var extendUnit = generateUnit(this);
            unit = extendUnit.append(unit);
            selector = this.tagName + ' ' + selector;
        });
        unit.prepend($('<head>').html(linkStylesheetToString()));
        unit.find('head').prepend('<base href="' + window.location.href + '"/>').prepend('<meta charset="utf-8">');
        unit.remove('.cssert-modal');
        returnable.unit = '<!doctype html>' + elementToString(unit);
        returnable.selector = selector.toLowerCase();
        returnable.styles = generateStyleDeclaration(selector, $target.css(), chosenStyles);
        return returnable;
    };

    //This intersects the complete list of measured styles with the chosen ones
    generateStyleDeclaration = function generateStyleDeclaration(selector, cssObject, chosenStyles) {
        var returnable = {},
            i;
        for (i = 0; i < chosenStyles.length; i++) {
            returnable[chosenStyles[i]] = cssObject[chosenStyles[i]];
        }
        return JSON.stringify(returnable);
    };


    //This is the content of 'blank-test-page.html' with the tests put in the middle
    wrapInPage = function wrapInPage(testCode) {
        return '<!doctype html><html><head><title>cssert test page</title><link rel="stylesheet" href="../lib/cssert.css"></head><body><h1><a href="http://thingsinjars.github.com/cssert">cssert</a> Test cases</h1><p>click to expand test</p><script type="text/html">/*' + testCode + '*/</script><script src="../lib/cssert.js"></script></body></html>';
    };

    //Create the actual text of a test unit.
    //Tests are separated by "==\n"
    //sections of tests are separated by "\n-\n"
    outputTest = function outputTest(testObject, asEntities) {
        var outputable = TEST_SEPARATOR;
        outputable += testObject.title;
        outputable += UNIT_SEPARATOR;
        if (asEntities) {
            outputable += htmlEntities(testObject.unit);
        } else {
            outputable += testObject.unit;
        }
        outputable += UNIT_SEPARATOR;
        outputable += testObject.selector;
        outputable += UNIT_SEPARATOR;
        outputable += testObject.styles;
        outputable += "\n" + TEST_SEPARATOR + "\n\n";
        return outputable;
    };

    //From Chris Coyier who got it from James Padolsey
    htmlEntities = function htmlEntities(str) {
        return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/»/g, '&raquo;').replace(/«/g, '&laquo;');
    };

    //Attach jQuery to the page.
    //This doesn't check to see if jQuery is already loaded.
    jQs.src = 'http://code.jquery.com/jquery-1.6.4.min.js';
    document.body.appendChild(jQs);
    jQs.onload = function() {
        var testDisplay = $('<pre id="cssert-pre" class="cssert-modal"></pre>'),
            dragHandle = $('<div id="cssert-drag" class="cssert-modal"><img src="https://github.com/thingsinjars/cssert/raw/master/docs/package.png" id="cssert-download" class="cssert-modal"></div>'),
            styleForm, launcher, showModal, setHeader, styleList, set, addTest;
        testDisplay.data('original', '');

        $('body').append(testDisplay);
        $('body').append(dragHandle);


        //This generates the actual HTML file and allows it to be downloaded.
        //In Chrome, at least.
        // dragFile($('#cssert-download').get(0), 'testcases.html', btoa(wrapInPage(testDisplay.data('original'))));
        document.getElementById('cssert-download').addEventListener("dragstart", function(e) {
            var bb, MIME_TYPE;
            window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
            window.URL = window.URL || window.webkitURL;

            MIME_TYPE = 'text/html';

            bb = new window.BlobBuilder();
            bb.append(wrapInPage(testDisplay.data('original')));

            this.download = 'testcases.html';
            this.href = window.URL.createObjectURL(bb.getBlob(MIME_TYPE));
            this.dataset.downloadurl = MIME_TYPE + ':' + this.download + ':' + this.href;
            e.dataTransfer.setData("DownloadURL", this.dataset.downloadurl);
            // e.dataTransfer.setData("DownloadURL", "text/html:testcases.html:data:image/png;base64," + btoa(wrapInPage(testDisplay.data('original'))));
        });

        $('*').not('.cssert-modal').hover(function(e) {
            var $t = $(e.target);
            $t.data('originalShadow', $t.css('box-shadow'));
            $t.data('originalOutline', $t.css('outline'));
            $t.css({
                'outline': '2px solid white'
            });
            $t.css({
                'box-shadow': '0 0 10px black'
            });
            e.preventDefault();
            e.stopPropagation();
        }, function(e) {
            var $t = $(e.target);
            $t.css({
                'outline': $t.data('originalOutline')
            });
            $t.css({
                'box-shadow': $t.data('originalShadow')
            });
            e.preventDefault();
            e.stopPropagation();
        });

        //Handler for launching the test generation flow
        launcher = function(e) {
            var testTitle = prompt('Name of test?');
            // Create holder for test cases
            e.preventDefault();
            if (testTitle && testTitle !== '') {
                $(document).unbind('click.cssert');
                showModal(testTitle, e);
            }
        };
        $(document).bind('click.cssert', launcher);
        showModal = function(testTitle, originalEvent) {
            $('#cssert-style-modal').fadeIn();
            $('#cssert-style-modal button').unbind('click');
            $('#cssert-style-modal button').click(function(evt) {
                var chosenStyles = $('#cssert-style-modal input:checked').map(function() {
                    return this.value;
                }).get();
                evt.preventDefault();
                addTest(testTitle, originalEvent, chosenStyles);
            });
        };
        addTest = function(testTitle, originalEvent, chosenStyles) {
            var testObject = createTestUnit(originalEvent.target, chosenStyles);
            testObject.title = testTitle;
            testDisplay.html(testDisplay.html() + outputTest(testObject, true));
            testDisplay.data('original', testDisplay.data('original') + outputTest(testObject, false));
            $('#cssert-style-modal').fadeOut(function() {
                $(document).bind('click.cssert', launcher);
            });
        };

        //Reassigning .css to .css2 and adding extra functionality to .css
        //Got this from Keith Bentrup here:
        //http://stackoverflow.com/questions/1004475/
        jQuery.fn.css2 = jQuery.fn.css;
        jQuery.fn.css = function() {
            var attr = ['font-family', 'font-size', 'font-weight', 'font-style', 'color', 'text-transform', 'text-decoration', 'letter-spacing', 'word-spacing', 'line-height', 'text-align', 'vertical-align', 'direction', 'background-color', 'background-image', 'background-repeat', 'background-position', 'background-attachment', 'opacity', 'width', 'height', 'top', 'right', 'bottom', 'left', 'margin-top', 'margin-right', 'margin-bottom', 'margin-left', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left', 'border-top-width', 'border-right-width', 'border-bottom-width', 'border-left-width', 'border-top-color', 'border-right-color', 'border-bottom-color', 'border-left-color', 'border-top-style', 'border-right-style', 'border-bottom-style', 'border-left-style', 'border-top-left-radius', 'border-top-right-radius', 'border-bottom-right-radius', 'border-bottom-left-radius', 'position', 'display', 'visibility', 'z-index', 'overflow-x', 'overflow-y', 'white-space', 'clip', 'float', 'clear', 'cursor', 'list-style-image', 'list-style-position', 'list-style-type', 'marker-offset'],
                len = attr.length,
                obj = {},
                i;
            if (arguments.length) {
                return jQuery.fn.css2.apply(this, arguments);
            }
            for (i = 0; i < len; i++) {
                obj[attr[i]] = jQuery.fn.css2.call(this, attr[i]);
            }
            return obj;
        };

        //Generate Modal form to allow users to create small, specific test cases
        styleForm = $('<form>').attr('id', 'cssert-style-modal').addClass('cssert-modal');
        if (styles) {
            styleList = $('<ul>');
            for (set in styles) {
                if (styles.hasOwnProperty(set)) {
                    setHeader = $('<li><label><input type="checkbox" name="' + set + '" value="' + set + '"> ' + set + '</label></li>');
                    setHeader.append(makeInputs(styles[set]));
                    styleList.append(setHeader);
                }
            }
            styleForm.append(styleList);
            styleForm.append('<button>Create test</button>');
        }

        //Check or uncheck everything in this set
        styleForm.children('ul').children('li').children('label').children('input').change(function() {
            var $parent = $(this).parents('li');
            if ($(this).is(':checked')) {
                $parent.find('ul>li>label>input').attr('checked', 'checked');
            } else {
                $parent.find('ul>li>label>input').removeAttr('checked');
            }
        });
        $('body').append(styleForm);
        $('<style class="cssert-modal">').appendTo('body').text(cssertStyles);
    };

    //A DOM generation function for the modal style selector
    makeInputs = function htmlEntities(styleSet) {
        var inputs = $('<ul>'),
            s;
        for (s in styleSet) {
            if (styleSet.hasOwnProperty(s)) {
                inputs.append("<li><label><input type=\"checkbox\" name=\"" + styleSet[s] + "\" value=\"" + styleSet[s] + "\"> " + styleSet[s] + "</label></li>");
            }
        }
        return inputs;
    };

    //This is a list of the styles used by the modal form grouped by general function
    styles = {
        'Typography': ['font-family', 'font-weight', 'font-style', 'color', 'text-transform', 'text-decoration', 'letter-spacing', 'word-spacing', 'line-height', 'text-align', 'vertical-align', 'direction'],
        'Background': ['background-color', 'background-image', 'background-repeat', 'background-position', 'background-attachment'],
        'Shape': ['width', 'height', 'top', 'right', 'bottom', 'left', 'margin-top', 'margin-right ', 'margin-bottom', 'margin-left', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left', 'clip', 'overflow-x', 'overflow-y'],
        'Border': ['border-top-width', 'border-right-width', 'border-bottom-width', 'border-left-width', 'border-top-color', 'border-right-color', 'border-bottom-color', 'border-left-color', 'border-top-style', 'border-right-style', 'border-bottom-style', 'border-left-style', 'border-top-left-radius', 'border-top-right-radius', 'border-bottom-right-radius', 'border-bottom-left-radius'],
        'Position': ['position', 'z-index', 'float', 'clear'],
        'Appearance': ['opacity', 'display', 'visibility'],
        'Other': ['white-space', 'cursor', 'list-style-image', 'list-style-position', 'list-style-type', 'marker-offset']
    };

    //The CSS used by this bookmarklet
    cssertStyles = ".cssert-modal {display:none;z-index:1000;position:fixed;border-radius:5px;}";
    cssertStyles += "#cssert-style-modal {display:none;position: fixed;top: 10%;left: 50%;margin-left: -350px;width: 700px;background: #39c;color: white;padding: 10px;color: #fff;text-shadow: 0 1px 0 rgba(0,0,0,.3);background-image: -webkit-linear-gradient(-45deg, rgba(255,255,255,0), rgba(255,255,255,.1) 60%, rgba(255,255,255,0) 60%);border-radius: 5px;border: 1px solid #17a;box-shadow: inset 0 0 0 1px rgba(255,255,255,.3);}";
    cssertStyles += "#cssert-style-modal ul,#cssert-style-modal li ,#cssert-style-modal label {margin:0 !important;padding:0 !important;font-size:13px !important;list-style:none !important;text-align:left !important;color:white !important;}";
    cssertStyles += "#cssert-style-modal>ul>li>label {font-family:sans-serif !importan;text-align:left !important;color:white !important;font-size:15px !important;}";
    cssertStyles += "#cssert-style-modal>ul>li {float:left !important;width:140px !important;}";
    cssertStyles += "#cssert-style-modal ul {margin-bottom:10px !important;}";
    cssertStyles += "#cssert-style-modal button {padding:10px !important;bottom:0;right:0;}";
    cssertStyles += "#cssert-pre {box-shadow:0 5px 10px black;display:block;position:fixed !important;top:10px !important;right:10px !important;background:white !important;border:1px solid gray !important;width:200px !important;height:200px !important;overflow:auto !important;}";
    cssertStyles += "#cssert-drag {display:block;position:fixed !important;top:210px !important;right:10px !important;background:white !important;border:1px solid gray !important;width:200px !important;height:20px !important;overflow:auto !important;}";
    cssertStyles += "#cssert-drag img {display:block;}";
}());