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
        // env: 'my-env-id',
        traceUser: true,
      })
    }
    //全局数据
    this.globalData = {
      apiHost: "https://dev-api.jt-health.cn:18088/rpc",//接口前缀，需要https
      // apiHost: "https://api.jt-health.cn:18088/rpc",//接口前缀，需要https
      resourcesHost: "https://jtfile.pingfangli.com/",//图片等资源前缀，需要https
      userInfo: null,//微信授权后获取用户昵称和头像,
    }

    this.getWechatUserInfo()//微信授权信息   
    this.timedTaskRefreshToken()
  },
  

  getWechatUserInfo: function(){
    // 获取用户信息，
    // 1. 已经授权获取手机号的去主页
    // 2. 已经授权未获取手机号的去登录页
    // 3. 未授权的去登录页面
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.globalData.userInfo = res.userInfo
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
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
   * 首页重要通知版本号，标记是否展示过
   */
  getImportantNoticeVersion: function(){
    return wx.getStorageSync("importantNoticeVersion");
  },
  /**
   * 首页重要通知版本号，标记是否展示过
   */
  setImportantNoticeVersion: function(version){
    wx.setStorageSync("importantNoticeVersion", version);
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
  getAccessToken: function(){
    return wx.getStorageSync("accessToken")
  },
  setAccessToken: function(accessToken){
    wx.setStorageSync("accessToken", accessToken);
  },
  getRefreshToken: function(){
    return wx.getStorageSync("refreshToken");
  },
  setRefreshToken: function(refreshToken){
    wx.setStorageSync("refreshToken", refreshToken);
  },
  getRequestSign: function(){
    return wx.getStorageSync("requestSign");
  },
  setRequestSign: function(requestSign){
    wx.setStorageSync("requestSign", requestSign);
  },
  timedTaskRefreshToken: function(accessToken){
    let that = this
    console.log("-------6分钟定时任务 刷新token-----")
    if(that.getAccessToken()){
      console.log("-----has accessToken----")
    }else{
      console.log("-----no accessToken----")
      //TODO 云托管
      wx.request({
        url: "http://jt.pingfangli.com/sign", 
        data: {
          accessToken: accessToken,
          key: "jtutil_sign"
        },
      
        dataType: 'json',
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        success(res) {
          that.setRequestSign(res.data.info)
        }
      })
    }

    //8分钟定时器
    setTimeout(that.timedTaskRefreshToken,480000)
    
  }
})
