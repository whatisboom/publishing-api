var Media = require('../models/media.js');
var Utils = require('../modules/Utils.js');
var fs = require('fs');
var crypto = require('crypto');
var imageSize = require('image-size');

module.exports = {
    create: function() {
        return function(req, res) {

            var payload = req.body.data.media;
            var results = [];
            for (var i = payload.length - 1; i >= 0; i--) {
                var media = payload[i];
                var decoded = Utils.decodeBase64(media.image_data);
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

            Media.create(results, function(err, media) {
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
                            media: media
                        }
                    });
                }
            });
        }
    },
    read: function() {
        return function(req, res) {

            console.log(req.user);

            Media.find({user: req.user.id}, function(err, media) {
                if (err) {
                    res.status(500).json({
                        meta: {
                            error: "Fetching media failed."
                        }
                    });
                }

                res.status(200).json({
                    meta: {

                    },
                    data: {
                        media: media
                    }
                });

            });
        }
    },
    update: function() {
        return function(req, res) {
            res.status(501).json({
                meta: {
                    error: "Not implemented! Sorry!"
                }
            });
        }
    },
    delete: function() {
        return function(req, res) {
        
            Media.findById(req.params.mediaId, function(err, media) {
                if (err) {
                    res.status(500).json(Utils.error(500, "Could not retrieve item from database."));
                }
                if (!media) {
                    res.status(404).json(Utils.error(404, "Item not found."));
                }
                if (req.user.id === media.user) {
                    media.remove(function(err) {
                        if (err) {
                            res.status(500).json(500, "Error removing item from database.");
                        }
                        
                        try {
                            fs.unlinkSync(media.filename);
                            res.sendStatus(204);
                        }
                        catch (e) {
                            res.status(500).json(500, "File unlink failed.");
                        }
                        
                    })
                    
                }
            });
        }
    }
}