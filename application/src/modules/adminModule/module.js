define(['Boiler', './settings',
'./agencyList/component',
'./agency/component',
'./departmentList/component',
'./department/component',
'./medicalConditionList/component',
'./medicalCondition/component',
'./medicalConditionTierList/component',
'./medicalConditionTier/component',
'./shelterTypeList/component',
'./shelterType/component',
'./sheltreeEmployeeRatioList/component',
'./sheltreeEmployeeRatio/component',
'./staffSpecialtyList/component',
'./staffSpecialty/component',
'./stafftypeList/component',
'./stafftype/component',
'./transportTypeList/component',
'./transportType/component',
'./dispositionList/component',
'./disposition/component',
'./equipmentSupplyList/component',
'./equipmentSupply/component',
'./shelterIdentificationList/component',
'./shelterIdentification/component'
], function (Boiler, settings,
agencyListComponent,
agencyComponent,
departmentListComponent,
departmentComponent,
medicalConditionListComponent,
medicalConditionComponent,
medicalConditionTierListComponent,
medicalConditionTierComponent,
shelterTypeListComponent,
shelterTypeComponent,
sheltreeEmployeeRatioListComponent,
sheltreeEmployeeRatioComponent,
staffSpecialtyListComponent,
staffSpecialtyComponent,
stafftypeListComponent,
stafftypeComponent,
transportTypeListComponent,
transportTypeComponent,
dispositionListComponent,
dispositionComponent,
equipmentSupplyListComponent,
equipmentSupplyComponent,
shelterIdentificationListComponent,
shelterIdentificationComponent


) {

    var Module = function (globalContext) {

        var context = new Boiler.Context(globalContext);
        context.addSettings(settings);

        var controller = new Boiler.UrlController($(".appcontent"));
        controller.addRoutes({

            'agencylist': new agencyListComponent(context),
            'agency/{id}': new agencyComponent(context),
            'departmentlist': new departmentListComponent(context),
            'department/{id}': new departmentComponent(context),
            'medicalconditionlist': new medicalConditionListComponent(context),
            'medicalcondition/{id}': new medicalConditionComponent(context),
            'medicalconditiontierlist': new medicalConditionTierListComponent(context),
            'medicalconditiontier/{id}': new medicalConditionTierComponent(context),
            'sheltertypelist': new shelterTypeListComponent(context),
            'sheltertype/{id}': new shelterTypeComponent(context),
            'sheltreeemployeeratiolist': new sheltreeEmployeeRatioListComponent(context),
            'sheltreeemployeeratio/{id}': new sheltreeEmployeeRatioComponent(context),
            'staffspecialtylist': new staffSpecialtyListComponent(context),
            'staffspecialty/{id}': new staffSpecialtyComponent(context),
            'stafftypelist': new stafftypeListComponent(context),
            'stafftype/{id}': new stafftypeComponent(context),
            'transportationtypelist': new transportTypeListComponent(context),
            'transportationtype/{id}': new transportTypeComponent(context),
            'dispositionlist': new dispositionListComponent(context),
            'disposition/{id}': new dispositionComponent(context),
            'equipmentsupplylist': new equipmentSupplyListComponent(context),
            'equipmentsupply/{id}': new equipmentSupplyComponent(context),
            'shelteridentificationlist': new shelterIdentificationListComponent(context),
            'shelteridentification/{id}': new shelterIdentificationComponent(context)
            

        });
        controller.start();

        //		var controller = new Boiler.UrlController($(".appcontent"));
        //		controller.addRoutes({
        //		    "/": new DashBoardComponent(context)
        //		});

        //		controller.start();

    };

    return Module;

});
