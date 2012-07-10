/**
 * ticker of li elements.
 *
 * This is the jquery plugin that displays li elements like ticker.
 *
 * for example:
 *  $('ul#listticker').listticker();
 *  or
 *  $('ul#listticker').listticker(
 *    type: 'slideleft',
 *    duration: 1200,
 *    removeduration: 600,
 *    delay: 3000,
 *    easing: 'easeOutQuart'
 *  });
 *
 * If you want to set the easing option name to the option, you require
 * including jQuery Easing plugin (http://gsgd.co.uk/sandbox/jquery/easing/).
 *
 * You may use this under the terms of either MIT License or
 * GNU General Public License (GPL) Version 2. (same as jQuery).
 *
 * Copyright (c) MIYAGINO.net. All Rights Reserved.
 */
(function($) {
	$.fn.listticker = function(opts) {
		var default_opts = {
			type: 'fade',
			duration: 1200,
			removeduration: null,
			delay: 3000,
			easing: null
		};

		opts = $.extend(default_opts, opts || {});

		if (opts.removeduration == null) {
			opts.removeduration = opts.duration / 2;
		}

		if (opts.easing == null) {
			/* default is easeOutQuart by jQuery Easing plugin. */
			opts.easing = function (x, t, b, c, d) {
				return -c * ((t=t/d-1)*t*t*t - 1) + b;
			};
		}

		var tLists = this.children('li');
		var tWidth = this.width();
		var tHeight = this.height();
		var tTop = this.offset().top +
			Number(this.css('paddingTop').replace(/[^\d]*$/, ''));
		var tLeft = this.offset().left +
			Number(this.css('paddingLeft').replace(/[^\d]*$/, ''));

		var tIndex = 0;
		var tTimeout = null;
		var tListMaxWidth = 0;
		var tListMaxHeight = 0;

		tLists.each(function(i) {
			// because of getting the real width of the li element
			var lid = $(this).css('display');
			var ow = $(this).css({display: 'inline'}).outerWidth();
			var oh = $(this).css({display: lid}).outerHeight();

			tListMaxWidth = ow > tListMaxWidth ? ow : tListMaxWidth;
			tListMaxHeight = oh > tListMaxHeight ?
				oh : tListMaxHeight;
		});

		var tParamSlide = new Array();
		tParamSlide['slideleft'] = {
			top: tTop,
			left: tWidth - tListMaxWidth
		};
		tParamSlide['slideup'] = {
			top: tTop + tHeight - tListMaxHeight,
			left: tLeft
		};

		var tParamSlideTo = new Array();
		tParamSlideTo['slideleft'] = {left: tLeft};
		tParamSlideTo['slideup'] = {top: tTop};

		var start_fade = function(i) {
			tIndex = i >= tLists.length ? 0 : i;

			// the other is faded out.
			tLists.not(':eq(' + tIndex + ')')
				.fadeTo(opts.removeduration, 0);
			// the target is faded in.
			tLists.eq(tIndex).delay(opts.removeduration)
				.fadeTo(opts.duration, 1, opts.easing);

			tTimeout = setTimeout(function() {
				start_fade(tIndex + 1);
			}, opts.delay);
		};

		var start_slide = function(i) {
			tIndex = i >= tLists.length ? 0 : i;

			// the other is reset css.
			tLists.not(':eq(' + tIndex + ')').animate({opacity: 0},
				opts.removeduration,
				function() {
					$(this).css(tParamSlide[opts.type]);
				});
			// the target is slided in.
			tLists.eq(tIndex).css({opacity: 1})
				.animate(tParamSlideTo[opts.type],
					opts.duration, opts.easing);

			tTimeout = setTimeout(function() {
				start_slide(tIndex + 1);
			}, opts.delay);
		};

		var init_ticker = function() {
			switch (opts.type) {
			case 'slideleft':
			case 'slideup':
				tLists.css($.extend({}, tParamSlide[opts.type],
					{opacity: 0, position: 'absolute'}));
				break;
			case 'fade':
			default:
				tLists.css({
					top: tTop,
					left: tLeft,
					position: 'absolute'
				}).hide();
				break;
			}
		};

		var start_ticker = function(i) {
			switch (opts.type) {
			case 'slideleft':
			case 'slideup':
				start_slide(i);
				break;
			case 'fade':
			default:
				start_fade(i);
				break;
			}
		};

		var stop_ticker = function() {
			if (tTimeout) {
				clearTimeout(tTimeout);
			}
		};

		return this.each(function(i) {
			init_ticker();
			start_ticker(tIndex);

			$(this).hover(
				function(e) { stop_ticker(); },
				function(e) { start_ticker(tIndex); }
			);
		}); 
	}
})(jQuery);
