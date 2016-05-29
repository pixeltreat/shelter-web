define(["Boiler", 'text!./help/help.html'], function (Boiler, helpTmpl) {

    var ViewModel = function (moduleContext) {


        var vm = kendo.observable(
        {


            helpClick: function (e) {

                var panel = new Boiler.ViewTemplate(null, helpTmpl, null);
                $ct.helpers.displayWindow(panel, $ct.ht.getHelp());
            },


            userFullName: "",

            setUserFullName: function (e) {

                vm.set("userFullName", $ct.security.getUserName());

            },


            showHomeAndRefresh: true,

            setHideHomeAndRefresh: function () {

                vm.set("showHomeAndRefresh", false);

            },


            showHomeAndRefreshStyle: function () {

                if (vm.get("showHomeAndRefresh")) {
                    return $ct.styles.getBlockStyle();
                }
                else {
                    return $ct.styles.getNoneStyle();
                }
            },


            goToHome: function () {

                moduleContext.notify($ct.en.getDisplayTransportTypeList(), null);
                Boiler.UrlController.goTo($ct.rn.getTransportTypeList());

            },

            homeClick: function (e) {

                if (!this.showHomeAndRefresh)
                    return;

                vm.goToHome();

            },

            refreshClick: function (e) {

                if (moduleContext.parentContext.currentView != undefined) {
                    moduleContext.notify($ct.en.getRefreshView(), moduleContext.parentContext.currentView);
                }
                else {
                    //for development purpose
                    $ct.helpers.displayAlertWindow("Current view not set");
                }
            },


            initializeSecurity: function () {
               
                var data = $ct.ds.common.getUserIdentityData(function (result) {


                    var errorObj = $ct.mt.getErrorObject(result);
                    if (errorObj != null) {

                        $ct.security.authenticationFailedAction();
                        return;

                    }


                    if (result.Data == undefined) {

                        $ct.security.authenticationFailedAction();
                        return;
                    }

                    if (result.Data.UserIdentity == undefined) {

                        $ct.security.authenticationFailedAction();
                        return;
                    }

                    if (result.Data.UserIdentity.IsAuthenticated == undefined) {

                        $ct.security.authenticationFailedAction();
                        return;
                    }

                    if (result.Data.UserIdentity.Roles == undefined) {

                        //Donot have permission
                        $ct.security.authenticationFailedAction();
                        return;
                    }

                    if (!result.Data.UserIdentity.IsAuthenticated) {

                        $ct.security.authenticationFailedAction();
                        return;
                    }

                    $ct.security.setUserIdentity(result.Data.UserIdentity);

                    $ct.security.setRoles();

                    //security object is available from here onwords

                    moduleContext.notify($ct.en.getUpdateSecuritySettings(), null);


                    if (!$ct.security.isValidRole()) {

                        //Donot have permission
                        $ct.security.authenticationFailedAction();
                        return;

                    }

                    $ct.helpers.hidePageBusyCursor();
                    vm.goToHome();

                });
                
            },

            logOutClick : function (e) {

                $(document).ajaxError(null);

                window.location.href = "logOut.aspx";

            }

        }
        );
        //end of observable

        return {
            data: vm
        };

    };
    //end of ViewModel

    return ViewModel;
});
