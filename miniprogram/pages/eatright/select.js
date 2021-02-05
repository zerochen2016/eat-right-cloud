const app = getApp()
const dateUtil = require("../../utils/date-util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoaded: function (options) {
    console.log("select onLoad",options)
    this.setData({
      ori: options.ori
    })
    let reportBefore, reportAfter = ""
    if(options.reportBeforeJson){
      reportBefore = JSON.parse(options.reportBeforeJson)
      this.setData({
        reportBefore: reportBefore
      })
    }
    if(options.reportAfterJson){
      reportAfter = JSON.parse(options.reportAfterJson)
      this.setData({
        reportAfter: reportAfter
      })
    }
    this.setDate(reportBefore,reportAfter)
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
      //底部导航选中
      let endDate = new Date()
      endDate.setHours(23)
      endDate.setMinutes(59)
      endDate.setSeconds(59)
      let startDate = new Date()
      startDate.setDate(1)
      startDate.setHours(0)
      startDate.setMinutes(0)
      startDate.setSeconds(0)
      //获取报告记录
      this.listReports(startDate,endDate)
      this.selectComponent("#header").showAll("选择报告")
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

  selectDay: function(e){
    let date = e.detail.date
    let endDate = new Date(date)
    endDate.setHours(23)
    endDate.setMinutes(59)
    endDate.setSeconds(59)
    let startDate = new Date(date)
    startDate.setHours(0)
    startDate.setMinutes(0)
    startDate.setSeconds(0)
    this.listReports(startDate,endDate)
  },
  dateChangeTap: function(e){
    this.dateChange(e.detail.date)
  },
  dateChange: function(inputDate){
    let dateArr = new Date(inputDate)
    let y = dateArr.getFullYear()
    let m = dateArr.getMonth() + 1
    let date = new Date()
    date.setFullYear(y)
    date.setMonth(m)
    if(m == 1||m==3||m==5||m==7||m==8||m==10||m==12){
      date.setDate(31)
    }else if(m==2){
      if(y % 4 == 0){
        date.setDate(29)
      }else{
        date.setDate(28)
      }
    }else{
      date.setDate(30)
    }
    
    let endDate = new Date(date)
    endDate.setHours(23)
    endDate.setMinutes(59)
    endDate.setSeconds(59)
    let startDate = new Date(date)
    startDate.setDate(1)
    startDate.setHours(0)
    startDate.setMinutes(0)
    startDate.setSeconds(0)
    this.listReports(startDate,endDate)
    this.setDate(this.data.reportBefore,this.data.reportAfter)
  },
  listReports: function(startDate,endDate){
    let that = this
    let startTimeReq = startDate
    let endTimeReq = endDate
    wx.request({
      url: app.globalData.apiHost, 
      data: 
      JSON.stringify({
        "method": "ReportAPI.ListReports",
        "service": "com.jt-health.api.app",
        "request": {
          "user_id": app.getUser().id,
          "pagination": {
            offset: 1,
            size: 20
          },
          "search_condition": {
            "user_profile_id": app.getUser().id,
            "start_time": startTimeReq,
            "end_time": endTimeReq
            
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
          let reports = []
          let reportTime = []
          if(res.data.health_reports && res.data.health_reports[0]){
            for(let i = 0; i < res.data.health_reports.length; i++){
              let date = new Date(dateUtil.utcToBeiJing(res.data.health_reports[i].create_time))
              let report = {
                id: res.data.health_reports[i].health_report_id,
                riskIndex: res.data.health_reports[i].health_risk_index.index_value,
                heartRate: res.data.health_reports[i].heart_rate,
                time: (date.getMonth() + 1) + "月" + date.getDate() + "日 " + date.getFullYear() + "年",
                enableS: res.data.health_reports[i].enable_statistics,
                date: dateUtil.dateToStringYYMMDD_hhmmss(date),
                time2: date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
              }
              reports.push(report)
              reportTime.push(dateUtil.dateToStringYYMMDD(date))
            }
            that.setData({
              reports: reports,
              
            })
            that.selectComponent(".calendar").setReportData(reportTime)
          }else{
            that.setData({
              reports: []
            })
          }
        }
        
      },
    })     
  },
  setDate: function(reportBefore,reportAfter){
    if(reportBefore){
      this.selectComponent(".calendar").setTextUnique(reportBefore.date,"吃前",true,false)
    }
    if(reportAfter){
      this.selectComponent(".calendar").setTextUnique(reportAfter.date,"吃后",true,false)
    }
    if(reportBefore && reportAfter){
      let beforeTime = new Date(reportBefore.date)
      let afterTime = new Date(reportAfter.date)
      if(beforeTime.getFullYear() == afterTime.getFullYear() && beforeTime.getMonth() == afterTime.getMonth() && beforeTime.getDate() == afterTime.getDate()){
        this.selectComponent(".calendar").setTextUnique(beforeTime,"前后",true,true)
      }
    }
  },
  selectReport: function(e){
    let date = e.currentTarget.dataset.date
    let dateArr = date.split(" ")[0].split("-")
    date = new Date()
    date.setFullYear(parseInt(dateArr[0]))
    date.setMonth(parseInt(dateArr[1]) - 1)
    date.setDate(parseInt(dateArr[2]))
    let id = e.currentTarget.dataset.id
    let heart = e.currentTarget.dataset.heart
    let risk = e.currentTarget.dataset.risk
    const ori = this.data.ori
    let reportBefore = this.data.reportBefore
    let reportAfter = this.data.reportAfter
    if(ori == 1){
      console.log("选中吃前")
      if(reportBefore && !reportAfter){
        reportAfter = {id: id, date: date, riskIndex: risk, heartRate: heart, dateText: dateUtil.getTimeDescritipn(date)}
      }else{
        reportBefore = {id: id, date: date, riskIndex: risk, heartRate: heart, dateText: dateUtil.getTimeDescritipn(date)}
      }
    }else if(ori == 2){
      console.log("选中吃后")
      if(reportAfter && !reportBefore){
        reportBefore = {id: id, date: date, riskIndex: risk, heartRate: heart, dateText: dateUtil.getTimeDescritipn(date)}
      }else{
        reportAfter = {id: id, date: date, riskIndex: risk, heartRate: heart, dateText: dateUtil.getTimeDescritipn(date)}
      }
      
    }
    if(reportBefore && reportAfter){
      let beforeTime = new Date(reportBefore.date)
      let afterTime = new Date(reportAfter.date)
      if(beforeTime.getTime() < afterTime.getTime()){
        let temp = reportBefore
        reportBefore = reportAfter
        reportAfter = temp
      }
    }

    
    let doComparison = false
    if(reportBefore && reportAfter){
      let beforeTime = new Date(reportAfter.date)
      let afterTime = new Date(reportBefore.date)
      if(beforeTime.getTime() < afterTime.getTime()){
        let temp = reportBefore
        reportBefore = reportAfter
        reportAfter = temp
      }

      doComparison = true 
    }
    if(reportBefore){
      reportBefore.timeDetail = dateUtil.getTimeDetail(reportBefore.date)
      if(reportBefore.dateText.length < 1){
        reportBefore.dateText = "吃前"
      }
      this.setData({
        reportBeforeJson: JSON.stringify(reportBefore)
      })
    }
    if(reportAfter){
      reportAfter.timeDetail = dateUtil.getTimeDetail(reportAfter.date)
      if(reportAfter.dateText.length < 1){
        reportAfter.dateText = "吃后"
      }
      this.setData({
        reportAfterJson: JSON.stringify(reportAfter)
      })
    }
    this.setData({
      reportBefore: reportBefore ? reportBefore : null,
      reportAfter: reportAfter ? reportAfter: null,
    })
    this.setDate(reportBefore,reportAfter)
    wx.reLaunch({
      url: '../main/main?index=2&sback=1&reportAfter='+ (reportAfter ? JSON.stringify(reportAfter) : "") + "&reportBefore=" + (reportBefore ? JSON.stringify(reportBefore) : "") + "&do=" + (doComparison ? 1 : 0),
    })
  },
})