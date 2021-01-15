const base64 = require("../../utils/base64.js")

const md5 = require("../../utils/js-md5")
const util = require("../../utils/util.js")
const sha256 = require("../../utils/sha256.js")
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
  submitCheckData: function(data,startTime,endTime){
    const that = this
    const timeSecond = dateUtil.dateDiffSecond(new Date(startTime),new Date(endTime))
    const sampleRate = data.length / 3 / timeSecond
    wx.request({
      url: app.globalData.apiHost, 
      data: 
      JSON.stringify({
        "method": "ReportAPI.SubmitPulseTest",
        "service": "com.jt-health.api.app",
        "request": {
          "user_id": app.getUser().id,
          "payload": {
            "hand": app.getUserProfile().hand,
            "geo_location":{},
            "sample_device":{
              "sample_rate": parseInt(sampleRate),
              "device_model": "JM1300",
              "device_mac": util.replaceAll(that.data.deviceConnected.deviceId,":",""),
              "device_params":{}
            },
            "sample_data":{
              "codec": "IR",
              "codec_params":{},
              "data":base64.encode("[" + data.toString() + "]"),
              "signature":md5.encode("[" + data.toString() + "]")
            },
            "sampling_start_time": startTime,
            "sampling_stop_time": endTime
          }
        }
       }),
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
    })     
  },    
  /**
   * 生命周期函数--监听页面显示
   */
  writeFile: function(content){
    let fsm = wx.getFileSystemManager();
    console.log(wx.env.USER_DATA_PATH + '/test.txt')
    fsm.writeFile({
    
      filePath: wx.env.USER_DATA_PATH + '/test.txt',
    
      data: content,
    
      encoding: 'utf8',
    
      success: res => {
    
        console.info(res)
    
      },
    
      fail: res => {
    
        console.info(res)
    
      }
    
    })
  },
  onShow: function () {
    console.log(sha256.encode('a123456'))
    // console.log(new Date().getTime())
    // this.writeFile('d')
    
    // let arr = [600,121,121,121,121]
    // console.log(wx.array)
    // console.log(String.fromCharCode.apply(String, arr))
    // console.log(util.byteToString(arr))
    // console.log(util.stringToByte(util.byteToString(arr)))
    // console.log(base64.encode(arr))
    // console.log(base64.decode(base64.encode(arr)))
    // let a = md5.Base64.encode("d")
    // console.log(a)
    // const unzip = (b64Data) => {
    //   var strData = atob(b64Data);
    //   // Convert binary string to character-number array
    //   var charData = strData.split('').map(function (x) { return x.charCodeAt(0); });
    //   // Turn number array into byte-array
    //   var binData = new Uint8Array(charData);
    //   // // unzip
    //   var data = pako.inflate(binData);
    //   // Convert gunzipped byteArray back to ascii string:
    //   //二进制转成字符串
    //   function byteToString(arr) {
    //     if (typeof arr === 'string') {
    //       return arr;
    //     }
    //     var str = '',
    //       _arr = arr;
    //     for (var i = 0; i < _arr.length; i++) {
    //       var one = _arr[i].toString(2),
    //         v = one.match(/^1+?(?=0)/);
    //       if (v && one.length == 8) {
    //         var bytesLength = v[0].length;
    //         var store = _arr[i].toString(2).slice(7 - bytesLength);
    //         for (var st = 1; st < bytesLength; st++) {
    //           store += _arr[st + i].toString(2).slice(2);
    //         }
    //         str += String.fromCharCode(parseInt(store, 2));
    //         i += bytesLength - 1;
    //       } else {
    //         str += String.fromCharCode(_arr[i]);
    //       }
    //     }
    //     return str;
    //   }
    //   strData = byteToString(data)
    //   return strData;
    // }
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