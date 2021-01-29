const app = getApp()
const util = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src:'',
    width:250,//宽度
    height: 250,//高度
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoaded: function (options) {
    console.log(options.filepath)
    //获取到image-cropper实例
    this.cropper = this.selectComponent("#image-cropper");
    //开始裁剪
    this.setData({
        src: options.filepath,
    });
    
  },
  cropperload: function(e){
    console.log("cropper初始化完成");
  },
  loadimage: function(e){
    console.log("图片加载完成",e.detail);
    wx.hideLoading();
    //重置图片角度、缩放、位置
    this.cropper.imgReset();
  },
  clickcut: function(e) {
    console.log(e.detail);
    //点击裁剪框阅览图片
    wx.previewImage({
        current: e.detail.url, // 当前显示图片的http链接
        urls: [e.detail.url] // 需要预览的图片http链接列表
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
    this.selectComponent("#header").showAll("上传头像")
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

  cutImg: function(e){
    let that = this
    console.log(e)
    this.selectComponent("#image-cropper").getImg(function(img){

      let filePath = img.url
      wx.showLoading({
        title: '上传中',
      })
      wx.getFileSystemManager().readFile({
        filePath: filePath,
        encoding: 'base64',
        success: res => {
          that.uploadAvatar(res.data)
        }
      })
    })
  },
  uploadAvatar: function(imageBase64){
    let that = this
    wx.request({
      url: app.globalData.apiHost, 
      data: 
      JSON.stringify({
        "method": "UserAPI.UploadAvatar",
        "service": "com.jt-health.api.app",
        "request": {
         "user_profile_id": app.getUser().id,
         "avatar": {
           "mime": "image/png",
           "image": imageBase64,
           "filename": util.randomLetterString(16)
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
          if(res.data.user_profile){
            app.setUserProfile(res.data.user_profile)
            that.setData({
              userProfile: res.data.user_profile
            },function(){
              wx.navigateTo({
                url: '../my/my-info',
              })
            })
          }
        }

      },
      complete(res){
        wx.hideLoading({
          success: (res) => {},
        })
      }
    })  
  }
})