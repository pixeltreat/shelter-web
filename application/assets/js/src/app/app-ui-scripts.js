$(document).ready(function (e) {
    var $appHeader  = $('#hd');
    var $appContent = $('#bd');

    // alerts
    $appContent.on('click', '.app-alerts', function(){
        $(this).toggleClass('is-alerts-visible');
    });

    // submenu
    $appHeader.on('click', '.admin', function (e) {
		$(this).toggleClass('active');
		$(this).find('.sub-nav').slideToggle();
		$(this).find('.sub-nav').toggleClass('collapse');
	});

    $appHeader.on('mouseleave', '.admin', function (e) {
		$(this).find('.sub-nav').slideUp();
		$(this).find('.sub-nav').removeClass('collapse');
		$($(this)).removeClass('active');
    });

    $appHeader.on('click', '.nav a', function (e) {
		e.preventDefault();
	});


    /* mobile specific */
    $appHeader.on('click', '.m-menu', function (e) {
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
