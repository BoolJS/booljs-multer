'use strict';

const resolver = require('../utils/resolve');
const Bool = require('booljs');
const Agent = require('supertest-as-promised');

describe('Bool.js', function () {
    let agent;
    
    before(async () => {
        const { server } = await new Bool('com.example.api', [ '@booljs/express', resolver('') ])
            .setBase('example')
            .setServerDrivers('booljs.express')
            .run();
        
        agent = new Agent(server);
    });

    it('POST /dog -> File -> 200', () => agent
        .post('/dog')
        .attach('file', 'samples/husky.jpg')
        .expect(200));
});
