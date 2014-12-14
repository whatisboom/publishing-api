//var Media = require('../models/media.js');

module.exports = function(router) {
    router.route('/media')
    .get(function(req, res) {
        res.json({
            meta: {

            },
            data: {
                media: [{
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
                media: [{
                    name: 'Brandon Jernigan',
                    email: 'brandon@piqora.com'
                }]
            }
        })
    });

    return router;

};