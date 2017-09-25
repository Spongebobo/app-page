jQuery(document).ready(function($) {
    var sliders = [];
    var delay = 4000;
    var timerId;
    var remaining;
    var start;
    var current_playing;
    // restore user slider img and title or descriptions
    $("#rotate-slider").find("img").each(function() {
        this.className += " slider-hide";

        sliders.push({html: this})
    });
    // initialize the siliders
    function slider_init() {
        slider_display(sliders, 0);
        slider_loop(sliders, 4, delay);
    }
    // display 3 img at a time
    function slider_display(A, i) {
        current_playing = i;
        $('.toggle_row .toggle_title').removeClass('active');
        $('.toggle_row .toggle_title').eq(i).addClass('active');
        A[(i + A.length + 2) % A.length].html.className += " slider-hide";
        A[(i + A.length) % A.length].html.className = "slider-middle";
        A[(i + A.length - 1) % A.length].html.className = "slider-left-1";
        A[(i + A.length + 1) % A.length].html.className = "slider-right-1";

    }
    // slider
    function slider_loop(A, i, remaining) {
        start = new Date();
        if (i > 3) {
            i = 0;
        }
        timerId = setTimeout(function() {
            slider_display(A, i);
            slider_loop(A, i + 1, delay);
        }, remaining);
    }

    $("#rotate-slider").hover(function() {
        window.clearTimeout(timerId);
        remaining = delay - (new Date() - start);
        $("#rotate-slider>img").click(function() {
            current_playing = $(this).data('order');
            remaining = delay;
            slider_display(sliders, current_playing);
        });
    }, function() {
        slider_loop(sliders, current_playing, remaining);
        $("#slider-btn").hide();
    });

    $('.toggle_row').click(function () {
        window.clearTimeout(timerId);
        var order = $(this).find('.toggle_title').data('order');
        slider_display(sliders, order);
        slider_loop(sliders, order, delay);
    });

    $(".toggle_row").hover(function() {
        if($(this).find('.toggle_title').data('order')!=current_playing){
            $(this).find('.toggle_title').addClass('active');
        }
    }, function() {
        if($(this).find('.toggle_title').data('order')!=current_playing){
            $(this).find('.toggle_title').removeClass('active');
        }
    });


    // launch slider
    slider_init();
});