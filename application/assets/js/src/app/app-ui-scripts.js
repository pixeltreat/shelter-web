/**
* root HTML element
* @type {object}
*/
var rootEle = document.documentElement;

// media queries, to keep this wrapped in a IIFE so that we can move out later.
(function(w){
    w.mediaQuery = w.mediaQuery || {};
    w.device     = w.device || {};
    var BP;

    // check if match media api avaible on this browser to avoid throwing errors
    if(!Modernizr && !Modernizr.mq && !Modernizr.touch){
        return;
    }

    BP = {
        'TABLET'    : '(max-width  : 1024px)',
        'MOBILE'    : '(max-width  : 800px)',
        'XMOBILE'   : '(max-width  : 480px)',
        'LANDSCAPE' : '(orientation: landscape)',
        'PORTRAIT'  : '(orientation: portrait)'
    };

    // check for media query passed
    mediaQuery.is = function (key) {
        return Modernizr.mq(BP[key]);
    };

    // device check
    device.has = function(key) {
        return Modernizr[key];
    };

    return mediaQuery;
})(window);

$(document).ready(function (e) {
    var $appHeader  = $('#hd');
    var $appContent = $('#bd');

    // alerts
    $appContent.on('click', '.app-alerts', alertsToggle);

    // navigation view toggle if tablet && landscape with touch
    if(device.has('touch')){
        $appHeader.on('click', '.main-menu', showNavPanel);
    }else {
        $appHeader.on({
            'mouseenter': showNavPanel,
            'mouseleave': hideNavPanel
        },'.main-menu');
    }

    // hide nav when close button clicked
    $appHeader.on('click', '.app-logo__menu-collapse', toggleNavPanel);

    // expand/collapse navigation
    $appHeader.on('click', '.app-nav__main__li.has-subnav', toggleMainNavActive);

    // active class for selected subnav
    $appHeader.on('click', '.app-nav__sub__li', toggleSubNavActive);
});

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
function showNavPanel(e) {
    var focusedElement = document.activeElement;
    $(rootEle).addClass('has-nav-expanded');

    // if focused element not found, exit from here, because no further execution is needed.
    if(!focusedElement){
        return;
    }

    // hack to avoid cursor overlap in IE
    if (focusedElement.nodeName === 'TEXTAREA' || focusedElement.nodeName === 'INPUT') {
        focusedElement.blur();
    }
}

/**
 * hide navigation panel
 */
function hideNavPanel() {
    $(rootEle).removeClass('has-nav-expanded');
}

/**
 * Toggle navigation section
 */
function toggleNavPanel() {
    $(rootEle).toggleClass('has-nav-expanded');
}

/**
 * Main nav active state toggle
 * @param  {Object} event
 */
function toggleMainNavActive(event) {
    var $ele               = $(event.currentTarget);
    var mainNavActiveClass = 'is-mainnav-active';
    var isActive           = $ele.hasClass(mainNavActiveClass);

    // if the main menu already has active class remove
    if (isActive) {
        resetMainSubNavState(mainNavActiveClass);
    } else {
        resetMainSubNavState(mainNavActiveClass);

        // add active class to current element
        $ele.addClass(mainNavActiveClass);
    }
}

/**
 * remove active class from main nav and subnav
 * @param {string} mainNavActiveClass
 */
function resetMainSubNavState(mainNavActiveClass) {
    var subNavActiveClass  = 'is-subnav-active';
    var $mainNav           = $('.app-nav__main__li');
    var $subNav            = $('.app-nav__sub__li');

    $mainNav.removeClass(mainNavActiveClass);
    $subNav.removeClass(subNavActiveClass);
}

/**
 * Subnav active state update based on clicked element
 * @param  {Object} event
 */
function toggleSubNavActive(event) {
    var $ele               = $(event.currentTarget);
    var subNavActiveClass  = 'is-subnav-active';
    var $subNavSiblings    = $ele.siblings('.'+subNavActiveClass);

    event.stopPropagation();

    // remove active class from siblings
    $subNavSiblings.removeClass(subNavActiveClass);

    // add active class to current element
    $ele.addClass(subNavActiveClass);
}
