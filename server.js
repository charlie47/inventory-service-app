var app = require('./app')();

var server = app.listen(process.env.PORT || 3000, function(req, res) {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});