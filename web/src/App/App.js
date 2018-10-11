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
      <div className="page">

        <header className="page-header">
          <h1>Derbyligan</h1>
        </header>

        <div className="page-content">
          <Table/>
          <GameList/>
        </div>

      </div>
    );
  }
}

App = observer(App);
export default App;
