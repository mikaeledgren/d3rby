import {observable, action, computed} from 'mobx'

class ShlStore {

  @observable games = [];
  @observable token = null;

  @action
  setToken = (token) => {
    this.token = token;
  };

  @action
  setGames = (games) => {
    this.games = games;
  };

}

const shlStore = new ShlStore();
export default shlStore;