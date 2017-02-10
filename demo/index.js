
import { Con, Row, Col } from 'bee-layout';
import { Panel } from 'bee-panel';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Button from 'bee-button';
import InputNumber from '../src';


const CARET = <i className="uf uf-arrow-down"></i>;

const CARETUP = <i className="uf uf-arrow-up"></i>;


/**
*
* @title 这是标题
* @description 这是描述
*
*/
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
        <span>{ this.state.value }</span>
    </div>
)
}
}
/**
*
* @title 这是标题
* @description 自定义max=12,min=5,step=2
*
*/
class Demo2 extends Component {
	render () {
		return (
			<InputNumber max={12} min={5} step={2}/>
		)
	}
}var DemoArray = [{"example":<Demo1 />,"title":" 这是标题","code":"/**\r\n*\r\n* @title 这是标题\r\n* @description 这是描述\r\n*\r\n*/\r\nclass Demo1 extends Component {\r\n    constructor(props){\r\n        super(props);\r\n        this.state = {\r\n            value: 5\r\n        }\r\n        this.handleChange = this.handleChange.bind(this);\r\n    }\r\n    handleChange (value) {\r\n        console.log(\"----\" + value);\r\n        this.setState({\r\n            value: value\r\n        })\r\n    }\r\nrender () {\r\nreturn (\r\n    <div>\r\n        <InputNumber value={this.state.value} onChange={ this.handleChange }/>\r\n        <span>{ this.state.value }</span>\r\n    </div>\r\n)\r\n}\r\n}\r\n","desc":" 这是描述"},{"example":<Demo2 />,"title":" 这是标题","code":"/**\r\n*\r\n* @title 这是标题\r\n* @description 自定义max=12,min=5,step=2\r\n*\r\n*/\r\nclass Demo2 extends Component {\r\n\trender () {\r\n\t\treturn (\r\n\t\t\t<InputNumber max={12} min={5} step={2}/>\r\n\t\t)\r\n\t}\r\n}","desc":" 自定义max=12,min=5,step=2"}]


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
