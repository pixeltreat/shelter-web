define(["Boiler", 'text!./help/help.html'], function (Boiler, helpTmpl) {

    var ViewModel = function (moduleContext) {

        var vm = kendo.observable({

            pageName: "MedicalConditionTier edit page",

            helpClick: function (e) {

                var panel = new Boiler.ViewTemplate(null, helpTmpl, null);
                $ct.helpers.displayWindow(panel);
            },

            // medicalConditionTierData will be initialized from service
            medicalConditionTierData: {},

            initialLoad: false,

            DescriptionLength: 4000,

            //Query string parameters
            medicalConditionTierId: "",

            //Fill Query string parameters
            fillQueryParam: function (param) {

                vm.set("medicalConditionTierId", param.id);
            },

            //To initialize medicalConditionTierData
            initialize: function () {

                vm.set("initialLoad", true);
                $ct.helpers.clearValidations("vwMedicalConditionTier");

                moduleContext.notify($ct.en.getHideErrorMsg());
                $ct.helpers.displayWorkAreaBusyCursor();

                $ct.ds.admin.medicalconditiontier.getMedicalConditionTierById(this.medicalConditionTierId, function (result) {
                    
                    var resultData = result.Data;
                    //To create object for new medicalConditionTier
                    if (resultData.MedicalConditionTier === null) {

                        resultData.MedicalConditionTier = {};
                        resultData.MedicalConditionTier.Id = $ct.constants.getNewRecordId();
                        resultData.MedicalConditionTier.Name = "";
                        resultData.MedicalConditionTier.Description = "";
                        resultData.MedicalConditionTier.DisplayOrder = 1;

                    }

                    vm.set("medicalConditionTierData", resultData);


                    $ct.helpers.hideWorkAreaBusyCursor();
                });
            },


            trimWhiteSpaces: function () {

                this.medicalConditionTierData.MedicalConditionTier.set("Name", $.trim(this.medicalConditionTierData.MedicalConditionTier.Name));
                this.medicalConditionTierData.MedicalConditionTier.set("Description", $.trim(this.medicalConditionTierData.MedicalConditionTier.Description));

            },


            // Saves the data, if data save is successful, then redirected to  list page 
            //If when saving the data if version conflict occured, data will be refreshed based on user request.
            btnSaveClick: function () {

                this.trimWhiteSpaces();
                vm.set("initialLoad", false);
                moduleContext.notify($ct.en.getHideErrorMsg());

                var validator = $("#vwMedicalConditionTier").kendoValidator().data("kendoValidator");
                if ((!validator.validate())) {
                    moduleContext.notify($ct.en.getShowValidationMsg(), $ct.msg.getValidationMsg());

                    return;
                }

                var saveMedicalConditionTierData = vm.medicalConditionTierData.toJSON();

                $ct.helpers.displayWorkAreaBusyCursor();

                $ct.ds.admin.medicalconditiontier.saveMedicalConditionTier(saveMedicalConditionTierData, function (data) {

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
                        moduleContext.notify($ct.en.getShowSuccMsg(), $ct.msg.getMedicalConditionTierSuccessMsg());
                    }

                    moduleContext.notify($ct.en.getMedicalConditionTierCreatedOrUpdated(), null);
                    Boiler.UrlController.goTo($ct.rn.getMedicalConditionTierList());

                })

            },

            // To redirect to  list page
            btnCancelClick: function () {

                moduleContext.notify($ct.en.getHideErrorMsg());

                moduleContext.notify($ct.en.getMedicalConditionTierCreatedOrUpdated(), null);
                Boiler.UrlController.goTo($ct.rn.getMedicalConditionTierList());
            },


            setValidClassForDisplayOrder: function () {
                if ((vm.get("medicalConditionTierData.MedicalConditionTier.DisplayOrder") == null || vm.get("medicalConditionTierData.MedicalConditionTier.DisplayOrder") == undefined) && vm.get("initialLoad") == false) {
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
