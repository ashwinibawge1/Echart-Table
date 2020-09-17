import React from 'react';
import './App.css';
import { Table, Input } from "antd";
import 'antd/dist/antd.css';
import _ from 'lodash';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactEcharts from 'echarts-for-react';
import echart from 'echarts/lib/echarts';
const columns = [
    {
        title: "RISK CATEGORY",
        dataIndex: "category",
        key: "category",
        render: (value) => { return <span style={{ "color": "#108ee9" }}>{value}</span> },
        sorter: (a, b) => a.category.localeCompare(b.category) // Add Sort to Table
    },
    {
        title: "IMPACT",
        dataIndex: "impactPercent",
        key: "impactPercent",
        render: (value) => { return <span>{value}</span>; }
    },
    {
        title: "OCCURENCES",
        dataIndex: "occurences",
        key: "occurences",
        render: (value) => { return <span>{value}</span>; }
    },
    {
        title: "HIGH",
        dataIndex: "high",
        key: "high",
        render: (value) => { return <span>{value}</span>; }
    },
    {
        title: "MEDIUM",
        dataIndex: "medium",
        key: "medium",
        render: (value) => { return <span>{value}</span>; }
    },
    {
        title: "LOW",
        dataIndex: "low",
        key: "low",
        render: (value) => { return <span>{value}</span>; }
    }
]
const option = {
    title: {
        text: 'Timeline Details',
        subtext: '',
        left: 'left',
        padding: [5, 10]
    },
    responsive: true,
    tooltips: { enabled: false },
    hover: { mode: null },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        data: ['Data Exfilteration', 'Insider Threats', 'Compromised Users', 'Compromised Endpoints'],
        paddingTop: '40px',
        textStyle: {
            fontSize: '10',
        },
        itemStyle: {
            'cursor': 'default'
        },
        left: 'left',
        bottom: 0,
        orient: 'horizontal'
    },
    grid: {
        left: '4%',
        right: '2%',
        bottom: '15%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        data: ['12/1', '12/2', '12/3', '12/4', '12/5', '12/6', '12/4', '12/5', '12/6', '12/6']
    },
    yAxis: {
        type: 'value',
        name: 'No of occurences',
    },
    series: [
        {
            name: 'Data Exfilteration',
            type: 'bar',
            stack: 'false',
            label: {
                show: false,
                position: 'insideRight'
            },
            data: [40, 51, 21, 78, 26, 19, 71, 3, 94, 83],
            itemStyle: { color: '#BCD1DA' },
            barWidth: 30,
            states: { hover: { enabled: false } },
        },
        {
            name: 'Insider Threats',
            type: 'bar',
            stack: 'false',
            label: {
                show: false,
                position: 'insideRight'
            },
            data: [39, 42, 16, 63, 1, 15, 44, 1, 19, 40],
            itemStyle: { color: '#286581' },
            barWidth: 30,
        },
        {
            name: 'Compromised Users',
            type: 'bar',
            stack: 'false',
            label: {
                show: false,
                position: 'insideRight'
            },
            data: [1, 9, 5, 15, 25, 4, 27, 2, 75, 43],
            itemStyle: { color: '#B4F9FB' },
            barWidth: 30,
        },
        {
            name: 'Compromised Endpoints',
            type: 'bar',
            stack: 'false',
            label: {
                show: false,
                position: 'insideRight'
            },
            data: [31, 69, 87, 61, 31, 97, 46, 76, 51, 34],
            itemStyle: { color: '#0879AD' },
            barWidth: 30,
        }
    ]
};
class App extends React.Component {
    constructor() {
        super();
        this.state = {
            WindowSize: window.innerWidth,
            options: option.legend.data,
            data: [
                {
                    "category": "Data Exfilteration",
                    "high": 0,
                    "medium": 2,
                    "low": 5,
                    "impactPercent": 5,
                    "occurences": 1536
                },
                {
                    "category": "Insider Threats",
                    "high": 15,
                    "medium": 3,
                    "low": 1,
                    "impactPercent": 42,
                    "value": 831
                },
                {
                    "category": "Compromised Users",
                    "high": 41,
                    "medium": 6,
                    "low": 1,
                    "impactPercent": 17,
                    "value": 705
                },
                {
                    "category": "Compromised Endpoints",
                    "high": 8,
                    "medium": 2,
                    "low": 9,
                    "impactPercent": 31,
                    "value": 1544
                }
            ],
            category: "",
            filteredData: [
                {
                    "category": "Data Exfilteration",
                    "high": 0,
                    "medium": 2,
                    "low": 5,
                    "impactPercent": 5,
                    "occurences": 1536
                },
                {
                    "category": "Insider Threats",
                    "high": 15,
                    "medium": 3,
                    "low": 1,
                    "impactPercent": 42,
                    "value": 831
                },
                {
                    "category": "Compromised Users",
                    "high": 41,
                    "medium": 6,
                    "low": 1,
                    "impactPercent": 17,
                    "value": 705
                },
                {
                    "category": "Compromised Endpoints",
                    "high": 8,
                    "medium": 2,
                    "low": 9,
                    "impactPercent": 31,
                    "value": 1544
                }
            ]
        }
    }
// Add Search to Table
    onChange = (field, value) => {
        if (field === "") {
            this.setState({
                filteredData: this.state.data,
                category: ""
            });
        } else {
            let category = (field === "category") ? value : (this.state.category);
            let filteredData = (!_.isEmpty(category)) ? this.state.data.filter(p => p.category.toLowerCase().includes(category.toLowerCase())) : this.state.data;
            this.setState({
                [field]: value,
                filteredData: filteredData
            });
        }
    };
// Advanced] Connect table and chart – on disabling a series on chart , that row should be removed from table as well
    onChartLegendselectchanged = (param) => {
        const identifiers = Object.keys(param.selected)
        const active = identifiers.filter(function (id) {
            return param.selected[id]
        });
        let filteredData = (!_.isEmpty(active)) ? this.state.data.map(p =>
            active.map(a => (p.category.toLowerCase() === a.toLowerCase()) ? p : undefined).filter(notUndefined => notUndefined !== undefined)
        ) : this.state.data;
        let value = [];
        // eslint-disable-next-line array-callback-return
        filteredData.filter(r => {
            if (!_.isEmpty(r)) {
                value.push(r[0]);
            }
        });
        value = value.filter(notUndefined => notUndefined !== undefined);
        this.setState({
            filteredData: value
        });
    }
    render() {
        let onEvents = {
            'legendselectchanged': this.onChartLegendselectchanged
        }
        return (
            <div className="container" style={{ marginTop: "20px" }}>
                <div className="row">
                    <div className="col-md-6">
                        <ReactEcharts
                            style={{ width: "100%", height: "500px" }}
                            option={option}
                            echarts={echart}
                            notMerge={true}
                            lazyUpdate={true}
                            theme={"theme_name"}
                            onEvents={onEvents}
                            opts={option} />
                    </div>
                    <div className="col-md-6">
                        <div className="col-md-6" style={{ paddingBottom: "10px" }}>
                            <Input
                                type="text"
                                onChange={(e) => this.onChange("category", e.target.value)}
                                placeholder="Search By category"
                                size="large"
                                value={this.state.category}
                            />
                        </div>
                        <Table columns={columns}
                            rowKey={record => (record) ? record.category : ""}
                            dataSource={this.state.filteredData}
                            pagination={false}
                            onChange={this.handleTableChange}
                            bordered
                        /></div>
                </div>
            </div>
        )
    }
}
export default App;