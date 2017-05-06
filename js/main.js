//SLIDER
$('.tp-banner').revolution({
    delay: 4000,
    startheight: 616,
    navigationVAlign: "center",
    soloArrowLeftHOffset: 100,
    soloArrowLeftVOffset: 10,
    soloArrowRightHOffset: 100,
    soloArrowRightVOffset: 10,
    hideTimerBar: "on",
    hideArrowsOnMobile: "off",
    hideThumbs: 0
}); // Main Slider

var tb_container = $('.tp-banner-container');

$('.main-navigation').find('.courses-menu').hover(function () {
    tb_container.addClass('slider-overlay');
}, function () {
    tb_container.removeClass('slider-overlay');
});
$(function () {
    'use strict';
   
    var swipermw = $('.swiper-container.mousewheel').length ? true : false;
    var swiperkb = $('.swiper-container.keyboard').length ? true : false;
    var swipercentered = $('.swiper-container.center').length ? true : false;

    var swiperautoplay = $('.swiper-container').data('autoplay');
    var swiperinterval = $('.swiper-container').data('interval'),
            swiperinterval = swiperinterval ? swiperinterval : 4000;
    swiperautoplay = swiperautoplay ? swiperinterval : false;

    // SLIDESHOW
    var swiperSlideshow = $('.slideshow').swiper({
        autoplay: swiperautoplay,
        autoplayDisableOnInteraction: false,
        effect: 'fade',
        speed: 600,
        loop: true,
        simulateTouch: false,
        onSlideChangeStart: swiperCaption,
        mousewheelControl: swipermw,
        keyboardControl: swiperkb
    });
    // KENBURNS SLIDESHOW
    var swiperKenburns = $('.kenburns').swiper({
        autoplay: swiperautoplay,
        autoplayDisableOnInteraction: false,
        effect: 'fade',
        speed: 600,
        loop: true,
        simulateTouch: false,
        onSlideChangeStart: swiperCaption,
        mousewheelControl: swipermw,
        keyboardControl: swiperkb
    });
    // SLIDER
    var swiperSlider = $('.slider').swiper({
        autoplay: swiperautoplay,
        autoplayDisableOnInteraction: false,
        speed: 600,
        loop: true,
        onSlideChangeStart: swiperCaption,
        mousewheelControl: swipermw,
        keyboardControl: swiperkb
    });
    // HORIZONTAL SLIDER
    if ($('.horizontal-slider').length) {
        $('body').addClass('horizontal-slider-mode');
        // Chrome+Windows Fix
        $('.swiper-container .swiper-slide a').addClass('noswipe');
        $('.horizontal-slider').imagesLoaded(function () {
            var swiperHorizontal = $('.horizontal-slider').swiper({
                slidesPerView: 'auto',
                loop: true,
                loopedSlides: 5,
                noSwipingClass: 'noswipe',
                centeredSlides: swipercentered,
                mousewheelControl: swipermw,
                keyboardControl: swiperkb,
                onInit: lbFix
            });
        });
    }
    // LANDING PAGE SLIDESHOWS
    var swiperLanding = $('.landing-slideshow').swiper({
        autoplay: swiperautoplay,
        autoplayDisableOnInteraction: false,
        effect: 'fade',
        speed: 600,
        loop: true,
        simulateTouch: false,
        mousewheelControl: swipermw,
        keyboardControl: swiperkb
    });
    // GALLERY ORIGINAL
    var swiperGalleryTop = $('.gallery-original').swiper({
        autoplay: swiperautoplay,
        autoplayDisableOnInteraction: true,
        effect: 'fade',
        speed: 600,
        loop: false,
        simulateTouch: false,
        onInit: swiperCaption,
        onSlideChangeStart: swiperCaption,
        mousewheelControl: swipermw,
        keyboardControl: swiperkb
    });
    // GALLERY THUMBS
    var swiperGalleryThumbs = $('.gallery-thumbs').swiper({
        autoplayDisableOnInteraction: true,
        slidesPerView: 'auto',
        simulateTouch: false,
        slideToClickedSlide: true,
        centeredSlides: true
    });
    if (swiperGalleryTop && swiperGalleryThumbs) {
        swiperGalleryTop.params.control = swiperGalleryThumbs;
        swiperGalleryThumbs.params.control = swiperGalleryTop;
    }
    $('.gallery-thumbs').on('click', '.swiper-slide', function () {
        swiperGalleryTop.slideTo($(this).index(), 500);
    });

    var uncropped = $('.swiper-container.uncropped-slides');
    if (uncropped.length) {
        $(window).resize(function () {
            uncropped.css({
                'top': $('#header').height(),
                'bottom': $('#footer').height()
            });
        }).resize();
    }

    // SLIDER CAPTIONS
    function swiperCaption() {
        var el = $('.swiper-slide-active');
        var cap = el.attr('data-caption');
        var link = el.attr('data-link');
        if (cap)
            $('.active-slide-caption').stop().fadeOut(0).text(cap).fadeIn(900);
        if (link)
            $('.active-slide-caption').wrapInner('<a href="' + link + '">');
    }

    // CONTROLS
    swiperautoplay ? $('.swiper-play').addClass('hidden') : $('.swiper-pause').addClass('hidden');
    // Prev
    $('.controls-wrapper').on('click', '.swiper-prev', function () {
        $('.swiper-container')[0].swiper.slidePrev()
    });
    // Next
    $('.controls-wrapper').on('click', '.swiper-next', function () {
        $('.swiper-container')[0].swiper.slideNext()
    });
    // Play
    $('.controls-wrapper').on('click', '.swiper-play', function () {
        $('.swiper-container')[0].swiper.params.autoplay = swiperinterval;
        $('.swiper-container')[0].swiper.startAutoplay();
        $('.swiper-play, .swiper-pause').toggleClass('hidden');
    });
    // Pause
    $('.controls-wrapper').on('click', '.swiper-pause', function () {
        $('.swiper-container')[0].swiper.stopAutoplay();
        $('.swiper-play, .swiper-pause').toggleClass('hidden');
    });
    // FULLSCREEN MODE
    $('.controls-wrapper').on('click', '.expand', function () {
        if (!$('.controls-wrapper').hasClass('slider-expanded')) {
            $('body').addClass('slider-expanded');
            setTimeout(function () {
                $('.controls-wrapper').addClass('slider-expanded').find('.expand i').toggleClass('fa-expand fa-compress');
            }, 400);
        } else {
            $('.controls-wrapper').removeClass('slider-expanded').find('.expand i').toggleClass('fa-expand fa-compress');
            setTimeout(function () {
                $('body').removeClass('slider-expanded');
            }, 400);
        }
    });


    // YOUTUBE Background
    // ---------------------------------
    var ytMute = $('.youtube-bg').hasClass('muted') ? true : false;
    $('.youtube-bg').YTPlayer({
        mute: ytMute,
        showControls: false,
        showYTLogo: false,
        containment: 'self'
    });
    ytMute ? $('.yt-mute').addClass('hidden') : $('.yt-unmute').addClass('hidden');

    // YouTube Controls
    $('.controls-wrapper').on('click', '.yt-play', function () {
        $('.youtube-bg').YTPPlay();
        $('.yt-play, .yt-pause').toggleClass('hidden');
    });
    $('.controls-wrapper').on('click', '.yt-pause', function () {
        $('.youtube-bg').YTPPause();
        $('.yt-play, .yt-pause').toggleClass('hidden');
    });
    $('.controls-wrapper').on('click', '.yt-mute', function () {
        $('.youtube-bg').YTPMute();
        $('.yt-mute, .yt-unmute').toggleClass('hidden');
    });
    $('.controls-wrapper').on('click', '.yt-unmute', function () {
        $('.youtube-bg').YTPUnmute();
        $('.yt-mute, .yt-unmute').toggleClass('hidden');
    });

    // SIDESLIDE (controls hover animation)
    $.fn.hoverSide = function (e) {
        var $this = $(this);
        var l = $this.offset().left;
        var t = $this.offset().top;
        var w = $this.outerWidth();
        var h = $this.outerHeight();
        var x = e.pageX;
        var y = e.pageY;
        var fromLeft = x - l,
                fromRight = l + w - x,
                fromTop = y - t,
                fromBottom = t + h - y;
        var min = Math.min(fromLeft, fromRight, fromTop, fromBottom), $result;

        if (fromLeft == min) {
            $result = 'left';
        }
        else if (fromRight == min) {
            $result = 'right';
        }
        else if (fromTop == min) {
            $result = 'top';
        }
        else if (fromBottom == min) {
            $result = 'bottom';
        }
        return $result;
    };

    if (!$('html.touch').length) {
        $('.sideslide').each(function () {
            var $this = $(this), $rslt;
            $this.mouseenter(function (e) {
                $rslt = $this.hoverSide(e);
                $this.removeClass('top-out bottom-out left-out right-out');
                $this.addClass($rslt + '-in');
            });
            $this.mouseleave(function (e) {
                $rslt = $this.hoverSide(e);
                $this.removeClass('top-in bottom-in left-in right-in');
                $this.addClass($rslt + '-out');
            });
        });
    }

    // BACKGROUNDS
    $('[data-background]').each(function () {
        var bg = $(this).attr('data-background');
        if (bg.match('^rgb') || bg.match('^#')) {
            $(this).css('background-color', bg);
        } else {
            $(this).css('background-image', 'url(' + bg + ')');
        }
    });


    // PARALLAX BACKGROUNDS
    // ---------------------------------
    $.stellar({
        horizontalScrolling: false,
        responsive: true
    });
    // stellar fix - bg position on load
    if ($('[data-stellar-background-ratio]').length > 0) {
        setTimeout(function () {
            var st = $(window).scrollTop();
            $(window).scrollTop(st + 1);
            setTimeout(function () {
                $(window).scrollTop(st)
            }, 200)
        }, 200);
    }
    ;  

    // OWL CAROUSEL
    $('.owl-slider').each(function () {
        var $this = $(this),
                items = $this.data('items'),
                itemsTablet = $this.data('items-tablet'),
                itemsMobile = $this.data('items-mobile'),
                speed = $this.data('speed'),
                margin = $this.data('margin'),
                loop = $this.data('loop'),
                loop = loop != undefined ? loop : true,
                dots = $this.data('dots'),
                dots = dots != undefined ? dots : true,
                nav = $this.data('nav'),
                nav = nav != undefined ? nav : true,
                autoplay = $this.data('autoplay'),
                autoplay = autoplay != undefined ? autoplay : true,
                mousewheel = $this.data('mousewheel'),
                mousewheel = mousewheel != undefined ? mousewheel : false;
        $this.imagesLoaded(function () {
            $this.owlCarousel({
                dots: dots,
                nav: nav,
                loop: loop,
                autoplay: autoplay,
                smartSpeed: speed || 1000,
                dotsSpeed: 1000,
                navSpeed: 1000,
                autoHeight: true,
                responsive: {
                    0: {items: itemsMobile || itemsTablet || items || 1},
                    768: {items: itemsTablet || items || 1},
                    992: {items: items || 1}
                },
                margin: margin || 0
            });
        });
        // refresh height on resize
        $this.on('resized.owl.carousel', function (event) {
            $this.find('.owl-height').css('height', $this.find('.owl-item.active').height());
        });

        if (mousewheel) {
            $this.mousewheel(function (e) {
                if (e.deltaY < 0) {
                    $this.trigger('next.owl.carousel');
                } else {
                    $this.trigger('prev.owl.carousel');
                }
            });
        }

    });



    // EQUAL-HEIGHT COLUMNS
    // $(window).load(function() {
    $('.equal-height-cols').each(function () {
        var el = $(this).find('[class*="col-"]');
        el.imagesLoaded(function () {
            el.matchHeight({
                byRow: false
            });
        });
    });
    // })

    // FIX LIGHTBOX COUNT IN SWIPER LOOP MODE
    function lbFix() {
        if ($('.swiper-container a.expand').length) {
            $('.swiper-container .swiper-slide-duplicate').each(function () {
                var link = $(this).find('a.expand');
                var href = link.attr('href');
                link.removeAttr('data-rel').addClass('no-redirect');
                var originalLink = $(this).closest('.swiper-wrapper').find('.swiper-slide:not(.swiper-slide-duplicate) [data-rel^="lightcase"][href="' + href + '"]');
                link.click(function (e) {
                    e.preventDefault();
                    originalLink.click();
                });
            });
        }
    }

    // Lightbox
    $('[data-rel^=lightcase]').lightcase({
        maxWidth: 1100,
        maxHeight: 800
    });

    // Intense
    var intenseImages = document.querySelectorAll('.intense');
    if (intenseImages.length)
        Intense(intenseImages);

});


//WOW ANIMATION
new WOW({
    boxClass: 'wow', // default
    animateClass: 'animated', // default
    offset: 0, // default
    mobile: true, // default
    live: true        // default
}).init();

$(document).on("ready", function (e) {
    $('[data-toggle="tooltip"]').tooltip();
});


//SCROLL TO TOP
jQuery(document).ready(function ($) {
    // hide #back-top first
    $("#back-top").hide();

    // fade in #back-top
    $(function () {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 100) {
                $('#back-top').fadeIn();
            } else {
                $('#back-top').fadeOut();
            }
        });

        // scroll body to 0px on click
        $('#back-top a').click(function () {
            $('body,html').animate({
                scrollTop: 0
            }, 600);
            return false;
        });
    });
});
