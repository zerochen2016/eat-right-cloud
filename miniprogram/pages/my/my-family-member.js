const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageReport: app.globalData.resourcesHost + 'report/report@2x.png',
    imageArrow: app.globalData.resourcesHost + 'arrow@2x.png',
    imageAnalysisWeek: app.globalData.resourcesHost + 'report/analysis-week@2x.png',
    imageAnalysisMonth: app.globalData.resourcesHost + 'report/analysis-month@2x.png',
    imageArrow: app.globalData.resourcesHost + 'arrow@2x.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoaded: function (options) {
    this.getFamily(options.id)
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

  /**
   * TODO 获取家庭成员信息API
   */
  getFamily: function (familyId) {
    var that = this
      // wx.request({
      //   url: getApp().data.server + 'getFamily',
      //   data: {
      //     userId: app.getUser().id,
      //     familyId: familyId
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
      //           familys: result.data.familys
      //         })
      //       } 
      //     } else {
      //       return;
      //     }
      //   },
      // })    
      //TODELETE 测试用数据
      that.setData({
        familyId: 1,
        familyAvatarUrl: '../images/report/report@2x.png',
        familyName: '成员名称',
        lastCheckTime: '2020-10-10'
      })
  },
      /**
   * TODO 移除家庭成员API
   */
  removeFamily: function(e){
    var that = this
    wx.showModal({
      title: '',
      content: '该家庭成员将被移出家庭，是否确认移除该家庭成员？',
      showCancel: true,
      success: function(res){
        if(res.confirm){
          console.log('确定')
      // wx.request({
      //   url: getApp().data.server + 'removeFamily',
      //   data: {
      //     userId: app.getUser().id,
      //     familyId, that.data.familyId 
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
      
      //       } 
      //     } else {
      //       return;
      //     }
      //   },
      // })    
        }else{
          console.log('取消')
        }
      },
      
    })

      
  },        
})