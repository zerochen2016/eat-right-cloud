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
            console.log(res.data)
            let data = res.data
            let check = wx.base64ToArrayBuffer(data)
            console.log(check)
            let data1 = Array.from(new Uint8Array(check))
            let data2 = []
            for(let i = 0;i + 2< data1.length;i = i+3){
              let item = data1[i].toString(16) + data1[i+1].toString(16) + data1[i+2].toString(16)
              data2.push(parseInt('0x'+item))
            }
            console.log(data2)
            
            // console.log(data1)
            // let ints = new DataView(check)
            
            // console.log(ints)
            // console.log(ints.getInt8(0))
            // console.log(ints.getInt8(0).toString(2))
            // let endTime = new Date()
            // let startTime = new Date(endTime.getTime() - 23093)
            // this.submitCheckData(startTime,endTime,check2)
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
            
            
            let submit1 = new Uint8Array(24000).buffer
            let j = 0
            for(let i = 0; i < submit.length; i=i+3){
              let bytes = this.intToByte4(submit[i])
              submit1[i] = bytes[0]
              submit1[i + 1] = bytes[1]
              submit1[i + 2] = bytes[2]
            }
            
            let endTime = new Date()
            let startTime = new Date(endTime.getTime() - 23093)
            this.submitCheckData(startTime,endTime,new Uint8Array(submit1).buffer)
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
    // let a = [2368835]
    // console.log(new Uint32Array(a).buffer)
    // this.test4()
    // this.test2()
    // this.test2()
    // console.log(parseInt('0x242543'))
    // console.log(this.intToByte4(2368835))
    // this.test2()
    let a1 = 24
    let a2 = 254
    let a3 = 3
    // 102371
    console.log(this.intToByte4(2368835))
    // console.log('0x' + a1.toString(16) + a2.toString(16) + a3.toString(16))
    // console.log(parseInt(0x242543))
    // console.log(parseInt(0x18fe03))
  },
  submitCheckData: function(startTime,endTime,data){
    console.log("submitCheckData")
    const timeSecond = dateUtil.dateDiffSecond(new Date(startTime),new Date(endTime))
    let sampleRate = 4180 / timeSecond
    

    
    let base64 = wx.arrayBufferToBase64(data)
    // console.log(arrayBuffer)
    
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
      complete(res) {
        console.log('-----submitCheckData complete-----')
        console.log(res)
      }
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
  uploadFileForText: function(data){
    let filePath = wx.env.USER_DATA_PATH + "/" + util.randomLetterString(6) + '.txt'
    wx.getFileSystemManager().writeFile({
      filePath: filePath,
      data: data,
      encoding: 'utf8',
      success: res =>{
        console.log(res)
        wx.uploadFile({
          url: 'http://jt.pingfangli.com/file/upload', //仅为示例，非真实的接口地址
          filePath: filePath,
          name: 'file',
          formData: {
            
          },
          success (res){
            console.log("uploadfile:",res)
            //do something
          },
          complete(res){
            console.log(res)
          }
        })
      },
      complete: res=>{
        console.log(res)
      }
    })
  },
})
