const app = getApp()
const dateUtil = require("../../utils/date-util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    points:[
      {value: 0,date: '0'},
      {value: 0,date: '0'},
      {value: 0,date: '0'},
      {value: 0,date: '0'},
      {value: 0,date: '0'},
      {value: 0,date: '0'},
      {value: 0,date: '0'},
      {value: 0,date: '0'},
      ],
    showResult: false,
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
    this.selectComponent("#header").showAll("周分析")
    this.getMeasurementDays()
    let a = this.selectComponent("#header")
    
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
            vipTimeBegin: dateUtil.dateToStringYYMMDD(dateUtil.utcToBeiJing(subscriptionSummary.personal_timeline.available_begin_time)),
            vipTime: dateUtil.dateToStringYYMMDD(vipTime),
            isVip: subscriptionSummary.personal_subscription_expired ? false : true,
            vipFamilyTimeBegin: dateUtil.dateToStringYYMMDD(dateUtil.utcToBeiJing(subscriptionSummary.family_timeline.available_begin_time)),
            vipFamilyTime: dateUtil.dateToStringYYMMDD(vipFamilyTime),
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
      showChoose: e.currentTarget.dataset.type == 1 ? true : false
    })
  },
  changeMenu: function(e){
    let that = this
    console.log(e)
    const index = e.currentTarget.id
    const currentMenuId = e.currentTarget.dataset.id
    this.setData({
      activeIndex: index,
      showChoose: false,
      currentMenuId: currentMenuId,
      currentMenu: that.data.menus[currentMenuId]
    })
    that.changeRiskTrend(that.data.monthlyReport.chart_content[19].content.slice((index * 2),(index * 2 + 2)),that.data.monthlyReport.chart_content[currentMenuId].content)
  },
  changeRiskTrend: function(dataArray,dataArray2){
    let start = dataArray[0]
    let end = dataArray[1]
    let dateStartArr = dataArray[0].date.split("T")[0].split("-")
    let dateStart = dateStartArr[1] + "-" + dateStartArr[2]
    let dateEndArr = dataArray[1].date.split("T")[0].split("-")
    let dateEnd = dateEndArr[1] + "-" + dateEndArr[2]
        
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
        let dateArr = content.date.split("T")[0].split("-")
        let date = dateArr[1] + "-" + dateArr[2]
        
        let data = {
          value: avg,
          date: date
        }
        riskIndexData.push(data)
      }
    }
    console.log("changeRiskIndex",riskIndexData,trend)
    this.changeStyle(riskIndexData,trend)
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
        console.log("ReportAPI.GetWeeklyReport",startTimeReq,endTimeReq,res)
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
              riskArray: riskArray,
              showResult: true
            })
            that.changeRiskTrend(res.data.weekly_report.chart_content[19].content.slice(0,2),res.data.weekly_report.chart_content[0].content)
            
          }else{
            that.setData({
              showResult: false,
              weeklyDays: 1
            })
          }
        }
        
      },
    })     
  },
  getMeasurementDays: function(){
    let that = this
    wx.request({
      url: app.globalData.apiHost, 
      data: 
      JSON.stringify({
        "method": "ReportAPI.GetMeasurementDays",
        "service": "com.jt-health.api.app",
        "request": {
          "user_profile_id": app.getUser().id
        }
       }),
      dataType: 'json',
      method: "POST",
      header: {
        'content-type': 'application/json',
        "Authorization": 'Bearer ' + app.getRequestSign()
      },
      success(res) {
        console.log("getMeasurementDays",res)
        if(res.statusCode == 200){
          let weeklyDays = 0
          let monthlyDays = 0
          if(res.data.monthly_days){
            monthlyDays = res.data.monthly_days
          }
          if(res.data.weekly_days){
            weeklyDays = res.data.weekly_days
          }
          that.setData({
            weeklyDays: weeklyDays,
            monthlyDays: monthlyDays
          })
        }
        
      },
    })     
  },
  changeStyle: function(points, colorType){
    if(points.length > 7){
      let interval = (points.length - 1) / 6
      let usePoints = []
      for(let i = 0; i * interval < points.length; i++){
        usePoints.push(points[parseInt(i * interval)])
        usePoints.push(points[points.length - 1])
      } 
      points = usePoints
    }
    for(let i = 0; i < points.length; i++){
      let y = parseInt(points[i].value * 4.9)
      let x = i * 100
      points[i].lineHeight = 490 - y
      points[i].pointHeight = 480 - y
      points[i].y = y
      points[i].x = x
    }
    for(let j = 0; j < points.length; j ++){
      if(j < points.length - 1){
        let y1 = points[j].y
        let y2 = points[(j + 1)].y
        let x = 100
        let h = y1 - y2
        let z = Math.sqrt(h * h + x * x)
        let anger = Math.asin(h / z) * 180 / Math.PI
        points[j].z = parseInt(z)
        points[j].anger = anger
        points[j].left = parseInt(z - 100)
      }
      
      
    }
    console.log(points)
    this.changeColor(colorType)
    this.setData({
      points: points.length > 6 ? points.slice(0,6): points
    })
    
  },
  changeColor: function(colorType){
    let lineClass = 'line'
    let pointClass = 'point'
    if(colorType == 1){
      lineClass = 'line-down'
      pointClass = 'point-down'
    }else if(colorType == 3){
      lineClass = 'line-up'
      pointClass = 'point-up'
    }
    this.setData({
      lineClass: lineClass,
      pointClass: pointClass
    })
  }

})
