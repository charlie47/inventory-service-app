var assert = require('assert');
var request = require('supertest');
var repository = require('../inMemoryStockRepository')();
var app = require('../app')(repository);

describe('Book invectory', function() {
    it('allows to stock up the items', (done) => {
        var payload = {
            "isbn": "1617291781",
            "count": 101
        };

        request(app)
            .post('/stock')
            .send(payload)
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res){
                if (err) done(err);

                assert.equal(res.body.isbn, payload.isbn);
                assert.equal(res.body.count, payload.count);

                done();
            });
    });

    it('allows to checks book count by ISBN', (done) => {
        var payload = {
            "isbn": "1617291781",
            "count": 101
        };

        repository
            .update(payload.isbn, payload.count)
            .then(() => {
                request(app)
                    .get('/stock/' + payload.isbn)
                    .set('Content-Type', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end((err, res) => {
                        if (err) done(err);

                        assert(res.body.count, payload.count);

                        done();
                    });
            });

    });
});