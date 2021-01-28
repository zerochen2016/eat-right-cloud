const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageV: app.globalData.resourcesHost + 'member/v.png',
    imageTrue: app.globalData.resourcesHost + 'member/true@2x.png',
    imageFalse: app.globalData.resourcesHost + 'member/false@2x.png',
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
    this.selectComponent("#header").setTitle("权益对比")
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
    let h = 15
    let h2 = parseInt(this.data.statusHeight/this.data.pixelRatio) + 72
    if(this.data.scrollTop < e.scrollTop){
      console.log("页面上滑")
      if(!(this.data.showTitle) && e.scrollTop > h){
        //调用显示动画
        this.selectComponent("#header").show()
        this.setData({
          showTitle: true
        })
      }
      if(!(this.data.showTitle2) && e.scrollTop > h2){
        //调用显示动画
        this.selectComponent("#header").showText()
        this.setData({
          showTitle2: true
        })
      }
    }else{
      console.log("页面下滑")
      if((this.data.showTitle)){
        //调用消失动画
        this.selectComponent("#header").hide()
        this.selectComponent("#header").hideText()
        this.setData({
          showTitle: false,
          showTitle2: false
        })
      }
    }
    this.setData({
      scrollTop: e.scrollTop
    })
  },
})