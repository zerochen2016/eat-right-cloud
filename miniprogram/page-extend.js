const util = require("./utils/util")


/**
 *
 * Page扩展函数
 *
 * @param {*} Page 原生Page
 */
const pageExtend = Page => {
  return object => {
    // 导出原生Page传入的object参数中的生命周期函数
    // 由于命名冲突，所以将onLoad生命周期函数命名成了onLoaded
    const { onLoaded } = object

    // 公共的onLoad生命周期函数
    object.onLoad = function (options) {
      // 在onLoad中执行的代码
      //如果页面需要初始化数据，则执行
      const app = getApp()
      if(getCurrentPages()[0].route.indexOf('login') == -1){
        let user = app.getUser()
        if(!user||!user.id){
          wx.redirectTo({
            url: '../login/login',
          })
        }else{
          console.log('-----user----')
          console.log(user)
          this.setData({
            user: user
          })
        }
      }
      this.getWechatUserInfo(this)//微信授权信息   
      //初始化数据
      if(this.initData){
        this.initData()
      }
      
      this.setData({
        resourcesHost: app.globalData.resourcesHost
      })
      //允许分享按钮
      wx.showShareMenu({
        withShareTicket: true,
      })
      // 执行onLoaded生命周期函数
      if (typeof onLoaded === 'function') {
        onLoaded.call(this, options)
      }
    }

    // 公共的onShareAppMessage事件处理函数
    object.onShareAppMessage = () => {
      return{
        title: "健康生活 从吃开始",
        path: "/pages/home/home?shareid=" + app.getUser().id
      }
    }
    
    object.go = (e) => {
      var page = e.currentTarget.dataset.page;
      let paramsStr = '?page=' + page
      if(e.currentTarget.dataset){
        for (let [key, value] of Object.entries(e.currentTarget.dataset)) {
          if(key == 'page'){
            continue
          }
          paramsStr += '&' + key + '=' + value
        }
        console.log('go--' + paramsStr)
      }
      wx.navigateTo({
        url: '../' + page + '/' + page + paramsStr
      })
    }
    object.redirectTo = (e) => {
      var page = e.currentTarget.dataset.page;
      let paramsStr = '?page=' + page
      if(e.currentTarget.dataset){
        for (let [key, value] of Object.entries(e.currentTarget.dataset)) {
          if(key == 'page'){
            continue
          }
          paramsStr += '&' + key + '=' + value
        }
      }
      wx.redirectTo({
        url: '../' + page + '/' + page + paramsStr
      })
    }
    object.goThirdWeb = (e) => {
      var thirdUrl = e.currentTarget.dataset.url;
      wx.navigateTo({
        url: '../third-webview/third-webview?thirdUrl=' + thirdUrl,
      })
    }
    object.loginout = (e) => {
      wx.clearStorageSync()
      getApp().updateRequestSign('')
      wx.redirectTo({
        url: '../login/login',
      })
    }
    object.getWechatUserInfo = (that) =>{
      
      // 获取用户信息，
      // 1. 已经授权获取手机号的去主页
      // 2. 已经授权未获取手机号的去登录页
      // 3. 未授权的去登录页面
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: res => {
                const userInfo = res.userInfo
                let gender =
                that.setData({
                  avatarUrl: userInfo.avatarUrl,
                  nickName: userInfo.nickName,
                  gender: userInfo.gender == 1 ? '男' : '女',
                  country: userInfo.country,
                  province: userInfo.province,
                  city: userInfo.city,
                  language: userInfo.language
                })
              }
            })
          }
        }
      })
    }
    return Page(object)
  }
}

// 获取原生Page
const originalPage = Page
// 定义一个新的Page，将原生Page传入Page扩展函数
Page = pageExtend(originalPage)
