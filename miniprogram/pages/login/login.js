// pages/login/login.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasAuth: false,
    mobile: ''
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
    var that = this;
    // 查看是否授权
    wx.getSetting({
        success(res) {
            if (res.authSetting['scope.userInfo']) {
                console.info("已经授权");
                that.setData({
                  hasAuth: true
                })
            } else {
              console.info("没有授权");
            }
        }
    })
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

  //授权获取用户信息
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    const loginType = e.currentTarget.dataset.logintype//1微信登录2手机号登录
    if(app.globalData.userInfo){
      this.setData({
        hasAuth: true
      })
      if(loginType == 1 && this.data.mobile){
        this.wechatLogin()
      }else if(loginType == 2){
        wx.navigateTo({
          url: '../login-mobile/login-mobile',
        })
      }
    }else{
      console.log('------拒绝授权信息------')
      console.info(app.globalData.userInfo);
    }
  },
  //TODO 微信登录API
  wechatLogin: function(){
    let that = this
    // 登录 TODO
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        const code = res.code
        wx.request({
          url: that.globalData.apiHost, 
          data: 
          JSON.stringify({
            "method": "UserAPI.SignInByCode",
            "service": "com.jt-health.api.app",
            "request": {
             "code": code,
             "language_code": "zh-Hans",
            }
            
           }),
          dataType: 'json',
          method: "POST",
          header: {
            'content-type': 'application/json',
            "Accept-Language": "zh-Hans",
            "Authorization": 'Bearer ' + sign
          },
          success(res) {
            console.log(res)
            wx.redirectTo({
              url: '../home/home',
            })
          }
        })
      }
    })
  },
  //绑定手机号
  getPhoneNumber: function(e){
    let that = this
    if(e.detail.encryptedData){
      console.log(e)
      //TODO API进行手机号绑定
      // wx.request({
      //   url: getApp().data.server + 'user-bindmobile',
      //   data: {
      //     shareId: app.getShareId(),
      //     encryptedData: e.detail.encryptedData,
      //     iv: e.detail.iv,
      //     openid: app.getUser().openid
      //   },
      //   dataType: 'json',
      //   header: {
      //     'content-type': 'application/x-www-form-urlencoded' // 默认值
      //   },
      //   method: 'POST',
      //   success: function (res) {
      //     if (res.statusCode == 200) {
      //       var result = res.data;
      //       console.info(result);
      //       if (result.code == 0) {
      //         app.setUser(result.data);
      //         that.wechatLogin()
      //           
      //       } 
      //     } else {
      //       return;
      //     }
      //   },
      // })      
    }else{
      console.log("拒绝获取手机号")
    }
  },
  
})