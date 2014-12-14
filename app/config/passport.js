var LocalStrategy = require('passport-local');
var User = require('../models/user.js');
module.exports = function(passport) {
    passport.use(new LocalStrategy(function(username, password, done){
        User.findOne({ username: username }, function(err, user) {
            if (err) { 
                return done(err);
            }
            if (!user || !user.validPassword(password)) {
                return done(null, false, { message: 'Incorrect Username or password.'})
            }

            return done(null, user);
        });
    }));
};