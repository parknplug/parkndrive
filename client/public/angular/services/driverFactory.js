app.factory('driverFactory', function($rootScope, $http, $q,$window){

	var factory = {

		login: async (data) => {

			var deferred = $q.defer();

			try{
				var res = await $http.post('/api/Drivers/login', { username: data.username, password: data.password },{
		            headers: {'Content-Type': 'application/json'}
		        })

				if (res.data.id !== undefined) {
					$window.localStorage['AccessToken'] = res.data.id;
					$window.localStorage['UserId'] = res.data.userId;
					deferred.resolve();
				}else{
					deferred.reject('Erreur d\'authentification');
				}
			}catch(e){
				deferred.reject('Problème de connection au serveur.');
			}
			return deferred.promise;
		},

		amILogged: async () => {
			var deferred = $q.defer();
			if ($window.localStorage.AccessToken !== undefined && $window.localStorage.UserId !== undefined) {

				try{
					var res = await $http.get('/api/Drivers/'+$window.localStorage.UserId, {
						'headers': {
							'Authorization': $window.localStorage['AccessToken']
						},
						'Content-Type': 'application/json'
					});

					$rootScope.user = res.data;

					if(res.data.isAdmin)
						$rootScope.isAdmin = true;
					else
						$rootScope.isAdmin = false;
					
					$rootScope.userLogged = true;
					deferred.resolve(true);
				}catch(e){
					$window.localStorage.clear();
					deferred.resolve(false);	
				}
				
			}else{
				deferred.resolve(false);	
			}
			return deferred.promise;
		},

		disconnect: async () => {

			var deferred = $q.defer();

			if ($window.localStorage.AccessToken !== undefined && $window.localStorage.UserId !== undefined) {
				var res = await $http.delete('/api/Drivers/'+$window.localStorage.UserId+'/accessTokens/'+$window.localStorage.AccessToken, {
					'headers': {
						'Authorization': $window.localStorage.AccessToken
					},
					'Content-Type': 'application/json'
				});
				$window.localStorage.clear()				

				deferred.resolve(true);
			}else{
				deferred.reject(false);	
			}
			return deferred.promise;
		},

		getAll: async () => {
			var deferred = $q.defer();
			if ($window.localStorage.AccessToken !== undefined && $window.localStorage.UserId !== undefined) {

				try{
					var res = await $http.get('/api/Drivers', {
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
		getById: async (user_id) => {
			var deferred = $q.defer();
			if ($window.localStorage.AccessToken !== undefined && $window.localStorage.UserId !== undefined) {

				try{
					var res = await $http.get('/api/Drivers/'+user_id, {
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
		update: async (driver) => {
			var deferred = $q.defer();
			if ($window.localStorage.AccessToken !== undefined && $window.localStorage.UserId !== undefined) {

				try{
					var res = await $http.patch('/api/Drivers/'+driver.id, driver, {
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
		create: async (driver) => {
			var deferred = $q.defer();
			if ($window.localStorage.AccessToken !== undefined && $window.localStorage.UserId !== undefined) {

				try{
					var res = await $http.post('/api/Drivers', driver, {
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