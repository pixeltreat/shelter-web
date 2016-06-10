define(["Boiler"],
function (Boiler) {

    var ViewModel = function (moduleContext) {

        var vm = kendo.observable({

            transportationTypeData: {},


            transportationTypeId: -1,
            initialLoad: false,
            NameLength: 250,
            DescriptionLength: 4000,



            //Fill Query string parameters
            fillQueryParam: function (param) {
                vm.set("transportationTypeId", param.id);


            },

            //To initialize eventData
            initialize: function () {

                vm.set("initialLoad", true);
                $ct.helpers.clearValidations("vwTransportationType");
                moduleContext.notify($ct.en.getHideErrorMsg());
                $ct.helpers.displayWorkAreaBusyCursor();

                $ct.ds.admin.transportationType.getTransportationTypeById(this.transportationTypeId, function (result) {

                    var resultData = result.Data;
                 

                    //For new event
                    if (resultData.TransportationType === null) {
                        resultData.TransportationType = {};
                        resultData.TransportationType.Id = $ct.constants.getNewRecordId();
                        resultData.TransportationType.Name = "";
                        resultData.TransportationType.Description = "";
                        resultData.TransportationType.DisplayOrder = 1;

                    }


                    
                  

                    vm.set("transportationTypeData", resultData);


                    $ct.helpers.hideWorkAreaBusyCursor();
                })

            },



            btnSaveClick: function () {

                this.trimWhiteSpaces();
                vm.set("initialLoad", false);

                moduleContext.notify($ct.en.getHideErrorMsg());

                var validator = $("#vwTransportationType").kendoValidator().data("kendoValidator");
                if (!validator.validate()) {

                    moduleContext.notify($ct.en.getShowValidationMsg(), $ct.msg.getValidationMsg());
                    return;
                }



                var saveTransportationTypeData = vm.transportationTypeData.toJSON();


                $ct.ds.admin.transportationType.saveTransportationType(saveTransportationTypeData, function (data) {

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
                        moduleContext.notify($ct.en.getShowSuccMsg(), $ct.msg.getTransportTypeSuccessMsg());
                    }


                    moduleContext.notify($ct.en.getTransportTypeCreatedOrUpdated(), null);
                    Boiler.UrlController.goTo($ct.rn.getTransportTypeList());

                })

            },

            trimWhiteSpaces: function () {

                this.transportationTypeData.TransportationType.set("Name", $.trim(this.transportationTypeData.TransportationType.Name));
                this.transportationTypeData.TransportationType.set("Description", $.trim(this.transportationTypeData.TransportationType.Description));
            },
            btnCancelClick: function () {
                moduleContext.notify($ct.en.getHideErrorMsg());
                moduleContext.notify($ct.en.getTransportTypeCreatedOrUpdated(), null);
                Boiler.UrlController.goTo($ct.rn.getTransportTypeList());
            },


            setValidClassForDisplayOrder: function () {
                if ((vm.get("transportationTypeData.TransportationType.DisplayOrder") == null || vm.get("transportationTypeData.TransportationType.DisplayOrder") == undefined) && vm.get("initialLoad") == false) {
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


