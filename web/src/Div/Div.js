import React, {Component} from 'react';
import PropTypes from 'prop-types';
import LogHelper from '../utils/LogHelper';
import './Div.css';
import Tooltip from '@material-ui/core/Tooltip'

/*eslint-disable*/
const {logName, log, error} = LogHelper.get('Div', LogHelper.COMPONENT_TYPE);
/*eslint-enable*/

class Div extends Component {

  render() {

    const {props} = this;
    const {tooltip, children, ...rest} = props;

    return (
      <div {...rest}>

        {tooltip ? (
          <Tooltip placement="top" title={tooltip}>
            <div>{children}</div>
          </Tooltip>
        ) :
          children
        }
      </div>
    );
  }
}

Div.propTypes = {
  tooltip: PropTypes.string,
};

export default Div;