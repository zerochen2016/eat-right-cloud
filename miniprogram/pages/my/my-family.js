const app = getApp()
const dateUtil = require("../../utils/date-util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    familys: [],
    imageVipFamily: app.globalData.resourcesHost + 'my/vip-family@2x.png',
    imageVip: app.globalData.resourcesHost + 'my/vip@2x.png',
    imageAdd: app.globalData.resourcesHost + 'add@2x.png',
    imageArrow: app.globalData.resourcesHost + 'arrow@2x.png',
    imageTips: app.globalData.resourcesHost + 'tips@2x.png'
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
    this.getVipInfo()
    this.setData({
      userId: app.getUser().id
    })
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
        console.log("FamilyAPI.ListFamilyMembers",res)
        if(res.statusCode == 200){
          let familyMembers = res.data.family_members
          let familyId = null
          let master = false
          let selfInfo = null
          let masterId = ''
          for(let i = 0; i < familyMembers.length; i++){
            if(familyMembers[i].is_primary_user){
              familyId = familyMembers[i].family_id
              if(familyMembers[i].family_member_id == app.getUser().id){
                master = true
              }
              masterId = familyMembers[i].family_member_id
            }
            familyMembers[i].json = JSON.stringify(familyMembers[i])
            if(familyMembers[i].family_member_id == app.getUser().id){
              selfInfo = JSON.stringify(familyMembers[i])
            }
          }
          that.setData({
            familys: familyMembers,
            familyId: familyId,
            master: master,
            selfInfo: selfInfo,
            masterId: masterId
          })
        }

      },
    })     
  },    
  getVipInfo: function(){
    const that = this
    wx.request({
      url: app.globalData.apiHost, 
      data: 
      JSON.stringify({
        "method": "SubscriptionAPI.GetSubscriptionSummary",
        "service": "com.jt-health.api.app",
        "request": {
          "user_id": app.getUser().id
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
          const subscriptionSummary = res.data.subscription_summary
          const vipTime = dateUtil.utcToBeiJing(subscriptionSummary.personal_timeline.expired_time)
          const vipFamilyTime = dateUtil.utcToBeiJing(subscriptionSummary.family_timeline.expired_time)

          let vipInfo = {
            vipTimeBegin: dateUtil.dateToStringYYMMDD(dateUtil.utcToBeiJing(subscriptionSummary.personal_timeline.available_begin_time)),
            vipTime: dateUtil.dateToStringYYMMDD(vipTime),
            isVip: subscriptionSummary.personal_subscription_expired ? false : true,
            vipFamilyTimeBegin: dateUtil.dateToStringYYMMDD(dateUtil.utcToBeiJing(subscriptionSummary.family_timeline.available_begin_time)),
            vipFamilyTime: dateUtil.dateToStringYYMMDD(vipFamilyTime),
            isVipFamily: subscriptionSummary.family_subscription_expired ? false : true,
            // isVipFamily:true,
            vipRemainDay: dateUtil.dateDiffDay(new Date(), vipTime),
            vipFamilyRemainDay: dateUtil.dateDiffDay(new Date(), vipFamilyTime),
          }
          that.setData({vipInfo: vipInfo})
          console.log(vipInfo)
        }
        
      },
    })     
  }
})