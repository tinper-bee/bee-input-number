import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
const propTypes = {
    focusOnUpDown: PropTypes.bool,
    onChange: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyUp: PropTypes.func,
    prefixCls: PropTypes.string,
    disabled: PropTypes.bool,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    readOnly: PropTypes.bool,
    max: PropTypes.number,
    min: PropTypes.number,
    step: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
};
const defaultProps = {
    focusOnUpDown: true,
    prefixCls: 'rc-input-number',
    max: Infinity,
    min: -Infinity,
    step: 1,
    style: {},
    defaultValue: '',
    onChange: noop,
    onKeyDown: noop,
    onFocus: noop,
    onBlur: noop,
};

/**
 * When click and hold on a button - the speed of auto changin the value.
 */
const SPEED = 50;

/**
 * When click and hold on a button - the delay before auto changin the value.
 */
const DELAY = 600;

function noop() {
}

function preventDefault(e) {
  e.preventDefault();
}


class InputNumber extends Component{
    constructor(props){
        super(props);
        let value;
           if ('value' in props) {
             value = props.value;
           } else {
             value = props.defaultValue;
           }
         value = this.toNumber(value);
        this.state = {
            inputValue: this.toPrecisionAsStep(value),
            value,
            focused: props.autoFocus,
        };
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
        this.getValueFromEvent = this.getValueFromEvent.bind(this);
        this.focus = this.focus.bind(this);
    }

  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    if (this.props.focusOnUpDown &&
      this.state.focused &&
      document.activeElement !== this.refs.input) {
      this.focus();
    }
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      const value = this.toNumber(nextProps.value);
      this.setState({
        inputValue: nextProps.value,
        value,
      });
    }
  }

  componentWillUnmount() {
    this.stop();
  }

  onChange(e) {
    const input = this.getValueFromEvent(e).trim();
    this.setState({ inputValue: input });
    this.props.onChange(this.toNumber(input)); // valid number or invalid string
  }

  onFocus(...args) {
    this.setState({
      focused: true,
    });
    this.props.onFocus(...args);
  }

  onBlur(e, ...args) {
    this.setState({
      focused: false,
    });
    const value = this.getCurrentValidValue(this.getValueFromEvent(e).trim());
    this.setValue(value, () => {
      this.props.onBlur(e, ...args);
    });
  }

  getCurrentValidValue(value) {
    let val = value;
    const props = this.props;
    if (val === '') {
      val = '';
    } else if (!this.isNotCompleteNumber(val)) {
      val = Number(val);
      if (val < props.min) {
        val = props.min;
      }
      if (val > props.max) {
        val = props.max;
      }
    } else {
      val = this.state.value;
    }
    return this.toNumber(val);
  }

  setValue(v, callback) {
    // trigger onChange
    const newValue = this.isNotCompleteNumber(parseFloat(v, 10)) ? undefined : parseFloat(v, 10);
    const changed = newValue !== this.state.value;
    if (!('value' in this.props)) {
      this.setState({
        value: v,
        inputValue: this.toPrecisionAsStep(v),
      }, callback);
    } else {
      // always set input value same as value
      this.setState({
        inputValue: this.toPrecisionAsStep(this.state.value),
      }, callback);
    }
    if (changed) {
      this.props.onChange(newValue);
    }
  }

  getPrecision(value) {
    const valueString = value.toString();
    if (valueString.indexOf('e-') >= 0) {
      return parseInt(valueString.slice(valueString.indexOf('e-') + 1), 10);
    }
    let precision = 0;
    if (valueString.indexOf('.') >= 0) {
      precision = valueString.length - valueString.indexOf('.') - 1;
    }
    return precision;
  }

  // step={1.0} value={1.51}
  // press +
  // then value should be 2.51, rather than 2.5
  // https://github.com/react-component/input-number/issues/39
  getMaxPrecision(currentValue) {
    const { step } = this.props;
    const stepPrecision = this.getPrecision(step);
    if (!currentValue) {
      return stepPrecision;
    }
    const currentValuePrecision = this.getPrecision(currentValue);
    return currentValuePrecision > stepPrecision ? currentValuePrecision : stepPrecision;
  }

  getPrecisionFactor(currentValue) {
    const precision = this.getMaxPrecision(currentValue);
    return Math.pow(10, precision);
  }

  toPrecisionAsStep(num) {
    if (this.isNotCompleteNumber(num) || num === '') {
      return num;
    }
    const precision = Math.abs(this.getMaxPrecision(num));
    if (precision) {
      return Number(num).toFixed(precision);
    }
    return num.toString();
  }

  // '1.' '1x' 'xx' ''  => are not complete numbers
  isNotCompleteNumber(num) {
    return (
      isNaN(num) ||
      num === '' ||
      num.toString().indexOf('.') === num.toString().length - 1
    );
  }

  toNumber(num) {
    if (this.isNotCompleteNumber(num)) {
      return num;
    }
    return Number(num);
  }

  upStep(val) {
    const { step, min } = this.props;
    const precisionFactor = this.getPrecisionFactor(val);
    const precision = Math.abs(this.getMaxPrecision(val));
    let result;
    if (typeof val === 'number') {
      result =
        ((precisionFactor * val + precisionFactor * step) / precisionFactor).toFixed(precision);
    } else {
      result = min === -Infinity ? step : min;
    }
    return this.toNumber(result);
  }

  downStep(val) {
    const { step, min } = this.props;
    const precisionFactor = this.getPrecisionFactor(val);
    const precision = Math.abs(this.getMaxPrecision(val));
    let result;
    if (typeof val === 'number') {
      result =
        ((precisionFactor * val - precisionFactor * step) / precisionFactor).toFixed(precision);
    } else {
      result = min === -Infinity ? -step : min;
    }
    return this.toNumber(result);
  }

  step(type, e) {
    if (e) {
      e.preventDefault();
    }
    const props = this.props;
    if (props.disabled) {
      return;
    }
    const value = this.getCurrentValidValue(this.state.inputValue);
    if (this.isNotCompleteNumber(value)) {
      return;
    }
    const val = this[`${type}Step`](value);
    if (val > props.max || val < props.min) {
      return;
    }
    this.setValue(val);
    this.setState({
      focused: true,
    });
  }

  stop() {
    if (this.autoStepTimer) {
      clearTimeout(this.autoStepTimer);
    }
  }

  down(e, recursive) {
    if (e.persist) {
      e.persist();
    }
    this.stop();
    this.step('down', e);
    this.autoStepTimer = setTimeout(() => {
      this.down(e, true);
    }, recursive ? SPEED : DELAY);
  }

  up(e, recursive) {
    if (e.persist) {
      e.persist();
    }
    this.stop();
    this.step('up', e);
    this.autoStepTimer = setTimeout(() => {
      this.up(e, true);
    }, recursive ? SPEED : DELAY);
  }

  onKeyDown(e, ...args) {
    if (e.keyCode === 38) {
      this.up(e);
    } else if (e.keyCode === 40) {
      this.down(e);
    }
    const { onKeyDown } = this.props;
    if (onKeyDown) {
      onKeyDown(e, ...args);
    }
  }

  onKeyUp(e, ...args) {
    this.stop();
    const { onKeyUp } = this.props;
    if (onKeyUp) {
      onKeyUp(e, ...args);
    }
  }

  getValueFromEvent(e) {
    return e.target.value;
  }

  focus() {
    this.refs.input.focus();
  }

  render() {
    const props = { ...this.props };
    const { prefixCls, disabled, readOnly } = props;
    const classes = classNames({
      [prefixCls]: true,
      [props.className]: !!props.className,
      [`${prefixCls}-disabled`]: disabled,
      [`${prefixCls}-focused`]: this.state.focused,
    });
    let upDisabledClass = '';
    let downDisabledClass = '';
    const value = this.state.value;
    if (!isNaN(value)) {
      const val = Number(value);
      if (val >= props.max) {
        upDisabledClass = `${prefixCls}-handler-up-disabled`;
      }
      if (val <= props.min) {
        downDisabledClass = `${prefixCls}-handler-down-disabled`;
      }
    } else {
      upDisabledClass = `${prefixCls}-handler-up-disabled`;
      downDisabledClass = `${prefixCls}-handler-down-disabled`;
    }

    const editable = !props.readOnly && !props.disabled;

    // focus state, show input value
    // unfocus state, show valid value
    let inputDisplayValue;
    if (this.state.focused) {
      inputDisplayValue = this.state.inputValue;
    } else {
      inputDisplayValue = this.toPrecisionAsStep(this.state.value);
    }

    if (inputDisplayValue === undefined) {
      inputDisplayValue = '';
    }

    // ref for test
    return (
      <div className={classes} style={props.style}>
        <div className={`${prefixCls}-handler-wrap`}>
          <InputHandler
            ref="up"
            disabled={!!upDisabledClass || disabled || readOnly}
            prefixCls={prefixCls}
            unselectable="unselectable"
            onTouchStart={(editable && !upDisabledClass) ? this.up : noop}
            onTouchEnd={this.stop}
            onMouseDown={(editable && !upDisabledClass) ? this.up : noop}
            onMouseUp={this.stop}
            onMouseLeave={this.stop}
            className={`${prefixCls}-handler ${prefixCls}-handler-up ${upDisabledClass}`}
          >
            <span
              unselectable="unselectable"
              className={`${prefixCls}-handler-up-inner`}
              onClick={preventDefault}
            />
          </InputHandler>
          <InputHandler
            ref="down"
            disabled={!!downDisabledClass || disabled || readOnly}
            prefixCls={prefixCls}
            unselectable="unselectable"
            onTouchStart={(editable && !downDisabledClass) ? this.down : noop}
            onTouchEnd={this.stop}
            onMouseDown={(editable && !downDisabledClass) ? this.down : noop}
            onMouseUp={this.stop}
            onMouseLeave={this.stop}
            className={`${prefixCls}-handler ${prefixCls}-handler-down ${downDisabledClass}`}
          >
            <span
              unselectable="unselectable"
              className={`${prefixCls}-handler-down-inner`}
              onClick={preventDefault}
            />
          </InputHandler>
        </div>
        <div className={`${prefixCls}-input-wrap`}>
          <input
            type={props.type}
            placeholder={props.placeholder}
            onClick={props.onClick}
            className={`${prefixCls}-input`}
            autoComplete="off"
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onKeyDown={this.onKeyDown}
            onKeyUp={this.onKeyUp}
            autoFocus={props.autoFocus}
            readOnly={props.readOnly}
            disabled={props.disabled}
            max={props.max}
            min={props.min}
            name={props.name}
            onChange={this.onChange}
            ref="input"
            value={inputDisplayValue}
          />
        </div>
      </div>
    );
  },
};


InputNumber.propTypes = propTypes;
InputNumber.defaultProps = defaultProps;
export default InputNumber;
