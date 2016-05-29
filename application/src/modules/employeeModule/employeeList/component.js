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
                //vm.data.refreshSnapShot();

            }
        });



        //raised from main menu, when user clicks on patient tracking from second time onwords
        //        moduleContext.listen($ct.en.getPatientMenuItemClicked(), function () {

        //            if (vm) {

        //                vm.data.reinitializeData();
        //            }

        //        });



        //raised from main menu
        //        moduleContext.listen($ct.en.getManagePatientsList(), function () {

        //            if (vm) {
        //                vm.data.reinitializeData();
        //            }

        //        });



        moduleContext.listen($ct.en.getRefreshView(), function (viewName) {

            if ($ct.rn.getEmployeeList() == viewName) {
                if (vm) {

                    vm.data.initialize();
                    vm.data.refreshEmployeeGrid();
                    //vm.data.fillGrid();

                }
            }

        });

        this.activate = function (parent, params) {


            moduleContext.parentContext.currentView = $ct.rn.getEmployeeList();


            if (menuClicked && panel) {

                menuClicked = false;

                vm.data.initialize();
                vm.data.initializeEmployeeHeader();
                vm.data.fillGrid();
                //vm.data.refreshSnapShot();
            }


            if (!panel) {

                panel = new Boiler.ViewTemplate(parent, template, nls);
                vm = new ViewModel(moduleContext);

                $("#vwEmployeeList, #vwelDgEmployeeList").delegate("tbody>tr", "dblclick", function (element) {
                    Boiler.UrlController.goTo(vm.data.employeeEditUrl(false));
                });

                kendo.bind(panel.getDomElement(), vm.data);

                vm.data.initialize();
                vm.data.initializeEmployeeHeader();
                vm.data.fillGrid();


                //vm.data.loadFacilityTypes();

                //vm.data.fillGrid();
            }

            //vm.data.initialize();

            panel.show();

            moduleContext.parentContext.activeForm = $ct.rn.getEmployeeList();
            moduleContext.notify($ct.en.getShowActiveEmployeeHeader(), null);
            moduleContext.notify($ct.en.getShowEmployeeShelterHeader(), null);

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