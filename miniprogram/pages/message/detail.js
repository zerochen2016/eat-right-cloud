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
    console.log("detail onloaded",options)
    this.setData({
      info: JSON.parse(options.info)
    })
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
    this.selectComponent("#header").showAll("消息中心")
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

  /**
   * 处理当前消息
   */
  resolveMessage: function(e){
    console.log(e)
    const messageId = this.data.info.message_id
    const type = e.currentTarget.dataset.type
    if(type == 1){
      console.log("接受")
      this.joinFamily(messageId)
    }else if(type == 2){
      console.log("拒绝")
      this.refuseCurrentMessage(messageId)
    }else if(type == 3){
      this.confirmMessage(messageId)
    }else{
      wx.navigateBack({})
    }
    
  },
    /**
   * 点击接受
   */
  confirmMessage: function(messageId){
    const that = this
    wx.request({
      url: app.globalData.apiHost, 
      data: 
      JSON.stringify({
        "method": "NotificationAPI.ConfirmOnSiteMessage",
        "service": "com.jt-health.api.app",
        "request": {
         "message_id": messageId,
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
          wx.navigateBack({})
        }

      },
    })     

  },
  /**
   * 点击拒绝
   */
  refuseCurrentMessage: function(messageId){
    let that = this
    wx.request({
      url: app.globalData.apiHost, 
      data: 
      JSON.stringify({
        "method": "NotificationAPI.SendRefuseInvitationMessage",
        "service": "com.jt-health.api.app",
        "request": {
         "message_id": messageId,
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
          let content = "您已拒绝加入该家庭"
          if(res.data.reason){
            content = res.data.reason
          }
          wx.showModal({
            showCancel: false,
            title: "温馨提示",
            content: content,
            success: function(res){
              if(res.confirm){
                wx.navigateBack({})
              }
            }
          })
        }

      },
    })     
  },
      /**
   * 点击接受
   */
  joinFamily: function(messageId){
    const that = this
    wx.request({
      url: app.globalData.apiHost, 
      data: 
      JSON.stringify({
        "method": "FamilyAPI.JoinFamily",
        "service": "com.jt-health.api.app",
        "request": {
         "message_id": messageId
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
          let content = "您已加入该家庭"
          if(res.data.reason){
            content = res.data.reason
          }
          wx.showModal({
            showCancel: false,
            title: "温馨提示",
            content: content,
            success: function(res){
              if(res.confirm){
                wx.navigateBack({})
              }
            }
          })
        }

      },
    })     

  },
})