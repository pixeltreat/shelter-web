define(['Boiler', 'text!./responseError.htm', 'text!./responseSuccess.htm', 'text!./validationTmpl.htm'], function (Boiler, responseErrTempl, responseSuccTempl, validationTempl) {

    var Component = function (moduleContext) {
        var panel = null;


        $(document).bind($ct.en.getGoToNoPermissionPage(), function (e) {


            moduleContext.notify($ct.en.getDoNotHavePermission(), null);
            Boiler.UrlController.goTo($ct.rn.getNoPermission());
            $ct.helpers.hidePageBusyCursor();
            $ct.helpers.hideWorkAreaBusyCursor();
            return;



        });


        moduleContext.listen($ct.en.getShowValidationMsg(), function (validationMsg) {

            if (validationMsg === null || validationMsg === undefined) {
                $ct.helpers.displayAlertWindow("Please send validation message");
            }

            var vm = kendo.observable(
                {
                    message: validationMsg
                });

            $ct.helpers.sucessMsgShow(validationTempl, vm);

        });


        moduleContext.listen($ct.en.getShowSuccMsg(), function (succMsg) {

            if (succMsg === null || succMsg === undefined) {
                $ct.helpers.displayAlertWindow("Please send succ message");
            }

            var vm = kendo.observable(
                {
                    message: succMsg
                });

            $ct.helpers.sucessMsgShow(responseSuccTempl, vm);

        });

        $(document).bind($ct.en.getShowErrorMsgJS(), function (e) {


            if (e.errorObj === null || e.errorObj === undefined) {
                $ct.helpers.displayAlertWindow("Please send error object");
            }

            var vm = kendo.observable(
                {
                    message: e.errorObj.message 
                });

            $ct.helpers.errorMsgShow(responseErrTempl, vm);

        });


        moduleContext.listen($ct.en.getShowErrorMsg(), function (errorObject) {

            if (errorObject === null || errorObject === undefined) {
                $ct.helpers.displayAlertWindow("Please send error object");
            }

            if (errorObject.message === null || errorObject.message === undefined) {
                $ct.helpers.displayAlertWindow("Please send error message");
            }

            var vm = kendo.observable(
                {
                    message: errorObject.message
                });

            $ct.helpers.errorMsgShow(responseErrTempl, vm);

        });

        moduleContext.listen($ct.en.getHideErrorMsg(), function () {

            $ct.helpers.hideErrorMsgWindow();

        });


        this.activate = function (parent) {
            if (panel) {
                //	panel = new Boiler.ViewTemplate(parent, template);
                panel.show();
            }

        };

        this.deactivate = function () {
            if (panel) {
                panel.hide();
            }
        };
    };

    return Component;
}); 