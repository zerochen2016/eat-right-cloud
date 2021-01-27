const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showMessage: false,
    imageArrow: app.globalData.resourcesHost + 'arrow@2x.png'
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
    //获取站内信
    this.listNotification()
    // //检测是否加入家庭
    // this.checkHasJoinedOtherFamily()
    this.selectComponent("#header").setTitle("消息中心")
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
    const messageId = this.data.firstMessage.message_id
    const type = e.currentTarget.dataset.type
    this.removeCurrentMessage()
    if(type == 1){
      console.log("接受")
      // this.acceptCurrentMessage(messageId)
      this.joinFamily(messageId)
    }else if(type == 2){
      console.log("拒绝")
      this.refuseCurrentMessage(messageId)
    }else{
      this.setData({
        showMessage: false
      })
    }
    
  },
  checkHasJoinedOtherFamily: function(){
    const that = this
    wx.request({
      url: app.globalData.apiHost, 
      data: 
      JSON.stringify({
        "method": "FamilyAPI.CheckHasJoinedOtherFamily",
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
          if(res.data.ok){
            app.alert("温馨提示","加入成功")
          }
          if(res.data.reason){
            app.alert("温馨提示",res.data.reason)
          }
        }

      },
    })     

  },
  /**
   * 点击接受
   */
  acceptCurrentMessage: function(messageId){
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
          if(res.data.reason){
            app.alert("温馨提示",res.data.reason)
          }
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
          if(res.data.reason){
            app.alert("温馨提示",res.data.reason)
          }
        }

      },
    })     
  },
  /**
   * 移除第一条消息
   */
  removeCurrentMessage: function(){
    let familyMessageArray = this.data.familyMessageArray
    if(familyMessageArray.length > 1){
      familyMessageArray = familyMessageArray.slice(1,familyMessageArray.length)
      let firstMessage = this.data.firstMessage
      let unReadCount = this.data.unReadCount
      this.setData({
        familyMessageArray: familyMessageArray,
        firstMessage: familyMessageArray[0],
        unReadCount: (unReadCount - 1) >= 0 ? unReadCount - 1 : 0,
        showMessage: false
      })
    }else{
      this.setData({
        familyMessageArray: [],
        firstMessage: {},
        unReadCount: 0,
        showMessage: false
      })
    }
  },
  showMessage: function(e){
    this.setData({
      showMessage: true
    })
  },
  
  listNotification: function(){
    let that = this
    wx.request({
      url: app.globalData.apiHost, 
      data: 
      JSON.stringify({
        "method": "NotificationAPI.ListOnSiteMessages",
        "service": "com.jt-health.api.app",
        "request": {
         "user_id": app.getUser().id,
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
          let unReadCount = 0
          let familyMessageArray = []
          let firstMessage = {}
          if(res.data.unread_messages_size){
            unReadCount = res.data.unread_messages_size
          }else if(res.data.unread_messages_size > 99){
            unReadCount = 99
          }
          if(res.data.on_site_messages){
            familyMessageArray = res.data.on_site_messages,
            firstMessage = res.data.on_site_messages[0]
          } 
          that.setData({
            unReadCount: unReadCount,
            familyMessageArray: familyMessageArray,
            firstMessage: firstMessage
          })
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