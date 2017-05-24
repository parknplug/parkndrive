module.exports = function(app) {
  var router = app.loopback.Router();
  var moment = require('moment');
  moment.locale('fr');



  /* ################################################################
   * ########################## Middlewares #########################
   * ################################################################
   */

  // Logs the page
  router.use(function(req, res, next){
    var date = new Date();
    var now = moment();


    console.log('\n\n' + now.format("DD/MM/YY HH:mm:ss") + '\n \033[1;39m' + req.method + ' \033[0m ' + req.path);
    
    for (var k in req.query){
      var query = req.query[k];
      console.log('  > \033[1;35m%s\033[0m:', k)
      console.log('    ' + JSON.stringify(query));
    }
    if (req.body) {
      console.log ('  >> \033[1;35mbody\033[0m:')
      console.log('   ' + JSON.stringify(req.body))                                         
    }


    next();
  });


  /* ################################################################
   * ############################ ROUTES ############################
   * ################################################################
   */

  /* Index */
  router.get('/', function(req, res) {
    res.send('ok');
  });

  
  
  app.use(router);
};
