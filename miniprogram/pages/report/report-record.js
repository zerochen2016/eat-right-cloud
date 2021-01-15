const app = getApp()
const dateUtil = require("../../utils/date-util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageArrow: app.globalData.resourcesHost + 'arrow@2x.png',
    imageLock: app.globalData.resourcesHost + 'report/lock@2x.png',
    reportCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    // this.listMonthlyReport(dateUtil.getEndTime('2020-10-30'))
    this.listReports(dateUtil.dateToStringYYMMDD(new Date()))
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
  dateChangeTap: function(e){
    this.dateChange(e.detail.date)
  },
  dateChange: function(inputDate){
    let dateArr = inputDate.split("-")
    let date = null
    if(dateArr[1] == 1||dateArr[1]==3||dateArr[1]==5||dateArr[1]==7||dateArr[1]==8||dateArr[1]==10||dateArr[1]==12){
      date = dateArr[0] + "-" + dateArr[1] + "-31"
    }else if(dateArr[1]==2){
      if(parseInt(dateArr[0]) % 4 == 0){
        date = dateArr[0] + "-" + dateArr[1] + "-29"
      }else{
        date = dateArr[0] + "-" + dateArr[1] + "-28"
      }
    }else{
      date = dateArr[0] + "-" + dateArr[1] + "-30"
    }
    this.listReports(new Date(date))
  },
  listReports: function(endTime){
    endTime = dateUtil.getEndTimeSecond(endTime)
    let startTime = endTime - 2592000
    let that = this
    let startTimeReq = new Date(startTime * 1000)
    let endTimeReq = new Date(endTime * 1000)
    wx.request({
      url: app.globalData.apiHost, 
      data: 
      JSON.stringify({
        "method": "ReportAPI.ListReports",
        "service": "com.jt-health.api.app",
        "request": {
          "user_id": app.getUser().id,
          "pagination": {
            offset: 1,
            size: 20
          },
          "search_condition": {
            "user_profile_id": app.getUser().id,
            "start_time": startTimeReq,
            "end_time": endTimeReq
            
          }
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
          let reports = []
          let reportTime = []
          if(res.data.health_reports && res.data.health_reports[0]){
            for(let i = 0; i < res.data.health_reports.length; i++){
              let date = new Date(dateUtil.utcToBeiJing(res.data.health_reports[i].create_time))
              let report = {
                id: res.data.health_reports[i].health_report_id,
                riskIndex: res.data.health_reports[i].health_risk_index.index_value,
                heartRate: res.data.health_reports[i].heart_rate,
                time: (date.getMonth() + 1) + "月" + date.getDate() + "日 " + date.getFullYear() + "年",
                enableS: res.data.health_reports[i].enable_statistics,
              }
              reports.push(report)
              reportTime.push(dateUtil.dateToStringYYMMDD(date))
            }
            that.setData({
              reports: reports
            })
            that.selectComponent("#calendar").setReportData(reportTime)
          }else{
            that.setData({
              reports: []
            })
          }
        }
        
      },
    })     
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
})