const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageLamp: app.globalData.resourcesHost + 'my/lamp@2x.png',
    imageSensor: app.globalData.resourcesHost + 'my/sensor@2x.png',
    imageMiniProgram: app.globalData.resourcesHost + 'my/miniprogram@2x.png',
    imageLampCheck: app.globalData.resourcesHost + 'my/lamp-check@2x.png',
    imageArrow: app.globalData.resourcesHost + 'arrow@2x.png',
    imageFeedback: app.globalData.resourcesHost + 'my/feedback@2x.png'
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
    this.selectComponent("#header").setTitle("帮助中心")
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
})