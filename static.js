'use strict';

const serveStatic = require('serve-static');
const { Middleware } = require('@booljs/api');
const path = require('path');

module.exports = class BoolJsMulter extends Middleware {
    constructor () {
        super('booljs-static');
    }

    action (instance, router, route) {
        router.use('/static', serveStatic(path.join(PATH, 'static')));
        return (request, response, next) => next();
    }
};