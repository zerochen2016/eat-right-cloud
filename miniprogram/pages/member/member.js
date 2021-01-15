const app = getApp()
const dateUtil = require("../../utils/date-util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName: '',
    resourcesHost: '',
    vipRemainDay: 0,
    familyVipTime: '',
    vipList: 2,
    vipSelectDay: 30,
    familyVipSelectDay: 30,
    imageVipFamily: app.globalData.resourcesHost + 'my/vip-family@2x.png',
    imageVip: app.globalData.resourcesHost + 'images/my/vip@2x.png',
    imageQuestion: app.globalData.resourcesHost + 'my/question@3x.png',
    imageDeviceSell: app.globalData.resourcesHost + 'check/device-sell.png',
    imageArrowWhite: app.globalData.resourcesHost + 'arrow-white@3x.png',
    imageArrowBlue: app.globalData.resourcesHost + 'arrow-blue@2x.png',
    imageArrowGrey: app.globalData.resourcesHost + 'arrow-grey@3x.png',
    imageFamily: app.globalData.resourcesHost + 'member/family@2x.png',
    imageVs: app.globalData.resourcesHost + 'member/vs@2x.png',
    imageWeek: app.globalData.resourcesHost + 'member/week@2x.png',
    imageMonth: app.globalData.resourcesHost + 'member/month@2x.png',
    imageReport: app.globalData.resourcesHost + 'member/report@2x.png',
    imageEat: app.globalData.resourcesHost + 'member/eat@2x.png',
    imageHealthDanger: app.globalData.resourcesHost + 'member/health-danger@2x.png',
    imageHealthSpecial: app.globalData.resourcesHost + 'member/health-special@2x.png',
    imageVipGoods: app.globalData.resourcesHost + 'member/vip-goods@2x.png',
    imageVip2: app.globalData.resourcesHost + 'member/vip@2x.png',
    imageMore: app.globalData.resourcesHost + 'member/more@2x.png',
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
    //家庭版VIP
    this.listPersonalVipGoods()
    //个人版VIP
    this.listFamilyVipGoods()
    //用户VIP信息
    this.getVipInfo(),
    //获取感测器购买链接
    this.getDeviceGoods()
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
    let currentProductId = this.data.currentProductId
    if(viplist == 1){
      this.setData({
        vipSelectDay: days,
      })
      if(days == 30){
        currentPrice = this.data.vipArray[0].price / 10000,
        currentProductId = this.data.vipArray[0].product_id
      }else if(days == 90){
        currentPrice = this.data.vipArray[1].price / 10000,
        currentProductId = this.data.vipArray[1].product_id
      }else if(days == 365){
        currentPrice = this.data.vipArray[2].price / 10000,
        currentProductId = this.data.vipArray[2].product_id
      }
    }else if(viplist == 2){
      this.setData({
        familyVipSelectDay: days
      })
      if(days == 30){
        currentPrice = this.data.familyVipArray[0].price / 10000,
        currentProductId = this.data.familyVipArray[0].product_id
      }else if(days == 90){
        currentPrice = this.data.familyVipArray[1].price / 10000,
        currentProductId = this.data.familyVipArray[1].product_id
      }else if(days == 365){
        currentPrice = this.data.familyVipArray[2].price / 10000,
        currentProductId = this.data.familyVipArray[2].product_id
      }
    }
    this.setData({
      currentPrice: currentPrice,
      currentProductId: currentProductId
    })

    
  },
  buyProduct: function(e){
    console.log(e)
    const that = this
    const productId = e.currentTarget.dataset.productid
    wx.request({
      url: app.globalData.apiHost, 
      data: 
      JSON.stringify({
        "method": "MallAPI.GetOrderLink",
        "service": "com.jt-health.api.app",
        "request": {
         "product_id": productId,
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
          if(res.data.yz_place_order_url){
            wx.navigateTo({
              url: '../third-webview/third-webview?thirdUrl=' + res.data.yz_place_order_url,
            })
          }
        }
      },
    })     
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
            familyVipArray: res.data.family_renewal_products,
            currentPrice: res.data.family_renewal_products[0].price / 10000,
            currentProductId: res.data.family_renewal_products[0].product_id
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
        }
      },
    })     
  },
  getDeviceGoods: function(){
    const that = this
    wx.request({
      url: app.globalData.apiHost, 
      data: 
      JSON.stringify({
        "method": "MallAPI.ListDeviceProducts",
        "service": "com.jt-health.api.app",
        "request": {}
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
          if(res.data.device_products[0]){
            that.setData({
              deviceProduct: res.data.device_products[0]
            },)
          }
//           data:
// device_products: Array(1)
// 0:
// brief: "守护全家健康的好帮手"
// is_promotion_product: true
// original_price: 12990000
// price: 9990000
// product_id: "btk6433ipt3c236duk70"
// product_name: "小阶感测器"
        }
        
      },
    })     
  },
})