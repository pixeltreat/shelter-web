//Pass in a reference to Core, just in case...
define(["Boiler", 'text!./ajaxError.htm', 'text!./scriptError.htm'], function (Boiler, ajaxErrorTempl, scriptErrorTempl) {

    $(document).ajaxError(function (event, xhr, settings) {


        var message = xhr.status + ' ' + xhr.statusText + ' ' + xhr.responseText;

        if (message == null)
            message = "";

        message = message + " At " + $ct.helpers.getCurrentTimeStamp();

        var vm = kendo.observable(
                {
                    message: message,
                    url: settings.url
                });


        $ct.helpers.errorMsgShow(ajaxErrorTempl, vm);

        $ct.helpers.hideWorkAreaBusyCursor();
        $ct.helpers.hidePageBusyCursor();

    });


    window.onerror = function (message, url, line) {

        if (message == null)
            message = "";

        message = message + " At " + $ct.helpers.getCurrentTimeStamp();

        var vm = kendo.observable(
                {
                    message: message,
                    url: url,
                    line: line
                });

        $ct.helpers.errorMsgShow(scriptErrorTempl, vm);
        $ct.helpers.hideWorkAreaBusyCursor();
        $ct.helpers.hidePageBusyCursor();
    };

});