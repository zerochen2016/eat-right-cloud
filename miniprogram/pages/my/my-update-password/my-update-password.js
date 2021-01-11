const util = require("../../../utils/util")
const sha256 = require("../../../utils/sha256.js")

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    password1: '',
    password2: '',
    password3: '',
    buttonStyle: 0
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
  passwordChange: function(e){
    const id = e.currentTarget.id
    if('password1' == id){
      this.setData({
        password1: e.detail.value
      })
    }
    if('password2' == id){
      this.setData({
        password2: e.detail.value
      })
    }
    if('password3' == id){
      this.setData({
        password3: e.detail.value
      })
    }
    this.checkbuttonStyle()
  },
  checkbuttonStyle: function(){
    if(this.data.password1.length >= 8 && this.data.password2.length >= 8 && this.data.password3.length >= 8 ){
      this.setData({
        buttonStyle: 1
      })
    }else{
      this.setData({
        buttonStyle: 0
      })
    }
  },

  savePassword: function(mobile){
    let that = this
    let password1 = this.data.password1
    let password2 = this.data.password2
    let password3 = this.data.password3
    if(password2 != password3){
      app.alert("温馨提示","两次输入密码不一致")
      return
    }
    if(!util.hasNumberAndLetter(password2) || !util.hasNumberAndLetter(password3)){
      app.alert("温馨提示","密码必须包含字母和数字")
      return
    }
    wx.request({
      url: app.globalData.apiHost, 
      data: 
      JSON.stringify({
        "method": "UserAPI.UpdatePassword",
        "service": "com.jt-health.api.app",
        "request": {
         "user_id": app.getUser().id,
         "old_hashed_password": sha256.encode(password1),
         "new_plain_password": password3
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
          if(res.errMsg == 'request:ok'){
            wx.showModal({
              title: '温馨提示',
              content: '修改成功',
              showCancel: false,
              success: function(res){
                if(res.confirm){
                  that.loginout()
                  
                }
              }
            })
          }
        }else{
          app.alert("温馨提示","密码不正确")
        }

      },
    })  
  },
})