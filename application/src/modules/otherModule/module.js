define(['Boiler', './settings',
'./noPermission/component',
'./noRole/component',
'./noActiveEvent/component'
], function (Boiler, settings,
            NoPermissionComponent,
            noRoleComponent,
           noActiveEventComponent

) {

	var Module = function(globalContext) {

		var context = new Boiler.Context(globalContext);
		context.addSettings(settings);

		var controller = new Boiler.UrlController($(".appcontent"));
		controller.addRoutes({

		    'nopermission': new NoPermissionComponent(context),
		    'norole': new noRoleComponent(context),
		    'noactiveevent': new noActiveEventComponent(context)
            
		});
		controller.start();

	};

	return Module;

});
