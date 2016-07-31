
$ct.security = function () {


    var authenticationFailedAction = function () {

        var event = jQuery.Event($ct.en.getGoToNoPermissionPage());
        $(document).trigger(event);

    };


    var userIdentity = null;

    var setUserIdentity = function (userIdentityObj) {
        userIdentity = userIdentityObj;
    };


    var isValidRole = function () {

        if (userIdentity == null || userIdentity == undefined) {
            authenticationFailedAction();
        }

        validRole = false;
        $.each(userIdentity.Roles, function (index, record) {

            if (
                    (record.Key == $ct.roles.getSuperAdminId()) ||

                    (record.Key == $ct.roles.getAdministratorId()) ||

                    (record.Key == $ct.roles.getFacilityUpdateId()) ||

                    (record.Key == $ct.roles.getFacilityReadOnlyId())

            ) {
                validRole = true;
            }

        });

        return validRole;

    };


    var setRoles = function () {

        if (userIdentity == null || userIdentity == undefined) {
            authenticationFailedAction();
        }

        $.each(userIdentity.Roles, function (index, record) {

            if (record.Key == $ct.roles.getSuperAdminId())
                isSuperAdmin = true;

            if (record.Key == $ct.roles.getAdministratorId())
                isAdmin = true;

            if (record.Key == $ct.roles.getFacilityUpdateId())
                isFacilityUpdate = true;

            if (record.Key == $ct.roles.getFacilityReadOnlyId())
                isFacilityReadOnly = true;

        });


        //Setting highest role

        if (isSuperAdmin) {

            isAdmin = false;
            isFacilityUpdate = false;
            isFacilityReadOnly = false;

        }

        if (isAdmin) {

            isFacilityUpdate = false;
            isFacilityReadOnly = false;

        }

        if (isFacilityUpdate) {

            isFacilityReadOnly = false;
        
        }


    };


    var isSuperAdmin = false;

    var isSuperAdminRole = function () {
        return isSuperAdmin
    };

    var isAdmin = false;

    var isAdminRole = function () {
        return isAdmin
    };

    var isFacilityUpdate = false;

    var isFacilityUpdateRole = function () {
        return isFacilityUpdate
    };

    var isFacilityReadOnly = false;

    var isFacilityReadOnlyRole = function () {
        return isFacilityReadOnly
    };




    var getUserName = function () {

        if (userIdentity == null || userIdentity == undefined) {
            authenticationFailedAction();
        }

        return userIdentity.UserFullName;

    };

    var isMultiFacilityUser = function () {

        if (userIdentity == null || userIdentity == undefined) {
            authenticationFailedAction();
        }

        if (userIdentity.IsMultiFacilityUser) {
            return true;
        }
        else {
            return false;
        }

    };



    return {

        authenticationFailedAction: authenticationFailedAction,
        setUserIdentity: setUserIdentity,
        isValidRole: isValidRole,
        getUserName: getUserName,
        isMultiFacilityUser: isMultiFacilityUser,

        setRoles: setRoles,

        //calling setRoles function is prerequisite
        isSuperAdminRole: isSuperAdminRole,
        isAdminRole: isAdminRole,
        isFacilityUpdateRole: isFacilityUpdateRole,
        isFacilityReadOnlyRole: isFacilityReadOnlyRole
        
    };
} ();