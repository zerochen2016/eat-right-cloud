const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    specialArray: [],
    recommend: {},
    carefullyChosen1: [],
    carefullyChosen2: [],
    moreRecommend: {},
    activeIndex: 0,
    showImportantNotice: 0,
    importantNotice: {},
    resourcesHost: ''
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
    let user = app.getUser()
    if(user && user.id){
      //获取弹窗公共
      this.getVersionUpdateInfo()
      //获取专题数据
      this.listSpecial()
      //获取大图推荐
      this.getRecommend()
      //获取精选
      this.listCareFullyChosen()
      //获取更多为您推荐
      this.getMoreRecommend()
    }

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

  //专题栏滑动事件
  scroll(e) {
    
  },
  
  onPageScroll(e){
    console.log(e)
  },
  
  //TODO 专题列表API
  listSpecial: function(){
    var that = this
      // wx.request({
      //   url: getApp().data.server + 'listSpecial',
      //   data: {

      //   },
      //   dataType: 'json',
      //   header: {
      //     'content-type': 'application/x-www-form-urlencoded' 
      //   },
      //   method: 'POST',
      //   success: function (res) {
      //     if (res.statusCode == 200) {
      //       var result = res.data;
      //       console.info(result);
      //       if (result.code == 0) {
      //         that.setData({
      //           specialArrray: result
      //         })
      //       } 
      //     } else {
      //       return;
      //     }
      //   },
      // })       
      //TODELETE 测试用数据
      that.setData({
        specialArray: [
          {id: "special1", picture:"../../images/test/1.png"},
          {id: "special2", picture:"../../images/test/2.png"},
          {id: "special3", picture:"../../images/test/3.png"},
          {id: "special4", picture:"../../images/test/4.png"},
          ]
      })
  },
  //TODO 获取推荐API
  getRecommend: function(){
    var that = this
      // wx.request({
      //   url: getApp().data.server + 'getRecommend',
      //   data: {

      //   },
      //   dataType: 'json',
      //   header: {
      //     'content-type': 'application/x-www-form-urlencoded' 
      //   },
      //   method: 'POST',
      //   success: function (res) {
      //     if (res.statusCode == 200) {
      //       var result = res.data;
      //       console.info(result);
      //       if (result.code == 0) {
      //         that.setData({
      //           recommend: result
      //         })
      //       } 
      //     } else {
      //       return;
      //     }
      //   },
      // })    
      //TODELETE 测试用数据
      that.setData({
        recommend: 
          {id: "special1", picture:"../../images/test/1.png", title: "小阶感测器", decribe: "弹指之间 健康可见", price: "999.00", url: "https://www.baidu.com/"}
      })
  },
  toSpecial: function(e){
    wx.navigateTo({
      url: '../special/special?id=' + e.currentTarget.dataset.id,
    })
  },
  //TODO 精选API，第三方跳转
  listCareFullyChosen: function(){
    var that = this
      // wx.request({
      //   url: getApp().data.server + 'listCareFullyChosen',
      //   data: {

      //   },
      //   dataType: 'json',
      //   header: {
      //     'content-type': 'application/x-www-form-urlencoded' 
      //   },
      //   method: 'POST',
      //   success: function (res) {
      //     if (res.statusCode == 200) {
      //       var result = res.data;
      //       console.info(result);
      //       if (result.code == 0) {
      //         that.setData({
      //           careFullyChosen1: result.careFullyChosen1,
      //           careFullyChosen2: result.careFullyChosen2
      //         })
      //       } 
      //     } else {
      //       return;
      //     }
      //   },
      // })    
      //TODELETE 测试用数据
      that.setData({
        carefullyChosen1: [
          {picture: "../../images/test/1.png", url: "http://www.baidu.com"},
          {picture: "../../images/test/2.png", url: "http://www.baidu.com"},
          {picture: "../../images/test/3.png", url: "http://www.baidu.com"},
          {picture: "../../images/test/4.png", url: "http://www.baidu.com"},
          {picture: "../../images/test/5.png", url: "http://www.baidu.com"},
          {picture: "../../images/test/6.png", url: "http://www.baidu.com"}
        ],
        carefullyChosen2: [
          {picture: "../../images/test/1.png", url: "http://www.baidu.com"},
          {picture: "../../images/test/2.png", url: "http://www.baidu.com"},
          {picture: "../../images/test/3.png", url: "http://www.baidu.com"},
          {picture: "../../images/test/4.png", url: "http://www.baidu.com"},
          {picture: "../../images/test/5.png", url: "http://www.baidu.com"},
          {picture: "../../images/test/6.png", url: "http://www.baidu.com"}
        ]
      })
  },
    //TODO 更多为您推荐API
    getMoreRecommend: function(){
      var that = this
        // wx.request({
        //   url: getApp().data.server + 'getMoreRecommend',
        //   data: {
  
        //   },
        //   dataType: 'json',
        //   header: {
        //     'content-type': 'application/x-www-form-urlencoded' 
        //   },
        //   method: 'POST',
        //   success: function (res) {
        //     if (res.statusCode == 200) {
        //       var result = res.data;
        //       console.info(result);
        //       if (result.code == 0) {
        //         that.setData({
        //           moreRecommend: result.moreRecommend
        //         })
        //       } 
        //     } else {
        //       return;
        //     }
        //   },
        // })    
        //TODELETE 测试用数据
        that.setData({
          moreRecommend: {
            picture: "../../images/test/6.png", url: "http://www.baidu.com"
          }
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
  initData: function(){
    //导航选中
    this.selectComponent("#bottom-navigate").changeActiveIndex(0)
  }
})