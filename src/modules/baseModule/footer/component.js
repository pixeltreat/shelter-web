define(['require', 'Boiler', 'text!./view.html', 'i18n!./nls/resources', './viewmodel'], function (require, Boiler, template, nls, ViewModel) {

    var Component = function (moduleContext) {

        var vm, panel = null;

        moduleContext.listen($ct.en.getDoNotHavePermission(), function () {
            if (vm) {

                vm.data.setHideMenu();

            }
        });


        moduleContext.listen($ct.en.getUpdateSecuritySettings(), function () {

            if (vm) {

                // WRITE CODE HERE TO CONTROL FOOTER MENU ITEMS

                /*
                if (
                $ct.security.isSuperAdminRole() ||
                $ct.security.isAdminRole()
                ) {
                    vm.data.setShowDataCell();
                }

                if (
                $ct.security.isDataCellRole()
                ) {
                    vm.data.setShowDataCell();
                }
                //comment following else and remove hide code in view for dashboard, to enable dashboard for all views
                //including datacell.
                else {
                    vm.data.setShowDashboard();
                }


                if (!$ct.security.isFacilityReadOnlyRole()) {

                    vm.data.setShowPatientTracking();

                }
                */

            }

        });

        this.activate = function (parent, params) {
            if (!panel) {

                panel = new Boiler.ViewTemplate(parent, template, nls);
                vm = new ViewModel(moduleContext);
                kendo.bind(panel.getDomElement(), vm.data);

            }
            panel.show();

        }

        this.deactivate = function () {
            if (panel) {
                panel.hide();
            }
        }

    };

    return Component;

});
