
define(['Boiler', './viewmodel', 'text!./view.html', 'i18n!./nls/resources'], function (Boiler, ViewModel, template, nls) {

    var Component = function (moduleContext) {

        var vm, panel = null;


        moduleContext.listen($ct.en.getRefreshView(), function (viewName) {
            if ($ct.rn.getSheltreeEmployeeRatioList() == viewName) {
                refreshViewData();
            }
        });


        //To refresh grid data, when redirected from status edit page.
        moduleContext.listen($ct.en.getSheltreeEmployeeRatioCreatedOrUpdated(), function () {

            if (vm) {
                vm.data.refreshSheltreeEmployeeRatioGrid();
            }
        });


        moduleContext.listen($ct.en.getDisplaySheltreeEmployeeRatioList(), function () {

            refreshViewData();

        });

        var refreshViewData = function () {

            if (panel) {
                vm = new ViewModel(moduleContext);
                kendo.bind(panel.getDomElement(), vm.data);
            }

        }


        this.activate = function (parent, params) {

            //Set the current view(route name), if view needs refesh functionality
            moduleContext.parentContext.currentView = $ct.rn.getSheltreeEmployeeRatioList();


            if (!panel) {

                panel = new Boiler.ViewTemplate(parent, template, nls);
                vm = new ViewModel(moduleContext);

                $("#vwSheltreeEmployeeRatioList, #vwserlDgSheltreeEmployeeRatio").delegate("tbody>tr", "dblclick", function (element) {
                    Boiler.UrlController.goTo(vm.data.sheltreeEmployeeRatioEditUrl(false));
                });

                kendo.bind(panel.getDomElement(), vm.data);
            }

            panel.show();
            moduleContext.notify($ct.en.getHideEmployeeHeaderNavigation(), null);
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