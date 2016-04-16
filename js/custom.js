$(window).load(function() {

    "use strict";

    /*---------------------------------------*/
    /*	WOW FOR ANIMATION ON SCROLL
	/*---------------------------------------*/
    var wow = new WOW({
        mobile: false
    });
    wow.init();

    /*---------------------------------------*/
    /*	NAVIGATION
	/*---------------------------------------*/
    $('.main-navigation').onePageNav({
        changeHash: true,
        currentClass: 'not-active', /* CHANGE THE VALUE TO 'current' TO HIGHLIGHT CURRENT SECTION LINK IN NAV */
        scrollSpeed: 750,
        scrollThreshold: 0.5,
        filter: ':not(.external)'
    });

    /*---------------------------------------*/
    /*	STELLAR FOR BACKGROUND SCROLLING
	/*---------------------------------------*/

    $(window).stellar({
        horizontalScrolling: false,
        responsive: true
    });

});


$(window).resize(function() {

    "use strict";

    var ww = $(window).width();

    /* COLLAPSE NAVIGATION ON MOBILE AFTER CLICKING ON LINK */
    if (ww < 480) {
        $('.sticky-navigation a').on('click', function() {
            $(".navbar-toggle").click();
        });
    }
});

(function($) {

    "use strict";

    /**
     * Setup validate for contact form
     */
    
    // override jquery validate plugin defaults
    $.validator.setDefaults({
        highlight: function(element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function(element) {
            $(element).closest('.form-group').removeClass('has-error');
        },
        errorElement: 'span',
        errorClass: 'help-block',
        errorPlacement: function(error, element) {
            if(element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        }
    });
    $("#mc-embedded-subscribe-form").validate();


    /*---------------------------------------*/
    /*	MAILCHIMP
	/*---------------------------------------*/

    $("#mc-embedded-subscribe-form").submit(function(event) {
        event.preventDefault();
        if( $("#mc-embedded-subscribe-form").valid() ) {
            var xu = "http://trequant.us11.list-manage.com/subscribe/post?u=fe86b35e097ba5488fb759888&amp;id=eac61134d5";
            var url = xu.replace('/post?', '/post-json?').concat('&c=?');

            var data = {};
            var dataArray = $("#mc-embedded-subscribe-form").serializeArray();
            $.each(dataArray, function (index, item) {
                data[item.name] = item.value;
            });

            $(".mailchimp-buttons").hide();
            $(".mailchimp-processing").fadeIn(300);
            $('.mailchimp-error').fadeOut();
            $('.mailchimp-success').fadeOut();
            $('.mailchimp-network').fadeOut();


            $.ajax({
                url: url,
                data: $("#mc-embedded-subscribe-form").serializeArray(),
                dataType: 'jsonp',
                success: function( response ) {
                    $(".mailchimp-processing").fadeOut(300);
                    if (response.result === 'success') {
                        $('.mailchimp-success').fadeIn(1000);
                        $('.mailchimp-error').fadeOut(500);
                        $(".mailchimp-buttons").show();
                    } else if (response.result === 'error') {
                        $('.mailchimp-error').fadeIn(1000);
                        $('.mailchimp-success').fadeOut(500);
                        $(".mailchimp-buttons").show();
                    }
                },
                error: function () {
                    $(".mailchimp-processing").fadeOut(300);
                    $('.mailchimp-network').fadeIn(500);
                    $(".mailchimp-buttons").show();
                }
            });
        }
    });


    /*---------------------------------------*/
    /*	SMOOTH SCROLL FRO INTERNAL #HASH LINKS
	/*---------------------------------------*/

    $('a[href^="#"].inpage-scroll, .inpage-scroll a[href^="#"]').on('click', function(e) {
        e.preventDefault();

        var target = this.hash,
            $target = $(target);
        $('.main-navigation a[href="' + target + '"]').addClass('active');
        $('.main-navigation a:not([href="' + target + '"])').removeClass('active');
        $('html, body').stop().animate({
            'scrollTop': ($target.offset()) ? $target.offset().top : 0
        }, 900, 'swing', function() {
            window.location.hash = target;
        });
    });


    /*---------------------------------------*/
    /*	NAVIGATION AND NAVIGATION VISIBLE ON SCROLL
	/*---------------------------------------*/

    mainNav();
    $(window).scroll(function() {
        mainNav();
    });

    function mainNav() {
        var top = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        if (top > 40) $('.appear-on-scroll').stop().animate({
            "opacity": '1',
            "top": '0'
        });
        else $('.appear-on-scroll').stop().animate({
            "top": '-70',
            "opacity": '0'
        });

        if (top > 120) {
        $('.js-login').fadeOut(20);
        }
        else {
        $('.js-login').fadeIn(200);
            
        }
        
        if (top > 400) {
        $('.js-register').fadeIn(200);
        }
        else {
        $('.js-register').fadeOut(200);
            
        }
    
    }


    /*---------------------------------------*/
    /*  SCREENSHOT CAROUSEL
    /*---------------------------------------*/

    $("#screenshots").owlCarousel({
        nav: false,
        items: 1,
        thumbs: false,
        autoplay: true,
        autoplaySpeed: 600,
        dotsSpeed: 400,
        lazyLoad: true,
    });


    /**
     * Gallery carousel sec 4
     */
    
    var owl = $('#watchGallery');
    owl.owlCarousel({
        loop: true,
        items: 1,
        autoplay: true,
        autoplaySpeed: 600,
        lazyLoad: true,
        thumbs: true,
        thumbImage: true,
        thumbContainerClass: 'owl-thumbs',
        thumbItemClass: 'owl-thumb-item'
    });


    /*---------------------------------------*/
    /*	PLACEHOLDER FIX
	/*---------------------------------------*/
    //CREATE PLACEHOLDER FUNCTIONALITY IN IE
    $('[placeholder]').focus(function() {
        var input = $(this);
        if (input.val() == input.attr('placeholder')) {
            input.val('');
            input.removeClass('placeholder');
        }
    }).blur(function() {
        var input = $(this);
        if (input.val() == '' || input.val() == input.attr('placeholder')) {
            input.addClass('placeholder');
            input.val(input.attr('placeholder'));
        }
    }).blur();

    //ENSURE PLACEHOLDER TEEXT IS NOT SUBMITTED AS POST
    $('[placeholder]').parents('form').submit(function() {
        $(this).find('[placeholder]').each(function() {
            var input = $(this);
            if (input.val() == input.attr('placeholder')) {
                input.val('');
            }
        })
    });

    /*---------------------------------------*/
    /*	BOOTSTRAP FIXES
	/*---------------------------------------*/

    var oldSSB = $.fn.modal.Constructor.prototype.setScrollbar;
    $.fn.modal.Constructor.prototype.setScrollbar = function() {
        oldSSB.apply(this);
        if (this.scrollbarWidth) $('.navbar-fixed-top').css('padding-right', this.scrollbarWidth);
    }

    var oldRSB = $.fn.modal.Constructor.prototype.resetScrollbar;
    $.fn.modal.Constructor.prototype.resetScrollbar = function() {
        oldRSB.apply(this);
        $('.navbar-fixed-top').css('padding-right', '');
    }

    if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
        var msViewportStyle = document.createElement('style')
        msViewportStyle.appendChild(
            document.createTextNode(
                '@-ms-viewport{width:auto!important}'
            )
        )
        document.querySelector('head').appendChild(msViewportStyle)
    }



})(jQuery);

