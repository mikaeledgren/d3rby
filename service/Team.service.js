const teamStore = require('../store/Team.store');
const logger = require('../lib/Logger').getLogger('TeamService');
const apiService = require('./Api.service');

/**
 *
 */
class TeamService {

  /**
   *
   * @returns {Array}
   */
  async getAll() {
    try {

      logger.debug('Getting all teams...');
      return teamStore.teams;

    } catch (e) {
      logger.error(e);
      throw e;
    }
  }
}

const teamService = new TeamService();
module.exports = teamService;