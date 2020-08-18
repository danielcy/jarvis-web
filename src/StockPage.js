import React from "react";
import moment from "moment";
import ReactEcharts from 'echarts-for-react';
import './StockPage.css'

let upColor = '#ec0000';
let downColor = '#00da3c';

let dataUrl = "https://ali-stock.showapi.com/realtime-k?";
let appCode = "APPCODE 9b138b2dbe0f4ee0a6ec170a0b77ac0e";

let testTime = ["2020-01-02", "2020-01-03", "2020-01-09", "2020-01-10", "2020-01-13", "2020-01-14", "2020-01-15", "2020-01-16", "2020-01-17", "2020-01-20", "2020-01-22", "2020-01-23", "2020-02-03", "2020-02-04", "2020-02-06", "2020-02-07", "2020-02-10", "2020-02-11", "2020-02-12", "2020-02-13", "2020-02-14", "2020-02-17", "2020-02-19", "2020-02-20", "2020-02-21", "2020-02-24", "2020-02-25", "2020-02-27", "2020-02-28", "2020-03-02", "2020-03-03", "2020-03-04", "2020-03-06", "2020-03-09", "2020-03-10", "2020-03-11", "2020-03-12", "2020-03-13", "2020-03-16", "2020-03-18", "2020-03-19", "2020-03-20", "2020-03-23", "2020-03-24", "2020-03-25", "2020-03-26", "2020-03-27", "2020-03-31", "2020-04-01", "2020-04-03", "2020-04-07", "2020-04-09", "2020-04-10", "2020-04-13", "2020-04-14", "2020-04-16", "2020-04-17", "2020-04-20", "2020-04-21", "2020-04-22", "2020-04-23", "2020-04-28", "2020-04-29", "2020-04-30", "2020-05-06", "2020-05-07", "2020-05-08", "2020-05-12", "2020-05-14", "2020-05-15", "2020-05-20", "2020-05-21", "2020-05-25", "2020-05-26", "2020-05-27", "2020-05-28", "2020-05-29", "2020-06-01", "2020-06-02", "2020-06-04", "2020-06-08", "2020-06-10", "2020-06-11", "2020-06-12", "2020-06-15", "2020-06-17", "2020-06-19", "2020-06-22", "2020-07-06", "2020-07-08", "2020-07-09", "2020-07-10", "2020-07-13", "2020-07-14", "2020-07-15", "2020-07-16", "2020-07-17", "2020-07-20", "2020-07-21", "2020-07-23", "2020-07-24", "2020-07-27", "2020-07-28", "2020-07-29", "2020-07-30", "2020-07-31", "2020-08-03", "2020-08-05", "2020-08-12", "2020-08-14", "2020-08-14"]
let testData = [[15.82, 14.85, 15.82, 14.85], [17.03, 16.28, 17.03, 16.28], [18.48, 17.41, 18.48, 17.41], [17.84, 17.08, 17.84, 17.08], [18.04, 17.1, 18.04, 17.1], [18.25, 17.51, 18.25, 17.51], [18.75, 17.88, 18.75, 17.88], [18.26, 17.42, 18.26, 17.42], [17.79, 17.08, 17.79, 17.08], [17.53, 16.7, 17.53, 16.7], [18.35, 17.22, 18.35, 17.22], [17.65, 16.34, 17.65, 16.34], [14.71, 14.71, 14.71, 14.71], [14.43, 13.3, 14.43, 13.3], [15.07, 14.22, 15.07, 14.22], [16.17, 14.46, 16.17, 14.46], [17.16, 16.05, 17.16, 16.05], [18.2, 16.94, 18.2, 16.94], [19.25, 17.62, 19.25, 17.62], [19.4, 18.28, 19.4, 18.28], [19.77, 18.53, 19.77, 18.53], [20.35, 19.01, 20.35, 19.01], [20.79, 19.66, 20.79, 19.66], [21.65, 20.21, 21.65, 20.21], [23.4, 21.7, 23.4, 21.7], [24.64, 22.6, 24.64, 22.6], [27.1, 23.56, 27.1, 23.56], [27.89, 24.68, 27.89, 24.68], [25.83, 24.12, 25.83, 24.12], [25.07, 22.8, 25.07, 22.8], [25.45, 23.34, 25.45, 23.34], [23.31, 21.38, 23.31, 21.38], [24.2, 22.16, 24.2, 22.16], [23.55, 21.46, 23.55, 21.46], [23.3, 21.15, 23.3, 21.15], [23.34, 21.51, 23.34, 21.51], [22.32, 20.91, 22.32, 20.91], [23.95, 21.38, 23.95, 21.38], [23.32, 21.12, 23.32, 21.12], [21.6, 19.92, 21.6, 19.92], [20.87, 19.61, 20.87, 19.61], [21.17, 19.81, 21.17, 19.81], [19.49, 18.23, 19.49, 18.23], [18.69, 17.06, 18.69, 17.06], [18.89, 18.18, 18.89, 18.18], [18.59, 17.64, 18.59, 17.64], [18.15, 17.1, 18.15, 17.1], [16.95, 16.26, 16.95, 16.26], [17.78, 16.45, 17.78, 16.45], [18.35, 17.61, 18.35, 17.61], [19.38, 18.57, 19.38, 18.57], [20.14, 18.64, 20.14, 18.64], [19.21, 17.79, 19.21, 17.79], [17.56, 16.91, 17.56, 16.91], [18.25, 17.48, 18.25, 17.48], [18.95, 18.04, 18.95, 18.04], [19.45, 18.45, 19.45, 18.45], [18.88, 18.19, 18.88, 18.19], [18.62, 18.06, 18.62, 18.06], [18.7, 18.18, 18.7, 18.18], [18.58, 18.0, 18.58, 18.0], [19.37, 18.07, 19.37, 18.07], [19.53, 18.71, 19.53, 18.71], [20.65, 19.24, 20.65, 19.24], [21.68, 20.0, 21.68, 20.0], [21.85, 20.99, 21.85, 20.99], [22.9, 21.81, 22.9, 21.81], [23.65, 22.66, 23.65, 22.66], [25.83, 23.06, 25.83, 23.06], [26.58, 25.43, 26.58, 25.43], [25.5, 23.58, 25.5, 23.58], [24.08, 22.75, 24.08, 22.75], [23.49, 22.33, 23.49, 22.33], [23.85, 22.75, 23.85, 22.75], [23.58, 22.1, 23.58, 22.1], [22.58, 21.59, 22.58, 21.59], [24.75, 22.29, 24.75, 22.29], [26.85, 24.66, 26.85, 24.66], [27.95, 26.68, 27.95, 26.68], [28.85, 27.1, 28.85, 27.1], [28.27, 26.62, 28.27, 26.62], [27.37, 26.12, 27.37, 26.12], [27.24, 25.27, 27.24, 25.27], [25.73, 24.66, 25.73, 24.66], [26.1, 24.84, 26.1, 24.84], [28.09, 25.53, 28.09, 25.53], [30.06, 28.61, 30.06, 28.61], [29.99, 28.32, 29.99, 28.32], [31.18, 29.38, 31.18, 29.38], [34.19, 31.11, 34.19, 31.11], [34.33, 32.88, 34.33, 32.88], [34.8, 33.03, 34.8, 33.03], [34.35, 32.11, 34.35, 32.11], [33.47, 30.48, 33.47, 30.48], [31.48, 29.5, 31.48, 29.5], [30.48, 28.39, 30.48, 28.39], [30.4, 28.33, 30.4, 28.33], [30.97, 29.1, 30.97, 29.1], [31.99, 30.58, 31.99, 30.58], [33.0, 30.88, 33.0, 30.88], [33.54, 30.91, 33.54, 30.91], [32.98, 30.61, 32.98, 30.61], [33.8, 32.7, 33.8, 32.7], [37.1, 33.2, 37.1, 33.2], [37.35, 35.35, 37.35, 35.35], [36.69, 34.98, 36.69, 34.98], [37.69, 35.88, 37.69, 35.88], [38.8, 36.26, 38.8, 36.26], [36.98, 34.95, 36.98, 34.95], [37.9, 36.29, 37.9, 36.29], [37.26, 36.29, 37.26, 36.29]];
let biData = ["-", "-", "-", "-", "-", "-", 18.75, "-", "-", "-", "-", "-", "-", 13.3, "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", 27.89, "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", 16.26, "-", "-", "-", 20.14, "-", "-", "-", "-", "-", "-", "-", "-", 18.0, "-", "-", "-", "-", "-", "-", "-", "-", 26.58, "-", "-", "-", "-", "-", 21.59, "-", "-", "-", 28.85, "-", "-", "-", 24.66, "-", "-", "-", "-", "-", "-", "-", 34.8, "-", "-", "-", "-", 28.33, "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", 38.8, "-", "-", "-"];

export default class StockPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            code: this.loadStorage("code") !== null &&  this.loadStorage("code") !== "" ? this.loadStorage("code") : "000636",
            times: testTime,
            valueList: testData,
            ma5: [],
            ma10: [],
            ma20: [],
            ma30: [],
            kTitle: "未知",
            type: "day"
        };
        //this.getData(this.state.code, this.state.type);
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
                data: ['K', 'MA5', 'MA10', 'MA20', 'MA30', 'BI']
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
                    xAxisIndex: 0,
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
                {
                    name: 'BI',
                    type: 'line',
                    data: biData,
                    smooth: false,
                    lineStyle: {
                        opacity: 0.5
                    },
                    symbolSize: 0.5,
                    connectNulls: true
                },
            ]
        };
        return option
    }
}