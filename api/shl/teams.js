const routes = require('express').Router();
const logger = require('../../lib/Logger').getLogger('api/shl/teams');
const service = require('../../service/Team.service');

logger.trace(`    Setting up /api/shl/teams route...`);
routes.get('/teams', async (req, res) => {

  try {

    logger.debug('Received request to get teams...');

    const teams = await service.getAll;

    res.status(200).json(teams);
    logger.debug('...request complete!');

  } catch (error) {
    logger.error('Access Token error', error.message);
    res.status(401).send();
  }
});

module.exports = routes;