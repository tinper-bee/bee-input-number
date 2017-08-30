/**
*
* @title 这是标题
* @description 这是描述
*
*/


import React, { Component } from 'react';
import InputNumber from '../../src';

class Demo1 extends Component {
    constructor(props){
        super(props);
        this.state = {
            value: 5
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange (value) {
        console.log("----" + value);
        this.setState({
            value: value
        })
    }
render () {
return (
    <div>
        <InputNumber value={this.state.value} onChange={ this.handleChange }/>
    </div>
)
}
}

export default Demo1;