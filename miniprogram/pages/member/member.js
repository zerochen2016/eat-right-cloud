const app = getApp()
const dateUtil = require("../../utils/date-util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: '',
    nickName: '',
    resourcesHost: '',
    vipRemainDay: 0,
    familyVipTime: '',
    vipList: 1,
    vipSelectDay: 30,
    familyVipSelectDay: 30,
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
    //家庭版VIP
    this.listPersonalVipGoods()
    //个人版VIP
    this.listFamilyVipGoods()
    //用户VIP信息
    this.getVipInfo()
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
  changeSelect: function(e){
    console.log(e)
    const viplist = e.currentTarget.dataset.viplist
    const days = e.currentTarget.dataset.days
    let currentPrice = this.data.currentPrice
    if(viplist == 1){
      this.setData({
        vipSelectDay: days,
      })
      if(days == 30){
        currentPrice = this.data.vipArray[0].price / 10000
      }else if(days == 90){
        currentPrice = this.data.vipArray[1].price / 10000
      }else if(days == 365){
        currentPrice = this.data.vipArray[2].price / 10000
      }
    }else if(viplist == 2){
      this.setData({
        familyVipSelectDay: days
      })
      if(days == 30){
        currentPrice = this.data.familyVipArray[0].price / 10000
      }else if(days == 90){
        currentPrice = this.data.familyVipArray[1].price / 10000
      }else if(days == 365){
        currentPrice = this.data.familyVipArray[2].price / 10000
      }
    }
    this.setData({
      currentPrice: currentPrice
    })

    
  },
  buyVip: function(e){
    console.log(e)
  },
  changeVipList: function(e){
    this.setData({
      vipList: e.currentTarget.dataset.viplist,
      vipSelectDay: 30,
      familyVipSelectDay: 30
    })
  },
  listFamilyVipGoods: function(){
    const that = this
    wx.request({
      url: app.globalData.apiHost, 
      data: 
      JSON.stringify({
        "method": "MallAPI.ListFamilyRenewalProductsV2",
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
            familyVipArray: res.data.family_renewal_products
          })
        }
      },
    })     
  },
  listPersonalVipGoods: function(){
    const that = this
    wx.request({
      url: app.globalData.apiHost, 
      data: 
      JSON.stringify({
        "method": "MallAPI.ListPersonalRenewalProductsV2",
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
            vipArray: res.data.personal_products,
            currentPrice: res.data.personal_products[0].price / 10000
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
  
})