var User = require('../models/user.js');
var extend = require('extend');
module.exports = function(router) {
    router.route('/users')
    .get(function(req, res) {
        User.find(function(err, users) {
            if (err) {
                res.status(500);
            }
            res.json({
                meta: {
                    error: err
                },
                data: {
                    users: users
                }
            })
        });
    })
    .post(function(req, res) {

        var user = new User();
        extend(user, req.body);
        user.save(function(err) {
            if (err) { 
                res.status(500);
            }
            else {
                res.status(201);
            }
            res.json({
                meta: {
                    error: err
                },
                data: {
                    users: [{
                        name: user.name,
                        email: user.email
                    }]
                }
            })
        });
    });

    router.route('/users/:user_id')
    .get(function(req, res) {
        User.findById(req.params.user_id, function(err, user) {
            if (err) {
                res.status(500)
            }
            res.json({
                meta: {
                    error: err
                },
                data: {
                    users: [user]
                }
            })
        });
    })
    .put(function(req, res) {
        User.findById(req.params.user_id, function(err, user) {
            if (err) {
                res.status(500);
            }

            extend(user, req.body);

            user.save(function(err) {
                if (err) {
                    res.status(500);
                }

                res.json({
                    data: {
                        users: [user]
                    }
                })
            });
        });
    })
    .delete(function(req, res) {
        res.status(403);
        res.json({
            meta: {
                error: 'No.'
            }
        })
    });

    return router;

};