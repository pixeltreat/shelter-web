define(["Boiler"],
function (Boiler) {

    var ViewModel = function (moduleContext) {

        var vm = kendo.observable({

            staffTypeData: {},


            staffTypeId: -1,
            initialLoad: false,
            NameLength: 250,
            DescriptionLength: 4000,



            //Fill Query string parameters
            fillQueryParam: function (param) {
                vm.set("medicalConditionId", param.id);


            },

            //To initialize eventData
            initialize: function () {

                vm.set("initialLoad", true);
                $ct.helpers.clearValidations("vwMedicalCondition");
                moduleContext.notify($ct.en.getHideErrorMsg());
                $ct.helpers.displayWorkAreaBusyCursor();

                $ct.ds.admin.medicalcondition.getMedicalConditionById(this.medicalConditionId, function (result) {

                    var resultData = result.Data;
                    

                    //For new event
                    if (resultData.MedicalCondition === null) {
                        resultData.MedicalCondition = {};
                        resultData.MedicalCondition.Id = $ct.constants.getNewRecordId();
                        resultData.MedicalCondition.Name = "";
                        resultData.MedicalCondition.Description = "";
                        resultData.MedicalCondition.DisplayOrder = 1;

                    }





                    vm.set("medicalConditionData", resultData);


                    $ct.helpers.hideWorkAreaBusyCursor();
                })

            },



            btnSaveClick: function () {

                this.trimWhiteSpaces();
                vm.set("initialLoad", false);

                moduleContext.notify($ct.en.getHideErrorMsg());

                var validator = $("#vwMedicalCondition").kendoValidator().data("kendoValidator");
                if (!validator.validate()) {

                    moduleContext.notify($ct.en.getShowValidationMsg(), $ct.msg.getValidationMsg());
                    return;
                }



                var saveMedicalConditionData = vm.medicalConditionData;



                $ct.ds.admin.medicalcondition.saveMedicalCondition(saveMedicalConditionData, function (data) {

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
                        moduleContext.notify($ct.en.getShowSuccMsg(), $ct.msg.getMedicalConditionSuccessMsg());
                    }


                    moduleContext.notify($ct.en.getMedicalConditionCreatedOrUpdated(), null);
                    Boiler.UrlController.goTo($ct.rn.getMedicalConditionList());

                })

            },

            trimWhiteSpaces: function () {

                this.medicalConditionData.MedicalCondition.set("Name", $.trim(this.medicalConditionData.MedicalCondition.Name));
                this.medicalConditionData.MedicalCondition.set("Description", $.trim(this.medicalConditionData.MedicalCondition.Description));
            },
            btnCancelClick: function () {
                moduleContext.notify($ct.en.getHideErrorMsg());
                moduleContext.notify($ct.en.getMedicalConditionCreatedOrUpdated(), null);
                Boiler.UrlController.goTo($ct.rn.getMedicalConditionList());
            },


            setValidClassForDisplayOrder: function () {
                if ((vm.get("medicalConditionData.MedicalCondition.DisplayOrder") == null || vm.get("medicalConditionData.MedicalCondition.DisplayOrder") == undefined) && vm.get("initialLoad") == false) {
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


