var mongoose = require('mongoose');
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
                mediaIds.push(mongoose.Types.ObjectId(post.mediaId));
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
                if (!media || media.length !== payload.length) {
                    res.status(404).json(Utils.error(404, "One or more invalid mediaId."))
                }
                else {
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
            });
        }
    },
    read: function() {
        return function(req, res) {
            Post.find({user: req.user.id}, function(err, posts) {
                if (err) {
                    res.status(500).json({
                        meta: {
                            error: "Fetching posts failed."
                        }
                    });
                }

                res.status(200).json({
                    meta: {

                    },
                    data: {
                        posts: posts
                    }
                });

            });
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