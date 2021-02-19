require('./page-extend')
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'eatright-0g1wf495a9878e14',
        traceUser: true,
      })
    }
    

  
  
    //全局数据
    this.globalData = {
      h5Host: "https://res.jt-health.cn/app-dev/v1/index.html#/",
      // h5Host: "https://res.jt-health.cn/app/v1/index.html#/",
      // apiHost: "https://dev-api.jt-health.cn/rpc",//接口前缀，需要https
      apiHost: "https://api.jt-health.cn/rpc",//接口前缀，需要https
      resourcesHost: "https://jtfile.pingfangli.com/",//图片等资源前缀，需要https
      // signHost: "http://jt.pingfangli.com/",
      userInfo: null,//微信授权后获取用户昵称和头像,
      isIos: false
    }
    const system = wx.getSystemInfoSync().system.toLowerCase().toString()
    if(system.indexOf('ios') != -1 || system.indexOf('macos') != -1){
      this.globalData.isIos = true
    }

    this.timedTaskRefreshToken()
  },
  
  /**
   * 检测时播放的音乐链接
   */
  getCheckMusicUrl: function(){
    let checkMusicUrl = wx.getStorageSync("checkMusicUrl")
    if(checkMusicUrl){
      return checkMusicUrl
    }else{
      return getApp().globalData.resourcesHost + 'bgms/bgm0.mp3'
    }
  },
  /**
   * 检测时播放的音乐链接
   */
  setCheckMusicUrl: function(checkMusicUrl){
    return wx.setStorageSync("checkMusicUrl",checkMusicUrl);
  },
  /**
   * 检测时的背景音乐状态0关1开
   */
  getVolumnStatus: function(){
    return wx.getStorageSync("volumnStatus");
  },
  /**
   * 检测时的背景音乐状态0关1开
   */
  setVolumnStatus: function(volumnStatus){
    return wx.setStorageSync("volumnStatus",volumnStatus);
  },
  /**
   * 获取缓存中的用户
   */
  getUser: function(){
    return wx.getStorageSync("user");
  },
  /**
   * 更新缓存中的用户
   */
  setUser: function(user){
    wx.setStorageSync("user", user);
  },
  /**
   * 获取缓存中的用户档案
   */
  getUserProfile: function(){
    return wx.getStorageSync("userProfile");
  },
  /**
   * 更新缓存中的用户档案
   */
  setUserProfile: function(userProfile){
    wx.setStorageSync("userProfile", userProfile);
  },  
    /**
   * 上次连接的设备
   */
  getLastDevice: function(){
    return wx.getStorageSync("device");
  },
  /**
   * 上次连接的设备
   */
  setLastDevice: function(device){
    wx.setStorageSync("device", device);
  },
  /**
   * 上次搜索到的设备
   */
  getLastDevices: function(){
    return wx.getStorageSync("devices");
  },
  /**
   * 上次搜索到的设备
   */
  setLastDevices: function(devices){
    wx.setStorageSync("devices", devices);
  },
  /**
   * 邀请人ID
   */
  getShareId: function(){
    return wx.getStorageSync("shareId");
  },
  /**
   * 邀请人ID
   */
  setShareId: function(shareId){
    wx.setStorageSync("shareId", shareId);
  },  
  /**
   * 版本号
   */
  getAppVersion: function(){
    return wx.getStorageSync("version");
  },
  /**
   * 版本号
   */
  setAppVersion: function(version){
    wx.setStorageSync("version", version);
  },
  /**
   * 加载框
   * title: 标题
   * second: 展现秒数
   */
  toast: function(title,second){
    wx.showLoading({
      title: title,
      icon: 'loading',
      duration: second * 1000,
    })
  },

  /**
   * alert提示框
   * title: 标题
   * content: 提示内容
   */
  alert: function (title, content) {
    wx.showModal({
      title: title,
      content: content,
      showCancel: false,
    })
  },
  gethasGuide: function(){
    return wx.getStorageSync("hasGuide");
  },
  sethasGuide: function(hasGuide){
    wx.setStorageSync("hasGuide", hasGuide);
  },  
  getWechatNationCode: function(){
    return wx.getStorageSync("wechatNationCode");
  },
  setWechatNationCode: function(wechatNationCode){
    wx.setStorageSync("wechatNationCode", wechatNationCode);
  },
  getWechatMobile: function(){
    return wx.getStorageSync("wechatMobile");
  },
  setWechatMobile: function(wechatMobile){
    wx.setStorageSync("wechatMobile", wechatMobile);
  },
  getUnionId: function(){
    return wx.getStorageSync("unionId");
  },
  setUnionId: function(unionId){
    wx.setStorageSync("unionId", unionId);
  },
  getRequestSign: function(){
    return wx.getStorageSync("requestSign");
  },
  setRequestSign: function(requestSign){
    wx.setStorageSync("requestSign", requestSign);
  },
  updateRequestSign: function(accessToken){
    console.log("-----updateRequestSign-----",accessToken)
    if(accessToken.length < 1){
      accessToken = 'no'
    }
    let that = this
    wx.cloud.callContainer({
      path: '/container-jt-util/jwt/sign/' + accessToken, 
      method: 'POST',
      data:{
        accessToken: accessToken
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      dataType: 'json',
      success: function(res){
        let token = res.data.info
        that.setRequestSign(token)
      }
    })
    // wx.request({
    //   url: that.globalData.signHost + "sign", 
    //   data: {
    //     accessToken: accessToken,
    //     key: "jtutil_sign"
    //   },
    
    //   dataType: 'json',
    //   method: "POST",
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded',
    //   },
    //   success: function(res){
    //     let token = res.data.info
    //     that.setRequestSign(token)
    //   }
    // })                          
  },
  timedTaskRefreshToken: function(){
    let that = this
    wx.cloud.callContainer({
      path: '/container-jt-util/jwt/sign/no', 
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res){
        console.log(res)
        let user = that.getUser()
        let token = res.data.info
        if(user && user.refreshToken){
          console.log("-----has refreshToken----")
          console.log(user.refreshToken)
          wx.request({
            url: that.globalData.apiHost, 
            data: 
            JSON.stringify({
              "method": "UserAPI.RefreshRefreshToken",
              "service": "com.jt-health.api.app",
              "request": {
               "user_id": user.id,
               "refresh_token": user.refreshToken
              }
             }),
            dataType: 'json',
            method: "POST",
            header: {
              'content-type': 'application/json',
              "Authorization": 'Bearer ' + token
            },
            success(res) {
              console.log(res)
              if(res.statusCode == 200){
                const refreshToken = res.data.refresh_token.token
                if(refreshToken){
                  wx.request({
                    url: that.globalData.apiHost, 
                    data: 
                    JSON.stringify({
                      "method": "UserAPI.RefreshAccessToken",
                      "service": "com.jt-health.api.app",
                      "request": {
                       "user_id": user.id,
                       "refresh_token": user.refreshToken
                      }
                     }),
                    dataType: 'json',
                    method: "POST",
                    header: {
                      'content-type': 'application/json',
                      "Authorization": 'Bearer ' + token
                    },
                    success(res) {
                      console.log(res)
                      if(res.statusCode == 200){
                        const accessToken = res.data.access_token.token
                        if(refreshToken){
                          user.refreshToken = refreshToken
                          user.accessToken = accessToken
                          that.setUser(user)
                          wx.cloud.callContainer({
                            path: '/container-jt-util/jwt/sign/' + user.accessToken, 
                            method: 'POST',
                            data: {
                              accessToken: user.accessToken
                            },
                            dataType: 'json',
                            header: {
                              "Content-Type": "application/x-www-form-urlencoded"
                            },
                            success: function(res){
                              console.log(res)
                              let token = res.data.info
                              that.setRequestSign(token)
                            }
                          })
                        }
                      }
                    },
                  }) 
                }
              }
            },
          })   
        }else{
          console.log("-----no refreshToken----")
          that.setRequestSign(token)
        }
      }
    })
    //8分钟定时器
    setTimeout(that.timedTaskRefreshToken,480000)
  },
  // timedTaskRefreshToken: function(){
  //   let that = this
  //   console.log("-------6分钟定时任务 刷新token-----")
  //   wx.request({
  //     url: that.globalData.signHost + "sign", 
  //     data: {
  //       accessToken: "",
  //       key: "jtutil_sign"
  //     },
  //     dataType: 'json',
  //     method: "POST",
  //     header: {
  //       'content-type': 'application/x-www-form-urlencoded',
  //     },
  //     success(res) {
  //       let user = that.getUser()
  //       let token = res.data.info
  //       if(user && user.refreshToken){
  //         console.log("-----has refreshToken----")
  //         console.log(user.refreshToken)
  //         wx.request({
  //           url: that.globalData.apiHost, 
  //           data: 
  //           JSON.stringify({
  //             "method": "UserAPI.RefreshRefreshToken",
  //             "service": "com.jt-health.api.app",
  //             "request": {
  //              "user_id": user.id,
  //              "refresh_token": user.refreshToken
  //             }
  //            }),
  //           dataType: 'json',
  //           method: "POST",
  //           header: {
  //             'content-type': 'application/json',
  //             "Authorization": 'Bearer ' + token
  //           },
  //           success(res) {
  //             console.log(res)
  //             if(res.statusCode == 200){
  //               const refreshToken = res.data.refresh_token.token
  //               if(refreshToken){
  //                 wx.request({
  //                   url: that.globalData.apiHost, 
  //                   data: 
  //                   JSON.stringify({
  //                     "method": "UserAPI.RefreshAccessToken",
  //                     "service": "com.jt-health.api.app",
  //                     "request": {
  //                      "user_id": user.id,
  //                      "refresh_token": user.refreshToken
  //                     }
  //                    }),
  //                   dataType: 'json',
  //                   method: "POST",
  //                   header: {
  //                     'content-type': 'application/json',
  //                     "Authorization": 'Bearer ' + token
  //                   },
  //                   success(res) {
  //                     console.log(res)
  //                     if(res.statusCode == 200){
  //                       const accessToken = res.data.access_token.token
  //                       if(refreshToken){
  //                         user.refreshToken = refreshToken
  //                         user.accessToken = accessToken
  //                         that.setUser(user)
  //                         wx.request({
  //                           url: that.globalData.signHost + "sign", 
  //                           data: {
  //                             accessToken: accessToken,
  //                             key: "jtutil_sign"
  //                           },
                          
  //                           dataType: 'json',
  //                           method: "POST",
  //                           header: {
  //                             'content-type': 'application/x-www-form-urlencoded',
  //                           },
  //                           success: function(res){
  //                             let token = res.data.info
  //                             that.setRequestSign(token)
  //                           }
  //                         })
  //                       }
  //                     }
  //                   },
  //                 }) 
  //               }
  //             }
  //           },
  //         })   
  //       }else{
  //         console.log("-----no refreshToken----")
  //         that.setRequestSign(token)
  //       }
  //     }
  //   })
  //   //8分钟定时器
  //   setTimeout(that.timedTaskRefreshToken,480000)
    
  // }
})
