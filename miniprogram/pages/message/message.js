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
          if(res.data.unread_messages_size){
            unReadCount = res.data.unread_messages_size
          }else if(res.data.unread_messages_size > 99){
            unReadCount = 99
          }
          if(res.data.on_site_messages){
            familyMessageArray = res.data.on_site_messages
            for(let i = 0; i < familyMessageArray.length; i++){
              for(let j = 0; j < familyMessageArray[i].plugins.length;j++){
                let action = familyMessageArray[i].plugins[j].action
                if(action == 'acknowledge' || action == 'cancelInvite' || action == 'acceptInvite'){
                  familyMessageArray[i].unRead = true
                }else{
                  familyMessageArray[i].unRead = false
                }
              }
              familyMessageArray[i].info = JSON.stringify(familyMessageArray[i])
            }
          } 
          that.setData({
            unReadCount: unReadCount,
            familyMessageArray: familyMessageArray,
          })
        }

      },
    })     
  }
})