const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeIndex: 1,
    avatarUrl: '',
    showSearch: 0,
    dots: '',
    devices: {},
    deviceConnected: {
      deviceId: '',
      deviceName: '',
      serviceId: '',
      services: [],
      characteristics: []
    },
    connectStatus: 0,
    resourcesHost: '',
    checkData: {
      compositeIndex: 0,
      lastCheckDate: "--"
    }
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
    this.checkConnected()
    this.getCheckData()
    
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
  
  checkConnected: function(){
    let that = this
    let lastDevice = app.getLastDevice()
    console.log('----------------checkConnected-------------------')
    console.log(lastDevice)
    wx.openBluetoothAdapter({
      success: function(res){
        console.log("----------openBluetoothAdapter success----------")
        console.log(res)
        wx.getConnectedBluetoothDevices({
          services: lastDevice.services,
          success: function(res){
            console.log("----------getConnectedBluetoothDevices success----------")
            console.log(res)
            if(res.devices[0]){
              that.setData({
                connectStatus: 1,
                deviceConnected: app.getLastDevice()
              })
            }else{
              that.connectDevice(lastDevice.deviceId, lastDevice.deviceName, lastDevice.services)
            }
          },
          fail: function(res){
            console.log("----------getConnectedBluetoothDevices fail----------")
            console.log(res)
          },
          complete: function(res){
            console.log("----------getConnectedBluetoothDevices complete----------")
            console.log(res)
          }
        })
      },
      fail: function(res){
        console.log("----------openBluetoothAdapter fail----------")
        console.log(res)
      },
      complete: function(res){
        console.log("----------openBluetoothAdapter complete----------")
        console.log(res)
      }
    })

  },
  connectDevice: function(deviceId, deviceName, services){
    let that = this
    wx.createBLEConnection({
      deviceId: deviceId,
      deviceName: deviceName,
      success (res){
        console.log('------------createBLEConnection success-------------')
        console.log(res)
        wx.getBLEDeviceServices({
          deviceId: deviceId,
          success (res) {
            
            wx.getBLEDeviceCharacteristics({
              deviceId: deviceId,
              serviceId: services[0],
              success (res) {
                console.log('------------getBLEDeviceCharacteristics success-------------')
                console.log(res)
                let characteristics = res.characteristics
                let deviceConnected = {
                  deviceId: deviceId,
                  deviceName: deviceName,
                  serviceId: services[0],
                  services: services,
                  characteristics: characteristics
                }
                that.setData({
                  connectStatus: 1,
                  deviceConnected: app.getLastDevice()
                })
              },
              fail: function(res){
                console.log('------------getBLEDeviceCharacteristics fail-------------')
                console.log(res)
              },
              complete: function(res){
                console.log('------------getBLEDeviceCharacteristics complete-------------')
                console.log(res)
              }
            })
          }
        })
      },
      fail: function(res){
        console.log('------------createBLEConnection fail-------------')
        console.log(res)
      },
      complete: function(res){
        console.log('------------createBLEConnection complete-------------')
        console.log(res)
      }
    })
  },
  initData: function(){
    this.selectComponent("#bottom-navigate").changeActiveIndex(1)
  },
    //TODO 获取检测数据
    getCheckData: function(){
      var that = this
        // wx.request({
        //   url: getApp().data.server + 'getCheckData',
        //   data: {
  
        //   },
        //   dataType: 'json',
        //   header: {
        //     'content-type': 'application/x-www-form-urlencoded' 
        //   },
        //   method: 'POST',
        //   success: function (res) {
        //     if (res.statusCode == 200) {
        //       var result = res.data;
        //       console.info(result);
        //       if (result.code == 0) {
        //         that.setData({
        //           checkData: result.data.checkData
        //         })
        //       } 
        //     } else {
        //       return;
        //     }
        //   },
        // })    
        //TODELETE 测试用数据
        that.setData({
          checkData: {
            compositeIndex: 77,
            lastCheckDate: '昨天'
          }
        })
    },      
  
})
