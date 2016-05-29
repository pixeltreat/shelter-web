define(["Boiler", 'text!./help/help.html'],
function (Boiler, helpTmpl) {

    var ViewModel = function (moduleContext) {

        var noPermissionVM = kendo.observable({


            helpClick: function (e) {

                var panel = new Boiler.ViewTemplate(null, helpTmpl, null);
                $ct.helpers.displayWindow(panel);
            }



        });

        //end of observable

        return {
            data: noPermissionVM
        };

    };

    return ViewModel;
});


