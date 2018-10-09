import React, {Component} from 'react';
import {observer} from 'mobx-react';
import LogHelper from '../utils/LogHelper';
import gameStore from './Game.store';
import gameService from './Game.service';
import './Game.css';

/*eslint-disable*/
const {logName, debug, log, warn} = LogHelper.get('Game-list', LogHelper.COMPONENT_TYPE);
/*eslint-enable*/

class GameList extends Component {

  componentDidMount() {
    gameService.load();
  }

  render() {
    return (
      <div className="games-container">
        <h2>Games</h2>
        <div className="games">
          {gameStore.games.map((game, i) => (
            <div key={i} className="game">
              <div>{game.homeTeam.name}</div>
              <div>{game.played ? game.homeScore : null} - {game.played ? game.awayScore : null}</div>
              <div>{game.awayTeam.name}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

}

GameList = observer(GameList);
export default GameList;