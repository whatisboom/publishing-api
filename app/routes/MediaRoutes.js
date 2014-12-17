var Media = require('../models/media.js');
var Utils = require('../modules/Utils.js');
var fs = require('fs');
var crypto = require('crypto');
var imageSize = require('image-size');

function decodeBase64(base64string) {
    var matches = base64string.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    var res = {};

    if (matches.length !== 3) {
        return new Error('Invalid input string');
    }
    res.type = matches[1];
    res.data = new Buffer(matches[2], 'base64');
    return res;
}

module.exports = function(router) {
    router.route('/media')
    .get(function(req, res) {

        Media.find(function(err, media) {
            if (err) {
                res.status(500).json({
                    meta: {
                        error: "Fetching media failed."
                    }
                });
            }

            res.json({
                meta: {

                },
                data: {
                    media: media
                }
            });

        });
    })
    .post(Utils.requireRole('user'), function(req, res) {

        var payload = req.body.data.media;
        var results = [];
        for (var i = payload.length - 1; i >= 0; i--) {
            var media = payload[i];
            var decoded = decodeBase64(media.image_data);
            var extension = decoded.type.match(/\/(.*?)$/)[1];

            var seed = crypto.randomBytes(20);
            var uniqueHash = crypto.createHash('sha1').update(seed).digest('hex');

            var filename = ['media/', 'image-', uniqueHash, '.', extension].join('');

            fs.writeFileSync(filename, decoded.data);

            var dimensions = imageSize(filename);

            results.push({
                user: req.user.id,
                description: media.description,
                source_url: media.source_url,
                filename: filename,
                mimeType: decoded.type,
                width: dimensions.width,
                height: dimensions.height
            });

        };

        Media.create(results, function(err) {
            if (err) {
                res.status(500).json({
                    meta: {
                        error: "Error saving image to database."
                    }
                })
            }
            else {
                res.status(201).json({
                    meta: {

                    },
                    data: {
                        media: results
                    }
                });
            }
        });
    });

    router.route('/media/:mediaId')
    .delete(Utils.requireRole('user'), function(req, res) {
        
        Media.findById(req.params.mediaId, function(err, media) {
            if (err) {
                res.status(500)
            }
            if (!media) {
                res.send(404);
            }
            if (req.user._id === media.user) {
                media.remove(function(err) {
                    if (err) {
                        res.send(500);
                    }
                    fs.unlinkSync(media.filename, function(err) {
                        if (err) {
                            res.send(500);
                        }
                        res.send(204);
                    })   
                })
                
            }
        });
    });

    return router;

};