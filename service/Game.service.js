const gameStore = require('../store/Game.store');
const teamStore = require('../store/Team.store');
const apiService = require('./Api.service');
const logger = require('../lib/Logger').getLogger('GameService');
const _ = require('lodash');
const Game = require('../model/Game');

// TODO Anropa /games med team IDs istället för att hämta alla matcher och filtrera... Men vad är Team ID?

/**
 *
 */
class GamesService {

  /**
   *
   * @returns {Promise.<*>}
   */
  async getAll() {
    try {

      logger.debug('Getting all games...');
      let games;

      if (this._shouldFetchFromApi()) {
        logger.debug('...need to fetch games from SHL API');
        games = await this._fetch();
      } else {
        logger.debug('...games were already in store, returning those');
        games = gameStore.games;
      }

      return games;

    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  /**
   *
   * @returns {boolean}
   */
  _shouldFetchFromApi() {
    try {

      if (gameStore.isEmpty) {
        logger.debug('Game store is empty, games should be fetched from SHL API');
        return true;
      }

      if (new Date() >= gameStore.nextGame) {
        logger.debug('Game store is not empty, but there have been games since last fetch. Games should be fetched from SHL API');
        return true;
      }
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  /**
   *
   * @returns {Promise.<void>}
   * @private
   */
  async _fetch() {
    try {

      logger.debug('Fetching games from SHL API...');

      const api = await apiService.getAxiosInstance();
      const response = await api.get('/seasons/2018/games', teamStore.codes);

      let games = response.data;
      games = this._filter(games);
      games = this._sort(games);
      games = this._asModels(games);
      const nextGameDate = this.getNextGameDate(games);

      gameStore.games = games;
      gameStore.lastFetch = new Date();
      gameStore.nextGame = nextGameDate;

      logger.debug(`... ${games.length} games fetched from API`);
      return games;

    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  /**
   *
   * @param games
   */
  _filter(games) {
    try {

      logger.debug('Filtering games...');
      logger.trace(teamStore.codes);
      const filteredGames = games.filter(game => _.includes(teamStore.codes, game.away_team_code)
        && _.includes(teamStore.codes, game.home_team_code)
      );

      logger.debug('...games filtered!');
      return filteredGames;

    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  /**
   *
   * @param games
   * @returns {Array}
   */
  _sort(games) {
    try {

      logger.debug('Sorting games...');

      const sortedGames = _.sortBy(games, ['start_date_time']);

      logger.debug('...games sorted!');
      return sortedGames;

    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  /**
   *
   * @param games
   */
  _asModels(games) {
    try {

      logger.debug('Create Game models from response data...');

      const gameModels = games.map(game => new Game(
        game.game_id,
        teamStore.getByTeamCode(game.home_team_code),
        teamStore.getByTeamCode(game.away_team_code),
        game.home_team_result,
        game.away_team_result,
        game.overtime,
        game.penalty_shots,
        game.start_date_time,
        game.played
      ));

      logger.debug('...Game models created!');
      return gameModels;

    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  /**
   *
   * @param games
   */
  getNextGameDate(games) {
    try {

      logger.debug('Getting next game\'s date...');

      for (const game of games) {
        if (!game.played) {
          logger.debug('...next game date gotten!', game.date);
          return game.date;
        }
      }
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }
}

const gamesService = new GamesService();
module.exports = gamesService;