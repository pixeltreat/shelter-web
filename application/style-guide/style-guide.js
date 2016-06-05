'use strict';
$(function() {
    var snippetToggle = $('.snippet-toggle'),
        snippets;

    createCodeSamples();
    scrollNav();

    $('.style-guide-nav').addClass('nav-animation');

    snippetToggle.on('click', function() {
        var $this = $(this);
        snippets = $this.closest('article').find('.gen-code-snippet');

        // toggle show/hide
        snippets.toggleClass('gen-code-visible');
        $this.toggleClass('is-active');
    });
});

/******************************************************/
//             Code snippet generation               //
/****************************************************/
function createCodeSamples() {
    var codeWrappers = document.querySelectorAll('.code-sample');

    for (var i = 0; i < codeWrappers.length; i++) {
        var codeWrapper = codeWrappers[i],
            clonedNodes = getClonedNonTextNodes(codeWrapper),
            parent = codeWrapper.parentNode,
            preElement = document.createElement('pre'),
            codeElement = document.createElement('code');

        // remove presentation attribute in the code snippets
        clonedNodes[0].removeAttribute('presentation');

        beautifyNodes(clonedNodes);

        for (var j = 0; j < clonedNodes.length; j++) {
            codeElement.appendChild(document.createTextNode(clonedNodes[j].outerHTML));

            if (j + 1 < clonedNodes.length) {
                codeElement.appendChild(document.createTextNode('\n'));
            }
        }

        preElement.appendChild(codeElement);
        preElement.classList.add('gen-code-snippet');
        preElement.classList.add('prettyprint');
        //preElement.classList.add('linenums');
        //preElement.classList.add('container');

        if (codeWrapper.nextSibling) {
            parent.insertBefore(preElement, codeWrapper.nextSibling);
        } else {
            parent.appendChild(preElement);
        }

        //var clearDiv = document.createElement('div');
        //clearDiv.classList.add('clear');
        //parent.insertBefore(preElement);
    }
}

function getClonedNonTextNodes(element) {
    var nonTextNodes = [];
    var childNodes = element.childNodes;

    for (var i = 0; i < childNodes.length; i++) {
        var childElement = childNodes[i];

        if (childElement.nodeType !== 3) {
            // Found a valid child element
            nonTextNodes.push(childElement.cloneNode(true));
        }
    }

    return nonTextNodes;
}

function beautifyNodes(elements) {
    for (var i = 0; i < elements.length; i++) {
        beautifyChildNode(elements[i], 0);
    }
}

function beautifyChildNode(element, depth) {
    var childNodes = element.childNodes;
    var singleIndent = '    ';
    var currentDepthSpacing = '';

    for (var i = 0; i < depth; i++) {
        currentDepthSpacing += singleIndent;
    }

    var nextDepthSpacing = currentDepthSpacing + singleIndent;

    for (var j = 0; j < childNodes.length; j++) {
        var childElement = childNodes[j];

        if (childElement.nodeType === 3) {
            // found a text node
            if (childElement.nodeValue.indexOf('\n') >= 0) {
                if (j + 1 < childNodes.length) {
                    childElement.nodeValue = '\n' + nextDepthSpacing;
                } else {
                    childElement.nodeValue = '\n' + currentDepthSpacing;
                }
            }
        } else {
            beautifyChildNode(childElement, depth + 1);
        }
    }
}

/******************************************************/
//  active state for visible element on the viewport //
/****************************************************/
function scrollNav() {
    $("nav a").click(function(e) {
        e.preventDefault();
        $('html,body').animate({
            scrollTop: ($(this.hash).offset().top - 100)
        }, 600);

    });

    var aChildren = $("nav li").find('a'),
        aArray = [];

    for (var i = 0; i < aChildren.length; i++) {
        var aChild = aChildren[i],
            ahref = $(aChild).attr('href');
        aArray.push(ahref);
    }

    $(window).scroll(function() {
        var windowPos = $(window).scrollTop(),
            windowHeight = $(window).height(),
            docHeight = $(document).height();

        for (var i = 0; i < aArray.length; i++) {
            var theID = aArray[i],
                divPos = $(theID).offset().top - 100,
                divHeight = $(theID).height();

            if (windowPos >= divPos && windowPos < (divPos + divHeight)) {
                $("a[href='" + theID + "']").addClass("is-active");
            } else {
                $("a[href='" + theID + "']").removeClass("is-active");
            }
        }

        if (windowPos + windowHeight == docHeight) {
            if (!$("nav li:last-child a").hasClass("is-active")) {
                var navActiveCurrent = $(".is-active").attr("href");
                $("a[href='" + navActiveCurrent + "']").removeClass("is-active");
                $("nav li:last-child a").addClass("is-active");
            }
        }
    });

    // back to top link
    $('.back-to-top a').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 600);
    });
}
