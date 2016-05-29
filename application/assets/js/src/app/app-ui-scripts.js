$(document).ready(function (e) {
    var $header = $('#hd');

    // alerts
    $header.on('click', '.app-alerts', function(){
        $(this).toggleClass('is-alerts-visible');
    });

    // submenu
    $header.on('click', '.admin', function (e) {
		$(this).toggleClass('active');
		$(this).find('.sub-nav').slideToggle();
		$(this).find('.sub-nav').toggleClass('collapse');
	});

    $header.on('mouseleave', '.admin', function (e) {
		$(this).find('.sub-nav').slideUp();
		$(this).find('.sub-nav').removeClass('collapse');
		$($(this)).removeClass('active');
    });

    $header.on('click', '.nav a', function (e) {
		e.preventDefault();
	});


    /* mobile specific */
    $header.on('click', '.m-menu', function (e) {
        // toggle navigation
        $(this).toggleClass('active');
        $('.main-nav').toggleClass('expand');
    });

    /*Start of closing error window event*/
    $('.msg-container').on('click', '.close-btn', function (e) {
        $(this).closest('.msg-container').animate({
            bottom: -($('.msg-container').height() + 20)
        }, function () { $('.msg-container').empty(); });
    });
    /*End of closing error window event*/

});
