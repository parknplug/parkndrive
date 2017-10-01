'use strict';

var app = angular.module('parkndrive', ['ngRoute','ngSanitize','ui.bootstrap','ui.select','truncate']);

async function checkAuth($rootScope,$location,$q,driverFactory){
	var defered = $q.defer();
	//$rootScope.dataLoading = true;
	$rootScope.userLogged = false;
	if ($rootScope.user == undefined  && $rootScope.user == null) {
		var auth = await driverFactory.amILogged();
		if(auth){
			$rootScope.userLogged = true;
			defered.resolve();
		}else{
			$location.path('/drivers/login').replace();
			defered.resolve();
		}		
	}else{
		$rootScope.userLogged = true;
		defered.resolve();
	}
}



app.config(['$routeProvider','$locationProvider','$httpProvider', ($routeProvider,$locationProvider,$httpProvider,$qProvider) => {

    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.withCredentials = true;

	$routeProvider

		.when('/drivers/login', {
			templateUrl: 'angular/views/driver/login.html',
			controller: 'loginCtrl',
			resolve: {
				app: async ($rootScope,$route,$routeParams,$location,$q,driverFactory) => {
					var defered = $q.defer();
					$rootScope.userLogged = false;

					if ($rootScope.user == undefined  && $rootScope.user == null) {
						var auth = await driverFactory.amILogged();
						if(auth){
							$location.path('/drivers').replace();
							defered.resolve();
						}else{
							defered.resolve();
						}		
					}else{
						$location.path('/drivers').replace();
						defered.resolve();
					}

	                return defered.promise;
	            }
			}
		})			

		.when('/drivers', {
			templateUrl: 'angular/views/driver/list.html',
			controller: "driverCtrl",
			resolve: {
				app: checkAuth,
				drivers: async function ($rootScope,$q,driverFactory) {
					return await driverFactory.getAll();
				}
			}
		})
		.when('/drivers/create', {
			templateUrl: 'angular/views/driver/create.html',
			controller: 'driverCtrl',
			resolve: {
				app: checkAuth,
				houses: async function (houseFactory)  {
					return await houseFactory.getAll();
				}
			}
		})
		.when('/drivers/:id', {
			templateUrl: 'angular/views/driver/show.html',
			controller: 'driverCtrl',
			resolve: {
				app: checkAuth,
				driver: async function ($rootScope,driverFactory,$route)  {
					return await driverFactory.getById($route.current.params.id);
				},
				house: async function ($rootScope,$route,houseFactory)  {
					return await houseFactory.getByUserId($route.current.params.id);
				}
			}
		})
		.when('/drivers/:id/edit', {
			templateUrl: 'angular/views/driver/edit.html',
			controller: 'driverCtrl',
			resolve: {
				app: checkAuth,
				driver: async function ($rootScope,driverFactory,$route)  {
					return await driverFactory.getById($route.current.params.id);
				},
				house: async function ($rootScope,$route,houseFactory)  {
					return await houseFactory.getByUserId($route.current.params.id);
				}
			}
		})

		.when('/houses', {
			templateUrl: 'angular/views/house/list.html',
			controller: 'houseCtrl',
			resolve: {
				app: checkAuth,
				houses: async function ($rootScope,$route,houseFactory)  {
					return await houseFactory.getAll();
				}
			}
		})
		.when('/houses/create', {
			templateUrl: 'angular/views/house/create.html',
			controller: 'houseCtrl',
			resolve: {
				app: checkAuth,
			}
		})
		.when('/houses/:id/edit', {
			templateUrl: 'angular/views/house/edit.html',
			controller: 'houseCtrl',
			resolve: {
				app: checkAuth,
				house: async function ($rootScope,$route,houseFactory)  {
					return await houseFactory.getById($route.current.params.id);
				}
			}
		})

		.when('/cars', {
			templateUrl: 'angular/views/car/list.html',
			controller: 'carCtrl',
			resolve: {
				app: checkAuth,
				cars: async function ($rootScope,$route,carFactory, driverFactory)  {

					if($rootScope.user.isAdmin)
						var cars = await carFactory.getAll();
					else
						var cars = await carFactory.getByUserId($rootScope.user.id);

					for (let i = cars.length - 1; i >= 0; i--) {
						if ($rootScope.user.id == cars[i].driverId) {
							cars[i].owner = $rootScope.user;
						}else{
							cars[i].owner = await driverFactory.getById(cars[i].driverId)
						}

						var travels = await carFactory.getTravels(cars[i].id);
						cars[i].totalTravel = 0;
						for (let j = travels.length - 1; j >= 0; j--) {
							cars[i].totalTravel += travels[j].distance;
						}
					}
					return cars;
				}
			}
		})
		.when('/cars/create', {
			templateUrl: 'angular/views/car/create.html',
			controller: 'carCtrl',
			resolve: {
				app: checkAuth,
				drivers: async function ($rootScope,$q,driverFactory) {
					return await driverFactory.getAll();
				}
			}
		})
		.when('/cars/:id/show', {
			templateUrl: 'angular/views/car/show.html',
			controller: 'carCtrl',
			resolve: {
				app: checkAuth,
				car: async function ($rootScope,$route,carFactory)  {
					return await carFactory.getById($route.current.params.id);
				},
				driver: async function ($rootScope,$route,carFactory)  {
					return await carFactory.getOwner($route.current.params.id);
				},
				travels: async function ($rootScope,$route,carFactory) {
					return await carFactory.getTravels($route.current.params.id);
				}
			}
		})
		.when('/cars/:id/addTravel', {
			templateUrl: 'angular/views/car/addTravel.html',
			controller: 'carCtrl',
			resolve: {
				app: checkAuth,
				car: async function ($rootScope,$route,carFactory)  {
					return await carFactory.getById($route.current.params.id);
				}
			}
		})
		.when('/cars/:id/edit', {
			templateUrl: 'angular/views/car/edit.html',
			controller: 'carCtrl',
			resolve: {
				app: checkAuth,
				car: async function ($rootScope,$route,carFactory)  {
					return await carFactory.getById($route.current.params.id);
				},
				drivers: async function ($rootScope,$q,driverFactory) {
					return await driverFactory.getAll();
				}
			}
		})



		.otherwise({
			redirectTo: '/drivers'
		});


}]);


