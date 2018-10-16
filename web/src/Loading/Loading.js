import React, {Component} from 'react';
import './Loading.css';

class Loading extends Component {

  render() {
    return (
      <div className="loading-container">
        <div className="loading-background"></div>
        <div className="loading-text">
          Please wait while I discuss things with the SHL...
        </div>
      </div>
    );
  }
}

export default Loading;