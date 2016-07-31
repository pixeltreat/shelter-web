define(["Boiler"], function (Boiler) {

    var ViewModel = function (moduleContext) {


        var vm = kendo.observable({


            logoClick: function ()
            {
                moduleContext.notify($ct.en.getGoToHome());
            }


        });
        //end of observable

        return {
            data: vm
        };

    };
    //end of ViewModel

    return ViewModel;
});
