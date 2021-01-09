const app = getApp()
var startX, endX;
var moveFlag = true;// 判断执行滑动事件
Page({

  /**
   * 页面的初始数据
   */
  data: {
    specialId: null,
    articleArray: [],
    currentArticles: [],
    activeIndex: 0,
    showChoose: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoaded: function (options) {
    var that = this
    this.setData({
      specialId: options.id
    },function(){
      that.getSpecialData()
    })
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

  //TODO 专题数据API
  getSpecialData: function(){
    var that = this
      // wx.request({
      //   url: getApp().data.server + 'getSpecialData',
      //   data: {
      //     specialId: that.data.specialId 
      //   },
      //   dataType: 'json',
      //   header: {
      //     'content-type': 'application/x-www-form-urlencoded' 
      //   },
      //   method: 'POST',
      //   success: function (res) {
      //     if (res.statusCode == 200) {
      //       var result = res.data;
      //       console.info(result);
      //       if (result.code == 0) {
      //         wx.setNavigationBarTitle({
      //           title: '测试标题',
      //         })
      //         var articleArray = result.data
      //         var currentArticles = result.data[0].articles
      //         that.setData({
      //           articleArray: articleArray
      //         })
      //       } 
      //     } else {
      //       return;
      //     }
      //   },
      // })    
      //TODELETE 测试用数据
      wx.setNavigationBarTitle({
        title: '测试标题',
      })
      var articleArray = [
        {specialId: "specialId1", specialTitle: '测试数据1',
          articles: [
            {articleId: 'articleId1', articlePicture: '../../images/test/1.png', articleTitle: '吃巧克力能变聪明？还能促进脑血管修复？吃巧克力能变聪明？还能促进脑血管修复？', articleContent: '根据最近根据最近一项研究，科学家们指出…根据最近一项研究，根据最近一项研究，科学家们指出…根据最近一项研究，一项研究，科学家们指出…根据最近一项研究，科学家们指出…', articleUrl:'httpw://www.baidu.com'},
            {articleId: 'articleId2', articlePicture: '../../images/test/2.png', articleTitle: '吃巧克力能变聪明？还能促进脑血管修复？', articleContent: '根据最近一项研究，科学家们指出…根据最近一项研究，科学家们指出…', articleUrl:'httpw://www.baidu.com'},
            {articleId: 'articleId3', articlePicture: '../../images/test/3.png', articleTitle: '吃巧克力能变聪明？还能促进脑血管修复？', articleContent: '根据最近一项研究，科学家们指出…根据最近一项研究，根据最近一项研究，科学家们指出…根据最近一项研究，根据最近一项研究，科学家们指出…根据最近一项研究，科学家们指出…', articleUrl:'httpw://www.baidu.com'},
            {articleId: 'articleId1', articlePicture: '../../images/test/1.png', articleTitle: '吃巧克力能变聪明？还能促进脑血管修复？吃巧克力能变聪明？还能促进脑血管修复？', articleContent: '根据最近根据最近一项研究，科学家们指出…根据最近一项研究，根据最近一项研究，科学家们指出…根据最近一项研究，一项研究，科学家们指出…根据最近一项研究，科学家们指出…', articleUrl:'httpw://www.baidu.com'},
            {articleId: 'articleId2', articlePicture: '../../images/test/2.png', articleTitle: '吃巧克力能变聪明？还能促进脑血管修复？', articleContent: '根据最近一项研究，科学家们指出…根据最近一项研究，科学家们指出…', articleUrl:'httpw://www.baidu.com'},
            {articleId: 'articleId3', articlePicture: '../../images/test/3.png', articleTitle: '吃巧克力能变聪明？还能促进脑血管修复？', articleContent: '根据最近一项研究，科学家们指出…根据最近一项研究，根据最近一项研究，科学家们指出…根据最近一项研究，根据最近一项研究，科学家们指出…根据最近一项研究，科学家们指出…', articleUrl:'httpw://www.baidu.com'},
            {articleId: 'articleId1', articlePicture: '../../images/test/1.png', articleTitle: '吃巧克力能变聪明？还能促进脑血管修复？吃巧克力能变聪明？还能促进脑血管修复？', articleContent: '根据最近根据最近一项研究，科学家们指出…根据最近一项研究，根据最近一项研究，科学家们指出…根据最近一项研究，一项研究，科学家们指出…根据最近一项研究，科学家们指出…', articleUrl:'httpw://www.baidu.com'},
            {articleId: 'articleId2', articlePicture: '../../images/test/2.png', articleTitle: '吃巧克力能变聪明？还能促进脑血管修复？', articleContent: '根据最近一项研究，科学家们指出…根据最近一项研究，科学家们指出…', articleUrl:'httpw://www.baidu.com'},
            {articleId: 'articleId3', articlePicture: '../../images/test/3.png', articleTitle: '吃巧克力能变聪明？还能促进脑血管修复？', articleContent: '根据最近一项研究，科学家们指出…根据最近一项研究，根据最近一项研究，科学家们指出…根据最近一项研究，根据最近一项研究，科学家们指出…根据最近一项研究，科学家们指出…', articleUrl:'httpw://www.baidu.com'},            
          
        ]},
        {specialId: "specialId2", specialTitle: '测试数据2',
        articles: [
          {articleId: 'articleId2', articlePicture: '../../images/test/4.png', articleTitle: '吃巧克力能变聪s明dd？还能促进脑血管修复？', articleContent: '根据最近一项dd研究，科学家们指出…根据最近一项研究，科学家们指出…', articleUrl:'httpw://www.baidu.com'},
          {articleId: 'articleId2', articlePicture: '../../images/test/5.png', articleTitle: '吃巧克力能变ee聪明？还能促进脑血管修复？', articleContent: '根据最近一项研究，科学cck家们指出…根据最近一项研究，科学家们指出…', articleUrl:'httpw://www.baidu.com'},
          {articleId: 'articleId3', articlePicture: '../../images/test/6.png', articleTitle: '吃巧克力能变dd聪明？还能促进脑血管修复？', articleContent: '根据最近一项研究，科ss学c家们指出…根据最近一项研究，科学家们指出…', articleUrl:'httpw://www.baidu.com'},
          {articleId: 'articleId2', articlePicture: '../../images/test/4.png', articleTitle: '吃巧克力能变聪s明dd？还能促进脑血管修复？', articleContent: '根据最近一项dd研究，科学家们指出…根据最近一项研究，科学家们指出…', articleUrl:'httpw://www.baidu.com'},
          {articleId: 'articleId2', articlePicture: '../../images/test/5.png', articleTitle: '吃巧克力能变ee聪明？还能促进脑血管修复？', articleContent: '根据最近一项研究，科学cck家们指出…根据最近一项研究，科学家们指出…', articleUrl:'httpw://www.baidu.com'},
          {articleId: 'articleId3', articlePicture: '../../images/test/6.png', articleTitle: '吃巧克力能变dd聪明？还能促进脑血管修复？', articleContent: '根据最近一项研究，科ss学c家们指出…根据最近一项研究，科学家们指出…', articleUrl:'httpw://www.baidu.com'},
          {articleId: 'articleId2', articlePicture: '../../images/test/4.png', articleTitle: '吃巧克力能变聪s明dd？还能促进脑血管修复？', articleContent: '根据最近一项dd研究，科学家们指出…根据最近一项研究，科学家们指出…', articleUrl:'httpw://www.baidu.com'},
          {articleId: 'articleId2', articlePicture: '../../images/test/5.png', articleTitle: '吃巧克力能变ee聪明？还能促进脑血管修复？', articleContent: '根据最近一项研究，科学cck家们指出…根据最近一项研究，科学家们指出…', articleUrl:'httpw://www.baidu.com'},
          {articleId: 'articleId3', articlePicture: '../../images/test/6.png', articleTitle: '吃巧克力能变dd聪明？还能促进脑血管修复？', articleContent: '根据最近一项研究，科ss学c家们指出…根据最近一项研究，科学家们指出…', articleUrl:'httpw://www.baidu.com'},                    
        
      ]},
      {specialId: "specialId1", specialTitle: '测试数ddddddd据1',
      articles: [
        {articleId: 'articleId1', articlePicture: '../../images/test/1.png', articleTitle: '吃巧qq克力能变聪明？还能促进脑血管修复？', articleContent: '根据最近qq一项研究，科学家们指出…根据最近一项研究，科学家们指出…', articleUrl:'httpw://www.baidu.com'},
        {articleId: 'articleId2', articlePicture: '../images/test/2.png', articleTitle: '吃巧克力ww能变聪明？还能促进脑血管修复？', articleContent: '根q据最近一项研究，科学家们指出…根据最近一项研究，科学家们指出…', articleUrl:'httpw://www.baidu.com'},
        {articleId: 'articleId3', articlePicture: '../../images/test/3.png', articleTitle: '吃巧c克力能变聪明？还能促进脑血管修复？', articleContent: '根据最近一项b研究，科学家们指出…根据最近一项研究，科学家们指出…', articleUrl:'httpw://www.baidu.com'},
        {articleId: 'articleId1', articlePicture: '../../images/test/1.png', articleTitle: '吃巧qq克力能变聪明？还能促进脑血管修复？', articleContent: '根据最近qq一项研究，科学家们指出…根据最近一项研究，科学家们指出…', articleUrl:'httpw://www.baidu.com'},
        {articleId: 'articleId2', articlePicture: '../../images/test/2.png', articleTitle: '吃巧克力ww能变聪明？还能促进脑血管修复？', articleContent: '根q据最近一项研究，科学家们指出…根据最近一项研究，科学家们指出…', articleUrl:'httpw://www.baidu.com'},
        {articleId: 'articleId3', articlePicture: '../../images/test/3.png', articleTitle: '吃巧c克力能变聪明？还能促进脑血管修复？', articleContent: '根据最近一项b研究，科学家们指出…根据最近一项研究，科学家们指出…', articleUrl:'httpw://www.baidu.com'},
        {articleId: 'articleId1', articlePicture: '../../images/test/1.png', articleTitle: '吃巧qq克力能变聪明？还能促进脑血管修复？', articleContent: '根据最近qq一项研究，科学家们指出…根据最近一项研究，科学家们指出…', articleUrl:'httpw://www.baidu.com'},
        {articleId: 'articleId2', articlePicture: '../../images/test/2.png', articleTitle: '吃巧克力ww能变聪明？还能促进脑血管修复？', articleContent: '根q据最近一项研究，科学家们指出…根据最近一项研究，科学家们指出…', articleUrl:'httpw://www.baidu.com'},
        {articleId: 'articleId3', articlePicture: '../../images/test/3.png', articleTitle: '吃巧c克力能变聪明？还能促进脑血管修复？', articleContent: '根据最近一项b研究，科学家们指出…根据最近一项研究，科学家们指出…', articleUrl:'httpw://www.baidu.com'},
      
    ]},]
      var currentArticles = articleArray[0].articles
      console.log(currentArticles)
      that.setData({
        articleArray: articleArray,
        currentArticles: currentArticles
      })
  },
  scroll(e) {
    
  },
  changeSpecial: function(e){
    var index = e.currentTarget.id
    var currentArticles = this.data.articleArray[index].articles
    this.setData({
      activeIndex: index,
      currentArticles: currentArticles,
      showChoose: 0
    })
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
      this.setData({
        activeIndex: that.data.activeIndex - 1,
        currentArticles: that.data.articleArray[that.data.activeIndex - 1].articles,
        showChoose: 0
      })
    }
    if(direct == 1 && (that.data.activeIndex + 1) < that.data.articleArray.length){
      this.setData({
        activeIndex: that.data.activeIndex + 1,
        currentArticles: that.data.articleArray[that.data.activeIndex + 1].articles,
        showChoose: 0
      })
    }
  },
  //页面左右滑动end
})