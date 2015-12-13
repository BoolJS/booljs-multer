/* global describe, before, it */
'use strict';

describe('Bool.js', function () {
    var resolver    = require('../utils/resolve')
    ,   booljs      = require('bool.js')
    ,   Agent       = require('supertest-as-promised')
    ,   chai        = require('chai')
    ,   expect      = chai.expect
    ,   agent;

    before(() => {
        return (booljs('com.example.api', [ resolver('') ])
            .setBase('example')
            .run()
        ).then(function (api) {
            agent = new Agent(api.server);
        });
    });

    it('uploads a file', () => {
        return (agent
            .post('/dog')
            .attach('file', 'samples/husky.jpg')
            .expect(200)
        );
    });

});
