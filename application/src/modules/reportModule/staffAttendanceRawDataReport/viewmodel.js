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

            startDate: null,
            endDate: null,

            initialize: function () {

                vm.set("initialLoad", true);
                $ct.helpers.clearValidations("vwStaffAttendanceRawDataReport");

                moduleContext.notify($ct.en.getHideErrorMsg());
                $ct.helpers.displayWorkAreaBusyCursor();

                $ct.ds.reports.getLookupsForStaffAttendanceRawDataReport(function (result) {

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


                    vm.set("startDate", new Date());
                    vm.set("startDate", null);

                    vm.set("endDate", new Date());
                    vm.set("endDate", null);
                  
  

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
           
            setDates: function () {

                if (vm.get("startDate") == "" || vm.get("startDate") == null) {
                    vm.set("startDate", "");
                    vm.set("startDate", null);
                }

                if (vm.get("endDate") == "" || vm.get("endDate") == null) {
                    vm.set("endDate", "");
                    vm.set("endDate", null);
                }
            },

            isStratDateValid: function () {

                if (vm.get("initialLoad")) {
                    return true;
                }

                var rptDate = vm.get("startDate");

                if ((rptDate == "") || (rptDate == null)) {
                    return false;
                }

                return true;

            },
            isEndDateValid: function () {

                if (vm.get("initialLoad")) {
                    return true;
                }

                var rptDate = vm.get("endDate");

                if ((rptDate == "") || (rptDate == null)) {
                    return false;
                }

                return true;

            },

            isstartDateEndDateValidation: function () {

                if (vm.get("initialLoad")) {
                    return true;
                }

                var startdDt = vm.get("startDate");

                if ((startdDt == "") || (startdDt == null)) {
                    return true;
                }

                var enddDt = vm.get("endDate");

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



            btnStaffAttendanceRawDataReportClick: function () {

              

                vm.set("initialLoad", false);

                vm.setDates();

                moduleContext.notify($ct.en.getHideErrorMsg());

                var validator = $("#vwStaffAttendanceRawDataReport").kendoValidator().data("kendoValidator");
                if ((!validator.validate())) {
                    moduleContext.notify($ct.en.getShowValidationMsg(), $ct.msg.getValidationMsg());

                    return;
                }

                if (!vm.isStratDateValid()) {

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
                
                objectForExcel.StartDate = kendo.toString(new Date(vm.startDate), "yyyy-MM-ddTHH:mm:ss");
                objectForExcel.EndDate = kendo.toString(new Date(vm.endDate), "yyyy-MM-ddTHH:mm:ss");
                objectForExcel.SelectedShelterLookUp = selectedShelterIds;
                objectForExcel.SelectedEventLookUp = selectedEventIds;
                $ct.helpers.displayWorkAreaBusyCursor();

                $ct.ds.reports.genarateStaffAttendanceRawDataReport(objectForExcel, function (result) {

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
