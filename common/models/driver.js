'use strict';

module.exports = function(Driver) {

	
	
	
	/* #############################################################
	   ########################### HOOKS ###########################
	   ############################################################# */

	/**
	 * DO NOT EDIT THIS
	 * Hook for using blank password on driver creation
	 */
	Driver.beforeRemote('create', function (ctx, _modelInstance_, next) {
		ctx.args.data.password = " "
		next();
	});
	/**
	 * DO NOT EDIT THIS
	 * Hook for using blank password on driver creation
	 */
	Driver.beforeRemote('login', function (ctx, _modelInstance_, next) {
		ctx.args.credentials.password = " ";
		next();
	});

};
