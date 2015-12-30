require('dotenv').load();

var _ = require('lodash');
var heroin = require('heroin-js');
var baseConfig = require('./base');
var prodConfig = {
    name: 'inventory-service-app',
    domains: ['inventory-service-app.herokuapp.com'],
    config_vars: {
        NODE_ENV: 'production'
    },
    log_drains: ['syslog://data.logentries.com:13636']
};

var config = _.merge({}, baseConfig, prodConfig);
var configurator = heroin(process.env.HEROKU_API_KEY, { debug: false });

configurator(config);