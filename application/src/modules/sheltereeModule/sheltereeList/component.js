define(['Boiler', './viewmodel', 'text!./view.html', 'i18n!./nls/resources'], function (Boiler, ViewModel, template, nls) {

    var Component = function (moduleContext) {

        var vm, panel = null;



        var menuClicked = false;

        moduleContext.listen($ct.en.getManageSheltereeClicked(), function () {

            menuClicked = true;

        });


        moduleContext.listen($ct.en.getSheltereeHeaderDataChanged(), function (viewName) {

            if ($ct.rn.getSheltereeList() == viewName) {
                if (vm) {

                    vm.data.shelterChange();
                }
            }

        });
        //To refresh grid data, when redirected from shelteree edit page.
        moduleContext.listen($ct.en.getSheltereeCreatedOrUpdated(), function () {

            if (vm) {

                vm.data.initialize();
                vm.data.initializeSheltereeHeader();
                vm.data.fillGrid();
               

            }
        });


        moduleContext.listen($ct.en.getRefreshView(), function (viewName) {

            if ($ct.rn.getSheltereeList() == viewName) {
                if (vm) {

                    vm.data.initialize();
                    vm.data.refreshSheltereeGrid();
                   
                }
            }

        });

        this.activate = function (parent, params) {


            moduleContext.parentContext.currentView = $ct.rn.getSheltereeList();


            if (menuClicked && panel) {

                menuClicked = false;

                vm.data.initialize();
                vm.data.initializeSheltereeHeader();
                //This function call will clear all flags and reinitialize grid data
                vm.data.clearData();
                //if we want to link the modules comment the above line and uncomment the below line
                //vm.data.fillGrid();
            }


            if (!panel) {

                panel = new Boiler.ViewTemplate(parent, template, nls);
                vm = new ViewModel(moduleContext);

                $("#vwSheltereeList, #vwslDgSheltereeList").delegate("tbody>tr", "dblclick", function (element) {
                    Boiler.UrlController.goTo(vm.data.sheltereeEditUrl(false));
                });

                kendo.bind(panel.getDomElement(), vm.data);

                vm.data.initialize();
                vm.data.initializeSheltereeHeader();

                //This function call will clear all flags and reinitialize grid data
                vm.data.clearData();

                //if we want to link the modules comment the above line and uncomment the below line
                //vm.data.fillGrid();
            }

          

            panel.show();
            moduleContext.parentContext.activeForm = $ct.rn.getSheltereeList();
            moduleContext.notify($ct.en.getShowActiveSheltereeHeader(), null);
            moduleContext.notify($ct.en.getShowSheltereeShelterHeader(), null);
            moduleContext.notify($ct.en.getHideEmployeeHeaderNavigation(), null);
            moduleContext.notify($ct.en.getHideEmployeeShelterHeader(), null);
        }

        this.deactivate = function () {
            if (panel) {
                vm.data.setFetchSelectedDataParams();
                panel.hide();
            }
        }

    };

    return Component;

});