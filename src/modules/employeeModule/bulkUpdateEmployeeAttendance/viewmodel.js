define(["Boiler", 'text!./help/help.html'],
function (Boiler, helpTmpl) {

    var ViewModel = function (moduleContext) {

        var vm = kendo.observable({

            helpClick: function (e) {
                var panel = new Boiler.ViewTemplate(null, helpTmpl, null);
                $ct.helpers.displayWindow(panel);
            },


            StatusToLookUpData: [],
            selectedStatus: {},
            comment: "",
            initialLoad: false,


            initialize: function () {


                vm.set("initialLoad", true);
                vm.set("comment", "");

                var selectItem = {};
                selectItem.Key = -1;
                selectItem.Value = "--Select--";
              
                moduleContext.parentContext.StatusLookUpData.splice(0, 0, selectItem);
                vm.set("StatusToLookUpData", moduleContext.parentContext.StatusLookUpData);
                vm.set("selectedStatus", vm.StatusToLookUpData[0]);

            },

            btnUpdateClick: function () {

                vm.set("initialLoad", false);

                moduleContext.notify($ct.en.getHideErrorMsg());

                var bulkUpdateEmployeeAttendenceData = {};

                bulkUpdateEmployeeAttendenceData.ReportId = this.selectedStatus.Key;
                bulkUpdateEmployeeAttendenceData.Comment = this.comment;

                bulkUpdateEmployeeAttendenceData.FacilityId = moduleContext.parentContext.facilityId;
                bulkUpdateEmployeeAttendenceData.SelectedEmployeeIds = moduleContext.parentContext.dcRequestData.selectedEmployeeIds;
                bulkUpdateEmployeeAttendenceData.UnSelectedEmployeeIds = moduleContext.parentContext.dcRequestData.unSelectedEmployeeIds;
              
                bulkUpdateEmployeeAttendenceData.ShiftDate = moduleContext.parentContext.attendenceDate;
                bulkUpdateEmployeeAttendenceData.ShiftId = moduleContext.parentContext.selectedShift;


                $ct.helpers.displayWorkAreaBusyCursor();
                $ct.ds.emp.empattendance.bulkUpdateEmployeeAttendence(bulkUpdateEmployeeAttendenceData, function (data) {

                    $ct.helpers.hideWorkAreaBusyCursor();

                    if ($ct.mt.isVersionConflict(data)) {
                        if ($ct.helpers.displayConfirmWindow($ct.msg.getVersionConflictReloadMsg())) {
                            vm.initialize();
                        }
                        return;
                    }

                    var errorObj = $ct.mt.getErrorObject(data);
                    if (errorObj != null) {
                        moduleContext.notify($ct.en.getShowErrorMsg(), errorObj);
                        return;
                    }
                    else {
                        moduleContext.notify($ct.en.getShowSuccMsg(), $ct.msg.getEmployeeAttendenceUpdatedSuccessMsg());
                        moduleContext.notify($ct.en.getEmployeeAttendanceUpdated(), null);
                        Boiler.UrlController.goTo($ct.rn.getEmployeeAttendance());
                    }

                })

            },

            btnCancelClick: function () {

                moduleContext.notify($ct.en.getHideErrorMsg());
                moduleContext.notify($ct.en.getEmployeeAttendanceUpdated(), null);
                Boiler.UrlController.goTo($ct.rn.getEmployeeAttendance());

            }






        });

        //end of observable

        return {
            data: vm
        };

    };

    return ViewModel;
});
