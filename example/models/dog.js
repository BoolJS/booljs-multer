'use strict';

const dogs = [];

module.exports = class DogModel {
    async list () {
        return dogs;
    }
    
    async index (id) {
        return dogs.findIndex(dog => dog.id === id);
    }
    
    async find (id) {
        const index = this.index(id);
        
        if (index === -1) {
            throw new app.Error(404, 'dog_not_found',
                `The searched dog wasn't in the list`);
        }
        
        return dogs[index];
    }
    
    async update (id, update) {
        const index = this.index(id);
        const dog = dogs[index];
        
        dog = { ...dog, ...update };
        dogs[index] = dog;

        return dog;
    }
    
    async delete (id) {
        const index = this.index(id);
        
        if (index === -1) {
            throw new app.Error(404, 'dog_not_found',
                `The searched dog wasn't in the list`);
        }
        
        dogs.splice(index, 1);
    }
};
