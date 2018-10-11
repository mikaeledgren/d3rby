import React, {Component} from 'react';
import {observer} from 'mobx-react';
import './Table.css';
import tableStore from './Table.store';
import LogHelper from '../utils/LogHelper';
import ReactTooltip from 'react-tooltip';

/*eslint-disable*/
const {logName, log, error} = LogHelper.get('Table', LogHelper.COMPONENT_TYPE);
/*eslint-enable*/

class Table extends Component {

  render() {
    log(...logName, 'About to render table: ', tableStore.table);
    return (
      <div className="table-container">
        <h2>TABLE</h2>
        <div className="table">
          <div className="row row-header">
            <div className="col col-header team-name"><div>Lag</div></div>
            <div className="col col-header"><div>Spelade matcher</div></div>
            <div className="col col-header"><div>Gjorda mål</div></div>
            <div className="col col-header"><div>Insläppta mål</div></div>
            <div className="col col-header"><div>Målskillnad</div></div>
            <div className="col col-header"><div>Poäng</div></div>
            <ReactTooltip id="team-name"
                          effect="solid"
            >
              <span>Lag</span>
            </ReactTooltip>

          </div>
          {tableStore.table.map((entry, i) => {
            return (
              <div className="row" key={i}>
                <div className="col team-name">{entry.team.name}</div>
                <div className="col">{entry.gamesPlayed}</div>
                <div className="col">{entry.goalsScored}</div>
                <div className="col">{entry.goalsAgainst}</div>
                <div className="col">{entry.goalDifference}</div>
                <div className="col points">{entry.points}</div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

Table = observer(Table);
export default Table;