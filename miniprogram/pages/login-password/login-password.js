const app = getApp()
let loginLock = 0 //防止连续点击登录
const util = require("../../utils/util.js")
const sha256 = require("../../utils/sha256.js")
const dateUtil = require("../../utils/date-util.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputMobile: "",
    password: "",
    loginStyle: 0,
    areaCode: '+86'
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

  mobileChange: function(e){
    var value = e.detail.value
    if(!util.isPositiveInteger(value)){
      if(value){
        value = value.substring(0, value.length-1)        
      }
    }
    this.setData({
      inputMobile: value
    })
    this.checkLoginStyle()
  },
  passwordChange: function(e){
    this.setData({
      password: e.detail.value
    })
    this.checkLoginStyle()
  },
  checkLoginStyle: function(){
    if(util.isMobile(this.data.inputMobile) && this.data.password.length >= 6){
      this.setData({
        loginStyle: 1
      })
    }else{
      this.setData({
        loginStyle: 0
      })
    }
  },
  doLogin: function(){
    let that = this
    if(util.isMobile(this.data.inputMobile)&& this.data.password.length >= 6 && loginLock == 0){
      loginLock = 1
      wx.request({
        url: app.globalData.apiHost, 
        data: 
        JSON.stringify({
          "method": "UserAPI.SignInByPhonePassword",
          "service": "com.jt-health.api.app",
          "request": {
           "phone": that.data.inputMobile,
           "nation_code": that.data.areaCode,
           "language_code": "zh_Hans",
           "hashed_password": sha256.encode(that.data.password)
          }
          
         }),
        dataType: 'json',
        method: "POST",
        header: {
          'content-type': 'application/json',
          "Accept-Language": "zh-Hans",
          "Authorization": 'Bearer ' + app.getRequestSign()
        },
        success(res) {
          console.log(res)
          if(res.statusCode == 200){
            app.setUser({
              id: res.data.user_id,
              accessToken: res.data.access_token.token,
              refreshToken: res.data.refresh_token.token,
              yzCookieKey: res.data.yz_cookie_key,
              yzCookieValue: res.data.yz_cookie_value,
              yzOpenId: res.data.yz_open_id,
              userProfile: res.data.user_profile,
              mobile: that.data.inputMobile,
              trialVipTime: dateUtil.utcToBeiJing(res.data.subscription_summary.trial_timeline.expired_time),
              vipTimeBegin: dateUtil.utcToBeiJing(res.data.subscription_summary.personal_timeline.available_begin_time),
              vipTime: dateUtil.utcToBeiJing(res.data.subscription_summary.personal_timeline.expired_time),
              isVip: res.data.subscription_summary.personal_subscription_expired ? false : true,
              vipFamilyTimeBegin: dateUtil.utcToBeiJing(res.data.subscription_summary.family_timeline.available_begin_time),
              vipFamilyTime: dateUtil.utcToBeiJing(res.data.subscription_summary.family_timeline.expired_time),
              isVipFamily: res.data.subscription_summary.family_subscription_expired ? false : true
            })
            app.updateRequestSign(res.data.access_token.token)
            wx.navigateTo({
              url: '../home/home',
            })
          }
        
        },
      })       
    }  
    loginLock = 0    
  },
  
  areaCodeChange: function(e){
    console.log(e.detail)
    this.setData({
      areaCode: e.areaCode
    })
  }
})