		var csstest = {};
		csstest.timer = {};
		csstest.remargin = function() {
			$('.slide.visible figure, .slide.visible > div').each(function() {
				$(this).css('margin-top', ($(this).parent().height() / 2) - $(this).height() / 2);
			});
		};

		csstest.present = function() {
			// Open new window for attendee view
			csstest.projector = open(location, 'projector', "menubar=no,location=no,resizable=no,scrollbars=no,status=no");

			// Get the focus back
			window.focus();

			// Switch this one to presenter view
			$('body').removeClass('projector');
			$(window).resize();

		};
		csstest.showSlide = function(index) {

			// If we have opened a projector in the past
			if(csstest.projector) {
				// If the projector has been closed
				if(!csstest.projector.csstest) {
					// Reopen it
					csstest.present();
					return;
				// If the projector is still open
				} else {
					// Show the current slide on it.
					csstest.projector.csstest.showSlide(index);
				}
			}
			index = parseInt(index, 10);
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
			setTimeout(function(){$(window).resize();}, 200);
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

			$('nav ol li').eq($('.slide.resources').index()-1).addClass('resources').text('resources');

			if(window.location.hash) {
				csstest.showSlide(window.location.hash.replace('#slide-', ''));
			}

			$(window).resize();

			csstest.time();
		});

		$(document).on('click', 'li', function() {
			csstest.currentIndex = $(this).index();
			csstest.showSlide(csstest.currentIndex);
			// csstest.remargin();
		});


		$(window).on('resize', csstest.remargin);
		$(window).on('unload', function() {
			if(csstest.projector) {
				csstest.projector.close();
			}
		});

		$(document).on('keydown', function(e) {
			var target = opener ? opener : window;
			

			// Open projector
			// 't'
			if(e.which === 84 && !opener) {
				e.preventDefault();
				csstest.present();


			// Next slide
			// Right arrow or space bar
			} else if(e.which === 39 || e.which === 32) {
				e.preventDefault();
				if(csstest.currentIndex < $('.slide').length - 1) {
					target.csstest.showSlide(csstest.currentIndex + 1);
				}

			// Previous Slide
			// Left arrow
			} else if(e.which === 37) {
				e.preventDefault();
				if(csstest.currentIndex > 0) {
					target.csstest.showSlide(csstest.currentIndex - 1);
				}
			}
			// csstest.currentIndex = $('.slide.visible').index() - 1;
			$(window).resize();
		});