import React, { Component, PropTypes } from 'react';
import classnames from 'classNames';
import ReactDom from 'react-dom';
import InputGroup from 'bee-input-group';
import FormControl from 'bee-form-control';
import classNames from 'classnames';

const propTypes = {
  max:PropTypes.number,
  min:PropTypes.number,
  step: PropTypes.number,
  value: PropTypes.number
}
const defaultProps = {
  value:0,
  step:1,
  clsPrefix: 'u-input-number'
}
class InputNumber extends Component{
    
    constructor(props) {
        super(props);
        // 初始化状态，加减按钮是否可用，根据当前值判断
        let currentValue;
        let currentMinusDisabled = false;
        let currentPlusDisabled = false;
        if(this.props.value) {
            currentValue = this.props.value || 0;
        }else if(this.props.min){
            currentValue = this.props.min;
        }else{
            currentValue = 0;
        }
        if(currentValue <= this.props.min){
            currentMinusDisabled = true;
        }
        if(currentValue >= this.props.max){
            currentPlusDisabled = true;
        }

        this.state = {
            value:currentValue,
            minusDisabled: currentMinusDisabled,
            plusDisabled: currentPlusDisabled
        }
        this.plus = this.plus.bind(this);
        this.minus = this.minus.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    ComponentWillMount() {
        console.log('ComponentWillMount'+this.props.min);
    }
    onChange() {
        if(typeOf(this.props.value)!==number) {
            this.setState({value:0});
        }
    }
    minus(e) {
        const {min,step} = this.props;
        if(!min) {
            this.setState({value:this.state.value-step});
            if(this.state.plusDisabled) {
                this.setState({plusDisabled:false});
            }
            return;
        }
        if((this.state.value-step) >= min){
            this.setState({value:this.state.value-step});
            if(this.state.plusDisabled) {
                this.setState({plusDisabled:false});
            }
        }else{
            this.setState({minusDisabled:true});
        }
    }
    plus() {
        const {max,step} = this.props;
        if(!max) {
            this.setState({value:this.state.value+step});
            if(this.state.minusDisabled) {
                this.setState({minusDisabled:false});
            }
            return;
        }
        if((this.state.value+step) <= max){
            this.setState({value:this.state.value+step});
            
            if(this.state.minusDisabled) {
                this.setState({minusDisabled:false});
            }
        }else{
            this.setState({plusDisabled:true});
        }
    }
    render() {
       const {max,min,step,clsPrefix,className, ...others} = this.props;

        return (
          <InputGroup className={classnames(className, clsPrefix)}>
            <InputGroup.Addon className={ this.state.minusDisabled && 'disabled'} onClick={this.minus}>-</InputGroup.Addon>
            <FormControl value={this.state.value} onChange={this.onChange}/>
            <InputGroup.Addon className={this.state.plusDisabled && 'disabled'} onClick={this.plus}>+</InputGroup.Addon>
          </InputGroup>
        );
    }
};

InputNumber.defaultProps = defaultProps;
InputNumber.propTypes = propTypes;
export default InputNumber;

