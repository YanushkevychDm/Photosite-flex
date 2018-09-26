// jQuery 3.3.1 min


// Навигация
/*http://callmenick.com/post/expanding-search-bar-using-css-transitions*/
(function($) {
    "use strict";
  
    var $navbar = $(".nav"),
        y_pos = $navbar.offset().top,
        height = $navbar.height();

    //scroll top 0 sticky
    $(document).scroll(function() {
        var scrollTop = $(this).scrollTop();
        if (scrollTop > 0) {
          $navbar.addClass("sticky");
        } else {
          $navbar.removeClass("sticky");  
        }
    });
    
    //section sticky
    /*$(document).scroll(function() {
        var scrollTop = $(this).scrollTop();
        if ($(window).height() > scrollTop) {
          $navbar.removeClass("sticky");
        } else {
          $navbar.addClass("sticky");  
        }
    });*/

})(jQuery, undefined);

$(".menu").click(function(){
  $("#nav").toggleClass("open");
});

// Кнопка вверх
$(document).ready(function(){
  $('body').append('<a href="#" id="go-top" title="Вверх"><i class="fa fa-arrow-up" aria-hidden="true"></i></a>');
});

$(function() {
 $.fn.scrollToTop = function() {
  $(this).hide().removeAttr("href");
  if ($(window).scrollTop() >= "250") $(this).fadeIn("slow")
  var scrollDiv = $(this);
  $(window).scroll(function() {
   if ($(window).scrollTop() <= "250") $(scrollDiv).fadeOut("slow")
   else $(scrollDiv).fadeIn("slow")
  });
  $(this).click(function() {
   $("html, body").animate({scrollTop: 0}, "slow")
  })
 }
});

$(function() {
 $("#go-top").scrollToTop();
});

// Слайдер
$('.responsive').slick({
  dots: true,
	prevArrow: $('.prev'),
	nextArrow: $('.next'),
  infinite: false,
  speed: 300,
  slidesToShow: 4,
  slidesToScroll: 4,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
});

// Simple-lightbox
/*
	By André Rinas, www.andrerinas.de
	Available for use under the MIT License
	1.14.0
*/
;( function( $, window, document, undefined )
{
	'use strict';

$.fn.simpleLightbox = function( options )
{

	var options = $.extend({
		sourceAttr: 'href',
		overlay: true,
		spinner: true,
		nav: true,
		navText: ['&lsaquo;', '&rsaquo;'],
		captions: true,
		captionDelay: 0,
		captionSelector: 'img',
		captionType: 'attr',
		captionsData: 'title',
		captionPosition: 'bottom',
		captionClass: '',
		close: true,
		closeText: '×',
		swipeClose: true,
		showCounter: true,
		fileExt: 'png|jpg|jpeg|gif',
		animationSlide: true,
		animationSpeed: 250,
		preloading: true,
		enableKeyboard: true,
		loop: true,
		rel: false,
		docClose: true,
		swipeTolerance: 50,
		className: 'simple-lightbox',
		widthRatio: 0.8,
		heightRatio: 0.9,
		scaleImageToRatio: false,
		disableRightClick: false,
		disableScroll: true,
		alertError: true,
		alertErrorMessage: 'Image not found, next image will be loaded',
		additionalHtml: false,
		history: true,
		throttleInterval: 0
	}, options);

	// global variables
	var touchDevice	= ( 'ontouchstart' in window ),
		pointerEnabled = window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
		touched = function( event ){
			if( touchDevice ) return true;
			if( !pointerEnabled || typeof event === 'undefined' || typeof event.pointerType === 'undefined' ) return false;
			if( typeof event.MSPOINTER_TYPE_MOUSE !== 'undefined' ) {
				if( event.MSPOINTER_TYPE_MOUSE != event.pointerType ) return true;
			}
			else {
				if( event.pointerType != 'mouse' ) return true;
			}
			return false;
		},
		swipeDiff = 0,
		swipeYDiff = 0,
		curImg = $(),
		transPrefix = function(){
			var s = document.body || document.documentElement;
			s = s.style;
			if( s.WebkitTransition === '' ) return '-webkit-';
			if( s.MozTransition === '' ) return '-moz-';
			if( s.OTransition === '' ) return '-o-';
			if( s.transition === '' ) return '';
			return false;
		},
		opened = false,
		loaded = [],
		getRelated = function(rel, jqObj) {
			var $related = jqObj.filter(function () {
				return ($(this).attr('rel') === rel);
			});
			return $related;
		},
		objects = (options.rel && options.rel !== false) ? getRelated(options.rel, $(this)) : this,
		transPrefix = transPrefix(),
		globalScrollbarwidth = 0,
		canTransisions = (transPrefix !== false) ? true : false,
		supportsPushState = ('pushState' in history),
		historyhasChanged = false,
		historyUpdateTimeout,
		winLoc = window.location,
		getHash = function(){
			return winLoc.hash.substring(1);
		},
		initialHash = getHash(),
		updateHash = function(){
			var hash = getHash(),
			newHash = 'pid='+(index+1);
			var newURL = winLoc.href.split('#')[0] + '#' +  newHash;

			if(supportsPushState){
				history[historyhasChanged ? 'replaceState' : 'pushState']('', document.title, newURL);
			}else {
				if(historyhasChanged) {
					winLoc.replace( newURL );
				} else {
					winLoc.hash = newHash;
				}
			}
			historyhasChanged = true;
		},
		resetHash = function() {
			if (supportsPushState) {
				history.pushState('', document.title,  winLoc.pathname + winLoc.search );
			} else {
				winLoc.hash = '';
			}
			clearTimeout(historyUpdateTimeout);

		},
		updateURL = function(){
			if(!historyhasChanged) {
				updateHash(); // first time
			} else {
				historyUpdateTimeout = setTimeout(updateHash, 800);
			}
		},
		throttle = function(func, limit) {
			var inThrottle;
			return function() {
				var args = arguments;
				var context = this;
				if (!inThrottle) {
					func.apply(context, args);
					inThrottle = true;
					setTimeout(function() {
						return inThrottle = false;
					}, limit);
				}
			};
		},
		prefix = 'simplelb',
		overlay = $('<div>').addClass('sl-overlay'),
		closeBtn = $('<button>').addClass('sl-close').html(options.closeText),
		spinner = $('<div>').addClass('sl-spinner').html('<div></div>'),
		nav = $('<div>').addClass('sl-navigation').html('<button class="sl-prev">'+options.navText[0]+'</button><button class="sl-next">'+options.navText[1]+'</button>'),
		counter = $('<div>').addClass('sl-counter').html('<span class="sl-current"></span>/<span class="sl-total"></span>'),
		animating = false,
		index = 0,
		caption = $('<div>').addClass('sl-caption '+options.captionClass+' pos-'+options.captionPosition),
		image = $('<div>').addClass('sl-image'),
		wrapper = $('<div>').addClass('sl-wrapper').addClass(options.className),
		isValidLink = function( element ){
			if(!options.fileExt) return true;
			var filEext = /\.([0-9a-z]+)(?=[?#])|(\.)(?:[\w]+)$/gmi;
			var testExt = $( element ).attr( options.sourceAttr ).match(filEext);
			return testExt && $( element ).prop( 'tagName' ).toLowerCase() == 'a' && ( new RegExp( '\.(' + options.fileExt + ')$', 'i' ) ).test( testExt );
		},
		setup = function(){
			if(options.close) closeBtn.appendTo(wrapper);
			if(options.showCounter){
				if(objects.length > 1){
					counter.appendTo(wrapper);
					counter.find('.sl-total').text(objects.length);
				}
			}
			if(options.nav) nav.appendTo(wrapper);
			if(options.spinner) spinner.appendTo(wrapper);
		},
		openImage = function(elem){
			elem.trigger($.Event('show.simplelightbox'));
			if(options.disableScroll) globalScrollbarwidth = handleScrollbar('hide');
			wrapper.appendTo('body');
			image.appendTo(wrapper);
			if(options.overlay) overlay.appendTo($('body'));
			animating = true;
			index = objects.index(elem);
			curImg = $( '<img/>' )
				.hide()
				.attr('src', elem.attr(options.sourceAttr));
			if(loaded.indexOf(elem.attr(options.sourceAttr)) == -1){
				loaded.push(elem.attr(options.sourceAttr));
			}
			image.html('').attr('style','');
			curImg.appendTo(image);
			addEvents();
			overlay.fadeIn('fast');
			$('.sl-close').fadeIn('fast');
			spinner.show();
			nav.fadeIn('fast');
			$('.sl-wrapper .sl-counter .sl-current').text(index +1);
			counter.fadeIn('fast');
			adjustImage();
			if(options.preloading) preload();
			setTimeout( function(){ elem.trigger($.Event('shown.simplelightbox')); } ,options.animationSpeed);
		},
		adjustImage = function(dir){
			if(!curImg.length) return;
			var tmpImage 	 = new Image(),
			windowWidth	 = $( window ).width() * options.widthRatio,
			windowHeight = $( window ).height() * options.heightRatio;
			tmpImage.src	= curImg.attr( 'src' );

			$(tmpImage).on('error',function(ev){
				//no image was found
				objects.eq(index).trigger($.Event('error.simplelightbox'));
				animating = false;
				opened = true;
				spinner.hide();
				if(options.alertError){
					alert(options.alertErrorMessage);
				}
				if(dir == 1 || dir == -1){
					loadImage(dir);
				} else {
					loadImage(1);
				}
				return;
			});


			tmpImage.onload = function() {
				if (typeof dir !== 'undefined') {
					objects.eq(index)
						.trigger($.Event('changed.simplelightbox'))
						.trigger($.Event( (dir===1?'nextDone':'prevDone')+'.simplelightbox'));
				}

				// history
				if(options.history){
					updateURL();
				}

				if(loaded.indexOf(curImg.attr( 'src' )) == -1){
					loaded.push(curImg.attr( 'src' ));
				}
				var imageWidth	 = tmpImage.width,
					imageHeight	 = tmpImage.height;

				if( options.scaleImageToRatio || imageWidth > windowWidth || imageHeight > windowHeight ){
					var ratio	 = imageWidth / imageHeight > windowWidth / windowHeight ? imageWidth / windowWidth : imageHeight / windowHeight;
					imageWidth	/= ratio;
					imageHeight	/= ratio;
				}

				$('.sl-image').css({
					'top':    ( $( window ).height() - imageHeight ) / 2 + 'px',
					'left':   ( $( window ).width() - imageWidth - globalScrollbarwidth)/ 2 + 'px'
				});
				spinner.hide();
				curImg
				.css({
					'width':  imageWidth + 'px',
					'height': imageHeight + 'px'
				})
				.fadeIn('fast');
				opened = true;
				var cSel = (options.captionSelector == 'self') ? objects.eq(index) : objects.eq(index).find(options.captionSelector);
				var captionText;
				if(options.captionType == 'data'){
					captionText = cSel.data(options.captionsData);
				} else if(options.captionType == 'text'){
					captionText = cSel.html();
				} else {
					captionText = cSel.prop(options.captionsData);
				}

				if(!options.loop) {
					if(index === 0){ $('.sl-prev').hide();}
					if(index >= objects.length -1) {$('.sl-next').hide();}
					if(index > 0){ $('.sl-prev').show(); }
					if(index < objects.length -1){ $('.sl-next').show(); }
				}

				if(objects.length == 1) $('.sl-prev, .sl-next').hide();

				if(dir == 1 || dir == -1){
					var css = { 'opacity': 1.0 };
					if( options.animationSlide ) {
						if( canTransisions ) {
							slide(0, 100 * dir + 'px');
							setTimeout( function(){ slide( options.animationSpeed / 1000, 0 + 'px'); }, 50 );
						}
						else {
							css.left = parseInt( $('.sl-image').css( 'left' ) ) + 100 * dir + 'px';
						}
					}

					$('.sl-image').animate( css, options.animationSpeed, function(){
						animating = false;
						setCaption(captionText, imageWidth);
					});
				} else {
					animating = false;
					setCaption(captionText, imageWidth);
				}
				if(options.additionalHtml && $('.sl-additional-html').length === 0){
					$('<div>').html(options.additionalHtml).addClass('sl-additional-html').appendTo($('.sl-image'));
				}
			};
		},
		setCaption = function(captiontext, imageWidth){
			if(captiontext !== '' && typeof captiontext !== "undefined" && options.captions){
				caption.html(captiontext).css({'width':  imageWidth + 'px'}).hide().appendTo($('.sl-image')).delay(options.captionDelay).fadeIn('fast');
			}
		},
		slide = function(speed, pos){
			var styles = {};
				styles[transPrefix + 'transform'] = 'translateX(' + pos + ')';
				styles[transPrefix + 'transition'] = transPrefix + 'transform ' + speed + 's linear';
				$('.sl-image').css(styles);
		},
		addEvents = function(){
			// resize/responsive
			$( window ).on( 'resize.'+prefix, adjustImage );

			// close lightbox on close btn
			$( document ).on('click.'+prefix+ ' touchstart.'+prefix, '.sl-close', function(e){
				e.preventDefault();
				if(opened){ close();}
			});

			if(options.history){
				setTimeout(function() {
					$(window).on('hashchange.'+prefix,function(){
						if(opened){
							if(getHash() === initialHash) {
								close();
								return;
							}
						}
					});
				}, 40);
			}

			// nav-buttons
			nav.on('click.'+prefix, 'button', throttle(function(e){
				e.preventDefault();
				swipeDiff = 0;
				loadImage( $(this).hasClass('sl-next') ? 1 : -1 );
			}, options.throttleInterval));

			// touchcontrols
			var swipeStart	 = 0,
				swipeEnd	 = 0,
				swipeYStart = 0,
				swipeYEnd = 0,
				mousedown = false,
				imageLeft = 0;

			image
			.on( 'touchstart.'+prefix+' mousedown.'+prefix, function(e)
			{
				if(mousedown) return true;
				if( canTransisions ) imageLeft = parseInt( image.css( 'left' ) );
				mousedown = true;
				swipeDiff = 0;
				swipeYDiff = 0;
				swipeStart = e.originalEvent.pageX || e.originalEvent.touches[ 0 ].pageX;
				swipeYStart = e.originalEvent.pageY || e.originalEvent.touches[ 0 ].pageY;
				return false;
			})
			.on( 'touchmove.'+prefix+' mousemove.'+prefix+' pointermove MSPointerMove', function(e)
			{
				if(!mousedown) return true;
				e.preventDefault();
				swipeEnd = e.originalEvent.pageX || e.originalEvent.touches[ 0 ].pageX;
				swipeYEnd = e.originalEvent.pageY || e.originalEvent.touches[ 0 ].pageY;
				swipeDiff = swipeStart - swipeEnd;
				swipeYDiff = swipeYStart - swipeYEnd;
				if( options.animationSlide ) {
				  if( canTransisions ) slide( 0, -swipeDiff + 'px' );
				  else image.css( 'left', imageLeft - swipeDiff + 'px' );
				}
			})
			.on( 'touchend.'+prefix+' mouseup.'+prefix+' touchcancel.'+prefix+' mouseleave.'+prefix+' pointerup pointercancel MSPointerUp MSPointerCancel',function(e)
			{
				if(mousedown){
					mousedown = false;
					var possibleDir = true;
					if(!options.loop) {
						if(index === 0 && swipeDiff < 0){ possibleDir = false; }
						if(index >= objects.length -1 && swipeDiff > 0) { possibleDir = false; }
					}
					if( Math.abs( swipeDiff ) > options.swipeTolerance && possibleDir ) {
						loadImage( swipeDiff > 0 ? 1 : -1 );
					}
					else if( options.animationSlide )
					{
						if( canTransisions ) slide( options.animationSpeed / 1000, 0 + 'px' );
						else image.animate({ 'left': imageLeft + 'px' }, options.animationSpeed / 2 );
					}

					if( options.swipeClose && Math.abs(swipeYDiff) > 50 && Math.abs( swipeDiff ) < options.swipeTolerance) {
						close();
					}
				}
			});
		},
		removeEvents = function(){
			nav.off('click', 'button');
			$( document ).off('click.'+prefix, '.sl-close');
			$( window ).off( 'resize.'+prefix);
			$( window ).off( 'hashchange.'+prefix);
		},
		preload = function(){
			var next = (index+1 < 0) ? objects.length -1: (index+1 >= objects.length -1) ? 0 : index+1,
				prev = (index-1 < 0) ? objects.length -1: (index-1 >= objects.length -1) ? 0 : index-1;
			$( '<img />' ).attr( 'src', objects.eq(next).attr( options.sourceAttr ) ).on('load', function(){
				if(loaded.indexOf($(this).attr('src')) == -1){
					loaded.push($(this).attr('src'));
				}
				objects.eq(index).trigger($.Event('nextImageLoaded.simplelightbox'));
			});
			$( '<img />' ).attr( 'src', objects.eq(prev).attr( options.sourceAttr ) ).on('load', function(){
				if(loaded.indexOf($(this).attr('src')) == -1){
					loaded.push($(this).attr('src'));
				}
				objects.eq(index).trigger($.Event('prevImageLoaded.simplelightbox'));
			});

		},
		loadImage = function(dir){
			objects.eq(index)
			.trigger($.Event('change.simplelightbox'))
			.trigger($.Event( (dir===1?'next':'prev')+'.simplelightbox'));

		var newIndex = index + dir;
			if(animating || (newIndex < 0 || newIndex >= objects.length) && options.loop === false ) return;
			index = (newIndex < 0) ? objects.length -1: (newIndex > objects.length -1) ? 0 : newIndex;
			$('.sl-wrapper .sl-counter .sl-current').text(index +1);
      	var css = { 'opacity': 0 };
			if( options.animationSlide ) {
			  if( canTransisions ) slide(options.animationSpeed / 1000, ( -100 * dir ) - swipeDiff + 'px');
			  else css.left = parseInt( $('.sl-image').css( 'left' ) ) + -100 * dir + 'px';
			}

			$('.sl-image').animate( css, options.animationSpeed, function(){
				setTimeout( function(){
					// fadeout old image
					var elem = objects.eq(index);
					curImg
					.attr('src', elem.attr(options.sourceAttr));
					if(loaded.indexOf(elem.attr(options.sourceAttr)) == -1){
						spinner.show();
					}
					$('.sl-caption').remove();
					adjustImage(dir);
					if(options.preloading) preload();
				}, 100);
			});
		},
		close = function(){
			if(animating) return;
			var elem = objects.eq(index),
			triggered = false;

			elem.trigger($.Event('close.simplelightbox'));
			if(options.history){
				resetHash();
			}
			$('.sl-image img, .sl-overlay, .sl-close, .sl-navigation, .sl-image .sl-caption, .sl-counter').fadeOut('fast', function(){
				if(options.disableScroll) handleScrollbar('show');
				$('.sl-wrapper, .sl-overlay').remove();
				removeEvents();
				if(!triggered) elem.trigger($.Event('closed.simplelightbox'));
				triggered = true;
			});
	    curImg = $();
	    opened = false;
	    animating = false;
		},
		handleScrollbar = function(type){
			var scrollbarWidth = 0;
			if(type == 'hide'){
				var fullWindowWidth = window.innerWidth;
				if (!fullWindowWidth) {
					var documentElementRect = document.documentElement.getBoundingClientRect();
					fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left);
				}
				if(document.body.clientWidth < fullWindowWidth){
					var scrollDiv = document.createElement('div'),
					padding = parseInt($('body').css('padding-right'),10);
					scrollDiv.className = 'sl-scrollbar-measure';
					$('body').append(scrollDiv);
					scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
					$(document.body)[0].removeChild(scrollDiv);
					$('body').data('padding',padding);
					if(scrollbarWidth > 0){
						$('body').addClass('hidden-scroll').css({'padding-right':padding+scrollbarWidth});
					}
				}
			} else {
				$('body').removeClass('hidden-scroll').css({'padding-right':$('body').data('padding')});
			}
			return scrollbarWidth;
		};

	// events
	setup();

	// open lightbox
	objects.on( 'click.'+prefix, function( e ){
		if(isValidLink(this)){
			e.preventDefault();
			if(animating) return false;
			openImage($(this));
		}
	});

	// close on click on doc
	$( document ).on('click.'+prefix+ ' touchstart.'+prefix, function(e){
		if(opened){
			if((options.docClose && $(e.target).closest('.sl-image').length === 0 && $(e.target).closest('.sl-navigation').length === 0)){
				close();
			}
		}
	});

	// disable rightclick
	if(options.disableRightClick){
		$( document ).on('contextmenu', '.sl-image img', function(e){
			return false;
		});
	}


	// keyboard-control
	if( options.enableKeyboard ){
		$( document ).on( 'keyup.'+prefix, throttle(function( e ){
			swipeDiff = 0;
			// keyboard control only if lightbox is open
			if(opened){
				e.preventDefault();
				var key = e.keyCode;
				if( key == 27 ) {
					close();
				}
				if( key == 37 || e.keyCode == 39 ) {
					loadImage( e.keyCode == 39 ? 1 : -1 );
				}
			}
		}, options.throttleInterval));
	}

	// Public methods
	this.open = function(elem){
		elem = elem || $(this[0]);
		openImage(elem);
	};

	this.next = function(){
		loadImage( 1 );
	};

	this.prev = function(){
		loadImage( -1 );
	};

	this.close = function(){
		close();
	};

	this.destroy = function(){
		$( document ).off('click.'+prefix).off('keyup.'+prefix);
		close();
		$('.sl-overlay, .sl-wrapper').remove();
		this.off('click');
	};

	this.refresh = function(){
		this.destroy();
		$(this).simpleLightbox(options);
	};

	return this;

};
})( jQuery, window, document );

// Галерея
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGpRdWVyeSAzLjMuMSBtaW5cclxuXHJcblxyXG4vLyDQndCw0LLQuNCz0LDRhtC40Y9cclxuLypodHRwOi8vY2FsbG1lbmljay5jb20vcG9zdC9leHBhbmRpbmctc2VhcmNoLWJhci11c2luZy1jc3MtdHJhbnNpdGlvbnMqL1xyXG4oZnVuY3Rpb24oJCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgXHJcbiAgICB2YXIgJG5hdmJhciA9ICQoXCIubmF2XCIpLFxyXG4gICAgICAgIHlfcG9zID0gJG5hdmJhci5vZmZzZXQoKS50b3AsXHJcbiAgICAgICAgaGVpZ2h0ID0gJG5hdmJhci5oZWlnaHQoKTtcclxuXHJcbiAgICAvL3Njcm9sbCB0b3AgMCBzdGlja3lcclxuICAgICQoZG9jdW1lbnQpLnNjcm9sbChmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgc2Nyb2xsVG9wID0gJCh0aGlzKS5zY3JvbGxUb3AoKTtcclxuICAgICAgICBpZiAoc2Nyb2xsVG9wID4gMCkge1xyXG4gICAgICAgICAgJG5hdmJhci5hZGRDbGFzcyhcInN0aWNreVwiKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgJG5hdmJhci5yZW1vdmVDbGFzcyhcInN0aWNreVwiKTsgIFxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICAvL3NlY3Rpb24gc3RpY2t5XHJcbiAgICAvKiQoZG9jdW1lbnQpLnNjcm9sbChmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgc2Nyb2xsVG9wID0gJCh0aGlzKS5zY3JvbGxUb3AoKTtcclxuICAgICAgICBpZiAoJCh3aW5kb3cpLmhlaWdodCgpID4gc2Nyb2xsVG9wKSB7XHJcbiAgICAgICAgICAkbmF2YmFyLnJlbW92ZUNsYXNzKFwic3RpY2t5XCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAkbmF2YmFyLmFkZENsYXNzKFwic3RpY2t5XCIpOyAgXHJcbiAgICAgICAgfVxyXG4gICAgfSk7Ki9cclxuXHJcbn0pKGpRdWVyeSwgdW5kZWZpbmVkKTtcclxuXHJcbiQoXCIubWVudVwiKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICQoXCIjbmF2XCIpLnRvZ2dsZUNsYXNzKFwib3BlblwiKTtcclxufSk7XHJcblxyXG4vLyDQmtC90L7Qv9C60LAg0LLQstC10YDRhVxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xyXG4gICQoJ2JvZHknKS5hcHBlbmQoJzxhIGhyZWY9XCIjXCIgaWQ9XCJnby10b3BcIiB0aXRsZT1cItCS0LLQtdGA0YVcIj48aSBjbGFzcz1cImZhIGZhLWFycm93LXVwXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPjwvYT4nKTtcclxufSk7XHJcblxyXG4kKGZ1bmN0aW9uKCkge1xyXG4gJC5mbi5zY3JvbGxUb1RvcCA9IGZ1bmN0aW9uKCkge1xyXG4gICQodGhpcykuaGlkZSgpLnJlbW92ZUF0dHIoXCJocmVmXCIpO1xyXG4gIGlmICgkKHdpbmRvdykuc2Nyb2xsVG9wKCkgPj0gXCIyNTBcIikgJCh0aGlzKS5mYWRlSW4oXCJzbG93XCIpXHJcbiAgdmFyIHNjcm9sbERpdiA9ICQodGhpcyk7XHJcbiAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpIHtcclxuICAgaWYgKCQod2luZG93KS5zY3JvbGxUb3AoKSA8PSBcIjI1MFwiKSAkKHNjcm9sbERpdikuZmFkZU91dChcInNsb3dcIilcclxuICAgZWxzZSAkKHNjcm9sbERpdikuZmFkZUluKFwic2xvd1wiKVxyXG4gIH0pO1xyXG4gICQodGhpcykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICQoXCJodG1sLCBib2R5XCIpLmFuaW1hdGUoe3Njcm9sbFRvcDogMH0sIFwic2xvd1wiKVxyXG4gIH0pXHJcbiB9XHJcbn0pO1xyXG5cclxuJChmdW5jdGlvbigpIHtcclxuICQoXCIjZ28tdG9wXCIpLnNjcm9sbFRvVG9wKCk7XHJcbn0pO1xyXG5cclxuLy8g0KHQu9Cw0LnQtNC10YBcclxuJCgnLnJlc3BvbnNpdmUnKS5zbGljayh7XHJcbiAgZG90czogdHJ1ZSxcclxuXHRwcmV2QXJyb3c6ICQoJy5wcmV2JyksXHJcblx0bmV4dEFycm93OiAkKCcubmV4dCcpLFxyXG4gIGluZmluaXRlOiBmYWxzZSxcclxuICBzcGVlZDogMzAwLFxyXG4gIHNsaWRlc1RvU2hvdzogNCxcclxuICBzbGlkZXNUb1Njcm9sbDogNCxcclxuICByZXNwb25zaXZlOiBbXHJcbiAgICB7XHJcbiAgICAgIGJyZWFrcG9pbnQ6IDEwMjQsXHJcbiAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgc2xpZGVzVG9TaG93OiAzLFxyXG4gICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAzLFxyXG4gICAgICAgIGluZmluaXRlOiB0cnVlLFxyXG4gICAgICAgIGRvdHM6IHRydWVcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgYnJlYWtwb2ludDogNjAwLFxyXG4gICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgIHNsaWRlc1RvU2hvdzogMixcclxuICAgICAgICBzbGlkZXNUb1Njcm9sbDogMlxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBicmVha3BvaW50OiA0ODAsXHJcbiAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxyXG4gICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIFlvdSBjYW4gdW5zbGljayBhdCBhIGdpdmVuIGJyZWFrcG9pbnQgbm93IGJ5IGFkZGluZzpcclxuICAgIC8vIHNldHRpbmdzOiBcInVuc2xpY2tcIlxyXG4gICAgLy8gaW5zdGVhZCBvZiBhIHNldHRpbmdzIG9iamVjdFxyXG4gIF1cclxufSk7XHJcblxyXG4vLyBTaW1wbGUtbGlnaHRib3hcclxuLypcclxuXHRCeSBBbmRyw6kgUmluYXMsIHd3dy5hbmRyZXJpbmFzLmRlXHJcblx0QXZhaWxhYmxlIGZvciB1c2UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlXHJcblx0MS4xNC4wXHJcbiovXHJcbjsoIGZ1bmN0aW9uKCAkLCB3aW5kb3csIGRvY3VtZW50LCB1bmRlZmluZWQgKVxyXG57XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuJC5mbi5zaW1wbGVMaWdodGJveCA9IGZ1bmN0aW9uKCBvcHRpb25zIClcclxue1xyXG5cclxuXHR2YXIgb3B0aW9ucyA9ICQuZXh0ZW5kKHtcclxuXHRcdHNvdXJjZUF0dHI6ICdocmVmJyxcclxuXHRcdG92ZXJsYXk6IHRydWUsXHJcblx0XHRzcGlubmVyOiB0cnVlLFxyXG5cdFx0bmF2OiB0cnVlLFxyXG5cdFx0bmF2VGV4dDogWycmbHNhcXVvOycsICcmcnNhcXVvOyddLFxyXG5cdFx0Y2FwdGlvbnM6IHRydWUsXHJcblx0XHRjYXB0aW9uRGVsYXk6IDAsXHJcblx0XHRjYXB0aW9uU2VsZWN0b3I6ICdpbWcnLFxyXG5cdFx0Y2FwdGlvblR5cGU6ICdhdHRyJyxcclxuXHRcdGNhcHRpb25zRGF0YTogJ3RpdGxlJyxcclxuXHRcdGNhcHRpb25Qb3NpdGlvbjogJ2JvdHRvbScsXHJcblx0XHRjYXB0aW9uQ2xhc3M6ICcnLFxyXG5cdFx0Y2xvc2U6IHRydWUsXHJcblx0XHRjbG9zZVRleHQ6ICfDlycsXHJcblx0XHRzd2lwZUNsb3NlOiB0cnVlLFxyXG5cdFx0c2hvd0NvdW50ZXI6IHRydWUsXHJcblx0XHRmaWxlRXh0OiAncG5nfGpwZ3xqcGVnfGdpZicsXHJcblx0XHRhbmltYXRpb25TbGlkZTogdHJ1ZSxcclxuXHRcdGFuaW1hdGlvblNwZWVkOiAyNTAsXHJcblx0XHRwcmVsb2FkaW5nOiB0cnVlLFxyXG5cdFx0ZW5hYmxlS2V5Ym9hcmQ6IHRydWUsXHJcblx0XHRsb29wOiB0cnVlLFxyXG5cdFx0cmVsOiBmYWxzZSxcclxuXHRcdGRvY0Nsb3NlOiB0cnVlLFxyXG5cdFx0c3dpcGVUb2xlcmFuY2U6IDUwLFxyXG5cdFx0Y2xhc3NOYW1lOiAnc2ltcGxlLWxpZ2h0Ym94JyxcclxuXHRcdHdpZHRoUmF0aW86IDAuOCxcclxuXHRcdGhlaWdodFJhdGlvOiAwLjksXHJcblx0XHRzY2FsZUltYWdlVG9SYXRpbzogZmFsc2UsXHJcblx0XHRkaXNhYmxlUmlnaHRDbGljazogZmFsc2UsXHJcblx0XHRkaXNhYmxlU2Nyb2xsOiB0cnVlLFxyXG5cdFx0YWxlcnRFcnJvcjogdHJ1ZSxcclxuXHRcdGFsZXJ0RXJyb3JNZXNzYWdlOiAnSW1hZ2Ugbm90IGZvdW5kLCBuZXh0IGltYWdlIHdpbGwgYmUgbG9hZGVkJyxcclxuXHRcdGFkZGl0aW9uYWxIdG1sOiBmYWxzZSxcclxuXHRcdGhpc3Rvcnk6IHRydWUsXHJcblx0XHR0aHJvdHRsZUludGVydmFsOiAwXHJcblx0fSwgb3B0aW9ucyk7XHJcblxyXG5cdC8vIGdsb2JhbCB2YXJpYWJsZXNcclxuXHR2YXIgdG91Y2hEZXZpY2VcdD0gKCAnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cgKSxcclxuXHRcdHBvaW50ZXJFbmFibGVkID0gd2luZG93Lm5hdmlnYXRvci5wb2ludGVyRW5hYmxlZCB8fCB3aW5kb3cubmF2aWdhdG9yLm1zUG9pbnRlckVuYWJsZWQsXHJcblx0XHR0b3VjaGVkID0gZnVuY3Rpb24oIGV2ZW50ICl7XHJcblx0XHRcdGlmKCB0b3VjaERldmljZSApIHJldHVybiB0cnVlO1xyXG5cdFx0XHRpZiggIXBvaW50ZXJFbmFibGVkIHx8IHR5cGVvZiBldmVudCA9PT0gJ3VuZGVmaW5lZCcgfHwgdHlwZW9mIGV2ZW50LnBvaW50ZXJUeXBlID09PSAndW5kZWZpbmVkJyApIHJldHVybiBmYWxzZTtcclxuXHRcdFx0aWYoIHR5cGVvZiBldmVudC5NU1BPSU5URVJfVFlQRV9NT1VTRSAhPT0gJ3VuZGVmaW5lZCcgKSB7XHJcblx0XHRcdFx0aWYoIGV2ZW50Lk1TUE9JTlRFUl9UWVBFX01PVVNFICE9IGV2ZW50LnBvaW50ZXJUeXBlICkgcmV0dXJuIHRydWU7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0aWYoIGV2ZW50LnBvaW50ZXJUeXBlICE9ICdtb3VzZScgKSByZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9LFxyXG5cdFx0c3dpcGVEaWZmID0gMCxcclxuXHRcdHN3aXBlWURpZmYgPSAwLFxyXG5cdFx0Y3VySW1nID0gJCgpLFxyXG5cdFx0dHJhbnNQcmVmaXggPSBmdW5jdGlvbigpe1xyXG5cdFx0XHR2YXIgcyA9IGRvY3VtZW50LmJvZHkgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xyXG5cdFx0XHRzID0gcy5zdHlsZTtcclxuXHRcdFx0aWYoIHMuV2Via2l0VHJhbnNpdGlvbiA9PT0gJycgKSByZXR1cm4gJy13ZWJraXQtJztcclxuXHRcdFx0aWYoIHMuTW96VHJhbnNpdGlvbiA9PT0gJycgKSByZXR1cm4gJy1tb3otJztcclxuXHRcdFx0aWYoIHMuT1RyYW5zaXRpb24gPT09ICcnICkgcmV0dXJuICctby0nO1xyXG5cdFx0XHRpZiggcy50cmFuc2l0aW9uID09PSAnJyApIHJldHVybiAnJztcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSxcclxuXHRcdG9wZW5lZCA9IGZhbHNlLFxyXG5cdFx0bG9hZGVkID0gW10sXHJcblx0XHRnZXRSZWxhdGVkID0gZnVuY3Rpb24ocmVsLCBqcU9iaikge1xyXG5cdFx0XHR2YXIgJHJlbGF0ZWQgPSBqcU9iai5maWx0ZXIoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdHJldHVybiAoJCh0aGlzKS5hdHRyKCdyZWwnKSA9PT0gcmVsKTtcclxuXHRcdFx0fSk7XHJcblx0XHRcdHJldHVybiAkcmVsYXRlZDtcclxuXHRcdH0sXHJcblx0XHRvYmplY3RzID0gKG9wdGlvbnMucmVsICYmIG9wdGlvbnMucmVsICE9PSBmYWxzZSkgPyBnZXRSZWxhdGVkKG9wdGlvbnMucmVsLCAkKHRoaXMpKSA6IHRoaXMsXHJcblx0XHR0cmFuc1ByZWZpeCA9IHRyYW5zUHJlZml4KCksXHJcblx0XHRnbG9iYWxTY3JvbGxiYXJ3aWR0aCA9IDAsXHJcblx0XHRjYW5UcmFuc2lzaW9ucyA9ICh0cmFuc1ByZWZpeCAhPT0gZmFsc2UpID8gdHJ1ZSA6IGZhbHNlLFxyXG5cdFx0c3VwcG9ydHNQdXNoU3RhdGUgPSAoJ3B1c2hTdGF0ZScgaW4gaGlzdG9yeSksXHJcblx0XHRoaXN0b3J5aGFzQ2hhbmdlZCA9IGZhbHNlLFxyXG5cdFx0aGlzdG9yeVVwZGF0ZVRpbWVvdXQsXHJcblx0XHR3aW5Mb2MgPSB3aW5kb3cubG9jYXRpb24sXHJcblx0XHRnZXRIYXNoID0gZnVuY3Rpb24oKXtcclxuXHRcdFx0cmV0dXJuIHdpbkxvYy5oYXNoLnN1YnN0cmluZygxKTtcclxuXHRcdH0sXHJcblx0XHRpbml0aWFsSGFzaCA9IGdldEhhc2goKSxcclxuXHRcdHVwZGF0ZUhhc2ggPSBmdW5jdGlvbigpe1xyXG5cdFx0XHR2YXIgaGFzaCA9IGdldEhhc2goKSxcclxuXHRcdFx0bmV3SGFzaCA9ICdwaWQ9JysoaW5kZXgrMSk7XHJcblx0XHRcdHZhciBuZXdVUkwgPSB3aW5Mb2MuaHJlZi5zcGxpdCgnIycpWzBdICsgJyMnICsgIG5ld0hhc2g7XHJcblxyXG5cdFx0XHRpZihzdXBwb3J0c1B1c2hTdGF0ZSl7XHJcblx0XHRcdFx0aGlzdG9yeVtoaXN0b3J5aGFzQ2hhbmdlZCA/ICdyZXBsYWNlU3RhdGUnIDogJ3B1c2hTdGF0ZSddKCcnLCBkb2N1bWVudC50aXRsZSwgbmV3VVJMKTtcclxuXHRcdFx0fWVsc2Uge1xyXG5cdFx0XHRcdGlmKGhpc3RvcnloYXNDaGFuZ2VkKSB7XHJcblx0XHRcdFx0XHR3aW5Mb2MucmVwbGFjZSggbmV3VVJMICk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHdpbkxvYy5oYXNoID0gbmV3SGFzaDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0aGlzdG9yeWhhc0NoYW5nZWQgPSB0cnVlO1xyXG5cdFx0fSxcclxuXHRcdHJlc2V0SGFzaCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRpZiAoc3VwcG9ydHNQdXNoU3RhdGUpIHtcclxuXHRcdFx0XHRoaXN0b3J5LnB1c2hTdGF0ZSgnJywgZG9jdW1lbnQudGl0bGUsICB3aW5Mb2MucGF0aG5hbWUgKyB3aW5Mb2Muc2VhcmNoICk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0d2luTG9jLmhhc2ggPSAnJztcclxuXHRcdFx0fVxyXG5cdFx0XHRjbGVhclRpbWVvdXQoaGlzdG9yeVVwZGF0ZVRpbWVvdXQpO1xyXG5cclxuXHRcdH0sXHJcblx0XHR1cGRhdGVVUkwgPSBmdW5jdGlvbigpe1xyXG5cdFx0XHRpZighaGlzdG9yeWhhc0NoYW5nZWQpIHtcclxuXHRcdFx0XHR1cGRhdGVIYXNoKCk7IC8vIGZpcnN0IHRpbWVcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRoaXN0b3J5VXBkYXRlVGltZW91dCA9IHNldFRpbWVvdXQodXBkYXRlSGFzaCwgODAwKTtcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHRcdHRocm90dGxlID0gZnVuY3Rpb24oZnVuYywgbGltaXQpIHtcclxuXHRcdFx0dmFyIGluVGhyb3R0bGU7XHJcblx0XHRcdHJldHVybiBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHR2YXIgYXJncyA9IGFyZ3VtZW50cztcclxuXHRcdFx0XHR2YXIgY29udGV4dCA9IHRoaXM7XHJcblx0XHRcdFx0aWYgKCFpblRocm90dGxlKSB7XHJcblx0XHRcdFx0XHRmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xyXG5cdFx0XHRcdFx0aW5UaHJvdHRsZSA9IHRydWU7XHJcblx0XHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gaW5UaHJvdHRsZSA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0fSwgbGltaXQpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fTtcclxuXHRcdH0sXHJcblx0XHRwcmVmaXggPSAnc2ltcGxlbGInLFxyXG5cdFx0b3ZlcmxheSA9ICQoJzxkaXY+JykuYWRkQ2xhc3MoJ3NsLW92ZXJsYXknKSxcclxuXHRcdGNsb3NlQnRuID0gJCgnPGJ1dHRvbj4nKS5hZGRDbGFzcygnc2wtY2xvc2UnKS5odG1sKG9wdGlvbnMuY2xvc2VUZXh0KSxcclxuXHRcdHNwaW5uZXIgPSAkKCc8ZGl2PicpLmFkZENsYXNzKCdzbC1zcGlubmVyJykuaHRtbCgnPGRpdj48L2Rpdj4nKSxcclxuXHRcdG5hdiA9ICQoJzxkaXY+JykuYWRkQ2xhc3MoJ3NsLW5hdmlnYXRpb24nKS5odG1sKCc8YnV0dG9uIGNsYXNzPVwic2wtcHJldlwiPicrb3B0aW9ucy5uYXZUZXh0WzBdKyc8L2J1dHRvbj48YnV0dG9uIGNsYXNzPVwic2wtbmV4dFwiPicrb3B0aW9ucy5uYXZUZXh0WzFdKyc8L2J1dHRvbj4nKSxcclxuXHRcdGNvdW50ZXIgPSAkKCc8ZGl2PicpLmFkZENsYXNzKCdzbC1jb3VudGVyJykuaHRtbCgnPHNwYW4gY2xhc3M9XCJzbC1jdXJyZW50XCI+PC9zcGFuPi88c3BhbiBjbGFzcz1cInNsLXRvdGFsXCI+PC9zcGFuPicpLFxyXG5cdFx0YW5pbWF0aW5nID0gZmFsc2UsXHJcblx0XHRpbmRleCA9IDAsXHJcblx0XHRjYXB0aW9uID0gJCgnPGRpdj4nKS5hZGRDbGFzcygnc2wtY2FwdGlvbiAnK29wdGlvbnMuY2FwdGlvbkNsYXNzKycgcG9zLScrb3B0aW9ucy5jYXB0aW9uUG9zaXRpb24pLFxyXG5cdFx0aW1hZ2UgPSAkKCc8ZGl2PicpLmFkZENsYXNzKCdzbC1pbWFnZScpLFxyXG5cdFx0d3JhcHBlciA9ICQoJzxkaXY+JykuYWRkQ2xhc3MoJ3NsLXdyYXBwZXInKS5hZGRDbGFzcyhvcHRpb25zLmNsYXNzTmFtZSksXHJcblx0XHRpc1ZhbGlkTGluayA9IGZ1bmN0aW9uKCBlbGVtZW50ICl7XHJcblx0XHRcdGlmKCFvcHRpb25zLmZpbGVFeHQpIHJldHVybiB0cnVlO1xyXG5cdFx0XHR2YXIgZmlsRWV4dCA9IC9cXC4oWzAtOWEtel0rKSg/PVs/I10pfChcXC4pKD86W1xcd10rKSQvZ21pO1xyXG5cdFx0XHR2YXIgdGVzdEV4dCA9ICQoIGVsZW1lbnQgKS5hdHRyKCBvcHRpb25zLnNvdXJjZUF0dHIgKS5tYXRjaChmaWxFZXh0KTtcclxuXHRcdFx0cmV0dXJuIHRlc3RFeHQgJiYgJCggZWxlbWVudCApLnByb3AoICd0YWdOYW1lJyApLnRvTG93ZXJDYXNlKCkgPT0gJ2EnICYmICggbmV3IFJlZ0V4cCggJ1xcLignICsgb3B0aW9ucy5maWxlRXh0ICsgJykkJywgJ2knICkgKS50ZXN0KCB0ZXN0RXh0ICk7XHJcblx0XHR9LFxyXG5cdFx0c2V0dXAgPSBmdW5jdGlvbigpe1xyXG5cdFx0XHRpZihvcHRpb25zLmNsb3NlKSBjbG9zZUJ0bi5hcHBlbmRUbyh3cmFwcGVyKTtcclxuXHRcdFx0aWYob3B0aW9ucy5zaG93Q291bnRlcil7XHJcblx0XHRcdFx0aWYob2JqZWN0cy5sZW5ndGggPiAxKXtcclxuXHRcdFx0XHRcdGNvdW50ZXIuYXBwZW5kVG8od3JhcHBlcik7XHJcblx0XHRcdFx0XHRjb3VudGVyLmZpbmQoJy5zbC10b3RhbCcpLnRleHQob2JqZWN0cy5sZW5ndGgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRpZihvcHRpb25zLm5hdikgbmF2LmFwcGVuZFRvKHdyYXBwZXIpO1xyXG5cdFx0XHRpZihvcHRpb25zLnNwaW5uZXIpIHNwaW5uZXIuYXBwZW5kVG8od3JhcHBlcik7XHJcblx0XHR9LFxyXG5cdFx0b3BlbkltYWdlID0gZnVuY3Rpb24oZWxlbSl7XHJcblx0XHRcdGVsZW0udHJpZ2dlcigkLkV2ZW50KCdzaG93LnNpbXBsZWxpZ2h0Ym94JykpO1xyXG5cdFx0XHRpZihvcHRpb25zLmRpc2FibGVTY3JvbGwpIGdsb2JhbFNjcm9sbGJhcndpZHRoID0gaGFuZGxlU2Nyb2xsYmFyKCdoaWRlJyk7XHJcblx0XHRcdHdyYXBwZXIuYXBwZW5kVG8oJ2JvZHknKTtcclxuXHRcdFx0aW1hZ2UuYXBwZW5kVG8od3JhcHBlcik7XHJcblx0XHRcdGlmKG9wdGlvbnMub3ZlcmxheSkgb3ZlcmxheS5hcHBlbmRUbygkKCdib2R5JykpO1xyXG5cdFx0XHRhbmltYXRpbmcgPSB0cnVlO1xyXG5cdFx0XHRpbmRleCA9IG9iamVjdHMuaW5kZXgoZWxlbSk7XHJcblx0XHRcdGN1ckltZyA9ICQoICc8aW1nLz4nIClcclxuXHRcdFx0XHQuaGlkZSgpXHJcblx0XHRcdFx0LmF0dHIoJ3NyYycsIGVsZW0uYXR0cihvcHRpb25zLnNvdXJjZUF0dHIpKTtcclxuXHRcdFx0aWYobG9hZGVkLmluZGV4T2YoZWxlbS5hdHRyKG9wdGlvbnMuc291cmNlQXR0cikpID09IC0xKXtcclxuXHRcdFx0XHRsb2FkZWQucHVzaChlbGVtLmF0dHIob3B0aW9ucy5zb3VyY2VBdHRyKSk7XHJcblx0XHRcdH1cclxuXHRcdFx0aW1hZ2UuaHRtbCgnJykuYXR0cignc3R5bGUnLCcnKTtcclxuXHRcdFx0Y3VySW1nLmFwcGVuZFRvKGltYWdlKTtcclxuXHRcdFx0YWRkRXZlbnRzKCk7XHJcblx0XHRcdG92ZXJsYXkuZmFkZUluKCdmYXN0Jyk7XHJcblx0XHRcdCQoJy5zbC1jbG9zZScpLmZhZGVJbignZmFzdCcpO1xyXG5cdFx0XHRzcGlubmVyLnNob3coKTtcclxuXHRcdFx0bmF2LmZhZGVJbignZmFzdCcpO1xyXG5cdFx0XHQkKCcuc2wtd3JhcHBlciAuc2wtY291bnRlciAuc2wtY3VycmVudCcpLnRleHQoaW5kZXggKzEpO1xyXG5cdFx0XHRjb3VudGVyLmZhZGVJbignZmFzdCcpO1xyXG5cdFx0XHRhZGp1c3RJbWFnZSgpO1xyXG5cdFx0XHRpZihvcHRpb25zLnByZWxvYWRpbmcpIHByZWxvYWQoKTtcclxuXHRcdFx0c2V0VGltZW91dCggZnVuY3Rpb24oKXsgZWxlbS50cmlnZ2VyKCQuRXZlbnQoJ3Nob3duLnNpbXBsZWxpZ2h0Ym94JykpOyB9ICxvcHRpb25zLmFuaW1hdGlvblNwZWVkKTtcclxuXHRcdH0sXHJcblx0XHRhZGp1c3RJbWFnZSA9IGZ1bmN0aW9uKGRpcil7XHJcblx0XHRcdGlmKCFjdXJJbWcubGVuZ3RoKSByZXR1cm47XHJcblx0XHRcdHZhciB0bXBJbWFnZSBcdCA9IG5ldyBJbWFnZSgpLFxyXG5cdFx0XHR3aW5kb3dXaWR0aFx0ID0gJCggd2luZG93ICkud2lkdGgoKSAqIG9wdGlvbnMud2lkdGhSYXRpbyxcclxuXHRcdFx0d2luZG93SGVpZ2h0ID0gJCggd2luZG93ICkuaGVpZ2h0KCkgKiBvcHRpb25zLmhlaWdodFJhdGlvO1xyXG5cdFx0XHR0bXBJbWFnZS5zcmNcdD0gY3VySW1nLmF0dHIoICdzcmMnICk7XHJcblxyXG5cdFx0XHQkKHRtcEltYWdlKS5vbignZXJyb3InLGZ1bmN0aW9uKGV2KXtcclxuXHRcdFx0XHQvL25vIGltYWdlIHdhcyBmb3VuZFxyXG5cdFx0XHRcdG9iamVjdHMuZXEoaW5kZXgpLnRyaWdnZXIoJC5FdmVudCgnZXJyb3Iuc2ltcGxlbGlnaHRib3gnKSk7XHJcblx0XHRcdFx0YW5pbWF0aW5nID0gZmFsc2U7XHJcblx0XHRcdFx0b3BlbmVkID0gdHJ1ZTtcclxuXHRcdFx0XHRzcGlubmVyLmhpZGUoKTtcclxuXHRcdFx0XHRpZihvcHRpb25zLmFsZXJ0RXJyb3Ipe1xyXG5cdFx0XHRcdFx0YWxlcnQob3B0aW9ucy5hbGVydEVycm9yTWVzc2FnZSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGlmKGRpciA9PSAxIHx8IGRpciA9PSAtMSl7XHJcblx0XHRcdFx0XHRsb2FkSW1hZ2UoZGlyKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0bG9hZEltYWdlKDEpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH0pO1xyXG5cclxuXHJcblx0XHRcdHRtcEltYWdlLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdGlmICh0eXBlb2YgZGlyICE9PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHRcdFx0b2JqZWN0cy5lcShpbmRleClcclxuXHRcdFx0XHRcdFx0LnRyaWdnZXIoJC5FdmVudCgnY2hhbmdlZC5zaW1wbGVsaWdodGJveCcpKVxyXG5cdFx0XHRcdFx0XHQudHJpZ2dlcigkLkV2ZW50KCAoZGlyPT09MT8nbmV4dERvbmUnOidwcmV2RG9uZScpKycuc2ltcGxlbGlnaHRib3gnKSk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvLyBoaXN0b3J5XHJcblx0XHRcdFx0aWYob3B0aW9ucy5oaXN0b3J5KXtcclxuXHRcdFx0XHRcdHVwZGF0ZVVSTCgpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYobG9hZGVkLmluZGV4T2YoY3VySW1nLmF0dHIoICdzcmMnICkpID09IC0xKXtcclxuXHRcdFx0XHRcdGxvYWRlZC5wdXNoKGN1ckltZy5hdHRyKCAnc3JjJyApKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0dmFyIGltYWdlV2lkdGhcdCA9IHRtcEltYWdlLndpZHRoLFxyXG5cdFx0XHRcdFx0aW1hZ2VIZWlnaHRcdCA9IHRtcEltYWdlLmhlaWdodDtcclxuXHJcblx0XHRcdFx0aWYoIG9wdGlvbnMuc2NhbGVJbWFnZVRvUmF0aW8gfHwgaW1hZ2VXaWR0aCA+IHdpbmRvd1dpZHRoIHx8IGltYWdlSGVpZ2h0ID4gd2luZG93SGVpZ2h0ICl7XHJcblx0XHRcdFx0XHR2YXIgcmF0aW9cdCA9IGltYWdlV2lkdGggLyBpbWFnZUhlaWdodCA+IHdpbmRvd1dpZHRoIC8gd2luZG93SGVpZ2h0ID8gaW1hZ2VXaWR0aCAvIHdpbmRvd1dpZHRoIDogaW1hZ2VIZWlnaHQgLyB3aW5kb3dIZWlnaHQ7XHJcblx0XHRcdFx0XHRpbWFnZVdpZHRoXHQvPSByYXRpbztcclxuXHRcdFx0XHRcdGltYWdlSGVpZ2h0XHQvPSByYXRpbztcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdCQoJy5zbC1pbWFnZScpLmNzcyh7XHJcblx0XHRcdFx0XHQndG9wJzogICAgKCAkKCB3aW5kb3cgKS5oZWlnaHQoKSAtIGltYWdlSGVpZ2h0ICkgLyAyICsgJ3B4JyxcclxuXHRcdFx0XHRcdCdsZWZ0JzogICAoICQoIHdpbmRvdyApLndpZHRoKCkgLSBpbWFnZVdpZHRoIC0gZ2xvYmFsU2Nyb2xsYmFyd2lkdGgpLyAyICsgJ3B4J1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdHNwaW5uZXIuaGlkZSgpO1xyXG5cdFx0XHRcdGN1ckltZ1xyXG5cdFx0XHRcdC5jc3Moe1xyXG5cdFx0XHRcdFx0J3dpZHRoJzogIGltYWdlV2lkdGggKyAncHgnLFxyXG5cdFx0XHRcdFx0J2hlaWdodCc6IGltYWdlSGVpZ2h0ICsgJ3B4J1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0LmZhZGVJbignZmFzdCcpO1xyXG5cdFx0XHRcdG9wZW5lZCA9IHRydWU7XHJcblx0XHRcdFx0dmFyIGNTZWwgPSAob3B0aW9ucy5jYXB0aW9uU2VsZWN0b3IgPT0gJ3NlbGYnKSA/IG9iamVjdHMuZXEoaW5kZXgpIDogb2JqZWN0cy5lcShpbmRleCkuZmluZChvcHRpb25zLmNhcHRpb25TZWxlY3Rvcik7XHJcblx0XHRcdFx0dmFyIGNhcHRpb25UZXh0O1xyXG5cdFx0XHRcdGlmKG9wdGlvbnMuY2FwdGlvblR5cGUgPT0gJ2RhdGEnKXtcclxuXHRcdFx0XHRcdGNhcHRpb25UZXh0ID0gY1NlbC5kYXRhKG9wdGlvbnMuY2FwdGlvbnNEYXRhKTtcclxuXHRcdFx0XHR9IGVsc2UgaWYob3B0aW9ucy5jYXB0aW9uVHlwZSA9PSAndGV4dCcpe1xyXG5cdFx0XHRcdFx0Y2FwdGlvblRleHQgPSBjU2VsLmh0bWwoKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0Y2FwdGlvblRleHQgPSBjU2VsLnByb3Aob3B0aW9ucy5jYXB0aW9uc0RhdGEpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYoIW9wdGlvbnMubG9vcCkge1xyXG5cdFx0XHRcdFx0aWYoaW5kZXggPT09IDApeyAkKCcuc2wtcHJldicpLmhpZGUoKTt9XHJcblx0XHRcdFx0XHRpZihpbmRleCA+PSBvYmplY3RzLmxlbmd0aCAtMSkgeyQoJy5zbC1uZXh0JykuaGlkZSgpO31cclxuXHRcdFx0XHRcdGlmKGluZGV4ID4gMCl7ICQoJy5zbC1wcmV2Jykuc2hvdygpOyB9XHJcblx0XHRcdFx0XHRpZihpbmRleCA8IG9iamVjdHMubGVuZ3RoIC0xKXsgJCgnLnNsLW5leHQnKS5zaG93KCk7IH1cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmKG9iamVjdHMubGVuZ3RoID09IDEpICQoJy5zbC1wcmV2LCAuc2wtbmV4dCcpLmhpZGUoKTtcclxuXHJcblx0XHRcdFx0aWYoZGlyID09IDEgfHwgZGlyID09IC0xKXtcclxuXHRcdFx0XHRcdHZhciBjc3MgPSB7ICdvcGFjaXR5JzogMS4wIH07XHJcblx0XHRcdFx0XHRpZiggb3B0aW9ucy5hbmltYXRpb25TbGlkZSApIHtcclxuXHRcdFx0XHRcdFx0aWYoIGNhblRyYW5zaXNpb25zICkge1xyXG5cdFx0XHRcdFx0XHRcdHNsaWRlKDAsIDEwMCAqIGRpciArICdweCcpO1xyXG5cdFx0XHRcdFx0XHRcdHNldFRpbWVvdXQoIGZ1bmN0aW9uKCl7IHNsaWRlKCBvcHRpb25zLmFuaW1hdGlvblNwZWVkIC8gMTAwMCwgMCArICdweCcpOyB9LCA1MCApO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdGNzcy5sZWZ0ID0gcGFyc2VJbnQoICQoJy5zbC1pbWFnZScpLmNzcyggJ2xlZnQnICkgKSArIDEwMCAqIGRpciArICdweCc7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHQkKCcuc2wtaW1hZ2UnKS5hbmltYXRlKCBjc3MsIG9wdGlvbnMuYW5pbWF0aW9uU3BlZWQsIGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRcdGFuaW1hdGluZyA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0XHRzZXRDYXB0aW9uKGNhcHRpb25UZXh0LCBpbWFnZVdpZHRoKTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRhbmltYXRpbmcgPSBmYWxzZTtcclxuXHRcdFx0XHRcdHNldENhcHRpb24oY2FwdGlvblRleHQsIGltYWdlV2lkdGgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZihvcHRpb25zLmFkZGl0aW9uYWxIdG1sICYmICQoJy5zbC1hZGRpdGlvbmFsLWh0bWwnKS5sZW5ndGggPT09IDApe1xyXG5cdFx0XHRcdFx0JCgnPGRpdj4nKS5odG1sKG9wdGlvbnMuYWRkaXRpb25hbEh0bWwpLmFkZENsYXNzKCdzbC1hZGRpdGlvbmFsLWh0bWwnKS5hcHBlbmRUbygkKCcuc2wtaW1hZ2UnKSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9O1xyXG5cdFx0fSxcclxuXHRcdHNldENhcHRpb24gPSBmdW5jdGlvbihjYXB0aW9udGV4dCwgaW1hZ2VXaWR0aCl7XHJcblx0XHRcdGlmKGNhcHRpb250ZXh0ICE9PSAnJyAmJiB0eXBlb2YgY2FwdGlvbnRleHQgIT09IFwidW5kZWZpbmVkXCIgJiYgb3B0aW9ucy5jYXB0aW9ucyl7XHJcblx0XHRcdFx0Y2FwdGlvbi5odG1sKGNhcHRpb250ZXh0KS5jc3Moeyd3aWR0aCc6ICBpbWFnZVdpZHRoICsgJ3B4J30pLmhpZGUoKS5hcHBlbmRUbygkKCcuc2wtaW1hZ2UnKSkuZGVsYXkob3B0aW9ucy5jYXB0aW9uRGVsYXkpLmZhZGVJbignZmFzdCcpO1xyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cdFx0c2xpZGUgPSBmdW5jdGlvbihzcGVlZCwgcG9zKXtcclxuXHRcdFx0dmFyIHN0eWxlcyA9IHt9O1xyXG5cdFx0XHRcdHN0eWxlc1t0cmFuc1ByZWZpeCArICd0cmFuc2Zvcm0nXSA9ICd0cmFuc2xhdGVYKCcgKyBwb3MgKyAnKSc7XHJcblx0XHRcdFx0c3R5bGVzW3RyYW5zUHJlZml4ICsgJ3RyYW5zaXRpb24nXSA9IHRyYW5zUHJlZml4ICsgJ3RyYW5zZm9ybSAnICsgc3BlZWQgKyAncyBsaW5lYXInO1xyXG5cdFx0XHRcdCQoJy5zbC1pbWFnZScpLmNzcyhzdHlsZXMpO1xyXG5cdFx0fSxcclxuXHRcdGFkZEV2ZW50cyA9IGZ1bmN0aW9uKCl7XHJcblx0XHRcdC8vIHJlc2l6ZS9yZXNwb25zaXZlXHJcblx0XHRcdCQoIHdpbmRvdyApLm9uKCAncmVzaXplLicrcHJlZml4LCBhZGp1c3RJbWFnZSApO1xyXG5cclxuXHRcdFx0Ly8gY2xvc2UgbGlnaHRib3ggb24gY2xvc2UgYnRuXHJcblx0XHRcdCQoIGRvY3VtZW50ICkub24oJ2NsaWNrLicrcHJlZml4KyAnIHRvdWNoc3RhcnQuJytwcmVmaXgsICcuc2wtY2xvc2UnLCBmdW5jdGlvbihlKXtcclxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0aWYob3BlbmVkKXsgY2xvc2UoKTt9XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0aWYob3B0aW9ucy5oaXN0b3J5KXtcclxuXHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0JCh3aW5kb3cpLm9uKCdoYXNoY2hhbmdlLicrcHJlZml4LGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRcdGlmKG9wZW5lZCl7XHJcblx0XHRcdFx0XHRcdFx0aWYoZ2V0SGFzaCgpID09PSBpbml0aWFsSGFzaCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0Y2xvc2UoKTtcclxuXHRcdFx0XHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH0sIDQwKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gbmF2LWJ1dHRvbnNcclxuXHRcdFx0bmF2Lm9uKCdjbGljay4nK3ByZWZpeCwgJ2J1dHRvbicsIHRocm90dGxlKGZ1bmN0aW9uKGUpe1xyXG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRzd2lwZURpZmYgPSAwO1xyXG5cdFx0XHRcdGxvYWRJbWFnZSggJCh0aGlzKS5oYXNDbGFzcygnc2wtbmV4dCcpID8gMSA6IC0xICk7XHJcblx0XHRcdH0sIG9wdGlvbnMudGhyb3R0bGVJbnRlcnZhbCkpO1xyXG5cclxuXHRcdFx0Ly8gdG91Y2hjb250cm9sc1xyXG5cdFx0XHR2YXIgc3dpcGVTdGFydFx0ID0gMCxcclxuXHRcdFx0XHRzd2lwZUVuZFx0ID0gMCxcclxuXHRcdFx0XHRzd2lwZVlTdGFydCA9IDAsXHJcblx0XHRcdFx0c3dpcGVZRW5kID0gMCxcclxuXHRcdFx0XHRtb3VzZWRvd24gPSBmYWxzZSxcclxuXHRcdFx0XHRpbWFnZUxlZnQgPSAwO1xyXG5cclxuXHRcdFx0aW1hZ2VcclxuXHRcdFx0Lm9uKCAndG91Y2hzdGFydC4nK3ByZWZpeCsnIG1vdXNlZG93bi4nK3ByZWZpeCwgZnVuY3Rpb24oZSlcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGlmKG1vdXNlZG93bikgcmV0dXJuIHRydWU7XHJcblx0XHRcdFx0aWYoIGNhblRyYW5zaXNpb25zICkgaW1hZ2VMZWZ0ID0gcGFyc2VJbnQoIGltYWdlLmNzcyggJ2xlZnQnICkgKTtcclxuXHRcdFx0XHRtb3VzZWRvd24gPSB0cnVlO1xyXG5cdFx0XHRcdHN3aXBlRGlmZiA9IDA7XHJcblx0XHRcdFx0c3dpcGVZRGlmZiA9IDA7XHJcblx0XHRcdFx0c3dpcGVTdGFydCA9IGUub3JpZ2luYWxFdmVudC5wYWdlWCB8fCBlLm9yaWdpbmFsRXZlbnQudG91Y2hlc1sgMCBdLnBhZ2VYO1xyXG5cdFx0XHRcdHN3aXBlWVN0YXJ0ID0gZS5vcmlnaW5hbEV2ZW50LnBhZ2VZIHx8IGUub3JpZ2luYWxFdmVudC50b3VjaGVzWyAwIF0ucGFnZVk7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9KVxyXG5cdFx0XHQub24oICd0b3VjaG1vdmUuJytwcmVmaXgrJyBtb3VzZW1vdmUuJytwcmVmaXgrJyBwb2ludGVybW92ZSBNU1BvaW50ZXJNb3ZlJywgZnVuY3Rpb24oZSlcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGlmKCFtb3VzZWRvd24pIHJldHVybiB0cnVlO1xyXG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRzd2lwZUVuZCA9IGUub3JpZ2luYWxFdmVudC5wYWdlWCB8fCBlLm9yaWdpbmFsRXZlbnQudG91Y2hlc1sgMCBdLnBhZ2VYO1xyXG5cdFx0XHRcdHN3aXBlWUVuZCA9IGUub3JpZ2luYWxFdmVudC5wYWdlWSB8fCBlLm9yaWdpbmFsRXZlbnQudG91Y2hlc1sgMCBdLnBhZ2VZO1xyXG5cdFx0XHRcdHN3aXBlRGlmZiA9IHN3aXBlU3RhcnQgLSBzd2lwZUVuZDtcclxuXHRcdFx0XHRzd2lwZVlEaWZmID0gc3dpcGVZU3RhcnQgLSBzd2lwZVlFbmQ7XHJcblx0XHRcdFx0aWYoIG9wdGlvbnMuYW5pbWF0aW9uU2xpZGUgKSB7XHJcblx0XHRcdFx0ICBpZiggY2FuVHJhbnNpc2lvbnMgKSBzbGlkZSggMCwgLXN3aXBlRGlmZiArICdweCcgKTtcclxuXHRcdFx0XHQgIGVsc2UgaW1hZ2UuY3NzKCAnbGVmdCcsIGltYWdlTGVmdCAtIHN3aXBlRGlmZiArICdweCcgKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pXHJcblx0XHRcdC5vbiggJ3RvdWNoZW5kLicrcHJlZml4KycgbW91c2V1cC4nK3ByZWZpeCsnIHRvdWNoY2FuY2VsLicrcHJlZml4KycgbW91c2VsZWF2ZS4nK3ByZWZpeCsnIHBvaW50ZXJ1cCBwb2ludGVyY2FuY2VsIE1TUG9pbnRlclVwIE1TUG9pbnRlckNhbmNlbCcsZnVuY3Rpb24oZSlcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGlmKG1vdXNlZG93bil7XHJcblx0XHRcdFx0XHRtb3VzZWRvd24gPSBmYWxzZTtcclxuXHRcdFx0XHRcdHZhciBwb3NzaWJsZURpciA9IHRydWU7XHJcblx0XHRcdFx0XHRpZighb3B0aW9ucy5sb29wKSB7XHJcblx0XHRcdFx0XHRcdGlmKGluZGV4ID09PSAwICYmIHN3aXBlRGlmZiA8IDApeyBwb3NzaWJsZURpciA9IGZhbHNlOyB9XHJcblx0XHRcdFx0XHRcdGlmKGluZGV4ID49IG9iamVjdHMubGVuZ3RoIC0xICYmIHN3aXBlRGlmZiA+IDApIHsgcG9zc2libGVEaXIgPSBmYWxzZTsgfVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0aWYoIE1hdGguYWJzKCBzd2lwZURpZmYgKSA+IG9wdGlvbnMuc3dpcGVUb2xlcmFuY2UgJiYgcG9zc2libGVEaXIgKSB7XHJcblx0XHRcdFx0XHRcdGxvYWRJbWFnZSggc3dpcGVEaWZmID4gMCA/IDEgOiAtMSApO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0ZWxzZSBpZiggb3B0aW9ucy5hbmltYXRpb25TbGlkZSApXHJcblx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdGlmKCBjYW5UcmFuc2lzaW9ucyApIHNsaWRlKCBvcHRpb25zLmFuaW1hdGlvblNwZWVkIC8gMTAwMCwgMCArICdweCcgKTtcclxuXHRcdFx0XHRcdFx0ZWxzZSBpbWFnZS5hbmltYXRlKHsgJ2xlZnQnOiBpbWFnZUxlZnQgKyAncHgnIH0sIG9wdGlvbnMuYW5pbWF0aW9uU3BlZWQgLyAyICk7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0aWYoIG9wdGlvbnMuc3dpcGVDbG9zZSAmJiBNYXRoLmFicyhzd2lwZVlEaWZmKSA+IDUwICYmIE1hdGguYWJzKCBzd2lwZURpZmYgKSA8IG9wdGlvbnMuc3dpcGVUb2xlcmFuY2UpIHtcclxuXHRcdFx0XHRcdFx0Y2xvc2UoKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fSxcclxuXHRcdHJlbW92ZUV2ZW50cyA9IGZ1bmN0aW9uKCl7XHJcblx0XHRcdG5hdi5vZmYoJ2NsaWNrJywgJ2J1dHRvbicpO1xyXG5cdFx0XHQkKCBkb2N1bWVudCApLm9mZignY2xpY2suJytwcmVmaXgsICcuc2wtY2xvc2UnKTtcclxuXHRcdFx0JCggd2luZG93ICkub2ZmKCAncmVzaXplLicrcHJlZml4KTtcclxuXHRcdFx0JCggd2luZG93ICkub2ZmKCAnaGFzaGNoYW5nZS4nK3ByZWZpeCk7XHJcblx0XHR9LFxyXG5cdFx0cHJlbG9hZCA9IGZ1bmN0aW9uKCl7XHJcblx0XHRcdHZhciBuZXh0ID0gKGluZGV4KzEgPCAwKSA/IG9iamVjdHMubGVuZ3RoIC0xOiAoaW5kZXgrMSA+PSBvYmplY3RzLmxlbmd0aCAtMSkgPyAwIDogaW5kZXgrMSxcclxuXHRcdFx0XHRwcmV2ID0gKGluZGV4LTEgPCAwKSA/IG9iamVjdHMubGVuZ3RoIC0xOiAoaW5kZXgtMSA+PSBvYmplY3RzLmxlbmd0aCAtMSkgPyAwIDogaW5kZXgtMTtcclxuXHRcdFx0JCggJzxpbWcgLz4nICkuYXR0ciggJ3NyYycsIG9iamVjdHMuZXEobmV4dCkuYXR0ciggb3B0aW9ucy5zb3VyY2VBdHRyICkgKS5vbignbG9hZCcsIGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0aWYobG9hZGVkLmluZGV4T2YoJCh0aGlzKS5hdHRyKCdzcmMnKSkgPT0gLTEpe1xyXG5cdFx0XHRcdFx0bG9hZGVkLnB1c2goJCh0aGlzKS5hdHRyKCdzcmMnKSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdG9iamVjdHMuZXEoaW5kZXgpLnRyaWdnZXIoJC5FdmVudCgnbmV4dEltYWdlTG9hZGVkLnNpbXBsZWxpZ2h0Ym94JykpO1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0JCggJzxpbWcgLz4nICkuYXR0ciggJ3NyYycsIG9iamVjdHMuZXEocHJldikuYXR0ciggb3B0aW9ucy5zb3VyY2VBdHRyICkgKS5vbignbG9hZCcsIGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0aWYobG9hZGVkLmluZGV4T2YoJCh0aGlzKS5hdHRyKCdzcmMnKSkgPT0gLTEpe1xyXG5cdFx0XHRcdFx0bG9hZGVkLnB1c2goJCh0aGlzKS5hdHRyKCdzcmMnKSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdG9iamVjdHMuZXEoaW5kZXgpLnRyaWdnZXIoJC5FdmVudCgncHJldkltYWdlTG9hZGVkLnNpbXBsZWxpZ2h0Ym94JykpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHR9LFxyXG5cdFx0bG9hZEltYWdlID0gZnVuY3Rpb24oZGlyKXtcclxuXHRcdFx0b2JqZWN0cy5lcShpbmRleClcclxuXHRcdFx0LnRyaWdnZXIoJC5FdmVudCgnY2hhbmdlLnNpbXBsZWxpZ2h0Ym94JykpXHJcblx0XHRcdC50cmlnZ2VyKCQuRXZlbnQoIChkaXI9PT0xPyduZXh0JzoncHJldicpKycuc2ltcGxlbGlnaHRib3gnKSk7XHJcblxyXG5cdFx0dmFyIG5ld0luZGV4ID0gaW5kZXggKyBkaXI7XHJcblx0XHRcdGlmKGFuaW1hdGluZyB8fCAobmV3SW5kZXggPCAwIHx8IG5ld0luZGV4ID49IG9iamVjdHMubGVuZ3RoKSAmJiBvcHRpb25zLmxvb3AgPT09IGZhbHNlICkgcmV0dXJuO1xyXG5cdFx0XHRpbmRleCA9IChuZXdJbmRleCA8IDApID8gb2JqZWN0cy5sZW5ndGggLTE6IChuZXdJbmRleCA+IG9iamVjdHMubGVuZ3RoIC0xKSA/IDAgOiBuZXdJbmRleDtcclxuXHRcdFx0JCgnLnNsLXdyYXBwZXIgLnNsLWNvdW50ZXIgLnNsLWN1cnJlbnQnKS50ZXh0KGluZGV4ICsxKTtcclxuICAgICAgXHR2YXIgY3NzID0geyAnb3BhY2l0eSc6IDAgfTtcclxuXHRcdFx0aWYoIG9wdGlvbnMuYW5pbWF0aW9uU2xpZGUgKSB7XHJcblx0XHRcdCAgaWYoIGNhblRyYW5zaXNpb25zICkgc2xpZGUob3B0aW9ucy5hbmltYXRpb25TcGVlZCAvIDEwMDAsICggLTEwMCAqIGRpciApIC0gc3dpcGVEaWZmICsgJ3B4Jyk7XHJcblx0XHRcdCAgZWxzZSBjc3MubGVmdCA9IHBhcnNlSW50KCAkKCcuc2wtaW1hZ2UnKS5jc3MoICdsZWZ0JyApICkgKyAtMTAwICogZGlyICsgJ3B4JztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JCgnLnNsLWltYWdlJykuYW5pbWF0ZSggY3NzLCBvcHRpb25zLmFuaW1hdGlvblNwZWVkLCBmdW5jdGlvbigpe1xyXG5cdFx0XHRcdHNldFRpbWVvdXQoIGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHQvLyBmYWRlb3V0IG9sZCBpbWFnZVxyXG5cdFx0XHRcdFx0dmFyIGVsZW0gPSBvYmplY3RzLmVxKGluZGV4KTtcclxuXHRcdFx0XHRcdGN1ckltZ1xyXG5cdFx0XHRcdFx0LmF0dHIoJ3NyYycsIGVsZW0uYXR0cihvcHRpb25zLnNvdXJjZUF0dHIpKTtcclxuXHRcdFx0XHRcdGlmKGxvYWRlZC5pbmRleE9mKGVsZW0uYXR0cihvcHRpb25zLnNvdXJjZUF0dHIpKSA9PSAtMSl7XHJcblx0XHRcdFx0XHRcdHNwaW5uZXIuc2hvdygpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0JCgnLnNsLWNhcHRpb24nKS5yZW1vdmUoKTtcclxuXHRcdFx0XHRcdGFkanVzdEltYWdlKGRpcik7XHJcblx0XHRcdFx0XHRpZihvcHRpb25zLnByZWxvYWRpbmcpIHByZWxvYWQoKTtcclxuXHRcdFx0XHR9LCAxMDApO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0sXHJcblx0XHRjbG9zZSA9IGZ1bmN0aW9uKCl7XHJcblx0XHRcdGlmKGFuaW1hdGluZykgcmV0dXJuO1xyXG5cdFx0XHR2YXIgZWxlbSA9IG9iamVjdHMuZXEoaW5kZXgpLFxyXG5cdFx0XHR0cmlnZ2VyZWQgPSBmYWxzZTtcclxuXHJcblx0XHRcdGVsZW0udHJpZ2dlcigkLkV2ZW50KCdjbG9zZS5zaW1wbGVsaWdodGJveCcpKTtcclxuXHRcdFx0aWYob3B0aW9ucy5oaXN0b3J5KXtcclxuXHRcdFx0XHRyZXNldEhhc2goKTtcclxuXHRcdFx0fVxyXG5cdFx0XHQkKCcuc2wtaW1hZ2UgaW1nLCAuc2wtb3ZlcmxheSwgLnNsLWNsb3NlLCAuc2wtbmF2aWdhdGlvbiwgLnNsLWltYWdlIC5zbC1jYXB0aW9uLCAuc2wtY291bnRlcicpLmZhZGVPdXQoJ2Zhc3QnLCBmdW5jdGlvbigpe1xyXG5cdFx0XHRcdGlmKG9wdGlvbnMuZGlzYWJsZVNjcm9sbCkgaGFuZGxlU2Nyb2xsYmFyKCdzaG93Jyk7XHJcblx0XHRcdFx0JCgnLnNsLXdyYXBwZXIsIC5zbC1vdmVybGF5JykucmVtb3ZlKCk7XHJcblx0XHRcdFx0cmVtb3ZlRXZlbnRzKCk7XHJcblx0XHRcdFx0aWYoIXRyaWdnZXJlZCkgZWxlbS50cmlnZ2VyKCQuRXZlbnQoJ2Nsb3NlZC5zaW1wbGVsaWdodGJveCcpKTtcclxuXHRcdFx0XHR0cmlnZ2VyZWQgPSB0cnVlO1xyXG5cdFx0XHR9KTtcclxuXHQgICAgY3VySW1nID0gJCgpO1xyXG5cdCAgICBvcGVuZWQgPSBmYWxzZTtcclxuXHQgICAgYW5pbWF0aW5nID0gZmFsc2U7XHJcblx0XHR9LFxyXG5cdFx0aGFuZGxlU2Nyb2xsYmFyID0gZnVuY3Rpb24odHlwZSl7XHJcblx0XHRcdHZhciBzY3JvbGxiYXJXaWR0aCA9IDA7XHJcblx0XHRcdGlmKHR5cGUgPT0gJ2hpZGUnKXtcclxuXHRcdFx0XHR2YXIgZnVsbFdpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XHJcblx0XHRcdFx0aWYgKCFmdWxsV2luZG93V2lkdGgpIHtcclxuXHRcdFx0XHRcdHZhciBkb2N1bWVudEVsZW1lbnRSZWN0ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cdFx0XHRcdFx0ZnVsbFdpbmRvd1dpZHRoID0gZG9jdW1lbnRFbGVtZW50UmVjdC5yaWdodCAtIE1hdGguYWJzKGRvY3VtZW50RWxlbWVudFJlY3QubGVmdCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGlmKGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGggPCBmdWxsV2luZG93V2lkdGgpe1xyXG5cdFx0XHRcdFx0dmFyIHNjcm9sbERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxyXG5cdFx0XHRcdFx0cGFkZGluZyA9IHBhcnNlSW50KCQoJ2JvZHknKS5jc3MoJ3BhZGRpbmctcmlnaHQnKSwxMCk7XHJcblx0XHRcdFx0XHRzY3JvbGxEaXYuY2xhc3NOYW1lID0gJ3NsLXNjcm9sbGJhci1tZWFzdXJlJztcclxuXHRcdFx0XHRcdCQoJ2JvZHknKS5hcHBlbmQoc2Nyb2xsRGl2KTtcclxuXHRcdFx0XHRcdHNjcm9sbGJhcldpZHRoID0gc2Nyb2xsRGl2Lm9mZnNldFdpZHRoIC0gc2Nyb2xsRGl2LmNsaWVudFdpZHRoO1xyXG5cdFx0XHRcdFx0JChkb2N1bWVudC5ib2R5KVswXS5yZW1vdmVDaGlsZChzY3JvbGxEaXYpO1xyXG5cdFx0XHRcdFx0JCgnYm9keScpLmRhdGEoJ3BhZGRpbmcnLHBhZGRpbmcpO1xyXG5cdFx0XHRcdFx0aWYoc2Nyb2xsYmFyV2lkdGggPiAwKXtcclxuXHRcdFx0XHRcdFx0JCgnYm9keScpLmFkZENsYXNzKCdoaWRkZW4tc2Nyb2xsJykuY3NzKHsncGFkZGluZy1yaWdodCc6cGFkZGluZytzY3JvbGxiYXJXaWR0aH0pO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ2hpZGRlbi1zY3JvbGwnKS5jc3MoeydwYWRkaW5nLXJpZ2h0JzokKCdib2R5JykuZGF0YSgncGFkZGluZycpfSk7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIHNjcm9sbGJhcldpZHRoO1xyXG5cdFx0fTtcclxuXHJcblx0Ly8gZXZlbnRzXHJcblx0c2V0dXAoKTtcclxuXHJcblx0Ly8gb3BlbiBsaWdodGJveFxyXG5cdG9iamVjdHMub24oICdjbGljay4nK3ByZWZpeCwgZnVuY3Rpb24oIGUgKXtcclxuXHRcdGlmKGlzVmFsaWRMaW5rKHRoaXMpKXtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRpZihhbmltYXRpbmcpIHJldHVybiBmYWxzZTtcclxuXHRcdFx0b3BlbkltYWdlKCQodGhpcykpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHQvLyBjbG9zZSBvbiBjbGljayBvbiBkb2NcclxuXHQkKCBkb2N1bWVudCApLm9uKCdjbGljay4nK3ByZWZpeCsgJyB0b3VjaHN0YXJ0LicrcHJlZml4LCBmdW5jdGlvbihlKXtcclxuXHRcdGlmKG9wZW5lZCl7XHJcblx0XHRcdGlmKChvcHRpb25zLmRvY0Nsb3NlICYmICQoZS50YXJnZXQpLmNsb3Nlc3QoJy5zbC1pbWFnZScpLmxlbmd0aCA9PT0gMCAmJiAkKGUudGFyZ2V0KS5jbG9zZXN0KCcuc2wtbmF2aWdhdGlvbicpLmxlbmd0aCA9PT0gMCkpe1xyXG5cdFx0XHRcdGNsb3NlKCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0Ly8gZGlzYWJsZSByaWdodGNsaWNrXHJcblx0aWYob3B0aW9ucy5kaXNhYmxlUmlnaHRDbGljayl7XHJcblx0XHQkKCBkb2N1bWVudCApLm9uKCdjb250ZXh0bWVudScsICcuc2wtaW1hZ2UgaW1nJywgZnVuY3Rpb24oZSl7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblxyXG5cdC8vIGtleWJvYXJkLWNvbnRyb2xcclxuXHRpZiggb3B0aW9ucy5lbmFibGVLZXlib2FyZCApe1xyXG5cdFx0JCggZG9jdW1lbnQgKS5vbiggJ2tleXVwLicrcHJlZml4LCB0aHJvdHRsZShmdW5jdGlvbiggZSApe1xyXG5cdFx0XHRzd2lwZURpZmYgPSAwO1xyXG5cdFx0XHQvLyBrZXlib2FyZCBjb250cm9sIG9ubHkgaWYgbGlnaHRib3ggaXMgb3BlblxyXG5cdFx0XHRpZihvcGVuZWQpe1xyXG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHR2YXIga2V5ID0gZS5rZXlDb2RlO1xyXG5cdFx0XHRcdGlmKCBrZXkgPT0gMjcgKSB7XHJcblx0XHRcdFx0XHRjbG9zZSgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZigga2V5ID09IDM3IHx8IGUua2V5Q29kZSA9PSAzOSApIHtcclxuXHRcdFx0XHRcdGxvYWRJbWFnZSggZS5rZXlDb2RlID09IDM5ID8gMSA6IC0xICk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9LCBvcHRpb25zLnRocm90dGxlSW50ZXJ2YWwpKTtcclxuXHR9XHJcblxyXG5cdC8vIFB1YmxpYyBtZXRob2RzXHJcblx0dGhpcy5vcGVuID0gZnVuY3Rpb24oZWxlbSl7XHJcblx0XHRlbGVtID0gZWxlbSB8fCAkKHRoaXNbMF0pO1xyXG5cdFx0b3BlbkltYWdlKGVsZW0pO1xyXG5cdH07XHJcblxyXG5cdHRoaXMubmV4dCA9IGZ1bmN0aW9uKCl7XHJcblx0XHRsb2FkSW1hZ2UoIDEgKTtcclxuXHR9O1xyXG5cclxuXHR0aGlzLnByZXYgPSBmdW5jdGlvbigpe1xyXG5cdFx0bG9hZEltYWdlKCAtMSApO1xyXG5cdH07XHJcblxyXG5cdHRoaXMuY2xvc2UgPSBmdW5jdGlvbigpe1xyXG5cdFx0Y2xvc2UoKTtcclxuXHR9O1xyXG5cclxuXHR0aGlzLmRlc3Ryb3kgPSBmdW5jdGlvbigpe1xyXG5cdFx0JCggZG9jdW1lbnQgKS5vZmYoJ2NsaWNrLicrcHJlZml4KS5vZmYoJ2tleXVwLicrcHJlZml4KTtcclxuXHRcdGNsb3NlKCk7XHJcblx0XHQkKCcuc2wtb3ZlcmxheSwgLnNsLXdyYXBwZXInKS5yZW1vdmUoKTtcclxuXHRcdHRoaXMub2ZmKCdjbGljaycpO1xyXG5cdH07XHJcblxyXG5cdHRoaXMucmVmcmVzaCA9IGZ1bmN0aW9uKCl7XHJcblx0XHR0aGlzLmRlc3Ryb3koKTtcclxuXHRcdCQodGhpcykuc2ltcGxlTGlnaHRib3gob3B0aW9ucyk7XHJcblx0fTtcclxuXHJcblx0cmV0dXJuIHRoaXM7XHJcblxyXG59O1xyXG59KSggalF1ZXJ5LCB3aW5kb3csIGRvY3VtZW50ICk7XHJcblxyXG4vLyDQk9Cw0LvQtdGA0LXRjyJdLCJmaWxlIjoibWFpbi5qcyJ9
