import {decorate, computed} from 'mobx'
import LogHelper from '../utils/LogHelper';
import tableService from './Table.service';
import gameStore from '../Game/Game.store';
import teamStore from '../Team/Team.store';

/*eslint-disable*/
const {logName, debug, log, error} = LogHelper.get('TableStore', LogHelper.STORE_TYPE);
/*eslint-enable*/

class TableStore {

  get table() {
    return tableService.getTable(teamStore.teams, gameStore.playedGames);
  };
}

decorate(TableStore, {
  table: computed,
});

const tableStore = new TableStore();
export default tableStore;
