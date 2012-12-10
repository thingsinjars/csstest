var csstest = {};
csstest.timer = {};
csstest.remargin = function() {
	$('.slide.visible figure, .slide.visible > div').each(function() {
		$(this).css('margin-top', ($(this).parent().height() / 2) - $(this).height() / 2);
	});
};

csstest.showSlide = function(index) {

    // The slide we want to show
	index = parseInt(index, 10);

    // Special case for first slide. Bit messy.
	if(index !== 0) {
		$('header').hide();
		$('section').css('top', 10);
	} else {
		$('header').show();
		$('section').css('top', 200);
	}

	// Show slide
	$('.slide').removeClass('visible');
	$('.slide').eq(index).addClass('visible');

	// Highlight navigation
	$('ol li').eq(index).addClass('active').siblings().removeClass('active');

	// Update location (for back/forward button and refreshing)
	window.location.hash = "slide-" + index;

	//Update current Slide Index
	csstest.currentIndex = $('.slide.visible').index() - 1;

	// Make sure everything's positioned correctly
	$(window).resize();
	setTimeout(function() {
		$(window).resize();
	}, 200);
};

csstest.setHash = function(index) {
    if(window.location.hash.replace('#slide-', '')===index) {
        csstest.showSlide(index);
    } else {
        window.location.hash = "slide-" + index;
    }
};

// Add a timer to the page which is only visible to the presenter and start counting
csstest.time = function() {
	if(!csstest.time.start) {
		$('body').append('<div class="time"></div>');
		csstest.time.start = new Date();
	}
	csstest.time.timer = setInterval(function() {
		csstest.updateTime();
	}, 200);
};

// Figure out a nice, readable time from the current timer
csstest.updateTime = function() {
	var timeElapsed = new Date() - csstest.time.start;
	sec_numb = parseInt(timeElapsed / 1000, 10);
	var hours = Math.floor(sec_numb / 3600);
	var minutes = Math.floor((sec_numb - (hours * 3600)) / 60);
	var seconds = sec_numb - (hours * 3600) - (minutes * 60);

	if(hours < 10) {
		hours = "0" + hours;
	}
	if(minutes < 10) {
		minutes = "0" + minutes;
	}
	if(seconds < 10) {
		seconds = "0" + seconds;
	}
	var time = hours + ':' + minutes + ':' + seconds;
	$('.time').html(time);
};


$(function() {
	var $ol, i, l;
	csstest.currentIndex = $('.visible').index() - 1;
	$ol = $('nav ol');
	$ol.empty().html();
	for(i = 0, l = $('.slide').length; i < l; i++) {
		$ol.append('<li>' + i + '</li>');
	}
	$('nav ol li:first').addClass('active');

	$('nav ol li').eq($('.slide.resources').index() - 1).addClass('resources').text('resources');

	if(window.location.hash) {
        csstest.setHash(window.location.hash.replace('#slide-', ''));
		// csstest.showSlide(window.location.hash.replace('#slide-', ''));
	}

	$(window).resize();

	csstest.time();
});

$(window).on('hashchange', function() {
	csstest.showSlide(window.location.hash.replace('#slide-', ''));
});

$(document).on('click', 'li', function() {
    csstest.setHash($(this).index());
});


$(window).on('resize', csstest.remargin);

$(document).on('keydown', function(e) {
	var target = opener ? opener : window;


	// Next slide
	// Right arrow or space bar
	if(e.which === 39 || e.which === 32) {
		e.preventDefault();
		if(csstest.currentIndex < $('.slide').length - 1) {
            csstest.setHash(csstest.currentIndex + 1);
			// target.csstest.showSlide(csstest.currentIndex + 1);
		}

	// Previous Slide
	// Left arrow
	} else if(e.which === 37) {
		e.preventDefault();
		if(csstest.currentIndex > 0) {
            csstest.setHash(csstest.currentIndex - 1);
			// target.csstest.showSlide(csstest.currentIndex - 1);
		}
	}

	// csstest.currentIndex = $('.slide.visible').index() - 1;
	$(window).resize();
});