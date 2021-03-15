import React from "react";
import "./QuantificationPage.css"
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import moment from 'moment';
import 'moment/locale/zh-cn';

let host = "http://127.0.0.1:8000";
// let host = "http://118.25.41.14:8091";

class QuantificationPage extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='QuantificationPage'>
                <span>
                    <h2>量化小平台</h2>
                    <SelectorTool />
                </span>
            </div>
        )
    }
}

class SelectorTool extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ts: new Date().getTime(),
            selector_list: [],
            current_selector: "",
            launched: false,
            launched_id: 0,
            result: [],
        };
        this.dateOnChange = this.dateOnChange.bind(this);
        this.getSelectors = this.getSelectors.bind(this);
        this.changeSelector = this.changeSelector.bind(this);
        this.launchSelectors = this.launchSelectors.bind(this);
        this.getResults = this.getResults.bind(this);
        this.getSelectors()
    }

    dateOnChange(e) {
        this.setState({
            ts: e.valueOf()/1000
        });
    }

    async getSelectors() {
        try {
            let uri = "/selector/get_selectors";
            let response = await fetch(host+uri);
            let map = await response.json();
            this.setState({
                selector_list: map['result']
            })
        } catch(e) {
            console.log("Oops, error", e);
        }
    }

    async launchSelectors() {
        try {
            let uri = "/selector/launch";
            let response = await fetch(host+uri, {
                method: 'POST',
                body: JSON.stringify({
                    "name": this.state.current_selector,
                    "ts": this.state.ts,
                })
            });
            let map = await response.json();
            this.setState({
                launch_id: map['result'],
                launched: true
            })

        } catch (e) {
            console.log("Oops, error", e);
        }
    }

    async getResults() {
        try {
            let uri = "/selector/get_result";
            let response = await fetch(host+uri, {
                method: 'POST',
                body: JSON.stringify({
                    "id": this.state.launch_id
                })
            });
            let map = await response.json();
            this.setState({
                result: map['result']
            });
        } catch (e) {
            console.log("Oops, error", e);
        }
    }

    changeSelector(e) {
        this.setState({
            current_selector: e.target.value
        })
    }

    renderResult() {
        if (this.state.launched) {
            return "正在运行中，请稍等..."
        } else if (this.state.result.length > 0) {
            return this.state.result.map(code => {
                return <p>{code}</p>
            })
        } else {
            return "尚未运行"
        }
    }
    componentDidMount(){
        this.timer=setInterval(()=>{ // 轮询
            if (this.state.launched) {
                this.getResults();
                let r = this.state.result;
                if (r.length > 0) {
                    this.setState({
                        launched: false,
                    })
                }
            }
        },1000)
    }

    componentWillUnmount(){
        if(this.timer !== null) {
            clearInterval(this.timer);
        }
    }

    render() {
        return (
            <div className='SelectorTool'>
                <span>
                    <h3>选股小工具</h3>
                    时间: <Datetime locale="zh-cn" dateFormat="YYYY-MM-DD" timeFormat={false} onChange={this.dateOnChange}/>
                    <br/>
                    选股策略:
                    <select onChange={this.changeSelector}>
                        <option value={"未选择"}>未选择</option>
                        {
                            this.state.selector_list.map(selector => {
                                return <option value={selector}>{selector}</option>
                            })
                        }
                    </select>
                    <button name={"launch"} onClick={this.launchSelectors} disabled={this.state.launched}>运行</button>
                    <br/>
                    <br/>
                    结果:
                    <br/>
                    {this.renderResult()}
                </span>
            </div>
        )
    }
}

export default QuantificationPage;