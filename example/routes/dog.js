'use strict';

module.exports = class DogRouter {
    constructor (app) {
        const dog = new app.controllers.Dog();

        return [
            {
                method: 'get',
                url: '/dog',
                action: dog.list.bind(dog),
                cors: true
            },
            {
                method: 'post',
                url: '/dog',
                action: dog.upload.bind(dog),
                cors: true,
                files: true
            }
        ];
    }
};
