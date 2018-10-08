import {decorate, observable, action, computed} from 'mobx'
import LogHelper from '../utils/LogHelper';

const {logName, debug, log, error} = LogHelper.get('TeamStore', LogHelper.STORE_TYPE);

class TeamStore {

  teams = [];

  setTeams = (teams) => {
    debug(...logName, 'Setting teams in store: ', teams);
    this.teams = teams;
  };

  getByCode = (code) => {
    return this.teams.find(team => team.code === code);
  };


  get codes(){
    return this.teams.map(team => team.code);
  }

  get isEmpty() {
    return this.teams.length === 0;
  };

}

decorate(TeamStore, {
  teams: observable,
  setTeams: action,
  getByCode: action,
  codes: computed,
  isEmpty: computed,
});

const teamStore = new TeamStore();
export default teamStore;