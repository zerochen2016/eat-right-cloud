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
    imageVip: app.globalData.resourcesHost + 'my/vip@2x.png',
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
    this.selectComponent("#header").showAll("会员中心")

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
      currentProductId: currentProductId,
      currentVipList: viplist
    })

    
  },
  buyProduct: function(e){
    console.log(e)
    let array = []
    if(e.currentTarget.dataset.viplist == 1){
      array = this.data.vipArray
      
    }else if(e.currentTarget.dataset.viplist == 2){
      array = this.data.familyVipArray
    }
    for(let i = 0; i < array.length; i++){
      if(e.currentTarget.dataset.productid == array[i].product_id){
        wx.navigateToMiniProgram({
          appId: 'wx6deb54e571e86e3c',
          path: 'packages/goods/detail/index?alias=' + array[i].alias + '&shopAutoEnter=1',
          extraData: {},
          envVersion: 'release',
          success(res) {
            // 打开成功
            console.log('navigateToMiniProgram youzan')
          }
        })
      }
    }
    
    
    
  },
  changeVipList: function(e){
    let vipList = e.currentTarget.dataset.viplist
    let vipArray = []
    if(vipList == 1){
      vipArray = this.data.vipArray
    }else if(vipList == 2){
      vipArray = this.data.familyVipArray
    }
    this.setData({
      vipList: vipList,
      vipSelectDay: 30,
      familyVipSelectDay: 30,
      currentVipList: vipList,
      currentPrice: vipArray[0].price / 10000,
      currentProductId: vipArray[0].product_id
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
          let vipArray = res.data.family_renewal_products
          for(let i = 0; i < vipArray.length; i++){
            if(vipArray[i].renew_days == 30){
              vipArray[i].alias = '3nklw9gkukxgw'
            }else if(vipArray[i].renew_days == 90){
              vipArray[i].alias = '1y5l705cwlmgg'
            }else if(vipArray[i].renew_days == 365){
              vipArray[i].alias = '1y34o9c2r56uo'
            }
          }
          that.setData({
            familyVipArray: vipArray,
            currentPrice: vipArray[0].price / 10000,
            currentProductId: vipArray[0].product_id,
            currentVipList: 2
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
          let vipArray = res.data.personal_products
          for(let i = 0; i < vipArray.length; i++){
            if(vipArray[i].renew_days == 30){
              vipArray[i].alias = '1y6s5c7tcxk7k'
            }else if(vipArray[i].renew_days == 90){
              vipArray[i].alias = '1y6s5c7tcxk7k'
            }else if(vipArray[i].renew_days == 365){
              vipArray[i].alias = '1yfgn1in9dim8'
            }
          }
          that.setData({
            vipArray: vipArray,
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
        }
        
      },
    })     
  }
})