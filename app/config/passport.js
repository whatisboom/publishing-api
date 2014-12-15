var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user.js');
module.exports = function(passport) {
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, email, password, done) {
        process.nextTick(function() {
            User.findOne({ 'email': email }, function(err, user) {
                if (err) {
                    return done(err);
                }

                if (user) {
                    return done(null, false, {
                        error: 'That email is already registered.'
                    });
                }
                else {
                    var user = new User();
                    user.email = email;
                    user.password = user.generateHash(password);

                    user.save(function(err) {
                        if (err) {
                            throw err;
                        }
                        return done(null, user);
                    });
                }
            })
        });
    }));
    passport.use(new LocalStrategy({ usernameField: 'email' }, function(email, password, done) {
        User.findOne({ email: email }, '+password', function(err, user) {
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