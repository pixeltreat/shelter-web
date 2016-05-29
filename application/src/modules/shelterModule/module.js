define(['Boiler', './settings',

'./shelterStatus/component'


], function (Boiler, settings,

shelterStatusComponent

) {

    var Module = function (globalContext) {

        var context = new Boiler.Context(globalContext);
        context.addSettings(settings);

        var controller = new Boiler.UrlController($(".appcontent"));
        controller.addRoutes({
            
          
            'shelterstatus': new shelterStatusComponent(context)
            

        });
        controller.start();

    };

    return Module;

});
