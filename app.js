require('dotenv').load();

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoRepository = require('./mongoStockRepository')();

function logRequest(req, res, next) {
    console.log('incoming request logged at ' + new Date());
    next();
}

module.exports = function (repository) {
    repository = repository || mongoRepository;

    app.use(logRequest);
    app.use(bodyParser.json());

    app.get('/', logRequest, function (req, res) {
        //throw new Error("ASDfdas");
        res.send('Hello World!');
    });

    var routes = require('./routes')(repository);

    app.get('/stock', routes.findAll);

    app.get('/stock/:isbn', routes.getCount);

    app.post('/stock', routes.stockUp);

    app.use(routes.clientError);
    app.use(routes.serverError);

    return app;
};