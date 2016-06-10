define(['Boiler', './viewmodel', 'text!./view.html', 'i18n!./nls/resources'], function (Boiler, ViewModel, template, nls) {

    var Component = function (moduleContext) {

        var vm, panel = null;


        moduleContext.listen($ct.en.getRefreshView(), function (viewName) {

            if ($ct.rn.getUploadShelteree() == viewName) {

                if (vm) {
                    vm.data.clearData();
                    vm.data.initialize();
                }

            }

        });


        this.activate = function (parent, params) {

            //Set the current view(route name), if view needs refesh functionality
            moduleContext.parentContext.currentView = $ct.rn.getUploadShelteree();


            if (!panel) {

                panel = new Boiler.ViewTemplate(parent, template, nls);
                vm = new ViewModel(moduleContext);
                kendo.bind(panel.getDomElement(), vm.data);
            }

            vm.data.clearData();
            vm.data.initialize();
            panel.show();
            moduleContext.parentContext.activeForm = $ct.rn.getUploadShelteree();
            moduleContext.notify($ct.en.getShowActiveSheltereeHeader(), null);
            moduleContext.notify($ct.en.getHideSheltereeShelterHeader(), null);
            moduleContext.notify($ct.en.getHideEmployeeHeaderNavigation(), null);
            moduleContext.notify($ct.en.getHideEmployeeShelterHeader(), null);
        }

        this.deactivate = function () {
            if (panel) {
                $("#vwusDivGrid").hide();
                panel.hide();
            }
        }

    };

    return Component;

});