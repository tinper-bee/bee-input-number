import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Con, Row, Col } from 'bee-layout';
import { Panel } from 'bee-panel';
import Drawer from 'bee-drawer';
import Clipboard from 'bee-clipboard'; 
import Button from '../src';



var Demo12 = require("./demolist/Demo12");var DemoArray = [{"example":<Demo12 />,"title":" 多格式组件","code":"/**\n *\n* @title 多格式组件\n * @description 自定义 format ，支持格式自定义\n *  \n */\n\nimport React, { Component } from 'react';\nimport { InputNumber } from 'tinper-bee';\n\nclass Demo12 extends Component {\n    constructor(props) {\n        super(props);\n        this.state = {\n            value:'-100000.031416'\n        }\n    }\n\n    handleChange = (value) => {\n        console.log(value);\n        this.setState({\n            value: value\n        })\n    }\n    render () {\n        return (\n            <div className=\"demo12\">\n                销售价格:\n                <InputNumber\n                    iconStyle=\"one\"\n                    // precision={2}\n                    // min={-9007199254740990}\n                    // max={9007199254740990}\n                    onFocus={(value,e)=>{\n                        console.log(value+\"  ==== \",e);\n                        this.setState({\n                            value\n                        })\n                    }}\n                    onBlur={(value,e)=>{\n                        console.log(\"  ==== \",e);\n                        // this.setState({\n                        //     value\n                        // })\n                    }}\n                    step={1} \n                    format={value => ` ${value} 千克`.replace(/\\B(?=(\\d{3})+(?!\\d))/g, ',')}\n                    value={this.state.value}\n                />\n\n                {/* 销售占比:\n                <InputNumber\n                    iconStyle=\"one\" \n                    format={value => `${value} %`}\n                    value={this.state.value}\n                /> */}\n            </div>\n        )\n    }\n}\n\n","desc":" 自定义 format ，支持格式自定义"}]


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
