import React from "react";
import "./GubangPage.css"

let listAllUrl = "https://admin.gbhome.com/api/v4/common/3in1/discovery?pageSize=10";
let zlColorMap = {
    "独家研报": "tomato",
    "游资锦囊": "slateblue",
    "股帮研究院": "gold"
};
let token = "Bearer eyJhbGciOiJIUzUxMiJ9.eyJ3eFVzZXJJZCI6MTA3NDk5NSwic3ViIjoiMTA3NDk5NSIsIm1vYmlsZVBob25lIjoiMTM0ODI4OTI2MTIiLCJjaGFubmVsIjoiUEMiLCJleHAiOjE1OTkzOTIwMDcsImlhdCI6MTU5NjgwMDAwN30.aLbphPZ1oz-CO9DfEFQJi1PllA0iOw58zG2rk43pP7lRXgZtZVwsyOGbm_rH6SYoHJfN-WWCQKvtENx6gLueqQ";

class GubangPage extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='GubangPage'>
                <h2>股帮，预期差就是生产力</h2>
                <div className="SubPage">
                    <GubangInfoList />
                </div>
            </div>
        )
    }
}

class GubangInfoList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            page: 1,
            totalPages: 0,
            needPre: false,
            needNext: true,
            renderDetail: false,
            detailData: {}
        };
        this.getList(this.state.page)
    }

    async getList(pageNum) {
        try {
            let response = await fetch(listAllUrl+"&pageNum="+pageNum);
            let map = await response.json();
            this.setState({data: map["data"]["records"]});
            this.setState({totalPages: map["pages"]})
        } catch(e) {
            console.log("Oops, error", e);
        }
    }

    renderList() {
        var listElements=[];
        this.state.data.forEach((record)=>{
            let content = record["content"] === "" ? record["summary"]: record["content"];
            listElements.push(
                <p>
                    {record["title"]}<sub style={{color: zlColorMap[record["zlName"]]}}>{record["zlName"]}</sub><br/>
                    <div className='Snapshot'>
                        {content}
                        <button onClick={() => this.clickDetail(record["type"], record["subjectId"])}>详情</button>
                        <br/>
                    </div>
                </p>
            )
        });
        return listElements;
    }

    async clickDetail(type, id) {
        try {
            let response = await fetch("https://admin.gbhome.com/api/common/" + type + "/detail/" + id, {headers:{"authorization":token}});
            let map = await response.json();
            this.setState({
                detailData: map["data"],
                renderDetail: true
            })
        } catch(e) {
            console.log("Oops, error", e);
        }
    }

    backToList() {
        this.setState({
            renderDetail: false
        })
    }

    renderDetail() {
        let details = [];
        details.push(<button className="BackButton" onClick={() => this.backToList()}>{"<"}返回</button>);
        if (this.state.detailData.hasOwnProperty("zlArticle")) {
            details.push(<div dangerouslySetInnerHTML={{__html: this.state.detailData["zlArticle"]["detail"]}}/>);
        } else if (this.state.detailData.hasOwnProperty("zlTrendsDto")) {
            details.push(<div>{this.state.detailData["zlTrendsDto"]["content"]}</div>)
        } else if (this.state.detailData.hasOwnProperty("zlQuestion")) {
            details.push(<div>
                <h2>{this.state.detailData["zlQuestion"]["detail"]}</h2>
                <p>{this.state.detailData["zlAnswersDtoPage"]["records"][0]["content"]}</p>
            </div>)
        }
        details.push(<button className="BackButton" onClick={() => this.backToList()}>{"<"}返回</button>);
        return (
            details
        )
    }

    nextPage() {
        let curPage = this.state.page + 1;
        this.setState({
            page: curPage
        });
        this.getList(curPage);
        this.refreshPageChanger(curPage)
    }

    prePage() {
        let curPage = this.state.page - 1;
        this.setState({
            page: curPage
        });
        this.getList(curPage);
        this.refreshPageChanger(curPage)
    }

    refreshPageChanger(curPage) {
        if (curPage === 1) {
            this.setState({needPre: false})
        } else {
            this.setState({needPre: true})
        }
    }

    renderPageChanger() {
        let result = [];
        if (this.state.needPre) {
            result.push(<button className="PageButton" onClick={() => this.prePage()}>上一页</button>)
        }
        if (this.state.needNext) {
            result.push(<button className="PageButton" onClick={() => this.nextPage()}>下一页</button>)
        }
        return result
    }

    render() {
        if (this.state.renderDetail) {
            return (
                <div className="PageDetail">
                    {this.renderDetail()}
                </div>
            )
        }
        return (
            <div>
                <button className="BackButton" onClick={() => this.getList(this.state.page)}>刷新</button>
                {this.renderList()}
                <div>
                    [第{this.state.page}页] {this.renderPageChanger()}
                </div>
            </div>
        );
    }
}

export default GubangPage;