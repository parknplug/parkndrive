
module.exports = function(app) {
  var Role = app.models.Role;
  var Driver = app.models.Driver;

  Role.registerResolver('admin', function(role, context, cb) {
    function reject() {
      process.nextTick(function() {
        cb(null, false);
      });
    }
    console.log('check admin')
    // do not allow anonymous users
    console.log(userId)
    var userId = context.accessToken.userId;
    if (!userId) {
      return reject();
    }
    Driver.findById(userId, function(err, driver) {
      console.log(err)
      console.log(driver)
      if (err || !driver)
        return reject();
      
      if (driver.isAdmin == 1){
        console.log('Access Granted')
        return cb(null, true);
      }else{
        return reject();
      }
    });
  });

  Role.registerResolver('carOwner', function(role, context, cb) {
    function reject() {
      process.nextTick(function() {
        cb(null, false);
      });
    }

    console.log('check carOwner')
    console.log(context.modelId)
    if (context.modelName !== 'Car' || context.modelId == undefined) {
      return reject();
    }
    // do not allow anonymous users
    var userId = context.accessToken.userId;
    if (!userId) {
      return reject();
    }
    context.model.findById(context.modelId, (err, car) => {
      console.log(car)
      console.log(userId)
      if (car.driverId && car.driverId == userId) {
        return cb(null, true);
      }else{
        return reject();
      }
    })
  });
  Role.registerResolver('carTravelOwner', function(role, context, cb) {
    function reject() {
      process.nextTick(function() {
        cb(null, false);
      });
    }

    console.log('check carOwner')
    console.log(context.modelId)
    if (context.modelName !== 'Travel') {
      return reject();
    }
    // do not allow anonymous users
    var userId = context.accessToken.userId;
    if (!userId) {
      return reject();
    }

    context.model.findById(context.modelId, (err, car) => {
      console.log(car)
      console.log(userId)
      if (car.driverId == userId) {
        return cb(null, true);
      }else{
        return reject();
      }
    })
  });


 
};