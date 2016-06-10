
define(["Boiler", 'text!./help/help.html'],
function (Boiler, helpTmpl) {

    var ViewModel = function (moduleContext) {

        var vm = kendo.observable({

            sheltereeRequestData: {

                //                ViewAll: moduleContext.parentContext.sheltereeRequestData.ViewAll,
                //                FetchSelectedOnly: moduleContext.parentContext.sheltereeRequestData.FetchSelectedOnly,
                //                SelectedEmployeeIds: moduleContext.parentContext.sheltereeRequestData.SelectedEmployeeIds,
                //                UnSelectedEmployeeIds: moduleContext.parentContext.sheltereeRequestData.UnSelectedEmployeeIds

            },


            intialize: function () {

                $ct.helpers.displayWorkAreaBusyCursor();

                vm.set("sheltereeRequestData", moduleContext.parentContext.sheltereeRequestData);
                //vm.set("SelectedEmployeeIds", vm.get("sheltereeRequestData.SelectedEmployeeIds"));

                $ct.ds.sheltree.sheltree.getSheltereeDischargeBulkUpdateLookup(this, function (result) {

                    $ct.helpers.hideWorkAreaBusyCursor();

                    vm.set("dsLookupData", result.Data.EmployeeLookupData);

                    //Added  to redirect the user back to manage screen when  they have selected patients from different facilities
                    var errorObj = $ct.mt.getErrorObject(result);
                    if (errorObj != null) {

                        moduleContext.notify($ct.en.getShowErrorMsg(), errorObj);
                        Boiler.UrlController.goTo($ct.rn.getSheltereeDischargeList());
                    }

                    vm.saveRequest.valStaffType = "-1";
                    vm.saveRequest.valDepartment = "-1";
                    vm.saveRequest.valShiftTime = "-1";
                    vm.saveRequest.valStaffSpeciality = "-1";

                });

            },

            resetFields: function () {

                vm.intialize();

                vm.set("saveRequest.valStaffType", "-1");
                vm.set("saveRequest.valDepartment", "-1");
                vm.set("saveRequest.valShiftTime", "-1");
                vm.set("saveRequest.valStaffSpeciality", "-1");

            },

            dsLookupData: {

            },



            helpClick: function (e) {
                var panel = new Boiler.ViewTemplate(null, helpTmpl, null);
                $ct.helpers.displayWindow(panel);
            },

            saveRequest: {

                valStaffType: "-1",
                valDepartment: "-1",
                valShiftTime: "-1",
                valStaffSpeciality: "-1",

            },
            //SelectedEmployeeIds: new kendo.data.ObservableArray([]),

            btnSaveClick: function (e) {

                //var req = vm.get("saveRequest");

                //vm.set("saveRequest.SelectedEmployeeIds", vm.SelectedEmployeeIds);
                $ct.helpers.displayWorkAreaBusyCursor();


                $ct.ds.sheltree.sheltree.bulkUpdateSheltereeDischargeData(this, function (result) {

                    $ct.helpers.hideWorkAreaBusyCursor();

                    var errorObj = $ct.mt.getErrorObject(result);
                    if (errorObj != null) {
                        moduleContext.notify($ct.en.getShowErrorMsg(), errorObj);
                        return;
                    }
                    else {
                        moduleContext.notify($ct.en.getShowSuccMsg(), $ct.msg.getSheltereeUploadSuccessMsg());
                        moduleContext.notify($ct.en.getSheltereeDischargeCreatedOrUpdated());
                        Boiler.UrlController.goTo($ct.rn.getSheltereeDischargeList());
                    }

                });

            },

            btnCancelClick: function (e) {

                //moduleContext.notify($ct.en.getManagePatientsSelectedOnlyList());
                moduleContext.notify($ct.en.getSheltereeDischargeCreatedOrUpdated());
                Boiler.UrlController.goTo($ct.rn.getSheltereeDischargeList());

            },

            shelterId: 0


        });

        //end of observable

        return {
            data: vm
        };

    };

    return ViewModel;
});
