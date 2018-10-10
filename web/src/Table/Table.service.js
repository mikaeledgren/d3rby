import teamStore from '../Team/Team.store';
import LogHelper from '../utils/LogHelper';
import gameService from '../Game/Game.service';
import _ from 'lodash';

/*eslint-disable*/
const {logName, debug, log, error} = LogHelper.get('TableService', LogHelper.SERVICE_TYPE);
/*eslint-enable*/

class TableService {

  getTable = (teams, games) => {
    log(...logName, 'Creating table!', teams, games);

    let table = [];
    teamStore.teams.forEach(team => {
      table.push(this._createTableEntry(team, games));
    });

    table = _.orderBy(table, ['points', 'goalDifference', 'goalsScored'], ['desc', 'desc', 'desc']);
    log(...logName, 'Table looks like this:', table);

    return table;
  };

  _createTableEntry(team, games) {

    const tableEntry = {
      team: team,
      gamesPlayed: 0,
      goalsScored: 0,
      goalsAgainst: 0,
      goalDifference: 0,
      points: 0,
    };

    const teamGames = gameService.getTeamGames(team, games);
    debug(...logName, `--------- ${team.name} ---------`);

    teamGames.forEach(game => {
      const teamScore = game.homeTeam.code === team.code ? game.homeScore : game.awayScore;
      const opponentScore = game.homeTeam.code === team.code ? game.awayScore : game.homeScore;

      const points = teamScore > opponentScore ? (game.penaltyShots || game.overtime ? 2 : 3) : (game.penaltyShots || game.overtime ? 1 : 0);
      tableEntry.points += points;
      tableEntry.goalsScored += teamScore > opponentScore && game.penaltyShots ? teamScore - 1 : teamScore;
      tableEntry.goalsAgainst += teamScore < opponentScore && game.penaltyShots ? opponentScore - 1 : opponentScore;
      tableEntry.gamesPlayed += 1;

      debug(...logName, '--------');
      debug(...logName, `[${team.name}] team score is ${teamScore}, oppos score is ${opponentScore} ${game.penaltyShots ? '(on penalties)' : ''} ${game.overtime ? '(on overtime)' : ''}`);
      debug(...logName, `[${team.name}] points are ${points}`);
      debug(...logName, `[${team.name}] game is`, game);
    });

    tableEntry.goalDifference = tableEntry.goalsScored - tableEntry.goalsAgainst;

    debug(...logName, `[${team.name}] table entry: `, tableEntry);
    return tableEntry;
  }
}

const tableService = new TableService();
export default tableService;