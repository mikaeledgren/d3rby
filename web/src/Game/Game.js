import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import 'moment-timezone';
import 'moment/locale/sv'
import './Game.css';

class Game extends Component {

  render() {

    const {game, children} = this.props;
    const homeTeamWinnerClassName = game.homeScore > game.awayScore ? 'winner' : (game.played ? 'loser' : '');
    const awayTeamWinnerClassName = game.awayScore > game.homeScore ? 'winner' : (game.played ? 'loser' : '');
    const homeScoreClasses = `score home-score ${homeTeamWinnerClassName}`;
    const awayScoreClasses = `score away-score ${awayTeamWinnerClassName}`;
    const homeTeamClasses = `team home-team ${homeTeamWinnerClassName}`;
    const awayTeamClasses = `team away-team ${awayTeamWinnerClassName}`;

    return (
      <div className="game-container">
        <div className="date">
          <Moment format="D"
                  tz="Europe/Stockholm"
                  locale="sv"
                  className="day">
            {game.date}
          </Moment>
          <Moment format="MMM"
                  tz="Europe/Stockholm"
                  locale="sv"
                  className="month">
            {game.date}
          </Moment>
        </div>
        <div className="game">
          <div className="game-main">
            <div className={homeTeamClasses}>{game.homeTeam.name}</div>
            <div className="result">
              <div className="scores">
                <div className={homeScoreClasses}>{game.played ? game.homeScore : null}</div>
                <div className="score-separator">-</div>
                <div className={awayScoreClasses}>{game.played ? game.awayScore : null}</div>
              </div>
            </div>
            <div className={awayTeamClasses}>
              {game.awayTeam.name}
            </div>
          </div>
          <div className="game-meta">
            {game.overtime ? (
              <div className="overtime">(På övertid)</div>
            ) : null}
            {game.penaltyShots ? (
              <div className="penalty-shots">(På straffar)</div>
            ) : null}
            <div className="game-extra">
              {children}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Game.propTypes = {
  game: PropTypes.object,
};

export default Game;