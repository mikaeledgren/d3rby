import React, {Component} from 'react';
import {observer} from 'mobx-react';
import LogHelper from '../utils/LogHelper';
import gameStore from '../Game/Game.store';
import './NextGame.css';
import '../Game/Game.css';
import Game from "../Game/Game";
import Moment from 'react-moment';
import 'moment-timezone';
import 'moment/locale/sv'

/*eslint-disable*/
const {logName, debug, log, warn} = LogHelper.get('NextGame', LogHelper.COMPONENT_TYPE);
/*eslint-enable*/

class NextGame extends Component {

  render() {

    const game = gameStore.nextGame;
    log(...logName, game);

    return (
      <div className="next-game-container">
        <h2>Nästa match</h2>
        {game ? (
          <Game game={game}>
            <Moment fromNow
                    tz="Europe/Stockholm"
                    locale="sv"
                    className="next-game-in">
              {game.date}
            </Moment>

          </Game>
        ) : null}
      </div>
    );
  };

}

NextGame = observer(NextGame);
export default NextGame;