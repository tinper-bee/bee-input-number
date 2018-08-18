'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _beeInputGroup = require('bee-input-group');

var _beeInputGroup2 = _interopRequireDefault(_beeInputGroup);

var _beeFormControl = require('bee-form-control');

var _beeFormControl2 = _interopRequireDefault(_beeFormControl);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var propTypes = {
    max: _propTypes2["default"].number,
    min: _propTypes2["default"].number,
    step: _propTypes2["default"].number,
    value: _propTypes2["default"].number,
    autoWidth: _propTypes2["default"].bool,
    precision: _propTypes2["default"].number,
    format: _propTypes2["default"].func,
    delay: _propTypes2["default"].number,
    disabled: _propTypes2["default"].bool
};

var defaultProps = {
    value: 0,
    step: 1,
    clsPrefix: 'u-input-number',
    iconStyle: 'double',
    autoWidth: false,
    delay: 300
};

function judgeValue(props) {
    var currentValue = void 0;
    var currentMinusDisabled = false;
    var currentPlusDisabled = false;

    if (props.value) {
        currentValue = Number(props.value) || 0;
    } else if (props.min) {
        currentValue = props.min;
    } else {
        currentValue = 0;
    }
    if (currentValue <= props.min) {
        currentMinusDisabled = true;
    }
    if (currentValue >= props.max) {
        currentPlusDisabled = true;
    }

    if (props.hasOwnProperty('precision')) {
        currentValue = currentValue.toFixed(props.precision);
    }

    return {
        value: currentValue,
        minusDisabled: currentMinusDisabled,
        plusDisabled: currentPlusDisabled
    };
}

var InputNumber = function (_Component) {
    _inherits(InputNumber, _Component);

    function InputNumber(props) {
        _classCallCheck(this, InputNumber);

        // 初始化状态，加减按钮是否可用，根据当前值判断

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this.handleChange = function (value) {
            var _this$props = _this.props,
                onChange = _this$props.onChange,
                min = _this$props.min,
                max = _this$props.max;

            //value = this.detail(value, 0, 'reduce');

            if (!isNaN(value) && value >= min && value <= max) {
                _this.tempStorage = value;
            }
            _this.setState({ value: value });
            onChange && onChange(value);
        };

        _this.handleFocus = function (e) {
            var _this$props2 = _this.props,
                onFocus = _this$props2.onFocus,
                min = _this$props2.min,
                max = _this$props2.max;

            var value = e.target.value;
            if (!isNaN(value) && value >= min && value <= max) {
                _this.tempStorage = e.target.value;
            }
            onFocus && onFocus();
        };

        _this.handleBlur = function (e) {
            var _this$props3 = _this.props,
                onBlur = _this$props3.onBlur,
                step = _this$props3.step;

            var value = Number(e.target.value);
            if (isNaN(value)) {
                value = _this.tempStorage;
                _this.setState({
                    value: value
                });
                _this.detailDisable(value);
            } else {
                console.log(value - step);
                _this.plus(value - step);
            }

            onBlur && onBlur();
        };

        _this.detail = function (value, step, type) {
            var precision = _this.props.precision;


            var valueFloat = _this.separate(value);
            var stepFloat = _this.separate(step);

            var ans = void 0;
            var stepFloatLength = stepFloat.toString().length;
            var valueFloatLength = valueFloat.toString().length;

            if (typeof precision === 'undefined') {
                precision = Math.max(stepFloatLength, valueFloatLength);
            }
            var coefficient = Math.pow(10, Math.abs(stepFloatLength - valueFloatLength));
            if (type === 'add') {
                ans = (value * coefficient + step * coefficient) / coefficient;
            } else {
                ans = (value * coefficient - step * coefficient) / coefficient;
            }

            return ans.toFixed(precision);
        };

        _this.separate = function (value) {
            value = value.toString();
            if (value.indexOf('.') > -1) {
                return value.split('.')[1];
            } else {
                return "";
            }
        };

        _this.minus = function (value) {
            var _this$props4 = _this.props,
                min = _this$props4.min,
                max = _this$props4.max,
                step = _this$props4.step,
                onChange = _this$props4.onChange;


            if (typeof min === "undefined") {
                value = _this.detail(value, step, 'reduce');
            } else {
                if (value < min) {
                    value = min;
                } else {
                    var reducedValue = _this.detail(value, step, 'reduce');
                    if (reducedValue >= min) {
                        value = reducedValue;
                    }
                }
            }

            if (value > max) {
                value = max;
            }

            _this.setState({
                value: value
            });
            onChange && onChange(value);
            _this.detailDisable(value);
        };

        _this.detailDisable = function (value) {
            var _this$props5 = _this.props,
                max = _this$props5.max,
                min = _this$props5.min,
                step = _this$props5.step;


            if (value >= max || Number(value) + Number(step) > max) {
                _this.setState({
                    plusDisabled: true
                });
            } else {
                _this.setState({
                    plusDisabled: false
                });
            }
            if (value <= min || value - step < min) {
                _this.setState({
                    minusDisabled: true
                });
            } else {
                _this.setState({
                    minusDisabled: false
                });
            }
        };

        _this.plus = function (value) {
            var _this$props6 = _this.props,
                max = _this$props6.max,
                min = _this$props6.min,
                step = _this$props6.step,
                onChange = _this$props6.onChange;

            if (typeof max === "undefined") {
                value = _this.detail(value, step, 'add');
            } else {
                if (value > max) {
                    value = max;
                } else {
                    var addedValue = _this.detail(value, step, 'add');
                    if (addedValue <= max) {
                        value = addedValue;
                    }
                }
            }
            if (value < min) {
                value = min;
            }
            _this.setState({
                value: value
            });
            onChange && onChange(value);
            _this.detailDisable(value);
        };

        _this.clear = function () {
            if (_this.timer) {
                clearTimeout(_this.timer);
            }
        };

        _this.handlePlusMouseDown = function (e) {
            var _this$props7 = _this.props,
                delay = _this$props7.delay,
                disabled = _this$props7.disabled;

            if (disabled) return;
            var value = _this.state.value;

            _this.plus(value);
            _this.clear();
            _this.timer = setTimeout(function () {
                _this.handlePlusMouseDown();
            }, delay);
        };

        _this.handleReduceMouseDown = function (e) {
            var delay = _this.props.delay;
            var value = _this.state.value;

            _this.minus(value);
            _this.clear();
            _this.timer = setTimeout(function () {
                _this.handleReduceMouseDown();
            }, delay);
        };

        var data = judgeValue(props);

        _this.state = {
            value: data.value,
            minusDisabled: data.minusDisabled,
            plusDisabled: data.plusDisabled
        };

        _this.timer = null;
        _this.tempStorage = data.value;
        return _this;
    }

    InputNumber.prototype.ComponentWillMount = function ComponentWillMount() {};

    InputNumber.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        var data = judgeValue(nextProps);
        this.setState({
            value: data.value,
            minusDisabled: data.minusDisabled,
            plusDisabled: data.plusDisabled
        });
        this.tempStorage = data.value;
    };

    InputNumber.prototype.ComponentWillUnMount = function ComponentWillUnMount() {
        this.clear();
    };

    /**
     * 分离小数和整数
     * @param value
     * @returns {*}
     */


    InputNumber.prototype.render = function render() {
        var _classes;

        var _props = this.props,
            max = _props.max,
            min = _props.min,
            step = _props.step,
            disabled = _props.disabled,
            clsPrefix = _props.clsPrefix,
            className = _props.className,
            disabled = _props.disabled,
            delay = _props.delay,
            onBlur = _props.onBlur,
            onFocus = _props.onFocus,
            iconStyle = _props.iconStyle,
            autoWidth = _props.autoWidth,
            onChange = _props.onChange,
            format = _props.format,
            precision = _props.precision,
<<<<<<< HEAD
            others = _objectWithoutProperties(_props, ['max', 'min', 'step', 'disabled', 'clsPrefix', 'className', 'delay', 'onBlur', 'onFocus', 'iconStyle', 'autoWidth', 'onChange', 'format', 'precision']);
=======
            others = _objectWithoutProperties(_props, ['max', 'min', 'step', 'clsPrefix', 'className', 'disabled', 'delay', 'onBlur', 'onFocus', 'iconStyle', 'autoWidth', 'onChange', 'format', 'precision']);
>>>>>>> e124e5b8fa8698f0b23a30d0b4fdfb0c0d5d5eb6

        var classes = (_classes = {}, _defineProperty(_classes, clsPrefix + '-auto', autoWidth), _defineProperty(_classes, '' + clsPrefix, true), _classes);

        var _state = this.state,
            value = _state.value,
            minusDisabled = _state.minusDisabled,
            plusDisabled = _state.plusDisabled;


        value = format ? format(value) : value;
<<<<<<< HEAD

        var disabledCursor = disabled ? ' disabled-cursor' : '';
=======
        var _class = disabled ? 'disabled' : plusDisabled && 'disabled';
>>>>>>> e124e5b8fa8698f0b23a30d0b4fdfb0c0d5d5eb6

        return _react2["default"].createElement(
            'div',
            null,
            iconStyle === 'double' ? _react2["default"].createElement(
                _beeInputGroup2["default"],
                { className: (0, _classnames2["default"])(className, classes) },
                _react2["default"].createElement(
                    _beeInputGroup2["default"].Addon,
                    {
<<<<<<< HEAD
                        className: (minusDisabled && 'disabled') + disabledCursor,
=======
                        // className={plusDisabled && 'disabled'}
                        className: _class,
>>>>>>> e124e5b8fa8698f0b23a30d0b4fdfb0c0d5d5eb6
                        onMouseDown: this.handleReduceMouseDown,
                        onMouseLeave: this.clear,
                        onMouseUp: this.clear },
                    '-'
                ),
                _react2["default"].createElement(_beeFormControl2["default"], _extends({}, others, {
                    disabled: true,
                    value: value,
                    disabled: disabled,
                    onBlur: this.handleBlur,
                    onFocus: this.handleFocus,
                    onChange: this.handleChange
                })),
                _react2["default"].createElement(
                    _beeInputGroup2["default"].Addon,
                    {
<<<<<<< HEAD
                        className: (plusDisabled && 'disabled') + disabledCursor,
=======
                        // className={plusDisabled && 'disabled'}
                        className: _class,
>>>>>>> e124e5b8fa8698f0b23a30d0b4fdfb0c0d5d5eb6
                        onMouseDown: this.handlePlusMouseDown,
                        onMouseLeave: this.clear,
                        onMouseUp: this.clear },
                    '+'
                )
            ) : _react2["default"].createElement(
                _beeInputGroup2["default"],
                {
                    className: (0, _classnames2["default"])(className, classes),
                    simple: true
                },
                _react2["default"].createElement(_beeFormControl2["default"], _extends({}, others, {
                    value: value,
                    disabled: disabled,
                    onBlur: this.handleBlur,
                    onFocus: this.handleFocus,
                    onChange: this.handleChange
                })),
                _react2["default"].createElement(
                    _beeInputGroup2["default"].Button,
                    null,
                    _react2["default"].createElement(
                        'div',
                        { className: 'icon-group' },
                        _react2["default"].createElement(
                            'span',
                            {
                                onMouseDown: this.handlePlusMouseDown,
                                onMouseLeave: this.clear,
                                onMouseUp: this.clear,
                                className: (0, _classnames2["default"])('plus', { 'disabled': plusDisabled, 'disabled-cursor': disabledCursor }) },
                            _react2["default"].createElement('span', { className: 'uf uf-arrow-up' })
                        ),
                        _react2["default"].createElement(
                            'span',
                            {
                                onMouseDown: this.handleReduceMouseDown,
                                onMouseLeave: this.clear,
                                onMouseUp: this.clear,
                                className: (0, _classnames2["default"])("reduce", { 'disabled': minusDisabled, 'disabled-cursor': disabledCursor }) },
                            _react2["default"].createElement('span', { className: ' uf uf-arrow-down' })
                        )
                    )
                )
            )
        );
    };

    return InputNumber;
}(_react.Component);

;

InputNumber.defaultProps = defaultProps;
InputNumber.propTypes = propTypes;
exports["default"] = InputNumber;
module.exports = exports['default'];