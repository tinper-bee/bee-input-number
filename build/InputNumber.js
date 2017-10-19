'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

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
    autoWidth: _propTypes2["default"].bool
};
var defaultProps = {
    value: 0,
    step: 1,
    clsPrefix: 'u-input-number',
    iconStyle: 'double',
    autoWidth: false
};

var InputNumber = function (_Component) {
    _inherits(InputNumber, _Component);

    function InputNumber(props) {
        _classCallCheck(this, InputNumber);

        // 初始化状态，加减按钮是否可用，根据当前值判断
        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        var currentValue = void 0;
        var currentMinusDisabled = false;
        var currentPlusDisabled = false;
        if (_this.props.value) {
            currentValue = Number(_this.props.value) || 0;
        } else if (_this.props.min) {
            currentValue = _this.props.min;
        } else {
            currentValue = 0;
        }
        if (currentValue <= _this.props.min) {
            currentMinusDisabled = true;
        }
        if (currentValue >= _this.props.max) {
            currentPlusDisabled = true;
        }

        _this.state = {
            value: currentValue,
            minusDisabled: currentMinusDisabled,
            plusDisabled: currentPlusDisabled
        };
        _this.plus = _this.plus.bind(_this);
        _this.minus = _this.minus.bind(_this);
        _this.handleChange = _this.handleChange.bind(_this);
        return _this;
    }

    InputNumber.prototype.ComponentWillMount = function ComponentWillMount() {
        console.log('ComponentWillMount' + this.props.min);
    };

    InputNumber.prototype.handleChange = function handleChange(event) {
        var onChange = this.props.onChange;


        this.setState({ value: Number(event.target.value) });
        onChange && onChange(Number(event.target.value));
    };

    InputNumber.prototype.minus = function minus(e) {
        var _props = this.props,
            min = _props.min,
            step = _props.step,
            onChange = _props.onChange;

        if (!min) {
            this.setState({ value: this.state.value - step });
            onChange && onChange(this.state.value - step);
            if (this.state.plusDisabled) {
                this.setState({ plusDisabled: false });
            }
            return;
        }
        if (this.state.value - step >= min) {
            this.setState({ value: this.state.value - step });
            onChange && onChange(this.state.value - step);
            if (this.state.plusDisabled) {
                this.setState({ plusDisabled: false });
            }
        } else {
            this.setState({ minusDisabled: true });
        }
    };

    InputNumber.prototype.plus = function plus(e) {
        var _props2 = this.props,
            max = _props2.max,
            step = _props2.step,
            onChange = _props2.onChange;

        if (!max) {
            this.setState({ value: this.state.value + step });

            onChange && onChange(this.state.value + step);
            if (this.state.minusDisabled) {
                this.setState({ minusDisabled: false });
            }
            return;
        }
        if (this.state.value + step <= max) {
            this.setState({ value: this.state.value + step });
            onChange && onChange(this.state.value + step);
            if (this.state.minusDisabled) {
                this.setState({ minusDisabled: false });
            }
        } else {
            this.setState({ plusDisabled: true });
        }
    };

    InputNumber.prototype.render = function render() {
        var _classes;

        var _props3 = this.props,
            max = _props3.max,
            min = _props3.min,
            step = _props3.step,
            clsPrefix = _props3.clsPrefix,
            className = _props3.className,
            iconStyle = _props3.iconStyle,
            autoWidth = _props3.autoWidth,
            onChange = _props3.onChange,
            others = _objectWithoutProperties(_props3, ['max', 'min', 'step', 'clsPrefix', 'className', 'iconStyle', 'autoWidth', 'onChange']);

        var classes = (_classes = {}, _defineProperty(_classes, clsPrefix + '-auto', autoWidth), _defineProperty(_classes, '' + clsPrefix, true), _classes);

        return _react2["default"].createElement(
            'div',
            null,
            iconStyle == 'double' ? _react2["default"].createElement(
                _beeInputGroup2["default"],
                _extends({ className: (0, _classnames2["default"])(className, classes) }, others),
                _react2["default"].createElement(
                    _beeInputGroup2["default"].Addon,
                    { className: this.state.minusDisabled && 'disabled', onClick: this.minus },
                    '-'
                ),
                _react2["default"].createElement(_beeFormControl2["default"], { value: this.state.value, onChange: this.handleChange }),
                _react2["default"].createElement(
                    _beeInputGroup2["default"].Addon,
                    { className: this.state.plusDisabled && 'disabled', onClick: this.plus },
                    '+'
                )
            ) : _react2["default"].createElement(
                _beeInputGroup2["default"],
                _extends({ className: (0, _classnames2["default"])(className, classes), simple: true }, others),
                _react2["default"].createElement(_beeFormControl2["default"], { value: this.state.value, onChange: this.handleChange }),
                _react2["default"].createElement(
                    _beeInputGroup2["default"].Button,
                    null,
                    _react2["default"].createElement(
                        'div',
                        { className: 'icon-group' },
                        _react2["default"].createElement(
                            'span',
                            { onClick: this.plus, className: 'plus' },
                            _react2["default"].createElement('span', { className: 'uf uf-arrow-up' })
                        ),
                        _react2["default"].createElement(
                            'span',
                            { onClick: this.minus, className: 'reduce' },
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