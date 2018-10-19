import React, {Component} from 'react';

class ErrorHandler extends Component {

  constructor(props) {
    super(props);
    this.state = {error: null};
  }

  componentDidCatch(error, info) {

    this.setState({error})
  }

  render() {

    if (this.state.error) {

      return <h1>Ooops</h1>;

    } else {

      return this.props.children;
    }
  }

}

export default ErrorHandler;