define(["Boiler", 'text!./help/help.html'], function (Boiler, helpTmpl) {

    var ViewModel = function (moduleContext) {

        var vm = kendo.observable({

            pageName: "StaffSpecialty List page",

            helpClick: function (e) {

                var panel = new Boiler.ViewTemplate(null, helpTmpl, null);
                $ct.helpers.displayWindow(panel);
            },

            searchToken: "",
            initialSearchToken: "",

            selectedId: -1,
            selectedRecordVersion: -1,

            dsStaffSpecialty: function () {
                this.fillGrid();
            },

            fillGrid: function () {
                this.set("dsStaffSpecialty", $ct.ds.admin.staffspecialty.getStaffSpecialities(this));
            },

            searchStaffSpecialities: function (e) {
                if (this.initialSearchToken !== this.searchToken) {
                    this.fillGrid();
                    this.initialSearchToken = this.searchToken;
                }
            },

            refreshStaffSpecialtyGrid: function (e) {
                vm.dsStaffSpecialty.read();
            },

            rowSelectionChange: function (e) {
                this.set("selectedId", e.sender.dataItem(e.sender.select()).Id);
                this.set("selectedRecordVersion", e.sender.dataItem(e.sender.select()).Version);
            },

            isRowSelected: function (e) {
                if (this.get("selectedId") === -1 || this.get("selectedId") === null || this.get("selectedId") === undefined) {
                    return false;
                }
                else {
                    return true;
                }
            },

            staffSpecialtyEditUrl: function (isNew) {
                if (!isNew) {
                    return $ct.rn.getStaffSpecialty() + "/" + this.selectedId;
                }
                else {
                    return $ct.rn.getStaffSpecialty() + "/" + $ct.constants.getNewRecordId();
                }
            },

            btnAddClick: function (e) {
                Boiler.UrlController.goTo(this.staffSpecialtyEditUrl(true));
            },

            btnEditClick: function (e) {
                Boiler.UrlController.goTo(this.staffSpecialtyEditUrl(false));
            },

            btnDeleteClick: function (e) {

                moduleContext.notify($ct.en.getHideErrorMsg());

                if (!$ct.helpers.displayConfirmWindow($ct.msg.getDeleteConfirmationMsg())) {
                    return;
                }

                $ct.helpers.displayWorkAreaBusyCursor();

                $ct.ds.admin.staffspecialty.deleteStaffSpecialtyById(this, function (data) {

                    $ct.helpers.hideWorkAreaBusyCursor();

                    if ($ct.mt.isVersionConflict(data)) {
                        if ($ct.helpers.displayConfirmWindow($ct.msg.getVersionConflictReloadMsg())) {
                            vm.dsStaffSpecialty.read();
                        }
                        return;
                    }

                    var errorObj = $ct.mt.getErrorObject(data);
                    if (errorObj != null) {
                        moduleContext.notify($ct.en.getShowErrorMsg(), errorObj);
                    }
                    else {
                        moduleContext.notify($ct.en.getShowSuccMsg(), $ct.msg.getStaffSpecialtyDeleteSuccessMsg());
                    }


                    vm.dsStaffSpecialty.read();

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
