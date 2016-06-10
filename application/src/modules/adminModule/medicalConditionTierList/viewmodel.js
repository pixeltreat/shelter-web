define(["Boiler", 'text!./help/help.html'], function (Boiler, helpTmpl) {

    var ViewModel = function (moduleContext) {

        var vm = kendo.observable({

            pageName: "MedicalConditionTier List page",

            helpClick: function (e) {

                var panel = new Boiler.ViewTemplate(null, helpTmpl, null);
                $ct.helpers.displayWindow(panel);
            },


            searchToken: "",
            initialSearchToken: "",

            selectedId: -1,
            selectedRecordVersion: -1,

            initialLoad: true,

            dsMedicalConditionTier: function () {


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
                this.set("dsMedicalConditionTier", $ct.ds.admin.medicalconditiontier.getMedicalConditionTiers(this));

            },

            searchMedicalConditionTiers: function (e) {
                if (this.initialSearchToken !== this.searchToken) {
                    this.fillGrid();
                    this.initialSearchToken = this.searchToken;
                }
            },

            refreshMedicalConditionTierGrid: function (e) {
                vm.dsMedicalConditionTier.read();
            },


            rowSelectionChange: function (e) {
                this.set("selectedId", e.sender.dataItem(e.sender.select()).Id);
                this.set("selectedRecordVersion", e.sender.dataItem(e.sender.select()).Version);
            },

            //isRowSelected: function (e) {
            //    if (this.get("selectedId") === -1 || this.get("selectedId") === null || this.get("selectedId") === undefined) {
            //        return false;
            //    }
            //    else {
            //        return true;
            //    }
            //},

            medicalConditionTierEditUrl: function (isNew) {
                if (!isNew) {
                    return $ct.rn.getMedicalConditionTier() + "/" + this.selectedId;
                }
                else {
                    return $ct.rn.getMedicalConditionTier() + "/" + $ct.constants.getNewRecordId();
                }
            },

            btnAddClick: function (e) {
                Boiler.UrlController.goTo(this.medicalConditionTierEditUrl(true));
            },

            btnEditClick: function (e) {

                this.set("selectedId", e.data.Id);
                this.set("selectedRecordVersion", e.data.Version);
                Boiler.UrlController.goTo(this.medicalConditionTierEditUrl(false));
            },

            btnDeleteClick: function (e) {

                moduleContext.notify($ct.en.getHideErrorMsg());

                if (!$ct.helpers.displayConfirmWindow($ct.msg.getDeleteConfirmationMsg())) {
                    return;
                }

                $ct.helpers.displayWorkAreaBusyCursor();

                this.set("selectedId", e.data.Id);
                this.set("selectedRecordVersion", e.data.Version);

                $ct.ds.admin.medicalconditiontier.deleteMedicalConditionTierById(this, function (data) {

                    $ct.helpers.hideWorkAreaBusyCursor();

                    if ($ct.mt.isVersionConflict(data)) {
                        if ($ct.helpers.displayConfirmWindow($ct.msg.getVersionConflictReloadMsg())) {
                            vm.dsMedicalConditionTier.read();
                        }
                        return;
                    }

                    var errorObj = $ct.mt.getErrorObject(data);
                    if (errorObj != null) {
                        moduleContext.notify($ct.en.getShowErrorMsg(), errorObj);
                    }
                    else {
                        moduleContext.notify($ct.en.getShowSuccMsg(), $ct.msg.getMedicalConditionTierDeleteSuccessMsg());
                    }

                    vm.dsMedicalConditionTier.read();

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
