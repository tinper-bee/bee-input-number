/**
 *
* @title 基础示例
 * @description 最简单输入控制。最小值为0，最大值为10000
 *
 */


import React, { Component } from 'react';
import InputNumber from '../../src';

class Demo1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null
        }
    }

    handleChange = (value) => {
        console.log(value);
        this.setState({
            value: value
        })
    }
    handleBtnClick = (value) => {
        console.log(value);

    }
	toThousands(num) {
		let result = '', counter = 0;
		num = (num || 0).toString();
		const numArr = num.split('.')
		num = numArr[0]
		for (var i = num.length - 1; i >= 0; i--) {
			counter++;
			result = num.charAt(i) + result;
			if (!(counter % 3) && i != 0) { result = ',' + result; }
		}
		return numArr.length === 1 ? result : result +'.' +numArr[1];
	}

    render () {
		return (
            <div>
                <InputNumber
                    iconStyle="one"
                    min={0}
                    max={10000}
					onFocus={(value,e)=>{
						this.setState({
							value
						})
					}}
                    onChange={this.handleChange}
					format={value => this.toThousands(value)}
                    handleBtnClick={this.handleBtnClick}
                    value={this.state.value}
                />
            </div>
        )
    }
}

export default Demo1;
