// pages/components/wechatSubscription/wechatSubscription.js
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

  },

  /**
   * 组件的方法列表
   */
  methods: {
    goThirdWeb: function(e){
      var thirdUrl = e.currentTarget.dataset.url;
      console.log(e)
      wx.navigateTo({
        url: '../third-webview/third-webview?thirdUrl=' + thirdUrl,
      })
    },
  }
})
