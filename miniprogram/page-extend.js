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
        if(!app.getUser()||!app.getUser().id){
          wx.redirectTo({
            url: '../login/login',
          })
          
        }
      }

      if(this.initData){
        this.initData()
      }
      if(app.getUser().avatarUrl){
        this.setData({
          avatarUrl: app.getUser().avatarUrl
        })
      }
      if(app.getUser().nickName){
        this.setData({
          nickName: app.getUser().nickName
        })
      }
      if(app.getUser().mobile){
        this.setData({
          mobile: app.getUser().mobile
        })
      }
      if(app.getUser().familyVipTime){
        this.setData({
          familyVipTime: '2022-11-30'
        })
      }
      if(app.getUser().familyVipRemaimDay){
        this.setData({
          familyVipRemaimDay: app.getUser().familyVipRemaimDay
        })
      }
      if(app.getUser().vipRemainDay){
        this.setData({
          vipRemainDay: vipRemainDay
        })
      }
      // //TODELETE 
      // this.setData({
      //   mobile: '13263784364',
      //   familyVipTime: '2022-11-30',
      //   familyVipRemaimDay: 0,
      //   vipRemainDay: 0
      // })
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
      // wx.clearStorageSync()
      wx.redirectTo({
        url: '../login/login',
      })
    }
    return Page(object)
  }
}

// 获取原生Page
const originalPage = Page
// 定义一个新的Page，将原生Page传入Page扩展函数
Page = pageExtend(originalPage)
