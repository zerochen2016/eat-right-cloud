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

  },
  
  test4: function(){
    wx.request({
      url: app.globalData.apiHost, 
      data: 
      JSON.stringify({
        "method": "MallAPI.ListDeviceProducts",
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
//           data:
// device_products: Array(1)
// 0:
// brief: "守护全家健康的好帮手"
// is_promotion_product: true
// original_price: 12990000
// price: 9990000
// product_id: "btk6433ipt3c236duk70"
// product_name: "小阶感测器"
        }
        
      },
    })     
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
  test2: function(){
    wx.request({
      url: app.globalData.apiHost, 
      data: 
      JSON.stringify({
        "method": "MallAPI.ListFamilyRenewalProductsV2",
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

        }
        // data:
        // family_renewal_products: Array(3)
        // 0:
        // brief: "安卓家庭版首月优惠1元"
        // discount_brief: "原价¥88/月"
        // is_first_discount_product: true
        // price: 10000
        // product_id: "bumu533ipt30io2ljklg"
        // product_name: "安卓家庭版首月优惠"
        // product_title: "首月"
        // renew_days: 30
        // __proto__: Object
        // 1:
        // brief: "一个季度的家庭版订阅续费"
        // discount_brief: "折合¥39/月"
        // price: 2290000
        // product_id: "bs625ijipt39hen4tn0g"
        // product_name: "¥229/季"
        // product_title: "3个月"
        // renew_days: 90
        // __proto__: Object
        // 2:
        // brief: "一年的家庭版订阅续费"
        // discount_brief: "折合¥29/月"
        // price: 6990000
        // product_id: "bs625mript39i5g9kt8g"
        // product_name: "¥699/年"
        // product_title: "一年"
        // renew_days: 365
      },
    })     
  },
  test1: function(){
    wx.request({
      url: app.globalData.apiHost, 
      data: 
      JSON.stringify({
        "method": "MallAPI.ListPersonalRenewalProductsV2",
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
//           data:
// personal_products: Array(3)
// 0:
// brief: "一个月的个人版订阅续费"
// price: 450000
// product_id: "bs6240ript39edtu8ukg"
// product_name: "¥45/月"
// product_title: "1个月"
// renew_days: 30
// __proto__: Object
// 1:
// brief: "一个季度的个人版订阅续费"
// discount_brief: "折合¥39/月"
// price: 1180000
// product_id: "bs624pript39f8aro7qg"
// product_name: "¥118/季"
// product_title: "3个月"
// renew_days: 90
// __proto__: Object
// 2:
// brief: "一年的个人版订阅续费"
// discount_brief: "折合¥29/月"
// price: 3480000
// product_id: "bs624s3ipt39fsr3pni0"
// product_name: "¥348/年"
// product_title: "一年"
// renew_days: 365
          
          
        }
      
      },
    })     
  }
})