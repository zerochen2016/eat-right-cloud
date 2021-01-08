
const app = getApp()
var verifyCodeLock = 0 //防止连续点击获取验证码
var loginLock = 0 //防止连续点击登录
var util = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputMobile: "",
    verifyCode: "",
    loginStyle: 0,
    verifyStyle: 1,
    countDown: 120,
    countDownText: '获取验证码',
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
  verifyCodeChange: function(e){
    var value = e.detail.value
    if(!util.isPositiveInteger(value)){
      if(value){
        value = value.substring(0, value.length-1)        
      }
    }
    this.setData({
      verifyCode: value
    })
    this.checkLoginStyle()
  },
  checkLoginStyle: function(){
    if(util.isMobile(this.data.inputMobile) && this.data.verifyCode.length == 6){
      this.setData({
        loginStyle: 1
      })
    }else{
      this.setData({
        loginStyle: 0
      })
    }
  },
  /**
   * TODO 登录接口修改
   */
  doLogin: function(e){
    console.log(e)
    var that = this
    if(util.isMobile(this.data.inputMobile) && this.data.verifyCode.length == 6 && loginLock == 0){
      loginLock = 1
      wx.request({
        url: app.globalData.apiHost, 
        data: 
        JSON.stringify({
          "method": "UserAPI.SignUpByPhone",
          "service": "com.jt-health.api.app",
          "request": {
           "phone": that.data.inputMobile,
           "sms_verification_code": that.data.verifyCode,
           "nation_code": that.data.areaCode,
           "language_code": "zh_Hans",
           "plain_password": 'jt' + that.data.inputMobile
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
          if(res.statusCode == 200){
            let user = app.getUser()
            if(user){
              user.id = res.data.user_profile_id
              // user.access_token = res.data.access_token
              // user.refresh_token = res.data.refresh_token
              app.setUser(user)
            }else{
              app.setUser({
                id: res.data.user_profile_id,
                // access_token: res.data.access_token,
                // refresh_token: res.data.refresh_token
              })
            }
          }
        
        },
      })     
    }  
    loginLock = 0
  },
  //获取验证码
  getVerifyCode: function(){
    var that = this
    if(this.data.countDownText == '获取验证码' && verifyCodeLock == 0){
      verifyCodeLock = 1
      wx.request({
        url: app.globalData.apiHost, 
        data: 
        JSON.stringify({
          "method": "SmsAPI.SendVerificationCode",
          "service": "com.jt-health.api.app",
          "request": {
           "phone": that.data.inputMobile,
           "template_action": "TEMPLATE_ACTION_SIGNUP",
           "nation_code": that.data.areaCode,
           "language": "LANGUAGE_SIMPLIFIED_CHINESE"
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
          if(res.statusCode == 200){
            console.log('----request success---')
            console.log(res.data)
          }
        
        }
      })
      verifyCodeLock = 0
      //执行倒计时
      this.doCountDown()
    }
  },
  doCountDown: function(){
    if(this.data.countDown > 0){
      this.setData({
        countDownText: this.data.countDown,
        countDown: this.data.countDown - 1,
        verifyStyle: 0
      })
      setTimeout(this.doCountDown, 1000);
    }else{
      this.setData({
        countDownText: '获取验证码',
        countDown: 120,
        verifyStyle: 1,
      })
    }
  },
  areaCodeChange: function(e){
    console.log(e.detail)
    this.setData({
      areaCode: e.detail.areaCode
    })
  }
})