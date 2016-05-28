define(['Boiler', './viewmodel', 'text!./view.html', 'i18n!./nls/resources'], function (Boiler, ViewModel, template, nls) {

    var Component = function (moduleContext) {

        var vm, panel = null;



        moduleContext.listen($ct.en.getRefreshView(), function (viewName) {

            if ($ct.rn.getDownloadEmployee() == viewName) {

                if (vm) {
                    vm.data.initializeShelters();
                }
            }
        });


        this.activate = function (parent, params) {

            //Set the current view(route name), if view needs refesh functionality
            moduleContext.parentContext.currentView = $ct.rn.getDownloadEmployee();


            if (!panel) {

                panel = new Boiler.ViewTemplate(parent, template, nls);
                vm = new ViewModel(moduleContext);
                kendo.bind(panel.getDomElement(), vm.data);

            }


            vm.data.initializeShelters();

            panel.show();

            moduleContext.parentContext.activeForm = $ct.rn.getDownloadEmployee();
            moduleContext.notify($ct.en.getShowActiveEmployeeHeader(), null);
            moduleContext.notify($ct.en.getHideEmployeeShelterHeader(), null);

        }

        this.deactivate = function () {
            if (panel) {
                panel.hide();
            }
        }

    };

    return Component;

});