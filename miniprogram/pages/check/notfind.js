const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageWarnCircleFill: app.globalData.resourcesHost + 'check/warning-circle-fill@2x.png',
    imageDevice: app.globalData.resourcesHost + 'check/device.png',
    imageDeviceSell: app.globalData.resourcesHost + 'check/device-sell.png',
    imageArrowWhite: app.globalData.resourcesHost + 'arrow-white@3x.png',
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
    this.selectComponent("#header").showAll("检测")
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