define(['Boiler', './viewmodel', 'text!./view.html', 'i18n!./nls/resources'], function (Boiler, ViewModel, template, nls) {

    var Component = function (moduleContext) {

        var vm, panel = null;

        var menuClicked = false;

        moduleContext.listen($ct.en.getManageSheltereeMedicalUpdateClicked(), function () {

            menuClicked = true;

        });

        moduleContext.listen($ct.en.getSheltereeHeaderDataChanged(), function (viewName) {

            if ($ct.rn.getSheltereeMedicalUpdateList() == viewName) {
                if (vm) {

                    vm.data.shelterChange();
                }
            }

        });

        //To refresh grid data, when redirected from shelteree edit page.
        moduleContext.listen($ct.en.getSheltereeMedicalUpdateCreatedOrUpdated(), function () {

            if (vm) {

                vm.data.initialize();
                vm.data.initializeSheltereeHeader();
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

            if ($ct.rn.getSheltereeMedicalUpdateList() == viewName) {
                if (vm) {

                    vm.data.initialize();
                    vm.data.refreshSheltereeGrid();
                    //vm.data.fillGrid();

                }
            }

        });


        this.activate = function (parent, params) {

            //Set the current view(route name), if view needs refesh functionality
            moduleContext.parentContext.currentView = $ct.rn.getSheltereeMedicalUpdateList();

            if (menuClicked && panel) {

                menuClicked = false;

                vm.data.initialize();
                vm.data.initializeSheltereeHeader();
                vm.data.fillGrid();
                //vm.data.refreshSnapShot();
            }


            if (!panel) {

                panel = new Boiler.ViewTemplate(parent, template, nls);
                vm = new ViewModel(moduleContext);

                $("#vwSheltereeMedicalUpdateList, #vwsmulDgSheltereeMedicalUpdateList").delegate("tbody>tr", "dblclick", function (element) {
                    Boiler.UrlController.goTo(vm.data.sheltereeEditUrl(false));
                });

                kendo.bind(panel.getDomElement(), vm.data);

                vm.data.initialize();
                vm.data.initializeSheltereeHeader();
                vm.data.fillGrid();


                //vm.data.loadFacilityTypes();

                //vm.data.fillGrid();
            }

           
            panel.show();
            moduleContext.parentContext.activeForm = $ct.rn.getSheltereeMedicalUpdateList();
            moduleContext.notify($ct.en.getShowActiveSheltereeHeader(), null);
            moduleContext.notify($ct.en.getShowSheltereeShelterHeader(), null);
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