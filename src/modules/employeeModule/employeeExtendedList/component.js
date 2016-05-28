define(['Boiler', './viewmodel', 'text!./view.html', 'i18n!./nls/resources'], function (Boiler, ViewModel, template, nls) {

    var Component = function (moduleContext) {

        var vm, panel = null;

        var menuClicked = false;

        moduleContext.listen($ct.en.getManageEmployeeExpandedClicked(), function () {

            menuClicked = true;

        });


        moduleContext.listen($ct.en.getEmployeeHeaderDataChanged(), function (viewName) {

            if ($ct.rn.getEmployeeExtendedList() == viewName) {
                if (vm) {

                    vm.data.shelterChange();

                }
            }

        });


        moduleContext.listen($ct.en.getEmployeeExpandedCreatedOrUpdated(), function () {

            if (vm) {

                vm.data.initialize();
                vm.data.initializeEmployeeHeader();
                vm.data.fillGrid();
                //vm.data.refreshSnapShot();

            }
        });



        moduleContext.listen($ct.en.getRefreshView(), function (viewName) {

            if ($ct.rn.getEmployeeExtendedList() == viewName) {

                if (vm) {

                    vm.data.initialize();
                    vm.data.refreshEmployeeGrid();
                    //vm.data.fillGrid();

                }

            }

        });


        this.activate = function (parent, params) {

            moduleContext.parentContext.currentView = $ct.rn.getEmployeeExtendedList();


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

                $("#vwEmployeeExtendedList, #vwelDgEmployeeExtendedList").delegate("tbody>tr", "dblclick", function (element) {
                    Boiler.UrlController.goTo(vm.data.employeeEditUrl(false));
                });

                kendo.bind(panel.getDomElement(), vm.data);

                vm.data.initialize();
                vm.data.initializeEmployeeHeader();
                vm.data.fillGrid();


                //vm.data.loadFacilityTypes();

            }

            //vm.data.initialize();

            panel.show();


            moduleContext.parentContext.activeForm = $ct.rn.getEmployeeExtendedList();
            moduleContext.notify($ct.en.getShowActiveEmployeeHeader());
            moduleContext.notify($ct.en.getShowEmployeeShelterHeader(), null);

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