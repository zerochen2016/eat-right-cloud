const app = getApp()
let dataDelayDoInterval = null
Page({
  /**
   * 页面的初始数据
   */
  data: {
    activeIndex: 0,
    showImportantNotice: 0,
    imageDevice2: app.globalData.resourcesHost + 'device2.png',
    imageShare: app.globalData.resourcesHost + 'share@2x.png',
    imageArrowBlue: app.globalData.resourcesHost + 'arrow-blue@2x.png',
    imageLogoAlert: app.globalData.resourcesHost + 'logo-alert@2x.png',
    imageCancelCircle: app.globalData.resourcesHost + 'cancel-circle@2x.png',
    imageTest1: app.globalData.resourcesHost + 'test/1.png',
    imageTest2: app.globalData.resourcesHost + 'test/2.png',
    imageTest3: app.globalData.resourcesHost + 'test/3.png',
    imageTest4: app.globalData.resourcesHost + 'test/4.png',
    imageTest5: app.globalData.resourcesHost + 'test/5.png',
    imageTest6: app.globalData.resourcesHost + 'test/6.png',
    imageWangweigong1: app.globalData.resourcesHost + 'article/wangweigong1.png'
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
    const that = this
    //导航选中
    this.selectComponent("#bottom-navigate").changeActiveIndex(0)
    let user = app.getUser()
    if(user && user.id){
      dataDelayDoInterval = setTimeout(function(){
      //获取弹窗公共
      that.getVersionUpdateInfo()
      //获取专题菜单
      that.listChannelMenus()
      //获取感测器链接
      that.getDeviceGoods()
      //获取精选
      that.listRecommendations()
      },500)
      
    }

  },


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("----Home onHide----")
    clearInterval(dataDelayDoInterval)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("----Home onUnload----")
    clearInterval(dataDelayDoInterval)
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

  //专题栏滑动事件
  scroll(e) {
    
  },
  
  onPageScroll(e){
    console.log(e)
  },
  
  
  toSpecial: function(e){
    wx.navigateTo({
      url: '../special/special?id=' + e.currentTarget.dataset.id,
    })
  },
  
  getVersionUpdateInfo: function(){
    let that = this
    console.log(wx.getSystemInfoSync())   
    const system = wx.getSystemInfoSync().system.toLowerCase().toString()
    console.log(system)
    let method = "UserAPI.GetAndroidUpdateInfo"
    let isIos = false
    if(system.indexOf('ios') != -1 || system.indexOf('macos') != -1){
      method = "UserAPI.GetIOSUpdateInfo"
      isIos = true
    }
    wx.request({
      url: app.globalData.apiHost, 
      data: 
      JSON.stringify({
        "method": method,
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
          let appLink, appSize, updateInfo, version = ''
          let showImportantNotice = 0
          if(isIos){
            appLink = res.data.app_store_link,
            appSize = res.data.app_size,
            updateInfo = res.data.update_info,
            version = res.data.version
          }else{
            appLink = res.data.apk_link,
            appSize = res.data.apk_size,
            updateInfo = res.data.update_info,
            version = res.data.version
          }
          if(app.getAppVersion() != version){
            showImportantNotice = 1
          }
           that.setData({
            appLink: appLink,
            appSize: appSize,
            updateInfo: updateInfo,
            version: version,
            showImportantNotice: showImportantNotice
          })

        }

      },
    })  
  },    
  closeNotice: function(e){
    app.setAppVersion(this.data.version)
    this.setData({
      showImportantNotice: 0
    })
  },
  listChannelMenus: function(){
    const that = this
    wx.request({
      url: app.globalData.apiHost, 
      data: 
      JSON.stringify({
        "method": "MarketingAPI.ListChannelMenus",
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
          if(res.data.channel_menus){
            that.setData({
              channelMenus: res.data.channel_menus
            })
          }
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
  },
  listRecommendations: function(){
    let that = this
    wx.request({
      url: app.globalData.apiHost, 
      data: 
      JSON.stringify({
        "method": "MarketingAPI.ListRecommendations",
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
          if(res){
            if(res.data.feature_pages){
              that.setData({
                features: res.data.feature_pages
              })
            }
          }
        }
        
      },
    })     
  },
  listMoreRecommendations: function(){
    wx.request({
      url: app.globalData.apiHost, 
      data: 
      JSON.stringify({
        "method": "MarketingAPI.MoreRecommendations",
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
          
        }
        
      },
    })     
  },
})