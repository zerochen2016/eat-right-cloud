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