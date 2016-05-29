define(["Boiler", 'text!./help/help.html'], function (Boiler, helpTmpl) {

    var ViewModel = function (moduleContext) {

        var vm = kendo.observable({

            pageName: "Agency edit page",

            helpClick: function (e) {

                var panel = new Boiler.ViewTemplate(null, helpTmpl, null);
                $ct.helpers.displayWindow(panel);
            },
            // agencyData will be initialized from service
            agencyData: {},
          
            initialLoad: false,

            DescriptionLength: 4000,

            //Query string parameters
            agencyId: "",

            //Fill Query string parameters
            fillQueryParam: function (param) {
               
                vm.set("agencyId", param.id);
            },

            //To initialize agencyData 
            initialize: function () {

                vm.set("initialLoad", true);
                $ct.helpers.clearValidations("vwAgency");

                moduleContext.notify($ct.en.getHideErrorMsg());
                $ct.helpers.displayWorkAreaBusyCursor();

                $ct.ds.admin.agency.getAgencyById(this.agencyId, function (result) {

                    var resultData = result.Data;
                    //To create object for new agency
                    if (resultData.Agency === null) {

                        resultData.Agency = {};
                        resultData.Agency.Id = $ct.constants.getNewRecordId();
                        resultData.Agency.Name = "";
                        resultData.Agency.Description = "";
                        resultData.Agency.DisplayOrder = 1;
                      
                    }
          
                    vm.set("agencyData", resultData);
              

                    $ct.helpers.hideWorkAreaBusyCursor();
                });
            },


            trimWhiteSpaces: function () {

                this.agencyData.Agency.set("Name", $.trim(this.agencyData.Agency.Name));
                this.agencyData.Agency.set("Description", $.trim(this.agencyData.Agency.Description));

            },


            // Saves the data, if data save is successful, then redirected to  list page 
            //If when saving the data if version conflict occured, data will be refreshed based on user request.
            btnSaveClick: function () {

                this.trimWhiteSpaces();
                vm.set("initialLoad", false);
                moduleContext.notify($ct.en.getHideErrorMsg());

                var validator = $("#vwAgency").kendoValidator().data("kendoValidator");
                if ((!validator.validate())) {
                    moduleContext.notify($ct.en.getShowValidationMsg(), $ct.msg.getValidationMsg());

                    return;
                }

                var saveAgencyData = vm.agencyData.toJSON();

                $ct.helpers.displayWorkAreaBusyCursor();

                $ct.ds.admin.agency.saveAgency(saveAgencyData, function (data) {

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
                        moduleContext.notify($ct.en.getShowSuccMsg(), $ct.msg.getAgencySuccessMsg());
                    }

                    moduleContext.notify($ct.en.getAgencyCreatedOrUpdated(), null);
                    Boiler.UrlController.goTo($ct.rn.getAgencyList());

                })

            },

            // To redirect to  list page
            btnCancelClick: function () {

                moduleContext.notify($ct.en.getHideErrorMsg());

                moduleContext.notify($ct.en.getAgencyCreatedOrUpdated(), null);
                Boiler.UrlController.goTo($ct.rn.getAgencyList());
            },
           
           
            setValidClassForDisplayOrder: function () {
                if ((vm.get("agencyData.Agency.DisplayOrder") == null || vm.get("agencyData.Agency.DisplayOrder") == undefined) && vm.get("initialLoad") == false) {
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
