const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoaded: function (options) {
    console.log("report-report onLoaded,options",options)
    console.log(options)
    let id = options.id 
    let url = app.globalData.h5Host + "private/report/" + id + '?theme=light-theme&size=medium&access_token=' + app.getUser().accessToken
    console.log(url)
    this.setData({
      thirdUrl: url
    })
    this.getSharedReportLink(id)

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let that = this
    //由于做了全局配置，重置分享
    this.onShareAppMessage = () => {
      return{
        title: "健康生活 从吃开始",
        path: "/pages/third-webview/third-webview?thirdUrl=" + that.data.shareLink
      }
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
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

  getSharedReportLink: function(reportId){
    let that = this
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
          if(res.data.report_link){
            that.setData({
              shareLink: res.data.report_link
            })
          }
        }
        
      },
    })     
  }
})