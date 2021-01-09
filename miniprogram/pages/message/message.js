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
           if(res.data.on_site_messages[0]){
             familyMessageArray = res.data.on_site_messages
           }
           that.setData({
            unReadCount: unReadCount,
            familyMessageArray: familyMessageArray
           })
//            on_site_messages: Array(3)
// 0:
// create_time: "2021-01-09T07:02:29Z"
// message_content: "邀请你加入他的家庭"
// message_id: "bvsla1avooe859pl0a0g"
// message_title: "家庭邀请通知"
// plugins: (2) [{…}, {…}]
// recipient_id: "bvrjq4qvooebjhs7u0i0"
// sender_avatar: "ON_SITE_MESSAGE_AVATAR_MALE"
// sender_id: "bvrivqavooebjhs7u0gg"
// sender_nickname: "d"
// __proto__: Object
// 1: {sender_id: "bvrivqavooebjhs7u0gg", sender_nickname: "d", sender_avatar: "ON_SITE_MESSAGE_AVATAR_MALE", recipient_id: "bvrjq4qvooebjhs7u0i0", message_content: "邀请你加入他的家庭", …}
// 2: {sender_id: "bvrivqavooebjhs7u0gg", sender_nickname: "d", sender_a
        }

      },
    })     
  },
})