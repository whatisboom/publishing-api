var media = require('../modules/media.js');
var Utils = require('../modules/Utils.js');

module.exports = function(router) {
    router.route('/media')
    .post(Utils.requireRole('user'), media.create())
    .get(media.read());
    

    router.route('/media/:mediaId')
    .put(Utils.requireRole('user'), media.update())
    .delete(Utils.requireRole('user'), media.delete());

    return router;

};