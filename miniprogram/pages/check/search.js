const app = getApp()
let changeDotsNumberInterval = null//... 0，2，3
let changePointAngerInterval = null//搜索扫描0
let searchBluetoothInterval = null//搜索蓝牙
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dots: '',
    devices: [{
      name: 'd',
      deviceId: 'p',
      advertisServiceUUIDs: ['dd','dd','dd']
    }],
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
    this.changePointAnger()
    this.searchBluetooth()
    this.changeDotsNumber()
    this.selectComponent("#header").setTitle("检测")
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
    this.clearAnyTimeInterval(changeDotsNumberInterval,changePointAngerInterval,searchBluetoothInterval)
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
                        wx.reLaunch({
                          url: '../check/check'
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
      characteristics: []
    }
    app.setLastDevice(device)
    wx.reLaunch({
      url: '../check/check',
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
  onPageScroll(e){
    console.log(e.scrollTop)
    console.log(this.data.scrollTop)
    if(this.data.scrollTop < e.scrollTop){
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