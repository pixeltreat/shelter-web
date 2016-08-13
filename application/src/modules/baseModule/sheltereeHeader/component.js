define(['Boiler', './viewmodel', 'text!./view.html', 'i18n!./nls/resources'], function (Boiler, ViewModel, template, nls) {

    var Component = function (moduleContext) {

        var vm, panel = null;


        moduleContext.listen($ct.en.getHideSheltereeHeader(), function () {
            $('#idxSheltereeHeader').hide();
        });

        moduleContext.listen($ct.en.getHideSheltereeHeaderNavigation(), function () {
            $('#idxSheltereeHeader').show();
            $("#activeNavSheltereeheader").hide();

        });


        moduleContext.listen($ct.en.getShowActiveSheltereeHeader(), function () {

            $('#idxSheltereeHeader').show();
            $("#activeNavSheltereeheader").show();

        });


        moduleContext.listen($ct.en.getHideSheltereeShelterHeader(), function () {
            $('#idxSheltereeHeader').show();
            $("#vwshDDLs").hide();
            $("#vwshCensus").hide();

        });


        moduleContext.listen($ct.en.getShowSheltereeShelterHeader(), function () {
            $('#idxSheltereeHeader').show();
            $("#vwshDDLs").show();
            $("#vwshCensus").show();

        });


        // To load data for shelter types and shelters
        // when user first visit employee tracking module, this one time operation in entire life cycle of application
        moduleContext.listen($ct.en.getLoadSheltereeHeaderInfo(), function (viewName) {

            if (vm) {
                vm.data.initializeSheltereeHeader(viewName);
            }

        });

        //raised from main menu, when user clicks on employee tracking from second time onwords
        moduleContext.listen($ct.en.getSheltereeMenuItemClicked(), function () {

            if (vm) {

                vm.data.goToManageShelterees();
            }

        });



        //for shelter census data
        moduleContext.listen($ct.en.getSheltereeCensusData(), function (shelterCensusData) {

            if (vm) {
                vm.data.shelterCensusData(shelterCensusData);
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
            $('#vwshLabels').hide();

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
