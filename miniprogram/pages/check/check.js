const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    heightArray: ['140CM', '141CM', '142CM', '143CM', '144CM', '145CM', '146CM', '147CM', '148CM', '149CM', '150CM', '151CM', '152CM', '153CM', '154CM', '155CM', '156CM', '157CM', '158CM', '159CM', '160CM', '161CM', '162CM', '163CM', '164CM', '165CM', '166CM', '167CM', '168CM', '169CM', '170CM', '171CM', '172CM', '173CM', '174CM', '175CM', '176CM', '177CM', '178CM', '179CM', '180CM', '181CM', '182CM', '183CM', '184CM', '185CM', '186CM', '187CM', '188CM', '189CM', '190CM', '191CM', '192CM', '193CM', '194CM', '195CM', '196CM', '197CM', '198CM', '199CM', '200CM', '201CM', '202CM', '203CM', '204CM', '205CM', '206CM', '207CM', '208CM', '209CM', '210CM', '211CM', '212CM', '213CM', '214CM', '215CM', '216CM', '217CM', '218CM', '219CM', '220CM', '221CM', '222CM', '223CM', '224CM', '225CM', '226CM', '227CM', '228CM', '229CM', '230CM'],
    heightIndex: 30,
    weightArray: ['35KG', '36KG', '37KG', '38KG', '39KG', '40KG', '41KG', '42KG', '43KG', '44KG', '45KG', '46KG', '47KG', '48KG', '49KG', '50KG', '51KG', '52KG', '53KG', '54KG', '55KG', '56KG', '57KG', '58KG', '59KG', '60KG', '61KG', '62KG', '63KG', '64KG', '65KG', '66KG', '67KG', '68KG', '69KG', '70KG', '71KG', '72KG', '73KG', '74KG', '75KG', '76KG', '77KG', '78KG', '79KG', '80KG', '81KG', '82KG', '83KG', '84KG', '85KG', '86KG', '87KG', '88KG', '89KG', '90KG', '91KG', '92KG', '93KG', '94KG', '95KG', '96KG', '97KG', '98KG', '99KG', '100KG', '101KG', '102KG', '103KG', '104KG', '105KG', '106KG', '107KG', '108KG', '109KG', '110KG', '111KG', '112KG', '113KG', '114KG', '115KG', '116KG', '117KG', '118KG', '119KG', '120KG', '121KG', '122KG', '123KG', '124KG', '125KG', '126KG', '127KG', '128KG', '129KG', '130KG', '131KG', '132KG', '133KG', '134KG', '135KG', '136KG', '137KG', '138KG', '139KG', '140KG', '141KG', '142KG', '143KG', '144KG', '145KG', '146KG', '147KG', '148KG', '149KG', '150KG'],
    weightIndex: 25,
    activeIndex: 1,
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
    step2: 0
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
    this.getLastReport()
    //底部导航选中
    this.selectComponent("#bottom-navigate").changeActiveIndex(1)
    this.checkHasGuide()
    //标题
    this.selectComponent("#header").setTitle("检测")
  },
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
    console.log(e)
    let hand = e.currentTarget.dataset.hand
    let userProfile = this.data.userProfile
    userProfile.hand = hand
    this.setData({
      userProfile: userProfile
    })
  },
  weightChange: function(e){
    console.log(e)
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
    console.log(e)
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
          console.log(gender)
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
    console.log(e)
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
    console.log(that.data.userProfile)
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
