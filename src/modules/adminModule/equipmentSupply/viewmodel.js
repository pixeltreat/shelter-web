define(["Boiler", 'text!./help/help.html'],
function (Boiler, helpTmpl) {

    var ViewModel = function (moduleContext) {


        var vm = kendo.observable({

            helpClick: function (e) {
                var panel = new Boiler.ViewTemplate(null, helpTmpl, null);
                $ct.helpers.displayWindow(panel);
            },


            // equipmentSupplyData will be initialized from service
            equipmentSupplyData: {},

            initialLoad: false,

            DescriptionLength: 4000,

            //Query string parameters
            equipmentSupplyId: "",

            //Fill Query string parameters
            fillQueryParam: function (param) {

                vm.set("equipmentSupplyId", param.id);
            },

            //To initialize agencyData 
            initialize: function () {

                vm.set("initialLoad", true);
                $ct.helpers.clearValidations("vwEquipmentSupply");

                moduleContext.notify($ct.en.getHideErrorMsg());
                $ct.helpers.displayWorkAreaBusyCursor();

                $ct.ds.admin.equipmentsupply.getEquipmentSupplyById(this.equipmentSupplyId, function (result) {

                    var resultData = result.Data;
                    //To create object for new equipmentsupply
                    if (resultData.EquipmentSupply === null) {

                        resultData.EquipmentSupply = {};
                        resultData.EquipmentSupply.Id = $ct.constants.getNewRecordId();
                        resultData.EquipmentSupply.Name = "";
                        resultData.EquipmentSupply.Description = "";
                        resultData.EquipmentSupply.DisplayOrder = 1;

                    }

                    vm.set("equipmentSupplyData", resultData);


                    $ct.helpers.hideWorkAreaBusyCursor();
                });
            },


            trimWhiteSpaces: function () {

                this.equipmentSupplyData.EquipmentSupply.set("Name", $.trim(this.equipmentSupplyData.EquipmentSupply.Name));
                this.equipmentSupplyData.EquipmentSupply.set("Description", $.trim(this.equipmentSupplyData.EquipmentSupply.Description));

            },


            // Saves the data, if data save is successful, then redirected to  list page 
            //If when saving the data if version conflict occured, data will be refreshed based on user request.
            btnSaveClick: function () {

                this.trimWhiteSpaces();
                vm.set("initialLoad", false);
                moduleContext.notify($ct.en.getHideErrorMsg());

                var validator = $("#vwEquipmentSupply").kendoValidator().data("kendoValidator");
                if ((!validator.validate())) {
                    moduleContext.notify($ct.en.getShowValidationMsg(), $ct.msg.getValidationMsg());

                    return;
                }

                var saveEquipmentSupplyData = vm.equipmentSupplyData.toJSON();

                $ct.helpers.displayWorkAreaBusyCursor();

                $ct.ds.admin.equipmentsupply.saveEquipmentSupply(saveEquipmentSupplyData, function (data) {

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
                        moduleContext.notify($ct.en.getShowSuccMsg(), $ct.msg.getEquipmentSupplySuccessMsg());
                    }

                    moduleContext.notify($ct.en.getEquipmentSupplyCreatedOrUpdated(), null);
                    Boiler.UrlController.goTo($ct.rn.getequipmentSupplyList());

                })

            },

            // To redirect to  list page
            btnCancelClick: function () {

                moduleContext.notify($ct.en.getHideErrorMsg());

                moduleContext.notify($ct.en.getEquipmentSupplyCreatedOrUpdated(), null);
                Boiler.UrlController.goTo($ct.rn.getequipmentSupplyList());
            },


            setValidClassForDisplayOrder: function () {
                if ((vm.get("equipmentSupplyData.EquipmentSupply.DisplayOrder") == null || vm.get("equipmentSupplyData.EquipmentSupply.DisplayOrder") == undefined) && vm.get("initialLoad") == false) {
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
