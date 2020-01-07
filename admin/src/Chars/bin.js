import React from 'react';
import ReactEcharts from "echarts-for-react";
import axios from 'axios'
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
          data: ['及格', '优秀', '不及格', '良好']
      },
        series: [
          {
              name: '最受欢迎的早餐',
              type: 'pie',
              radius: ['30%','70%'],
              center: ['50%', '40%'],
              data:[{value: 20, name: '豆汁'},],
            
          }
      ]
      }
    }
  }
  componentDidMount(){
    console.log(this.state.option.series[0].data)
    let token=JSON.parse(localStorage.getItem('token')) 
    let data =[]
    let  url='http://39.99.236.159:3003/v1/admin/grade/getGradesByType'
     axios.post(url, {
       token:token.data, 
       page:1,
       pageSize:2,
       gradeType:'及格',
     })
     .then((response)=>{
      data.push({value: response.list.allCount, name: '及格'})
      let option = JSON.parse(JSON.stringify(this.state.option ))
      // option.series[0].data=data
      // this.setState({option})
      
     })
     .catch((error)=>{
       console.log(error);
     });
     axios.post(url, {
      token:token.data, 
      page:1,
      pageSize:2,
      gradeType:'优秀',
    })
    .then((response)=>{
      console.log(response)
     data.push({value: response.list.allCount, name: '优秀'})
     console.log(data)
     let option = JSON.parse(JSON.stringify(this.state.option ))
    //  option.series[0].data=data
     console.log(option.series[0].data)
    //  this.setState({option})
     
    })
    .catch((error)=>{
      console.log(error);
    });
    axios.post(url, {
      token:token.data, 
      page:1,
      pageSize:2,
      gradeType:'不及格',
    })
    .then((response)=>{
      console.log(response)
     data.push({value: response.list.allCount, name: '不及格'})
     console.log(data)
     let option = JSON.parse(JSON.stringify(this.state.option ))
    //  option.series[0].data=data
     console.log(option.series[0].data)
    //  this.setState({option})
     
    })
    .catch((error)=>{
      console.log(error);
    });
    axios.post(url, {
      token:token.data, 
      page:1,
      pageSize:2,
      gradeType:'良好',
    })
    .then((response)=>{
      console.log(response)
     data.push({value: response.list.allCount, name: '良好'})
     console.log(data)
     let option = JSON.parse(JSON.stringify(this.state.option ))
     option.series[0].data=data
     console.log(option.series[0].data)
    //  setTimeout(() => {
      this.setState({option})
    
    
     
    })
    
    .catch((error)=>{
      console.log(error);
    });

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