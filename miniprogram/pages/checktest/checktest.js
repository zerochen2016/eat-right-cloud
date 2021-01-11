const app = getApp()
let dateUtil = require("../../utils/date-util.js")
const sha256 = require("../../utils/sha256.js")
const md5 = require("../../utils/md5.js")
const base64 = require("../../utils/base64.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {

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
    this.checkDeviceIsUsable()
    
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

  //TODO
    // GetSharedReportLink 获取分析报告的链接
    getSharedReportLink: function(reportId){
      wx.request({
        url: app.globalData.apiHost, 
        data: 
        JSON.stringify({
          "method": "ReportAPI.GetSharedReportLink",
          "service": "com.jt-health.api.app",
          "request": {
            "user_id": app.getUser().id,
            "report_id": reportId
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
  
          }
          
        },
      })     
    },
    // ListReports 查看测量记录.
    listReports: function(page,startTime,endTime){
      wx.request({
        url: app.globalData.apiHost, 
        data: 
        JSON.stringify({
          "method": "ReportAPI.ListReports",
          "service": "com.jt-health.api.app",
          "request": {
            "user_id": app.getUser().id,
            "pagination": {
              offset:page,
              size:20
            },
            "search_condition":{
              "user_profile_id": app.getUser().id,
              "start_time": 0,
              "end_time":0
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
  
          }
          
        },
      })     
    },  
})








// rpc GetWeeklyReport(GetWeeklyReportRequest) returns (GetWeeklyReportResponse)
// GetWeeklyReport 获得周报.

// rpc GetMonthlyReport(GetMonthlyReportRequest) returns (GetMonthlyReportResponse)
// GetMonthlyReport 获得月报.

// rpc GetComparisonReport(GetComparisonReportRequest) returns (GetComparisonReportResponse)
// GetComparisonReport 获得报告对比结果.

// rpc GetMeasurementDays(GetMeasurementDaysRequest) returns (GetMeasurementDaysResponse)
// GetMeasurementDays 获取周报月报测量天数.

// rpc ListMonthlyReportDays(ListMonthlyReportDaysRequest) returns (ListMonthlyReportDaysResponse)
// ListMonthlyReportDays 获取月测量报告天数.

// rpc CheckHasCountedReport(CheckHasCountedReportRequest) returns (CheckHasCountedReportResponse)
// CheckHasCountedReport 检测用户是否有被统计过的报告.

// rpc GetLastReportBrief(GetLastReportBriefRequest) returns (GetLastReportBriefResponse)
// GetLastReportBrief 获取用户最后一次报告的概述.

// rpc GetReportArticle(GetReportArticleRequest) returns (GetReportArticleResponse)
// GetReportArticle 获取报告文献.