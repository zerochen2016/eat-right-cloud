const app = getApp()
const dateUtil = require("../../utils/date-util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    heightArray: ['140CM', '141CM', '142CM', '143CM', '144CM', '145CM', '146CM', '147CM', '148CM', '149CM', '150CM', '151CM', '152CM', '153CM', '154CM', '155CM', '156CM', '157CM', '158CM', '159CM', '160CM', '161CM', '162CM', '163CM', '164CM', '165CM', '166CM', '167CM', '168CM', '169CM', '170CM', '171CM', '172CM', '173CM', '174CM', '175CM', '176CM', '177CM', '178CM', '179CM', '180CM', '181CM', '182CM', '183CM', '184CM', '185CM', '186CM', '187CM', '188CM', '189CM', '190CM', '191CM', '192CM', '193CM', '194CM', '195CM', '196CM', '197CM', '198CM', '199CM', '200CM', '201CM', '202CM', '203CM', '204CM', '205CM', '206CM', '207CM', '208CM', '209CM', '210CM', '211CM', '212CM', '213CM', '214CM', '215CM', '216CM', '217CM', '218CM', '219CM', '220CM', '221CM', '222CM', '223CM', '224CM', '225CM', '226CM', '227CM', '228CM', '229CM', '230CM'],
    heightIndex: 20,
    weightArray: ['35KG', '36KG', '37KG', '38KG', '39KG', '40KG', '41KG', '42KG', '43KG', '44KG', '45KG', '46KG', '47KG', '48KG', '49KG', '50KG', '51KG', '52KG', '53KG', '54KG', '55KG', '56KG', '57KG', '58KG', '59KG', '60KG', '61KG', '62KG', '63KG', '64KG', '65KG', '66KG', '67KG', '68KG', '69KG', '70KG', '71KG', '72KG', '73KG', '74KG', '75KG', '76KG', '77KG', '78KG', '79KG', '80KG', '81KG', '82KG', '83KG', '84KG', '85KG', '86KG', '87KG', '88KG', '89KG', '90KG', '91KG', '92KG', '93KG', '94KG', '95KG', '96KG', '97KG', '98KG', '99KG', '100KG', '101KG', '102KG', '103KG', '104KG', '105KG', '106KG', '107KG', '108KG', '109KG', '110KG', '111KG', '112KG', '113KG', '114KG', '115KG', '116KG', '117KG', '118KG', '119KG', '120KG', '121KG', '122KG', '123KG', '124KG', '125KG', '126KG', '127KG', '128KG', '129KG', '130KG', '131KG', '132KG', '133KG', '134KG', '135KG', '136KG', '137KG', '138KG', '139KG', '140KG', '141KG', '142KG', '143KG', '144KG', '145KG', '146KG', '147KG', '148KG', '149KG', '150KG'],
    weightIndex: 25,
    genderArr: ['男','女'],
    genderIndex: 0,
    imageRecommend: app.globalData.resourcesHost + 'my/recommend@3x.png'
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
    //获取用户档案信息
    this.getUserProfile()
    
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
  genderChange: function(e){
    console.log(e)
    const value = e.detail.value
    let userProfile = this.data.userProfile
    if(value == 0){
      userProfile.gender = 'GENDER_MALE'
    }else if(value == 1){
      userProfile.gender = 'GENDER_FEMALE'
    }
    this.setData({
      userProfile: userProfile
    },this.updateUserProfile(["gender"]))
  },
  handChange: function(e){
    console.log(e)
    const hand = e.currentTarget.dataset.hand
    if(hand){
      let userProfile = this.data.userProfile
      userProfile.hand = hand
      this.setData({
        userProfile: userProfile
      },this.updateUserProfile(["hand"]))
    }    
  },
  nicknameChange: function(e){
    let that = this
    let nickname = e.detail.value
    if(nickname){
      let userProfile = this.data.userProfile
      userProfile.nickname = nickname
      that.setData({
        userProfile: userProfile
      },this.updateUserProfile(["nickname"]))
    }    
  },
  weightChange: function(e){
    let weight = this.data.weightArray[e.detail.value]
    weight = weight.substring(0,weight.length-2)
    if(weight){
      let userProfile = this.data.userProfile
      userProfile.weight = weight
      this.setData({
        userProfile: userProfile
      },this.updateUserProfile(["weight"]))
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
      },this.updateUserProfile(["height"]))
    }    
  },
  birthdayChange: function(e){
    console.log(e)
    let birthdayArr = e.detail.value.split("-")
    let userProfile = this.data.userProfile
    userProfile.birthday.year = parseInt(birthdayArr[0])
    userProfile.birthday.month = parseInt(birthdayArr[1])
    userProfile.birthday.day = parseInt(birthdayArr[2])
    this.setData({
      userProfile: userProfile
    },this.updateUserProfile(['birthday']))
  },
  //TODO 上传图片
  chooseAvatar: function (e) {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        wx.showLoading({
          title: '上传中',
        })
        console.log(res)
        const filePath = res.tempFilePaths[0]
        
      },
      fail: e => {
        console.error(e)
      }
    })
  },
  updateUserProfile: function(paths){
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
         "update_mask": {paths: paths}
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
          }
        }

      },
    })  
  },
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
          let nowDate = new Date()
          if(userProfile.birthday.year){
            let dateStr = userProfile.birthday.year + '-' + userProfile.birthday.month + '-' + userProfile.birthday.day
            nowDate = new Date(dateStr)
          }
          that.setData({
            userProfile: userProfile,
            nowDate: nowDate
          })
        }

      },
    })     
  },
})