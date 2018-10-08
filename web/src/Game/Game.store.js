import {decorate, observable, action, computed} from 'mobx'
import LogHelper from '../utils/LogHelper';

const {logName, debug, log, error} = LogHelper.get('GameStore', LogHelper.STORE_TYPE);

class GameStore {

  games = [];

  setGames = (games) => {
    debug(...logName, 'Setting games in store: ', games);
    this.games = games;
  };

  get isEmpty() {
    debug(this.games.length ? 'There are games in store' : 'There are no games in store');
    return this.games.length === 0;
  };
}

decorate(GameStore, {
  games: observable,
  setGames: action,
  isEmpty: computed,
});
const gameStore = new GameStore();
export default gameStore;