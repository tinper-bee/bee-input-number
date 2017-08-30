/**
*
* @title 这是标题
* @description 自定义max=12,min=5,step=2
*
*/

import React, { Component } from 'react';
import InputNumber from '../../src';

class Demo2 extends Component {
	render () {
		return (
			<InputNumber max={12} min={5} step={2}/>
		)
	}
}

export default Demo2;