define(['require', 'Boiler', 'text!./view.html', 'i18n!./nls/resources', './viewmodel'], function (require, Boiler, template, nls, ViewModel) {

    var Component = function (moduleContext) {

        var vm, panel = null;

        moduleContext.listen($ct.en.getDoNotHavePermission(), function () {
            if (vm) {

                vm.data.setHideHomeAndRefresh();

            }
        });


        moduleContext.listen($ct.en.getGoToHome(), function () {
            if (vm) {
                vm.data.goToHome();
            }
        });

        moduleContext.listen($ct.en.getUpdateSecuritySettings(), function () {
            if (vm) {
                vm.data.setUserFullName();
            }
        });

        this.activate = function (parent, params) {
            if (!panel) {

                panel = new Boiler.ViewTemplate(parent, template, nls);
                vm = new ViewModel(moduleContext);
                kendo.bind(panel.getDomElement(), vm.data);
                vm.data.initializeSecurity();
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
