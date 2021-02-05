const app = getApp()
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    activeIndex: {
      type: Number,
      value: 0
    }  
  },

  /**
   * 组件的初始数据
   */
  data: {
    navData: [{
      title: '探索',
      icon: app.globalData.resourcesHost + 'nav/home-grey@2x.png',
      iconed: app.globalData.resourcesHost + 'nav/home@2x.png',
      page: 'home'
    },
    {
      title: '检测',
      icon: app.globalData.resourcesHost + 'nav/check-grey@2x.png',
      iconed: app.globalData.resourcesHost + 'nav/check@2x.png',
      page: 'check'
    },
    {
      title: '',
      icon: app.globalData.resourcesHost + 'nav/eatright-grey@2x-c.png',
      iconed: app.globalData.resourcesHost + 'nav/eatright@2x-c.png',
      page: 'eatright'
    },
    {
      title: '报告',
      icon: app.globalData.resourcesHost + 'nav/report-grey@2x.png',
      iconed: app.globalData.resourcesHost + 'nav/report@2x.png',
      page: 'report'
    },
    {
      title: '我的',
      icon: app.globalData.resourcesHost + 'nav/my-grey@2x.png',
      iconed: app.globalData.resourcesHost + 'nav/my@2x.png',
      page: 'my'
    }
  ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // redirectTo: function (e) {
    //   var page = e.currentTarget.dataset.page;
    //   wx.navigateTo({
    //     url: '../' + page + '/' + page
    //   })
      
    // },  
    setActiveIndex: function(index){
      this.setData({
        activeIndex: index
      })
      let item = {activeIndex: index}//要传给父组件的参数
      this.triggerEvent('changeActiveIndex',item)//通过triggerEvent将参数传给父组件
    },
    changeActiveIndex: function(e){
      let index = e.currentTarget.dataset.index
      this.setData({
        activeIndex: index
      })
      let item = {activeIndex: index}//要传给父组件的参数
      this.triggerEvent('changeActiveIndex',item)//通过triggerEvent将参数传给父组件
    }
  }
})
