const app = getApp()
const dateUtil = require("../../utils/date-util.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    this.setData({
      profileId: options.id
    })
    //获取周报信息
    this.listWeeklyReport(options.id,new Date())
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
    //获取Vip信息
    this.getVipInfo()

    
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
    that.changeRiskTrend(that.data.monthlyReport.chart_content[19].content.slice((index * 2),(index * 2 + 2)),that.data.monthlyReport.chart_content[currentMenuId].content)
  },
  changeRiskTrend: function(dataArray,dataArray2){
    let start = dataArray[0]
    let end = dataArray[1]
    let dateStart = dataArray[0].date.split("T")[0].split("2020-")[1]
    let dateEnd = dataArray[1].date.split("T")[0].split("2020-")[1]
    let angle = parseInt((start.avg - end.avg) * 20 / 50)
    let trend = 2
    if(end.avg - start.avg > 5){
      trend = 3
      this.setData({
        colorStart: '#FF8C75',
        colorEnd: '#F4664A',
        shadow: '#EFE6E4',
        currentColor: "#FF8C75",
        currentText: "上升",
        dateStart: dateStart,
        dateEnd: dateEnd,
        trend: trend,
        angle: angle
      })
    }else if(end.avg - start.avg < -5){
      trend = 1
      this.setData({
        colorStart: '#5AD8A6',
        colorEnd: '#008D50',
        shadow: '#D6EFE5',
        currentColor: "#008D50",
        currentText: "下降",
        dateStart: dateStart,
        dateEnd: dateEnd,
        trend: trend,
        angle: angle
      })
    }else{
      
      this.setData({
        colorStart: '#00A29E',
        colorEnd: '#65E1C5',
        shadow: '#E2F4F0',
        currentColor: "#00A29E",
        currentText: "平稳",
        dateStart: dateStart,
        dateEnd: dateEnd,
        trend: trend,
        angle: angle
      })
    }
    this.changeRiskIndex(dataArray2,trend)
  },
  changeRiskIndex: function(dataArray,trend){

    let riskIndexData = []
    for(let i = 0; i < dataArray.length; i++){
      let content = dataArray[i]
      if((content.avg)){
        let avg = content.avg
        let date = content.date.split("T")[0].split("2020-")[1]
        let data = {
          value: avg,
          date: date
        }
        riskIndexData.push(data)
      }
    }
    this.selectComponent("#brokeline").changeStyle(riskIndexData,trend)
  },
  changeMonth: function(e){
    let that = this
    if(e.currentTarget.dataset.ori == 0){
      console.log("上周")
      let inputDate = new Date(that.data.dateStart)
      let last = inputDate.getTime() - 604800 * 7
      console.log(new Date(last))       
      this.listWeeklyReport(this.data.profileId,dateUtil.getSunday(last))
    }else if(e.currentTarget.dataset.ori == 1){
      console.log("下周")
      let inputDate = new Date(that.data.date)
      let next = inputDate.getTime() + 604800 * 7
      console.log(new Date(next))      
      this.listWeeklyReport(this.data.profileId,dateUtil.getSunday(next))
    }
  },
  listWeeklyReport: function(profileId,inputDate){
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
          "user_profile_id": profileId,
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
            that.changeRiskTrend(res.data.weekly_report.chart_content[19].content.slice(0,2),res.data.weekly_report.chart_content[0].content)
            
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
