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
    let that = this
    let info = JSON.parse(options.info)
    if(info.user_profile.gender == 'GENDER_MALE'){
      info.gender = '男'
    }else if(info.user_profile.gender == 'GENDER_FEMALE'){
      info.gender = '女'
    }else{
      info.gender = '未知'
    }
    info.height = '未知'
    if(info.user_profile.height){
      info.height = info.user_profile.height + '厘米'
    }
    if(info.user_profile.weight){
      info.weight = info.user_profile.weight + '公斤'
    }
    this.setData({
      self: (app.getUser().id == options.id) ? true : false,
      thisInfo: info,
      master: (info.is_primary_user) ? true : false
    },function(){
      console.log(console.log(that.data))
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
    this.selectComponent("#header").showAll("我的家庭")
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

  doRemoveFamily: function(){
    let that = this
    wx.request({
      url: app.globalData.apiHost, 
      data: 
      JSON.stringify({
        "method": "FamilyAPI.DeleteFamilyMember",
        "service": "com.jt-health.api.app",
        "request": {
          "family_id": that.data.thisInfo.family_id,
          "family_member_id": that.data.thisInfo.family_member_id,
          "user_id": app.getUser().id,
        }
        
       }),
      dataType: 'json',
      method: "POST",
      header: {
        'content-type': 'application/json',
        "Authorization": 'Bearer ' + app.getRequestSign()
      },
      success(res) {
        console.log(res)
        if(res.statusCode == 200){
          wx.navigateTo({
            url: '../my/my-family',
          })
        }

      },
    })     
  },
  removeFamily: function(e){
    var that = this
    wx.showModal({
      title: '',
      content: '该家庭成员将被移出家庭，是否确认移除该家庭成员？',
      showCancel: true,
      success: function(res){
        if(res.confirm){
          console.log('确定')
          that.doRemoveFamily()
        }else{
          console.log('取消')
        }
      },
      
    })
  },      
  doExitFamily: function(){
    let that = this
    wx.request({
      url: app.globalData.apiHost, 
      data: 
      JSON.stringify({
        "method": "FamilyAPI.ExitFamily",
        "service": "com.jt-health.api.app",
        "request": {
         "user_id": app.getUser().id,
        }
        
       }),
      dataType: 'json',
      method: "POST",
      header: {
        'content-type': 'application/json',
        "Authorization": 'Bearer ' + app.getRequestSign()
      },
      success(res) {
        console.log(res)
        if(res.statusCode == 200){
          if(res.data.ok){
            wx.redirectTo({
              url: '../my/my-family',
            })
          }
        }

      },
    })     
  },    
  
  exitFamily: function(e){
    var that = this
    wx.showModal({
      title: '',
      content: '确认退出当前家庭吗？',
      showCancel: true,
      success: function(res){
        if(res.confirm){
          console.log('确定')
          that.doExitFamily()
        }else{
          console.log('取消')
        }
      },
      
    })

      
  }
})