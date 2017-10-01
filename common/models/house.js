'use strict';

var app = require('../../server/server.js');

module.exports = function(House) {


	

	House.afterRemote('**', (ctx, modelInstance, next) => {
		var Driver = app.models.Driver;

    	Driver.findById(ctx.req.accessToken.userId, (err, driver) => {
    		console.log(driver)
    		if (ctx.result) {
		    	if (Array.isArray(modelInstance)) {
		      		var answer = [];
		      		ctx.result.forEach( (result) => {
		        		var replacement = result;
		        		if(driver.houseId !== result.id && driver.isAdmin == 0)
				          	replacement['value'] = null;
		        		
				        answer.push(replacement);
		      		});
		    	} else {
		      		var answer = ctx.result;
		      		if(driver.houseId !== answer.id && driver.isAdmin == 0)
				        answer['value'] = null;
		      		
		    	}
		    	console.log(answer)
		    	ctx.result = answer;
		  	}
		  	next();
    	})
	});
};
