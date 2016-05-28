
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
            (record.Key == $ct.roles.getAdministratorId()) ||

            (record.Key == $ct.roles.getAssociationId()) ||

            (record.Key == $ct.roles.getCallCenterId()) ||

            (record.Key == $ct.roles.getDrcId()) ||

            (record.Key == $ct.roles.getDataCellId()) ||

            (record.Key == $ct.roles.getFacilityUpdateId()) ||

            (record.Key == $ct.roles.getFacilityReadOnlyId()) ||

            (record.Key == $ct.roles.getSuperAdminId())

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

            if (record.Key == $ct.roles.getAdministratorId())
                isAdmin = true;

            if (record.Key == $ct.roles.getAssociationId())
                isAssociation = true;

            if (record.Key == $ct.roles.getCallCenterId())
                isCallCenter = true;

            if (record.Key == $ct.roles.getDrcId())
                isDrc = true;

            if (record.Key == $ct.roles.getDataCellId())
                isDataCell = true;

            if (record.Key == $ct.roles.getFacilityUpdateId())
                isFacilityUpdate = true;

            if (record.Key == $ct.roles.getFacilityReadOnlyId())
                isFacilityReadOnly = true;

            if (record.Key == $ct.roles.getSuperAdminId())
                isSuperAdmin = true;

        });


        //Setting highest role

        if (isSuperAdmin) {

            isAdmin = false;
            isAssociation = false;
            isCallCenter = false;
            isDrc = false;
            isDataCell = false;
            isFacilityUpdate = false;
            isFacilityReadOnly = false;

        }

        if (isAdmin) {
            isAssociation = false;
            isCallCenter = false;
            isDrc = false;
            isDataCell = false;
            isFacilityUpdate = false;
            isFacilityReadOnly = false;
        }

        if (isDataCell) {

            isAssociation = false;
            isCallCenter = false;
            isDrc = false;
            isFacilityUpdate = false;
            isFacilityReadOnly = false;

        }




        if (isCallCenter) {

            isAssociation = false;
            isDrc = false;
            isFacilityUpdate = false;
            isFacilityReadOnly = false;

        }


        if (isAssociation) {

            isDrc = false;
            isFacilityUpdate = false;
            isFacilityReadOnly = false;

        }

        if (isDrc) {

            isFacilityUpdate = false;
            isFacilityReadOnly = false;

        }

        if (isFacilityUpdate) {

            isFacilityReadOnly = false;
        
        }


    };



    var isAdmin = false;

    var isAdminRole = function () {
        return isAdmin
    };

    var isAssociation = false;

    var isAssociationRole = function () {
        return isAssociation
    };

    var isCallCenter = false;

    var isCallCenterRole = function () {
        return isCallCenter
    };

    var isDrc = false;

    var isDrcRole = function () {
        return isDrc
    };

    var isDataCell = false;

    var isDataCellRole = function () {
        return isDataCell
    };

    var isFacilityUpdate = false;

    var isFacilityUpdateRole = function () {
        return isFacilityUpdate
    };

    var isFacilityReadOnly = false;

    var isFacilityReadOnlyRole = function () {
        return isFacilityReadOnly
    };

    var isSuperAdmin = false;

    var isSuperAdminRole = function () {
        return isSuperAdmin
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
        isAdminRole: isAdminRole,
        isAssociationRole: isAssociationRole,
        isCallCenterRole: isCallCenterRole,
        isDrcRole: isDrcRole,
        isDataCellRole: isDataCellRole,
        isFacilityUpdateRole: isFacilityUpdateRole,
        isFacilityReadOnlyRole: isFacilityReadOnlyRole,
        isSuperAdminRole: isSuperAdminRole

    };
} ();