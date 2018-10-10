import React, {Component} from 'react';
import {observer} from 'mobx-react';
import './Table.css';
import tableStore from './Table.store';
import LogHelper from '../utils/LogHelper';

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
          <div className="row header">
            <div className="col header">Lag</div>
            <div className="col header">Spelade matcher</div>
            <div className="col header">Gjorda mål</div>
            <div className="col header">Insläppta mål</div>
            <div className="col header">Målskillnad</div>
            <div className="col header">Poäng</div>
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