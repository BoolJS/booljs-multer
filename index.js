'use strict';

const API = require('@booljs/api');
const Multer = require('multer');

const FS = require('fs').promises;
const { extname, join } = require('path');
const Uuid = require('uuid');

var multer = new Multer({
    storage: Multer.diskStorage({
        async destination (request, file, callback) {
            const destination = join(PATH, 'static');

            try {
                await FS.stat(destination);
                return callback(null, destination);
            } catch (error) {
                if (error.code === 'ENOENT') {
                    await FS.mkdir(destination);
                    return callback(null, destination);
                }

                return callback(error);
            }
        },
        filename (request, { originalname }, callback) {
            const name = Uuid.v4()
            const ext  = extname(originalname);

            callback(null, `${name}${ext}`);
        }
    })
});

module.exports = class BoolJsMulter extends API.RouteMiddleware {
    constructor () {
        super('booljs-multer', 'mandatory', {
            files: true
        }, [ require.resolve('./static') ]);
    }

    action (instance, router, route) {
        return multer.any();
    }

};
