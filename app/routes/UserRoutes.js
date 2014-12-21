var users = require('../modules/users.js');
var Utils = require('../modules/Utils.js');


module.exports = function(router, passport) {

    router.route('/register')
    .get(function(req, res) {
        res.json({});
    })
    .post(users.create(passport));

    router.route('/login')
    .get(function(req, res) {
        res.json({});
    })
    .post(users.login(passport));

    router.route('/users')
    .get(Utils.requireRole('user'), users.read())

    router.route('/users/:userId')
    .get(users.readOne())
    .put([Utils.restrictToOwn(), Utils.requireRole('user')], users.update())
    .delete(Utils.requireRole('admin'), users.delete());

    return router;

};