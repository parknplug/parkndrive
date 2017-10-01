app.controller('driverCtrl', function($rootScope,$scope,$location,driverFactory, houseFactory){

	$scope.create = async (driver) => {
		await driverFactory.create(driver);
		
		$location.path('/drivers')
		$scope.$apply();
	}  
	$scope.save = async () => {
		await driverFactory.update($scope.$resolve.driver);
		await houseFactory.update($scope.$resolve.house);
		$location.path('/drivers')
		$scope.$apply();
	}  
});
