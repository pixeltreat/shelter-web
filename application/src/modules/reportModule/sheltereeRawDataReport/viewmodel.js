define(["Boiler", 'text!./help/help.html'], function (Boiler, helpTmpl) {

    var ViewModel = function (moduleContext) {

        var vm = kendo.observable({

            pageName: "Staff Raw Data Report  page",

            helpClick: function (e) {

                var panel = new Boiler.ViewTemplate(null, helpTmpl, null);
                $ct.helpers.displayWindow(panel);
            },
            initialLoad: false,

            dsShelters: [],
            dsEvents: [],

            snapShotDate: null,

            initialize: function () {

                vm.set("initialLoad", true);
                $ct.helpers.clearValidations("vwSheltereeRawDataReport");

                moduleContext.notify($ct.en.getHideErrorMsg());
                $ct.helpers.hidePageBusyCursor();
                $ct.helpers.displayWorkAreaBusyCursor();

                $ct.ds.reports.getLookupsForSheltereeRawDataReport(function (result) {

                    var resultData = result.Data;

                    var sheltersLookup = resultData.ShelterLookUp;

                    $.each(sheltersLookup, function (index, record) {

                        record.IsSelected = false;

                    });

                    var eventsLookup = resultData.EventLookUp;

                    $.each(eventsLookup, function (index, record) {

                        record.IsSelected = false;

                    });

                    vm.set("dsShelters", sheltersLookup);
                    vm.set("dsEvents", eventsLookup);
                    vm.set("snapShotDate", null);


                    $ct.helpers.hideWorkAreaBusyCursor();
                });
            },

            setValidationMsgForShelters: function () {

                if (vm.get("initialLoad")) {
                    return true;
                }

                var atLeastOneSelected = false;
                $.each(vm.get("dsShelters"), function (mainIndex, mainRec) {

                    if (mainRec.IsSelected) {
                        atLeastOneSelected = true;
                    }
                });

                return atLeastOneSelected;

            },

            setValidationMsgForEvents: function () {

                if (vm.get("initialLoad")) {
                    return true;
                }

                var atLeastOneSelected = false;
                $.each(vm.get("dsEvents"), function (mainIndex, mainRec) {

                    if (mainRec.IsSelected) {
                        atLeastOneSelected = true;
                    }
                });

                return atLeastOneSelected;

            },

            //validates and sets right values in start and end date fields
            setDates: function () {

                if (vm.get("snapShotDate") == "" || vm.get("snapShotDate") == null) {
                    vm.set("snapShotDate", "");
                    vm.set("snapShotDate", null);
                }
            },

            isSnapShotDateValid: function () {

                if (vm.get("initialLoad")) {
                    return true;
                }

                var rptDate = vm.get("snapShotDate");

                if ((rptDate == "") || (rptDate == null)) {
                    return false;
                }

                return true;

            },


            btnSheltereeRawDataReportClick: function () {

                vm.set("initialLoad", false);

                vm.setDates();

                moduleContext.notify($ct.en.getHideErrorMsg());

                var validator = $("#vwSheltereeRawDataReport").kendoValidator().data("kendoValidator");
                if ((!validator.validate())) {
                    moduleContext.notify($ct.en.getShowValidationMsg(), $ct.msg.getValidationMsg());

                    return;
                }

                if (!vm.isSnapShotDateValid()) {

                    moduleContext.notify($ct.en.getShowValidationMsg(), $ct.msg.getValidationMsg());
                    return;
                }


                var selectedShelterIds = [];
                var selectedEventIds = [];

                var atLeastOneSelected = false;

                $.each(vm.dsShelters, function (mainIndex, mainRec) {

                    if (mainRec.IsSelected) {
                        atLeastOneSelected = true;
                        selectedShelterIds.push(mainRec);
                    }

                });

                if (!atLeastOneSelected) {
                    moduleContext.notify($ct.en.getShowValidationMsg(), $ct.msg.getReportSheltersValidationMsg());
                    return;
                }

                var atLeastOneSelected1 = false;

                $.each(vm.dsEvents, function (mainIndex, mainRec) {

                    if (mainRec.IsSelected) {
                        atLeastOneSelected1 = true;
                        selectedEventIds.push(mainRec);
                    }

                });

                if (!atLeastOneSelected1) {
                    moduleContext.notify($ct.en.getShowValidationMsg(), $ct.msg.getReportEventsValidationMsg());
                    return;
                }
                var objectForExcel = {};

                objectForExcel.SanpshotDate = kendo.toString(new Date(vm.snapShotDate), "yyyy-MM-ddTHH:mm:ss");
                objectForExcel.SelectedShelterLookUp = selectedShelterIds;
                objectForExcel.SelectedEventLookUp = selectedEventIds;
                $ct.helpers.displayWorkAreaBusyCursor();

                $ct.ds.reports.genarateSheltereeRawDataReport(objectForExcel, function (result) {

                    $ct.helpers.hideWorkAreaBusyCursor();

                    if (result.Data.DownloadUrl != undefined) {
                        window.location.href = result.Data.DownloadUrl;
                    }
                    else {
                        var errorObj = $ct.mt.getErrorObject(result);
                        if (errorObj != null) {
                            moduleContext.notify($ct.en.getShowErrorMsg(), errorObj);
                        }
                    }
                });
            }

        });



        //end of observable

        return {
            data: vm
        };

    };

    return ViewModel;
});
