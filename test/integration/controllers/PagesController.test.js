var request = require('supertest');

describe('PageController', function() {

    describe('#api get request', function() {
        it('should list empty json object', function (done) {
            request(sails.hooks.http.app)
                .get('/api/page')
                .expect(200)
                .expect('Content-Type', /json/)
                .expect('Content-Length', '2', done);
        });
    });

});