'use strict';

var API     = require('bool.js/api')
,   Multer  = require('multer')
,   sstatic = require('serve-static');

var fs      = require('fs')
,   path    = require('path')
,   uuid    = require('uuid');

var multer = new Multer({
    storage: Multer.diskStorage({
        destination: function (req, file, cb) {
            var dest = path.join(PATH, 'static');
            fs.exists(dest, function (exists) {
                if(!exists) return fs.mkdir(dest, function (err) {
                    if(!err) cb(null, dest);
                });
                cb(null, dest);
            });
        },
        filename: function (req, file, cb) {
            var name = uuid.v4()
            ,   ext  = path.extname(file.originalname);

            cb(null, `${name}${ext}`);
        }
    })
});

module.exports = new API.RouteMiddleware('booljs-multer', {
    action: function (url, router) {
        router.use('/static', sstatic('static'));
        return multer.any();
    },
    type: 'mandatory',
    policies: {
        files: true
    }
});
