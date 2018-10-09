import React, {Component} from 'react';
import './App.css';
import GameList from "../Game/Game-list";
import {observer} from 'mobx-react';
import Table from "../Table/Table";
import teamService from '../Team/Team.service';

class App extends Component {

  componentDidMount(){
    teamService.load();
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          DERBYLIGAN
        </header>
        <div className="page">
          <Table/>
          <GameList/>
        </div>
      </div>
    );
  }
}

App = observer(App);
export default App;
