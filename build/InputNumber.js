'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var propTypes = {
    max: _react.PropTypes.number,
    min: _react.PropTypes.number,
    step: _react.PropTypes.number,
    value: _react.PropTypes.number
};
var defaultProps = {
    value: 0,
    step: 1,
    clsPrefix: 'u-input-number'
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
            currentValue = _this.props.value || 0;
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
        _this.onChange = _this.onChange.bind(_this);
        return _this;
    }

    InputNumber.prototype.ComponentWillMount = function ComponentWillMount() {
        console.log('ComponentWillMount' + this.props.min);
    };

    InputNumber.prototype.onChange = function onChange() {
        if (typeOf(this.props.value) !== number) {
            this.setState({ value: 0 });
        }
    };

    InputNumber.prototype.minus = function minus(e) {
        var _props = this.props,
            min = _props.min,
            step = _props.step;

        if (!min) {
            this.setState({ value: this.state.value - step });
            if (this.state.plusDisabled) {
                this.setState({ plusDisabled: false });
            }
            return;
        }
        if (this.state.value - step >= min) {
            this.setState({ value: this.state.value - step });
            if (this.state.plusDisabled) {
                this.setState({ plusDisabled: false });
            }
        } else {
            this.setState({ minusDisabled: true });
        }
    };

    InputNumber.prototype.plus = function plus() {
        var _props2 = this.props,
            max = _props2.max,
            step = _props2.step;

        if (!max) {
            this.setState({ value: this.state.value + step });
            if (this.state.minusDisabled) {
                this.setState({ minusDisabled: false });
            }
            return;
        }
        if (this.state.value + step <= max) {
            this.setState({ value: this.state.value + step });

            if (this.state.minusDisabled) {
                this.setState({ minusDisabled: false });
            }
        } else {
            this.setState({ plusDisabled: true });
        }
    };

    InputNumber.prototype.render = function render() {
        var _props3 = this.props,
            max = _props3.max,
            min = _props3.min,
            step = _props3.step,
            clsPrefix = _props3.clsPrefix,
            className = _props3.className,
            onChange = _props3.onChange,
            others = _objectWithoutProperties(_props3, ['max', 'min', 'step', 'clsPrefix', 'className', 'onChange']);

        return _react2["default"].createElement(
            _beeInputGroup2["default"],
            { className: (0, _classnames2["default"])(className, clsPrefix) },
            _react2["default"].createElement(
                _beeInputGroup2["default"].Addon,
                { className: this.state.minusDisabled && 'disabled', onClick: this.minus },
                '-'
            ),
            _react2["default"].createElement(_beeFormControl2["default"], { value: this.state.value, onChange: onChange }),
            _react2["default"].createElement(
                _beeInputGroup2["default"].Addon,
                { className: this.state.plusDisabled && 'disabled', onClick: this.plus },
                '+'
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