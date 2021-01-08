// pages/components/bottom-navigate/bottom-navigate.js
Component({
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
      icon: '../../images/nav/home-grey@2x.png',
      iconed: '../../images/nav/home@2x.png',
      page: 'home'
    },
    {
      title: '检测',
      icon: '../../images/nav/check-grey@2x.png',
      iconed: '../../images/nav/check@2x.png',
      page: 'check'
    },
    {
      title: '',
      icon: '../../images/nav/eatright-grey@2x-c.png',
      iconed: '../../images/nav/eatright@2x-c.png',
      page: 'eatright'
    },
    {
      title: '报告',
      icon: '../../images/nav/report-grey@2x.png',
      iconed: '../../images/nav/report@2x.png',
      page: 'report'
    },
    {
      title: '我的',
      icon: '../../images/nav/my-grey@2x.png',
      iconed: '../../images/nav/my@2x.png',
      page: 'my'
    }
  ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    redirectTo: function (e) {
      var page = e.currentTarget.dataset.page;
      wx.redirectTo({
        url: '../' + page + '/' + page
      })
    },  
    changeActiveIndex: function(activeIndex){
      this.setData({
        activeIndex: activeIndex
      })
    }
  }
})
