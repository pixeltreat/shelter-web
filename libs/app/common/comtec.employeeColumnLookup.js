
$ct.employeeColumnLookup = function () {

    var employeeColumnLookup = null;

    var depatmentLookUp = [];
    var agencyLookUp = [];
    var staffSpecialtyLookUp = [];
    var staffTypeLookUp = [];
    var shiftLookUp = [];

    var setEmployeeColumnLookupdata = function (employeeColumnLookupdata) {

        employeeColumnLookup = employeeColumnLookupdata.EmployeeLookupData;

      
        $.each(employeeColumnLookup.AgencyDepartmentData, function (index, record) {

            var departmentData = {};

            if (record.Key != -1) {

                departmentData.DepartmentName = record.Value;

                depatmentLookUp.push(departmentData);
            }
            
        });
       
        
       
        $.each(employeeColumnLookup.AgencyDepartmentData, function (index, record) {

            var agencyData = {};
            if (record.Key != -1) {
              
                agencyData.AgencyName = record.AgencyName;

                agencyLookUp.push(agencyData);


            }
        });

        
        
        $.each(employeeColumnLookup.StaffSpecialityData, function (index, record) {

            var staffSpecialtyData = {};
            if (record.Key != -1) {
                staffSpecialtyData.StaffSpecialityName = record.Value;

                staffSpecialtyLookUp.push(staffSpecialtyData);
            }
        });

     
       

        $.each(employeeColumnLookup.StaffTypeData, function (index, record) {

            var staffTypeData = {};

            if (record.Key != -1) {

                staffTypeData.StaffTypeName = record.Value;

                staffTypeLookUp.push(staffTypeData);
            }
        });


       

        $.each(employeeColumnLookup.ShiftTimeData, function (index, record) {

            var shiftData = {};

            if (record.Key != -1) {

                shiftData.ShiftTime = record.Value;
                shiftLookUp.push(shiftData);
            }

        });
       
      
    };

    

    var shelterColumnLookupdata = null;

    var shelterNamesLookUp = [];

    var setShelterColumnLookupdata = function (shelterColumnLookupdata) {
       

        shelterColumnLookupdata = shelterColumnLookupdata;

        $.each(shelterColumnLookupdata, function (index, record) {

            var shelterNamesData = {};

            shelterNamesData.FacilityName = record.Name;

            shelterNamesLookUp.push(shelterNamesData);
        });


    };

    var getShelters = function () {
      
        return shelterNamesLookUp;

    };


    var getDepartments = function () {


        return depatmentLookUp;

    };

    var getAgencies = function () {

        var modifiedAgencyLookUp = [];

        var unique = {};
        $.each(agencyLookUp, function (index, record) {
            if (!unique[record.AgencyName]) {
                modifiedAgencyLookUp.push(record);
                unique[record.AgencyName] = record;
            }
        });
  
        return modifiedAgencyLookUp;

    };

    var getStaffSpecialties = function () {

        return staffSpecialtyLookUp;

    };
    var getStaffTypes= function () {

        return staffTypeLookUp;

    };

    var getShifts = function () {

        return shiftLookUp;

    };


    return {

        setEmployeeColumnLookupdata: setEmployeeColumnLookupdata,
        setShelterColumnLookupdata: setShelterColumnLookupdata,
        getShelters:getShelters,
        getDepartments: getDepartments,
        getAgencies: getAgencies,
        getStaffSpecialties: getStaffSpecialties,
        getStaffTypes: getStaffTypes,
        getShifts: getShifts

      

    };
} ();