define(['Boiler', './settings',
'./noPermission/component'
], function (Boiler, settings,
            NoPermissionComponent

) {

	var Module = function(globalContext) {

		var context = new Boiler.Context(globalContext);
		context.addSettings(settings);

		var controller = new Boiler.UrlController($(".appcontent"));
		controller.addRoutes({

		    'nopermission': new NoPermissionComponent(context)
            
		});
		controller.start();

	};

	return Module;

});
