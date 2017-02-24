const path = require('path');

const constants = require(path.resolve('./static/constants.js'));

process.env.NODE_ENV = constants.DEVELOPMENT;

require(path.resolve('./static/main.js'));
