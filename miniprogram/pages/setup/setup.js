const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    serviceArray: ['《用户服务协议及隐私政策》','《会员服务协议》','《自动续费服务声明》'],
    servicePath: ['../policy/policy-user','../policy/policy-member','../policy/policy-autobuy'],
    serviceIndex: 0,
    languageArray: ['简体中文'],
    languageIndex: 0,
    musicArray: ['Auid Lang Syne'],
    musicIndex: 0,
    imageArrow: app.globalData.resourcesHost + 'arrow@2x.png'
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
    this.selectComponent("#header").showAll("设置")
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
  serviceChange: function(e){
    let that = this
    console.log(e)
    let index = e.detail.value
    wx.navigateTo({
      url: that.data.servicePath[index],
    })
  },
  languageChange: function(e){
    console.log(e)
  },
  musicChange: function(e){
    console.log(e)
  },
  loginout: function(e){
    console.log(e)
    wx.clearStorageSync()
    getApp().updateRequestSign('')
    wx.redirectTo({
      url: '../login/login',
    })
  },
})