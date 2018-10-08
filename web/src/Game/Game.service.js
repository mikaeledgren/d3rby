import LogHelper from '../utils/LogHelper';
import gameStore from './Game.store';

const {logName, debug, log, error} = LogHelper.get('GameService', LogHelper.SERVICE_TYPE);

class GameService {

  getAll = async () => {
    try {

      debug(...logName, 'Getting all games from api...');

      const response = await fetch('/api/shl/games');
      let games = await response.json();

      debug(...logName, '...got games!', games);

      gameStore.setGames(games);

      return games;

    } catch (e) {
      error(...logName, e);
    }
  };
}

const gameService = new GameService();
export default gameService;