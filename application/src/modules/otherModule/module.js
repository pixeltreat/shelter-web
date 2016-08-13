define(['Boiler', './settings',
'./noPermission/component',
'./noRole/component',
'./noActiveEvent/component',
'./noFacilitiesFound/component'

], function (Boiler, settings,
            NoPermissionComponent,
            noRoleComponent,
           noActiveEventComponent,
           noFacilitiesFoundComponent

) {

	var Module = function(globalContext) {

		var context = new Boiler.Context(globalContext);
		context.addSettings(settings);

		var controller = new Boiler.UrlController($(".appcontent"));
		controller.addRoutes({

		    'nopermission': new NoPermissionComponent(context),
		    'norole': new noRoleComponent(context),
		    'noactiveevent': new noActiveEventComponent(context),
		    'nofacilitiesfound': new noFacilitiesFoundComponent(context)



            
		});
		controller.start();

	};

	return Module;

});
