const app = getApp()
const dateUtil = require("../../utils/date-util.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName: '',
    resourcesHost: '',
    unReadCount: 0,
    imageFamily: app.globalData.resourcesHost + 'my/family-new@2x.png',
    imageOrder: app.globalData.resourcesHost + 'my/order-new@2x.png',
    imageStore: app.globalData.resourcesHost + 'my/store@2x.png',
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
    //底部导航选中
    this.selectComponent("#bottom-navigate").changeActiveIndex(4)
    //获取有赞我的订单页面
    this.getMyOrderUrl()
    //获取站内信
    this.listNotification()
    //用户VIP信息
    this.getVipInfo()
    //获取用户信息
    this.getUserProfile()
    this.selectComponent("#header").setTitle("我的")
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
  getUserProfile: function(){
    let that = this
    wx.request({
      url: app.globalData.apiHost, 
      data: 
      JSON.stringify({
        "method": "UserProfileAPI.GetUserProfile",
        "service": "com.jt-health.api.app",
        "request": {
         "user_id": app.getUser().id,
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
          let userProfile = res.data.profile
          that.setData({
            userProfile: userProfile
          })
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
           if(res.data.unread_messages_size){
            unReadCount = res.data.unread_messages_size
           }else if(res.data.unread_messages_size > 99){
            unReadCount = 99
           }
           that.setData({
            unReadCount: unReadCount
           })
        }

      },
    })     
  },
  getMyOrderUrl: function(){
    let that = this
    //TODO 订单路径无法打开
    wx.request({
      url: app.globalData.apiHost, 
      data: 
      JSON.stringify({
        "method": "MallAPI.GetMyOrderUrl",
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
          that.setData({
            myOrderUrl: res.data.yz_order_url
          })
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
  onPageScroll(e){
    console.log(e.scrollTop)
    console.log(this.data.scrollTop)
    if(this.data.scrollTop < e.scrollTop){
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