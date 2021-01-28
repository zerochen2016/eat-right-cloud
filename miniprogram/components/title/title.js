// components/title/title.js
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
    title: ""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    setTitle: function(title){
      this.setData({
        title: title
      })
    }
  },
  lifetimes: {
    attached: function() {
      let that = this
      // 在组件实例进入页面节点树时执行
      console.log()
      let menuInfo = wx.getMenuButtonBoundingClientRect()
      wx.getSystemInfo({
        success: (result) => {
          console.log(result)
          let pixelRatio = result.pixelRatio
          // that.setData({height:result.statusBarHeight})          
          that.setData({
            top: menuInfo.top + menuInfo.bottom - result.statusBarHeight + 20,
          })          
        },
      })

    },
    
  },
})
