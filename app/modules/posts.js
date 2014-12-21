var Post = require('../models/post.js');
var Media = require('../models/media.js');
var Utils = require('../modules/Utils.js');

module.exports = {
    create: function() {
        return function(req, res) {
            var results = [];
            var payload = req.body.data.posts;
            var mediaIds = [];
            for (var i = payload.length - 1; i >= 0; i--) {
                var post = payload[i];
                mediaIds.push(post.mediaId);
                results.push({
                    user: req.user.id,
                    network: post.network,
                    mediaId: post.mediaId,
                    description: post.description,
                    url: post.url
                })
            };

            Media.find({
                _id: {
                    $in: mediaIds
                }
            }, function(err, media) {
                if (media.length === payload.length) {
                    Post.create(payload, function(err, posts) {
                        if (err) {
                            res.status(500).json(Utils.error(500, err));
                        }
                        else {
                            res.status(200).json({
                                data: {
                                    posts: posts
                                }
                            });
                        }
                    })
                }
                else {
                    res.status(404).json(Utils.error(404, "One or more invalid mediaId."))
                }
            });
        }
    },
    read: function() {
        return function(req, res) {
            res.status(501).json(Utils.error(501, "Not yet implemented."));
        }
    },
    update: function() {
        return function(req, res) {
            res.status(501).json(Utils.error(501, "Not yet implemented."));
        }
    },
    delete: function() {
        return function(req, res) {
            res.status(501).json(Utils.error(501, "Not yet implemented."));
        }
    },
}