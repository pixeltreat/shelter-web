define(['require', 'Boiler', 'text!./view.html', 'i18n!./nls/resources', './viewmodel'], function (require, Boiler, template, nls, ViewModel) {

    var Component = function (moduleContext) {

        var vm, panel = null;

        this.activate = function (parent, params) {
            if (!panel) {

                panel = new Boiler.ViewTemplate(parent, template, nls);
                vm = new ViewModel(moduleContext);
                kendo.bind(panel.getDomElement(), vm.data);

            }
            panel.show();

        };

        this.deactivate = function () {
            if (panel) {
                panel.hide();
            }
        };

    };

    return Component;

});
