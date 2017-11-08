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
    delay: _propTypes2["default"].number
};

var defaultProps = {
    value: 0,
    step: 1,
    clsPrefix: 'u-input-number',
    iconStyle: 'double',
    autoWidth: false,
    delay: 300
};

var InputNumber = function (_Component) {
    _inherits(InputNumber, _Component);

    function InputNumber(props) {
        _classCallCheck(this, InputNumber);

        // 初始化状态，加减按钮是否可用，根据当前值判断
        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this.handleChange = function (value) {
            var onChange = _this.props.onChange;


            value = _this.detail(value, 0, 'reduce');

            _this.setState({ value: value });
            onChange && onChange(value);
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

        _this.minus = function () {
            var _this$props = _this.props,
                min = _this$props.min,
                step = _this$props.step,
                onChange = _this$props.onChange;

            var value = _this.detail(_this.state.value, step, 'reduce');
            if (typeof min === "undefined") {

                _this.setState({
                    value: value
                });
                onChange && onChange(value);
                if (_this.state.plusDisabled) {
                    _this.setState({ plusDisabled: false });
                }
                return;
            }
            if (value >= min) {
                _this.setState({ value: value });
                onChange && onChange(value);
                if (_this.state.plusDisabled) {
                    _this.setState({ plusDisabled: false });
                }
            }

            if (value <= min) {
                _this.setState({ minusDisabled: true });
            }
        };

        _this.plus = function () {
            var _this$props2 = _this.props,
                max = _this$props2.max,
                step = _this$props2.step,
                onChange = _this$props2.onChange;

            var value = _this.detail(_this.state.value, step, 'add');
            if (typeof max === "undefined") {
                _this.setState({ value: value });
                onChange && onChange(value);
                if (_this.state.minusDisabled) {
                    _this.setState({ minusDisabled: false });
                }
                return;
            }
            if (value <= max) {
                _this.setState({ value: value });
                onChange && onChange(value);
                if (_this.state.minusDisabled) {
                    _this.setState({ minusDisabled: false });
                }
            }

            if (value >= max) {
                _this.setState({ plusDisabled: true });
            }
        };

        _this.clear = function () {
            if (_this.timer) {
                clearTimeout(_this.timer);
            }
        };

        _this.handlePlusMouseDown = function (e) {
            var delay = _this.props.delay;

            _this.plus();
            _this.clear();
            _this.timer = setTimeout(function () {
                _this.handlePlusMouseDown();
            }, delay);
        };

        _this.handleReduceMouseDown = function (e) {
            var delay = _this.props.delay;

            _this.minus();
            _this.clear();
            _this.timer = setTimeout(function () {
                _this.handleReduceMouseDown();
            }, delay);
        };

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

        _this.state = {
            value: currentValue,
            minusDisabled: currentMinusDisabled,
            plusDisabled: currentPlusDisabled
        };

        _this.timer = null;
        return _this;
    }

    InputNumber.prototype.ComponentWillMount = function ComponentWillMount() {};

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
            clsPrefix = _props.clsPrefix,
            className = _props.className,
            delay = _props.delay,
            iconStyle = _props.iconStyle,
            autoWidth = _props.autoWidth,
            onChange = _props.onChange,
            format = _props.format,
            precision = _props.precision,
            others = _objectWithoutProperties(_props, ['max', 'min', 'step', 'clsPrefix', 'className', 'delay', 'iconStyle', 'autoWidth', 'onChange', 'format', 'precision']);

        var classes = (_classes = {}, _defineProperty(_classes, clsPrefix + '-auto', autoWidth), _defineProperty(_classes, '' + clsPrefix, true), _classes);

        var _state = this.state,
            value = _state.value,
            minusDisabled = _state.minusDisabled,
            plusDisabled = _state.plusDisabled;


        value = format ? format(value) : value;
        return _react2["default"].createElement(
            'div',
            null,
            iconStyle === 'double' ? _react2["default"].createElement(
                _beeInputGroup2["default"],
                { className: (0, _classnames2["default"])(className, classes) },
                _react2["default"].createElement(
                    _beeInputGroup2["default"].Addon,
                    {
                        className: minusDisabled && 'disabled',
                        onMouseDown: this.handleReduceMouseDown,
                        onMouseLeave: this.clear,
                        onMouseUp: this.clear },
                    '-'
                ),
                _react2["default"].createElement(_beeFormControl2["default"], _extends({}, others, {
                    value: value,
                    onChange: this.handleChange
                })),
                _react2["default"].createElement(
                    _beeInputGroup2["default"].Addon,
                    {
                        className: plusDisabled && 'disabled',
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
                                className: (0, _classnames2["default"])('plus', { 'disabled': plusDisabled }) },
                            _react2["default"].createElement('span', { className: 'uf uf-arrow-up' })
                        ),
                        _react2["default"].createElement(
                            'span',
                            {
                                onMouseDown: this.handleReduceMouseDown,
                                onMouseLeave: this.clear,
                                onMouseUp: this.clear,
                                className: (0, _classnames2["default"])("reduce", { 'disabled': minusDisabled }) },
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