define(['Boiler', './settings',

'./staffRawDataReport/component',
'./staffAttendanceRawDataReport/component',
'./sheltereeRawDataReport/component'

], function (Boiler, settings,

staffRawDataReportComponent,
staffAttendanceRawDataReportComponent,
sheltereeRawDataReportComponent

) {

    var Module = function (globalContext) {

        var context = new Boiler.Context(globalContext);
        context.addSettings(settings);

        var controller = new Boiler.UrlController($(".appcontent"));
        controller.addRoutes({
            
          
            'staffrawdatareport': new staffRawDataReportComponent(context),
            'staffattendancerawdatareport': new staffAttendanceRawDataReportComponent(context),
            'sheltereerawdatareport': new sheltereeRawDataReportComponent(context)
            

        });
        controller.start();

    };

    return Module;

});
