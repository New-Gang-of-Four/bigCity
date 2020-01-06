import React from 'react';
import ReactEcharts from "echarts-for-react";
class Chart extends React.Component {
  constructor(){
    super()
    this.state={
      option: {
        color: ['#3398DB'],
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: ['90分以上', '80分以上', '70分以上', '60分以上', '不及格'],
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: '直接访问',
                type: 'bar',
                barWidth: '60%',
                data: [10, 52, 200, 334, 390, 330, 220]
            }
        ]
    }
    
    }
  }
  render(){
    let {option}=this.state
  return (
    <div>
    <ReactEcharts option={option}></ReactEcharts>
    </div>
  );
}
}
export default Chart;