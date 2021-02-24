import {ReplyParser, CommandBuilder} from "../../jm-ble/index"
const EXPECTED_PACKET_SIZE = 8000 // 期望采集的数据包数量，每个数据包包含4个数据点
// 测量数据回调解析器
let parser = new ReplyParser()

const wholePayload = ReplyParser.createPayloadBuffer(EXPECTED_PACKET_SIZE) // 采集的 payload 数据缓冲区
let wholePayloadLen = 0 // 采集的 payload 数据缓冲区中的有效数据长度

const app = getApp()
const util = require("../../utils/util.js")
const dateUtil = require("../../utils/date-util.js")
const md5 = require("../../utils/js-md5.js")
let startTime = new Date()

let changeTipsTextInterval = null//提示文本，检测中检测成功
let changeDotsNumberInterval = null//... 0，2，3
let checkResultInterval = null//检测结果数据
let startMeasureInterval = null//开始输入

Page({

  /**
   * 页面的初始数据
   */
  data: {
    measure_width: 0,
    measure_value: 0,
    dots: '',
    deviceConnected: {
      deviceId: '',
      deviceName: '',
      serviceId: '',
      services: [],
      characteristics: [],
      mac: ''
    },
    checkPercentage: 0,
    volumnStatus:0,
    startCheck: 0,
    tipsText: '不要说话',
    status: 2, //0搜索，1选择，2连接中，3检测中，4检测完成，5连接错误重新选择，6没有找到设备，7自
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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoaded: function (options) {
    console.log("connect onLoad", options)
    let device = options.device
    this.checkConnected(device)
  },
  checkConnected: function(device){
    console.log('----------------checkConnected-------------------')
    device = JSON.parse(device)
    console.log(device)
    let that = this
    const deviceId = device.deviceId
    const deviceName = device.deviceName
    if(deviceId){
      wx.openBluetoothAdapter({
        success: function(res){
          console.log("----------openBluetoothAdapter success----------")
          console.log(res)
          wx.getConnectedBluetoothDevices({
            services: device.services,
            success: function(res){
              console.log("----------getConnectedBluetoothDevices success----------")
              console.log(res)
              if(res.devices[0]){
                //已连接                
                that.setData({
                    deviceConnected: device
                  },function(){
                    wx.getBLEDeviceServices({
                      deviceId,
                      success (res) {
                        console.log("-----------getBLEDeviceServices success-----------")
                        console.log(res)
                        let serviceId = device.services[0]
            
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
                            
                            app.setLastDevice(device)
                            startTime = new Date()
                            wx.notifyBLECharacteristicValueChange({
                              state: true, 
                              deviceId,
                              serviceId,
                              characteristicId,
                              success (res) {
                                console.log("--notifyBLECharacteristicValueChange success--")
                                console.log(res)
                                
                                startMeasureInterval = setTimeout(function(){
                                  that.startMeasure(deviceId,serviceId,characteristics)
                                }, 3000)

                                wholePayload.fill(0) // reset wholePayload
                                wholePayloadLen = 0
                                wx.onBLECharacteristicValueChange(function(res) {

                                  that.clollectData(res.value)
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
                that.connectDevice(device)
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
    }
  
  },    
  /**
   * 直接连接
   */
  connectDevice: function (device) {
    let that = this
    let deviceId = device.deviceId
    let deviceName = device.deviceName
    let services = device.services
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
                  characteristics: characteristics,
                  mac: device.mac
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

                    startMeasureInterval = setTimeout(function(){
                      that.startMeasure(deviceId,serviceId,characteristics)
                    }, 3000)

                    wholePayload.fill(0) // reset wholePayload
                    wholePayloadLen = 0
                    wx.onBLECharacteristicValueChange(function(res) {

                      that.clollectData(res.value)
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.checkResult()
    this.changeTipsText()
    this.changeDotsNumber()
    this.selectComponent("#header").onlyBack('#F2F2F6')
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.playBackgroundAudio(0)  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.clearAnyTimeInterval(changeTipsTextInterval,changeDotsNumberInterval,checkResultInterval,startMeasureInterval)
    wx.closeBluetoothAdapter({
      success: function (res) {
        console.log('-----closeBluetoothAdapter:success-----')
        console.log(res)
      },
      fail: function(res){
        console.log('-----closeBluetoothAdapter:fail-----')
        console.log(res)
      }
    })        
    this.playBackgroundAudio(0)  
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
  /**
   * 检测进度
   */
  checkResult: function(){
    let that = this
    let checkPercentage = this.data.checkPercentage
    if(checkPercentage <= 99 && wholePayloadLen > 0){
      let totalLength = wholePayloadLen
      if(totalLength <= 0){
        this.setData({checkPercentage: 0})  
      }else if(totalLength > 0 && totalLength < 23000){
        this.setData({checkPercentage: parseInt(totalLength / 230)})  
      }else if(totalLength < 24000){
        this.setData({checkPercentage: 99})  
      }else{
        //检测完成，结果取5000-20000的数字
        this.setData({
          status: 4,
          checkPercentage: 100,
        })
        console.log('before,submitCheckData')
        //提交数据
        that.submitCheckData(wholePayload.slice(0,24000),startTime,new Date())
      }
    }  
    checkResultInterval = setTimeout(that.checkResult,1000)
    console.log("checkResult:",wholePayloadLen)  
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
  clearAnyTimeInterval: function(...intervals){
    console.log('----------clearAnyTimeInterfal:' + intervals.toString())
    for(let i = 0;i < intervals.length;i++){
      if(intervals[i]){
        clearInterval(intervals[i])
      }
    }
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
      wx.onBackgroundAudioStop((res) => {
        console.log("onBackgroundAudioStop")
        app.setVolumnStatus(0)
        that.setData({
          volumnStatus: 0
        })
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
  
  submitCheckData: function(data,startTime,endTime){
    let base64Data = wx.arrayBufferToBase64(data)
    // this.uploadFileForText(base64Data)
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
            "device_mac": that.data.deviceConnected.mac,
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
    // console.log("requestData-------------",requestData)
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
        that.closeBluetooth()
      }
    })     
  },      
  closeBluetooth: function(){
    wx.closeBluetoothAdapter({
      success: (res) => {},
      complete: (res) =>{
        console.log('-----closeBluetoothAdapter-----')
      }
    })
  },
  startMeasure: function (deviceId,serviceId,characteristics) {
    console.log('-----startMeasure-----')
    console.log(deviceId,serviceId,characteristics)
    this.setData({
      status:3
    })
    let characteristicId = '';
    
    for(let i = 0; i < characteristics.length; i++){
      if(characteristics[i].properties.write){
        if(characteristics[i].uuid.indexOf('79EB6177') != -1){
          characteristicId = characteristics[i].uuid
          console.log(characteristicId)
        }
      }
    }

    const orz = CommandBuilder.startPulseTest(EXPECTED_PACKET_SIZE)
    var buffer = orz.buffer;

    wx.writeBLECharacteristicValue({
      deviceId,
      serviceId,
      characteristicId,
      value: buffer,
      success (res) {
        console.log('writeBLECharacteristicValue success', res.errMsg)
        console.log(`开始采集脉诊数据: ${EXPECTED_PACKET_SIZE} 个数据包`)
      },
      fail (res){
        console.log('writeBLECharacteristicValue fail', res.errMsg)
      }
    })
  },      
  // 收集通知回应
  clollectData: function(reply) {
  const data = new Uint8Array(reply)
  parser.fill(data)

  const size = parser.readPayload(wholePayload, wholePayloadLen)
  wholePayloadLen = wholePayloadLen + size
  },
})
