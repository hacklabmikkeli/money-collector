var common = require('./components/common');
var api = require('./components/api');

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();
  
  res.redirect('/login');
}

module.exports = function (app, passport) {

  /** Common **/

  app.get('/', isLoggedIn, common.index);
  app.get('/login', common.login);
  app.get('/logout', common.logout);

  /** Auth **/

  app.get('/auth', passport.authenticate('facebook', { scope : 'email' }));
  app.get('/auth/callback', passport.authenticate('facebook', {
    successRedirect : '/',
    failureRedirect : '/login'
  }));

  /** Api **/
  
  app.get('/total', isLoggedIn, api.totalMoney);
  app.post('/value', isLoggedIn, api.updateValue);

};