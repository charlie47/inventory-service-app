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

    app.use(function(req, res, next) {
        //res.header("Access-Control-Allow-Origin", "*");
        //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
        res.header("Access-Control-Allow-Methods", "GET, PUT, POST");

        next();
    });

    app.get('/', logRequest, function (req, res) {
        res.send('Hello World!');
    });

    var routes = require('./routes')(repository);

    app.get('/stock', routes.findAll);

    app.get('/stock/:isbn', routes.getCount);
    app.get('/stock/:isbn/html', routes.getCountInHtml);

    app.post('/stock', routes.stockUp);

    app.use(routes.clientError);
    app.use(routes.serverError);

    return app;
};