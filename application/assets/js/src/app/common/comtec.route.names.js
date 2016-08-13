
//Route names
// When ever route name in the module is changed change corresponding name here also.
//When new route is added in module, add new route here also.
$ct.rn = function () {

    /*start of other routes */

    var noPermission = "nopermission";

    var getNoPermission = function () {
        return noPermission;
    };

    var noRole = "norole";

    var getNoRole = function () {
        return noRole;
    };

    var noActiveEvent = "noactiveevent";

    var getNoActiveEvent = function () {
        return noActiveEvent;
    };


    var noFacilitiesFound = "nofacilitiesfound";

    var getNoFacilitiesFound = function () {
        return noFacilitiesFound;
    };

    
    /*end of other routes */


    
    //start of admin routes

    var agencyList = "agencylist";

    var getAgencyList = function () {
        return agencyList;
    };


    var agency = "agency";

    var getAgency = function () {
        return agency;
    };


    var departmentList = "departmentlist";

    var getDepartmentList = function () {
        return departmentList;
    };


    var department = "department";

    var getDepartment = function () {
        return department;
    };


    var medicalConditionList = "medicalconditionlist";

    var getMedicalConditionList = function () {
        return medicalConditionList;
    };


    var medicalCondition = "medicalcondition";

    var getMedicalCondition = function () {
        return medicalCondition;
    };


    var medicalConditionTierList = "medicalconditiontierlist";

    var getMedicalConditionTierList = function () {
        return medicalConditionTierList;
    };


    var medicalConditionTier = "medicalconditiontier";

    var getMedicalConditionTier = function () {
        return medicalConditionTier;
    };


    var shelterTypeList = "sheltertypelist";

    var getShelterTypeList = function () {
        return shelterTypeList;
    };


    var shelterType = "sheltertype";

    var getShelterType = function () {
        return shelterType;
    };


    var sheltreeEmployeeRatioList = "sheltreeemployeeratiolist";

    var getSheltreeEmployeeRatioList = function () {
        return sheltreeEmployeeRatioList;
    };


    var sheltreeEmployeeRatio = "sheltreeemployeeratio";

    var getSheltreeEmployeeRatio = function () {
        return sheltreeEmployeeRatio;
    };


    var staffSpecialtyList = "staffspecialtylist";

    var getStaffSpecialtyList = function () {
        return staffSpecialtyList;
    };


    var staffSpecialty = "staffspecialty";

    var getStaffSpecialty = function () {
        return staffSpecialty;
    };



    var staffTypeList = "stafftypelist";

    var getStaffTypeList = function () {
        return staffTypeList;
    };


    var staffType = "stafftype";

    var getStaffType = function () {
        return staffType;
    };


    var transportTypeList = "transportationtypelist";

    var getTransportTypeList = function () {
        return transportTypeList;
    };


    var transportType = "transportationtype";

    var getTransportType = function () {
        return transportType;
    };


    var dispositionList = "dispositionlist";

    var getDispositionList = function () {
        return dispositionList;
    };


    var disposition = "disposition";

    var getDisposition = function () {
        return disposition;
    };


    var equipmentSupplyList = "equipmentsupplylist";

    var getequipmentSupplyList = function () {
        return equipmentSupplyList;
    };


    var equipmentSupply = "equipmentsupply";

    var getequipmentSupply = function () {
        return equipmentSupply;
    };


    var shelterIdentificationList = "shelteridentificationlist";

    var getshelterIdentificationList = function () {
        return shelterIdentificationList;
    };


    var shelterIdentification = "shelteridentification";

    var getshelterIdentification = function () {
        return shelterIdentification;
    };


    var questionList = "questionlist";

    var getQuestionList = function () {
        return questionList;
    };


    var question = "question";

    var getQuestion = function () {
        return question;
    };

    var eventList = "eventlist";

    var getEventList = function () {
        return eventList;
    };


    var event = "event";

    var getEvent= function () {
        return event;
    };
   
    //end of admin routes
    

    //start of shelter routes


    var shelterStatus = "shelterstatus";

    var getShelterStatus = function () {
        return shelterStatus;
    };


    //end of shelter routes



    //start of employee routes


    var employeeList = "employeelist";

    var getEmployeeList = function () {
        return employeeList;
    };
    

    var employeeExtendedList = "employeeextendedlist";

    var getEmployeeExtendedList = function () {
        return employeeExtendedList;
    };


    var employee = "employee";

    var getEmployee = function () {
        return employee;
    };
    

    var bulkUpdateEmployee = "bulkupdateemployee";

    var getBulkUpdateEmployee = function () {
        return bulkUpdateEmployee;
    };

    var bulkUpdateEmployeeExtended = "bulkupdateemployeeextended";

    var getBulkUpdateEmployeeExtended = function () {
        return bulkUpdateEmployeeExtended;
    };
    

    var downloadEmployee = "downloademployee";

    var getDownloadEmployee = function () {
        return downloadEmployee;
    };


    var uploadEmployee = "uploademployee";

    var getUploadEmployee = function () {
        return uploadEmployee;
    };

    var employeeAttendance = "employeeattendance";

    var getEmployeeAttendance = function () {
        return employeeAttendance;
    };
    
    var employeeAttendanceComments = "comments";

    var getEmployeeAttendanceComments = function () {
        return employeeAttendanceComments;
    };


    var bulkUpdateEmployeeAttendance = "bulkupdateemployeeattendance";

    var getBulkUpdateEmployeeAttendance = function () {
        return bulkUpdateEmployeeAttendance;
    };


    var multiFacilityEmployeeAttendance = "multifacilityemployeeattendance";

    var getMultiFacilityEmployeeAttendance = function () {
        return multiFacilityEmployeeAttendance;
    };

    var multiFacilityEmployeeExtendedList = "multifacilityemployeeextendedlist";

    var getMultiFacilityEmployeeExtendedList = function () {
        return multiFacilityEmployeeExtendedList;
    };
    var multiFacilityEmployeeList = "multifacilityemployeelist";

    var getMultiFacilityEmployeeList = function () {
        return multiFacilityEmployeeList;
    };


    //end of employee routes
   

    //start of shelteree routes


    var sheltereeList = "sheltereelist";

    var getSheltereeList = function () {
        return sheltereeList;
    };
   
    var sheltereeMedicalUpdateList = "sheltereemedicalupdatelist";

    var getSheltereeMedicalUpdateList = function () {
        return sheltereeMedicalUpdateList;
    };

    var sheltereeDischargeList = "sheltereedischargelist";

    var getSheltereeDischargeList = function () {
        return sheltereeDischargeList;
    };
    
    var shelteree = "shelteree";

    var getShelteree = function () {
        return shelteree;
    };


    var bulkUpdateShelteree = "bulkupdateshelteree";

    var getBulkUpdateShelteree = function () {
        return bulkUpdateShelteree;
    };

    var bulkUpdateSheltereeDischarge = "bulkupdatesheltereedischarge";

    var getBulkUpdateSheltereeDischarge = function () {
        return bulkUpdateSheltereeDischarge;
    };


    var bulkUpdateSheltereeMedicalUpdate = "bulkupdatesheltereemedicalupdate";

    var getBulkUpdateSheltereeMedicalUpdate = function () {
        return bulkUpdateSheltereeMedicalUpdate;
    };

    var downloadShelteree = "downloadshelteree";

    var getDownloadShelteree = function () {
        return downloadShelteree;
    };


    var uploadShelteree = "uploadshelteree";

    var getUploadShelteree = function () {
        return uploadShelteree;
    };




    //end of shelteree routes
    
    //start of report routes


    var staffRawDataReport = "staffrawdatareport";

    var getStaffRawDataReport = function () {
        return staffRawDataReport;
    };


    var staffAttendanceRawDataReport = "staffattendancerawdatareport";

    var getStaffAttendanceRawDataReport = function () {
        return staffAttendanceRawDataReport;
    };


    var sheltereeRawDataReport = "sheltereerawdatareport";

    var getSheltereeRawDataReport = function () {
        return sheltereeRawDataReport;
    };

    //end of report routes

    return {

        /*start of other routes */

        getNoPermission: getNoPermission,
        getNoRole: getNoRole,
        getNoActiveEvent: getNoActiveEvent,
        getNoFacilitiesFound:getNoFacilitiesFound,
        /*end of other module routes */


        //start of admin routes

        getAgencyList: getAgencyList,
        getAgency: getAgency,
        getDepartmentList: getDepartmentList,
        getDepartment: getDepartment,
        getMedicalConditionList: getMedicalConditionList,
        getMedicalCondition: getMedicalCondition,
        getMedicalConditionTierList: getMedicalConditionTierList,
        getMedicalConditionTier: getMedicalConditionTier,
        getShelterTypeList: getShelterTypeList,
        getShelterType: getShelterType,
        getSheltreeEmployeeRatioList: getSheltreeEmployeeRatioList,
        getSheltreeEmployeeRatio: getSheltreeEmployeeRatio,
        getStaffSpecialtyList: getStaffSpecialtyList,
        getStaffSpecialty: getStaffSpecialty,
        getStaffTypeList: getStaffTypeList,
        getStaffType: getStaffType,
        getTransportTypeList: getTransportTypeList,
        getTransportType: getTransportType,
        getDispositionList: getDispositionList,
        getDisposition: getDisposition,
        getequipmentSupplyList: getequipmentSupplyList,
        getequipmentSupply: getequipmentSupply,
        getshelterIdentification: getshelterIdentification,
        getshelterIdentificationList:getshelterIdentificationList,
        getQuestionList: getQuestionList,
        getQuestion: getQuestion,
        getEventList: getEventList,
        getEvent: getEvent,
        //end of admin routes


        //start of shelter routes

        getShelterStatus:getShelterStatus,

        //end of shelter routes


        //start of employee routes

        getEmployeeList: getEmployeeList,
        getEmployeeExtendedList:getEmployeeExtendedList,
        getEmployee: getEmployee,
        getBulkUpdateEmployee: getBulkUpdateEmployee,
        getBulkUpdateEmployeeExtended:getBulkUpdateEmployeeExtended,
        getDownloadEmployee:getDownloadEmployee,
        getUploadEmployee:getUploadEmployee,
        getEmployeeAttendance: getEmployeeAttendance,
        getBulkUpdateEmployeeAttendance: getBulkUpdateEmployeeAttendance,
        getMultiFacilityEmployeeAttendance: getMultiFacilityEmployeeAttendance,
        getMultiFacilityEmployeeExtendedList: getMultiFacilityEmployeeExtendedList,
        getMultiFacilityEmployeeList: getMultiFacilityEmployeeList,

        //end of employee routes


        //start of shelteree routes

        getSheltereeList: getSheltereeList,
        getSheltereeMedicalUpdateList: getSheltereeMedicalUpdateList,
        getSheltereeDischargeList: getSheltereeDischargeList,
        getShelteree: getShelteree,
        getBulkUpdateShelteree: getBulkUpdateShelteree,
        getBulkUpdateSheltereeDischarge: getBulkUpdateSheltereeDischarge,
        getBulkUpdateSheltereeMedicalUpdate: getBulkUpdateSheltereeMedicalUpdate,
        getDownloadShelteree: getDownloadShelteree,
        getUploadShelteree: getUploadShelteree,

        //end of shelteree routes

        //start of report routes

        getStaffRawDataReport: getStaffRawDataReport,
        getStaffAttendanceRawDataReport: getStaffAttendanceRawDataReport,
        getSheltereeRawDataReport: getSheltereeRawDataReport

        //end  of report routes
    };
} ();