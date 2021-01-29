const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showSelect: false,
    imageCompareArrowUp: app.globalData.resourcesHost + 'eat/arrow-up@2x.png',
    imageCompareArrowDown: app.globalData.resourcesHost + 'eat/arrow-down@2x.png',
    imageCompareArrow: app.globalData.resourcesHost + 'eat/arrow@2x.png',
    imageRectangleLeft: app.globalData.resourcesHost + 'eat/rectangle-left@2x.png',
    imageRectangleRight: app.globalData.resourcesHost + 'eat/rectangle-right@2x.png',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoaded: function (options) {
    // console.log(options)
    
    let report1 = JSON.parse(options.report1)
    let report2 = JSON.parse(options.report2)

    //test 升高
    // let report1 = {
    //   date: "2020-11-02 15:09:39",dateText: "吃前",heartRate: 93,id: "bufr1cqvooe97nq1e7l0",riskIndex: 46,timeDetail: "2/11"
    // }
    // let report2 = {
    //   date: "2020-11-03 09:09:36",dateText: "吃前",heartRate: 79,id: "bugarjqvooe97nq1e7n0",riskIndex: 22,timeDetail: "3/11"
    // }
    //降低
    // let report1 = {
    //   date: "2020-09-23 16:17:22",dateText: "吃后",heartRate: 100,id: "btlg94ivooe2568ok710",riskIndex: 77,timeDetail: "23/9"
    // }
    // let report2 = {
    //   date: "2020-11-03 09:09:36",dateText: "吃后",heartRate: 79,id: "bugarjqvooe97nq1e7n0",riskIndex: 22,timeDetail: "3/11"
    // }
    //平衡
    // let report1 = {
    //   date: "2020-10-25 09:41:21",dateText: "吃前",heartRate: 97,id: "bu939gavooeccm4ul6vg",riskIndex: 32,timeDetail: "25/10"
    // }
    // let report2 = {
    //   date: "2020-10-27 11:13:15",dateText: "吃后",heartRate: 97,id: "bubp0iqvooe8pc66o7g0",riskIndex: 32,timeDetail: "27/10"
    // }
    
    this.setData({
      reportBefore: report1,
      reportAfter: report2
    })
    this.compareReport(report1.id, report2.id)
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
    this.selectComponent("#header").showAll("吃对了么")
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
  compareReport: function(reportId1,reportId2){
    let that = this
    wx.request({
      url: app.globalData.apiHost, 
      data: 
      JSON.stringify({
        "method": "ReportAPI.GetComparisonReport",
        "service": "com.jt-health.api.app",
        "request": {
          "user_id": app.getUser().id,
          "user_profile_id": app.getUser().id,
          "language_code": "zh-Hans",
          "first_report_id": reportId1,
          "second_report_id": reportId2
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
          if(res.data.comparison_report){
            let compareReport = res.data.comparison_report
            compareReport.same_risks_count = (compareReport.same_risks_count) > 0 ? compareReport.same_risks_count : 0
            compareReport.decreased_risks_count = (compareReport.decreased_risks_count) > 0 ? compareReport.decreased_risks_count : 0
            compareReport.increased_risks_count = (compareReport.increased_risks_count) > 0 ? compareReport.increased_risks_count : 0
            if(compareReport.improvement_status == "IMPROVEMENT_STATUS_INCREASED"){
              compareReport.resultStatus = 1
            }else if(compareReport.improvement_status == "IMPROVEMENT_STATUS_SAME"){
              compareReport.resultStatus = 2
            }else if(compareReport.improvement_status == "IMPROVEMENT_STATUS_DECREASED"){
              compareReport.resultStatus = 3
            }
            
            let reducingRisk = []
            for(let i = 0; i < compareReport.risk.length; i++){
              let item = compareReport.risk[i]
                if(!(item.former_index_value)){
                  item.former_index_value = '--'
                }
                if(!(item.later_index_value)){
                  item.later_index_value = item.former_index_value
                }
                if(item.former_index_value > 0){
                  item.widthF = parseInt(item.former_index_value * 100 / 520 )
                }else{
                  item.widthF = 0
                }
                if(item.later_index_value > 0){
                  item.widthL = parseInt(item.later_index_value * 100 / 520 )
                }else{
                  item.widthL = 0
                }
                
                if(item.later_index_value > item.former_index_value){
                  item.image = that.data.imageCompareArrowUp
                  item.status = 3
                  
                }else if(item.later_index_value == item.former_index_value){
                  item.image = that.data.imageCompareArrow
                  item.status = 2
                }else{
                  item.image = that.data.imageCompareArrowDown
                  item.status = 1
                }
                reducingRisk.push(item)
            }
            compareReport.reducingRisk = reducingRisk
            

            console.log(compareReport)
            that.setData({
              compareReport: compareReport,
              hasResult: true,
            })
          }else{
            that.setData({
              hasResult: false
            })
          }
        }
        
      },
    })     
  },

})