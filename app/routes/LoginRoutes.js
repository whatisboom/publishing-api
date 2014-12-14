var User = require('../models/user.js');
var jwt = require('jwt-simple');
var moment = require('moment');

module.exports = function(router, passport) {
    router.route('/signup')
    .post(function(req, res) {
        //create user
    });

    router.route('/login')
    .post(function(req, res) {

        /*User.findOne({ email: req.body.email }, function(err, user) {

            if (err) {
                return res.send(401);
            }

            if (!user) {
                return res.send(401);
            }

            if (!user.validPassword(password)) {
                return res.send(401);
            }

            var expires = moment().add('days', 7).valueOf();

            var token = jwt.encode({
                iss: user._id;
            });

            res.json({
                meta: {
                    token: token,
                    expires: expires,
                    user: user.toJSON()
                }
            });

        })*/
        
    });

    return router;

};