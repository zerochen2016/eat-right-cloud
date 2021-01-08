const app = getApp()
let loginLock = 0 //防止连续点击登录
let util = require("../../utils/util.js")
let sha256 = require("../../utils/sha256.js")

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
              subscriptionSummary: res.data.subscription_summary
            })
            wx.navigateTo({
              url: '../home/home',
            })
            // data:
            // access_token: {token: "1522ab53-fcd1-4695-846d-f3ffe4289285", expired_time: "2021-01-07T17:18:44.416327211Z"}
            // refresh_token: {token: "2b10d41a-7817-4f1f-a79b-ea167d9fc65a", expired_time: "2021-01-14T17:03:44.417511837Z"}
            // subscription_summary:
            // family_subscription_expired: true
            // family_timeline: {available_begin_time: "1980-01-01T00:00:00Z", expired_time: "1980-01-01T00:00:00Z"}
            // gender: "GENDER_MALE"
            // personal_subscription_expired: true
            // personal_timeline: {available_begin_time: "1980-01-01T00:00:00Z", expired_time: "1980-01-01T00:00:00Z"}
            // trial_timeline: {available_begin_time: "1980-01-01T00:00:00Z", expired_time: "1980-01-01T00:00:00Z"}
            // __proto__: Object
            // user_id: "bvrjq4qvooebjhs7u0i0"
            // user_profile: {user_profile_id: "bvrjq4qvooebjhs7u0i0", birthday: {…}, hand: "HAND_LEFT", gender: "GENDER_MALE"}
            // yz_cookie_key: "open_cookie_b2cd851af6edb4421d"
            // yz_cookie_value: "YZ796906956870049792YZO2ihdozU"
            // yz_open_id: "Tavm5DhN796906956752199680"
            
            
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