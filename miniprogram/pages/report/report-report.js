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
    let id = options.id
    // console.log(id)
    // let dpr = wx.getSystemInfoSync().pixelRatio
    // let width = wx.getSystemInfoSync().screenWidth
    // console.log(dpr)
    // console.log(width)
    // console.log(750 / width)
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
    this.selectComponent("#header").setTitle("报告")
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
  },
  onPageScroll(e){
    console.log(e.scrollTop)
    console.log(this.data.scrollTop)
    if(this.data.scrollTop > e.scrollTop){
      console.log("页面上滑")
      if(!(this.data.showTitle)){
        //调用显示动画
        this.selectComponent("#header").show()
        this.setData({
          showTitle: true
        })
      }
    }else{
      console.log("页面下滑")
      if((this.data.showTitle)){
        //调用消失动画
        this.selectComponent("#header").hide()
        this.setData({
          showTitle: false
        })
      }
    }
    this.setData({
      scrollTop: e.scrollTop
    })
  },
})