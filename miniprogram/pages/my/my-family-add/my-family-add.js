const util = require('../../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputMobile: '',
    areaCode: '+86',
    imageFamily: app.globalData.resourcesHost + 'my/family@2x.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoaded: function (options) {
    this.setData({
      familyId: options.familyid
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
  mobileChange: function(e){
    var value = e.detail.value
    if(!util.isPositiveInteger(value)){
      if(value){
        value = value.substring(0, value.length-1)        
      }
      
    }
    this.setData({
      inputMobile: value
    })
    this.confirmStyle()
  },
  confirmStyle: function(){
    if(util.isMobile(this.data.inputMobile)){
      this.setData({
        confirmStyle: true
      })
    }else{
      this.setData({
        confirmStyle: false
      })
    }
  },
  invite: function(){
    let that = this
    wx.request({
      url: app.globalData.apiHost, 
      data: 
      JSON.stringify({
        "method": "NotificationAPI.SendInviteFamilyMemberMessage",
        "service": "com.jt-health.api.app",
        "request": {
         "sender_id": app.getUser().id,
         "nation_code": that.data.areaCode,
         "family_id": that.data.familyId,
         "phone": that.data.inputMobile
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
        let message = '邀请失败'
        if(res.statusCode == 200){
          message = '邀请成功'
        }
        wx.showModal({
          title: '温馨提示',
          content: message,
          showCancel: false,
          success: function(res){
            if(res.confirm){
              wx.navigateTo({
                url: '../my-family/my-family',
              })
            }
          }
        })
      },
    })     
  },
  areaCodeChange: function(e){
    console.log(e)
    this.setData({
      areaCode: e.detail.areaCode
    })
  }
})