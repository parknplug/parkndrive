app.controller('loginCtrl', function ($rootScope,$scope,$location, $window,$interval,driverFactory) {

	$scope.username = '';
	$scope.password = '';
	  
   $scope.login = async () => {

   		if($scope.username != ''){

			if($scope.password == undefined)
				$scope.password = '';

			driverFactory.login({
				username: $scope.username,
				password: $scope.password
			}).then((data) => {
				$window.location.href = '/#!/drivers';
			}, (data) => {
				//failure
				alert(data)
			})
	 
	   	}else{
	   		alert("Login fail");
	   	}
   	}


});
