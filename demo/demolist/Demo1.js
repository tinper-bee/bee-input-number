/**
 *
 * @title 这是标题
 * @description 这是描述
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
        this.setState({
            value: value
        })
    }

    render() {
        return (
            <div>
                <InputNumber disabled precision={2} min={0} value={this.state.value} onChange={ this.handleChange }/>
            </div>
        )
    }
}

export default Demo1;