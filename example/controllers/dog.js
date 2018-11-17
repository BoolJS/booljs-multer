'use strict';

module.exports = class DogController {
    constructor (app) {
        const { Dog } = app.dao;
        const { Json } = app.views;
        Object.assign(this, { Dog, Json });
    }

    list (request, response, next){
        new this.Json().promise(new this.Dog().list(), response, next);
    }
    upload ({ files: [ file ] = [] }, response) {
        log.debug(file);
        if (file !== undefined) {
            new this.Json().standard(file, response);
        } else {
            new this.Json().error(new app.Error(400, 'FILE_MISSING'), response);
        }
    }
};
