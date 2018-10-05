import Constants from '../system/Constants';
import _ from 'lodash';
import tinycolor from 'tinycolor2';

const _loggers = new Map();


class LogHelper {

  static get debugMe(){
    return false;
  }

  static get LOG_LEVEL_DEBUG() {
    return 0;
  }

  static get LOG_LEVEL_INFO() {
    return 1;
  }

  static get LOG_LEVEL_WARN() {
    return 2;
  }

  static get LOG_LEVEL_ERROR() {
    return 3;
  }

  static get COMPONENT_TYPE() {
    return 'component';
  }

  static get STORE_TYPE() {
    return 'filterStore';
  }

  static get PAGE_TYPE() {
    return 'page';
  }

  static get SERVICE_TYPE() {
    return 'service';
  }

  static get SYSTEM_TYPE() {
    return 'system';
  }

  static get GENERAL_TYPE() {
    return 'general';
  }

  static get(name, type = LogHelper.GENERAL_TYPE) {

    if (!_loggers.get(name)) {
      _loggers.set(name, LogHelper.getNextColor());
    }

    const theName = '%c' + name;
    let theStyle = LogHelper.getStyle(name, type);

    const logName = [theName, theStyle];

    return {
      logName,
      theName,
      theStyle,
      debug: Constants.LOG_LEVEL <= LogHelper.LOG_LEVEL_DEBUG ? console.debug : () => {
      },
      log: Constants.LOG_LEVEL <= LogHelper.LOG_LEVEL_INFO ? console.log : () => {
      },
      warn: Constants.LOG_LEVEL <= LogHelper.LOG_LEVEL_WARN ? console.warn : () => {
      },
      error: Constants.LOG_LEVEL <= LogHelper.LOG_LEVEL_ERROR ? console.error : () => {
      },

    };
  }

  static getStyle(name, type) {
    const typeColor = type === LogHelper.SYSTEM_TYPE
      ? tinycolor('000000')
      : LogHelper.getColorByString(type);
    const nameColor = LogHelper.getColorByString(name);
    const color = tinycolor.mix(typeColor, nameColor, 40);

    let theStyle = '';
    theStyle += `font-weight: bold;`;
    theStyle += color.isDark() ? `color: #fff;` : `color: #000;`;
    theStyle += `background-color: #${color.toHex()};`;
    theStyle += `padding: 1px 4px;`;

    LogHelper.debugMe && console.debug('%c' + name, theStyle, 'was added for logging!');

    return theStyle;
  }


  static getColorByString = (string) => {

    const hashCode = (str) => { // java String#hashCode
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }
      return hash;
    };

    const i = hashCode(string);

    const c = (i & 0x00FFFFFF)
      .toString(16)
      .toUpperCase();

    const hex = "00000".substring(0, 6 - c.length) + c;
    return tinycolor(`${hex}`);
  };

  static getNextColor() {
    const a = _loggers.size % 3;
    const q = _.floor(_loggers.size / 3);
    const c = 150 - (20 * q);

    const r = a === 0 ? c : '0';
    const g = a === 1 ? c : '0';
    const b = a === 2 ? c : '0';

    return `rgb(${r},${g},${b})`;

  }
}

export default LogHelper;