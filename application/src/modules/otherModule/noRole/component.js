define(['Boiler', './viewmodel', 'text!./view.html', 'i18n!./nls/resources'], function (Boiler, ViewModel, template, nls) {

    var Component = function (moduleContext) {

        var vm, panel = null;




        this.activate = function (parent, params) {

            if (!panel) {

                panel = new Boiler.ViewTemplate(parent, template, nls);

                vm = new ViewModel(moduleContext);
                kendo.bind(panel.getDomElement(), vm.data);

            }

            moduleContext.notify($ct.en.getHideErrorMsg());

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