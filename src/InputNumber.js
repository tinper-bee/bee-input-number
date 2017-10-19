import React, { Component } from 'react';
import classnames from 'classnames';
import ReactDom from 'react-dom';
import InputGroup from 'bee-input-group';
import FormControl from 'bee-form-control';
import PropTypes from 'prop-types';

const propTypes = {
  max:PropTypes.number,
  min:PropTypes.number,
  step: PropTypes.number,
  value: PropTypes.number,
  autoWidth: PropTypes.bool,
}
const defaultProps = {
  value:0,
  step:1,
  clsPrefix: 'u-input-number',
  iconStyle: 'double',
  autoWidth: false,
}
class InputNumber extends Component{

    constructor(props) {
        super(props);
        // 初始化状态，加减按钮是否可用，根据当前值判断
        let currentValue;
        let currentMinusDisabled = false;
        let currentPlusDisabled = false;
        if(this.props.value) {
            currentValue = Number(this.props.value) || 0;
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
        this.handleChange = this.handleChange.bind(this);
    }

    ComponentWillMount() {
        console.log('ComponentWillMount'+this.props.min);
    }
    handleChange(event) {
        const { onChange } = this.props;

        this.setState({value: Number(event.target.value)});
        onChange && onChange(Number(event.target.value));
    }
    minus(e) {
        const {min,step,onChange} = this.props;
        if(!min) {
            this.setState({value:this.state.value-step});
            onChange && onChange(this.state.value-step);
            if(this.state.plusDisabled) {
                this.setState({plusDisabled:false});
            }
            return;
        }
        if((this.state.value-step) >= min){
            this.setState({value:this.state.value-step});
            onChange && onChange(this.state.value-step);
            if(this.state.plusDisabled) {
                this.setState({plusDisabled:false});
            }
        }else{
            this.setState({minusDisabled:true});
        }
    }
    plus(e) {
        const {max,step,onChange} = this.props;
        if(!max) {
            this.setState({value:this.state.value+step});

            onChange && onChange(this.state.value+step);
            if(this.state.minusDisabled) {
                this.setState({minusDisabled:false});
            }
            return;
        }
        if((this.state.value+step) <= max){
            this.setState({value:this.state.value+step});
            onChange && onChange(this.state.value+step);
            if(this.state.minusDisabled) {
                this.setState({minusDisabled:false});
            }
        }else{
            this.setState({plusDisabled:true});
        }
    }
    render() {
       const {max, min, step, clsPrefix, className, iconStyle, autoWidth, onChange, ...others} = this.props;

       let classes = {
           [`${clsPrefix}-auto`] : autoWidth,
           [`${clsPrefix}`] : true,
       }

        return (
            <div>
            {
                iconStyle == 'double' ? (
                    <InputGroup className={classnames(className, classes)} {...others}>
                    <InputGroup.Addon className={ this.state.minusDisabled && 'disabled'} onClick={this.minus}>-</InputGroup.Addon>
                    <FormControl value={this.state.value} onChange = { this.handleChange }/>
                    <InputGroup.Addon className={this.state.plusDisabled && 'disabled'} onClick={this.plus}>+</InputGroup.Addon>
                    </InputGroup>
                ) : (
                    <InputGroup className={classnames(className, classes)} simple  {...others}>
                    <FormControl value={this.state.value} onChange = { this.handleChange }/>
                        <InputGroup.Button>
                            <div className="icon-group">
                                <span onClick={this.plus} className="plus">
                                <span className="uf uf-arrow-up"></span>
                                                </span>
                                <span onClick={this.minus} className="reduce">
                                                <span className=" uf uf-arrow-down"></span>
                                </span>
                            </div>
                        </InputGroup.Button>
                    </InputGroup>
                )
            }
            </div>



        );
    }
};

InputNumber.defaultProps = defaultProps;
InputNumber.propTypes = propTypes;
export default InputNumber;
