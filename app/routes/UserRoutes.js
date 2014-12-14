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
        res.json({
            meta: {

            },
            data: {
                users: [{
                    name: 'Brandon Jernigan',
                    email: 'brandon@piqora.com'
                }]
            }
        })
    });

    return router;

};