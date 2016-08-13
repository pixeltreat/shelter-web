define(["Boiler", 'text!./help/help.html'], function (Boiler, helpTmpl) {

    var ViewModel = function (moduleContext) {

        var vm = kendo.observable({

            pageName: "Event edit page",

            helpClick: function (e) {

                var panel = new Boiler.ViewTemplate(null, helpTmpl, null);
                $ct.helpers.displayWindow(panel);
            },

            eventData: {},

            initialLoad: false,

            DescriptionLength: 8000,


            eventId: "",


            fillQueryParam: function (param) {

                vm.set("eventId", param.id);
            },

            initialize: function () {

                vm.set("initialLoad", true);
                $ct.helpers.clearValidations("vwEvent");

                moduleContext.notify($ct.en.getHideErrorMsg());
                $ct.helpers.displayWorkAreaBusyCursor();

                $ct.ds.admin.event.getEventById(this.eventId, function (result) {

                    var resultData = result.Data;

                    if (resultData.Event === null) {

                        resultData.Event = {};
                        resultData.Event.Id = $ct.constants.getNewRecordId();
                        resultData.Event.EventName = "";
                        resultData.Event.EventDescription = "";
                        resultData.Event.StartDate = null;
                        resultData.Event.EndDate = null;
                    }

                    else {
                        resultData.Event.StartDate = kendo.parseDate(resultData.Event.StartDate, "yyyy-MM-ddTHH:mm:s");
                        resultData.Event.EndDate = kendo.parseDate(resultData.Event.EndDate, "yyyy-MM-ddTHH:mm:s");
                    }


                    vm.set("eventData", resultData);


                    $ct.helpers.hideWorkAreaBusyCursor();
                });
            },


            trimWhiteSpaces: function () {

                this.eventData.Event.set("EventName", $.trim(this.eventData.Event.EventName));
                this.eventData.Event.set("EventDescription", $.trim(this.eventData.Event.EventDescription));

            },


            //validates and sets right values in start and end date fields
            setDates: function () {

                if (vm.get("eventData.Event.StartDate") == "" || vm.get("eventData.Event.StartDate") == null) {
                    vm.get("eventData.Event.StartDate", "");
                    vm.get("eventData.Event.StartDate", null);
                }

                if (vm.get("eventData.Event.EndDate") == "" || vm.get("eventData.Event.EndDate") == null) {
                    vm.get("eventData.Event.EndDate", "");
                    vm.get("eventData.Event.EndDate", null);
                }
            },

            isStartDateValid: function () {

                if (vm.get("initialLoad")) {
                    return true;
                }

                var startdDt = vm.get("eventData.Event.StartDate");

                if ((startdDt == "") || (startdDt == null)) {
                   
                    return false;
                }

                return true;

            },


            isEndDateValid: function () {

                if (vm.get("initialLoad")) {
                    return true;
                }

                var enddDt = vm.get("eventData.Event.EndDate");

                if ((enddDt == "") || (enddDt == null)) {
                    return false;
                }

                return true;

            },


            isstartDateEndDateValidation: function () {

                if (vm.get("initialLoad")) {
                    return true;
                }

                var startdDt = vm.get("eventData.Event.StartDate");

                if ((startdDt == "") || (startdDt == null)) {
                    return true;
                }

                var enddDt = vm.get("eventData.Event.EndDate");

                if ((enddDt == "") || (enddDt == null)) {
                    return true;
                }

                if (startdDt < enddDt) {
                    return true;
                }
                else {
                    return false;
                }
            },




            btnSaveClick: function () {

                this.trimWhiteSpaces();
                vm.set("initialLoad", false);

                vm.setDates();

                moduleContext.notify($ct.en.getHideErrorMsg());

                var validator = $("#vwEvent").kendoValidator().data("kendoValidator");
                if ((!validator.validate())) {
                    moduleContext.notify($ct.en.getShowValidationMsg(), $ct.msg.getValidationMsg());

                    return;
                }

                if (!vm.isStartDateValid()) {
                    moduleContext.notify($ct.en.getShowValidationMsg(), $ct.msg.getValidationMsg());

                    return;
                }

                if (!vm.isEndDateValid()) {
                    moduleContext.notify($ct.en.getShowValidationMsg(), $ct.msg.getValidationMsg());

                    return;
                }


                if (!vm.isstartDateEndDateValidation()) {
                    moduleContext.notify($ct.en.getShowValidationMsg(), $ct.msg.getStartDateEndDateValidationMsg());

                    return;
                }

                var saveEventData = vm.eventData.toJSON();

                saveEventData.Event.StartDate = kendo.toString(new Date(vm.eventData.Event.StartDate), "yyyy-MM-ddTHH:mm:ss");
                saveEventData.Event.EndDate = kendo.toString(new Date(vm.eventData.Event.EndDate), "yyyy-MM-ddTHH:mm:ss");

                $ct.helpers.displayWorkAreaBusyCursor();

                $ct.ds.admin.event.saveEvent(saveEventData, function (data) {

                    $ct.helpers.hideWorkAreaBusyCursor();

                    if ($ct.mt.isVersionConflict(data)) {
                        if ($ct.helpers.displayConfirmWindow($ct.msg.getVersionConflictReloadMsg())) {
                            vm.initialize();
                        }
                        return;
                    }
                   
                    if ($ct.mt.isConcurrentEvent(data)) {
                        var concurrentEventErrorObj = {};
                        concurrentEventErrorObj.message = $ct.msg.getConcurrentEventsValidationMsg();
                        moduleContext.notify($ct.en.getShowErrorMsg(), concurrentEventErrorObj);
                        return;
                    }

                    var errorObj = $ct.mt.getErrorObject(data);
                    if (errorObj != null) {
                        moduleContext.notify($ct.en.getShowErrorMsg(), errorObj);
                        return;
                    }
                    else {
                        moduleContext.notify($ct.en.getShowSuccMsg(), $ct.msg.getEventSuccessMsg());
                    }

                    moduleContext.notify($ct.en.getEventCreatedOrUpdated(), null);
                    Boiler.UrlController.goTo($ct.rn.getEventList());

                })

            },


            btnCancelClick: function () {

                moduleContext.notify($ct.en.getHideErrorMsg());

                moduleContext.notify($ct.en.getEventCreatedOrUpdated(), null);
                Boiler.UrlController.goTo($ct.rn.getEventList());
            }


            



        });



        //end of observable

        return {
            data: vm
        };

    };

    return ViewModel;
});
