define(["Boiler", 'text!./help/help.html'], function (Boiler, helpTmpl) {

    var ViewModel = function (moduleContext) {

        var vm = kendo.observable({

            pageName: "Shelter Identification edit page",

            helpClick: function (e) {

                var panel = new Boiler.ViewTemplate(null, helpTmpl, null);
                $ct.helpers.displayWindow(panel);
            },
       
            shelterIdentificationData: {},
            initialLoad: false,
            DescriptionLength: 4000,          
            shelterIdentificationId: "",
          
            fillQueryParam: function (param) {

                vm.set("shelterIdentificationId", param.id);
            },

            initialize: function () {

                vm.set("initialLoad", true);
                $ct.helpers.clearValidations("vwShelterIdentification");

                moduleContext.notify($ct.en.getHideErrorMsg());
                $ct.helpers.displayWorkAreaBusyCursor();

                $ct.ds.admin.shelterIdentification.getShelterIdentificationById(this.shelterIdentificationId, function (result) {

                    var resultData = result.Data;
                   
                    if (resultData.ShelterIdentification === null) {
                        resultData.ShelterIdentification = {};
                        resultData.ShelterIdentification.Id = $ct.constants.getNewRecordId();
                        resultData.ShelterIdentification.Name = "";
                        resultData.ShelterIdentification.Description = "";
                        resultData.ShelterIdentification.DisplayOrder = 1;

                    }

                    vm.set("shelterIdentificationData", resultData);


                    $ct.helpers.hideWorkAreaBusyCursor();
                });
            },

            trimWhiteSpaces: function () {

                this.shelterIdentificationData.ShelterIdentification.set("Name", $.trim(this.shelterIdentificationData.ShelterIdentification.Name));
                this.shelterIdentificationData.ShelterIdentification.set("Description", $.trim(this.shelterIdentificationData.ShelterIdentification.Description));

            },

          
            btnSaveClick: function () {

                this.trimWhiteSpaces();
                vm.set("initialLoad", false);
                moduleContext.notify($ct.en.getHideErrorMsg());

                var validator = $("#vwShelterIdentification").kendoValidator().data("kendoValidator");
                if ((!validator.validate())) {
                    moduleContext.notify($ct.en.getShowValidationMsg(), $ct.msg.getValidationMsg());

                    return;
                }

                var saveShelterIdentificationData = vm.shelterIdentificationData.toJSON();

                $ct.helpers.displayWorkAreaBusyCursor();

                $ct.ds.admin.shelterIdentification.saveShelterIdentification(saveShelterIdentificationData, function (data) {

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
                        moduleContext.notify($ct.en.getShowSuccMsg(), $ct.msg.getShelterIdentificationSuccessMsg());
                    }

                    moduleContext.notify($ct.en.getShelterIdentificationCreatedOrUpdated(), null);
                    Boiler.UrlController.goTo($ct.rn.getshelterIdentificationList());

                })

            },

           
            btnCancelClick: function () {

                moduleContext.notify($ct.en.getHideErrorMsg());

                moduleContext.notify($ct.en.getShelterIdentificationCreatedOrUpdated(), null);
                Boiler.UrlController.goTo($ct.rn.getshelterIdentificationList());
            },

            setValidClassForDisplayOrder: function () {
                if ((vm.get("shelterIdentificationData.ShelterIdentification.DisplayOrder") == null || vm.get("shelterIdentificationData.ShelterIdentification.DisplayOrder") == undefined) && vm.get("initialLoad") == false) {
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
