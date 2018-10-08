const express = require('express');
const path = require('path');
const router = express.Router();
const routes = require('./api');

const logger = {
  system: require('./lib/Logger').getLogger('System'),
  app: require('./lib/Logger').getLogger('app')
};

logger.system.info('Starting up app, keep your pants on...');

logger.app.debug('Initializing express');
const app = express();

let webBuildPath = 'web/build';
logger.app.debug(`Setting web build path: ${webBuildPath}`);
app.use(express.static(path.join(__dirname, webBuildPath)));

logger.app.debug(`Register routes`);
app.use(routes);

logger.app.debug('Disable ETags to prevent 304 responses in api routes');
app.disable('etag');

logger.app.debug(`Add catch all route (*) for web`);
logger.app.warn(`   ^    Is this really necessary?`);
router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/web/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

logger.system.info(`...App is up and running! Listening on ${port}`);
