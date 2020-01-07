import React from 'react';
import ReactEcharts from "echarts-for-react";
class Chart extends React.Component {
  constructor(){
    super()
    this.state={
      option:{
        title: {
            text: '学生成绩占比',
            subtext: '学生占比',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['90分以上', '80分以上', '70分以上', '60分以上', '不及格']
        },
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: '80%',
                center: ['50%', '60%'],
                data: [
                    {value: 335, name: '90分以上'},
                    {value: 310, name: '80分以上'},
                    {value: 234, name: '70分以上'},
                    {value: 135, name: '60分以上'},
                    {value: 1548, name: '不及格'}
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
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