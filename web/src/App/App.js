import React, {Component} from 'react';
import './App.css';
import Games from "../Game/Game-list";
import {observer} from 'mobx-react';

class App extends Component {

  render() {

    return (
      <div className="App">
        <header className="App-header">
          DERBYLIGAN
        </header>
        <div className="page">
          <Games/>
        </div>
      </div>
    );
  }
}

App = observer(App);
export default App;
