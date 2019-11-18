import React, {Component} from 'react';
import classnames from 'classnames';
import InputGroup from 'bee-input-group';
import FormControl from 'bee-form-control';
import Message from 'bee-message';
import PropTypes from 'prop-types';
import i18n from './i18n';
import { getComponentLocale } from 'bee-locale/build/tool';

const propTypes = {
    max: PropTypes.number,
    min: PropTypes.number,
    step: PropTypes.number,
    autoWidth: PropTypes.bool,
    precision: PropTypes.number,
    format: PropTypes.func,
    delay: PropTypes.number,
    disabled:PropTypes.bool,
    toThousands:PropTypes.bool,
    locale:PropTypes.object,
    toNumber:PropTypes.bool, //回调函数内的值是否转换为数值类型
    displayCheckPrompt:PropTypes.bool, //是否显示超出限制范围之后的检验提示
};

const defaultProps = {
    value: "",
    step: 1,
    clsPrefix: 'u-input-number',
    iconStyle: 'double',
    autoWidth: false,
    delay: 300,
    toNumber:false,
    displayCheckPrompt:false,
    locale:{}
};


//校验提示
function prompt (content)  {
    Message.destroy();
    Message.create({content: content, color: 'warninglight'});
}



/**
 * 千分符
 * @param {要转换的数据} num 
 */
function toThousands(number) {
    if(number==='')return '';
    if(number==='0')return '0';
    let num = (number || 0).toString();
    let integer = num.split('.')[0];
    let decimal = num.split('.')[1]||'';
    let result = '';
    while (integer.length > 3) {
        result = ',' + integer.slice(-3) + result;
        integer = integer.slice(0, integer.length - 3);
    }
    if (integer) { 
        result = integer + result ;
        if(num=='.'||num.indexOf('.')==num.length-1){
            result = result + '.'+decimal;
        }else if (decimal){
            result = result + '.'+decimal;
        }
     }
     if(result[0]=='-'){
        result = result.replace('-,','-')
    }
    return result;
}

function unThousands(number){
    number = (number || 0).toString();
    return number.replace(/\,/g,'');
}




class InputNumber extends Component {

    constructor(props) {
        super(props);
        // 初始化状态，加减按钮是否可用，根据当前值判断

        let data = this.judgeValue(props);

        this.state = {
            value: data.value,
            minusDisabled: data.minusDisabled,
            plusDisabled: data.plusDisabled,
            showValue:toThousands(data.value)
        }

        this.timer = null;
        this.focus = false;
    }
    /**
     * 校验value
     * @param {*} props 
     * @param {原来的值} oldValue 
     */
    judgeValue = (props,oldValue)=> {
        let currentValue;
        let currentMinusDisabled = false;
        let currentPlusDisabled = false;
        let { value,min,max,precision,onChange,displayCheckPrompt } = props;
        if (value!=undefined) {
            if(value===''){
                currentValue='';
                return {
                    value: '',
                    minusDisabled: false,
                    plusDisabled: false
                }
            }else{
                currentValue = Number(value) ||0;
            }
        } else if (min&&(value!='')) {
            currentValue = min;
        } else if(value==='0'||value===0){
            currentValue = 0;
        }else{//NaN
            if(oldValue||(oldValue===0)||(oldValue==='0')){
                currentValue = oldValue;
            }else{//value为空
                return {
                    value: '',
                    minusDisabled: false,
                    plusDisabled: false
                }
            }
        }
        if(currentValue==-Infinity){
            return {
                value: min,
                minusDisabled: true,
                plusDisabled: false
            }
        }
        if(currentValue==Infinity){
            return {
                value: max,
                minusDisabled: false,
                plusDisabled: true
            }
        }
        const local = getComponentLocale(props, this.context, 'InputNumber', () => i18n);
        if (currentValue <= min) {
            if(displayCheckPrompt)prompt(local['msgMin']);
            currentMinusDisabled = true;
            currentValue=min;
        }
        if (currentValue >= max) {
            if(displayCheckPrompt)prompt(local['msgMax']);
            currentPlusDisabled = true;
            currentValue=max;
        }

        if(props.hasOwnProperty('precision')){
            currentValue = Number(currentValue).toFixed(precision);
        }

        return {
            value: currentValue,
            minusDisabled: currentMinusDisabled,
            plusDisabled: currentPlusDisabled
        }
    }

    componentDidMount(){
        this.setState({
            value: this.props.value,
            showValue:toThousands(this.props.value)
        });
    }
    componentWillReceiveProps(nextProps){
        if(this.focus){
            if(nextProps.value==Infinity||nextProps.value==-Infinity){
                
            }else{
                this.setState({
                    value: nextProps.value,
                    showValue:toThousands(nextProps.value),
                });
            }
            
        }else{
            let data = this.judgeValue(nextProps,this.state.value);
            this.setState({
                value: data.value,
                showValue:toThousands(data.value),
                minusDisabled: data.minusDisabled,
                plusDisabled: data.plusDisabled
            });
        }
    }

    ComponentWillUnMount() {
        this.clear();
    }

    handleChange = (value) => {
        const { onChange,toNumber,max,min,displayCheckPrompt } = this.props;
        if(value===''){
            onChange && onChange(value);
            this.setState({
                value
            })
            return;
        }
        value = unThousands(value);
        // if(Number(value)>max){
        //     if(!displayCheckPrompt) return;
        //     this.prompt(`输入的数字不能大于 ${max}`);
        //     return;
        // }
        // if(Number(value)<min){
        //     if(!displayCheckPrompt) return;
        //     this.prompt(`输入的数字不能小于 ${min}`);
        //     return;
        // }
        if(isNaN(value)&&(value!=='.')&&(value!=='-'))return;
        this.setState({
            value,
            showValue:toThousands(value),
        });
        if(value==='-'){
            onChange && onChange(value);
        }
        if(value=='.'||value.indexOf('.')==value.length-1){//当输入小数点的时候
            onChange && onChange(value);
        }else if(value[value.indexOf('.')+1]==0){//当输入 d.0 的时候，不转换Number
            onChange && onChange(value);
        }else{
            toNumber?onChange && onChange(Number(value)):onChange && onChange(value);
        }
        
        
    }
    

    handleFocus = (value,e) => {
        this.focus = true;
        let { onFocus, min, max } = this.props;
        onFocus && onFocus(value, e);
    }

    handleBlur = (v,e) => {
        this.focus = false;        
        const { onBlur,precision,onChange,toNumber,max,min,displayCheckPrompt } = this.props;
        const local = getComponentLocale(this.props, this.context, 'InputNumber', () => i18n);
        if(v===''){
            this.setState({
                value:v
            })
            onBlur && onBlur(v,e);
            onChange && onChange(v);
            return;
        }
        v = unThousands(v)
        let value = Number(v);
        if(value>max){
            if(displayCheckPrompt)prompt(local['msgMax']);
            value = max;
        }
        if(value<min){
            if(displayCheckPrompt)prompt(local['msgMin']);
            value = min;
        }
        if(this.props.hasOwnProperty('precision')){
            value = value.toFixed(precision);
        }
        this.setState({
            value,
            showValue:toThousands(value)
        });
        this.detailDisable(value);
        if(toNumber){
            onBlur && onBlur(Number(value),e);
            onChange && onChange(Number(value));
        }else{
            onBlur && onBlur(value,e);
            onChange && onChange(value);
        }
        
    }
    /**
     * 设置增加减少按钮是否可用
     */
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
    /**
     * 减法
     */
    minus = (value) => {
        const {min, max, step, onChange, toNumber} = this.props;
        value = (value === '-') ? 0 : value;
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
            value,
            showValue:toThousands(value)
        });
        toNumber?onChange && onChange(Number(value)):onChange && onChange(value);
        this.detailDisable(value);
    }
    /**
     * 加法
     */
    plus = (value) => {
        const {max, min, step, onChange, toNumber} = this.props;
        value = (value === '-') ? 0 : value;
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
            value,
            showValue:toThousands(value)
        });
        toNumber?onChange && onChange(Number(value)):onChange && onChange(value);
        this.detailDisable(value);
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
        value = value !== null && value.toString();
        if (value.indexOf('.') > -1) {
            return value.split('.')[1];
        } else {
            return "";
        }
    }

    

    clear = () => {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    }

    handlePlusMouseDown = (e) => {
        e.preventDefault();
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
        e.preventDefault();
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
        const {toThousands, max, min, step,disabled, clsPrefix, className, delay, onBlur, onFocus, iconStyle, autoWidth, onChange, format, precision,toNumber, ...others} = this.props;
        let classes = {
            [`${clsPrefix}-auto`]: autoWidth,
            [`${clsPrefix}`]: true,
            [`${clsPrefix}-lg`]: others.size === "lg",
            [`${clsPrefix}-sm`]: others.size === "sm",
        };

        let {value, minusDisabled, plusDisabled, showValue} = this.state;

        value = format ? format(value) : value;

        let disabledCursor = disabled? ' disabled-cursor':'';
        let disabledCon = disabled? ' disabled-con':'';
        return (
            <div className={`${clsPrefix}-out`}>
                {
                    iconStyle === 'double' ? (
                        <InputGroup className={classnames(className, classes,disabledCon)}>
                            <InputGroup.Addon
                                className={(minusDisabled && 'disabled' ) + disabledCursor}
                                onMouseDown={ this.handleReduceMouseDown}
                                onMouseLeave={ this.clear }
                                onMouseUp={ this.clear }>
                                -
                            </InputGroup.Addon>
                            <FormControl
                                {...others}
                                value={toThousands?showValue:value}
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
                            className={classnames(className, classes,disabledCon)}
                            simple
                        > 
                            <FormControl 
                                {...others}
                                value={toThousands?showValue:value}
                                disabled={disabled}
                                onBlur={ this.handleBlur }
                                onFocus={this.handleFocus}
                                onChange={ this.handleChange }
                            />
                            <InputGroup.Button>
                                <div className={classnames("icon-group")}>
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
InputNumber.contextTypes = {
    beeLocale: PropTypes.object
};
export default InputNumber;
