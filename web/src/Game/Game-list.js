import React, {Component} from 'react';
import {observer} from 'mobx-react';
import LogHelper from '../utils/LogHelper';
import gameStore from './Game.store';
import gameService from './Game.service';
import './Game.css';

const {logName, debug, log, warn} = LogHelper.get('Games', LogHelper.COMPONENT_TYPE);

class Games extends Component {

  componentDidMount() {
    gameService.getAll();
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

Games = observer(Games);

export default Games;