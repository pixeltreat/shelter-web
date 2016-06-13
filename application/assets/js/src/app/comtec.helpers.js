$ct.helpers = function () {
    // caching message container DOM element
    var $messageHeader = $('.messages-container');

    // delay will be provided from HTML as a data attribute, so that no need to touch JS in future
    var messageDelay = ($messageHeader.data('delay-seconds') * 1000);

    /**
     * update message template and show/hide with delay
     * @param  {string} templateData HTML served as a string
     * @param  {object} viewModel view modal object
     */
    function updateMessages(templateData, viewModel) {
        // remove the existing template data from the container
        $messageHeader.empty();

        // append new template
        $($.trim(templateData)).appendTo($messageHeader);

        // bind it to viewModel
        kendo.bind($messageHeader, viewModel);

        // show and auto hide message after given time
        $messageHeader.addClass('is-visible');
        setTimeout(delayAndHideMessage, messageDelay);
    }

    /**
     * remove visible class from the message section after defined delay
     */
    function delayAndHideMessage() {
        $messageHeader.removeClass('is-visible');
    }

    var errorMsgShow = updateMessages;
    // function (errorTemplate, viewModel) {
    //     $('.messages-container').empty();
    //
    //     $($.trim(errorTemplate))
    //         .appendTo('.messages-container')
    //         .each(function () {
    //             $(this).closest('.messages-container').animate({
    //                 top: 0
    //             }, 800);
    //         });
    //
    //     var messageHeader = $('.messages-container');
    //     kendo.bind(messageHeader, viewModel);
    // };

    var sucessMsgShow = updateMessages;
    // function (succTemplate, viewModel) {
    //     $('.messages-container').empty();
    //     $($.trim(succTemplate))
    //         .appendTo('.messages-container')
    //         .each(function () {
    //             $(this).closest('.messages-container').animate({
    //                 top: 0
    //             }, 800);
    //         })
    //         .delay(4000)
    //         .queue(function () {
    //             $(this).closest('.messages-container').animate({
    //                 top: -($('.messages-container').height() + 20)
    //             }, function () {
    //                 $('.messages-container').empty();
    //             });
    //         });
    //
    //     var messageHeader = $('.messages-container');
    //     kendo.bind(messageHeader, viewModel);
    // };

    var hideErrorMsgWindow = function (errorTemplate, viewModel) {
        $messageHeader.empty();
    };

    var displayPageBusyCursor = function (msg) {
        $('#pageleveloverlay').show();
    };

    var hidePageBusyCursor = function (msg) {
        $('#pageleveloverlay').hide();
    };

    var displayWorkAreaBusyCursor = function (msg) {
        $('#workareaoverlay').show();
    };

    var hideWorkAreaBusyCursor = function (msg) {
        // To wait before hiding busy cursor.
        $('#workareaoverlay').hide();
    };

    var clearValidations = function (viewId) {
        viewId = '#' + viewId;
        $(viewId).find('.k-invalid-msg').hide();
        var domElement = $(viewId).find('.k-invalid');
        domElement.removeClass('k-invalid');
    };

    var displayAlertWindow = function (msg) {
        alert(msg);
    };

    var displayConfirmWindow = function (msg) {
        if (confirm(msg)) {
            return true;
        } else {
            return false;
        }
    };

    var displayWindow = function (template, windowTitle, viewModel) {
        var WindowElement = $('#commonWindow');
        WindowElement.html('');
        WindowElement.append(template.getJQueryElement());

        if (viewModel === undefined) {
            kendo.bind(WindowElement, kendo.observable({}));
        } else {
            kendo.bind(WindowElement, viewModel);
            if (viewModel.initialize !== undefined) {
                viewModel.initialize();
            }
        }

        WindowElement.show();

        var window = WindowElement.data('kendoWindow');

        if (windowTitle !== undefined) {
            window.title(windowTitle);
        }

        window.center().open();
    };

    var toLower = function (data) {
        return data.toLowerCase();
    };

    var toUpper = function (data) {
        return data.toUpperCase();
    };

    var executeFunctionByName = function (functionName, context, args) {
        args = Array.prototype.slice.call(arguments).splice(2);
        var namespaces = functionName.split('.');
        var func = namespaces.pop();
        for (var i = 0; i < namespaces.length; i++) {
            context = context[namespaces[i]];
        }
        return context[func].apply(this, args);
    };

    var getDateFromEpochDate = function (epochDate) {
        if (parseInt(epochDate))
            return new Date(epochDate * 1000);
    };

    var getTodaysDateWithMaxTime = function () {
        var todayDate = new Date();
        return new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate(), 23, 59, 0, 0);
    };

    var getCurrentTimeStamp = function () {
        var todayDate = new Date();

        return todayDate.getMonth() + 1 + '/' + todayDate.getDate() + '/' + todayDate.getFullYear() + ' ' + todayDate.getHours() + ':' + todayDate.getMinutes() + ':' + todayDate.getSeconds();
    };

    return {
        toLower: toLower,
        toUpper: toUpper,
        executeFunctionByName: executeFunctionByName,
        getDateFromEpochDate: getDateFromEpochDate,
        getTodaysDateWithMaxTime: getTodaysDateWithMaxTime,
        getCurrentTimeStamp: getCurrentTimeStamp,

        displayAlertWindow: displayAlertWindow,
        displayConfirmWindow: displayConfirmWindow,
        displayWindow: displayWindow,

        errorMsgShow: errorMsgShow,
        sucessMsgShow: sucessMsgShow,
        hideErrorMsgWindow: hideErrorMsgWindow,

        displayPageBusyCursor: displayPageBusyCursor,
        hidePageBusyCursor: hidePageBusyCursor,
        displayWorkAreaBusyCursor: displayWorkAreaBusyCursor,
        hideWorkAreaBusyCursor: hideWorkAreaBusyCursor,
        clearValidations: clearValidations
    };
}();
