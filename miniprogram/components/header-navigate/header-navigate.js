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
    title: "",
    height: 0,
    lineHeight: 0,
    imageBack: app.globalData.resourcesHost + 'nav/back@2x.png',
    imageHeight: 0,
    imageTop: 0,
    showAll: false,
    arrowNotBack: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    back: function(e){wx.navigateBack({delta: 0,})
    },
    showAll: function(title){
      this.setData({showAll: true,title: title})
    },
    showAllFalse: function(){
      this.setData({showAll: false,arrowNotBack: false})
    },
    arrowNotBack: function(){
      this.setData({
        arrowNotBack: true,
        showAll: true
      })
    },

    clickArrow: function(e){
      let item = {clickArrow: true}//要传给父组件的参数
      this.triggerEvent('clickArrow',item)//通过triggerEvent将参数传给父组件
    },
    setTitle: function(title){
      this.setData({title: title})
    },
    showText: function(){
      console.log("显示文字")
      let that = this
      let animation = wx.createAnimation({
        duration: 200,
        timingFunction: 'linear'
      })
      that.animation = animation
      animation.opacity(0).step({duration: 200})
      that.setData({
        animationData2: animation.export()
      })
      setTimeout(function () {
        animation.opacity(1).step();
        that.setData({
            animationData2: animation.export(),
        })
      }, 200)
    },
    hideText: function(){
      console.log("消失文字")
      var that = this;
      var animation = wx.createAnimation({
          duration: 200,
          timingFunction: 'linear'
      })
      that.animation = animation
      animation.opacity(1).step({ duration: 200 })
      that.setData({
          animationData2: animation.export()
      })
      setTimeout(function () {
          animation.opacity(0).step();
          that.setData({
              animationData2: animation.export()
          })
      }, 200)
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
          let height = menuInfo.top + menuInfo.bottom - result.statusBarHeight
          let lineHeight = menuInfo.top + menuInfo.bottom
          let imageHeight = parseInt(height / 4)
          that.setData({
            height: height,
            lineHeight: lineHeight,
            imageHeight: imageHeight,
            imageTop: (lineHeight - imageHeight) / 2
          })          
        },
      })

    },
    
  },
})
