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
    imageWangweigong1: app.globalData.resourcesHost + 'article/wangweigong1.png',
    imageJianzhi:  app.globalData.resourcesHost + 'home/jianzhi-new.jpg',
    imageJiankang:  app.globalData.resourcesHost + 'home/jiankang-new.jpg',
    imageYingyang:  app.globalData.resourcesHost + 'home/yingyang-new.jpg',
    imageShanshi:  app.globalData.resourcesHost + 'home/shanshi-new.jpg',
    imageDeviceHome:  app.globalData.resourcesHost + 'home/device-home-new.jpg',
    imageProductMain:  app.globalData.resourcesHost + 'home/product-main-new.jpg',
    imageProduct1:  app.globalData.resourcesHost + 'home/product1-new.jpg',
    imageProduct2:  app.globalData.resourcesHost + 'home/product2-new.jpg',
    imageProduct3:  app.globalData.resourcesHost + 'home/product3-new.jpg',
    imageProduct4:  app.globalData.resourcesHost + 'home/product4-new.jpg',
    imageProduct5:  app.globalData.resourcesHost + 'home/product5-new.jpg',
    imageProduct6:  app.globalData.resourcesHost + 'home/product6-new.jpg',
    imageProduct7:  app.globalData.resourcesHost + 'home/product7-new.jpg',
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
    //导航标题
    this.selectComponent("#header").setTitle("探索")
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
    clearInterval(dataDelayDoInterval)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
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
  
  
  toSpecial: function(e){
    wx.navigateTo({
      url: '../special/special?id=' + e.currentTarget.dataset.id,
    })
  },
  
  getVersionUpdateInfo: function(){
    let that = this
    console.log(wx.getSystemInfoSync())   
    const system = wx.getSystemInfoSync().system.toLowerCase().toString()
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
            let channelMenus = res.data.channel_menus
            for(let i = 0; i < channelMenus.length; i++){
              let image = channelMenus[i].image
              if(image.title = "健康"){
                channelMenus[i].image.public_access_url = that.data.imageJiankang
              }else if(image.title = "减脂"){
                channelMenus[i].image.public_access_url = that.data.imageJianzhi
              }else if(image.title = "膳食"){
                channelMenus[i].image.public_access_url = that.data.imageShanshi
              }else if(image.title = "营养"){
                channelMenus[i].image.public_access_url = that.data.imageYingyang
              }
            }
            that.setData({
              channelMenus: channelMenus
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
  toYouzanShop: function(e){
    wx.navigateToMiniProgram({
      appId: 'wx6deb54e571e86e3c',
      extraData: {},
      envVersion: 'release',
      success(res) {
        // 打开成功
        console.log('navigateToMiniProgram youzan')
      }
    })
  }
})