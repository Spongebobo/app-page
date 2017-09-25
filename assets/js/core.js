/* -----------------------------------------------------------------------------

 Hajs - Hajs - Modern Multi-Purpose Landing Page Template

 File:           JS Core
 Version:        1.0
 Last change:    25/02/16
 Author:         Suelo

 -------------------------------------------------------------------------------- */

"use strict";

var $body = $('body'),
    // $header = $('#header'),
    $pageLoader = $('#page-loader'),
    $navToggle = $('#nav-toggle'),
    // $navMain = $('#nav-main'),
    $messengerToggle = $('[data-toggle="messenger"]'),
    $messenger = $('#messenger'),
    $navAdditionalToggle = $('[data-toggle="nav-additional"]'),
    $navAdditional = $('#nav-additional'),
    trueMobile;

var Core = {
    init: function() {
        this.Basic.init();
        this.Component.init();
    },
    Basic: {
        init: function() {
            this.mobileDetector();
            this.backgrounds();
            this.buttons();
            this.parallax();
            this.product();
            this.masonry();
            this.navigation();
            this.stickable();
        },
        animations: function() {
            // Animation - appear 
            $('.animated').appear(function() {
                $(this).each(function(){
                    var $target =  $(this);
                    var delay = $(this).data('animation-delay');
                    setTimeout(function() {
                        $target.addClass($target.data('animation')).addClass('visible')
                    }, delay);
                });
            });
        },
        backgrounds: function() {
            // Image
            $('.bg-image, .post.single .post-image').each(function(){
                var src = $(this).children('img').attr('src');
                $(this).css('background-image','url('+src+')').children('img').hide();
            });

            //Video 
            var $bgVideo = $('.bg-video');
            if($bgVideo) {
                $bgVideo.YTPlayer();
            }
            if($(window).width() < 1200 && $bgVideo) {
                $bgVideo.prev('.bg-video-placeholder').show();
                $bgVideo.remove()
            }
        },
        buttons: function() {
            $('.btn:not(.btn-submit)').each(function(){
                var html = $(this).html();
                $(this).html('<span>'+html+'</span>');
            });
        },
        parallax: function() {
            // Skroll
            if(!trueMobile){
                skrollr.init({
                    forceHeight: false
                });
            }
        },
        product: function() {

            // Product Feature
            $('.product-container .product-feature','#content').each(function(){
                var x = $(this).data('x');
                var y = $(this).data('y');
                $(this).css({
                    'top': y,
                    'left': x
                });
            });

        },
        masonry: function() {
            var $grid = $('.masonry','#content');

            $grid.masonry({
                columnWidth: '.masonry-sizer',
                itemSelector: '.masonry-item',
                percentPosition: true
            });

            $grid.imagesLoaded().progress(function() {
                $grid.masonry('layout');
            });

            $grid.on('layoutComplete', Waypoint.refreshAll());
        },
        mobileDetector: function () {
            var isMobile = {
                Android: function() {
                    return navigator.userAgent.match(/Android/i);
                },
                BlackBerry: function() {
                    return navigator.userAgent.match(/BlackBerry/i);
                },
                iOS: function() {
                    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
                },
                Opera: function() {
                    return navigator.userAgent.match(/Opera Mini/i);
                },
                Windows: function() {
                    return navigator.userAgent.match(/IEMobile/i);
                },
                any: function() {
                    return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
                }
            };

            trueMobile = isMobile.any();
        },
        navigation: function() {
            var headerHeight = $('#header').height(),
                $section = $('.section','#content'),
                scrollOffset = -headerHeight;

            var $scrollers = $('#nav-main, [data-local-scroll]');

            $scrollers.find('a').on('click', function(){
                $(this).blur();
            });

            $scrollers.localScroll({
                duration: 700
            });

            var $mainMenu = $('#nav-main'),
                $menuItem = $('#nav-main li > a'),
                mainMenuOffset = null,
                $selector = $mainMenu.children('.selector');

            var checkMenuItem = function(id) {
                $menuItem.each(function(){
                    var link = $(this).attr('href');
                    if(id==link) {
                        $(this).addClass('active');
                    }
                    else $(this).removeClass('active');
                });
            }

            $section.waypoint({
                handler: function(direction) {
                    if(direction=='up') {
                        var id = '#'+this.element.id;
                        if(id!='#') checkMenuItem(id);
                    }
                },
                offset: function() {
                    return -this.element.clientHeight+headerHeight;
                }
            });
            $section.waypoint({
                handler: function(direction) {
                    if(direction=='down') {
                        var id = '#'+this.element.id;
                        if(id!='#') checkMenuItem(id);
                    }
                },
                offset: function() {
                    return headerHeight;
                }
            });

            // Navigation Toggle 
            $navToggle.on('click', function(){
                $(this).toggleClass('open');
                //$body.toggleClass('nav-open');
                $('#list-panel').slideToggle();
                return false;
            });

            // Navigation Additional 
            $navAdditionalToggle.on('click', function(){
                $(this).toggleClass('active');
                $navAdditional.toggleClass('show');
                return false;
            });

            $navAdditional.on('click', function(e){
                e.stopPropagation();
            });
            
            //menuScroll
            $('.href-item>a').on('click',function () {
                $('html, body').stop().animate({scrollTop: $(this.hash).offset().top}, 1000);
                if(trueMobile){
                    $("#list-panel").slideUp();
                    $navToggle.removeClass('open');
                }
            });

        },
        stickable: function() {

            var $stickable = $('.stickable');

            if($stickable.length) {
                var stickableEl = new Waypoint.Sticky({
                    element: $stickable,
                    stuckClass: 'sticky'
                });
            }

        }
    },
    Component: {
        init: function() {
            this.carousel();
            this.forms();
            this.map();
            this.messenger();
            this.modal();
            this.twitter();
        },
        carousel: function() {

            $('.carousel').slick();

            $('.intro-1 .intro-carousel.intro-box-lg').slick({
                dots: true,
                fade: true,
                speed: 800,
                arrows: false,
                autoplay: true,
                autoplaySpeed: 3000,
                draggable: false,
                touchMove: false,
                pauseOnHover: false,
                pauseOnFocus: false,
                asNavFor: '.intro-1 .intro-carousel.intro-box-sm'
            });

            $('.intro-1 .intro-carousel.intro-box-sm').slick({
                dots: false,
                speed: 800,
                arrows: false,
                vertical: true,
                draggable: false,
                touchMove: false,
                asNavFor: '.intro-1 .intro-carousel.intro-box-lg'
            });

        },
        forms: function(){

            /* Notification Bar */
            var $notificationBar = $('#notification-bar'),
                $notificationClose = $('#notification-bar').find('.close');

            var showNotification = function(type,msg) {
                $notificationBar.html('<div class='+type+'>'+msg+'<a href="#" class="close"><i class="ti-close"></i></a></div>');
                setTimeout(function(){
                    $notificationBar.addClass('visible');
                }, 400);
                setTimeout(function(){
                    $notificationBar.removeClass('visible');
                }, 10000);
            };

            $body.delegate('#notification-bar .close','click', function(){
                closeNotification();
                return false;
            });

            var closeNotification = function() {
                $notificationBar.removeClass('visible');
            }

            /* Validate Form */
            $('.validate-form').each(function(){
                $(this).validate({
                    validClass: 'valid',
                    errorClass: 'error',
                    onfocusout: function(element,event) {
                        $(element).valid();
                    },
                    errorPlacement: function(error,element) {
                        return true;
                    },
                    rules: {
                        email: {
                            required    : true,
                            email       : true
                        }
                    }
                });
            });

            // Sign In
            var $signUpForm  = $('.sign-up-form');

            if($signUpForm.length>0) {

                $signUpForm.submit(function() {
                    var $btn = $(this).find('.btn-submit'),
                        $form = $(this),
                        response,
                        msgSuccess = $(this).data('message-success'),
                        msgError = $(this).data('message-error');

                    if ($form.valid()){
                        $btn.addClass('loading');
                        $.ajax({
                            type: $form.attr('method'),
                            url:  $form.attr('action'),
                            data: $form.serialize(),
                            cache       : false,
                            dataType    : 'jsonp',
                            jsonp: 'c',
                            contentType: "application/json; charset=utf-8",
                            error       : function(err) { setTimeout(function(){ $btn.addClass('error'); }, 1200); },
                            success     : function(data) {
                                if(data.result != 'success'){
                                    showNotification('error',msgError);
                                } else {
                                    showNotification('success',msgSuccess);
                                }
                                console.log(data);
                            },
                            complete: function(data) {
                                setTimeout(function(){
                                    $btn.removeClass('loading');
                                },1000);
                            }
                        });
                        return false;
                    }
                    return false;
                });

            }

            // Contact Form
            var $contactForm  = $('.contact-form');

            if($contactForm.length>0) {

                $contactForm.submit(function() {
                    var $btn = $(this).find('.btn-submit'),
                        $form = $(this),
                        response,
                        msgSuccess = $(this).data('message-success'),
                        msgError = $(this).data('message-error');

                    if ($form.valid()){
                        $btn.addClass('loading');
                        $.ajax({
                            type: 'POST',
                            url:  'assets/php/contact-form.php',
                            data: $form.serialize(),
                            error       : function(err) { setTimeout(function(){ $btn.addClass('error'); }, 1200); },
                            success     : function(data) {
                                if(data != 'success'){
                                    showNotification('error',msgError);
                                } else {
                                    showNotification('success',msgSuccess);
                                }
                            },
                            complete: function(data) {
                                $messengerToggle.removeClass('active');
                                $messenger.removeClass('show');
                                setTimeout(function(){
                                    $btn.removeClass('loading');
                                },1000);
                            }
                        });
                        return false;
                    }
                    return false;
                });

            }
        },
        map: function() {

            var $googleMap = $('#google-map');

            if($googleMap.length) {

                var yourLatitude = 40.758895;
                var yourLongitude = -73.985131;

                var pickedStyle = $googleMap.data('style');
                var wy = [{"featureType":"all","elementType":"geometry.fill","stylers":[{"weight":"2.00"}]},{"featureType":"all","elementType":"geometry.stroke","stylers":[{"color":"#9c9c9c"}]},{"featureType":"all","elementType":"labels.text","stylers":[{"visibility":"on"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#eeeeee"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#7b7b7b"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#46bcec"},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#c8d7d4"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#070707"}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]}];
                var apple = [{"featureType":"landscape.man_made","elementType":"all","stylers":[{"color":"#faf5ed"},{"lightness":"0"},{"gamma":"1"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#bae5a6"}]},{"featureType":"road","elementType":"all","stylers":[{"weight":"1.00"},{"gamma":"1.8"},{"saturation":"0"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"hue":"#ffb200"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"lightness":"0"},{"gamma":"1"}]},{"featureType":"transit.station.airport","elementType":"all","stylers":[{"hue":"#b000ff"},{"saturation":"23"},{"lightness":"-4"},{"gamma":"0.80"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#a0daf2"}]}];
                var dark = [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}];

                var mapOptions = {
                    zoom: 15,
                    center: {lat: yourLatitude, lng: yourLongitude},
                    mapTypeControl: false,
                    panControl: false,
                    zoomControl: true,
                    scaleControl: false,
                    streetViewControl: false,
                    scrollwheel: false,
                    styles: eval(pickedStyle)
                };

                var map = new google.maps.Map(document.getElementById('google-map'), mapOptions);
                var myLatLng = new google.maps.LatLng(yourLatitude,yourLongitude);
                var image = {
                    url: 'assets/img/location-pin.png',
                    anchor: new google.maps.Point(79, 115),
                };
                var myLocation = new google.maps.Marker({
                    position: myLatLng,
                    map: map,
                    icon: image
                });
            }
        },
        messenger: function() {

            $messengerToggle.on('click', function(){
                $(this).toggleClass('active');
                $messenger.toggleClass('show');
                return false;
            });

            $messenger.on('click', function(e){
                e.stopPropagation();
            });

        },
        modal: function() {
            $('.modal[data-timeout]').each(function(){
                var timeout = $(this).data('timeout'),
                    $this = $(this);
                setTimeout(function() {
                    $this.modal('show');
                }, timeout)
            });

            $('[data-toggle="video-modal"]').on('click', function() {
                var modal = $(this).data('target'),
                    video = $(this).data('video')

                $(modal + ' iframe').attr('src', video + '?autoplay=1');
                $(modal).modal('show');

                $(modal).on('hidden.bs.modal', function () {
                    var $modalContent = $(modal + ' .modal-content')
                    $(modal + ' iframe').remove();
                    $modalContent.html('<iframe height="500"></iframe>');
                })

                return false;
            });
        },
        tooltip: function() {
            $("[data-toggle='tooltip']").tooltip();
        },
        twitter: function() {
            if($('#twitter-feed').length) {
                var config = {
                    'profile': {"screenName": 'suelopl'},
                    'domId': 'twitter-feed',
                    'maxTweets': 2,
                    'enableLinks': true,
                    'showPermalinks': false,
                    'showUser': false,
                    'showInteraction': false,
                    'showTime': true,
                    'lang': 'en'
                };

                twitterFetcher.fetch(config);
            }
        }
    }
};

$(document).ready(function (){
    Core.init();
});

$(window).on('load', function(){
    $body.addClass('loaded');
    if($pageLoader.length != 0) {
        $pageLoader.fadeOut(600, function(){
            Core.Basic.animations();
        });
    } else {
        Core.Basic.animations();
    }
});

$(document).on('click', function (){
    $messengerToggle.removeClass('active');
    $messenger.removeClass('show');
    $navAdditionalToggle.removeClass('active');
    $navAdditional.removeClass('show');
});