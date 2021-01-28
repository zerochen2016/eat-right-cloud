// pages/login/login.js
const app = getApp()
const util = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasAuth: false,
    inputMobile: '',
    imageLogoLogin: app.globalData.resourcesHost + 'logo-login@2x.png',
    imageLogoWechat: app.globalData.resourcesHost + 'logo-wechat@2x.png',
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

  //授权获取用户信息
  getUserInfo: function(e) {
    console.log(e)
    let userInfo = e.detail.userInfo
    app.globalData.userInfo = userInfo
    const loginType = e.currentTarget.dataset.logintype//1微信登录2手机号登录
    if(userInfo){
      if(loginType == 1){
        this.getUnionId(e.detail.encryptedData,e.detail.iv)
      }else if(loginType == 2){
        wx.navigateTo({
          url: '../login/login-mobile',
        })
      }
    }else{
      console.log('------拒绝授权信息------')
      console.info(app.globalData.userInfo);
    }
  },
  getUnionId: function(encryptedData,iv){
    let that = this
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        const code = res.code
        let codeToApi = {
          encryptedData: encryptedData,
          iv: iv,
          code: code
        }
        wx.request({
          url: app.globalData.apiHost, 
          data: 
          JSON.stringify({
            "method": "UserAPI.SignInByWechatMiniProgram",
            "service": "com.jt-health.api.app",
            "request": {
             "code": JSON.stringify(codeToApi)
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
              if(res.data.union_id){
                app.setUnionId(res.data.union_id)
                that.setData({
                  hasAuth: true
                })
              }else{
                let userInfo = res.data
                app.setUser({
                  id: userInfo.user_id,
                  accessToken: userInfo.access_token.token,
                  refreshToken: userInfo.refresh_token.token,
                  yzCookieKey: userInfo.yz_cookie_key,
                  yzCookieValue: userInfo.yz_cookie_value,
                  yzOpenId: userInfo.yz_open_id,
                  mobile: userInfo.phone_mask
                })
                app.setUserProfile(userInfo.user_profile)
                app.updateRequestSign(userInfo.access_token.token)
                wx.navigateTo({
                  url: '../home/home',
                })

              }
              

            }
            
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
      wx.request({
        url: app.globalData.apiHost, 
        data: 
        JSON.stringify({
          "method": "UserAPI.GetWechatPhone",
          "service": "com.jt-health.api.app",
          "request": {
           "encrypted_data": e.detail.encryptedData,
           "v1": e.detail.iv,
           "union_id": app.getUnionId()
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
            app.setWechatMobile(res.data.phone)
            app.setWechatNationCode('+'+res.data.nation_code)
            that.doWechatLogin()
          }
          
        }
      })  
    }else{
      console.log("拒绝获取手机号")
    }
  },
  doWechatLogin: function(){
    wx.request({
      url: app.globalData.apiHost, 
      data: 
      JSON.stringify({
        "method": "UserAPI.BindWechatPhone",
        "service": "com.jt-health.api.app",
        "request": {
          "nation_code": app.getWechatNationCode(),
          "phone": app.getWechatMobile(),
          "union_id": app.getUnionId(),
          "sms_code": "",
          "avatar_url": app.globalData.userInfo.avatarUrl,
          "nickname": app.globalData.userInfo.nickname,
          "gender": app.globalData.userInfo.gender == 1 ? 'GENDER_MALE' : 'GENDER_FEMALE'
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
          let userInfo = res.data
          app.setUser({
            id: userInfo.user_id,
            accessToken: userInfo.access_token.token,
            refreshToken: userInfo.refresh_token.token,
            yzCookieKey: userInfo.yz_cookie_key,
            yzCookieValue: userInfo.yz_cookie_value,
            yzOpenId: userInfo.yz_open_id,
            mobile: userInfo.phone_mask
          })
          app.setUserProfile(userInfo.user_profile)
          app.updateRequestSign(userInfo.access_token.token)
          wx.navigateTo({
            url: '../home/home',
          })
        }
        
      }
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