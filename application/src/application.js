/*
* This file holds the function (or you may call it a 'class' if you are from .NET or Java world)
* to create a root application context. 'Boiler.Context' can be nested to create a hierarchy of contexts
* for complex implementations. Below we use requirejs to import following files
*      'Boiler'      : Namespace alias for accessing the core boilerplate functions
*      './settings'    : The global setting ( to make available for all children contexts)
*      './modules'     : The object containing all sub module classes
*
* Note: when we define the variables in AMD callback function, we use PascalCase for namespaces
* and classes ('Boiler' in the case), whereas object instances ('settings' and 'modules')
* are represented with camelCase variable names.
*/

define(["Boiler", "./settings", "./modules/modules", "./handlers/errorHandler"], function(Boiler, settings, moduleContexts, errorHandler) {

	/**
	 * The Application class holds the global context that will act as the parent for module contexts.
	 * 
	 * @class Application
	 * @constructor
	 **/
	var Application = function() {
		//Create our root context instance
	    this.appContext = new Boiler.Context();
	    
	    this.appContext.token = "Test";
	    this.appContext.isAuthenticated = true;
	    
		//now lets add global settings
		this.appContext.addSettings(settings);
		//here we load the sub modules of the global context
		this.appContext.loadChildContexts(moduleContexts);
	};
    
	Application.prototype.SetupTokenBeforeSend = function (token) {
	    var bearer = "Bearer " + token;
	    $.ajaxSetup({
	        beforeSend: function (xhr) {
	            xhr.setRequestHeader("Authorization", bearer);
	            xhr.setRequestHeader("Accept", "application/json");
	        }
	    });
	};

	Application.prototype.SetToken = function (token) {
	    this.SetupTokenBeforeSend(token);
	    this.appContext.isAuthenticated = true;
	    this.appContext.loadChildContexts(moduleContexts);
	};
    
	return Application;
});
