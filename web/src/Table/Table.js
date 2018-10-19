import React, {Component} from 'react';
import {observer} from 'mobx-react';
import './Table.css';
import tableStore from './Table.store';
import LogHelper from '../LogHelper/LogHelper';
import Div from "../Div/Div";

/*eslint-disable*/
const {logName, log, error} = LogHelper.get('Table', LogHelper.COMPONENT_TYPE);
/*eslint-enable*/

class Table extends Component {

  render() {
    return (
      <div className="table-container">
        <div className="table">
          <div className="row row-header">
            <div className="col col-header team-name"></div>
            <Div className="col col-header" tooltip="Spelade matcher">SM</Div>
            <Div className="col col-header" tooltip="Gjorda mål">GM</Div>
            <Div className="col col-header" tooltip="Insläppta mål">IM</Div>
            <Div className="col col-header" tooltip="Målskillnad">MS</Div>
            <Div className="col col-header" tooltip="Poäng">P&nbsp;</Div>
          </div>
          {tableStore.table.map((entry, i) => {

            const rowClasses = `row ${i === 0 ? 'leader' : ''}`;

            return (
              <div className={rowClasses} key={i}>
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