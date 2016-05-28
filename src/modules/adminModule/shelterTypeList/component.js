
define(['Boiler', './viewmodel', 'text!./view.html', 'i18n!./nls/resources'], function (Boiler, ViewModel, template, nls) {

    var Component = function (moduleContext) {

        var vm, panel = null;

        
        moduleContext.listen($ct.en.getRefreshView(), function (viewName) {
            if ($ct.rn.getShelterTypeList() == viewName) {
                refreshViewData();
            }
        });


        //To refresh grid data, when redirected from  edit page.
        moduleContext.listen($ct.en.getShelterTypeCreatedOrUpdated(), function () {

            if (vm) {
                vm.data.refreshShelterTypeGrid();
            }
        });


        moduleContext.listen($ct.en.getDisplayShelterTypeList(), function () {

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
            moduleContext.parentContext.currentView = $ct.rn.getShelterTypeList();


            if (!panel) {

                panel = new Boiler.ViewTemplate(parent, template, nls);
                vm = new ViewModel(moduleContext);

                $("#vwShelterTypeList, #vwshtlDgShelterType").delegate("tbody>tr", "dblclick", function (element) {
                    Boiler.UrlController.goTo(vm.data.shelterTypeEditUrl(false));
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