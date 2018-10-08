const routes = require('express').Router();
const logger = require('../../lib/Logger').getLogger('api/shl');

logger.trace(`  Setting up /api/shl routes`);
routes.use('/shl', require('./teams'));
routes.use('/shl', require('./games'));

module.exports = routes;