define(['Boiler', './viewmodel', 'text!./view.html', 'i18n!./nls/resources'], function (Boiler, ViewModel, template, nls) {

    var Component = function (moduleContext) {

        var vm, panel = null;
        var qryParams = null;


        var reloadEmployeeRecord = function () {

            if (vm) {

                vm = new ViewModel(moduleContext);
                kendo.bind(panel.getDomElement(), vm.data);
                vm.data.fillQueryParam(qryParams);

                vm.data.initializeShelters();
            }

        }

        //To handle version conflict we are using events, this is only the place we are using events
        //to handle version conflict. Followed this approach to avoid issues.
        moduleContext.listen($ct.en.getEmployeeRecordReload(), function () {

            reloadEmployeeRecord();

        });

        moduleContext.listen($ct.en.getRefreshView(), function (viewName) {

            if ($ct.rn.getEmployee() == viewName) {

                reloadEmployeeRecord();

            }

        });


        this.activate = function (parent, params) {
            qryParams = params;
           // moduleContext.parentContext.currentView = $ct.rn.getEmployee();

            //Set the current view(route name), if view needs refesh functionality
            moduleContext.parentContext.currentView = $ct.rn.getEmployee();

            if (!panel) {
                panel = new Boiler.ViewTemplate(parent, template, nls);


                //$("#vwptTbDOB").focusout(function () {
                //    vm.data.isValidDOB();
                //});

            }

            panel.show();

            vm = new ViewModel(moduleContext);
            kendo.bind(panel.getDomElement(), vm.data);
            vm.data.fillQueryParam(params);

            vm.data.initializeShelters();

            //intitialize kendo validator
            var validatorForm = $("#vwEmployee").kendoValidator().data("kendoValidator");

            moduleContext.notify($ct.en.getHideEmployeeHeaderNavigation(), null);
            moduleContext.notify($ct.en.getHideEmployeeShelterHeader(), null);
           
        }


        //To refresh grid data, when redirected from status edit page.
        //        moduleContext.listen($ct.en.getAddEditPatientRefresh(), function () {

        //            if (vm) {
        //                vm.data.resetFields();
        //            }
        //        });


        this.deactivate = function () {
            if (panel) {
                panel.hide();
            }

        }

    };

    return Component;

});