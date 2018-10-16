import LogHelper from '../utils/LogHelper';
import teamStore from './Team.store';

/*eslint-disable*/
const {logName, debug, log, error} = LogHelper.get('TeamService', LogHelper.SERVICE_TYPE);
/*eslint-enable*/

class TeamService {

  load = async () => {
    try {

      debug(...logName, 'Getting teams from the API...');

      const response = await fetch('/api/shl/teams');
      const teams = await response.json();

      debug(...logName, `...got ${teams.length} teams!`);

      teamStore.teams = teams;

    } catch (e) {
      error(...logName, e);
    }
  };
}

const teamService = new TeamService();
export default teamService;