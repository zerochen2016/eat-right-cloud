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
    //获取弹窗公共
    this.getImportantNotice()
    //获取专题数据
    this.listSpecial()
    //获取大图推荐
    this.getRecommend()
    //获取精选
    this.listCareFullyChosen()
    //获取更多为您推荐
    this.getMoreRecommend()
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
  //TODO 重要通知API
  getImportantNotice: function(){
    var that = this
    // wx.request({
    //   url: getApp().data.server + 'getImportantNotice',
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
    //       if (result.code == 0) {
    //         if(app.getImportantNoticeVersion() != result.version){
    //           that.setData({
    //             showImportantNotice: 1,
    //             importantNotice: result.importantNotice
    //           })
    //           app.setImportantNoticeVersion(result.version)
    //         }

    //       } 
    //     } else {
    //       return;
    //     }
    //   },
    // })    
    //TODELETE 测试用数据
    if(app.getImportantNoticeVersion() != 2){
      that.setData({
        showImportantNotice: 1,
        importantNotice: {
          title: "小阶感测器10.1节日大促", url: "http://www.baidu.com", content: "*节日当天买一送一，送父母送长辈*节日当天购买赠送一年保修期"
        }
      })
      app.setImportantNoticeVersion(2)
    }
  },
  
  closeNotice: function(e){
    this.setData({
      showImportantNotice: 0
    })
  },
  initData: function(){
    this.selectComponent("#bottom-navigate").changeActiveIndex(0)
  }
})