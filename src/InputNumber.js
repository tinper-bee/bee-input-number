import React, {Component} from 'react';
import classnames from 'classnames';
import InputGroup from 'bee-input-group';
import FormControl from 'bee-form-control';
import PropTypes from 'prop-types';

const propTypes = {
    max: PropTypes.number,
    min: PropTypes.number,
    step: PropTypes.number,
    autoWidth: PropTypes.bool,
    precision: PropTypes.number,
    format: PropTypes.func,
    delay: PropTypes.number,
    disabled:PropTypes.bool
};

const defaultProps = {
    value: 0,
    step: 1,
    clsPrefix: 'u-input-number',
    iconStyle: 'double',
    autoWidth: false,
    delay: 300
};

function judgeValue(props,oldValue) {
    let currentValue;
    let currentMinusDisabled = false;
    let currentPlusDisabled = false;
    // if(isNaN(props.value))throw new Error ('value is not a number')

    if (props.value) {
        currentValue = Number(props.value) ||0;
    } else if (props.min) {
        currentValue = props.min;
    } else {
        currentValue = 0;
        if(oldValue&&Number(oldValue))currentValue=Number(oldValue);//输入英文无效，显示上一次正确的值
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

    return {
        value: currentValue,
        minusDisabled: currentMinusDisabled,
        plusDisabled: currentPlusDisabled
    }
}

class InputNumber extends Component {

    constructor(props) {
        super(props);
        // 初始化状态，加减按钮是否可用，根据当前值判断

        let data = judgeValue(props);

        this.state = {
            value: data.value,
            minusDisabled: data.minusDisabled,
            plusDisabled: data.plusDisabled
        }

        this.timer = null;
        this.tempStorage = data.value;
    }

    ComponentWillMount() {

    }
    componentWillReceiveProps(nextProps){
        //  if(!nextProps.hasOwnProperty('precision')){//如果没有 precision
            let data = judgeValue(nextProps,this.state.value);
            this.setState({
                value: data.value,
                minusDisabled: data.minusDisabled,
                plusDisabled: data.plusDisabled
            });
            this.tempStorage = data.value;
        //  }
    }

    ComponentWillUnMount() {
        this.clear();
    }



    handleChange = (value) => {
        // if(isNaN(value))throw new Error ('value is not a number')
        judgeValue(value);
        const {onChange, min, max} = this.props;

        //value = this.detail(value, 0, 'reduce');
        if(!isNaN(value) && value >= min && value <= max){
            this.tempStorage = value;
        }
        this.setState({value});
        onChange && onChange(Number(value));
    }

    handleFocus = (v) => {
        let { onFocus, min, max } = this.props;
        let value = v;
        if(!isNaN(value) && value >= min && value <= max){
            this.tempStorage = v;
        }
        onFocus && onFocus(v);
    }

    handleBlur = (v) => {
        const { onBlur, step,precision } = this.props;
        let value = Number(v);
        if(precision){
            value = value.toFixed(precision);
        }
        if(isNaN(value)){
            value = this.tempStorage;
            this.setState({
                value
            });
            this.detailDisable(value);
        }else{
            this.plus(value - step);
        }
        onBlur && onBlur(v);
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

    minus = (value) => {
        const {min, max, step, onChange} = this.props;

        if(typeof min === "undefined"){
            value = this.detail(value, step, 'reduce');
        }else{
            if(value < min){
                value = min;
            }else{
                let reducedValue = this.detail(value, step, 'reduce');
                if(reducedValue >= min){
                    value = reducedValue;
                }
            }
        }

        if(value > max){
            value = max;
        }

        this.setState({
            value
        });
        onChange && onChange(Number(value));
        this.detailDisable(value);
    }
    detailDisable = (value) => {
        const { max, min, step } = this.props;

        if(value >= max || Number(value) + Number(step) > max){
            this.setState({
                plusDisabled: true
            })
        }else{
            this.setState({
                plusDisabled: false
            })
        }
        if(value <= min || value -step < min){
            this.setState({
                minusDisabled: true
            })
        }else{
            this.setState({
                minusDisabled: false
            })
        }

    }

    plus = (value) => {
        const {max, min, step, onChange} = this.props;
        if(typeof max === "undefined"){
            value = this.detail(value, step, 'add');
        }else{
            if(value > max){
                value = max;
            }else{
                let addedValue = this.detail(value, step, 'add');
                if(addedValue <= max){
                    value = addedValue;
                }
            }
        }
        if(value < min){
            value = min;
        }
        this.setState({
            value
        });
        onChange && onChange(Number(value));
        this.detailDisable(value);
    }


    clear = () => {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    }

    handlePlusMouseDown = (e) => {
        let {delay,disabled} = this.props;
        if(disabled)return;
        let {value} = this.state;
        this.plus(value);
        this.clear();
        this.timer = setTimeout(() => {
            this.handlePlusMouseDown();
        }, delay);
    }

    handleReduceMouseDown = (e) => {
        let {delay,disabled} = this.props;
        if(disabled)return;
        let {value} = this.state;
        this.minus(value);
        this.clear();
        this.timer = setTimeout(() => {
            this.handleReduceMouseDown();
        }, delay);
    }

    render() {
        const {max, min, step,disabled, clsPrefix, className, delay, onBlur, onFocus, iconStyle, autoWidth, onChange, format, precision, ...others} = this.props;

        let classes = {
            [`${clsPrefix}-auto`]: autoWidth,
            [`${clsPrefix}`]: true,
        };

        let {value, minusDisabled, plusDisabled} = this.state;

        value = format ? format(value) : value;

        let disabledCursor = disabled? ' disabled-cursor':'';

        return (
            <div>
                {
                    iconStyle === 'double' ? (
                        <InputGroup className={classnames(className, classes)}>
                            <InputGroup.Addon
                                className={(minusDisabled && 'disabled' ) + disabledCursor}
                                onMouseDown={ this.handleReduceMouseDown}
                                onMouseLeave={ this.clear }
                                onMouseUp={ this.clear }>
                                -
                            </InputGroup.Addon>
                            <FormControl
                                {...others}
                                disabled
                                value={value}
                                disabled={disabled}
                                onBlur={ this.handleBlur }
                                onFocus={this.handleFocus}
                                onChange={ this.handleChange }
                            />
                            <InputGroup.Addon
                                className={(plusDisabled && 'disabled' ) + disabledCursor}
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
                                disabled={disabled}
                                onBlur={ this.handleBlur }
                                onFocus={this.handleFocus}
                                onChange={ this.handleChange }
                            />
                            <InputGroup.Button>
                                <div className="icon-group">
                                <span
                                    onMouseDown={ this.handlePlusMouseDown}
                                    onMouseLeave={ this.clear }
                                    onMouseUp={ this.clear }
                                    className={classnames('plus',{'disabled': plusDisabled,'disabled-cursor':disabledCursor})}>
                                    <span className="uf uf-arrow-up"/>
                                </span>
                                    <span
                                        onMouseDown={ this.handleReduceMouseDown}
                                        onMouseLeave={ this.clear }
                                        onMouseUp={ this.clear }
                                        className={classnames("reduce",{'disabled': minusDisabled,'disabled-cursor':disabledCursor})}>
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
