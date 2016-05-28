
(function ($) {
    $.fn.equalHeights = function (minHeight, maxHeight) {


        var windowWidth = $(window).width();

        if (windowWidth <= 760) {
            return;
        }

        tallest = (minHeight) ? minHeight : 0;
        this.each(function () {
            if ($(this).height() > tallest) {
                tallest = $(this).height();
            }
        });
        if ((maxHeight) && tallest > maxHeight) tallest = maxHeight;
        return this.each(function () {
            $(this).height(tallest).css("", "none");
        });
    }
})(jQuery);