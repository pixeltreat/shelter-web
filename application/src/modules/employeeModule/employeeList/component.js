define(['Boiler', './viewmodel', 'text!./view.html', 'i18n!./nls/resources'], function (Boiler, ViewModel, template, nls) {

    var Component = function (moduleContext) {

        var vm, panel = null;

        var menuClicked = false;

        moduleContext.listen($ct.en.getManageEmployeeClicked(), function () {

            menuClicked = true;

        });



        moduleContext.listen($ct.en.getEmployeeHeaderDataChanged(), function (viewName) {

            if ($ct.rn.getEmployeeList() == viewName) {
                if (vm) {

                    vm.data.shelterChange();
                }
            }

        });



        //To refresh grid data, when redirected from status edit page.
        moduleContext.listen($ct.en.getEmployeeCreatedOrUpdated(), function () {

            if (vm) {

                vm.data.initialize();
                vm.data.initializeEmployeeHeader();
                vm.data.fillGrid();
                

            }
        });


        moduleContext.listen($ct.en.getRefreshView(), function (viewName) {

            if ($ct.rn.getEmployeeList() == viewName) {
                if (vm) {

                    vm.data.initialize();
                    vm.data.refreshEmployeeGrid();
                  

                }
            }

        });

        this.activate = function (parent, params) {


            moduleContext.parentContext.currentView = $ct.rn.getEmployeeList();


            if (menuClicked && panel) {

                menuClicked = false;

                vm.data.initialize();
                vm.data.initializeEmployeeHeader();
                //This function call will clear all flags and reinitialize grid data
                vm.data.clearData();
                //if we want to link the modules comment the above line and uncomment the below line
                //vm.data.fillGrid();
            }


            if (!panel) {

                panel = new Boiler.ViewTemplate(parent, template, nls);
                vm = new ViewModel(moduleContext);

                $("#vwEmployeeList, #vwelDgEmployeeList").delegate("tbody>tr", "dblclick", function (element) {
                    Boiler.UrlController.goTo(vm.data.employeeEditUrl(false));
                });

                kendo.bind(panel.getDomElement(), vm.data);
                menuClicked = false;
                vm.data.initialize();
                vm.data.initializeEmployeeHeader();

                //This function call will clear all flags and reinitialize grid data
                vm.data.clearData();

                //if we want to link the modules comment the above line and uncomment the below line
                //vm.data.fillGrid();


            }

           

            panel.show();

            moduleContext.parentContext.activeForm = $ct.rn.getEmployeeList();
            moduleContext.notify($ct.en.getShowActiveEmployeeHeader(), null);
            moduleContext.notify($ct.en.getShowEmployeeShelterHeader(), null);
            moduleContext.notify($ct.en.getHideSheltereeHeaderNavigation(), null);
            moduleContext.notify($ct.en.getHideSheltereeShelterHeader(), null);

        };

        this.deactivate = function () {
            if (panel) {

                vm.data.setFetchSelectedDataParams();
                panel.hide();

            }

        }

    };

    return Component;

});