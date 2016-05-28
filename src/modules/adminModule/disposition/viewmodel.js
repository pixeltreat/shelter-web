define(["Boiler", 'text!./help/help.html'], function (Boiler, helpTmpl) {

    var ViewModel = function (moduleContext) {

        var vm = kendo.observable({

            pageName: "Disposition edit page",

            helpClick: function (e) {

                var panel = new Boiler.ViewTemplate(null, helpTmpl, null);
                $ct.helpers.displayWindow(panel);
            },
            // dispositionData will be initialized from service
            dispositionData: {},

            initialLoad: false,


            DescriptionLength: 4000,

            //Query string parameters
            dispositionId: "",

            //Fill Query string parameters
            fillQueryParam: function (param) {

                vm.set("dispositionId", param.id);
            },

            //To initialize dispositionData 
            initialize: function () {

                vm.set("initialLoad", true);
                $ct.helpers.clearValidations("vwDisposition");

                moduleContext.notify($ct.en.getHideErrorMsg());
                $ct.helpers.displayWorkAreaBusyCursor();

                $ct.ds.admin.disposition.getDispositionById(this.dispositionId, function (result) {

                    var resultData = result.Data;
                    //To create object for new disposition
                    if (resultData.Disposition === null) {
                        resultData.Disposition = {};
                        resultData.Disposition.Id = $ct.constants.getNewRecordId();
                        resultData.Disposition.Name = "";
                        resultData.Disposition.Description = "";
                        resultData.Disposition.DisplayOrder = 1;

                    }

                    vm.set("dispositionData", resultData);


                    $ct.helpers.hideWorkAreaBusyCursor();
                });
            },


            trimWhiteSpaces: function () {

                this.dispositionData.Disposition.set("Name", $.trim(this.dispositionData.Disposition.Name));
                this.dispositionData.Disposition.set("Description", $.trim(this.dispositionData.Disposition.Description));

            },


            // Saves the data, if data save is successful, then redirected to  list page 
            //If when saving the data if version conflict occured, data will be refreshed based on user request.
            btnSaveClick: function () {

                this.trimWhiteSpaces();
                vm.set("initialLoad", false);
                moduleContext.notify($ct.en.getHideErrorMsg());

                var validator = $("#vwDisposition").kendoValidator().data("kendoValidator");
                if ((!validator.validate())) {
                    moduleContext.notify($ct.en.getShowValidationMsg(), $ct.msg.getValidationMsg());

                    return;
                }

                var saveDispositionData = vm.dispositionData.toJSON();

                $ct.helpers.displayWorkAreaBusyCursor();

                $ct.ds.admin.disposition.saveDisposition(saveDispositionData, function (data) {

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
                        moduleContext.notify($ct.en.getShowSuccMsg(), $ct.msg.getDispositionSuccessMsg());
                    }

                    moduleContext.notify($ct.en.getDispositionCreatedOrUpdated(), null);
                    Boiler.UrlController.goTo($ct.rn.getDispositionList());

                })

            },

            // To redirect to  list page
            btnCancelClick: function () {

                moduleContext.notify($ct.en.getHideErrorMsg());

                moduleContext.notify($ct.en.getDispositionCreatedOrUpdated(), null);
                Boiler.UrlController.goTo($ct.rn.getDispositionList());
            },

            setValidClassForDisplayOrder: function () {
                if ((vm.get("dispositionData.Disposition.DisplayOrder") == null || vm.get("dispositionData.Disposition.DisplayOrder") == undefined) && vm.get("initialLoad") == false) {
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
