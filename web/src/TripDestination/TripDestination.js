import React, {Component} from 'react';
import FlightTakeOff from '@material-ui/icons/FlightTakeoff'
import gameStore from '../Game/Game.store';
import tableStore from '../Table/Table.store';
import {observer} from 'mobx-react';
import './TripDestination.css';

class TripDestination extends Component {

  render() {
    return (
      <div className="trip-destination-container">
        <FlightTakeOff className="trip-destination-icon"/>
        <div className="trip-destination-text">
          {tableStore.leaderTeam ?
            `${tableStore.leaderTeam.city} ${gameStore.areAllGamesPlayed ? '' : '?'}`
            : 'Vart ska vi åka?'}
        </div>
      </div>
    );
  }
}

TripDestination = observer(TripDestination);

export default TripDestination;