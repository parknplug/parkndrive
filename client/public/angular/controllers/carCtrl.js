app.controller('carCtrl', function($rootScope,$scope,$location,carFactory){

	$scope.car = {}

	$scope.create = async (car) => {
		console.log(car)
		if (car.driverId == undefined) {
			car.driverId = $rootScope.user.id
		}

		await carFactory.create(car);
		
		$location.path('/cars')
		$scope.$apply();
	}  
	$scope.save = async () => {
		await carFactory.update($scope.$resolve.car);
		$location.path('/cars')
		$scope.$apply();
	}  

	$scope.delete = async (car_key, car_id) => {
  		let result = await carFactory.deleteById(car_id);
  		if (result) {
			$scope.$resolve.cars.splice(car_key,1);
			$scope.$apply();
		}
	}
	$scope.addTravel = async (car, distance) => {
  		let result = await carFactory.addTravel(car.id, distance);
  		if (result) {
			$location.path('/cars/'+car.id+'/show')
			$scope.$apply();
		}
	}  
});
