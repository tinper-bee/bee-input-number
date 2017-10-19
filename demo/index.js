
import { Con, Row, Col } from 'bee-layout';
import { Panel } from 'bee-panel';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Button from 'bee-button';
import InputNumber from '../src';


const CARET = <i className="uf uf-arrow-down"></i>;

const CARETUP = <i className="uf uf-arrow-up"></i>;


var Demo1 = require("./demolist/Demo1");var Demo2 = require("./demolist/Demo2");var Demo3 = require("./demolist/Demo3");var DemoArray = [{"example":<Demo1 />,"title":" 这是标题","code":"/**\n*\n* @title 这是标题\n* @description 这是描述\n*\n*/\n\n\nimport React, { Component } from 'react';\nimport InputNumber from 'bee-input-number';\n\nclass Demo1 extends Component {\n    constructor(props){\n        super(props);\n        this.state = {\n            value: 5\n        }\n        this.handleChange = this.handleChange.bind(this);\n    }\n    handleChange (value) {\n        console.log(\"----\" + value);\n        this.setState({\n            value: value\n        })\n    }\nrender () {\nreturn (\n    <div>\n        <InputNumber value={this.state.value} onChange={ this.handleChange }/>\n    </div>\n)\n}\n}\n\n","desc":" 这是描述"},{"example":<Demo2 />,"title":" 这是标题","code":"/**\n*\n* @title 这是标题\n* @description 自定义max=12,min=5,step=2\n*\n*/\n\nimport React, { Component } from 'react';\nimport InputNumber from 'bee-input-number';\n\nclass Demo2 extends Component {\n\trender () {\n\t\treturn (\n\t\t\t<InputNumber max={12} min={5} step={2}/>\n\t\t)\n\t}\n}\n\n","desc":" 自定义max=12,min=5,step=2"},{"example":<Demo3 />,"title":" 这是标题","code":"/**\n*\n* @title 这是标题\n* @description 自定义max=12,min=5,step=2\n*\n*/\n\nimport React, { Component } from 'react';\nimport InputNumber from 'bee-input-number'; \n\nclass Demo3 extends Component {\n\trender () {\n\t\treturn (\n\t\t\t<InputNumber iconStyle=\"one\" max={12} min={5} step={2}/>\n\t\t)\n\t}\n}\n\n","desc":" 自定义max=12,min=5,step=2"}]


class Demo extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: false
        }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.setState({ open: !this.state.open })
    }

    render () {
        const { title, example, code, desc  } = this.props;
        let caret = this.state.open ? CARETUP : CARET;
        let text = this.state.open ? "隐藏代码" : "查看代码";

        const footer = (
            <Button shape="block" onClick={ this.handleClick }>
                { caret }
                { text }
            </Button>
        );
        return (
            <Col md={12} >
                <h3>{ title }</h3>
                <p>{ desc }</p>
                <Panel collapsible expanded={ this.state.open } colors='bordered' header={ example } footer={footer} footerStyle = {{padding: 0}}>
                    <pre><code className="hljs javascript">{ code }</code></pre>
                </Panel>
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
                            <Demo example= {child.example} title= {child.title} code= {child.code} desc= {child.desc} key= {index}/>
                        )

                    })}
                </Row>
        )
    }
}

ReactDOM.render(<DemoGroup/>, document.getElementById('tinperBeeDemo'));
