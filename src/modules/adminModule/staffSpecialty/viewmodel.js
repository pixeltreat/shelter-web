define(["Boiler", 'text!./help/help.html'], function (Boiler, helpTmpl) {

    var ViewModel = function (moduleContext) {

        var vm = kendo.observable({

            pageName: "StaffSpecialty edit page",

            helpClick: function (e) {

                var panel = new Boiler.ViewTemplate(null, helpTmpl, null);
                $ct.helpers.displayWindow(panel);
            },

            // staffSpecialtyData will be initialized from service
            staffSpecialtyData: {},
            medicalConditionStaffSpecialities: [],

            staffSpecialtyId: -1,
            initialLoad: false,


            DescriptionLength: 4000,

            //Fill Query string parameters
            fillQueryParam: function (param) {
                vm.set("staffSpecialtyId", param.id);

            },

            //To initialize staffSpecialtyData
            initialize: function () {

                vm.set("initialLoad", true);
                $ct.helpers.clearValidations("vwStaffSpecialty");

                moduleContext.notify($ct.en.getHideErrorMsg());
                $ct.helpers.displayWorkAreaBusyCursor();

                $ct.ds.admin.staffspecialty.getStaffSpecialtyById(this.staffSpecialtyId, function (result) {

                    var resultData = result.Data;

                    //For new StaffSpecialty
                    if (resultData.StaffSpeciality === null) {
                       
                        resultData.StaffSpeciality = {};
                        resultData.StaffSpeciality.Id = $ct.constants.getNewRecordId();
                        resultData.StaffSpeciality.Name = "";
                        resultData.StaffSpeciality.Description = "";
                        resultData.StaffSpeciality.DisplayOrder = 1;

                    }
             
                    vm.set("staffSpecialtyData", resultData);
                    vm.set("medicalConditionStaffSpecialities", resultData.MedicalConditionLookupWithStaffSpecialityData);

                    $ct.helpers.hideWorkAreaBusyCursor();

                })

            },

            trimWhiteSpaces: function () {

                this.staffSpecialtyData.StaffSpeciality.set("Name", $.trim(this.staffSpecialtyData.StaffSpeciality.Name));
                this.staffSpecialtyData.StaffSpeciality.set("Description", $.trim(this.staffSpecialtyData.StaffSpeciality.Description));

            },

            checkMappedMedicalConditions: function () {
               
                if (vm.get("initialLoad")) {
                    return true;
                }

                var atLeastOneSelected = false;
                $.each(vm.get("medicalConditionStaffSpecialities"), function (mainIndex, mainRec) {

                    if (mainRec.IsSelected) {
                        
                        atLeastOneSelected = true;
                    }
                });
                
                return atLeastOneSelected;

            },


            btnSaveClick: function () {

                this.trimWhiteSpaces();
                vm.set("initialLoad", false);

                moduleContext.notify($ct.en.getHideErrorMsg());

                var validator = $("#vwStaffSpecialty").kendoValidator().data("kendoValidator");

                if (!validator.validate()) {
                    moduleContext.notify($ct.en.getShowValidationMsg(), $ct.msg.getValidationMsg());
                    return;
                }

                var saveStaffSpecialtyData = vm.staffSpecialtyData.toJSON();
                saveStaffSpecialtyData.StaffSpeciality.MedicalConditionStaffSpecialities = vm.medicalConditionStaffSpecialities.toJSON();

                var atLeastOneSelected = false;

                $.each(saveStaffSpecialtyData.StaffSpeciality.MedicalConditionStaffSpecialities, function (mainIndex, mainRec) {

                    if (mainRec.IsSelected) {
                        atLeastOneSelected = true;
                    }

                });

                if (!atLeastOneSelected) {
                    moduleContext.notify($ct.en.getShowValidationMsg(), "Please select atleast one medical condition");
                    return;
                }
                $ct.helpers.displayWorkAreaBusyCursor();

                $ct.ds.admin.staffspecialty.saveStaffSpecialty(saveStaffSpecialtyData, function (data) {

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
                        moduleContext.notify($ct.en.getShowSuccMsg(), $ct.msg.getStaffSpecialtySuccessMsg());
                    }

                    moduleContext.notify($ct.en.getStaffSpecialtyCreatedOrUpdated(), null);
                    Boiler.UrlController.goTo($ct.rn.getStaffSpecialtyList());

                })

            },
            // To redirect to StaffSpecialty list page
            btnCancelClick: function () {

                moduleContext.notify($ct.en.getHideErrorMsg());

                moduleContext.notify($ct.en.getStaffSpecialtyCreatedOrUpdated(), null);
                Boiler.UrlController.goTo($ct.rn.getStaffSpecialtyList());
            },

            setValidClassForDisplayOrder: function () {
                if ((vm.get("staffSpecialtyData.StaffSpeciality.DisplayOrder") == null || vm.get("staffSpecialtyData.StaffSpeciality.DisplayOrder") == undefined) && vm.get("initialLoad") == false) {
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
