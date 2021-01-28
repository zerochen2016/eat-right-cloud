const app = getApp()
var startX, endX;
var moveFlag = true;// 判断执行滑动事件
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeIndex: 0,
    showChoose: 0,
    imageMore: app.globalData.resourcesHost + 'more@2x.png',
    imageCancel: app.globalData.resourcesHost + 'cancel@2x.png',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoaded: function (options) {
    var that = this
    console.log(options)
    this.selectComponent("#header").setTitle(options.title)
    this.listEntryMenus(options.id)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  scroll(e) {
    
  },
  changeSpecial: function(e){
    const index = e.currentTarget.id
    const currentMenuId = e.currentTarget.dataset.id
    this.setData({
      activeIndex: index,
      showChoose: 0,
      currentMenuId: currentMenuId
    },this.listEntryPages(currentMenuId,1))
    
  },
  chooseSpecial: function(e){
    this.setData({
      showChoose: e.currentTarget.dataset.type
    })
  },
  //页面左右滑动start
  touchStart: function (e) {
    startX = e.touches[0].pageX; // 获取触摸时的原点
    moveFlag = true;
  },
  // 触摸移动事件
  touchMove: function (e) {
    endX = e.touches[0].pageX; // 获取触摸时的原点
    if (moveFlag) {
      if (endX - startX > 50) {
        this.move2right();
        moveFlag = false;
      }
      if (startX - endX > 50) {
        this.move2left();
        moveFlag = false;
      }
    }
  },
  // 触摸结束事件
  touchEnd: function (e) {
    moveFlag = true; // 回复滑动事件
  },
  move2left() {
    var that = this;
    console.log("页面左滑")
    this.slideSpecial(0)
  },
  move2right() {
    var that = this;
    console.log("页面右滑")
    this.slideSpecial(1)
  },  
  slideSpecial: function(direct){
    var that = this
    if(direct == 0 && that.data.activeIndex > 0){
      const currentActiveIndex = that.data.activeIndex - 1
      const currentMenuId = that.data.menus[currentActiveIndex].menu_id
      this.setData({
        activeIndex: currentActiveIndex,
        currentMenuId: currentMenuId,
        showChoose: 0
      },this.listEntryPages(currentMenuId,1))
    }
    if(direct == 1 && (that.data.activeIndex + 1) < that.data.menus.length){
      const currentActiveIndex = that.data.activeIndex + 1
      const currentMenuId = that.data.menus[currentActiveIndex].menu_id
      this.setData({
        activeIndex: currentActiveIndex,
        currentMenuId: currentMenuId,
        showChoose: 0
      },this.listEntryPages(currentMenuId,1))
    }
    
  },
  //页面左右滑动end
  /**
   * 菜单内容
   */
  listEntryMenus: function(channelId){
    const that = this
    wx.request({
      url: app.globalData.apiHost, 
      data: 
      JSON.stringify({
        "method": "MarketingAPI.ListEntryMenus",
        "service": "com.jt-health.api.app",
        "request": {
          "channel_id": channelId,
        }
       }),
      dataType: 'json',
      method: "POST",
      header: {
        'content-type': 'application/json',
        "Authorization": 'Bearer ' + app.getRequestSign()
      },
      success(res) {
        console.log(res)
        if(res.statusCode == 200){
          if(res.data.entry_menus){
            that.setData({
              menus: res.data.entry_menus,
              currentMenuId: res.data.entry_menus[0].menu_id
            },that.listEntryPages(res.data.entry_menus[0].menu_id,1))
            
          }
        }
        
      },
    })     
  },
  /**
   * 文章
   */
  listEntryPages: function(menuId,page){
    const that = this
    wx.request({
      url: app.globalData.apiHost, 
      data: 
      JSON.stringify({
        "method": "MarketingAPI.ListEntryPages",
        "service": "com.jt-health.api.app",
        "request": {
          "menu_id": menuId,
          "pagination": {
            offset: page,
            size: 20
          }
        }
       }),
      dataType: 'json',
      method: "POST",
      header: {
        'content-type': 'application/json',
        "Authorization": 'Bearer ' + app.getRequestSign()
      },
      success(res) {
        console.log(res)
        if(res.statusCode == 200){
          if(res.data.entry_pages){
            that.setData({
              articles: res.data.entry_pages
            })
          }else{
            that.setData({
              articles: []
            })
          }
        }
        
      },
    })     
  },
  onPageScroll(e){
    console.log(e.scrollTop)
    console.log(this.data.scrollTop)
    if(this.data.scrollTop < e.scrollTop){
      console.log("页面上滑")
      if(!(this.data.showTitle)){
        //调用显示动画
        this.selectComponent("#header").show()
        this.setData({
          showTitle: true
        })
      }
    }else{
      console.log("页面下滑")
      if((this.data.showTitle)){
        //调用消失动画
        this.selectComponent("#header").hide()
        this.setData({
          showTitle: false
        })
      }
    }
    this.setData({
      scrollTop: e.scrollTop
    })
  },
})