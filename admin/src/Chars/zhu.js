import React from 'react';
import ReactEcharts from "echarts-for-react";
import axios from '../Utils/axios'
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
            // left: '3%',
            // right: '4%',
            bottom: '1%',
            containLabel: true
        },
        
        xAxis: [
            {
                type: 'category',
                data: ['及格', '优秀', '不及格', '良好'],
                axisTick: {
                    // alignWithLabel: true
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
                barWidth: '30%',
                data: [],
                label: {
                  normal: {
                      // show: true,
                      textStyle: {
                          fontSize: 18
                      }
                  }
                }

            }
        ]
    }
  
    }
  }
  componentDidMount(){
    console.log(this.state.option.series[0].data)
    let token=JSON.parse(localStorage.getItem('token')) 
    let  url='http://39.99.236.159:3003/v1/admin/grade/getGradesByType'
     axios.post(url, {
       token:token.data, 
       page:1,
       pageSize:2,
       gradeType:'及格',
     })
     .then((response)=>{
      let option = JSON.parse(JSON.stringify(this.state.option ))
      option.series[0].data.push(response.list.allCount)
      this.setState({option})
            axios.post(url, {
              token:token.data, 
              page:1,
              pageSize:2,
              gradeType:'优秀',
            })
            .then((response1)=>{
            let option = JSON.parse(JSON.stringify(this.state.option ))
            option.series[0].data.push(response1.list.allCount)
            this.setState({option})
                    axios.post(url, {
                      token:token.data, 
                      page:1,
                      pageSize:2,
                      gradeType:'不及格',
                    })
                    .then((response2)=>{
                    let option = JSON.parse(JSON.stringify(this.state.option ))
                    option.series[0].data.push(response2.list.allCount)
                     this.setState({option})
                            axios.post(url, {
                              token:token.data, 
                              page:1,
                              pageSize:2,
                              gradeType:'良好',
                            })
                            .then((response3)=>{
                            let option = JSON.parse(JSON.stringify(this.state.option ))
                            option.series[0].data.push(response3.list.allCount)
                            this.setState({option})
                            console.log(option.series[0].data)
                            })
                            .catch((error)=>{
                              console.log(error);
                            });
                    })
                    .catch((error)=>{
                      console.log(error);
                    });
            })
            .catch((error)=>{
              console.log(error);
            });
     })
     .catch((error)=>{
       console.log(error);
     });  
  

  }
  render(){
    let {option}=this.state
  return (
    <div>
    <ReactEcharts option={option} style={{marginTop:'30px',width:'800px',height:'400px',marginLeft:'250px'}}></ReactEcharts>
    </div>
  );
}
}
export default Chart;