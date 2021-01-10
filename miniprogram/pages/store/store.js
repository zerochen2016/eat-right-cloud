// pages/store/store.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

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
    this.getMyStore()
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

  //TODO 我的收藏API
  getMyStore: function(){
    var that = this
      // wx.request({
      //   url: getApp().data.server + 'getSpecialData',
      //   data: {
      //     specialId: that.data.specialId 
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
      //           articleArray: result.data.articles
      //         })
      //       } 
      //     } else {
      //       return;
      //     }
      //   },
      // })    
      //TODELETE 测试用数据
      var articleArray = [
        {articleId: 'articleId1', articlePicture: '../images/test/1.png', articleTitle: '吃巧qq克力能变聪明？还能促进脑血管修复？', articleContent: '根据最近qq一项研究，科学家们指出…根据最近一项研究，科学家们指出…', articleUrl:'httpw://www.baidu.com'},
        {articleId: 'articleId2', articlePicture: '../images/test/2.png', articleTitle: '吃巧克力ww能变聪明？还能促进脑血管修复？', articleContent: '根q据最近一项研究，科学家们指出…根据最近一项研究，科学家们指出…', articleUrl:'httpw://www.baidu.com'},
        {articleId: 'articleId3', articlePicture: '../images/test/3.png', articleTitle: '吃巧c克力能变聪明？还能促进脑血管修复？', articleContent: '根据最近一项b研究，科学家们指出…根据最近一项研究，科学家们指出…', articleUrl:'httpw://www.baidu.com'},
        {articleId: 'articleId1', articlePicture: '../images/test/1.png', articleTitle: '吃巧qq克力能变聪明？还能促进脑血管修复？', articleContent: '根据最近qq一项研究，科学家们指出…根据最近一项研究，科学家们指出…', articleUrl:'httpw://www.baidu.com'},
        {articleId: 'articleId2', articlePicture: '../images/test/2.png', articleTitle: '吃巧克力ww能变聪明？还能促进脑血管修复？', articleContent: '根q据最近一项研究，科学家们指出…根据最近一项研究，科学家们指出…', articleUrl:'httpw://www.baidu.com'},
        {articleId: 'articleId3', articlePicture: '../images/test/3.png', articleTitle: '吃巧c克力能变聪明？还能促进脑血管修复？', articleContent: '根据最近一项b研究，科学家们指出…根据最近一项研究，科学家们指出…', articleUrl:'httpw://www.baidu.com'},
        {articleId: 'articleId1', articlePicture: '../images/test/1.png', articleTitle: '吃巧qq克力能变聪明？还能促进脑血管修复？', articleContent: '根据最近qq一项研究，科学家们指出…根据最近一项研究，科学家们指出…', articleUrl:'httpw://www.baidu.com'},
        {articleId: 'articleId2', articlePicture: '../images/test/2.png', articleTitle: '吃巧克力ww能变聪明？还能促进脑血管修复？', articleContent: '根q据最近一项研究，科学家们指出…根据最近一项研究，科学家们指出…', articleUrl:'httpw://www.baidu.com'},
        {articleId: 'articleId3', articlePicture: '../images/test/3.png', articleTitle: '吃巧c克力能变聪明？还能促进脑血管修复？', articleContent: '根据最近一项b研究，科学家们指出…根据最近一项研究，科学家们指出…', articleUrl:'httpw://www.baidu.com'},
      
    ]
      that.setData({
        articleArray: articleArray
      })
  },
})