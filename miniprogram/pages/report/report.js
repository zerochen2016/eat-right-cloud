const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: '',
    imageFamily: app.globalData.resourcesHost + 'report/family@2x.png',
    imageReport: app.globalData.resourcesHost + 'report/report@2x.png',
    imageAnalysisWeek: app.globalData.resourcesHost + 'report/analysis-week@2x.png',
    imageAnalysisMonth: app.globalData.resourcesHost + 'report/analysis-month@2x.png' 
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
    //底部导航选中
    this.selectComponent("#bottom-navigate").changeActiveIndex(3)
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
})