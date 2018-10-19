import React, {Component} from 'react';
import PropTypes from 'prop-types';
import LogHelper from '../LogHelper/LogHelper';
import './Div.css';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';

/*eslint-disable*/
const {logName, log, error} = LogHelper.get('Div', LogHelper.COMPONENT_TYPE);
/*eslint-enable*/

class Div extends Component {

  render() {

    const {props} = this;
    const {tooltip, children, ...rest} = props;
    const tooltipClasses = {
      tooltip: 'tooltip',
    };
    return (
      <div {...rest}>

        {tooltip ? (
          <Tooltip placement="top"
                   TransitionComponent={Zoom}
                   enterTouchDelay={100}
                   leaveTouchDelay={1000}
                   leaveDelay={500}
                   title={tooltip} classes={tooltipClasses}>
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