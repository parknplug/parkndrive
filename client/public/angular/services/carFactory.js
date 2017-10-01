app.factory('carFactory', function($rootScope, $http, $q,$window){

	var factory = {

		getAll: async () => {
			var deferred = $q.defer();

			if ($window.localStorage.AccessToken !== undefined && $window.localStorage.UserId !== undefined) {

				try{
					var res = await $http.get('/api/Cars', {
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
		getById: async (car_id) => {
			var deferred = $q.defer();

			if ($window.localStorage.AccessToken !== undefined && $window.localStorage.UserId !== undefined) {

				try{
					var res = await $http.get('/api/Cars/'+car_id, {
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
		getTravels: async (car_id) => {
			var deferred = $q.defer();
			if ($window.localStorage.AccessToken !== undefined && $window.localStorage.UserId !== undefined) {

				try{
					var res = await $http.get('/api/Cars/'+car_id+'/travels', {
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
		addTravel: async (car_id, distance) => {
			var deferred = $q.defer();
			if ($window.localStorage.AccessToken !== undefined && $window.localStorage.UserId !== undefined) {
				try{
					var res = await $http.post('/api/Cars/'+car_id+'/travels', {
						carId: car_id,
						distance: distance,
						driverId: $window.localStorage.UserId
					}, {
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
		getOwner: async (car_id) => {
			var deferred = $q.defer();

			if ($window.localStorage.AccessToken !== undefined && $window.localStorage.UserId !== undefined) {

				try{
					var res = await $http.get('/api/Cars/'+car_id+'/owner', {
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
					var res = await $http.get('/api/Drivers/'+user_id+'/cars', {
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
		create: async (car) => {
			var deferred = $q.defer();
			if ($window.localStorage.AccessToken !== undefined && $window.localStorage.UserId !== undefined) {

				try{
					var res = await $http.post('/api/Cars', car, {
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
		update: async (car) => {
			var deferred = $q.defer();
			if ($window.localStorage.AccessToken !== undefined && $window.localStorage.UserId !== undefined) {

				try{
					var res = await $http.patch('/api/Cars/'+car.id, car, {
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
		deleteById: async (car_id) => {
			var deferred = $q.defer();
			if ($window.localStorage.AccessToken !== undefined && $window.localStorage.UserId !== undefined) {
				try{
					var res = await $http.delete('/api/Cars/'+car_id, {
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