import {decorate, observable, action, computed} from 'mobx'
import LogHelper from '../LogHelper/LogHelper';

/*eslint-disable*/
const {logName, debug, log, error} = LogHelper.get('TeamStore', LogHelper.STORE_TYPE);
/*eslint-enable*/

class TeamStore {

  teams = [];

  getByCode = (code) => {
    return this.teams.find(team => team.code === code);
  };

  get codes() {
    return this.teams.map(team => team.code);
  }

  get isEmpty() {
    return this.teams.length === 0;
  };
}

decorate(TeamStore, {
  teams: observable,
  getByCode: action,
  codes: computed,
  isEmpty: computed,
});

const teamStore = new TeamStore();
export default teamStore;