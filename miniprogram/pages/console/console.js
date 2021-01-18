const { array } = require("../../utils/js-md5");
const dateUtil = require("../../utils/date-util.js")

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoaded: function (options) {
    let requestData = options.data
    // console.log("[1,1].buffer")
    // console.log([11556371,11556371].buffer)
    let startTime = new Date()
    let endTime = new Date(startTime.getTime() + 5000)
    console.log(dateUtil.dateDiffSecond(startTime,endTime))
    // let rate = 8000*1.1/endTime.timeIntervalSince(startTime)
    // console.log(rate)
    // let arr = [];
    // for(let i =0; i < 24000; i++){
    //   arr.push(11556371)
    // }
    // let arrayBuffer = new Uint8Array(arr).buffer;
    // console.log(arrayBuffer);
    // let arr2 = Array.prototype.slice.call(new Int8Array(arrayBuffer ));
    // console.log(arr2);
    // let requestData = JSON.stringify({
    //   "method": "ReportAPI.SubmitPulseTest",
    //   "service": "com.jt-health.api.app",
    //   "request": {
    //     "user_id": app.getUser().id,
    //     "payload": {
    //       "hand": app.getUserProfile().hand,
    //       "geo_location":{},
    //       "sample_device":{
    //         "sample_rate": parseInt(options.sampleRate),
    //         "device_model": "JM1300",
    //         "device_mac": options.device,
    //         "device_params":{}
    //       },
    //       "sample_data":{
    //         "codec": "IR",
    //         "codec_params":{},
    //         "data": options.data,
    //         "signature": options.signature
    //       },
    //       "sampling_start_time": options.start,
    //       "sampling_stop_time": options.end
    //     }
    //   }
    //  })
    this.setData({
      data: requestData
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})