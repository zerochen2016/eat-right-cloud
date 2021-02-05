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
    areaCode: '+86',
    imageLogoLogin: app.globalData.resourcesHost + 'logo-login@2x.png'
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
    this.selectComponent("#header").showAll("登陆")
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
            // const userInfo = res.data.signed_in_context
            const userInfo = res.data
            app.setUser({
              id: userInfo.user_id,
              accessToken: userInfo.access_token.token,
              refreshToken: userInfo.refresh_token.token,
              yzCookieKey: userInfo.yz_cookie_key,
              yzCookieValue: userInfo.yz_cookie_value,
              yzOpenId: userInfo.yz_open_id,
              mobile: that.data.inputMobile,
              hasPassword: userInfo.has_set_password
            })
            app.setUserProfile(userInfo.user_profile)
            app.updateRequestSign(userInfo.access_token.token)
            wx.reLaunch({
              url: '../main/main',
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
  },
})