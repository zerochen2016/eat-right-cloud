const app = getApp()
const dateUtil = require("../../utils/date-util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.test6()
  },

  
  test3: function(){
    wx.request({
      url: app.globalData.apiHost, 
      data: 
      JSON.stringify({
        "method": "MallAPI.ListFormalDeviceProducts",
        "service": "com.jt-health.api.app",
        "request": {}
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
          // data
          // formal_device_products: Array(2)
          // 0:
          // brief: "赠送6个月VIP会员"
          // price: 9990000
          // product_id: "bs61sp3ipt39cgu9fko0"
          // product_name: "小阶感测器"
          // renew_days: 180
          // __proto__: Object
          // 1:
          // brief: "赠送6个月VIP家庭包"
          // price: 11990000
          // product_id: "bs622ejipt39dlqbd85g"
          // product_name: "小阶感测器"
          // renew_days: 180
        }
        
      },
    })     
  },

})