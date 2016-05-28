define(["Boiler", 'text!./help/help.html'], function (Boiler, helpTmpl) {

    var ViewModel = function (moduleContext) {

        var vm = kendo.observable({

            pageName: "Shelter Type edit page",

            helpClick: function (e) {

                var panel = new Boiler.ViewTemplate(null, helpTmpl, null);
                $ct.helpers.displayWindow(panel);
            },

            // sheltertypeData will be initialized from service
            shelterTypeData: {},
            staffTypeShelterTypes: [],

            shelterTypeId: -1,
            initialLoad: false,

            
            DescriptionLength: 4000,

            //Fill Query string parameters
            fillQueryParam: function (param) {
                vm.set("shelterTypeId", param.id);

            },

            //To initialize sheltertypeData
            initialize: function () {

                vm.set("initialLoad", true);
                $ct.helpers.clearValidations("vwShelterType");

                moduleContext.notify($ct.en.getHideErrorMsg());
                $ct.helpers.displayWorkAreaBusyCursor();

                $ct.ds.admin.sheltertype.getShelterTypeById(this.shelterTypeId, function (result) {

                    var resultData = result.Data;

                    //For new sheltertype
                  
                    if (resultData.ShelterType === null) {
                        resultData.ShelterType = {};
                        resultData.ShelterType.Id = $ct.constants.getNewRecordId();
                        resultData.ShelterType.Name = "";
                        resultData.ShelterType.Description = "";
                        resultData.ShelterType.DisplayOrder = 1;
                      
                    }

                    vm.set("shelterTypeData", resultData);
                   
                    vm.set("staffTypeShelterTypes", resultData.StaffTypeLookupWithShelterTypeData);
                    $ct.helpers.hideWorkAreaBusyCursor();

                })

            },

            trimWhiteSpaces: function () {

                this.shelterTypeData.ShelterType.set("Name", $.trim(this.shelterTypeData.ShelterType.Name));
                this.shelterTypeData.ShelterType.set("Description", $.trim(this.shelterTypeData.ShelterType.Description));

            },

            checkMappedStaffTypes: function () {

                if (vm.get("initialLoad")) {
                    return true;
                }

                var atLeastOneSelected = false;
                $.each(vm.get("staffTypeShelterTypes"), function (mainIndex, mainRec) {

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

                var validator = $("#vwShelterType").kendoValidator().data("kendoValidator");

                if (!validator.validate()) {
                    moduleContext.notify($ct.en.getShowValidationMsg(), $ct.msg.getValidationMsg());
                    return;
                }

                var saveShelterTypeData = vm.shelterTypeData.toJSON();
                saveShelterTypeData.ShelterType.ShelterTypeStaffTypes = vm.staffTypeShelterTypes.toJSON();

                var atLeastOneSelected = false;

                $.each(saveShelterTypeData.ShelterType.ShelterTypeStaffTypes, function (mainIndex, mainRec) {

                    if (mainRec.IsSelected) {
                        atLeastOneSelected = true;
                    }

                });

                if (!atLeastOneSelected) {
                    moduleContext.notify($ct.en.getShowValidationMsg(), "Please select atleast one staff type");
                    return;
                }
                $ct.helpers.displayWorkAreaBusyCursor();

                $ct.ds.admin.sheltertype.saveShelterType(saveShelterTypeData, function (data) {

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
                        moduleContext.notify($ct.en.getShowSuccMsg(), $ct.msg.getShelterTypeSuccessMsg());
                    }

                    moduleContext.notify($ct.en.getShelterTypeCreatedOrUpdated(), null);
                    Boiler.UrlController.goTo($ct.rn.getShelterTypeList());

                })

            },
            // To redirect to sheltertype list page
            btnCancelClick: function () {

                moduleContext.notify($ct.en.getHideErrorMsg());

                moduleContext.notify($ct.en.getShelterTypeCreatedOrUpdated(), null);
                Boiler.UrlController.goTo($ct.rn.getShelterTypeList());
            },

            setValidClassForDisplayOrder: function () {
                if ((vm.get("shelterTypeData.ShelterType.DisplayOrder") == null || vm.get("shelterTypeData.ShelterType.DisplayOrder") == undefined) && vm.get("initialLoad") == false) {
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
