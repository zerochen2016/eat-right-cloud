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
      const route = getCurrentPages()[0].route
      console.log("-----route-----")
      console.log(route)
      if(route.indexOf('login') == -1 && route.indexOf('third-webview/third-webview') == -1 && route.indexOf('setup/setup') == -1){
        let user = app.getUser()
        if(!user||!user.id){
          wx.redirectTo({
            url: '../login/login',
          })
        }else{
          this.setData({
            user: user
          })
        }
      }

      this.setData({
        scrollTop: 0,
        showTitle: false
      })

      this.getWechatUserInfo(this)//微信授权信息   
      let userProfile = app.getUserProfile()

      this.setData({
        userProfile: userProfile
      })
      //允许分享按钮
      wx.showShareMenu({
        withShareTicket: true,
      })
      // 执行onLoaded生命周期函数
      if (typeof onLoaded === 'function') {
        onLoaded.call(this, options)
      }
      //顶部导航高度
      let menuInfo = wx.getMenuButtonBoundingClientRect()
      wx.getSystemInfo({
        success: (result) => {
          console.log(result)
          let pixelRatio = result.pixelRatio
          let statusHeight = menuInfo.top + menuInfo.bottom - result.statusBarHeight
          this.setData({
            statusHeight: statusHeight + 20,
            titleHeight: statusHeight + 80
          })          
        },
      })
    }
    
    // 公共的onShareAppMessage事件处理函数
    object.onShareAppMessage = () => {
      return{
        title: "健康生活 从吃开始",
        path: "/pages/home/home?shareid=" + getApp().getUser().id
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
      }
      wx.navigateTo({
        url: '../' + page + '/' + page + paramsStr
      })
    }
    object.nTo = (e) => {
      var path = e.currentTarget.dataset.path;
      let paramsStr = '?nTo=1'
      if(e.currentTarget.dataset){
        for (let [key, value] of Object.entries(e.currentTarget.dataset)) {
          if(key == 'path'){
            continue
          }
          paramsStr += '&' + key + '=' + value
        }
        console.log('go--' + paramsStr)
      }
      wx.navigateTo({
        url: '../' + path + paramsStr
      })
    }
    object.rTo = (e) => {
      var path = e.currentTarget.dataset.path;
      let paramsStr = '?rTo=1'
      if(e.currentTarget.dataset){
        for (let [key, value] of Object.entries(e.currentTarget.dataset)) {
          if(key == 'path'){
            continue
          }
          paramsStr += '&' + key + '=' + value
        }
      }
      wx.redirectTo({
        url: '../' + path + paramsStr
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
    object.reLaTo = (e) => {
      var path = e.currentTarget.dataset.path;
      let paramsStr = '?reLaTo=1'
      if(e.currentTarget.dataset){
        for (let [key, value] of Object.entries(e.currentTarget.dataset)) {
          if(key == 'path'){
            continue
          }
          paramsStr += '&' + key + '=' + value
        }
      }
      wx.redirectTo({
        url: '../' + path + paramsStr
      })
    }
    object.goThirdWeb = (e) => {
      var thirdUrl = e.currentTarget.dataset.url;
      wx.navigateTo({
        url: '../third-webview/third-webview?thirdUrl=' + thirdUrl,
      })
    }

    object.toYouzan = (e) => {
      console.log(e)
      wx.navigateToMiniProgram({
        appId: 'wx6deb54e571e86e3c',
        path: 'packages/goods/detail/index?alias=' + e.currentTarget.dataset.alias + '&shopAutoEnter=1',
        extraData: {},
        envVersion: 'release',
        success(res) {
          // 打开成功
          console.log('navigateToMiniProgram youzan')
        }
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
