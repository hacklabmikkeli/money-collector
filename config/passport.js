var FacebookStrategy = require('passport-facebook').Strategy;

var User = require('../model/user');

var auth = require('./auth');

module.exports = function (passport) {
  
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
  
  passport.use(new FacebookStrategy({
    clientID : auth.clientID,
    clientSecret : auth.clientSecret,
    callbackURL : auth.callbackURL
  }, function (token, refreshToken, profile, done) {

    process.nextTick(function () {

      User.findOne({ 'facebook_id' : profile.id }, function (err, user) {

        if (err) return done(err);

        if (user) {
          return done(null, user);
        } else {
          var newUser = new User();
          newUser.facebook_id = profile.id;               
          newUser.token = token;             
          newUser.name = profile.name.givenName + ' ' + profile.name.familyName;
          newUser.email = profile.emails[0].value;
          newUser.money = 0;
          newUser.save(function (err) {
            if (err) throw err;
            return done(null, newUser);
          });
        }

      });
    });

  }));

};