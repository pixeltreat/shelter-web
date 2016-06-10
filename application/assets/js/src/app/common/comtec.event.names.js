//Event Names
$ct.en = function () {

    //start of application independant common events

    var updateSecuritySettings = "UPDATE_SECURITY_SETTINGS";
    var getUpdateSecuritySettings = function () {
        return updateSecuritySettings;
    };

    var doNotHavePermission = "DO_NOT_HAVE_PERMISSION";
    var getDoNotHavePermission = function () {
        return doNotHavePermission;
    };

    var goToNoPermissionPage = "GO_TO_NO_PERMISSION_PAGE";
    var getGoToNoPermissionPage = function () {
        return goToNoPermissionPage;
    };

    var showValidationMsg = "SHOW_VALIDATION_MESSAGE";

    var getShowValidationMsg = function () {
        return showValidationMsg;
    };

    var showSuccMsg = "SHOW_SUCCESS_MESSAGE";

    var getShowSuccMsg = function () {
        return showSuccMsg;
    };

    var showErrorMsg = "SHOW_ERROR_MESSAGE";

    var getShowErrorMsg = function () {
        return showErrorMsg;
    };

    var showErrorMsgJS = "SHOW_ERROR_MESSAGE_JS";

    var getShowErrorMsgJS = function () {
        return showErrorMsgJS;
    };

    var hideErrorMsg = "HIDE_ERROR_MESSAGE";

    var getHideErrorMsg = function () {
        return hideErrorMsg;
    };


    var refreshView = "REFRESH_VIEW";

    var getRefreshView = function () {
        return refreshView;
    };


    var goToHome = "GO_TO_HOME";

    var getGoToHome = function () {
        return goToHome;
    };


    //end of application independant common events



    

    //start of admin events  

    var displayAgencyList = "DISPLAY_AGENCY_LIST";

    var getDisplayAgencyList = function () {
        return displayAgencyList;
    };


    var agencyCreatedOrUpdated = "AGENCY_CREATED_OR_UPDATED";

    var getAgencyCreatedOrUpdated = function () {
        return agencyCreatedOrUpdated;
    };


    var displayDepartmentList = "DISPLAY_DEPARTMENT_LIST";

    var getDisplayDepartmentList = function () {
        return displayDepartmentList;
    };


    var departmentCreatedOrUpdated = "DEPARTMENT_CREATED_OR_UPDATED";

    var getDepartmentCreatedOrUpdated = function () {
        return departmentCreatedOrUpdated;
    };


    var displayMedicalConditionList = "DISPLAY_MEDICALCONDITION_LIST";

    var getDisplayMedicalConditionList = function () {
        return displayMedicalConditionList;
    };


    var medicalConditionCreatedOrUpdated = "MEDICALCONDITION_CREATED_OR_UPDATED";

    var getMedicalConditionCreatedOrUpdated = function () {
        return medicalConditionCreatedOrUpdated;
    };


    var displayMedicalConditionTierList = "DISPLAY_MEDICALCONDITIONTIER_LIST";

    var getDisplayMedicalConditionTierList = function () {
        return displayMedicalConditionTierList;
    };


    var medicalConditionTierCreatedOrUpdated = "MEDICALCONDITIONTIER_CREATED_OR_UPDATED";

    var getMedicalConditionTierCreatedOrUpdated = function () {
        return medicalConditionTierCreatedOrUpdated;
    };


    var displayShelterTypeList = "DISPLAY_SHELTERTYPE_LIST";

    var getDisplayShelterTypeList = function () {
        return displayShelterTypeList;
    };


    var shelterTypeCreatedOrUpdated = "SHELTERTYPE_CREATED_OR_UPDATED";

    var getShelterTypeCreatedOrUpdated = function () {
        return shelterTypeCreatedOrUpdated;
    };


    var displaySheltreeEmployeeRatioList = "DISPLAY_SHELTREEEMPLOYEERATIO_LIST";

    var getDisplaySheltreeEmployeeRatioList = function () {
        return displaySheltreeEmployeeRatioList;
    };


    var sheltreeEmployeeRatioCreatedOrUpdated = "SHELTREEEMPLOYEERATIO_CREATED_OR_UPDATED";

    var getSheltreeEmployeeRatioCreatedOrUpdated = function () {
        return sheltreeEmployeeRatioCreatedOrUpdated;
    };


    var displayStaffSpecialtyList = "DISPLAY_STAFFSPECIALTY_LIST";

    var getDisplayStaffSpecialtyList = function () {
        return displayStaffSpecialtyList;
    };


    var staffSpecialtyCreatedOrUpdated = "STAFFSPECIALTY_CREATED_OR_UPDATED";

    var getStaffSpecialtyCreatedOrUpdated = function () {
        return staffSpecialtyCreatedOrUpdated;
    };


    var displayStaffTypeList = "DISPLAY_STAFFTYPE_LIST";

    var getDisplayStaffTypeList = function () {
        return displayStaffTypeList;
    };


    var staffTypeCreatedOrUpdated = "STAFFTYPE_CREATED_OR_UPDATED";

    var getStaffTypeCreatedOrUpdated = function () {
        return staffTypeCreatedOrUpdated;
    };


    var displayTransportTypeList = "DISPLAY_TRANSPORTATIONTYPE_LIST";

    var getDisplayTransportTypeList = function () {
        return displayTransportTypeList;
    };


    var transportTypeCreatedOrUpdated = "TRANSPORTATIONTYPE_CREATED_OR_UPDATED";

    var getTransportTypeCreatedOrUpdated = function () {
        return transportTypeCreatedOrUpdated;
    };


    var displayDispositionList = "DISPLAY_DISPOSITION_LIST";

    var getDisplayDispositionList = function () {
        return displayDispositionList;
    };


    var dispositionCreatedOrUpdated = "DISPOSITION_CREATED_OR_UPDATED";

    var getDispositionCreatedOrUpdated = function () {
        return dispositionCreatedOrUpdated;
    };

    var displayEquipmentSupplyList = "DISPLAY_EquipmentSupply_LIST";

    var getDisplayEquipmentSupplyList = function () {
        return displayEquipmentSupplyList;
    };

    var equipmentSupplyCreatedOrUpdated = "EQUIPMENTSUPPLY_CREATED_OR_UPDATED";

    var getEquipmentSupplyCreatedOrUpdated = function () {
        return equipmentSupplyCreatedOrUpdated;
    };

    var displayShelterIdentificationList = "DISPLAY_SHELTERIDENTIFICATION_LIST";

    var getDisplayShelterIdentificationList = function () {
        return displayShelterIdentificationList;
    };
    

    var ShelterIdentificationCreatedOrUpdated = "SHELTERIDENTIFICATION_CREATED_OR_UPDATED";

    var getShelterIdentificationCreatedOrUpdated = function () {
        return ShelterIdentificationCreatedOrUpdated;
    };

    //end of admin events

    //start of employee events  


    //Use this event when user clicks on employee menu item second time onwords
    var employeeMenuItemClicked = "EMPLOYEE_MENU_ITEM_CLICKED";

    var getEmployeeMenuItemClicked = function () {
        return employeeMenuItemClicked;
    };

    //to refresh current employee page with newly selected data in employee header(Shelter type and Shelter)
    var employeeHeaderDataChanged = "EMPLOYEE_HEADER_DATA_CHANGED";

    var getEmployeeHeaderDataChanged = function () {
        return employeeHeaderDataChanged;
    };

    //to load shelter type, shelter drop down lists, when user click on employee menu item first time
    var loadEmployeeHeaderInfo = "LOAD_EMPLOYEE_HEADER_INFO";

    var getLoadEmployeeHeaderInfo = function () {
        return loadEmployeeHeaderInfo;
    };


    //to show shelter dropdown lists in employee shelter header
    var showEmployeeShelterHeader = "SHOW_EMPLOYEE_SHELTER_HEADER";

    var getShowEmployeeShelterHeader = function () {
        return showEmployeeShelterHeader;
    };

    //to hide shelter dropdown lists in employee shelter header
    var hideEmployeeShelterHeader = "HIDE_EMPLOYEE_SHELTER_HEADER";

    var getHideEmployeeShelterHeader = function () {
        return hideEmployeeShelterHeader;
    };


    var hideEmployeeHeader = "HIDE_EMPLOYEE_HEADER";

    var getHideEmployeeHeader = function () {
        return hideEmployeeHeader;
    };

    var hideEmployeeHeaderNav = "HIDE_EMPLOYEE_HEADER_NAV";

    var getHideEmployeeHeaderNavigation = function () {
        return hideEmployeeHeaderNav;
    };


    var showActiveEmployeeHeader = "SHOW_ACTIVE_EMPLOYEE_HEADER";

    var getShowActiveEmployeeHeader = function () {
        return showActiveEmployeeHeader;
    };

    var employeeCreatedOrUpdated = "EMPLOYEE_CREATED_OR_UPDATED";

    var getEmployeeCreatedOrUpdated = function () {
        return employeeCreatedOrUpdated;
    };


    var employeeRecordReload = "RELOAD_EMPLOYEE_RECORD";

    var getEmployeeRecordReload = function () {
        return employeeRecordReload;
    };

    var manageEmployeeClicked = "MANAGE_EMPLOYEE_CLICKED";
    var getManageEmployeeClicked = function () {
        return manageEmployeeClicked;
    };


    var manageEmployeeExpandedClicked = "MANAGE_EMPLOYEE_EXPANDED_CLICKED";
    var getManageEmployeeExpandedClicked = function () {
        return manageEmployeeExpandedClicked;
    };

    var employeeExpandedCreatedOrUpdated = "EMPLOYEE_EXPANDED_CREATED_OR_UPDATED";

    var getEmployeeExpandedCreatedOrUpdated = function () {
        return employeeExpandedCreatedOrUpdated;
    };

    //end of employee events
 
    //Start  of employee attendence events

    var employeeAttendenceComments = "COMMENT_UPDATE";

    var getEmployeeAttendenceComments = function () {
        return employeeAttendenceComments;
    };

    var employeeAttendenceList = "DISPLAY_EMPLOYEEATTENDENCE_LIST";

    var getEmployeeAttendenceList = function () {
        return employeeAttendenceList;
    };

    var employeeAttendanceUpdated = "EMPLOYEEATTENDENCE_CREATED_OR_UPDATED";
    var getEmployeeAttendanceUpdated = function () {
        return employeeAttendanceUpdated;
    };



    //End  of employee attendence events

    //start of shelteree events  

    //Use this event when user clicks on shelteree menu item second time onwords
    var sheltereeMenuItemClicked = "SHELTEREE_MENU_ITEM_CLICKED";

    var getSheltereeMenuItemClicked = function () {
        return sheltereeMenuItemClicked;
    };

    //to refresh current shelteree page with newly selected data in shelteree header(Shelter type and Shelter)
    var sheltereeHeaderDataChanged = "SHELTEREE_HEADER_DATA_CHANGED";

    var getSheltereeHeaderDataChanged = function () {
        return sheltereeHeaderDataChanged;
    };

    //to load shelter type, shelter drop down lists, when user click on shelteree menu item first time
    var loadSheltereeHeaderInfo = "LOAD_SHELTEREE_HEADER_INFO";

    var getLoadSheltereeHeaderInfo = function () {
        return loadSheltereeHeaderInfo;
    };


    //to show shelter dropdown lists in shelteree shelter header
    var showSheltereeShelterHeader = "SHOW_SHELTEREE_SHELTER_HEADER";

    var getShowSheltereeShelterHeader = function () {
        return showSheltereeShelterHeader;
    };

    //to hide shelter dropdown lists in shelteree shelter header
    var hideSheltereeShelterHeader = "HIDE_SHELTEREE_SHELTER_HEADER";

    var getHideSheltereeShelterHeader = function () {
        return hideSheltereeShelterHeader;
    };


    var hideSheltereeHeader = "HIDE_SHELTEREE_HEADER";

    var getHideSheltereeHeader = function () {
        return hideSheltereeHeader;
    };

    var hideSheltereeHeaderNav = "HIDE_SHELTEREE_HEADER_NAV";

    var getHideSheltereeHeaderNavigation = function () {
        return hideSheltereeHeaderNav;
    };


    var showActiveSheltereeHeader = "SHOW_ACTIVE_SHELTEREE_HEADER";

    var getShowActiveSheltereeHeader = function () {
        return showActiveSheltereeHeader;
    };

    var sheltereeCreatedOrUpdated = "SHELTEREE_CREATED_OR_UPDATED";

    var getSheltereeCreatedOrUpdated = function () {
        return sheltereeCreatedOrUpdated;
    };

    var sheltereeDischargeCreatedOrUpdated = "SHELTEREE_DISCHARGE_CREATED_OR_UPDATED";

    var getSheltereeDischargeCreatedOrUpdated = function () {
      return sheltereeDischargeCreatedOrUpdated;
    };


    var sheltereeMedicalUpdateCreatedOrUpdated = "SHELTEREE_MEDICAL_UPDATE_CREATED_OR_UPDATED";

    var getSheltereeMedicalUpdateCreatedOrUpdated = function () {
        return sheltereeMedicalUpdateCreatedOrUpdated;
    };



    var sheltereeRecordReload = "RELOAD_SHELTEREE_RECORD";

    var getSheltereeRecordReload = function () {
        return sheltereeRecordReload;
    };

    var manageSheltereeClicked = "MANAGE_SHELTEREE_CLICKED";

    var getManageSheltereeClicked = function () {
        return manageSheltereeClicked;
    };

    var manageSheltereeDischargeClicked = "MANAGE_SHELTEREE_DISCHARGE_CLICKED";

    var getManageSheltereeDischargeClicked = function () {
        return manageSheltereeDischargeClicked;
    };


    var manageSheltereeMedicalUpdateClicked = "MANAGE_SHELTEREE_MEDICAL_UPDATE_CLICKED";

    var getManageSheltereeMedicalUpdateClicked = function () {
        return manageSheltereeMedicalUpdateClicked;
    };

    //end of shelteree events

    return {

        //start of application independant common events

        getUpdateSecuritySettings: getUpdateSecuritySettings,
        getDoNotHavePermission: getDoNotHavePermission, 
        getGoToNoPermissionPage : getGoToNoPermissionPage,
        getShowValidationMsg: getShowValidationMsg,
        getShowSuccMsg: getShowSuccMsg,
        getShowErrorMsg: getShowErrorMsg,
        getShowErrorMsgJS: getShowErrorMsgJS,
        getHideErrorMsg: getHideErrorMsg,
        getRefreshView: getRefreshView,
        getGoToHome: getGoToHome,

        //end of application independant common events


        //start of admin events    
        
        getDisplayAgencyList: getDisplayAgencyList,
        getAgencyCreatedOrUpdated: getAgencyCreatedOrUpdated,
        getDisplayDepartmentList: getDisplayDepartmentList,
        getDepartmentCreatedOrUpdated: getDepartmentCreatedOrUpdated,
        getDisplayMedicalConditionList: getDisplayMedicalConditionList,
        getMedicalConditionCreatedOrUpdated: getMedicalConditionCreatedOrUpdated,
        getDisplayMedicalConditionTierList: getDisplayMedicalConditionTierList,
        getMedicalConditionTierCreatedOrUpdated: getMedicalConditionTierCreatedOrUpdated,
        getDisplayShelterTypeList: getDisplayShelterTypeList,
        getShelterTypeCreatedOrUpdated: getShelterTypeCreatedOrUpdated,
        getDisplaySheltreeEmployeeRatioList: getDisplaySheltreeEmployeeRatioList,
        getSheltreeEmployeeRatioCreatedOrUpdated: getSheltreeEmployeeRatioCreatedOrUpdated,
        getDisplayStaffSpecialtyList: getDisplayStaffSpecialtyList,
        getStaffSpecialtyCreatedOrUpdated: getStaffSpecialtyCreatedOrUpdated,
        getDisplayStaffTypeList: getDisplayStaffTypeList,
        getStaffTypeCreatedOrUpdated: getStaffTypeCreatedOrUpdated,
        getDisplayTransportTypeList: getDisplayTransportTypeList,
        getTransportTypeCreatedOrUpdated: getTransportTypeCreatedOrUpdated,
        getDisplayDispositionList: getDisplayDispositionList,
        getDispositionCreatedOrUpdated: getDispositionCreatedOrUpdated,
        getDisplayEquipmentSupplyList: getDisplayEquipmentSupplyList,
        getEquipmentSupplyCreatedOrUpdated: getEquipmentSupplyCreatedOrUpdated,
        getDisplayShelterIdentificationList:getDisplayShelterIdentificationList,
        getShelterIdentificationCreatedOrUpdated:getShelterIdentificationCreatedOrUpdated,

        //end of admin events  


        //start of employee events    
        
        getEmployeeMenuItemClicked : getEmployeeMenuItemClicked,
        getEmployeeHeaderDataChanged : getEmployeeHeaderDataChanged,
        getLoadEmployeeHeaderInfo : getLoadEmployeeHeaderInfo,
        getShowEmployeeShelterHeader : getShowEmployeeShelterHeader,
        getHideEmployeeShelterHeader : getHideEmployeeShelterHeader,
        getHideEmployeeHeader : getHideEmployeeHeader,
        getHideEmployeeHeaderNavigation : getHideEmployeeHeaderNavigation,
        getShowActiveEmployeeHeader : getShowActiveEmployeeHeader,
        getManageEmployeeClicked: getManageEmployeeClicked,
        getManageEmployeeExpandedClicked: getManageEmployeeExpandedClicked,
        getEmployeeCreatedOrUpdated: getEmployeeCreatedOrUpdated,
        getEmployeeRecordReload:getEmployeeRecordReload,
        getEmployeeExpandedCreatedOrUpdated: getEmployeeExpandedCreatedOrUpdated,

        //end of employee events 


        //start of employee  attendence events    
        getEmployeeAttendenceComments: getEmployeeAttendenceComments,
        getEmployeeAttendanceUpdated: getEmployeeAttendanceUpdated,
        getEmployeeAttendenceList: getEmployeeAttendenceList,


        //end of employee  attendenceevents 

        //start of shelteree events  

        getSheltereeMenuItemClicked: getSheltereeMenuItemClicked,
        getSheltereeHeaderDataChanged: getSheltereeHeaderDataChanged,
        getLoadSheltereeHeaderInfo: getLoadSheltereeHeaderInfo,
        getShowSheltereeShelterHeader: getShowSheltereeShelterHeader,
        getHideSheltereeShelterHeader: getHideSheltereeShelterHeader,
        getHideSheltereeHeader: getHideSheltereeHeader,
        getHideSheltereeHeaderNavigation: getHideSheltereeHeaderNavigation,
        getShowActiveSheltereeHeader: getShowActiveSheltereeHeader,
        getSheltereeCreatedOrUpdated: getSheltereeCreatedOrUpdated,
        getSheltereeDischargeCreatedOrUpdated: getSheltereeDischargeCreatedOrUpdated,
        getSheltereeMedicalUpdateCreatedOrUpdated:getSheltereeMedicalUpdateCreatedOrUpdated,
        getSheltereeRecordReload: getSheltereeRecordReload,
        getManageSheltereeClicked: getManageSheltereeClicked,
        getManageSheltereeDischargeClicked: getManageSheltereeDischargeClicked,
        getManageSheltereeMedicalUpdateClicked: getManageSheltereeMedicalUpdateClicked

        //end of shelteree events
    };
} ();