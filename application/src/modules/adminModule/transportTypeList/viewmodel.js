
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



            dsTransportationTypeList: function () {

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
                this.set("dsTransportationTypeList", $ct.ds.admin.transportationType.getTransportationTypes(this));

            },

            seachTransportationTypes: function (e) {
                if (this.initialSearchToken !== this.searchToken) {
                    this.fillGrid();
                    this.initialSearchToken = this.searchToken;
                }
            },

            refreshTransportationTypesGrid: function (e) {
                vm.dsTransportationTypeList.read();
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






            transportTypestEditUrl: function (isNew) {

                if (!isNew) {
                    return $ct.rn.getTransportType() + "/" + this.selectedId;
                }
                else {
                    return $ct.rn.getTransportType() + "/" + $ct.constants.getNewRecordId();
                }
            },

            btnAddClick: function (e) {
                Boiler.UrlController.goTo(this.transportTypestEditUrl(true));
            },

            btnEditClick: function (e) {
                Boiler.UrlController.goTo(this.transportTypestEditUrl(false));
            },
            btnDeleteClick: function (e) {

                moduleContext.notify($ct.en.getHideErrorMsg());

                if (!$ct.helpers.displayConfirmWindow($ct.msg.getDeleteConfirmationMsg())) {
                    return;
                }

                $ct.helpers.displayWorkAreaBusyCursor();

                $ct.ds.admin.transportationType.deleteTransportationTypeById(this, function (data) {

                    $ct.helpers.hideWorkAreaBusyCursor();

                    if ($ct.mt.isVersionConflict(data)) {
                        if ($ct.helpers.displayConfirmWindow($ct.msg.getVersionConflictReloadMsg())) {
                            vm.dsTransportationTypeList.read();
                        }
                        return;
                    }

                    var errorObj = $ct.mt.getErrorObject(data);
                    if (errorObj != null) {
                        moduleContext.notify($ct.en.getShowErrorMsg(), errorObj);
                    }
                    else {
                        moduleContext.notify($ct.en.getShowSuccMsg(), $ct.msg.getTransportTypeDeleteSuccessMsg());
                    }


                    vm.dsTransportationTypeList.read();

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
