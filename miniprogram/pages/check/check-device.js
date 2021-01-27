const app = getApp()
const util = require("../../utils/util.js")
const dateUtil = require("../../utils/date-util.js")
const md5 = require("../../utils/js-md5.js")
let startTime = new Date()

//定时器
//0搜索，1选择，2连接中，3检测中，4检测完成，5连接错误重新选择，6没有找到设备，7自动连接
let changeTipsTextInterval = null//提示文本，检测中检测成功
let changeDotsNumberInterval = null//... 0，2，3
let changePointAngerInterval = null//搜索扫描0
let checkResultInterval = null//检测结果数据
let searchBluetoothInterval = null//搜索蓝牙
let startMeasureInterval = null//开始输入

var data_pool = [];
var last_byte='';
var byte_group=[];
var total_data = [];
var min_num = 0;
var max_num = 0;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    connected: false,
    measure_width: 0,
    measure_value: 0,
    dots: '',
    devices: [],
    deviceConnected: {
      deviceId: '',
      deviceName: '',
      serviceId: '',
      services: [],
      characteristics: []
    },
    status: 1, //0搜索，1选择，2连接中，3检测中，4检测完成，5连接错误重新选择，6没有找到设备，7自动连接
    searchTime: 0,
    pointerAnger: 0,
    checkPercentage: 0,
    volumnStatus:0,
    startCheck: 0,
    tipsText: '不要说话',
    deviceBuyUrl: "",
    imageCircleSearch: app.globalData.resourcesHost + 'check/circle-search@3x.png',
    imageCirclePointer: app.globalData.resourcesHost + 'check/pointer@3x.png',
    imageClose: app.globalData.resourcesHost + 'check/close@2x.png',
    imageEquip: app.globalData.resourcesHost + 'check/equip@2x.png',
    imageInvite: app.globalData.resourcesHost + 'check/invite@2x.png',
    imageArrow: app.globalData.resourcesHost + 'arrow@2x.png',
    imageCircleLinking: app.globalData.resourcesHost + 'check/circle-linking@2x.png',
    imageCloseVolume: app.globalData.resourcesHost + 'check/close_volume@2x.png',
    imageVolume: app.globalData.resourcesHost + 'check/volume@2x.png',
    imageCircleSearch3: app.globalData.resourcesHost + 'check/circel-search-3@2x.png',
    imageTips: app.globalData.resourcesHost + 'check/tips@2x.png',
    imageTick: app.globalData.resourcesHost + 'check/tick@2x.png',
    imageDevice: app.globalData.resourcesHost + 'check/device.png',
    imageWarnCircleFill: app.globalData.resourcesHost + 'check/warning-circle-fill@2x.png',
    imageDeviceSell: app.globalData.resourcesHost + 'check/device-sell.png',
    imageArrowWhite: app.globalData.resourcesHost + 'arrow-white@3x.png'
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
    this.clearAnyTimeInterval(changeTipsTextInterval,changeDotsNumberInterval,changePointAngerInterval,checkResultInterval,searchBluetoothInterval,startMeasureInterval)
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
   * 生命周期函数--监听页面加载
   */
  onLoaded: function (options) {
    console.log(options.status)
    if(options.status){
      if(options.status == 7){
        //自动连接
        this.checkConnected()
      }else{
        this.setStatus(options.status)
      }
    }else{
      this.setStatus(0)
    }

  },
  //设备状态
  //0搜索，1选择，2连接中，3检测中，4检测完成，5连接错误重新选择，6没有找到设备，7自动连接
  setStatus: function(status){
    const that = this
    console.log('--------------setStatus-----------------')
    console.log(status)
    //搜索设备
    if(status == 0){
      this.changePointAnger()
      this.searchBluetooth()
      this.changeDotsNumber()
      // this.clearAnyTimeInterval(changeTipsTextInterval,checkResultInterval,startMeasureInterval)
    }else{
      that.clearAnyTimeInterval(searchBluetoothInterval)      
      that.stopSearch()
    }
    //选中设备
    if(status == 1){
      //全部清除
      // that.clearAnyTimeInterval(changeTipsTextInterval,changeDotsNumberInterval,changePointAngerInterval,checkResultInterval,searchBluetoothInterval,startMeasureInterval)
    }
    //连接中
    if(status == 2){
      this.changeDotsNumber()
      // this.clearAnyTimeInterval(changeTipsTextInterval,changePointAngerInterval,checkResultInterval,searchBluetoothInterval)
    }
    //检测中
    if(status == 3){
      this.checkResult()
      this.changeTipsText()
      this.changeDotsNumber()
      // that.clearAnyTimeInterval(changePointAngerInterval,searchBluetoothInterval)
      this.setData({
        checkPercentage: 0,
        pointerAnger: 0
      })
      this.playBackgroundAudio(app.getVolumnStatus())
    }
    //检测成功
    if(status == 4){
      this.changeTipsText()
      this.checkResult()
      // this.clearAnyTimeInterval(changePointAngerInterval,searchBluetoothInterval,changeDotsNumberInterval)
      this.setData({
        checkPercentage: 100,
        status: status
      },function(){
        //检测完成后上报检测结果
        that.submitCheckData(total_data.slice(1000,9000),startTime,new Date())
      })
    }

    //连接错误重新选择
    if(status == 5){
      //全部清除
      // that.clearAnyTimeInterval(changeTipsTextInterval,changeDotsNumberInterval,changePointAngerInterval,checkResultInterval,searchBluetoothInterval,startMeasureInterval)
    }
    //没有找到设备
    if(status == 6){
      //全部清除
      // that.clearAnyTimeInterval(changeTipsTextInterval,changeDotsNumberInterval,changePointAngerInterval,checkResultInterval,searchBluetoothInterval,startMeasureInterval)      
      this.getDeviceBuyUrl()
    }
    //自动链接
    if(status == 7){
      //全部清除
      // that.clearAnyTimeInterval(changeTipsTextInterval,changeDotsNumberInterval,changePointAngerInterval,checkResultInterval,searchBluetoothInterval,startMeasureInterval)
    }
    this.setData({
      status: status
    })
  },  
  clearAnyTimeInterval: function(...intervals){
    console.log('----------clearAnyTimeInter:' + intervals.toString())
    for(let i = 0;i < intervals.length;i++){
      if(intervals[i]){
        clearInterval(intervals[i])
      }
    }
  },
  changeTipsText: function(){
    if(this.data.tipsText == '不要说话'){
      this.setData({
        tipsText: '保持肢体静置避免焦虑与激动'
      })
    }else{
      this.setData({
        tipsText: '不要说话'
      })
    }
    
    changeTipsTextInterval = setTimeout(this.changeTipsText, 4000)
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
  /**
   * 检测进度
   */
  checkResult: function(){
    console.log("-----total_data-----")
    console.log(total_data)
    console.log(total_data.length)
    let checkPercentage = this.data.checkPercentage
    if(checkPercentage < 99){
      let totalLength = total_data.length
      if(totalLength <= 0){
        this.setData({checkPercentage: 0})  
      }else if(totalLength > 0 && totalLength < 9900){
        this.setData({checkPercentage: parseInt(totalLength / 100)})  
      }else if(totalLength < 10000){
        this.setData({checkPercentage: 99})  
      }else{
        //检测完成，结果取5000-20000的数字
        this.setStatus(4)
      }
      if(total_data.length < 10000){
        checkResultInterval = setTimeout(this.checkResult,5000)
      }
    }    
  },    
  // 开始扫描蓝牙设备
  searchBluetooth: function (e) {
    let that = this
    if(that.data.searchTime <= 10){
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
                    let hasConnect = false;
                    for(let i = 0;i<res.devices.length;i++){
                      //找到上次连接过的设备
                      if(res.devices[i].deviceId == app.getLastDevice().deviceId){
                        hasConnect = true
                      }
                      const namePre = res.devices[i].name.substring(0,2)
                      if(namePre == 'JT'|| namePre == 'jt'){
                        devices.push(res.devices[i])
                      }
                    }
                    if(devices[0]){
                      that.setData({
                        devices: devices
                      })
                      app.setLastDevices(devices)
                      
                      if(hasConnect){
                        //连接过自动重连
                        const hasConnectDevice = app.getLastDevice()
                        that.selectDevice(hasConnectDevice.deviceId,hasConnectDevice.deviceName,hasConnectDevice.services)
                      }else{
                        //选择设备
                        that.setStatus(1)
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
      this.setStatus(6)
    }
  },
  stopSearch: function () {
    wx.stopBluetoothDevicesDiscovery({
      success: function (res) {
        console.log('-----stopBluetoothDevicesDiscovery-----')
        // wx.closeBluetoothAdapter({
        //   success: function (res) {
        //     console.log(res)
        //   }
        // })
      }
    })
  },
  //重新选择设备连接
  reconnectedDevice: function (e) {
    let deviceId = e.currentTarget.dataset.deviceid
    let deviceName = e.currentTarget.dataset.devicename
    let that = this
    that.setStatus(2)
    wx.createBLEConnection({
      deviceId: deviceId,
      deviceName: deviceName,
      success (res){
        console.log("-----------createBLEConnection success-----------")
        console.log(res)
        
        wx.getBLEDeviceServices({
          deviceId,
          success (res) {
            console.log("-----------getBLEDeviceServices success-----------")
            console.log(res)
            let serviceId = e.currentTarget.dataset.services[0]

            wx.getBLEDeviceCharacteristics({
              deviceId,
              serviceId,
              success (res) {
                console.log("----getBLEDeviceCharacteristics success-----------")
                console.log(res)
                let characteristics = res.characteristics
                let characteristicId = '';
                for(let i = 0; i < characteristics.length; i++){
                  if(characteristics[i].properties.notify){
                    characteristicId = characteristics[i].uuid
                  }
                }
                let deviceConnected = {
                  deviceId: deviceId,
                  deviceName: deviceName,
                  serviceId: e.currentTarget.dataset.services[0],
                  services: e.currentTarget.dataset.services,
                  characteristics: characteristics
                }
                that.setData({
                  deviceConnected: deviceConnected
                })
                app.setLastDevice(deviceConnected)
                wx.redirectTo({
                  url: '../check/check',
                })
                
              },
              fail (res){
                console.log("----getBLEDeviceCharacteristics fail-----------")
                console.log(res)
              }
            })
          },
          fail (res){
            console.log("-----------getBLEDeviceServices fail-----------")
            console.log(res)
          }
        })
      },
      fail (res){
        console.log("-----------createBLEConnection fail-----------")
        console.log(res)
        that.setStatus(0)
      }
    })
  },
  checkConnected: function(){
    let that = this
    that.setStatus(2)
    let lastDevice = app.getLastDevice()
    const deviceId = lastDevice.deviceId
    const deviceName = lastDevice.deviceName
    if(deviceId){
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
                //已连接
                
                that.setData({
                    deviceConnected: app.getLastDevice()
                  },function(){
                    wx.getBLEDeviceServices({
                      deviceId,
                      success (res) {
                        console.log("-----------getBLEDeviceServices success-----------")
                        console.log(res)
                        let serviceId = lastDevice.services[0]
            
                        wx.getBLEDeviceCharacteristics({
                          deviceId,
                          serviceId,
                          success (res) {
                            console.log("----getBLEDeviceCharacteristics success-----------")
                            console.log(res)
                            let characteristics = res.characteristics
                            let characteristicId = '';
                            for(let i = 0; i < characteristics.length; i++){
                              if(characteristics[i].properties.notify){
                                characteristicId = characteristics[i].uuid
                              }
                            }
                            let deviceConnected = {
                              deviceId: deviceId,
                              deviceName: deviceName,
                              serviceId: lastDevice.services[0],
                              services: lastDevice.services,
                              characteristics: characteristics
                            }
                            that.setData({
                              deviceConnected: deviceConnected
                            })
                            app.setLastDevice(deviceConnected)
                            wx.notifyBLECharacteristicValueChange({
                              state: true, 
                              deviceId,
                              serviceId,
                              characteristicId,
                              success (res) {
                                console.log("--notifyBLECharacteristicValueChange success--")
                                console.log(res)
                                startMeasureInterval = setTimeout(that.startMeasure, 3000)
                                wx.onBLECharacteristicValueChange(function(res) {
                                  // console.log("-onBLECharacteristicValueChange-")
                                  // console.log(res)
                                  // if(res.value){
                                  //   console.log(res.value.toString())
                                  // }
                                  that.handleNotifications(that.ab2hex(res.value))
            
                                })
                              },
                              fail (res){
                                console.log("----notifyBLECharacteristicValueChange fail----")
                                console.log(res)
                              }
                            })
                          },
                          fail (res){
                            console.log("----getBLEDeviceCharacteristics fail-----------")
                            console.log(res)
                          }
                        })
                      },
                      fail (res){
                        console.log("-----------getBLEDeviceServices fail-----------")
                        console.log(res)
                      }
                    })
                  }
                )
              }else{
                //连接过未连接，尝试连接
                that.selectDevice(lastDevice.deviceId,lastDevice.deviceName,lastDevice.services)
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
    }else{
      that.setStatus(0)
    }
  
  },    
  selectDeviceTap: function(e){
    const that = this
    console.log("-----selectDeviceTap-----")
    console.log(e.currentTarget.dataset)
    let deviceId = e.currentTarget.dataset.deviceid
    let deviceName = e.currentTarget.dataset.devicename   
    let services = e.currentTarget.dataset.services 
    wx.request({
      url: app.globalData.apiHost, 
      data: 
      JSON.stringify({
        "method": "DeviceAPI.CheckDeviceIsUsable",
        "service": "com.jt-health.api.app",
        "request": {
          "user_id": app.getUser().id,
          "mac": util.replaceAll(deviceId,":",""),
          "sn": ""
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
            that.selectDevice(deviceId,deviceName,services)
          }
        }
        
      },
    })     
    
  },  
  //选择设备连接
  selectDevice: function (deviceId, deviceName, services) {
    let that = this
    that.setStatus(2)
    wx.createBLEConnection({
      deviceId: deviceId,
      deviceName: deviceName,
      success (res){
        console.log("-----------createBLEConnection success-----------")
        console.log(res)
        that.stopSearch()
        wx.getBLEDeviceServices({
          deviceId,
          success (res) {
            console.log("-----------getBLEDeviceServices success-----------")
            console.log(res)
            let serviceId = services[0]

            wx.getBLEDeviceCharacteristics({
              deviceId,
              serviceId,
              success (res) {
                console.log("----getBLEDeviceCharacteristics success-----------")
                console.log(res)
                let characteristics = res.characteristics
                let characteristicId = '';
                for(let i = 0; i < characteristics.length; i++){
                  if(characteristics[i].properties.notify){
                    characteristicId = characteristics[i].uuid
                  }
                }
                let deviceConnected = {
                  deviceId: deviceId,
                  deviceName: deviceName,
                  serviceId: services[0],
                  services: services,
                  characteristics: characteristics
                }
                that.setData({
                  deviceConnected: deviceConnected
                })
                app.setLastDevice(deviceConnected)
                startTime = new Date()
                wx.notifyBLECharacteristicValueChange({
                  state: true, 
                  deviceId,
                  serviceId,
                  characteristicId,
                  success (res) {
                    console.log("--notifyBLECharacteristicValueChange success--")
                    console.log(res)
                    startMeasureInterval = setTimeout(that.startMeasure, 3000)
                    wx.onBLECharacteristicValueChange(function(res) {
                      // console.log("-onBLECharacteristicValueChange-")
                      // console.log(res)
                      // if(res.value){
                      //   console.log(res.value.toString())
                      // }
                      that.handleNotifications(that.ab2hex(res.value))
                    })
                  },
                  fail (res){
                    console.log("----notifyBLECharacteristicValueChange fail----")
                    console.log(res)
                  }
                })
              },
              fail (res){
                console.log("----getBLEDeviceCharacteristics fail-----------")
                console.log(res)
              }
            })
          },
          fail (res){
            console.log("-----------getBLEDeviceServices fail-----------")
            console.log(res)
          }
        })
      },
      fail (res){
        console.log("-----------createBLEConnection fail-----------")
        console.log(res)
        that.setStatus(0)
      }
    })
  },
  research: function(e){
    this.setStatus(e.currentTarget.dataset.status)
  },
  startMeasure: function () {
    console.log('Start Measure Pressed')
    this.setStatus(3)
    let deviceId = this.data.deviceConnected.deviceId
    let serviceId = this.data.deviceConnected.serviceId
    let characteristicId = '79EB6177-5369-4916-8D57-DA100AE9CAC1'
    // let characteristicId = this.data.deviceConnected.serviceId;
    console.log('79EB6177-5369-4916-8D57-DA100AE9CAC1')
    let characteristics = this.data.deviceConnected.characteristics
    // let characteristicId = '';
    for(let i = 0; i < characteristics.length; i++){
      if(characteristics[i].properties.write){
        if(!characteristics[i].uuid.indexOf('79EB6177') == -1){
          characteristicId = characteristics[i].uuid
        }
      }
    }
    

    var LENGTH = 0x08;
    var CHECKSUM = 0x53; // 3+8+40+8
    CHECKSUM &= 0xff;
    CHECKSUM = ~CHECKSUM & 0xff;
    let orz = new Uint8Array([0x4e, 0x51, 0x03, 0x08, 0x40,  LENGTH, CHECKSUM, 0x5a]);
    var buffer = orz.buffer;

    wx.writeBLECharacteristicValue({
      deviceId,
      serviceId,
      characteristicId,
      value: buffer,
      success (res) {
        console.log('writeBLECharacteristicValue success', res.errMsg)
      },
      fail (res){
        console.log('writeBLECharacteristicValue fail', res.errMsg)
      }
    })
  },    
  changeVolumnStatus: function(e){
    this.playBackgroundAudio(e.currentTarget.dataset.mstatus)
    
  },
  playBackgroundAudio: function(status){
    let that = this
    if(status == 1){

      wx.playBackgroundAudio({
        dataUrl: app.getCheckMusicUrl(),
        title:'音乐',
        coverImgUrl: "封面",
        success: function(res){
          console.log('---playBackgroundAudio success--')
          console.log(res)
          that.setData({
            volumnStatus: 1
          })
          app.setVolumnStatus(1)
        },
        fail: function(res){
          console.log('---playBackgroundAudio fail--')
          console.log(res)
        }
      })
    }else if(status == 0){
      wx.stopBackgroundAudio({
        success: (res) => {
          console.log('---stopBackgroundAudio success--')
          console.log(res)
          that.setData({
            volumnStatus: 0
          })
          app.setVolumnStatus(0)
        },
        fail: (res)=>{
          console.log('---stopBackgroundAudio fail--')
          console.log(res)
        }
      })
      
    }
    
  },
        //TODO 更多为您推荐API
    getMoreRecommend: function(){
      var that = this
        // wx.request({
        //   url: getApp().data.server + 'getMoreRecommend',
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
        //           moreRecommend: result.moreRecommend
        //         })
        //       } 
        //     } else {
        //       return;
        //     }
        //   },
        // })    
        //TODELETE 测试用数据
        that.setData({
          moreRecommend: {
            picture: "../images/test/6.png", url: "http://www.baidu.com"
          }
        })
    },

    //TODO 获取设备购买链接
    getDeviceBuyUrl: function(){
      var that = this
        // wx.request({
        //   url: getApp().data.server + 'getDeviceBuyUrl',
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
        //           deviceBuyUrl: result.data
        //         })
        //       } 
        //     } else {
        //       return;
        //     }
        //   },
        // })    
        //TODELETE 测试用数据
        that.setData({
          deviceBuyUrl: 'http://www.baidu.com'
        })
    },    
    submitCheckData: function(data,startTime,endTime){
      console.log('-----submitCheckData----');
      const that = this
      const timeSecond = dateUtil.dateDiffSecond(new Date(startTime),new Date(endTime))
      const sampleRate = data.length / 3 / timeSecond
      let hash = md5.create()
      hash.update(data)
      const signature = hash.hex()
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
                "data": wx.arrayBufferToBase64(data),
                "signature": signature
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
  //TODO 更多为您推荐API
  getMoreRecommend: function(){
    var that = this
      // wx.request({
      //   url: getApp().data.server + 'getMoreRecommend',
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
      //           moreRecommend: result.moreRecommend
      //         })
      //       } 
      //     } else {
      //       return;
      //     }
      //   },
      // })    
      //TODELETE 测试用数据
      that.setData({
        moreRecommend: {
          picture: "../images/test/6.png", url: "http://www.baidu.com"
        }
      })
  },

  //TODO 获取设备购买链接
  getDeviceBuyUrl: function(){
    var that = this
      // wx.request({
      //   url: getApp().data.server + 'getDeviceBuyUrl',
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
      //           deviceBuyUrl: result.data
      //         })
      //       } 
      //     } else {
      //       return;
      //     }
      //   },
      // })    
      //TODELETE 测试用数据
      that.setData({
        deviceBuyUrl: 'http://www.baidu.com'
      })
  },    
  submitCheckData: function(data,startTime,endTime){
    const that = this
    const timeSecond = dateUtil.dateDiffSecond(new Date(startTime),new Date(endTime))
    const sampleRate = data.length / 3 / timeSecond
    let hash = md5.create()
    hash.update(data)
    const signature = hash.hex()
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
              "data": wx.arrayBufferToBase64(data),
              "signature": signature
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
  ab2hex: function(buffer) {
    var hexArr = Array.prototype.map.call(
      new Uint8Array(buffer),
      function (bit) {
        return ('00' + bit.toString(16)).slice(-2)
      }
    )
    return hexArr;
  },
  handleNotifications: function(value){
    const that = this
    Object.keys(value).forEach(function(key) {
      data_pool.push(value[key]);
    });
    that.pool_cut();
  },
  pool_cut: function(){
    const that = this
    data_pool.forEach(function(this_byte, index){
      if(this_byte == '51' && last_byte == '4e'){
        that.push_to_display(byte_group);
        byte_group = [];
      }else{
        byte_group.push(this_byte);
        last_byte=this_byte;
      }
    });
  },
  push_to_display: function(data_array){
    let that = this
    if(data_array[0] == '03' && data_array[16] == '5a' && data_array[17] == '4e'){ //is measure data set
      total_data.push(parseInt('0x'+data_array[3]+data_array[2]+data_array[1]));
      total_data.push(parseInt('0x'+data_array[6]+data_array[5]+data_array[4]));
      total_data.push(parseInt('0x'+data_array[9]+data_array[8]+data_array[7]));
      total_data.push(parseInt('0x'+data_array[12]+data_array[11]+data_array[10]));
      min_num = min_num + Math.round(min_num*0.01);
      max_num = max_num - Math.round(max_num*0.01);
  
      that.setData({
        measure_value: parseInt('0x'+data_array[3]+data_array[2]+data_array[1])
      });
   
      var current_num = parseInt('0x'+data_array[3]+data_array[2]+data_array[1]);
      if(max_num < current_num){
        max_num = current_num;
      }
      if(min_num > current_num || min_num == 0){
        min_num = current_num;
      }
      that.setData({
        measure_width: Math.round(current_num/(max_num-min_num)*100)
      });
    }
  },
  onPageScroll(e){
    console.log(e.scrollTop)
    console.log(this.data.scrollTop)
    if(this.data.scrollTop > e.scrollTop){
      console.log("页面上滑")
      if(!(this.data.showTitle)){
        //调用显示动画
        this.selectComponent("#header").show()
        this.setData({
          showTitle: true
        })
      }
    }else{
      console.log("页面下滑")
      if((this.data.showTitle)){
        //调用消失动画
        this.selectComponent("#header").hide()
        this.setData({
          showTitle: false
        })
      }
    }
    this.setData({
      scrollTop: e.scrollTop
    })
  },
})








