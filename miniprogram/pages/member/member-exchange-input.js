const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code: '',
    confirmStyle: false
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
  confirmExchange: function (e){
    const that = this
    const code = this.data.code
    wx.request({
      url: app.globalData.apiHost, 
      data: 
      JSON.stringify({
        "method": "SubscriptionAPI.ActivateActivationCode",
        "service": "com.jt-health.api.app",
        "request": {
          "user_id": app.getUser().id,
          "activation_password": code
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
          if(res.data.ok){
            app.alert("温馨提示","兑换成功")
          }else{
            let msg = "该会员卡不存在"
            if(res.data.reason){
              msg = res.data.reason
            }
            app.alert("温馨提示",msg)
          }

        }
        
      },
    })     
  },
  codeInput: function(e){
    const value = e.detail.value
    if(value.length > 10){
      this.setData({
        code: value,
        confirmStyle: true
      })
    }else{
      this.setData({
        code: value,
        confirmStyle: false
      })
    }
  }
})