var chai = require('chai')
    assert = chai.assert;

describe('PageModel', function() {

    describe('#find()', function() {
        it('should check find function', function (done) {
            Page.create({
                title: 'title',
                slug: 'slug',
                content: 'content'
            }).then(function() {
                Page.find()
                    .then(function (results) {
                        assert.equal(results.length, 1);
                        done();
                    })
                    .catch(done);
            });
        });
    });

});