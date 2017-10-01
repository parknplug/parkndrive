app.factory('houseFactory', function($rootScope, $http, $q,$window){

	var factory = {

		getAll: async () => {
			var deferred = $q.defer();
			if ($window.localStorage.AccessToken !== undefined && $window.localStorage.UserId !== undefined) {
				try{
					var res = await $http.get('/api/Houses', {
						'headers': {
							'Authorization': $window.localStorage['AccessToken']
						},
						'Content-Type': 'application/json'
					});
					deferred.resolve(res.data);
				}catch(e){
					$window.localStorage.clear();
					deferred.resolve(false);	
				}
				
			}else{
				deferred.resolve(false);	
			}
			
			return deferred.promise;
		},
		getById: async (house_id) => {
			var deferred = $q.defer();
			if ($window.localStorage.AccessToken !== undefined && $window.localStorage.UserId !== undefined) {

				try{
					var res = await $http.get('/api/Houses/'+house_id, {
						'headers': {
							'Authorization': $window.localStorage['AccessToken']
						},
						'Content-Type': 'application/json'
					});
					deferred.resolve(res.data);
				}catch(e){
					$window.localStorage.clear();
					deferred.resolve(false);	
				}
				
			}else{
				deferred.resolve(false);	
			}
			
			return deferred.promise;
		},
		getByUserId: async (user_id) => {
			var deferred = $q.defer();

			if ($window.localStorage.AccessToken !== undefined && $window.localStorage.UserId !== undefined) {

				try{
					var res = await $http.get('/api/Drivers/'+user_id+'/habitation', {
						'headers': {
							'Authorization': $window.localStorage['AccessToken']
						},
						'Content-Type': 'application/json'
					});
					deferred.resolve(res.data);
				}catch(e){
					$window.localStorage.clear();
					deferred.resolve(false);	
				}
				
			}else{
				deferred.resolve(false);	
			}
			
			return deferred.promise;
		},
		create: async (house) => {
			var deferred = $q.defer();
			if ($window.localStorage.AccessToken !== undefined && $window.localStorage.UserId !== undefined) {

				try{
					var res = await $http.post('/api/Houses', house, {
						'headers': {
							'Authorization': $window.localStorage['AccessToken']
						},
						'Content-Type': 'application/json'
					});
					deferred.resolve(res.data);
				}catch(e){
					$window.localStorage.clear();
					deferred.resolve(false);	
				}
			}else{
				deferred.resolve(false);	
			}
			
			return deferred.promise;
		},
		update: async (house) => {
			var deferred = $q.defer();
			if ($window.localStorage.AccessToken !== undefined && $window.localStorage.UserId !== undefined) {

				try{
					var res = await $http.patch('/api/Houses/'+house.id, house, {
						'headers': {
							'Authorization': $window.localStorage['AccessToken']
						},
						'Content-Type': 'application/json'
					});
					deferred.resolve(res.data);
				}catch(e){
					$window.localStorage.clear();
					deferred.resolve(false);	
				}
			}else{
				deferred.resolve(false);	
			}
			
			return deferred.promise;
		}
	};
	return factory;
});