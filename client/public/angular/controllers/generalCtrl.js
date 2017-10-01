app.controller('generalCtrl', function($scope,$window,driverFactory){
       
    $scope.disconnect = async function(){
        try{
            let disconnect = await driverFactory.disconnect()
            $window.location.reload();
        }catch(e){
            console.log(e)
        }
    }

    


});
