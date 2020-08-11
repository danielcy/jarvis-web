import React from "react";
import moment from "moment";
import ReactEcharts from 'echarts-for-react';
import './StockPage.css'

let upColor = '#ec0000';
let downColor = '#00da3c';

let dataUrl = "https://ali-stock.showapi.com/realtime-k?";
let appCode = "APPCODE 9b138b2dbe0f4ee0a6ec170a0b77ac0e";

export default class StockPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            code: this.loadStorage("code") !== null &&  this.loadStorage("code") !== "" ? this.loadStorage("code") : "000636",
            times: [],
            valueList: [],
            ma5: [],
            ma10: [],
            ma20: [],
            ma30: [],
            kTitle: "未知",
            type: "day"
        };
        this.getData(this.state.code, this.state.type);
        this.changeCode = this.changeCode.bind(this)
        this.changeType = this.changeType.bind(this)
    }

    loadStorage(key) {
        let storage=window.localStorage;
        if (storage.hasOwnProperty(key)) {
            console.log(key + ":" + storage[key]);
            return storage[key]
        }
        return null;
    }

    saveStorage(key, value) {
        let storage=window.localStorage;
        storage[key] = value
    }

    getTimes(kList) {
        let times = [];
        kList.forEach((raw) => {
            times.push(raw["time"])
        });
        return times.reverse();
    }

    getValueList(kList) {
        let list = [];
        kList.forEach((raw) => {
            list.push([
                parseFloat(raw["open"]),
                parseFloat(raw["close"]),
                parseFloat(raw["min"]),
                parseFloat(raw["max"])])
        });
        return list.reverse();
    }

    calculateMA(kList, dayCount) {
        let result = [];
        let valueList = this.getValueList(kList);
        for (let i = 0, len = valueList.length; i < len; i++) {
            if (i < dayCount) {
                result.push('-');
                continue;
            }
            let sum = 0;
            for (let j = 0; j < dayCount; j++) {
                sum += valueList[i - j][1];
            }
            result.push(sum / dayCount);
        }
        return result;
    }

    getTimeByType(type) {
        if (type === "week") {
            return moment().add("year", -1).format("yyyyMMDD");
        }
        if (type === "month") {
            return moment().add("year", -2).format("yyyyMMDD");
        }
        return moment().add("month", -6).format("yyyyMMDD");
    }

    async getData(code, type) {
        try {
            let begin = this.getTimeByType(type);
            let response = await fetch(dataUrl+"beginDay="+begin+"&code="+code+"&time="+type,
                {headers:{"Authorization":appCode}});
            let map = await response.json();
            let kList = map["showapi_res_body"]["dataList"];
            this.setState({
                times: this.getTimes(kList),
                valueList: this.getValueList(kList),
                ma5: this.calculateMA(kList, 5),
                ma10: this.calculateMA(kList, 10),
                ma20: this.calculateMA(kList, 20),
                ma30: this.calculateMA(kList, 30),
                kTitle: map["showapi_res_body"]["name"]
            });
        } catch(e) {
            console.log("Oops, error", e);
        }
    }

    changeCode(e) {
        this.setState({
            code: e.target.value
        });
        this.saveStorage("code", e.target.value);
        this.getData(e.target.value, this.state.type)
    }

    changeType(e) {
        this.setState({
            type: e.target.value
        });
        this.getData(this.state.code, e.target.value)
    }

    render(){
        return(
            <div className="StockPage">
                <div className='StockDetail'>
                    <div className="StockCodeInput">
                        股票代码 <input onBlur={this.changeCode} type='text'/>
                        <label><input name="timeType" type="radio" value="day" onClick={this.changeType} defaultChecked="checked"/>日K </label>
                        <label><input name="timeType" type="radio" value="week" onClick={this.changeType}/>周K </label>
                        <label><input name="timeType" type="radio" value="month" onClick={this.changeType}/>月K </label>
                    </div>
                    <div className="ChartColumn">
                        <ReactEcharts className="StockChart" option={this.getOption()} style={{height:'60vh',width:'100vh'}} theme="Imooc"/>
                    </div>
                    <div className="DataColumn">lalala</div>
                </div>
            </div>
        )
    }

    getOption =()=> {
        let option = {
            title: {
                text: this.state.kTitle,
                left: 0
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross'
                }
            },
            legend: {
                data: ['K', 'MA5', 'MA10', 'MA20', 'MA30']
            },
            grid: {
                left: '10%',
                right: '10%',
                bottom: '15%'
            },
            xAxis: {
                type: 'category',
                data: this.state.times,
                scale: true,
                boundaryGap: false,
                axisLine: {onZero: false},
                splitLine: {show: false},
                splitNumber: 20,
                min: 'dataMin',
                max: 'dataMax'
            },
            yAxis: {
                scale: true,
                splitArea: {
                    show: true
                }
            },
            dataZoom: [
                {
                    type: 'inside',
                    start: 50,
                    end: 100,
                },
                {
                    show: true,
                    type: 'slider',
                    top: '90%',
                    start: 50,
                    end: 100
                }
            ],
            series: [
                {
                    name: 'K',
                    type: 'candlestick',
                    data: this.state.valueList,
                    itemStyle: {
                        color: 'rgba(0,0,0,0)',
                        color0: 'rgba(0,0,0,0)',
                        borderColor: upColor,
                        borderColor0: downColor,
                        borderWidth:1.15
                    },
                    markPoint: {
                        label: {
                            normal: {
                                formatter: function (param) {
                                    return param != null ? Math.round(param.value) : '';
                                }
                            }
                        },
                        data: [
                            {
                                name: 'highest value',
                                type: 'max',
                                valueDim: 'highest'
                            },
                            {
                                name: 'lowest value',
                                type: 'min',
                                valueDim: 'lowest'
                            },
                            {
                                name: 'average value on close',
                                type: 'average',
                                valueDim: 'close'
                            }
                        ],
                        tooltip: {
                            formatter: function (param) {
                                return param.name + '<br>' + (param.data.coord || '');
                            }
                        }
                    },
                    markLine: {
                        symbol: ['none', 'none'],
                        data: [
                            [
                                {
                                    name: 'from lowest to highest',
                                    type: 'min',
                                    valueDim: 'lowest',
                                    symbol: 'circle',
                                    symbolSize: 10,
                                    label: {
                                        show: false
                                    },
                                    emphasis: {
                                        label: {
                                            show: false
                                        }
                                    }
                                },
                                {
                                    type: 'max',
                                    valueDim: 'highest',
                                    symbol: 'circle',
                                    symbolSize: 10,
                                    label: {
                                        show: false
                                    },
                                    emphasis: {
                                        label: {
                                            show: false
                                        }
                                    }
                                }
                            ],
                            {
                                name: 'min line on close',
                                type: 'min',
                                valueDim: 'close'
                            },
                            {
                                name: 'max line on close',
                                type: 'max',
                                valueDim: 'close'
                            }
                        ]
                    }
                },
                {
                    name: 'MA5',
                    type: 'line',
                    data: this.state.ma5,
                    smooth: true,
                    lineStyle: {
                        opacity: 0.5
                    },
                    symbolSize: 0.5
                },
                {
                    name: 'MA10',
                    type: 'line',
                    data: this.state.ma10,
                    smooth: true,
                    lineStyle: {
                        opacity: 0.5
                    },
                    symbolSize: 0.5
                },
                {
                    name: 'MA20',
                    type: 'line',
                    data: this.state.ma20,
                    smooth: true,
                    lineStyle: {
                        opacity: 0.5
                    },
                    symbolSize: 0.5
                },
                {
                    name: 'MA30',
                    type: 'line',
                    data: this.state.ma30,
                    smooth: true,
                    lineStyle: {
                        opacity: 0.5
                    },
                    symbolSize: 0.5
                },

            ]
        };
        return option
    }
}