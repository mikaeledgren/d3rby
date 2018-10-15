import {decorate, observable, action, computed} from 'mobx'
import LogHelper from '../utils/LogHelper';

/*eslint-disable*/
const {logName, debug, log, error} = LogHelper.get('GameStore', LogHelper.STORE_TYPE);
/*eslint-enable*/

class GameStore {

  games = [];

  get isEmpty() {
    debug(this.games.length ? 'There are games in store' : 'There are no games in store');
    return this.games.length === 0;
  };

  get playedGames(){
    return this.games.filter(game => game.played);
  }

  get nextGame(){
    return this.games.filter(game => !game.played)[0];
  }
}

decorate(GameStore, {
  games: observable,
  setGames: action,
  isEmpty: computed,
  playedGames: computed,
});
const gameStore = new GameStore();
export default gameStore;