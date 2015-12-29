var express = require('express');
var bodyParser = require('body-parser');
var mongoRepository = require('./mongoStockRepository')();
//mongodb://heroku_4x78mgjj:5c76vmaot6lpjfdubl2k6f1qc4@ds033285.mongolab.com:33285/heroku_4x78mgjj


var app = express();

function logRequest() {
    console.log('Requested logged at %s.', new Date().toString());
}

function logGetRequest() {
    console.log('GET Requested logged at %s.', new Date().toString());
}



module.exports = function (repository) {

    var repository = repository || mongoRepository;

    app.use(logRequest);
    app.use(bodyParser.json());

    app.get('/', logGetRequest, (req, res) => {
        res.send('Book inventory service');
    });

    var routes = require('./routes')(repository);

    app.get('/stock', (req, res, next) => routes.findAll);
    app.get('/stock/:isbn', (req, res, next) => routes.getCount);
    app.post('/stock', (req, res, next) => routes.update);

    app.use(routes.clientError);
    app.use(routes.serverError);

    return app;
};