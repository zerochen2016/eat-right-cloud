const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
  },

  /**
   * 组件的初始数据
   */
  data: {
    imageWechatSubscription: app.globalData.resourcesHost + 'wechatSubscription@2x.png',
    imageArrowWhite: app.globalData.resourcesHost + 'arrow-white@3x.png',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goThirdWeb: function(e){
      let thirdUrl = e.currentTarget.dataset.url;
      let title = e.currentTarget.dataset.title
      console.log(e)
      wx.navigateTo({
        url: '../third-webview/third-webview?thirdUrl=' + thirdUrl + '&title=' + title,
      })
    },
  }
})
