'use strict';

const API = require('@booljs/api');
const Multer = require('multer');
const ServeStatic = require('serve-static');

const FS = require('fs').promises;
const { extname, join } = require('path');
const Uuid = require('uuid');

var multer = new Multer({
    storage: Multer.diskStorage({
        async destination (request, file, callback) {
            const destination = join(PATH, 'static');
            
            try {
                const stat = await FS.stat(destination);
                if (!stat.isDirectory()) {
                    await FS.mkdir(destination);
                    return callback(null, destination);
                }
                
                return callback(null, destination);
            } catch (error) {
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
    constructor(){
        super('booljs-multer', 'mandatory', {
            files: true
        });
    }
    
    action(instance, router, route) {
        router.use('/static', new ServeStatic('static'));
        return multer.any();
    }

};
