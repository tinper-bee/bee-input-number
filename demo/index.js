import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Con, Row, Col } from 'bee-layout';
import { Panel } from 'bee-panel';
import Drawer from 'bee-drawer';
import Clipboard from 'bee-clipboard'; 
import Button from '../src';



var Demo1 = require("./demolist/Demo1");var Demo2 = require("./demolist/Demo2");var Demo3 = require("./demolist/Demo3");var Demo4 = require("./demolist/Demo4");var Demo5 = require("./demolist/Demo5");var Demo6 = require("./demolist/Demo6");var Demo8 = require("./demolist/Demo8");var Demo9 = require("./demolist/Demo9");var Demo10 = require("./demolist/Demo10");var Demo11 = require("./demolist/Demo11");var Demo12 = require("./demolist/Demo12");var DemoArray = [{"example":<Demo1 />,"title":" 基础示例","code":"/**\r\n *\r\n* @title 基础示例\r\n * @description 最简单输入控制。最小值为0，最大值为10000\r\n *\r\n */\r\n\r\n\r\nimport React, { Component } from 'react';\nimport { InputNumber } from 'tinper-bee';\r\n\r\n\r\nclass Demo1 extends Component {\r\n    constructor(props) {\r\n        super(props);\r\n        this.state = {\r\n            value: null\r\n        }\r\n    }\r\n\r\n    handleChange = (value) => {\r\n        console.log(value);\r\n        this.setState({\r\n            value: value\r\n        })\r\n    }\r\n    handleBtnClick = (value) => {\r\n        console.log(value);\r\n\r\n    }\r\n\ttoThousands(num) {\r\n\t\tlet result = '', counter = 0;\r\n\t\tnum = (num || 0).toString();\r\n\t\tconst numArr = num.split('.')\r\n\t\tnum = numArr[0]\r\n\t\tfor (var i = num.length - 1; i >= 0; i--) {\r\n\t\t\tcounter++;\r\n\t\t\tresult = num.charAt(i) + result;\r\n\t\t\tif (!(counter % 3) && i != 0) { result = ',' + result; }\r\n\t\t}\r\n\t\treturn numArr.length === 1 ? result : result +'.' +numArr[1];\r\n\t}\r\n\r\n    render () {\r\n\t\treturn (\r\n            <div>\r\n                <InputNumber\r\n                    iconStyle=\"one\"\r\n                    min={0}\r\n                    max={10000}\r\n\t\t\t\t\tonFocus={(value,e)=>{\r\n\t\t\t\t\t\tthis.setState({\r\n\t\t\t\t\t\t\tvalue\r\n\t\t\t\t\t\t})\r\n\t\t\t\t\t}}\r\n                    onChange={this.handleChange}\r\n\t\t\t\t\tformat={value => this.toThousands(value)}\r\n                    handleBtnClick={this.handleBtnClick}\r\n                    value={this.state.value}\r\n                />\r\n            </div>\r\n        )\r\n    }\r\n}\r\n\r\nexport default Demo1;\r\n","desc":" 最简单输入控制。最小值为0，最大值为10000","scss_code":"#tinperBeeDemo .u-input-number {\r\n    width: 200px;\r\n}"},{"example":<Demo2 />,"title":" 默认 iconStyle","code":"/**\r\n*\r\n* @title 默认 iconStyle\r\n* @description 自定义 最大值 max=12,min=5,step=1\r\n*\r\n*/\r\n\r\nimport React, { Component } from 'react';\nimport { InputNumber } from 'tinper-bee';\r\n\r\n\r\nclass Demo2 extends Component {\r\n    constructor(props) {\r\n        super(props);\r\n        this.state = {\r\n            value: 5\r\n        }\r\n    }\r\n    handleChange = (value) => {\r\n        this.setState({\r\n            value: value\r\n        })\r\n    }\r\n\trender () {\r\n\t\treturn (\r\n\t\t\t<InputNumber\r\n\t\t\t\tmax={12}\r\n\t\t\t\tmin={5}\r\n\t\t\t\tstep={1}\r\n\t\t\t\tvalue={this.state.value}\r\n                onChange={ this.handleChange }\r\n\t\t\t/>\r\n\t\t)\r\n\t}\r\n}\r\n\r\nexport default Demo2;","desc":" 自定义 最大值 max=12,min=5,step=1"},{"example":<Demo3 />,"title":" 第二种iconStyle","code":"/**\r\n*\r\n* @title 第二种iconStyle\r\n* @description 自定义max=12,min=5,step=2\r\n*\r\n*/\r\n\r\nimport React, { Component } from 'react';\nimport { InputNumber } from 'tinper-bee';\r\n \r\n\r\nclass Demo3 extends Component {\r\n    constructor(props) {\r\n        super(props);\r\n        this.state = {\r\n            value: 0\r\n        }\r\n    }\r\n    handleChange = (value) => {\r\n        this.setState({\r\n            value: value\r\n        })\r\n    }\r\n\trender () {\r\n\t\treturn (\r\n\t\t\t<InputNumber\r\n\t\t\t\ticonStyle=\"one\"\r\n\t\t\t\tmax={12}\r\n\t\t\t\tmin={-9}\r\n\t\t\t\tstep={2}\r\n\t\t\t\tvalue={this.state.value}\r\n\t\t\t\tonChange={ this.handleChange }\r\n\t\t\t/>\r\n\t\t)\r\n\t}\r\n}\r\n\r\nexport default Demo3;","desc":" 自定义max=12,min=5,step=2"},{"example":<Demo4 />,"title":" 默认iconStyle不可用状态","code":"/**\r\n *\r\n * @title 默认iconStyle不可用状态\r\n * @description disabled 的单输入控制\r\n *\r\n */\r\n\r\n\r\nimport React, {Component} from 'react';\nimport { InputNumber } from 'tinper-bee';\r\n\r\n\r\nclass Demo4 extends Component {\r\n    constructor(props) {\r\n        super(props);\r\n        this.state = {\r\n            value: 0\r\n        }\r\n    }\r\n\r\n    handleChange = (value) => {\r\n        this.setState({\r\n            value: value\r\n        })\r\n    }\r\n\r\n    render() {\r\n        return (\r\n            <div>\r\n                <InputNumber disabled precision={2} value={this.state.value} onChange={ this.handleChange }/>\r\n            </div>\r\n        )\r\n    }\r\n}\r\n\r\nexport default Demo4;","desc":" disabled 的单输入控制"},{"example":<Demo5 />,"title":" 第二种iconStyle不可用状态","code":"/**\r\n*\r\n* @title 第二种iconStyle不可用状态\r\n* @description 自定义max=12,min=5,step=2 且设置 disabled 处理\r\n*\r\n*/\r\n\r\nimport React, { Component } from 'react';\nimport { InputNumber } from 'tinper-bee';\r\n \r\n\r\nclass Demo5 extends Component {\r\n    constructor(props) {\r\n        super(props);\r\n        this.state = {\r\n            value: 8\r\n        }\r\n    }\r\n    handleChange = (value) => {\r\n        this.setState({\r\n            value: value\r\n        })\r\n    }\r\n\trender () {\r\n\t\treturn (\r\n\t\t\t<InputNumber\r\n\t\t\t\tdisabled\r\n\t\t\t\ticonStyle=\"one\"\r\n\t\t\t\tmax={12}\r\n\t\t\t\tmin={-10}\r\n\t\t\t\tstep={2}\r\n\t\t\t\tvalue={this.state.value}\r\n\t\t\t\tonChange={ this.handleChange }\r\n\t\t\t/>\r\n\t\t)\r\n\t}\r\n}\r\n\r\nexport default Demo5;","desc":" 自定义max=12,min=5,step=2 且设置 disabled 处理"},{"example":<Demo6 />,"title":" 保留两位小数","code":"/**\r\n*\r\n* @title 保留两位小数\r\n* @description precision={2} 设置小数点后保留两位，失去焦点时数据会格式化为两位小数\r\n*\r\n*/\r\n\r\nimport React, { Component } from 'react';\nimport { InputNumber } from 'tinper-bee';\r\n \r\n\r\nclass Demo6 extends Component {\r\n    constructor(props) {\r\n        super(props);\r\n        this.state = {\r\n            value: 0\r\n        }\r\n    }\r\n    handleChange = (value) => {\r\n\t\tconsole.log(value)\r\n        this.setState({\r\n            value: value\r\n        })\r\n    }\r\n\trender () {\r\n\t\treturn (\r\n\t\t\t<InputNumber\r\n\t\t\t\ticonStyle=\"one\"\r\n\t\t\t\tprecision={2}\r\n\t\t\t\tvalue={this.state.value}\r\n\t\t\t\tonChange={ this.handleChange }\r\n\t\t\t/>\r\n\t\t)\r\n\t}\r\n}\r\n\r\nexport default Demo6;","desc":" precision={2} 设置小数点后保留两位，失去焦点时数据会格式化为两位小数"},{"example":<Demo8 />,"title":" 基础示例 ","code":"/**\r\n *\r\n* @title 基础示例 \r\n * @description 最简单输入控制\r\n *\r\n */\r\n\r\n\r\nimport React, {Component} from 'react';\nimport { InputNumber } from 'tinper-bee';\r\n\r\n\r\nclass Demo1 extends Component {\r\n    constructor(props) {\r\n        super(props);\r\n        this.state = {\r\n            value: '1'\r\n        }\r\n    }\r\n\r\n    handleChange = (value) => {\r\n        console.log(value);\r\n        this.setState({\r\n            value: value\r\n        })\r\n    }\r\n\r\n    render() {\r\n        return (\r\n            <div>\r\n                <InputNumber  precision={2} value={this.state.value} onChange={ this.handleChange }/>\r\n            </div>\r\n        )\r\n    }\r\n}\r\n\r\nexport default Demo1;","desc":" 最简单输入控制"},{"example":<Demo9 />,"title":" 数字区间基础示例 ","code":"/**\r\n *\r\n* @title 数字区间基础示例 \r\n * @description 使用 InputNumberGroup\r\n *\r\n */\r\n\r\n\r\nimport React, {Component} from 'react';\nimport { InputNumber } from 'tinper-bee';\r\n\r\n\r\nconst InputNumberGroup = InputNumber.InputNumberGroup;\r\n\r\nclass Demo9 extends Component {\r\n    constructor(props) {\r\n        super(props);\r\n        this.state = {\r\n            value: [10,12]\r\n        }\r\n    }\r\n\r\n    handleChange = (value) => {\r\n        console.log(value);\r\n        this.setState({\r\n            value\r\n        })\r\n    }\r\n\r\n    render() {\r\n        return (\r\n            <div className='demo9'>\r\n                <InputNumberGroup \r\n                iconStyle='two'\r\n                value={this.state.value}\r\n                onChange={this.handleChange} \r\n                placeholder={['请输入最小值','请输入最大值']}/>\r\n            </div>\r\n        )\r\n    }\r\n}\r\n\r\nexport default Demo9;","desc":" 使用 InputNumberGroup"},{"example":<Demo10 />,"title":" 输入时校验提示 ","code":"/**\r\n *\r\n* @title 输入时校验提示 \r\n * @description 设置 displayCheckPrompt={true}，显示超出限制范围之后的提示。\r\n *\r\n */\r\n\r\n\r\nimport React, { Component } from 'react';\nimport { InputNumber } from 'tinper-bee';\r\n\r\n\r\nclass Demo10 extends Component {\r\n    render () {\r\n        return (\r\n            <InputNumber\r\n                iconStyle=\"one\"\r\n                min={-100}\r\n                max={100}\r\n                value={0}\r\n                displayCheckPrompt={true}\r\n            />\r\n        )\r\n    }\r\n}\r\n\r\nexport default Demo10;","desc":" 设置 displayCheckPrompt={true}，显示超出限制范围之后的提示。"},{"example":<Demo11 />,"title":" size 属性 ","code":"/**\r\n *\r\n* @title size 属性 \r\n * @description size=\"md\" / \"lg\" / \"sm\" 分别表示中号(默认)、大号、小号\r\n *\r\n */\r\n\r\n\r\nimport React, { Component } from 'react';\nimport { InputNumber } from 'tinper-bee';\r\n\r\n\r\nclass Demo11 extends Component {\r\n    render () {\r\n        return (\r\n            <div>\r\n                <InputNumber\r\n                    size='lg'\r\n                    iconStyle=\"one\"\r\n                    min={-999999}\r\n                    max={999999}\r\n                />\r\n                <br/>\r\n                <InputNumber\r\n                    size='sm'\r\n                    iconStyle=\"one\"\r\n                    min={-999999}\r\n                    max={999999}\r\n                />\r\n                <br/>\r\n                <InputNumber\r\n                    size='lg'\r\n                    min={-999999}\r\n                    max={999999}\r\n                />\r\n                <br/>\r\n                <InputNumber\r\n                    size='sm'\r\n                    min={-999999}\r\n                    max={999999}\r\n                />\r\n            </div>\r\n        )\r\n    }\r\n}\r\n\r\nexport default Demo11;","desc":" size=\"md\" / \"lg\" / \"sm\" 分别表示中号(默认)、大号、小号"},{"example":<Demo12 />,"title":" 多格式组件","code":"/**\r\n *\r\n* @title 多格式组件\r\n * @description 自定义 format ，支持格式自定义\r\n *  \r\n */\r\n\r\nimport React, { Component } from 'react';\nimport { InputNumber } from 'tinper-bee';\r\n\r\n\r\nclass Demo12 extends Component {\r\n    constructor(props) {\r\n        super(props);\r\n        this.state = {\r\n            value:0\r\n        }\r\n    }\r\n\r\n    handleChange = (value) => {\r\n        console.log(value);\r\n        this.setState({\r\n            value: value\r\n        })\r\n    }\r\n    render () {\r\n        return (\r\n            <div className=\"demo12\">\r\n                销售价格:\r\n                <InputNumber\r\n                    iconStyle=\"one\"\r\n                    // precision={2}\r\n                    // min={-10}\r\n                    // max={10}\r\n                    onFocus={(value,e)=>{\r\n                        console.log(value+\"  ==== \",e);\r\n                        this.setState({\r\n                            value\r\n                        })\r\n                    }}\r\n                    onBlur={(value,e)=>{\r\n                        console.log(\"  ==== \",e);\r\n                        // this.setState({\r\n                        //     value\r\n                        // })\r\n                    }}\r\n                    // precision={8}\r\n                    step={1} \r\n                    format={value => ` ${value} 千克`.replace(/\\B(?=(\\d{3})+(?!\\d))/g, ':')}\r\n                    value={this.state.value}\r\n                />\r\n\r\n                {/* 销售占比:\r\n                <InputNumber\r\n                    iconStyle=\"one\" \r\n                    format={value => `${value} %`}\r\n                    value={this.state.value}\r\n                /> */}\r\n            </div>\r\n        )\r\n    }\r\n}\r\n\r\nexport default Demo12;","desc":" 自定义 format ，支持格式自定义"}]


class Demo extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: false
        }
    }
    handleClick=()=> {
        this.setState({ open: !this.state.open })
    }
    fCloseDrawer=()=>{
        this.setState({
            open: false
        })
    }

    render () {
        const { title, example, code, desc, scss_code  } = this.props;

        const header = (
            <div>
                <p className='component-title'>{ title }</p>
                <p>{ desc }</p>
                <span className='component-code' onClick={this.handleClick}> 查看源码 <i className='uf uf-arrow-right'/> </span>
            </div>
        );
        return (
            <Col md={12} id={title.trim()} className='component-demo'>
            <Panel header={header}>
                {example}
            </Panel>
           
            <Drawer className='component-drawerc' title={title} show={this.state.open} placement='right' onClose={this.fCloseDrawer}>
            <div className='component-code-copy'> JS代码 
                <Clipboard action="copy" text={code}/>
            </div>
            <pre className="pre-js">
                <code className="hljs javascript">{ code }</code>
            </pre >
            {!!scss_code ?<div className='component-code-copy copy-css'> SCSS代码 
                <Clipboard action="copy" text={scss_code}/>
            </div>:null }
                { !!scss_code ? <pre className="pre-css">
                 <code className="hljs css">{ scss_code }</code>
                 </pre> : null }
            </Drawer>
        </Col>
    )
    }
}

class DemoGroup extends Component {
    constructor(props){
        super(props)
    }
    render () {
        return (
            <Row>
            {DemoArray.map((child,index) => {

                return (
            <Demo example= {child.example} title= {child.title} code= {child.code} scss_code= {child.scss_code} desc= {child.desc} key= {index}/>
    )

    })}
    </Row>
    )
    }
}

ReactDOM.render(<DemoGroup/>, document.getElementById('tinperBeeDemo'));
