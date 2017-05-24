module.exports = function(app) {
  var router = app.loopback.Router();
  var moment = require('moment');
  moment.locale('fr');

  var AccessToken = app.models.AccessToken;
  var Driver = app.models.Driver;



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

  // Assign the session to 'sess' variable & giving access to it for views
  router.use(function(req, res, next){
    sess = req.session;
    res.locals.sess = sess;
    next();
  });





  // Handle the login session or not
  function checkLogin(token) {
    return (token && new AccessToken(token).isValid());
  }


  /* ################################################################
   * ############################ ROUTES ############################
   * ################################################################
   */

  /* Index */
  router.get('/', function(req, res) {
    if (checkLogin(sess.token))
      Driver.findById(sess.user.id, {
        include: "habitation"
      }, function(err, driver) {
        if(err) return res.send('error');
        res.render('index', {
          user: driver.toJSON()
        });
      });
    else
      res.render('login');
  });


  /* Login */
  router.post('/login', function(req, res) {
    Driver.login({
      username: req.body.username,
      password: " "
    }, 
    "user",
    function(err, token) {
      if(err) return res.send("error");

      let t = token.toJSON();
      sess.user = t.user;
      delete t.user;
      sess.token = new AccessToken(t);

      res.redirect('/');
    });
  });

  
  
  app.use(router);
};
