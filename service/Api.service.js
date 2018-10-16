const axios = require('axios');
const authStore = require('../store/Auth.store');
const logger = require('../lib/Logger').getLogger('AuthService');
const simpleOauth2 = require('simple-oauth2');
const teamService = require('./Team.service');

const BASE_PATH = 'https://openapi.shl.se';

/**
 *
 */
class AuthService {

  constructor() {
    this._axiosInstance = null;
  }

  /**
   *
   * @returns {Promise.<*|null>}
   */
  async getAxiosInstance() {
    if (!this._axiosInstance) {
      this._axiosInstance = axios.create({
        baseURL: BASE_PATH
      });
    }
    this._axiosInstance.defaults.headers.common['Authorization'] = await this._getAccessToken();
    return this._axiosInstance;
  }

  /**
   *
   * @returns {Promise.<{Authorization: string}>}
   */
  async _getAccessToken() {
    try {

      logger.debug('Getting access token...');
      let token;

      if (!authStore.hasAccessToken()) {
        logger.debug('Store does not contain token, request one from SHL API...');
        const accessToken = await this._requestToken();
        token = accessToken.token.access_token;
        logger.debug('...got token from SHL API');
        authStore.accessToken = accessToken;
      } else {
        logger.debug('We have a token in the store, use that!');
        let accessToken = authStore.accessToken;
        accessToken = await this._refreshToken(authStore.accessToken);
        token = accessToken.token.access_token;
      }

      const header = `Bearer ${token}`;
      logger.debug('Returning auth header: ', header);
      return header;

    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  /**
   *
   * @param token
   * @returns {Promise.<void>}
   * @private
   */
  async _refreshToken(token) {
    try {

      if (token.expired()) {

        logger.debug('Token has expired! Refreshing...');

        const expirationTimeInSeconds = token.expires_at.getTime() / 1000;
        const expirationWindowStart = expirationTimeInSeconds - authStore.EXPIRATION_WINDOW_IN_SECONDS;

        const nowInSeconds = (new Date()).getTime() / 1000;
        const shouldRefresh = nowInSeconds >= expirationWindowStart;

        if (shouldRefresh) {
          token = await token.refresh();
        }

        logger.debug('...token refreshed!');

      }

      return token;
    } catch (e) {
      logger.error('Error refreshing access token: ', e.message);
      throw e;
    }
  }

  /**
   *
   * @returns {Promise.<result>}
   * @private
   */
  async _requestToken() {
    try {

      logger.debug('Getting token...');
      logger.trace('.......');
      logger.trace('env params:', process.env);
      logger.trace('.......');
      const credentials = {
        client: {
          id: process.env.SHL_OPEN_API_ID,
          secret: process.env.SHL_OPEN_API_SECRET
        },
        auth: {
          tokenHost: BASE_PATH + '/oauth2/token'
        }
      };
      const oauth2 = simpleOauth2.create(credentials);
      const result = await oauth2.clientCredentials.getToken();
      const accessToken = oauth2.accessToken.create(result);
      authStore.accessToken = accessToken;

      logger.debug('...token received!');
      return accessToken;

    } catch (e) {
      logger.error('Access Token error', e.message);
      throw e;
    }
  }
}

const gamesService = new AuthService();
module.exports = gamesService;