define(['Boiler', './viewmodel', 'text!./view.html', 'i18n!./nls/resources'], function (Boiler, ViewModel, template, nls) {

    var Component = function (moduleContext) {
        
        var vm, panel = null;


        moduleContext.listen($ct.en.getHideEmployeeHeader(), function () {
            $('#idxEmployeeHeader').hide();
        });

        moduleContext.listen($ct.en.getHideEmployeeHeaderNavigation(), function () {
            $('#idxEmployeeHeader').show();
            $("#activeNav").hide();
            
        });


        moduleContext.listen($ct.en.getShowActiveEmployeeHeader(), function () {
            $('#idxEmployeeHeader').show();
            $("#activeNav").show();


            $("#vwEmployeeHeader").find(".item_nav_active").removeClass("item_nav_active")

            if ($("#vweh" + moduleContext.parentContext.activeForm)[0] != undefined)
                $($("#vweh" + moduleContext.parentContext.activeForm)[0].parentElement).addClass("item_nav_active");


        });


        moduleContext.listen($ct.en.getHideEmployeeShelterHeader(), function () {
            $('#idxEmployeeHeader').show();
            $("#vwehDDLs").hide();

        });


        moduleContext.listen($ct.en.getShowEmployeeShelterHeader(), function () {
            $('#idxEmployeeHeader').show();
            $("#vwehDDLs").show();

        });


        // To load data for shelter types and shelters 
        // when user first visit employee tracking module, this one time operation in entire life cycle of application
        moduleContext.listen($ct.en.getLoadEmployeeHeaderInfo(), function (viewName) {

            if (vm) {              
                vm.data.initializeEmployeeHeader(viewName);
            }

        });

        //raised from main menu, when user clicks on employee tracking from second time onwords
        moduleContext.listen($ct.en.getEmployeeMenuItemClicked(), function () {

            if (vm) {

                vm.data.goToManageEmployees();
            }

        });



        this.activate = function (parent, params) {

            if (!panel) {
                panel = new Boiler.ViewTemplate(parent, template, nls);
                vm = new ViewModel(moduleContext);
                kendo.bind(panel.getDomElement(), vm.data);
                vm.data.intialize();

                //vm.data.fillSnapShot();
            }


            //This div can be used to display readonly patient facility header, on the modules
            //which does not need active patient facility header
            $('#vwehLabels').hide();

            panel.show();
        }

        this.deactivate = function () {
            if (panel) {
                panel.hide();
            }

        }

    };

    return Component;

}); 