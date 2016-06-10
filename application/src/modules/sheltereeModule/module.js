define(['Boiler', './settings',

'./sheltereeList/component',
'./sheltereeMedicalUpdateList/component',
'./sheltereeDischargeList/component',
'./bulkUpdateShelteree/component',
'./bulkUpdateSheltereeDischarge/component',
'./bulkUpdateSheltereeMedicalUpdate/component',
'./downloadShelteree/component',
'./shelteree/component',
'./uploadShelteree/component'

], function (Boiler, settings,

sheltereeListComponent,
sheltereeMedicalUpdateListComponent,
sheltereeDischargeListComponent,
bulkUpdateSheltereeComponent,
bulkUpdateSheltereeDischargeComponent,
bulkUpdateSheltereeMedicalUpdateComponent,
downloadSheltereeComponent,
sheltereeComponent,
uploadSheltereeComponent

) {

    var Module = function (globalContext) {

        var context = new Boiler.Context(globalContext);
        context.addSettings(settings);

        var controller = new Boiler.UrlController($(".appcontent"));
        controller.addRoutes({


            'sheltereelist': new sheltereeListComponent(context),
            'sheltereemedicalupdatelist': new sheltereeMedicalUpdateListComponent(context),
            'sheltereedischargelist': new sheltereeDischargeListComponent(context),
            'bulkupdateshelteree': new bulkUpdateSheltereeComponent(context),
            'bulkupdatesheltereedischarge': new bulkUpdateSheltereeDischargeComponent(context),
            'bulkupdatesheltereemedicalupdate': new bulkUpdateSheltereeMedicalUpdateComponent(context),
            'downloadshelteree': new downloadSheltereeComponent(context),
            'shelteree/{id}/{shelterId}': new sheltereeComponent(context),
            'uploadshelteree': new uploadSheltereeComponent(context)


            


        });
        controller.start();

    };

    return Module;

});
