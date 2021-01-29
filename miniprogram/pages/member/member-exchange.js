const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageCard: app.globalData.resourcesHost + 'my/card@3x.png',
    imageScan: app.globalData.resourcesHost + 'my/scan@2x.png',
    imageHandInput: app.globalData.resourcesHost + 'my/handinput@2x.png',
    imageAlbum: app.globalData.resourcesHost + 'my/album@2x.png'
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
    this.selectComponent("#header").showAll("扫码兑换")
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

  
  scan: function (e) {
    // 允许从相机和相册扫码
    wx.scanCode({
      success (res) {
        console.log(res)
      }
    })
  },
  
})