const logger = require('../lib/Logger').getLogger('GameStore');

class GameStore {

  constructor() {
    this.games = [];
    this.lastFetch = null;
    this.nextGame = null;
  }

  get isEmpty() {
    return this.games.length === 0;
  }

}

const store = new GameStore();
module.exports = store;