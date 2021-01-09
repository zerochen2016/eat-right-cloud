const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    familys: []
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
    this.listFamilyMembers()
    //TODELETE
    this.setData({
      familyVipRemaimDay: 10,
      vipRemainDay: 10
    })
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
  listFamilyMembers: function(){
    let that = this
    wx.request({
      url: app.globalData.apiHost, 
      data: 
      JSON.stringify({
        "method": "FamilyAPI.ListFamilyMembers",
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
          let familyMembers = res.data.family_members
          let familyId = null
          for(let i = 0; i < familyMembers.length; i++){
            if(familyMembers[i].is_primary_user){
              familyId = familyMembers[i].family_id
            }
          }
          that.setData({
            familyMembers: familyMembers,
            familyId: familyId
          })
//           family_id: "bvrivqavooebjhs7u0h0"
// family_member_id: "bvrivqavooebjhs7u0gg"
// is_primary_user: true
// user_profile:
// birthday: {year: 1900, month: 1, day: 1}
// gender: "GENDER_MALE"
// hand: "HAND_LEFT"
// user_profile_id: "bvrivqavooebjhs7u0gg"
        }

      },
    })     
  },
  /**
   * TODO 获取家庭成员API
   */
  listFamilys: function(){
    var that = this
      // wx.request({
      //   url: getApp().data.server + 'listFamilys',
      //   data: {
      //     userId: app.getUser().id  
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
        familys: [{
          familyId: 1,
          avatarUrl: '../images/report/report@2x.png',
          familyName: '成员名称',
          lastCheckTime: '2018-10-10'
        },{
          familyId: 2,
          avatarUrl: '../images/report/report@2x.png',
          familyName: '爸爸',
          lastCheckTime: '2018-10-11'
        },{
          familyId: 3,
          avatarUrl: '../images/report/report@2x.png',
          familyName: '妈妈',
          lastCheckTime: '2019-11-10'
        }]
      })
  },        
    /**
   * TODO 解散家庭成员
   */
  dismissFamily: function(e){
    var that = this
    wx.showModal({
      title: '',
      content: '解散后您的家庭成员将被移出家庭，是否确认解散当前您创建的家庭？',
      showCancel: true,
      success: function(res){
        if(res.confirm){
          console.log('确定')
      // wx.request({
      //   url: getApp().data.server + 'dismissFamily',
      //   data: {
      //     userId: app.getUser().id  
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
  initData: function(){
    let user = app.getUser()
    let vipRemainDay = 0
    let familyVipRemaimDay = 0
    if(user.isVip){
      const vipRemainDay = dateUtil.dateDiffDay(new Date(), user.vipTime)          
    }    
    if(user.isVipFamily){
      const familyVipRemaimDay = dateUtil.dateDiffDay(new Date(), user.vipFamilyTime)          
    }         
    this.setData({
      vipRemainDay: vipRemainDay,
      familyVipRemaimDay: familyVipRemaimDay
    })
  }   
})