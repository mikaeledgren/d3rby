import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  state = {shlToken: null};

  componentDidMount(){
    this.getShlToken();
  }

  getShlToken = async () => {
    let response = await fetch('/api/shl/token');
    response = await response.json();
    this.setState({shlToken: response.token});
    console.log(response, response.token);
    const headers = {'Authorization': `Bearer ${response.token.access_token}`};
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    fetch(proxyurl + 'https://openapi.shl.se/seasons/2018/games', {headers,})
  };

  render() {

    const token = this.state.token;
    console.log(token);
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
