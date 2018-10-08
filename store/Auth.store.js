const logger = require('../lib/Logger').getLogger('ShlStore');

class ShlStore {
  constructor() {
    this.TOKEN_EXPIRATION_WINDOW_IN_SECONDS = 300;
    this.accessToken = null;
  }

  hasAccessToken(){
    return this.accessToken != null;
  }
}

const store = new ShlStore();
module.exports = store;