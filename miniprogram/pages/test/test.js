const app = getApp()
const util = require("../../utils/util.js")
const dateUtil = require("../../utils/date-util.js")
const md5 = require("../../utils/js-md5.js")
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
    this.download()
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

  download: function(){
    let that = this
    wx.downloadFile({
      url: 'https://jtfile.pingfangli.com/QNB20210205140243FjE.txt',
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
            console.log(check)
            that.submitCheckData(check,new Date(),new Date())
          }
        })
      }
    })
  },
  submitCheckData: function(data,startTime,endTime){
    let base64Data = wx.arrayBufferToBase64(data)
    const that = this
    // const timeSecond = dateUtil.dateDiffSecond(new Date(startTime),new Date(endTime))
    // let sampleRate = parseInt(wholePayloadLen / timeSecond)
    // console.log("----sampleRate-----",sampleRate)
    let hash = md5.create()
    hash.update(data)
    let signature = hash.hex()
    let requestData = JSON.stringify({
      "method": "ReportAPI.SubmitPulseTest",
      "service": "com.jt-health.api.app",
      "request": {
        "user_id": app.getUser().id,
        "payload": {
          "hand": app.getUserProfile().hand,
          "geo_location":{},
          "sample_device":{
            "sample_rate": 200,
            "device_model": "JM1300",
            "device_mac": "00A050C897F1",
            "device_params":{}
          },
          "sample_data":{
            "codec": "IR",
            "codec_params":{},
            "data": base64Data,
            "signature": signature
          },
          "sampling_start_time": startTime,
          "sampling_stop_time": endTime
        }
      }
     })
     console.log("-----------")
     console.log(requestData)
    
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
          if(res.data.report_id){
            wx.navigateTo({
              url: '../report/report-report?id=' + res.data.report_id,
            })
          }
        }else{
          if(res.data.detail){
            wx.showModal({
              title: "温馨提示",
              content: res.data.detail,
              showCancel: false,
              success: function(res){
                if(res.confirm){
                  
                }
              }
            })
          }          
        }
        
      },
      complete(res){
        console.log('-----submitCheckData complete-----')
        
      }
    })     
  },      
})