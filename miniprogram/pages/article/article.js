const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoaded: function (options) {
    this.getArticleDetail(options.id)
    
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

  //TODO 专题详情内容
  getArticleDetail: function(articleId){
    var that = this
    // wx.request({
    //   url: getApp().data.server + 'getSpecialData',
    //   data: {
    //     articleId: articleId,
    //     userId: app.getUser().id 
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
    //         wx.setNavigationBarTitle({
    //           title: '测试标题',
    //         })
    //         that.setData({
    //           content: result.data.articleContent,
    //           ifStore: result.data.ifStore //是否收藏，0否1是
    //         })
    //       } 
    //     } else {
    //       return;
    //     }
    //   },
    // })    
    //TODELETE 测试用数据
    that.setData({
      content: "",
      ifStore: 0
    })
  }
})