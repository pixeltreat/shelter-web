define(['Boiler', './viewmodel', 'text!./view.html', 'i18n!./nls/resources'], function (Boiler, ViewModel, template, nls) {

    var Component = function (moduleContext) {

        var vm, panel = null;


        moduleContext.listen($ct.en.getRefreshView(), function (viewName) {

            if ($ct.rn.getBulkUpdateEmployee() == viewName) {
                if (vm) {
                    vm.data.resetFields();
                }
            }

        });


        this.activate = function (parent, params) {

            moduleContext.parentContext.currentView = $ct.rn.getBulkUpdateEmployee();

            if (!panel) {
                panel = new Boiler.ViewTemplate(parent, template, nls);
                vm = new ViewModel(moduleContext);
                kendo.bind(panel.getDomElement(), vm.data);
                //vm.data.Intialize();

            }

            vm.data.resetFields();

            panel.show();


            moduleContext.notify($ct.en.getHideEmployeeHeaderNavigation(), null);
            moduleContext.notify($ct.en.getHideEmployeeShelterHeader(), null);
        }

        //        moduleContext.listen($ct.en.getBulkUpdatePatients(), function () {

        //            if (vm != undefined) {
        //                vm.data.get("resetFields")();
        //            }
        //        });


        this.deactivate = function () {
            if (panel) {
                panel.hide();
            }

        }

    };

    return Component;

});