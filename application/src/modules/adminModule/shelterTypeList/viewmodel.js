define(["Boiler", 'text!./help/help.html'], function (Boiler, helpTmpl) {

    var ViewModel = function (moduleContext) {

        var vm = kendo.observable({

            pageName: "Shelter Type List page",

            helpClick: function (e) {

                var panel = new Boiler.ViewTemplate(null, helpTmpl, null);
                $ct.helpers.displayWindow(panel);
            },


            searchToken: "",
            initialSearchToken: "",

            selectedId: -1,
            selectedRecordVersion: -1,

            dsShelterType: function () {
                this.fillGrid();
            },

            fillGrid: function () {
                this.set("dsShelterType", $ct.ds.admin.sheltertype.getShelterTypes(this));
            },

            searchShelterTypes: function (e) {
                if (this.initialSearchToken !== this.searchToken) {
                    this.fillGrid();
                    this.initialSearchToken = this.searchToken;
                }
            },

            refreshShelterTypeGrid: function (e) {
                vm.dsShelterType.read();
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

            shelterTypeEditUrl: function (isNew) {
                if (!isNew) {
                    return $ct.rn.getShelterType() + "/" + this.selectedId;
                }
                else {
                    return $ct.rn.getShelterType() + "/" + $ct.constants.getNewRecordId();
                }
            },

            btnAddClick: function (e) {
                Boiler.UrlController.goTo(this.shelterTypeEditUrl(true));
            },

            btnEditClick: function (e) {
                this.set("selectedId", e.data.Id);
                this.set("selectedRecordVersion", e.data.Version);
                Boiler.UrlController.goTo(this.shelterTypeEditUrl(false));
            },

            btnDeleteClick: function (e) {

                moduleContext.notify($ct.en.getHideErrorMsg());

                if (!$ct.helpers.displayConfirmWindow($ct.msg.getDeleteConfirmationMsg())) {
                    return;
                }

                $ct.helpers.displayWorkAreaBusyCursor();

                this.set("selectedId", e.data.Id);
                this.set("selectedRecordVersion", e.data.Version);

                $ct.ds.admin.sheltertype.deleteShelterTypeById(this, function (data) {

                    $ct.helpers.hideWorkAreaBusyCursor();

                    if ($ct.mt.isVersionConflict(data)) {
                        if ($ct.helpers.displayConfirmWindow($ct.msg.getVersionConflictReloadMsg())) {
                            vm.dsShelterType.read();
                        }
                        return;
                    }

                    var errorObj = $ct.mt.getErrorObject(data);
                    if (errorObj != null) {
                        moduleContext.notify($ct.en.getShowErrorMsg(), errorObj);
                    }
                    else {
                        moduleContext.notify($ct.en.getShowSuccMsg(), $ct.msg.getShelterTypeDeleteSuccessMsg());
                    }


                    vm.dsShelterType.read();

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
