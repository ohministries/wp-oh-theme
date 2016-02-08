// (Slightly modified) SmartResize jQuery Plugin credit Paul Irish
// http://www.paulirish.com/2009/throttled-smartresize-jquery-event-handler/

(function($,sr){

    // debouncing function from John Hann
    // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
    var debounce = function (func, threshold, execAsap) {
        var timeout;

        return function debounced () {
            var obj = this, args = arguments;
            function delayed () {
                if (!execAsap)
                    func.apply(obj, args);
                timeout = null;
            }

            if (timeout)
                clearTimeout(timeout);
            else if (execAsap)
                func.apply(obj, args);

            timeout = setTimeout(delayed, threshold || 1000);
        };
    };
    // smartresize
    jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

})(jQuery,'smartresize');


jQuery(document).ready(function($) {
    $('.news .slider').unslider({
        nav: false,
        autoplay: true,
        delay: 7000,
        animation: 'fade',
        animateHeight: true
    });

    /* === Page Columns === */

    var text = $('.entry-content .text');

    if (text.length) {
        setColumns(text);

        $(window).smartresize(function() {
            setColumns(text);
        });
    }

    function setColumns(container) {
        container.removeClass('no-columns');

        var buffer = 200;
        var containerHeight = container.height() + buffer;
        var viewporHeight = $( window ).height();

        if (containerHeight > viewporHeight) {
            container.addClass('no-columns');
        }
    }

    /* === Page Gallery & Slider === */

    var slider = $('.images .slider');

    slider.unslider({
        nav: false,
        autoplay: true,
        animation: 'fade'
    });

    var container = $('.images');

    if (container.length) {
        var images = $('.gallery img');
        var gallery = $('.gallery');

        adjustImages(container, slider, gallery, text);

        $(window).smartresize(function() {
            adjustImages(container, slider, gallery, text);
        });
    }

    function adjustImages(container, slider, gallery, content) {
        var availableWidth = container.width();
        var galleryIsSidebar = content.hasClass('no-columns');

        if (availableWidth < 500 && !galleryIsSidebar) {
            slider.show();
            gallery.hide();
        } else {
            slider.hide();
            gallery.show();
        }
    }
});