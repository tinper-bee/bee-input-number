import React, {Component} from 'react';
import classnames from 'classnames';
import InputGroup from 'bee-input-group';
import FormControl from 'bee-form-control';
import PropTypes from 'prop-types';

const propTypes = {
    max: PropTypes.number,
    min: PropTypes.number,
    step: PropTypes.number,
    value: PropTypes.number,
    autoWidth: PropTypes.bool,
    precision: PropTypes.number,
    format: PropTypes.func,
    delay: PropTypes.number
};

const defaultProps = {
    value: 0,
    step: 1,
    clsPrefix: 'u-input-number',
    iconStyle: 'double',
    autoWidth: false,
    delay: 300
};

class InputNumber extends Component {

    constructor(props) {
        super(props);
        // 初始化状态，加减按钮是否可用，根据当前值判断
        let currentValue;
        let currentMinusDisabled = false;
        let currentPlusDisabled = false;

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

        if(props.hasOwnProperty('precision')){
            currentValue = currentValue.toFixed(props.precision);
        }

        this.state = {
            value: currentValue,
            minusDisabled: currentMinusDisabled,
            plusDisabled: currentPlusDisabled
        }

        this.timer = null;
    }

    ComponentWillMount() {

    }

    ComponentWillUnMount() {
        this.clear();
    }

    handleChange = (value) => {
        const {onChange} = this.props;

        value = this.detail(value, 0, 'reduce');

        this.setState({value});
        onChange && onChange(value);
    }

    detail = (value, step, type) => {
        let {precision} = this.props;

        let valueFloat = this.separate(value);
        let stepFloat = this.separate(step);

        let ans;
        let stepFloatLength = stepFloat.toString().length;
        let valueFloatLength = valueFloat.toString().length;

        if (typeof precision === 'undefined') {
            precision = Math.max(stepFloatLength, valueFloatLength);
        }
        let coefficient = Math.pow(10, Math.abs(stepFloatLength - valueFloatLength));
        if (type === 'add') {
            ans = (value * coefficient + step * coefficient) / coefficient;
        } else {
            ans = (value * coefficient - step * coefficient) / coefficient;
        }

        return ans.toFixed(precision);

    }

    /**
     * 分离小数和整数
     * @param value
     * @returns {*}
     */
    separate = (value) => {
        value = value.toString();
        if (value.indexOf('.') > -1) {
            return value.split('.')[1];
        } else {
            return "";
        }
    }

    minus = () => {
        const {min, step, onChange} = this.props;
        let value = this.detail(this.state.value, step, 'reduce');
        if (typeof min === "undefined") {

            this.setState({
                value: value
            });
            onChange && onChange(value);
            if (this.state.plusDisabled) {
                this.setState({plusDisabled: false});
            }
            return;
        }
        if (value >= min) {
            this.setState({value: value});
            onChange && onChange(value);
            if (this.state.plusDisabled) {
                this.setState({plusDisabled: false});
            }
        }

        if(value <= min){
            this.setState({minusDisabled: true});
        }
    }

    plus = () => {
        const {max, step, onChange} = this.props;
        let value = this.detail(this.state.value, step, 'add');
        if (typeof max === "undefined") {
            this.setState({value});
            onChange && onChange(value);
            if (this.state.minusDisabled) {
                this.setState({minusDisabled: false});
            }
            return;
        }
        if (value <= max) {
            this.setState({value});
            onChange && onChange(value);
            if (this.state.minusDisabled) {
                this.setState({minusDisabled: false});
            }
        }

        if(value >= max){
            this.setState({plusDisabled: true});
        }
    }

    clear = () => {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    }

    handlePlusMouseDown = (e) => {
        let {delay} = this.props;
        this.plus();
        this.clear();
        this.timer = setTimeout(() => {
            this.handlePlusMouseDown();
        }, delay);
    }

    handleReduceMouseDown = (e) => {
        let {delay} = this.props;
        this.minus();
        this.clear();
        this.timer = setTimeout(() => {
            this.handleReduceMouseDown();
        }, delay);
    }

    render() {
        const {max, min, step, clsPrefix, className, delay, iconStyle, autoWidth, onChange, format, precision, ...others} = this.props;

        let classes = {
            [`${clsPrefix}-auto`]: autoWidth,
            [`${clsPrefix}`]: true,
        };

        let {value, minusDisabled, plusDisabled} = this.state;


        value = format ? format(value) : value;
        return (
            <div>
                {
                    iconStyle === 'double' ? (
                        <InputGroup className={classnames(className, classes)}>
                            <InputGroup.Addon
                                className={ minusDisabled && 'disabled'}
                                onMouseDown={ this.handleReduceMouseDown}
                                onMouseLeave={ this.clear }
                                onMouseUp={ this.clear }>
                                -
                            </InputGroup.Addon>
                            <FormControl
                                {...others}
                                value={value}
                                onChange={ this.handleChange }
                            />
                            <InputGroup.Addon
                                className={plusDisabled && 'disabled'}
                                onMouseDown={ this.handlePlusMouseDown}
                                onMouseLeave={ this.clear }
                                onMouseUp={ this.clear }>
                                +
                            </InputGroup.Addon>
                        </InputGroup>
                    ) : (
                        <InputGroup
                            className={classnames(className, classes)}
                            simple
                        >
                            <FormControl
                                {...others}
                                value={value}
                                onChange={ this.handleChange }
                            />
                            <InputGroup.Button>
                                <div className="icon-group">
                                <span
                                    onMouseDown={ this.handlePlusMouseDown}
                                    onMouseLeave={ this.clear }
                                    onMouseUp={ this.clear }
                                    className={classnames('plus',{'disabled': plusDisabled})}>
                                    <span className="uf uf-arrow-up"/>
                                </span>
                                    <span
                                        onMouseDown={ this.handleReduceMouseDown}
                                        onMouseLeave={ this.clear }
                                        onMouseUp={ this.clear }
                                        className={classnames("reduce",{'disabled': minusDisabled})}>
                                        <span className=" uf uf-arrow-down"/>
                                </span>
                                </div>
                            </InputGroup.Button>
                        </InputGroup>
                    )
                }
            </div>
        );
    }
}
;

InputNumber.defaultProps = defaultProps;
InputNumber.propTypes = propTypes;
export default InputNumber;
