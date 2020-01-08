import React from 'react';
import ReactEcharts from "echarts-for-react";
import axios from 'axios'
import {getItem} from '../../src/Utils/webStorages'
class Chart extends React.Component{
  constructor(){
    super()
    this.state={
      option:{
        title: {
          text: '学生成绩汇总图',
          subtext: '',
          left: 'center'
      },
      tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
          orient: 'vertical',
          left: 'left',
          data: ['及格', '优秀', '不及格', '良好'],
          textStyle:{
            fontSize:16
          }
      },
        series: [
          {
              name: '成绩占比',
              type: 'pie',
              radius: ['30%','70%'],
              center: ['50%', '50%'],
              data:[],
              label: {
                normal: {
                    show: true,
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
    // console.log(this.state.option.series[0].data)
    // let token=JSON.parse(localStorage.getItem('token')) 
    let token=getItem('token')
    let  url='http://39.99.236.159:3003/v1/admin/grade/getGradesByType'
     axios.post(url, {
       token:token, 
       page:1,
       pageSize:2,
       gradeType:'及格',
     })
     .then((response)=>{
      // data.push({value: response.list.allCount, name: '及格'})
      let option = JSON.parse(JSON.stringify(this.state.option ))
      console.log(response.list.allCount)
      option.series[0].data.push({value: response.list.allCount, name: '及格'})
      this.setState({option})
                axios.post(url, {
                  token:token, 
                  page:1,
                  pageSize:2,
                  gradeType:'优秀',
                })
                .then((response1)=>{
                  // console.log(response)
                let option = JSON.parse(JSON.stringify(this.state.option ))
                option.series[0].data.push({value: response1.list.allCount, name: '优秀'})
                 this.setState({option})
                          axios.post(url, {
                            token:token, 
                            page:1,
                            pageSize:2,
                            gradeType:'不及格',
                          })
                          .then((response2)=>{
                          //   // console.log(response)
                          // data.push({value: response.list.allCount, name: '不及格'})
                          // console.log(data)
                          let option = JSON.parse(JSON.stringify(this.state.option ))
                          option.series[0].data.push({value: response2.list.allCount, name: '不及格'})
                          // console.log(option.series[0].data)
                           this.setState({option})
                                      axios.post(url, {
                                        token:token, 
                                        page:1,
                                        pageSize:2,
                                        gradeType:'良好',
                                      })
                                      .then((response3)=>{
                                        // console.log(response)
                                      // data.push()
                                      // console.log(data)
                                      let option = JSON.parse(JSON.stringify(this.state.option ))
                                      option.series[0].data.push({value: response3.list.allCount, name: '良好'})
                                      // console.log(option.series[0].data)
                                      this.setState({option})
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
    <ReactEcharts option={option} style={{width:'1300px',height:'500px'}}></ReactEcharts>
    </div>
  );
}
}
export default Chart;