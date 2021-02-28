const app = getApp()
const util = require("../../utils/util.js")
let changeDotsNumberInterval = null//... 0，2，3
let changePointAngerInterval = null//搜索扫描0
let searchBluetoothInterval = null//搜索蓝牙
let notfindTime = null //搜索超时
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dots: '',
    devices: [],
    // devices: [{
    //   name: '',
    //   deviceId: '',
    //   mac: '',
    //   advertisServiceUUIDs: []
    // }],
    status: 0, //0搜索，1选择，2连接中，3检测中，4检测完成，5连接错误重新选择，6没有找到设备，7自动连接
    searchTime: 0,
    pointerAnger: 0,
    imageCircleSearch: app.globalData.resourcesHost + 'check/circle-search@3x.png',
    imageCirclePointer: app.globalData.resourcesHost + 'check/pointer@3x.png',
    imageClose: app.globalData.resourcesHost + 'check/close@2x.png',
    imageEquip: app.globalData.resourcesHost + 'check/equip@2x.png',
    imageInvite: app.globalData.resourcesHost + 'check/invite@2x.png',
    imageArrow: app.globalData.resourcesHost + 'arrow@2x.png',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoaded: function (options) {
    if(options.status == 1){
      let devices = []
      let deviceSelected = JSON.parse(options.device)
      for(let i = 0; i < app.getLastDevices().length; i++){
        if(app.getLastDevices()[i].deviceId != deviceSelected.deviceId){
          devices.push(app.getLastDevices()[i])
        }
      }
      this.setData({
        status: 1,
        devices: devices,
        hasSelect: true,
        deviceSelected: deviceSelected
      //   deviceSelected: {
      //     deviceId: 'ss',
      // deviceName: 'dd',
      // serviceId: 'dd',
      // services: ['s','s'],
      // mac: 'd',
      // characteristics: []
      //   }
      })
      this.stopBluetooth()
    }else{
      this.changePointAnger()
      this.searchBluetooth()
      this.changeDotsNumber()
      
    }
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
    this.selectComponent("#header").onlyBack('#F2F2F6')
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
    this.clearAnyTimeInterval(changeDotsNumberInterval,changePointAngerInterval,searchBluetoothInterval,notfindTime)
    notfindTime = null
    this.stopSearch()
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
  //标题点的数量变化
  changeDotsNumber: function(){
    
    if(this.data.startCheck == 1){  
      that.startCheck()//连接成功，进行检测
    }
    var dots = this.data.dots
    if(dots.length == 0){
      this.setData({dots: '.'})
    }
    if(dots.length == 1){
      this.setData({dots: '..'})
    }
    if(dots.length == 2){
      this.setData({dots: '...'})
    }
    if(dots.length == 3){
      this.setData({dots: ''})
    }
    changeDotsNumberInterval = setTimeout(this.changeDotsNumber, 800);    
  },  
  changePointAnger: function(){
    let pointAnger = this.data.pointerAnger
    this.setData({pointerAnger: pointAnger + 1})
    changePointAngerInterval = setTimeout(this.changePointAnger,10)
  },  
  // 开始扫描蓝牙设备
  searchBluetooth: function (e) {
    let that = this
    if(that.data.searchTime <= 10){
      if(!notfindTime){
        notfindTime = setTimeout(function(){
          console.log("超时")
          if(that.data.devices.length < 1){
            wx.redirectTo({
              url: '../check/notfind',
            })
          }
        },6000)
      }
      
      wx.openBluetoothAdapter({
        success: function (res) {
          wx.startBluetoothDevicesDiscovery({
            success: function (res) {
              wx.getBluetoothDevices({
                success: function (res) {
                  let devices = [];
                  console.log('-----getBluetoothDevices success-----')
                  console.log(res)
                  
                  if(res.devices[0]){
                    let devicesList = res.devices
                    let hasConnect = false;
                    for(let i = 0;i<devicesList.length;i++){
                      //找到上次连接过的设备
                      if(devicesList[i].deviceId == app.getLastDevice().deviceId){
                        hasConnect = true
                      }
                      const namePre = devicesList[i].name.substring(0,2)

                      if(namePre == 'JT'|| namePre == 'jt'){
                        if(app.globalData.isIos){
                          devicesList[i].mac = that.getMacForIos(devicesList[i].advertisData)
                        }else{
                          devicesList[i].mac = util.replaceAll(devicesList[i].deviceId,":","")
                        }
                        devices.push(devicesList[i])
                      }
                    }
                    if(devices[0]){
                      that.setData({
                        devices: devices
                      })
                      app.setLastDevices(devices)
                      
                      if(hasConnect){
                        //连接过自动重连
                        wx.reLaunch({
                          url: '../main/main?index=1'
                        })
                      }else{
                        //选择设备
                        that.setData({
                          status: 1
                        })
                      }
                    }
                  }
                  if(!devices[0]){
                    searchBluetoothInterval = setTimeout(that.searchBluetooth, 2000)
                  }
                },
                fail: function(res){
  
                },
                complete: function(res){
                  that.setData({searchTime: that.data.searchTime + 1})
                }
              })
            }
          })
        },
        fail: function(res){
          console.log('-----getBluetoothDevices fail-----')
          console.log(res)
          //蓝牙没开
          app.alert('温馨提示','请确认您的蓝牙已打开')
        }
      })
    }else{
      wx.reLaunch({
        url: '../check/notfind',
      })
    }
  },  
  selectDeviceTap: function(e){
    console.log(e)
    const device = {
      deviceId: e.currentTarget.dataset.deviceid,
      deviceName: e.currentTarget.dataset.devicename,
      serviceId: e.currentTarget.dataset.services[0],
      services: e.currentTarget.dataset.services,
      mac: e.currentTarget.dataset.mac,
      characteristics: []
    }
    this.checkDeviceIsUsable(device)
  },
  stopBluetooth: function(){
    
    wx.closeBluetoothAdapter({
      success: (res) => {
        console.log('-----closeBluetoothAdapter-----')
      },
    })
  },
  stopSearch: function () {
    wx.stopBluetoothDevicesDiscovery({
      success: function (res) {
        console.log('-----stopBluetoothDevicesDiscovery-----')
      }
    })
  },  
  clearAnyTimeInterval: function(...intervals){
    console.log('----------clearAnyTimeInterfal:' + intervals.toString())
    for(let i = 0;i < intervals.length;i++){
      if(intervals[i]){
        clearInterval(intervals[i])
      }
    }
  },
  checkDeviceIsUsable: function(device){
    console.log("checkDeviceIsUsable",device)
    let that = this
    wx.request({
      url: app.globalData.apiHost, 
      data: 
      JSON.stringify({
        "method": "DeviceAPI.CheckDeviceIsUsable",
        "service": "com.jt-health.api.app",
        "request": {
          "user_id": app.getUser().id,
          "mac": device.mac
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
          if(res.data.is_usable){
            app.setLastDevice(device)
            wx.reLaunch({
              url: '../main/main?index=1',
            })
          }else{
            app.alert("温馨提示","设备不可用，请联系客服处理")
          }
        }
        
      },
    })     
  },
  getMacForIos: function(advertisData){
    let bf = advertisData.slice(2, 8);
    let mac = Array.prototype.map.call(new Uint8Array(bf), (x) => ("00" + x.toString(16)).slice(-2)).join(":");
    return util.replaceAll("00A0" + mac.toUpperCase(),":","")
  }
})