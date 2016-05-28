define(["Boiler"], function (Boiler) {

    var ViewModel = function (moduleContext) {


        var vm = kendo.observable({
            showAlerts: true
        });
        //end of observable

        return {
            data: vm
        };

    };
    //end of ViewModel

    return ViewModel;
});
