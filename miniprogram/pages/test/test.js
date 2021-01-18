const app = getApp()
const dateUtil = require("../../utils/date-util.js")
const base64 = require("../../utils/base64.js")
const md5 = require("../../utils/js-md5.js")
const sha = require("../../utils/sha256.js")
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
    
  
    // // console.log(sha.encode("a12345678"))
    wx.downloadFile({
      url: 'https://jtfile.pingfangli.com/QNB20210118213635PZw.txt',
      success:res=>{
        console.log(res.tempFilePath)
        let filePath = res.tempFilePath
        wx.getFileSystemManager().readFile({
          filePath: filePath,
          encoding: 'UTF8',
          success: res => {
            console.log(res.data)
            let data = res.data
            let check = wx.base64ToArrayBuffer(data)
            let data2 = wx.arrayBufferToBase64(check)
            console.log(check)
            // let endTime = new Date()
            // let startTime = new Date(endTime.getTime() - 50000)
            // this.submitCheckData(startTime,endTime,data)
          }
        })
      }
    })

  },
  submitCheckData: function(startTime,endTime,data){
    // let hash = md5.create()
    // hash.update(data)
    // let signature = hash.hex()
    // const that = this
    // const timeSecond = dateUtil.dateDiffSecond(new Date(startTime),new Date(endTime))
    // let sampleRate = data.length / 3 / timeSecond
    // if(sampleRate > 200){
    //   sampleRate = 200
    // }
    
    let hash = md5.create()
    hash.update(data)
    let signature = hash.hex()
    let requestData = JSON.stringify({
      "method": "ReportAPI.SubmitPulseTest",
      "service": "com.jt-health.api.app",
      "request": {
        "user_id": app.getUser().id,
        "payload": {
          "sampling_start_time": startTime, 
          "sampling_stop_time": endTime,
          "sample_device":{
            "sample_rate": 190,
            "device_model": "JM1300",
            "device_mac": "00A050C897F1"
          },
          "sample_data":{
            "codec": "IR",
            "data": wx.arrayBufferToBase64(data),
            "signature": signature
          },
        }
      }
     })

    wx.request({
      url: app.globalData.apiHost, 
      data: requestData,
      dataType: 'json',
      method: "POST",
      header: {
        'content-type': 'application/json',
        "Authorization": 'Bearer ' + app.getRequestSign()
      },
      success(res) {
        console.log('-----submitCheckData result-----')
        console.log(res)
        if(res.statusCode == 200){

        }else{
                
        }
        
      },
    })     
  },      
  getAdvertisement: function(){
    wx.request({
      url: app.globalData.apiHost, 
      data: 
      JSON.stringify({
        "method": "MarketingAPI.GetAdvertisement",
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

})
