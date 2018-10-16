import LogHelper from '../utils/LogHelper';
import teamService from '../Team/Team.service';
import gameService from '../Game/Game.service';
import tableService from '../Table/Table.service';

/*eslint-disable*/
const {logName, debug, log, error} = LogHelper.get('AppService', LogHelper.SERVICE_TYPE);
/*eslint-enable*/

class AppService {

  load = async () => {
    teamService.load();
    await gameService.load();
    tableService.create();
  };
}

const appService = new AppService();
export default appService;