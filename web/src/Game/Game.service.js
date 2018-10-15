import LogHelper from '../utils/LogHelper';
import gameStore from './Game.store';

/*eslint-disable*/
const {logName, debug, log, error} = LogHelper.get('GameService', LogHelper.SERVICE_TYPE);
/*eslint-enable*/

class GameService {

  load = async () => {
    try {

      debug(...logName, 'Getting all games from api...');

      const response = await fetch('/api/shl/games');
      let games = await response.json();

      debug(...logName, '...got games!', games);

      gameStore.games = games;
    } catch (e) {
      error(...logName, e);
    }
  };

  getTeamGames = (team, games) => {
    return games.filter(game => game.homeTeam.code === team.code || game.awayTeam.code === team.code);
  }
}

const gameService = new GameService();
export default gameService;