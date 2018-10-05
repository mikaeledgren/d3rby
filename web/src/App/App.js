import React, {Component} from 'react';
import logo from '../logo.svg';
import './App.css';
import shlService from "../ShlClient/Shl.service";

class App extends Component {

  componentDidMount() {
    shlService.init();
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <p>

          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
