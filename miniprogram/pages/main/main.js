const app = getApp()
const dateUtil = require("../../utils/date-util.js")
let dataDelayDoInterval = null
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeIndex: 0,
    // home start
    showImportantNotice: 0,
    imageDevice2: app.globalData.resourcesHost + 'device2.png',
    imageShare: app.globalData.resourcesHost + 'share@2x.png',
    imageArrowBlue: app.globalData.resourcesHost + 'arrow-blue@2x.png',
    imageLogoAlert: app.globalData.resourcesHost + 'logo-alert@2x.png',
    imageCancelCircle: app.globalData.resourcesHost + 'cancel-circle@2x.png',
    imageWangweigong1: app.globalData.resourcesHost + 'article/wangweigong1.png',
    imageJianzhi:  app.globalData.resourcesHost + 'home/jianzhi-new.jpg',
    imageJiankang:  app.globalData.resourcesHost + 'home/jiankang-new.jpg',
    imageYingyang:  app.globalData.resourcesHost + 'home/yingyang-new.jpg',
    imageShanshi:  app.globalData.resourcesHost + 'home/shanshi-new.jpg',
    imageDeviceHome:  app.globalData.resourcesHost + 'home/device-home-new.jpg',
    imageProductMain:  app.globalData.resourcesHost + 'home/product-main-new.jpg',
    imageProduct1:  app.globalData.resourcesHost + 'home/product1-new.jpg',
    imageProduct2:  app.globalData.resourcesHost + 'home/product2-new.jpg',
    imageProduct3:  app.globalData.resourcesHost + 'home/product3-new.jpg',
    imageProduct4:  app.globalData.resourcesHost + 'home/product4-new.jpg',
    imageProduct5:  app.globalData.resourcesHost + 'home/product5-new.jpg',
    imageProduct6:  app.globalData.resourcesHost + 'home/product6-new.jpg',
    imageProduct7:  app.globalData.resourcesHost + 'home/product7-new.jpg',
    // home end
    // check start 
    heightArray: ['140CM', '141CM', '142CM', '143CM', '144CM', '145CM', '146CM', '147CM', '148CM', '149CM', '150CM', '151CM', '152CM', '153CM', '154CM', '155CM', '156CM', '157CM', '158CM', '159CM', '160CM', '161CM', '162CM', '163CM', '164CM', '165CM', '166CM', '167CM', '168CM', '169CM', '170CM', '171CM', '172CM', '173CM', '174CM', '175CM', '176CM', '177CM', '178CM', '179CM', '180CM', '181CM', '182CM', '183CM', '184CM', '185CM', '186CM', '187CM', '188CM', '189CM', '190CM', '191CM', '192CM', '193CM', '194CM', '195CM', '196CM', '197CM', '198CM', '199CM', '200CM', '201CM', '202CM', '203CM', '204CM', '205CM', '206CM', '207CM', '208CM', '209CM', '210CM', '211CM', '212CM', '213CM', '214CM', '215CM', '216CM', '217CM', '218CM', '219CM', '220CM', '221CM', '222CM', '223CM', '224CM', '225CM', '226CM', '227CM', '228CM', '229CM', '230CM'],
    heightIndex: 30,
    weightArray: ['35KG', '36KG', '37KG', '38KG', '39KG', '40KG', '41KG', '42KG', '43KG', '44KG', '45KG', '46KG', '47KG', '48KG', '49KG', '50KG', '51KG', '52KG', '53KG', '54KG', '55KG', '56KG', '57KG', '58KG', '59KG', '60KG', '61KG', '62KG', '63KG', '64KG', '65KG', '66KG', '67KG', '68KG', '69KG', '70KG', '71KG', '72KG', '73KG', '74KG', '75KG', '76KG', '77KG', '78KG', '79KG', '80KG', '81KG', '82KG', '83KG', '84KG', '85KG', '86KG', '87KG', '88KG', '89KG', '90KG', '91KG', '92KG', '93KG', '94KG', '95KG', '96KG', '97KG', '98KG', '99KG', '100KG', '101KG', '102KG', '103KG', '104KG', '105KG', '106KG', '107KG', '108KG', '109KG', '110KG', '111KG', '112KG', '113KG', '114KG', '115KG', '116KG', '117KG', '118KG', '119KG', '120KG', '121KG', '122KG', '123KG', '124KG', '125KG', '126KG', '127KG', '128KG', '129KG', '130KG', '131KG', '132KG', '133KG', '134KG', '135KG', '136KG', '137KG', '138KG', '139KG', '140KG', '141KG', '142KG', '143KG', '144KG', '145KG', '146KG', '147KG', '148KG', '149KG', '150KG'],
    weightIndex: 25,
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
    compositeIndex: "--",
    lastCheckDate: "--",
    showNewBook: false,
    showDeviceGuide: false,
    imageNotice: app.globalData.resourcesHost + 'check/notice@2x.png',
    imageEquip: app.globalData.resourcesHost + 'check/equip@2x.png',
    imageApple: app.globalData.resourcesHost + 'check/apple@2x.png',
    imageChallenge: app.globalData.resourcesHost + 'check/challenge@2x.png',
    imageInvite: app.globalData.resourcesHost + 'check/invite@2x.png',
    imageShare: app.globalData.resourcesHost + 'check/member@2x.png',
    imageCancelCircle: app.globalData.resourcesHost + 'cancel-circle@2x.png',
    imageGender1: app.globalData.resourcesHost + 'newbook/gender1@2x.png',
    imageGender1Grey: app.globalData.resourcesHost + 'newbook/gender1-grey@2x.png',
    imageGender2: app.globalData.resourcesHost + 'newbook/gender2@2x.png',
    imageGender2Grey: app.globalData.resourcesHost + 'newbook/gender2-grey@2x.png',
    imageRecommend: app.globalData.resourcesHost + 'my/recommend@3x.png',
    imageDevice: app.globalData.resourcesHost + 'check/device.png',
    imageStep1: app.globalData.resourcesHost + 'newbook/step1.png',
    imageStep2G1: app.globalData.resourcesHost + 'newbook/step2-1.png',
    imageStep2G2: app.globalData.resourcesHost + 'newbook/step2-2.png',
    imageStep3G1: app.globalData.resourcesHost + 'newbook/step3-1.png',
    imageStep3G2: app.globalData.resourcesHost + 'newbook/step3-2.png',
    step: 1,
    step2: 0,
    // check end
    // eatright start
    showSelect: false,
    imageEatright: app.globalData.resourcesHost + 'eat/eatright@2x.png',
    imageEatrightGrey: app.globalData.resourcesHost + 'eat/eatright-grey@2x.png',
    imageEatrightUp: app.globalData.resourcesHost + 'eat/eatright-up@2x.png',
    imageEatrightDown: app.globalData.resourcesHost + 'eat/eatright-down@2x.png',
    imageTips: app.globalData.resourcesHost + 'tips@2x.png',
    imageArrow: app.globalData.resourcesHost + 'arrow@2x.png',
    imageCompareUp: app.globalData.resourcesHost + 'eat/compare-up.png',
    imageCompareDown: app.globalData.resourcesHost + 'eat/compare-down.png',
    imageCompare: app.globalData.resourcesHost + 'eat/compare@2x.png',
    imageCompareArrowUp: app.globalData.resourcesHost + 'eat/arrow-up@2x.png',
    imageCompareArrowDown: app.globalData.resourcesHost + 'eat/arrow-down@2x.png',
    imageCompareArrow: app.globalData.resourcesHost + 'eat/arrow@2x.png',
    imageArrow: app.globalData.resourcesHost + 'arrow@2x.png',
    // eatright end
    // report start
    imageFamily: app.globalData.resourcesHost + 'report/family@2x.png',
    imageReport: app.globalData.resourcesHost + 'report/report@2x.png',
    imageAnalysisWeek: app.globalData.resourcesHost + 'report/analysis-week@2x.png',
    imageAnalysisMonth: app.globalData.resourcesHost + 'report/analysis-month@2x.png', 
    // report end
    // my start
    nickName: '',
    resourcesHost: '',
    unReadCount: 0,
    imageFamilyNew: app.globalData.resourcesHost + 'my/family-new@2x.png',
    imageOrder: app.globalData.resourcesHost + 'my/order-new@2x.png',
    imageStore: app.globalData.resourcesHost + 'my/store@2x.png',
    imageArrow: app.globalData.resourcesHost + 'arrow@2x.png',
    imageVipFamily: app.globalData.resourcesHost + 'my/vip-family@2x.png',
    imageVip: app.globalData.resourcesHost + 'my/vip@2x.png',
    // my end
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoaded: function (options) {
    this.addData(0)
    
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
  scroll: function(e){

  },
  addData: function(index){
    const that = this
    if(index == 0){
      //导航标题
      this.selectComponent("#header").setTitle("探索")
      let user = app.getUser()
      if(user && user.id){
        dataDelayDoInterval = setTimeout(function(){
        //获取弹窗公共
        that.getVersionUpdateInfo()
        // //获取专题菜单
        // that.listChannelMenus()

        },500)
        
      }
    }else if(index == 1){
      this.checkConnected()
      this.getLastReport()
      //底部导航选中
      this.checkHasGuide()
      //标题
      this.selectComponent("#header").setTitle("检测")
    }else if(index == 2){
      //底部导航选中
      let endDate = new Date()
      endDate.setHours(23)
      endDate.setMinutes(59)
      endDate.setSeconds(59)
      let startDate = new Date()
      startDate.setDate(1)
      startDate.setHours(0)
      startDate.setMinutes(0)
      startDate.setSeconds(0)
      //获取报告记录
      this.listReports(startDate,endDate)
      this.selectComponent("#header").setTitle("吃对了么")
    }else if(index == 3){
      //周报测量天数
      this.getMeasurementDays()
      this.setData({userId: app.getUser().id})
      this.selectComponent("#header").setTitle("报告")
    }else if(index == 4){
      //获取站内信
      this.listNotification()
      //用户VIP信息
      this.getVipInfo()
      //获取用户信息
      this.getUserProfile()
      this.selectComponent("#header").setTitle("我的")
    }
  },
  changeActiveIndex: function(e){
    let index = e.detail.activeIndex
    this.setData({
      activeIndex: index
    })
    this.addData(index)
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    clearInterval(dataDelayDoInterval)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearInterval(dataDelayDoInterval)
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

  onPageScroll(e){
    let h = 15
    let h2 = parseInt(this.data.statusHeight/this.data.pixelRatio) + 72
    if(this.data.scrollTop < e.scrollTop){
      console.log("页面上滑")
      if(!(this.data.showTitle) && e.scrollTop > h){
        //调用显示动画
        this.selectComponent("#header").show()
        this.setData({
          showTitle: true
        })
      }
      if(!(this.data.showTitle2) && e.scrollTop > h2){
        //调用显示动画
        this.selectComponent("#header").showText()
        this.setData({
          showTitle2: true
        })
      }
    }else if(this.data.scrollTop > e.scrollTop){
      console.log("页面下滑")
      if((this.data.showTitle) && e.scrollTop < h){
        //调用显示动画
        this.selectComponent("#header").hide()
        this.setData({
          showTitle: false
        })
      }
      if((this.data.showTitle2) && e.scrollTop < h2){
        //调用显示动画
        this.selectComponent("#header").hideText()
        this.setData({
          showTitle2: false
        })
      }
    }
    this.setData({
      scrollTop: e.scrollTop
    })
  },
  
  getVersionUpdateInfo: function(){
    let that = this
    const system = wx.getSystemInfoSync().system.toLowerCase().toString()
    let method = "UserAPI.GetAndroidUpdateInfo"
    let isIos = false
    if(system.indexOf('ios') != -1 || system.indexOf('macos') != -1){
      method = "UserAPI.GetIOSUpdateInfo"
      isIos = true
    }
    wx.request({
      url: app.globalData.apiHost, 
      data: 
      JSON.stringify({
        "method": method,
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
          let appLink, appSize, updateInfo, version = ''
          let showImportantNotice = 0
          if(isIos){
            appLink = res.data.app_store_link,
            appSize = res.data.app_size,
            updateInfo = res.data.update_info,
            version = res.data.version
          }else{
            appLink = res.data.apk_link,
            appSize = res.data.apk_size,
            updateInfo = res.data.update_info,
            version = res.data.version
          }
          if(app.getAppVersion() != version){
            showImportantNotice = 1
          }
           that.setData({
            appLink: appLink,
            appSize: appSize,
            updateInfo: updateInfo,
            version: version,
            showImportantNotice: showImportantNotice
          })

        }

      },
    })  
  },    
  closeNotice: function(e){
    app.setAppVersion(this.data.version)
    this.setData({
      showImportantNotice: 0
    })
  },
  listChannelMenus: function(){
    const that = this
    wx.request({
      url: app.globalData.apiHost, 
      data: 
      JSON.stringify({
        "method": "MarketingAPI.ListChannelMenus",
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
          if(res.data.channel_menus){
            let channelMenus = res.data.channel_menus
            for(let i = 0; i < channelMenus.length; i++){
              let image = channelMenus[i].image
              if(image.title == "健康"){
                channelMenus[i].image.public_access_url = that.data.imageJiankang
              }else if(image.title == "减脂"){
                channelMenus[i].image.public_access_url = that.data.imageJianzhi
              }else if(image.title == "膳食"){
                channelMenus[i].image.public_access_url = that.data.imageShanshi
              }else if(image.title == "营养"){
                channelMenus[i].image.public_access_url = that.data.imageYingyang
              }
            }
            that.setData({
              channelMenus: channelMenus
            })
            console.log(channelMenus)
          }
        }
        
        
      },
    })     
  },
  toYouzanShop: function(e){
    wx.navigateToMiniProgram({
      appId: 'wx6deb54e571e86e3c',
      extraData: {},
      envVersion: 'release',
      success(res) {
        // 打开成功
        console.log('navigateToMiniProgram youzan')
      }
    })
  },
  // home end
  // check start
  checkHasGuide: function(){
    if(app.gethasGuide() == 1){
      this.setData({
        hasGuide: true
      })
    }else{
      this.setData({
        hasGuide: false
      })
    }
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
                  deviceConnected: app.getLastDevice(),
                  deviceConnectedJson: JSON.stringify(app.getLastDevice())
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
  getLastReport: function(){
    let that = this
    wx.request({
      url: app.globalData.apiHost, 
      data: 
      JSON.stringify({
        "method": "ReportAPI.GetLastReportBrief",
        "service": "com.jt-health.api.app",
        "request": {
          "user_profile_id": app.getUser().id
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
          if(res){
            if(res.data.has_record){
              that.setData({
                lastCheckDate: res.data.last_report_time
              })
            }
            if(res.data.has_measurement_today){
              that.setData({
                compositeIndex: res.data.today_health_risk_index
              })
            }
          }
        }
        
      },
    })     
  },
  changeHand: function(e){
    let hand = e.currentTarget.dataset.hand
    let userProfile = this.data.userProfile
    userProfile.hand = hand
    this.setData({
      userProfile: userProfile
    })
  },
  weightChange: function(e){
    let weight = this.data.weightArray[e.detail.value]
    weight = weight.substring(0,weight.length-2)
    if(weight){
      let userProfile = this.data.userProfile
      userProfile.weight = weight
      this.setData({
        userProfile: userProfile
      })
    }    
  },
  heightChange: function(e){
    let height = this.data.heightArray[e.detail.value]
    height = height.substring(0,height.length-2)
    if(height){
      let userProfile = this.data.userProfile
      userProfile.height = height
      this.setData({
        userProfile: userProfile
      })
    }    
  },
  birthdayChange: function(e){
    let birthday = e.detail.value
    let birthdayArr = birthday.split("-")
    let userProfile = this.data.userProfile
    userProfile.birthday.year = birthdayArr[0]
    userProfile.birthday.month = birthdayArr[1]
    userProfile.birthday.day = birthdayArr[2]
    this.setData({
      userProfile: userProfile
    })
  },
  changeGender: function(e){
    let that = this
    wx.showModal({
      title: "温馨提示",
      content: "性别一旦设定，不可自行修改!",
      success: function(res){
        if(res.confirm){
          let gender = e.currentTarget.dataset.gender
          let userProfile = that.data.userProfile
          userProfile.gender = gender
          that.setData({
            userProfile: userProfile
          })
        }
      }
    })

  }, 
  lastStep2: function(e){
    let step = e.currentTarget.dataset.step
    if(step > 0){
      this.setData({
        step2: step - 1
      })
    }
  },
  lastStep: function(e){
    let step = e.currentTarget.dataset.step
    if(step > 1){
      this.setData({
        step: step - 1
      })
    }
  },
  nextStep2: function(e){
    let step = e.currentTarget.dataset.step
    if(step == 3){
      app.sethasGuide(1)
      this.setData({
        showDeviceGuide: false,
        hasGuide: true
      })
    }else{
      this.setData({
        step2: step + 1
      })
    }
  },
  nextStep: function(e){
    console.log(e)
    let step = e.currentTarget.dataset.step
    if(step == 4){
      this.updateUserProfile()
      this.setData({
        showNewBook: false,
        showDeviceGuide: true
      })
    }else{
      this.setData({
        step: step + 1
      })
    }
  },
  showNewBook: function(e){
    const status = e.currentTarget.dataset.status
    if(status == 0){
      this.setData({
        showNewBook: false,
        showDeviceGuide: false
      })
    }else if(status == 1){
      this.setData({
        showNewBook: true
      })
    }
  },
  updateUserProfile: function(){
    let that = this
    wx.request({
      url: app.globalData.apiHost, 
      data: 
      JSON.stringify({
        "method": "UserProfileAPI.UpdateUserProfile",
        "service": "com.jt-health.api.app",
        "request": {
         "user_id": app.getUser().id,
         "user_profile": that.data.userProfile,
         "update_mask": {paths: ['gender','birthday','height','weight','hand']}
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
          if(res.data.profile){
            app.setUserProfile(res.data.profile)
            that.setData({
              userProfile: res.data.profile
            })
          }
        }

      },
    })  
  },    
  // check end
  // eatright start
  selectReport: function(e){
    let date = e.currentTarget.dataset.date
    let id = e.currentTarget.dataset.id
    let heart = e.currentTarget.dataset.heart
    let risk = e.currentTarget.dataset.risk
    const ori = this.data.ori
    let reportBefore = this.data.reportBefore
    let reportAfter = this.data.reportAfter
    if(ori == 1){
      console.log("选中吃前")
      if(reportBefore && !reportAfter){
        reportAfter = {id: id, date: date, riskIndex: risk, heartRate: heart, dateText: dateUtil.getTimeDescritipn(date)}
      }else{
        reportBefore = {id: id, date: date, riskIndex: risk, heartRate: heart, dateText: dateUtil.getTimeDescritipn(date)}
      }
    }else if(ori == 2){
      console.log("选中吃后")
      if(reportAfter && !reportBefore){
        reportBefore = {id: id, date: date, riskIndex: risk, heartRate: heart, dateText: dateUtil.getTimeDescritipn(date)}
      }else{
        reportAfter = {id: id, date: date, riskIndex: risk, heartRate: heart, dateText: dateUtil.getTimeDescritipn(date)}
      }
      
    }
    if(reportBefore && reportAfter){
      let beforeTime = new Date(reportBefore.date)
      let afterTime = new Date(reportAfter.date)
      if(beforeTime.getTime() < afterTime.getTime()){
        let temp = reportBefore
        reportBefore = reportAfter
        reportAfter = temp
      }
    }
    if(reportBefore){
      this.selectComponent("#calendar").setTextUnique(reportBefore.date,"吃前",true,false)
    }
    if(reportAfter){
      this.selectComponent("#calendar").setTextUnique(reportAfter.date,"吃后",true,false)
    }
    
    let doComparison = false
    if(reportBefore && reportAfter){
      let beforeTime = new Date(reportAfter.date)
      let afterTime = new Date(reportBefore.date)
      if(beforeTime.getTime() < afterTime.getTime()){
        let temp = reportBefore
        reportBefore = reportAfter
        reportAfter = temp
      }
      if(beforeTime.getFullYear() == afterTime.getFullYear() && beforeTime.getMonth() == afterTime.getMonth() && beforeTime.getDate() == afterTime.getDate()){
        this.selectComponent("#calendar").setTextUnique(date,"前后",true,true)
      }
      doComparison = true 
    }
    if(doComparison){
      this.compareReport(reportBefore.id,reportAfter.id)
    }
    if(reportBefore){
      reportBefore.timeDetail = dateUtil.getTimeDetail(reportBefore.date)
      if(reportBefore.dateText.length < 1){
        reportBefore.dateText = "吃前"
      }
      this.setData({
        reportBeforeJson: JSON.stringify(reportBefore)
      })
    }
    if(reportAfter){
      reportAfter.timeDetail = dateUtil.getTimeDetail(reportAfter.date)
      if(reportAfter.dateText.length < 1){
        reportAfter.dateText = "吃后"
      }
      this.setData({
        reportAfterJson: JSON.stringify(reportAfter)
      })
    }
    this.setData({
      reportBefore: reportBefore ? reportBefore : null,
      reportAfter: reportAfter ? reportAfter: null,
      showSelect: false
    })
  },
  openSelectReport: function(e){
    this.setData({
      showSelect: true,
      ori: e.currentTarget.dataset.ori
    })
  },
  selectDay: function(e){
    let date = e.detail.date
    let endDate = new Date(date)
    endDate.setHours(23)
    endDate.setMinutes(59)
    endDate.setSeconds(59)
    let startDate = new Date(date)
    startDate.setHours(0)
    startDate.setMinutes(0)
    startDate.setSeconds(0)
    this.listReports(startDate,endDate)
  },
  dateChangeTap: function(e){
    this.dateChange(e.detail.date)
  },
  dateChange: function(inputDate){
    let dateArr = new Date(inputDate)
    let y = dateArr.getFullYear()
    let m = dateArr.getMonth() + 1
    let date = new Date()
    date.setFullYear(y)
    date.setMonth(m)
    if(m == 1||m==3||m==5||m==7||m==8||m==10||m==12){
      date.setDate(31)
    }else if(m==2){
      if(y % 4 == 0){
        date.setDate(29)
      }else{
        date.setDate(28)
      }
    }else{
      date.setDate(30)
    }
    
    let endDate = new Date(date)
    endDate.setHours(23)
    endDate.setMinutes(59)
    endDate.setSeconds(59)
    let startDate = new Date(date)
    startDate.setDate(1)
    startDate.setHours(0)
    startDate.setMinutes(0)
    startDate.setSeconds(0)
    this.listReports(startDate,endDate)
    let reportBefore = this.data.reportBefore
    if(reportBefore){
      this.selectComponent("#calendar").setTextUnique(reportBefore.date,"吃前",true,false)
    }
    let reportAfter = this.data.reportAfter
    if(reportAfter){
      this.selectComponent("#calendar").setTextUnique(reportAfter.date,"吃后",true,false)
    }
    if(reportBefore && reportAfter){
      let beforeTime = new Date(reportBefore.date)
      let afterTime = new Date(reportAfter.date)
      if(beforeTime.getFullYear() == afterTime.getFullYear() && beforeTime.getMonth() == afterTime.getMonth() && beforeTime.getDate() == afterTime.getDate()){
        this.selectComponent("#calendar").setTextUnique(reportAfter.date,"前后",true,true)
      }
    }
  },
  listReports: function(startDate,endDate){
    let that = this
    let startTimeReq = startDate
    let endTimeReq = endDate
    wx.request({
      url: app.globalData.apiHost, 
      data: 
      JSON.stringify({
        "method": "ReportAPI.ListReports",
        "service": "com.jt-health.api.app",
        "request": {
          "user_id": app.getUser().id,
          "pagination": {
            offset: 1,
            size: 20
          },
          "search_condition": {
            "user_profile_id": app.getUser().id,
            "start_time": startTimeReq,
            "end_time": endTimeReq
            
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
        console.log(res)
        if(res.statusCode == 200){
          let reports = []
          let reportTime = []
          if(res.data.health_reports && res.data.health_reports[0]){
            for(let i = 0; i < res.data.health_reports.length; i++){
              let date = new Date(dateUtil.utcToBeiJing(res.data.health_reports[i].create_time))
              let report = {
                id: res.data.health_reports[i].health_report_id,
                riskIndex: res.data.health_reports[i].health_risk_index.index_value,
                heartRate: res.data.health_reports[i].heart_rate,
                time: (date.getMonth() + 1) + "月" + date.getDate() + "日 " + date.getFullYear() + "年",
                enableS: res.data.health_reports[i].enable_statistics,
                date: dateUtil.dateToStringYYMMDD_hhmmss(date),
                time2: date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
              }
              reports.push(report)
              reportTime.push(dateUtil.dateToStringYYMMDD(date))
            }
            that.setData({
              reports: reports,
              
            })
            that.selectComponent("#calendar").setReportData(reportTime)
          }else{
            that.setData({
              reports: []
            })
          }
        }
        
      },
    })     
  },
  compareReport: function(reportId1,reportId2){
    let that = this
    wx.request({
      url: app.globalData.apiHost, 
      data: 
      JSON.stringify({
        "method": "ReportAPI.GetComparisonReport",
        "service": "com.jt-health.api.app",
        "request": {
          "user_id": app.getUser().id,
          "user_profile_id": app.getUser().id,
          "language_code": "zh-Hans",
          "first_report_id": reportId1,
          "second_report_id": reportId2
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
          if(res.data.comparison_report){
            let compareReport = res.data.comparison_report
            compareReport.same_risks_count = (compareReport.same_risks_count) > 0 ? compareReport.same_risks_count : 0
            compareReport.decreased_risks_count = (compareReport.decreased_risks_count) > 0 ? compareReport.decreased_risks_count : 0
            compareReport.increased_risks_count = (compareReport.increased_risks_count) > 0 ? compareReport.increased_risks_count : 0
            if(compareReport.improvement_status == "IMPROVEMENT_STATUS_INCREASED"){
              compareReport.resultStatus = 1
            }else if(compareReport.improvement_status == "IMPROVEMENT_STATUS_SAME"){
              compareReport.resultStatus = 2
            }else if(compareReport.improvement_status == "IMPROVEMENT_STATUS_DECREASED"){
              compareReport.resultStatus = 3
            }
            if(!(compareReport.reducing_risks)){
              compareReport.reducing_risks = [compareReport.risk[0],compareReport.risk[1],compareReport.risk[2],compareReport.risk[3]]  
            }else{
              for(let i = 0; i < compareReport.risk.length; i++){
                if(compareReport.reducing_risks.length >= 4){
                  break
                }
                for(let j = 0; j < compareReport.reducing_risks.length; j++){
                  if(compareReport.risk[i].risk_name == compareReport.reducing_risks[j].risk_name){
                    continue
                  }
                }
                compareReport.reducing_risks.push(compareReport.risk[i])
              }
            }
            let reducingRisk = []
            let name1 = compareReport.reducing_risks[0].risk_name
            let name2 = compareReport.reducing_risks[1].risk_name
            let name3 = compareReport.reducing_risks[2].risk_name
            let name4 = compareReport.reducing_risks[3].risk_name
            for(let i = 0; i < compareReport.risk.length; i++){
              if(compareReport.risk[i].risk_name == name1 || compareReport.risk[i].risk_name == name2 || compareReport.risk[i].risk_name == name3 || compareReport.risk[i].risk_name == name4){
                let item = compareReport.risk[i]
                if(!(item.former_index_value)){
                  item.former_index_value = '--'
                }
                if(!(item.later_index_value)){
                  item.later_index_value = item.former_index_value
                }
                if(item.former_index_value > 0){
                  item.widthF = parseInt(item.former_index_value * 100 / 420 )
                }else{
                  item.widthF = 0
                }
                if(item.later_index_value > 0){
                  item.widthL = parseInt(item.later_index_value * 100 / 420 )
                }else{
                  item.widthL = 0
                }
                
                if(item.later_index_value > item.former_index_value){
                  item.image = that.data.imageCompareArrowUp
                  item.status = 3
                  
                }else if(item.later_index_value == item.former_index_value){
                  item.image = that.data.imageCompareArrow
                  item.status = 2
                }else{
                  item.image = that.data.imageCompareArrowDown
                  item.status = 1
                }
                reducingRisk.push(item)
              }
            }
            compareReport.reducingRisk = reducingRisk
            

            console.log(compareReport)
            that.setData({
              compareReport: compareReport,
              hasResult: true,
            })
          }else{
            that.setData({
              hasResult: false
            })
          }
        }
        
      },
    })     
  },
  // eatright end
  // report start
  getMeasurementDays: function(){
    let that = this
    wx.request({
      url: app.globalData.apiHost, 
      data: 
      JSON.stringify({
        "method": "ReportAPI.GetMeasurementDays",
        "service": "com.jt-health.api.app",
        "request": {
          "user_profile_id": app.getUser().id
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
          let weeklyDays = 0
          let monthlyDays = 0
          if(res.data.monthly_days){
            monthlyDays = res.data.monthly_days
          }
          if(res.data.weekly_days){
            weeklyDays = res.data.weekly_days
          }
          that.setData({
            weeklyDays: weeklyDays,
            monthlyDays: monthlyDays
          })
        }
        
      },
    })     
  },
  
  // report end
  // my start 
  getUserProfile: function(){
    let that = this
    wx.request({
      url: app.globalData.apiHost, 
      data: 
      JSON.stringify({
        "method": "UserProfileAPI.GetUserProfile",
        "service": "com.jt-health.api.app",
        "request": {
         "user_id": app.getUser().id,
         "user_profile_id": app.getUser().id
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
          let userProfile = res.data.profile
          that.setData({
            userProfile: userProfile
          })
        }

      },
    })     
  },
  listNotification: function(){
    let that = this
    wx.request({
      url: app.globalData.apiHost, 
      data: 
      JSON.stringify({
        "method": "NotificationAPI.ListOnSiteMessages",
        "service": "com.jt-health.api.app",
        "request": {
         "user_id": app.getUser().id,
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
           let unReadCount = 0
           if(res.data.unread_messages_size){
            unReadCount = res.data.unread_messages_size
           }else if(res.data.unread_messages_size > 99){
            unReadCount = 99
           }
           that.setData({
            unReadCount: unReadCount
           })
        }

      },
    })     
  },
  getVipInfo: function(){
    const that = this
    wx.request({
      url: app.globalData.apiHost, 
      data: 
      JSON.stringify({
        "method": "SubscriptionAPI.GetSubscriptionSummary",
        "service": "com.jt-health.api.app",
        "request": {
          "user_id": app.getUser().id
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
          const subscriptionSummary = res.data.subscription_summary
          const vipTime = dateUtil.utcToBeiJing(subscriptionSummary.personal_timeline.expired_time)
          const vipFamilyTime = dateUtil.utcToBeiJing(subscriptionSummary.family_timeline.expired_time)

          let vipInfo = {
            vipTimeBegin: dateUtil.dateToStringYYMMDD(dateUtil.utcToBeiJing(subscriptionSummary.personal_timeline.available_begin_time)),
            vipTime: dateUtil.dateToStringYYMMDD(vipTime),
            isVip: subscriptionSummary.personal_subscription_expired ? false : true,
            vipFamilyTimeBegin: dateUtil.dateToStringYYMMDD(dateUtil.utcToBeiJing(subscriptionSummary.family_timeline.available_begin_time)),
            vipFamilyTime: dateUtil.dateToStringYYMMDD(vipFamilyTime),
            isVipFamily: subscriptionSummary.family_subscription_expired ? false : true,
            vipRemainDay: dateUtil.dateDiffDay(new Date(), vipTime),
            vipFamilyRemainDay: dateUtil.dateDiffDay(new Date(), vipFamilyTime),
          }
          that.setData({vipInfo: vipInfo})
        }
        
      },
    })     
  },
  // my end
})