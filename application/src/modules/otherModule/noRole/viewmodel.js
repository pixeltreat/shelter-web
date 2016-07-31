define(["Boiler", 'text!./help/help.html'],
function (Boiler, helpTmpl) {

    var ViewModel = function (moduleContext) {

        var noRoleVM = kendo.observable({


            helpClick: function (e) {

                var panel = new Boiler.ViewTemplate(null, helpTmpl, null);
                $ct.helpers.displayWindow(panel);
            }



        });

        //end of observable

        return {
            data: noRoleVM
        };

    };

    return ViewModel;
});


