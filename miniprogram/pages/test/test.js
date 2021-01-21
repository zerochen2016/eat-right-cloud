const app = getApp()
const dateUtil = require("../../utils/date-util.js")
const base64 = require("../../utils/base64.js")
const md5 = require("../../utils/js-md5.js")
const sha = require("../../utils/sha256.js")
const { bytes } = require("../../utils/js-md5.js")
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
  intToByte4:function(i) {
    var targets =[];
    targets[0] = (i & 0xFF);
    targets[1] = (i >> 8 & 0xFF);
    targets[2] = (i >> 16 & 0xFF);
    targets[3] = (i >> 24 & 0xFF);
    return targets;
  },
  test20: function(){
    wx.downloadFile({
      url: 'https://jtfile.pingfangli.com/QNB202101210114300Pr.txt',
      success:res=>{
        console.log(res.tempFilePath)
        let filePath = res.tempFilePath
        wx.getFileSystemManager().readFile({
          filePath: filePath,
          encoding: 'UTF8',
          success: res => {
            console.log(res.data)
            let data = res.data
            let dataJson = JSON.parse(data)
            let check = wx.base64ToArrayBuffer(data)
            // let data2 = wx.arrayBufferToBase64(check)
            // console.log(check)
            let endTime = new Date()
            let startTime = new Date(endTime.getTime() - 23093)
            this.submitCheckData(startTime,endTime,dataJson)
          }
        })
      }
    })
  },
  test2: function(){
    wx.downloadFile({
      url: 'https://jtfile.pingfangli.com/p.txt',
      success:res=>{
        // console.log(res.tempFilePath)
        let filePath = res.tempFilePath
        wx.getFileSystemManager().readFile({
          filePath: filePath,
          encoding: 'UTF8',
          success: res => {
            // console.log(res.data)
            let data = res.data
            let check = wx.base64ToArrayBuffer(data)
            check = new Uint8Array(check)
            let array = []
              for(let i=0; i + 2< check.length; i=i+3){
                let p = parseInt('0x' + check[i] + check[i+1] + check[i+2])
                
                array.push(p)
              }
            console.log(array)
            console.log(JSON.stringify(array))
          }
        })
      }
    })
  },
  test4: function(){
    wx.downloadFile({
      url: 'https://jtfile.pingfangli.com/kk.txt',
      success:res=>{
        // console.log(res.tempFilePath)
        let filePath = res.tempFilePath
        wx.getFileSystemManager().readFile({
          filePath: filePath,
          encoding: 'UTF8',
          success: res => {
            // console.log(res.data)
            let data = res.data
            
            let submit = JSON.parse(data)
            // let p = new Uint32Array(submit).buffer
            // console.log(p)
            let endTime = new Date()
            let startTime = new Date(endTime.getTime() - 23093)
            this.submitCheckData(startTime,endTime,submit)
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // this.test4()
    // console.log(this.intToByte4([2368835]))
    let a = [2368835]
    console.log(new Uint32Array(a).buffer)
  },
  submitCheckData: function(startTime,endTime,data){
    // let hash = md5.create()
    // hash.update(data)
    // let signature = hash.hex()
    // const that = this
    // let arrayBuffer = new Uint32Array(data).buffer
    // console.log(arrayBuffer)
    // let sub = new ArrayBuffer(24000)
    // let j = 0
    let arrayBuffer = new Uint8Array(24000)
    for(let i = 0; i < data.length;i = i + 3){
      let t = this.intToByte4(data[i])
      arrayBuffer[i] = t[0]
      arrayBuffer[i + 1] = t[1]
      arrayBuffer[i + 2] = t[2]
    }
    arrayBuffer = arrayBuffer.buffer
    console.log(arrayBuffer)
    // let arrayBuffer = new ArrayBuffer(data.length)
    // for(let i = 0; i < data.length;i++){
    //   arrayBuffer[i] = data[i]
    // }
    // let arrayBuffer = data.buffer
    const timeSecond = dateUtil.dateDiffSecond(new Date(startTime),new Date(endTime))
    let sampleRate = 4180 / timeSecond
    // console.log(sampleRate)

    
    let base64 = wx.arrayBufferToBase64(arrayBuffer)
    // console.log(arrayBuffer)
    
    let hash = md5.create()
    hash.update(arrayBuffer)
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
            "data": base64,
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
