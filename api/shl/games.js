const routes = require('express').Router();
const logger = require('../../lib/Logger').getLogger('api/shl/games');
const service = require('../../service/Game.service');

logger.trace(`    Setting up /api/shl/games route...`);

routes.get('/games', async (req, res) => {

  try {

    logger.debug('Received request to get games...');

    const games = await service.getAll();

    logger.debug('...request complete!');
    res.status(200).json(games);

  } catch (error) {
    logger.error('Access Token error', error.message);
    res.status(401).send();
  }
});

module.exports = routes;