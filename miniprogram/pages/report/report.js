const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageFamily: app.globalData.resourcesHost + 'report/family@2x.png',
    imageReport: app.globalData.resourcesHost + 'report/report@2x.png',
    imageAnalysisWeek: app.globalData.resourcesHost + 'report/analysis-week@2x.png',
    imageAnalysisMonth: app.globalData.resourcesHost + 'report/analysis-month@2x.png' 
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
    //底部导航选中
    this.selectComponent("#bottom-navigate").changeActiveIndex(3)
    //周报测量天数
    this.getMeasurementDays()
    this.setData({
      userId: app.getUser().id
    })
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
        console.log(res)
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
})