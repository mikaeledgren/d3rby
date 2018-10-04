import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  state = {persons: {}};

  componentDidMount(){
    this.getShlToken();
  }

  getShlToken = async () => {
    let response = await fetch('/api/shl/token');
    response = await response.json();
    this.setState({persons: response});
  };

  render() {

    const persons = this.state.persons;
    console.log(persons);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <p>
            {persons ? persons.nisse : 'nej'}
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
