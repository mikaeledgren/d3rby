import React, {Component} from 'react';
import {observer} from 'mobx-react';
import LogHelper from '../utils/LogHelper';
import gameStore from '../Game/Game.store';
import './Games.css';
import Game from "../Game/Game";

/*eslint-disable*/
const {logName, debug, log, warn} = LogHelper.get('Games', LogHelper.COMPONENT_TYPE);
/*eslint-enable*/

class Games extends Component {

  render() {
    return (
      <div className="games">
        <h2>Spelschema</h2>
        {gameStore.games.map((game, i) => (
          <Game key={i} game={game} />
        ))}
      </div>
    );
  };

}

Games = observer(Games);
export default Games;