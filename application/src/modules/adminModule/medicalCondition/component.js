define(['Boiler', './viewmodel', 'text!./view.html', 'i18n!./nls/resources'], function (Boiler, ViewModel, template, nls) {

    var Component = function (moduleContext) {

        var vm, panel = null;



        moduleContext.listen($ct.en.getRefreshView(), function (viewName) {

            if ($ct.rn.getMedicalCondition() == viewName) {

                if (vm) {
                    vm.data.initialize();
                }
            }
        });


        this.activate = function (parent, params) {

            //Set the current view(route name), if view needs refesh functionality
            moduleContext.parentContext.currentView = $ct.rn.getMedicalCondition();


            if (!panel) {

                panel = new Boiler.ViewTemplate(parent, template, nls);
                vm = new ViewModel(moduleContext);
                kendo.bind(panel.getDomElement(), vm.data);

            }

            vm.data.fillQueryParam(params);
            vm.data.initialize();

            ////intitialize kendo validator
            var validatorForm = $("#vwMedicalCondition").kendoValidator().data("kendoValidator");
            $('textarea').maxlength();
            panel.show();
            moduleContext.notify($ct.en.getHideEmployeeHeaderNavigation(), null);
            moduleContext.notify($ct.en.getHideEmployeeShelterHeader(), null);
            moduleContext.notify($ct.en.getHideSheltereeHeaderNavigation(), null);
            moduleContext.notify($ct.en.getHideSheltereeShelterHeader(), null);
        }

        this.deactivate = function () {
            if (panel) {
                panel.hide();
            }
        }

    };

    return Component;

});