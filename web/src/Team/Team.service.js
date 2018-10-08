import LogHelper from '../utils/LogHelper';
import teamStore from './Team.store';

const {logName, debug, log, error} = LogHelper.get('TeamService', LogHelper.SERVICE_TYPE);

class TeamService {

  getAll = async () => {
    try {

      debug(...logName, 'Getting the teams from api...');

      const response = await fetch('/api/shl/teams');
      const teams = response.data;

      debug(...logName, '...teams returned', teams);

      teamStore.setTeams(teams);

      return teams;

    } catch (e) {
      error(...logName, e);
    }
  };
}

const teamService = new TeamService();
export default teamService;