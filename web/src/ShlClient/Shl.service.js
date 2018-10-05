import shlStore from './Shl.store';
import LogHelper from '../utils/LogHelper';

const {logName, log, error} = LogHelper('ShlService', LogHelper.SERVICE_TYPE);

class ShlService {

  SHL_API_URL = 'https://openapi.shl.se';
  GAMES_PATH = '/seasons/2018/games';

  constructor() {

  }

  init = async () => {
    await this._getShlToken();
    await this._load();

  };

  _load = async () => {
    try {

      const headers = {'Authorization': `Bearer ${shlStore.token}`};
      const proxyurl = "https://cors-anywhere.herokuapp.com/";
      let response = await fetch(proxyurl + this.SHL_API_URL + this.GAMES_PATH, {headers,})
      response = await response.json();
      log(...logName, response);

    } catch (e) {
      error(...logName, e);
    }
  };

  _getShlToken = async () => {
    try {

      let response = await fetch('/api/shl/token');
      response = await response.json();
      shlStore.setToken(response.token);

    } catch (e) {
      error(...logName, e);
    }
  };
}

const shlService = new ShlService();
export default shlService;