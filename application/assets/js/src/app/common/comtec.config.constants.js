
//Most of the configuration constants for the application




$ct.other = function () {

    var employeeTemplateURL = globalEmployeeTemplateURL;

    var getEmployeeTemplateURL = function () {
        return employeeTemplateURL;
    };


    var sheltereeTemplateURL = globalSheltereeTemplateURL;

    var getSheltereeTemplateURL = function () {
        return sheltereeTemplateURL;
    };



    return {

        getEmployeeTemplateURL: getEmployeeTemplateURL,
        getSheltereeTemplateURL: getSheltereeTemplateURL

    };

} ();



// role id's for security
$ct.roles = function () {

    var administratorId = globalAdministratorId;

    var getAdministratorId = function () {
        return administratorId;
    };

    var associationId = globalAssociationId;

    var getAssociationId = function () {
        return associationId;
    };

    var callCenterId = globalCallCenterId;

    var getCallCenterId = function () {
        return callCenterId;
    };

    var drcId = globalDrcId;

    var getDrcId = function () {
        return drcId;
    };

    var dataCellId = globalDataCellId;

    var getDataCellId = function () {
        return dataCellId;
    };

    var facilityUpdateId = globalFacilityUpdateId;

    var getFacilityUpdateId = function () {
        return facilityUpdateId;
    };

    var facilityReadOnlyId = globalFacilityReadOnlyId;

    var getFacilityReadOnlyId = function () {
        return facilityReadOnlyId;
    };

    var superAdminId = globalSuperAdminId;

    var getSuperAdminId = function () {
        return superAdminId;
    };


    return {

        getAdministratorId: getAdministratorId,
        getAssociationId: getAssociationId,
        getCallCenterId: getCallCenterId,
        getDrcId: getDrcId,
        getDataCellId: getDataCellId,
        getFacilityUpdateId: getFacilityUpdateId,
        getFacilityReadOnlyId: getFacilityReadOnlyId,
        getSuperAdminId: getSuperAdminId

    };

} ();


