var User = require('../models/user.js');

module.exports = function(router) {
    router.route('/users')
    .get(function(req, res) {
        res.json({
            meta: {

            },
            data: {
                users: [{
                    name: 'Brandon Jernigan',
                    email: 'brandon@whatisboom.com'
                }]
            }
        })
    })
    .post(function(req, res) {

        var user = new User();
        user.name = req.body.name;
        user.email = req.body.email;
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

    return router;

};