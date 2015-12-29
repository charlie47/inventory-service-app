var _ = require('lodash');
var heroin = require('heroin-js');
var baseConfig = require('./base');
var testConfig = {
    name: 'inventory-service-app-test',
    domains: ['inventory-service-app-test.herokuapp.com'],
    config_vars: {
        NODE_ENV: 'test'
    }
};

var config = _.merge({}, baseConfig, testConfig);
var configurator = heroin(process.env.HEROKU_API_KEY, { debug: false });

configurator(config);