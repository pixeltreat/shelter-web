//Controler Names
$ct.cn = function () {

    var baseServiceUrl = globalBaseServiceUrl;

    
    //Start of admin controllers

    var agencyUrl = baseServiceUrl + "Agency/"
    var getAgencyUrl = function () {
        return agencyUrl;
    };

    var medicalConditionTierUrl = baseServiceUrl + "MedicalConditionTier/"
    var getMedicalConditionTierUrl = function () {
        return medicalConditionTierUrl;
    };

    var shelterTypeUrl = baseServiceUrl + "ShelterType/"
    var getShelterTypeUrl = function () {
        return shelterTypeUrl;
    };

    var staffSpecialtyUrl = baseServiceUrl + "StaffSpeciality/"
    var getStaffSpecialtyUrl = function () {
        return staffSpecialtyUrl;
    };
    //end of admin controllers


    // start of common controllers

    var commonServicesUrl = baseServiceUrl + "KeyValue/"
    var getcommonServicesUrl = function () {
        return commonServicesUrl;
    };
    var departmentServiceUrl = baseServiceUrl + "Department/"
    var getDepartmentServiceUrl = function () {
        return departmentServiceUrl;
    };
    var staffTypeServiceUrl = baseServiceUrl + "StaffType/"
    var getStaffTypeServiceUrl = function () {
        return staffTypeServiceUrl;
    };
    var medicalConditionServiceUrl = baseServiceUrl + "MedicalCondition/"
    var getmedicalConditionServiceUrl = function () {
        return medicalConditionServiceUrl;
    };
    var transportationTypeServiceUrl = baseServiceUrl + "Transportationtype/"
    var getTransportationTypeServiceUrl = function () {
        return transportationTypeServiceUrl;
    };
    var sheltreeEmployeeRatioUrl = baseServiceUrl + "SheltreeEmployeeRatio/"
    var getSheltreeEmployeeRatioUrl = function () {
        return sheltreeEmployeeRatioUrl;
    };


    var equipmentSupplyUrl = baseServiceUrl + "EquipmentSupply/"
    var getEquipmentSupplyUrl = function () {
        return equipmentSupplyUrl;
    };

    var shelterIdentificationUrl = baseServiceUrl + "ShelterIdentification/"
    var getShelterIdentificationUrl = function () {
        return shelterIdentificationUrl;
    };

    // Start of other controllers


    var employeeUrl = baseServiceUrl + "Employee/"
    var getEmployeeUrl = function () {
        return employeeUrl;
    };

    var shelterUrl = baseServiceUrl + "Shelter/"
    var getShelterUrl = function () {
        return shelterUrl;
    };

    var employeeAttendanceUrl = baseServiceUrl + "EmployeeAttendance/"
    var getEmployeeAttendanceUrl = function () {
        return employeeAttendanceUrl;
    };


   
    var DispositionUrl = baseServiceUrl + "Disposition/"
    var getDispositionUrl = function () {
        return DispositionUrl;
    };
    // start of shelterstaus controller
    var shelterStatusUrl = baseServiceUrl + "ShelterStatus/"
    var getShelterStatusUrl = function () {
        return shelterStatusUrl;
    };
    //end of shelterstaus controller


    // start of event controller
    var eventUrl = baseServiceUrl + "Event/"
    var getEventUrl = function () {
        return eventUrl;
    };
    //end of event controller


    // start of shelterstaus controller
   
    //end of shelterstaus controller
    var sheltereeFacilityUrl = baseServiceUrl + "SheltereeFacility/"
    var getSheltereeFacilityUrl = function () {
        return sheltereeFacilityUrl;
    };

    

    return {
        //Start of admin controllers
        getAgencyUrl: getAgencyUrl,
        getMedicalConditionTierUrl: getMedicalConditionTierUrl,
        getShelterTypeUrl: getShelterTypeUrl,
        getStaffSpecialtyUrl: getStaffSpecialtyUrl,
        getDispositionUrl:getDispositionUrl,
        //end of admin controllers

        // start of common controllers
        getcommonServicesUrl: getcommonServicesUrl,
        getDepartmentServiceUrl: getDepartmentServiceUrl,
        getStaffTypeServiceUrl: getStaffTypeServiceUrl,
        getmedicalConditionServiceUrl: getmedicalConditionServiceUrl,
        getTransportationTypeServiceUrl: getTransportationTypeServiceUrl,
        getSheltreeEmployeeRatioUrl: getSheltreeEmployeeRatioUrl,
        getEquipmentSupplyUrl: getEquipmentSupplyUrl,
        getShelterIdentificationUrl:getShelterIdentificationUrl,
        // end of common controllers

        // Start of other controllers
        getShelterUrl : getShelterUrl,
        getEmployeeUrl: getEmployeeUrl,

        // start of shelterstaus controller
        getShelterStatusUrl: getShelterStatusUrl,
        //end of shelterstaus controller

        // start of event controller
        getEventUrl: getEventUrl,
        //end of event controller
    
        getEmployeeAttendanceUrl: getEmployeeAttendanceUrl,   
        getSheltereeFacilityUrl: getSheltereeFacilityUrl
       


    };
} ();

