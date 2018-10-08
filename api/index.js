const routes = require('express').Router();
const logger = require('../lib/Logger').getLogger('api');

logger.trace(`Setting up /api route`);
routes.use('/api', require('./shl'));

module.exports = routes;