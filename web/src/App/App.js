import React, {Component} from 'react';
import './App.css';
import Games from "../Games/Games";
import {observer} from 'mobx-react';
import Table from "../Table/Table";
import teamService from '../Team/Team.service';
import gameService from '../Game/Game.service';
import NextGame from "../NextGame/NextGame";

class App extends Component {

  componentDidMount(){
    teamService.load();
    gameService.load();
  }

  render() {

    return (
      <div className="page">

{/*
        <header className="page-header">
          <h1>Derbyligan</h1>
        </header>
*/}

        <div className="page-content">
          <Table/>
          <NextGame/>
          <Games/>
        </div>

      </div>
    );
  }
}

App = observer(App);
export default App;
