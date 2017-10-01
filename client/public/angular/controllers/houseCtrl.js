app.controller('houseCtrl', function($rootScope,$scope,$location,driverFactory, houseFactory){

	$scope.house = {};

	$scope.create = async (house) => {
		await houseFactory.create(house);
		$location.path('/houses')
		$scope.$apply();
	}  
	$scope.save = async () => {
		await houseFactory.update($scope.$resolve.house);
		$location.path('/houses')
		$scope.$apply();
	}  
});
