/**
 *
* @title 数组选择控件 
 * @description 最简单输入控制
 *
 */


import React, {Component} from 'react';
import InputNumber from '../../src';

class Demo1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        }
    }

    handleChange = (value) => {
        console.log(value);
        this.setState({
            value: value
        })
    }

    render() {
        return (
            <div>
                <InputNumber  precision={2} min={0} value={this.state.value} onChange={ this.handleChange }/>
            </div>
        )
    }
}

export default Demo1;