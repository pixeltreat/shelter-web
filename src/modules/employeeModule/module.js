/// <reference path="multifacilityEmployeeAttendance/component.js" />
define(['Boiler', './settings',
'./employeeList/component',
'./employeeExtendedList/component',
'./employee/component',
'./downloadEmployee/component',
'./uploadEmployee/component',
'./bulkUpdateEmployee/component',
'./bulkUpdateEmployeeExtended/component',
'./employeeAttendance/component',
'./bulkUpdateEmployeeAttendance/component',
'./multiFacilityEmployeeAttendance/component',
'./multiFacilityEmployeeExtendedList/component',
'./multiFacilityEmployeeList/component'





], function (Boiler, settings,
employeeListComponent,
employeeExtendedListComponent,
employeeComponent,
downloadEmployeeComponent,
uploadEmployeeComponent,
bulkUpdateEmployeeComponent,
bulkUpdateEmployeeExtendedComponent,
employeeAttendanceComponent,
bulkUpdateEmployeeAttendanceComponent,
multifacilityEmployeeAttendanceComponent,
multifacilityEmployeeExtendedListComponent,
multifacilityEmployeeListComponent

) {

    var Module = function (globalContext) {

        var context = new Boiler.Context(globalContext);
        context.addSettings(settings);

        var controller = new Boiler.UrlController($(".appcontent"));
        controller.addRoutes({
            
            'employeelist': new employeeListComponent(context),
            'employeeextendedlist': new employeeExtendedListComponent(context),
            'employee/{id}/{shelterId}': new employeeComponent(context),
            'downloademployee': new downloadEmployeeComponent(context),
            'uploademployee': new uploadEmployeeComponent(context),
            'bulkupdateemployee': new bulkUpdateEmployeeComponent(context),
            'bulkupdateemployeeextended': new bulkUpdateEmployeeExtendedComponent(context),
            'employeeattendance': new employeeAttendanceComponent(context),
            'bulkupdateemployeeattendance': new bulkUpdateEmployeeAttendanceComponent(context),
            'multifacilityemployeeattendance': new multifacilityEmployeeAttendanceComponent(context),
            'multifacilityemployeeextendedlist': new multifacilityEmployeeExtendedListComponent(context),
            'multifacilityemployeelist': new multifacilityEmployeeListComponent(context)
            

        });
        controller.start();

    };

    return Module;

});
