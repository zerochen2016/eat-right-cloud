const util = require("../../utils/util.js")
const app = getApp()
let verifyCodeLock = 0
let checkVerifyLock = 0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    step: 2,
    inputMobile: "",
    nextStyle: false,
    areaCode: '+86',
    verifyCode: '667765',
    verifyCode1: null,
    verifyCode2: null,
    verifyCode3: null,
    verifyCode4: null,
    verifyCode5: null,
    verifyCode6: null,
    countDown: 120,
    countDownText: "重新发送",
    verifyStyle: false,
    focus1: 1,
    focus2: 0,
    focus3: 0,
    focus4: 0,
    focus5: 0,
    focus6: 0,
    password1: '',
    password2: '',
    tips: '密码必须至少8个字符，而且同时包含字母和数字。'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoaded: function (options) {
    //从修改密码的忘记密码进入
    if(options.mobile){
      this.setData({
        inputMobile: options.mobile,
        nextStyle: true
      })
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

  mobileChange: function(e){
    var value = e.detail.value
    if(!util.isPositiveInteger(value)){
      if(value){
        value = value.substring(0, value.length-1)        
      }
      
    }
    this.setData({
      inputMobile: value
    })
    this.checkButtonStyle(1)
  },
  checkButtonStyle: function(step){
    if(step == 1){
      if(util.isMobile(this.data.inputMobile)){
        this.setData({
          nextStyle: true
        })
      }else{
        this.setData({
          nextStyle: false
        })
      }
    }else if(step == 2){
      if(!util.isAnyEmpty(this.data.verifyCode1, this.data.verifyCode2, this.data.verifyCode3, this.data.verifyCode4,this.data.verifyCode5,this.data.verifyCode6)){
        this.setData({
          nextStyle: true
        })
      }else{
        this.setData({
          nextStyle: false
        })
      }
    }else if(step == 3){
      
      if(this.data.password1.length > 7 && this.data.password2.length > 7){
        this.setData({
          nextStyle: true
        })
      }else{
        this.setData({
          nextStyle: false
        })
      }
    }

  },
  areaCodeChange: function(e){
    console.log(e.detail)
    this.setData({
      areaCode: e.detail.areaCode
    })
  },
  nextStep: function(e){
    let that = this
    const step = e.currentTarget.dataset.step
    if(step == 1){
      if(this.data.inputMobile){
        this.setData({
          step: 2,
          nextStyle: false
        })
        this.getVerifyCode()
      }
    }else if(step == 2){
      let verifyCode =  that.data.verifyCode1 + that.data.verifyCode2 + that.data.verifyCode3 + that.data.verifyCode4 + that.data.verifyCode5 + that.data.verifyCode6
      if(!util.isEmpty(verifyCode) && verifyCode.length == 6 && checkVerifyLock == 0){
        this.setData({
          step: 3,
          nextStyle: false,
          verifyCode: verifyCode
        })
      }
    }else if(step == 3){
      if(this.data.password1.length > 7 && this.data.password2.length > 7){
        if(this.data.password1 == this.data.password2){
          if(util.hasNumberAndLetter(this.data.password1) && util.hasNumberAndLetter(this.data.password2)){
            if(checkVerifyLock == 0){
              checkVerifyLock == 1
              wx.request({
                url: app.globalData.apiHost, 
                data: 
                JSON.stringify({
                  "method": "UserAPI.ResetPasswordByPhone",
                  "service": "com.jt-health.api.app",
                  "request": {
                   "phone": that.data.inputMobile,
                   "nation_code": that.data.areaCode,
                   "sms_verification_code": that.data.verifyCode,
                   "plain_password": that.data.password1
                  }
                  
                 }),
                dataType: 'json',
                method: "POST",
                header: {
                  'content-type': 'application/json',
                  "Accept-Language": "zh-Hans",
                  "Authorization": 'Bearer ' + app.getRequestSign()
                },
                success(res) {
                  console.log(res)
                  if(res.statusCode == 200){
                    wx.showModal({
                      title: "温馨提示",
                      content: "重置成功",
                      showCancel: false,
                      success: function(res){
                        console.log(res)
                        if(res.confirm){
                          wx.redirectTo({
                            url: '../login-password/login-password',
                          })
                        }
                      }
                    })
                  }else{
                    wx.showModal({
                      title: "温馨提示",
                      content: "验证码错误",
                      showCancel: false,
                      success: function(res){
                        console.log(res)
                        if(res.confirm){
                          that.setData({
                            step: 2,
                            verifyCode1: null,
                            verifyCode2: null,
                            verifyCode3: null,
                            verifyCode4: null,
                            verifyCode5: null,
                            verifyCode6: null,
                            focus1: 1,
                            focus2: 0,
                            focus3: 0,
                            focus4: 0,
                            focus5: 0,
                            focus6: 0,
                            nextStyle: false
                          })
                        }
                      }
                    })

                  }
                
                },
              })       
              checkVerifyLock = 0
            }
          }else{
            app.alert("温馨提示","密码需同时包含字母和数字")
          }
        }else{
          app.alert("温馨提示","两次输入密码不一致")
        }
      }
    }

  },

  inputFocus: function(e) {
    const id = e.currentTarget.id
    if('input1' == id){
      this.setData({
        focus1: 1,
        focus2: 0,
        focus3: 0,
        focus4: 0,
        focus5: 0,
        focus6: 0

      })
    }
    if('input2' == id){
      this.setData({
        focus1: 0,
        focus2: 1,
        focus3: 0,
        focus4: 0,
        focus5: 0,
        focus6: 0
      }) 
    }
    if('input3' == id){
      this.setData({
        focus1: 0,
        focus2: 0,
        focus3: 1,
        focus4: 0,
        focus5: 0,
        focus6: 0
      })   
    }
    if('input4' == id){
      this.setData({
        focus1: 0,
        focus2: 0,
        focus3: 0,
        focus4: 1,
        focus5: 0,
        focus6: 0
      })
    }
    if('input5' == id){
      this.setData({
        focus1: 0,
        focus2: 0,
        focus3: 0,
        focus4: 0,
        focus5: 1,
        focus6: 0
      })
    }
    if('input6' == id){
      this.setData({
        focus1: 0,
        focus2: 0,
        focus3: 0,
        focus4: 0,
        focus5: 0,
        focus6: 1
      })
    }
  },
  verifyCodeChange: function(e){
    var value = e.detail.value
    const id = e.currentTarget.id
    if(!util.isPositiveInteger(value)){
      if(value){
        value = value.substring(0, value.length-1)        
      }
    }
    if('input1' == id){
      this.setData({
        verifyCode1: value
      })
      if(!util.isEmpty(value)){
        this.setData({
          focus1: 0,
          focus2: 1,
          focus3: 0,
          focus4: 0,
          focus5: 0,
          focus6: 0
        })
      }
    }
    if('input2' == id){
      this.setData({
        verifyCode2: value
      })
      if(!util.isEmpty(value)){
        this.setData({
          focus1: 0,
          focus2: 0,
          focus3: 1,
          focus4: 0,
          focus5: 0,
          focus6: 0
        })
      }      
    }
    if('input3' == id){
      this.setData({
        verifyCode3: value
      })
      if(!util.isEmpty(value)){
        this.setData({
          focus1: 0,
          focus2: 0,
          focus3: 0,
          focus4: 1,
          focus5: 0,
          focus6: 0
        })
      }      
    }
    if('input4' == id){
      this.setData({
        verifyCode4: value
      })
      if(!util.isEmpty(value)){
        this.setData({
          focus1: 0,
          focus2: 0,
          focus3: 0,
          focus4: 0,
          focus5: 1,
          focus6: 0
        })
      }      
    }
    if('input5' == id){
      this.setData({
        verifyCode5: value
      })
      if(!util.isEmpty(value)){
        this.setData({
          focus1: 0,
          focus2: 0,
          focus3: 0,
          focus4: 0,
          focus5: 0,
          focus6: 1
        })
      }      
    }
    if('input6' == id){
      this.setData({
        verifyCode6: value
      })
    }
    this.checkButtonStyle(2)
  },
  getVerifyCode: function(){
    var that = this
    if(verifyCodeLock == 0){
      verifyCodeLock = 1
      wx.request({
        url: app.globalData.apiHost, 
        data: 
        JSON.stringify({
          "method": "SmsAPI.SendVerificationCode",
          "service": "com.jt-health.api.app",
          "request": {
           "phone": that.data.inputMobile,
           "template_action": "TEMPLATE_ACTION_RESET_PASSWORD",
           "nation_code": that.data.areaCode,
           "language": "LANGUAGE_SIMPLIFIED_CHINESE"
          }
          
         }),
        dataType: 'json',
        method: "POST",
        header: {
          'content-type': 'application/json',
          "Accept-Language": "zh-Hans",
          "Authorization": 'Bearer ' + app.getRequestSign()
        },
        success(res) {
          if(res.statusCode == 200){
            console.log('----request success---')
            console.log(res.data)
          }
        
        }
      })
      verifyCodeLock = 0
      //执行倒计时
      this.doCountDown()
    }
  },
  doCountDown: function(){
    if(this.data.countDown > 0){
      var countDown = this.data.countDown - 1;
      this.setData({
        countDownText:  countDown + "秒后可点此重新发送",
        countDown: countDown,
        verifyStyle: false
      })
      setTimeout(this.doCountDown, 1000);
    }else{
      this.setData({
        countDownText: '重新发送',
        countDown: 120,
        verifyStyle: true,
      })
    }
  },
  passwordChange: function(e){
    const id = e.currentTarget.id
    if('password1' == id){
      this.setData({
        password1: e.detail.value
      })
    }
    if('password2' == id){
      this.setData({
        password2: e.detail.value
      })
    }
    this.checkButtonStyle(3)
  },
})