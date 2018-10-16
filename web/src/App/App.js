import React, {Component} from 'react';
import './App.css';
import appService from './App.service';
import Games from "../Games/Games";
import {observer} from 'mobx-react';
import Table from "../Table/Table";
import NextGame from "../NextGame/NextGame";
import Loading from "../Loading/Loading";
import gameStore from '../Game/Game.store';
import Nothing from "../Nothing/Nothing";
import TripDestination from "../TripDestination/TripDestination";

class App extends Component {

  componentDidMount() {
    appService.load();
  }

  render() {

    return (
      <div className="page">
        {gameStore.isEmpty && !gameStore.loading ?
          <div className="page-content">
            <Nothing/>
          </div>
          :
          (gameStore.loading ?
              <div className="page-content">
                <Loading/>
              </div>
              :
              <div className="page-content">
                <TripDestination/>
                <Table/>
                <NextGame/>
                <Games/>
              </div>
          )
        }
      </div>
    );
  }
}

App = observer(App);
export default App;
