const app = getApp()
const dateUtil = require("../../utils/date-util.js")
import * as echarts from '../../components/ec-canvas/echarts';
let page = {}
let chart3 = {}
let chart4 = {}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    riskIndex2: { 
      onInit: function(canvas, width, height, dpr) {
        chart3 = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr // new
        });
        canvas.setChart(chart3);
        chart3.setOption(getOption1([0,0,0,0],[0,0,0,0]),true,false);
        return chart3;
      }
  },
    riskTrend2: { onInit: function(canvas, width, height, dpr) {
      chart4 = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr // new
      });
      canvas.setChart(chart4);
      chart4.setOption(getOption2([0,0,0,0],[0,0,0,0],{
        offset0: '#00A29E',
        offset1: '#65E1C5',
        shadow: '#E2F4F0'
      }),true,false);
      return chart4;
    }},
    canvasImage1: '',
    canvasImage2: '',
    reportCount: 0,
    showChoose: false,
    activeIndex: 0,
    imageMore: app.globalData.resourcesHost + 'more@2x.png',
    imageCancel: app.globalData.resourcesHost + 'cancel@2x.png',
    currentMenu:{menu_id:0,menu_name:"综合风险"},
    currentColor: "#00A29E",
    currentText: "",
    menus: [
      {menu_id:0,menu_name:'综合风险'},
      {menu_id:1,menu_name:'血压风险'},
      {menu_id:2,menu_name:'血脂风险'},
      {menu_id:3,menu_name:'血糖风险'},
      {menu_id:4,menu_name:'心血管风险'},
      {menu_id:5,menu_name:'脑血管风险'},
      {menu_id:6,menu_name:'肝负担风险'},
      {menu_id:7,menu_name:'肾负担风险'},
      {menu_id:8,menu_name:'消化力'},
      {menu_id:9,menu_name:'胃失调风险'},
      {menu_id:10,menu_name:'免疫力'},
      {menu_id:11,menu_name:'缺钙风险'},
      {menu_id:12,menu_name:'压力'},
      {menu_id:13,menu_name:'疲劳'},
      {menu_id:14,menu_name:'睡眠质量'},
      {menu_id:15,menu_name:'内分泌风险'},
      {menu_id:16,menu_name:'过敏风险'},
      {menu_id:17,menu_name:'感染风险'},
      {menu_id:18,menu_name:'咽炎风险'}
    ],
    currentMenuId: {},
    imageLock: app.globalData.resourcesHost + 'report/lock@2x.png',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoaded: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //获取周报信息
    this.listWeeklyReport(new Date())
    //获取Vip信息
    this.getVipInfo()
    page = this
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  getVipInfo: function(){
    const that = this
    wx.request({
      url: app.globalData.apiHost, 
      data: 
      JSON.stringify({
        "method": "SubscriptionAPI.GetSubscriptionSummary",
        "service": "com.jt-health.api.app",
        "request": {
          "user_id": app.getUser().id
        }
       }),
      dataType: 'json',
      method: "POST",
      header: {
        'content-type': 'application/json',
        "Authorization": 'Bearer ' + app.getRequestSign()
      },
      success(res) {
        console.log(res)
        if(res.statusCode == 200){
          const subscriptionSummary = res.data.subscription_summary
          const vipTime = dateUtil.utcToBeiJing(subscriptionSummary.personal_timeline.expired_time)
          const vipFamilyTime = dateUtil.utcToBeiJing(subscriptionSummary.family_timeline.expired_time)

          let vipInfo = {
            vipTimeBegin: dateUtil.utcToBeiJing(subscriptionSummary.personal_timeline.available_begin_time),
            vipTime: vipTime,
            isVip: subscriptionSummary.personal_subscription_expired ? false : true,
            vipFamilyTimeBegin: dateUtil.utcToBeiJing(subscriptionSummary.family_timeline.available_begin_time),
            vipFamilyTime: vipFamilyTime,
            isVipFamily: subscriptionSummary.family_subscription_expired ? false : true,
            vipRemainDay: dateUtil.dateDiffDay(new Date(), vipTime),
            vipFamilyRemainDay: dateUtil.dateDiffDay(new Date(), vipFamilyTime),
          }
          that.setData({vipInfo: vipInfo})
          console.log(vipInfo)
        }
        
      },
    })     
  },  
  scroll(e) {
    
  },
  chooseMenu: function(e){
    console.log(e)
    this.setData({
      showChoose: e.currentTarget.dataset.type
    })
  },
  changeMenu: function(e){
    let that = this
    console.log(e)
    const index = e.currentTarget.id
    const currentMenuId = e.currentTarget.dataset.id
    this.setData({
      activeIndex: index,
      showChoose: 0,
      currentMenuId: currentMenuId,
      currentMenu: that.data.menus[currentMenuId]
    })
    changeRiskIndex(that.data.monthlyReport.chart_content[currentMenuId].content)
    changeRiskTrend(that.data.monthlyReport.chart_content[19].content.slice((index * 2),(index * 2 + 2)))
  },
  changeMonth: function(e){
    let that = this
    if(e.currentTarget.dataset.ori == 0){
      console.log("上周")
      let inputDate = new Date(that.data.dateStart)
      let last = inputDate.getTime() - 604800 * 7
      console.log(new Date(last))       
      this.listWeeklyReport(dateUtil.getSunday(last))
    }else if(e.currentTarget.dataset.ori == 1){
      console.log("下周")
      let inputDate = new Date(that.data.date)
      let next = inputDate.getTime() + 604800 * 7
      console.log(new Date(next))      
      this.listWeeklyReport(dateUtil.getSunday(next))
    }
  },
  listWeeklyReport: function(inputDate){
    let that = this
    let endTime = new Date(dateUtil.getSunday(inputDate)).getTime()
    let startTime = new Date(dateUtil.getMonday(inputDate)).getTime()
    let startTimeReq = new Date(startTime)
    let endTimeReq = new Date(endTime)
    that.setData({
      startTimeStr: (startTimeReq.getMonth() + 1) + "." + startTimeReq.getDate(),
      endTimeStr: (endTimeReq.getMonth() + 1) + "." + endTimeReq.getDate(),
      date: endTimeReq,
      dateStart: startTimeReq
    })
    wx.request({
      url: app.globalData.apiHost, 
      data: 
      JSON.stringify({
        "method": "ReportAPI.GetWeeklyReport",
        "service": "com.jt-health.api.app",
        "request": {
          "user_profile_id": app.getUser().id,
          "user_id": app.getUser().id,
          "language_code": "zh-Hans",
          "time_zone": "Asia/Shanghai",
          "end_time": endTimeReq
        }
       }),
      dataType: 'json',
      method: "POST",
      header: {
        'content-type': 'application/json',
        "Authorization": 'Bearer ' + app.getRequestSign()
      },
      success(res) {
        console.log(res)
        if(res.statusCode == 200){
          if(res.data.weekly_report.chart_content){
            let riskArray = res.data.weekly_report.risk
            
            for(let i = 0; i < riskArray.length; i++){
              riskArray[i].name = that.data.menus[i].menu_name
              riskArray[i].max = riskArray[i].max ? riskArray[i].max : '--'
              riskArray[i].min = riskArray[i].min ? riskArray[i].min : '--'
              riskArray[i].avg = riskArray[i].avg ? riskArray[i].avg.toFixed(1) : '--'
            }
            that.setData({
              monthlyReport: res.data.weekly_report,
              reportCount: 1,
              riskArray: riskArray
            })
            // changeRiskIndex(res.data.weekly_report.chart_content[0].content)
            // changeRiskTrend(res.data.weekly_report.chart_content[19].content.slice(0,2))
          }else{
            that.setData({
              reportCount: 0
            })
          }
        }
        
      },
    })     
  },
})


function changeRiskIndex(dataArray){
  let riskIndexData = []
  let riskIndexDate = []
  for(let i = 0; i < dataArray.length; i++){
    let content = dataArray[i]
    let avg = (content.avg) ? content.avg : 0
    let date = content.date.split("T")[0].split("2020-")[1]
    riskIndexDate.push(date)
    riskIndexData.push(avg)
  }
  chart3.setOption(getOption1(riskIndexData,riskIndexDate))
}

function changeRiskTrend(dataArray){
  let riskTrendData = []
  let riskTrendDate = []
  let color = {}
  if(dataArray[1].avg - dataArray[0].avg > 10){
    color = {
      offset0: '#FF8C75',
      offset1: '#F4664A',
      shadow: '#EFE6E4'
    }
    page.setData({
      currentColor: "#FF8C75",
      currentText: "上升"
    })
  }else if(dataArray[1].avg - dataArray[0].avg < 0){
    color = {
      offset0: '#5AD8A6',
      offset1: '#008D50',
      shadow: '#D6EFE5'
    }
    page.setData({
      currentColor: "#00A29E",
      currentText: "下降"
    })
  }else{
    color = {
      offset0: '#00A29E',
      offset1: '#65E1C5',
      shadow: '#E2F4F0'
    }
    page.setData({
      currentColor: "#00A29E",
      currentText: "平稳"
    })
  }
  for(let i = 0; i < dataArray.length; i++){
    let content = dataArray[i]
    let avg = (content.avg) ? content.avg : 0
    let date = content.date.split("T")[0].split("2020-")[1]
    riskTrendData.push(avg)
    riskTrendDate.push(date)
  }
  chart4.setOption(getOption2(riskTrendData,riskTrendDate,color))
}



function getOption1(riskIndexData, riskIndexDate){
  var option = {
    title: {
      text: '',
      left: 'center',
      show: false
    },
    color: [{
      type: 'linear',
      x: 0,
      y: 0,
      x2: 0,
      y2: 1,
      colorStops: [{
          offset: 0, color: '#00A29E' // 0% 处的颜色
      }, {
          offset: 1, color: '#65E1C5' // 100% 处的颜色
      }],
      globalCoord: false // 缺省为 false
  }],
    legend: {
      data: [],
      top: 50,
      left: 'center',
      backgroundColor: 'none',
      z: 100
    },
    grid: {
      containLabel: true
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: riskIndexDate,
      show: true,
      splitLine: {
        show: false,
        interval: 1,
        lineStyle: {
          type: 'dotted',
          color: 'rgba(0, 0, 0, 0.4)'
        }
      },
      axisLine:{
        lineStyle:{
          type: 'dotted',
          color: 'rgba(0, 0, 0, 0.4)'
        },
        show: false
      },
      axisTick:{
        show: false
      },
      nameTextStyle:{
        fontSize: '12'
      }

    },
    yAxis: {
      name: '',
      nameTextStyle:{
        color: '#000000',
        fontSize: '32rpx',
        fontWeight: 500
      },
      type: 'value',
      boundaryGap: false,
      splitLine: {
        show: false,
        interval: 1,
        lineStyle: {
          type: 'dotted',
          color: 'rgba(0, 0, 0, 0.4)',
          width: 1,
          show:false
        }
      },
      axisTick:{
        show: false
      },
      axisLine:{
        lineStyle:{
          type: 'dotted',
          color: 'rgba(0, 0, 0, 0.4)'
        },
        show: false
      },
      show: true,
      
    },
    series: [{
      name: '风险系数',
      type: 'line',
      smooth: false,
      data: riskIndexData,
      itemStyle:{
        shadowColor: "rgba(226, 244, 240, 1)",
        shadowBlur: 6,
        shadowOffsetX: 0,
        shadowOffsetY: 16
      },
      lineStyle:{
        width: 3,
        type: 'solid',
        shadowColor: "rgba(226, 244, 240, 1)",
        shadowBlur: 6,
        shadowOffsetX: 0,
        shadowOffsetY: 16,
      },
      
    }]
  };
  return option
}


function getOption2(riskIndexData, riskIndexDate, color){
  var option = {
    backgroundColor: 'rgba(0,0,0,0)',
    title: {
      text: '',
      left: 'center',
      show: false
    },
    color: [{
      type: 'linear',
      x: 0,
      y: 0,
      x2: 0,
      y2: 1,
      colorStops: [{
          offset: 0, color: color.offset0 // 0% 处的颜色
      }, {
          offset: 1, color: color.offset1 // 100% 处的颜色
      }],
      globalCoord: false // 缺省为 false
  }],
    legend: {
      data: [],
      top: 50,
      left: 'center',
      backgroundColor: 'none',
      z: 100,
      show:false
    },
    grid: {
      containLabel: true,
      show: false
    },
    tooltip: {
      show: false,
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: riskIndexDate,
      show: true,
      splitLine: {
        show: false,
        interval: 1,
        lineStyle: {
          type: 'dotted',
          color: 'rgba(0, 0, 0, 0.4)',
          show: false
        }
      },
      axisTick:{
        show: false
      },
      axisLine:{
        lineStyle:{
          type: 'dotted',
          color: 'rgba(0, 0, 0, 0.4)',
        },
        show: false
      },
      nameTextStyle:{
        fontSize: '12',
        show: false
      }

    },
    yAxis: {
      name: '',
      show: false,
      axisLabel: {
        show: false
      },
      axisTick:{
        show: false
      },
      nameTextStyle:{
        color: '#000000',
        fontSize: '32rpx',
        fontWeight: 500
      },
      type: 'value',
      boundaryGap: false,
      splitLine: {
        show: false,
        interval: 1,
        lineStyle: {
          type: 'dotted',
          color: 'rgba(0, 0, 0, 0.4)',
          width: 1
        }
      },
      axisLine:{
        lineStyle:{
          type: 'dotted',
          color: 'rgba(0, 0, 0, 0.4)'
        },
        show: false
      },
      show: false,
      
    },
    series: [{
      name: '',
      type: 'line',
      smooth: false,
      data: riskIndexData,
      itemStyle:{
        shadowColor: color.shadow,
        shadowBlur: 6,
        shadowOffsetX: 0,
        shadowOffsetY: 16
      },
      lineStyle:{
        width: 3,
        type: 'solid',
        shadowColor: color.shadow,
        shadowBlur: 6,
        shadowOffsetX: 0,
        shadowOffsetY: 16
      },
      
    }]
  };
  return option
}