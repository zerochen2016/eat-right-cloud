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
    imageStep2G1: app.globalData.resourcesHost + 'newbook/step2-1.png',
    imageStep2G2: app.globalData.resourcesHost + 'newbook/step2-2.png',
    imageStep3G1: app.globalData.resourcesHost + 'newbook/step3-1.png',
    imageStep3G2: app.globalData.resourcesHost + 'newbook/step3-2.png',
    imageHandLeft: app.globalData.resourcesHost + 'newbook/hand-left2x.png',
    imageHandRight: app.globalData.resourcesHost + 'newbook/hand-right2x.png',
    step: 1,
    step2: 0,
    // check end
    // eatright start
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
    imageAvatarDefault: app.globalData.resourcesHost + 'avatar-default.png',
    // my end
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoaded: function (options) {
    console.log("main onLoaded",options)
    let activeIndex = 0
    if(options.index > 0){
      activeIndex = options.index
      this.selectComponent("#bottom-navigate").setActiveIndex(activeIndex)
    }
    this.addData(activeIndex)
    if(options.sback){
      let id1, id2 = ""
      if(options.reportBefore){
        let reportBefore = JSON.parse(options.reportBefore)
        id1 = reportBefore.id
        this.setData({
          reportBefore: reportBefore,
          reportBeforeJson: options.reportBefore
        })
      }
      if(options.reportAfter){
        let reportAfter = JSON.parse(options.reportAfter)
        id2 = reportAfter.id
        this.setData({
          reportAfter: reportAfter,
          reportAfterJson: options.reportAfter
        })
      }
      if(options.do == 1){
        this.compareReport(id1,id2)
      }
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
        // that.getVersionUpdateInfo()
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
      this.getUserProfile()
    }else if(index == 2){
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
    if(index > 0){
      if(!app.getUser()){
        wx.navigateTo({
          url: '../login/login',
        })
      }
    }
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
    let method = "UserAPI.GetAndroidUpdateInfo"
    if(app.globalData.isIos){
      method = "UserAPI.GetIOSUpdateInfo"
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
          if(app.globalData.isIos){
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
    if(app.gethasGuide() == 1 || this.data.userProfile.is_profile_completed){
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
                deviceConnected: app.getLastDevice(),
                deviceConnectedJson: JSON.stringify(app.getLastDevice())
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
        if(res.errMsg.toString().indexOf("already connect") != -1){
          that.setData({
            connectStatus: 1,
            deviceConnected: app.getLastDevice(),
            deviceConnectedJson: JSON.stringify(app.getLastDevice())
          })
        }else{
        }
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
              let lastCheckDate = res.data.last_report_time
              if(lastCheckDate.indexOf("今天") != -1){
                lastCheckDate = lastCheckDate.substring(2,lastCheckDate.length)
              }
              that.setData({
                lastCheckDate: lastCheckDate
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
  showDeviceGuide: function(e){
    this.setData({
      showDeviceGuide: true
    })
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
  
  openSelectReport: function(e){
    let reportBefore = this.data.reportBefore ? this.data.reportBefore : ""
    let reportAfter = this.data.reportAfter ? this.data.reportAfter : ""
    wx.navigateTo({
      url: '../eatright/select?ori=' + e.currentTarget.dataset.ori + "&reportBeforeJson=" + JSON.stringify(reportBefore) + "&reportAfterJson=" + JSON.stringify(reportAfter),
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
        console.log("userProfile",res)
        if(res.statusCode == 200){
          let userProfile = res.data.profile
          if(!(userProfile.nickname)){
            userProfile.nickname = '昵称未设置'
          }
          if(!(userProfile.avatar_url)){
            userProfile.avatar_url = that.data.imageAvatarDefault
          }
          let useHand = 1
          if(userProfile.hand == 'HAND_RIGHT'){
            useHand = 2
          }
          let nowDate = '1980-1-1'
          app.setUserProfile(userProfile)
          if(userProfile.birthday.year){
            nowDate = userProfile.birthday.year + '-' + userProfile.birthday.month + '-' + userProfile.birthday.day
          }
          if(userProfile.gender == "GENDER_FEMALE"){
            that.setData({
              heightIndex: 20,
              weightIndex: 15
            })
          }
          that.setData({
            userProfile: userProfile,
            useHand: useHand,
            nowDate: nowDate
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