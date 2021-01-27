// components/header-navigate/header-navigate.js
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
    title: "",
    height: 0,
    lineHeight: 0
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    setTitle: function(title){
      this.setData({title: title})
    },
    show: function(){
      console.log("显示")
      let that = this
      let animation = wx.createAnimation({
        duration: 200,
        timingFunction: 'linear'
      })
      that.animation = animation
      animation.opacity(0).step({duration: 200})
      that.setData({
        animationData: animation.export()
      })
      setTimeout(function () {
        animation.opacity(1).step();
        that.setData({
            animationData: animation.export(),
        })
      }, 200)
    },
    hide: function(){
      console.log("消失")
      var that = this;
      var animation = wx.createAnimation({
          duration: 200,
          timingFunction: 'linear'
      })
      that.animation = animation
      animation.opacity(1).step({ duration: 200 })
      that.setData({
          animationData: animation.export()
      })
      setTimeout(function () {
          animation.opacity(0).step();
          that.setData({
              animationData: animation.export()
          })
      }, 200)
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
            height: menuInfo.top + menuInfo.bottom - result.statusBarHeight,
            lineHeight: menuInfo.top + menuInfo.bottom
          })          
        },
      })

    },
    
  },
})