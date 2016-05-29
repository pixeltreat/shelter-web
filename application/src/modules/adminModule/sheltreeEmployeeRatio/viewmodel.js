

define(["Boiler", 'text!./help/help.html'], function (Boiler, helpTmpl) {

    var ViewModel = function (moduleContext) {


        var vm = kendo.observable({

            helpClick: function (e) {

                var panel = new Boiler.ViewTemplate(null, helpTmpl, null);
                $ct.helpers.displayWindow(panel);

            },

            // shelterEmployeeRatioData will be initialized from service
            sheltreeEmployeeRatioData: {},
            dsStaffSpeciality: [],

            sheltreeEmployeeRatioId: -1,
            selectedStaffSpeciality: {},

            initialLoad: false,


            //Fill Query string parameters
            fillQueryParam: function (param) {
                vm.set("sheltreeEmployeeRatioId", param.id);

            },

            //To initialize shelterEmployeeRatioData
            initialize: function () {

                vm.set("initialLoad", true);
                $ct.helpers.clearValidations("vwSheltreeEmployeeRatio");
                moduleContext.notify($ct.en.getHideErrorMsg());
                $ct.helpers.displayWorkAreaBusyCursor();

                $ct.ds.admin.sheltreeEmployeeRatio.getsheltreeEmployeeRatioById(this.sheltreeEmployeeRatioId, function (result) {

                    var resultData = result.Data;

                    //For new shelterEmployeeRatio
                    if (resultData.SheltreeEmployeeRatio === null) {

                        resultData.SheltreeEmployeeRatio = {};
                        resultData.SheltreeEmployeeRatio.EmployeeCount = null;
                        resultData.SheltreeEmployeeRatio.SheltreeCount = null;
                        resultData.SheltreeEmployeeRatio.StaffSpecialityId = -1;



                    }
                    vm.set("sheltreeEmployeeRatioData", resultData);
                    vm.set("dsStaffSpeciality", resultData.StaffSpecialityLookup);


                    if (resultData.SheltreeEmployeeRatio.StaffSpecialityId == -1) {

                        vm.set("selectedStaffSpeciality", resultData.StaffSpecialityLookup[0]);
                    }
                    else {

                        var selectedObject = {};
                        selectedObject.Key = resultData.SheltreeEmployeeRatio.StaffSpecialityId;
                        vm.set("selectedStaffSpeciality", selectedObject);
                    }



                    $ct.helpers.hideWorkAreaBusyCursor();
                })

            },



            btnSaveClick: function () {


                vm.set("initialLoad", false);


                moduleContext.notify($ct.en.getHideErrorMsg());

                var validator = $("#vwSheltreeEmployeeRatio").kendoValidator().data("kendoValidator");
                if ((!validator.validate())) {
                    moduleContext.notify($ct.en.getShowValidationMsg(), $ct.msg.getValidationMsg());

                    return;
                }



                var saveSheltreeEmployeeRatio = {};
                saveSheltreeEmployeeRatio.SheltreeEmployeeRatioId = vm.sheltreeEmployeeRatioId;
                vm.sheltreeEmployeeRatioData.SheltreeEmployeeRatio.StaffSpecialityId = vm.selectedStaffSpeciality.Key;
                saveSheltreeEmployeeRatio.SheltreeEmployeeRatio = vm.sheltreeEmployeeRatioData.SheltreeEmployeeRatio.toJSON();


                $ct.helpers.displayWorkAreaBusyCursor();
                $ct.ds.admin.sheltreeEmployeeRatio.savesheltreeEmployeeRatio(saveSheltreeEmployeeRatio, function (data) {

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
                    }
                    else {
                        moduleContext.notify($ct.en.getShowSuccMsg(), $ct.msg.getSheltereeEmployeeSuccessMsg());
                    }


                    moduleContext.notify($ct.en.getSheltreeEmployeeRatioCreatedOrUpdated(), null);
                    Boiler.UrlController.goTo($ct.rn.getSheltreeEmployeeRatioList());

                })

            },
            // To redirect to shelterEmployeeRatio list page
            btnCancelClick: function () {

                moduleContext.notify($ct.en.getHideErrorMsg());

                moduleContext.notify($ct.en.getSheltreeEmployeeRatioCreatedOrUpdated(), null);
                Boiler.UrlController.goTo($ct.rn.getSheltreeEmployeeRatioList());

            },
            setValidClassForEmployeeCount: function () {
                if ((vm.get("sheltreeEmployeeRatioData.SheltreeEmployeeRatio.EmployeeCount") == null || vm.get("sheltreeEmployeeRatioData.SheltreeEmployeeRatio.EmployeeCount") == undefined) && vm.get("initialLoad") == false) {
                    return $ct.styles.getDataInvalidClass();
                }
                else {
                    return $ct.styles.getRemoveInvalidDataBorder();
                }
            },

            setValidClassForSheltreeCount: function () {
                if ((vm.get("sheltreeEmployeeRatioData.SheltreeEmployeeRatio.SheltreeCount") == null || vm.get("sheltreeEmployeeRatioData.SheltreeEmployeeRatio.SheltreeCount") == undefined) && vm.get("initialLoad") == false) {
                    return $ct.styles.getDataInvalidClass();
                }
                else {
                    return $ct.styles.getRemoveInvalidDataBorder();
                }
            }


        });

        //end of observable

        return {
            data: vm
        };

    };

    return ViewModel;
});
