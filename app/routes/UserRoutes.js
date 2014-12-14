var User = require('../models/user.js');

module.exports = function(app) {
    app.get('/users', function(req, res) {
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
    });

    app.post('/users', function(req, res) {
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

};