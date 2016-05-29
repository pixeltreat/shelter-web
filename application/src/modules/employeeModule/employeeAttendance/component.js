define(['Boiler', './viewmodel', 'text!./view.html', 'i18n!./nls/resources'], function (Boiler, ViewModel, template, nls) {

    var Component = function (moduleContext) {

        var vm, panel = null;


     
        moduleContext.listen($ct.en.getRefreshView(), function (viewName) {

            if ($ct.rn.getEmployeeAttendance() == viewName) {

                if (vm) {
                    refreshViewData();
                }
            }
        });

        moduleContext.listen($ct.en.getEmployeeAttendanceUpdated(), function (viewName) {


          
                if (vm) {
                   
                    vm.data.refreshEmployeeAttendanceGrid();
                }
            

        });
        
        moduleContext.listen($ct.en.getEmployeeAttendenceList(), function () {
           
            refreshViewData();
        });


        var refreshViewData = function () {
            
            if (panel) {

                moduleContext.parentContext.dcRequestData = {
                    viewAll: false,
                    fetchSelectedOnly: false,
                    selectedEmployeeIds: new kendo.data.ObservableArray([]),
                    unSelectedEmployeeIds: new kendo.data.ObservableArray([])
                };


                vm = new ViewModel(moduleContext);
                kendo.bind(panel.getDomElement(), vm.data);
                vm.data.initializeEvent();
                vm.data.initializeGlobalData();
                vm.data.initializeFacilities();
               
               


            }
          

        }

      
        this.activate = function (parent, params) {

            //Set the current view(route name), if view needs refesh functionality
            moduleContext.parentContext.currentView = $ct.rn.getEmployeeAttendance();

            if (!panel) {
                
                panel = new Boiler.ViewTemplate(parent, template, nls);

                moduleContext.parentContext.dcRequestData = {
                    viewAll: true,
                    fetchSelectedOnly: false,
                    selectedEmployeeIds: new kendo.data.ObservableArray([]),
                    unSelectedEmployeeIds: new kendo.data.ObservableArray([])
                };


                vm = new ViewModel(moduleContext);
                kendo.bind(panel.getDomElement(), vm.data);
                vm.data.initializeGlobalData();
                vm.data.initializeFacilities();
                vm.data.initializeEvent();

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