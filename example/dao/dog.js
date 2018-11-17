'use strict';

module.exports = class DogDao {
    constructor (app){
        this.dog = new app.models.Dog();
    }

    list () {
        return this.dog.list();
    }
};
