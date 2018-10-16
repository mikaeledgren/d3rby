import {decorate, observable, computed} from 'mobx'
import LogHelper from '../utils/LogHelper';

/*eslint-disable*/
const {logName, debug, log, error} = LogHelper.get('TableStore', LogHelper.STORE_TYPE);
/*eslint-enable*/

class TableStore {

  table = [];

  get leaderTeam(){
    return this.table.length ? this.table[0].team : null;
  }
}

decorate(TableStore, {
  table: observable,
  leaderTeam: computed,
});

const tableStore = new TableStore();
export default tableStore;
