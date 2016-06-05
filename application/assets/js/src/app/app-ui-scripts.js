$(document).ready(function (e) {
    var $appHeader  = $('#hd');
    var $appContent = $('#bd');

    // alerts
    $appContent.on('click', '.app-alerts', alertsToggle);

    // navigation view toggle
    $appHeader.on({
        'mouseenter': showNavPanel,
        'mouseleave': hideNavPanel
    });

    // hide nav when close button clicked
    $appHeader.on('click', '.app-logo__menu-collapse', hideNavPanel);
});

/**
 * root HTML element
 * @type {object}
 */
var rootEle = document.documentElement;

/**
 * Toggle alerts view on the page
 * @param  {object} e event
 */
function alertsToggle(e){
    var alertsEle = e.currentTarget;
    $(alertsEle).toggleClass('is-alerts-visible');
}

/**
 * show navigation panel
 */
function showNavPanel() {
    $(rootEle).addClass('has-nav-expanded');
}

/**
 * hide navigation panel
 */
function hideNavPanel() {
    $(rootEle).removeClass('has-nav-expanded');
}
