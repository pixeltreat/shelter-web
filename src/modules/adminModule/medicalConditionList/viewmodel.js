
define(["Boiler", 'text!./help/help.html'], function (Boiler, helpTmpl) {

    var ViewModel = function (moduleContext) {

        var vm = kendo.observable({

            helpClick: function (e) {
                var panel = new Boiler.ViewTemplate(null, helpTmpl, null);
                $ct.helpers.displayWindow(panel);
            },

            searchToken: "",
            initialSearchToken: "",
            selectedId: -1,
            selectedRecordVersion: -1,



            dsMedicalConditions: function () {
               
                if (this.initialLoad) {
                    $ct.helpers.displayWorkAreaBusyCursor();
                }

                this.fillGrid();

                if (this.initialLoad) {
                    this.initialLoad = false;
                    $ct.helpers.hideWorkAreaBusyCursor();
                }

            },

            fillGrid: function () {
                this.set("dsMedicalConditions", $ct.ds.admin.medicalcondition.getMedicalconditions(this));
                
            },

            seachMedicalConditions: function (e) {
                if (this.initialSearchToken !== this.searchToken) {
                    this.fillGrid();
                    this.initialSearchToken = this.searchToken;
                }
            },

            refreshMedicalConditionsGrid: function (e) {
                vm.dsMedicalConditions.read();
            },

            rowSelectionChange: function (e) {
                this.set("selectedId", e.sender.dataItem(e.sender.select()).Id);
                this.set("selectedRecordVersion", e.sender.dataItem(e.sender.select()).Version);
            },

            isRowSelected: function (e) {

                if (this.get("selectedId") == -1 || this.get("selectedId") === null || this.get("selectedId") === undefined) {
                    return false;
                }
                else {
                    return true;
                }
            },






            medicalConditionstEditUrl: function (isNew) {

                if (!isNew) {
                    return $ct.rn.getMedicalCondition() + "/" + this.selectedId;
                }
                else {
                    return $ct.rn.getMedicalCondition() + "/" + $ct.constants.getNewRecordId();
                }
            },

            btnAddClick: function (e) {
                Boiler.UrlController.goTo(this.medicalConditionstEditUrl(true));
            },

            btnEditClick: function (e) {
                Boiler.UrlController.goTo(this.medicalConditionstEditUrl(false));
            },
            btnDeleteClick: function (e) {

                moduleContext.notify($ct.en.getHideErrorMsg());

                if (!$ct.helpers.displayConfirmWindow($ct.msg.getDeleteConfirmationMsg())) {
                    return;
                }

                $ct.helpers.displayWorkAreaBusyCursor();

                $ct.ds.admin.medicalcondition.deletegetMedicalConditionById(this, function (data) {

                    $ct.helpers.hideWorkAreaBusyCursor();

                    if ($ct.mt.isVersionConflict(data)) {
                        if ($ct.helpers.displayConfirmWindow($ct.msg.getVersionConflictReloadMsg())) {
                            vm.dsMedicalConditions.read();
                        }
                        return;
                    }

                    var errorObj = $ct.mt.getErrorObject(data);
                    if (errorObj != null) {
                        moduleContext.notify($ct.en.getShowErrorMsg(), errorObj);
                    }
                    else {
                        moduleContext.notify($ct.en.getShowSuccMsg(), $ct.msg.getMedicalConditionDeleteSuccessMsg());
                    }


                    vm.dsMedicalConditions.read();

                });

            }



        });


        //end of observable

        return {
            data: vm
        };

    };

    return ViewModel;
});
