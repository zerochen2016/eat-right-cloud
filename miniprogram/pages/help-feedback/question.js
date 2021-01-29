// pages/help-feedback/question.js
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
    let title = ""
    let content = ""
    if(options.id == 1){

    }else if(options.id == 2){
      title = "感测器对手机有什么要求？"
      content = "Android 6.0版及以上，iOS 10.0.0版及以上。"
    }else if(options.id == 3){
      title = "如何查看小阶感测器MAC地址（设备地址）？"
      content = "小阶感测器背后贴纸上”MACADDRESS“后面的一串数字或字母。"
    }
    this.setData({
      title: title,
      content: content
    })
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
    this.selectComponent("#header").showAll("帮助与反馈")
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