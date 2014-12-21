var posts = require('../modules/posts.js');
var Utils = require('../modules/Utils.js');

module.exports = function(router) {
    router.route('/posts')
    .post(Utils.requireRole('user'), posts.create())
    .get(posts.read());
    

    router.route('/posts/:postId')
    .put(Utils.requireRole('user'), posts.update())
    .delete(Utils.requireRole('user'), posts.delete());

    return router;
};