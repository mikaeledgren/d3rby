import React, {Component} from 'react';
import './App.css';
import Games from "../Games/Games";
import {observer} from 'mobx-react';
import Table from "../Table/Table";
import teamService from '../Team/Team.service';
import gameService from '../Game/Game.service';
import NextGame from "../NextGame/NextGame";
import Loading from "../Loading/Loading";
import gameStore from '../Game/Game.store';
import Nothing from "../Nothing/Nothing";

class App extends Component {

  componentDidMount() {
    teamService.load();
    gameService.load();
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
