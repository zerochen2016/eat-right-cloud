const app = getApp()
const dateUtil = require("../../utils/date-util.js")
const util = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showSelect: false,
    imageEatright: app.globalData.resourcesHost + 'eat/eatright@2x.png',
    imageEatrightGrey: app.globalData.resourcesHost + 'eat/eatright-grey@2x.png',
    imageEatrightUp: app.globalData.resourcesHost + 'eat/eatright-up@2x.png',
    imageEatrightDown: app.globalData.resourcesHost + 'eat/eatright-down@2x.png',
    imageTips: app.globalData.resourcesHost + 'tips@2x.png',
    imageArrow: app.globalData.resourcesHost + 'arrow@2x.png',
    imageCompareUp: app.globalData.resourcesHost + 'eat/compare-up.png',
    imageCompareDown: app.globalData.resourcesHost + 'eat/compare-down.png',
    imageCompare: app.globalData.resourcesHost + 'eat/compare@2x.png',
    imageCompareArrowUp: app.globalData.resourcesHost + 'eat/arrow-up@2x.png',
    imageCompareArrowDown: app.globalData.resourcesHost + 'eat/arrow-down@2x.png',
    imageCompareArrow: app.globalData.resourcesHost + 'eat/arrow@2x.png',
    imageArrow: app.globalData.resourcesHost + 'arrow@2x.png',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoaded: function (options) {

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
    this.selectComponent("#bottom-navigate").changeActiveIndex(2)
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
  /**
   * 
   */
  selectReport: function(e){
    let date = e.currentTarget.dataset.date
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
    if(reportBefore){
      this.selectComponent("#calendar").setTextUnique(reportBefore.date,"吃前",true,false)
    }
    if(reportAfter){
      this.selectComponent("#calendar").setTextUnique(reportAfter.date,"吃后",true,false)
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
      if(beforeTime.getFullYear() == afterTime.getFullYear() && beforeTime.getMonth() == afterTime.getMonth() && beforeTime.getDate() == afterTime.getDate()){
        this.selectComponent("#calendar").setTextUnique(date,"前后",true,true)
      }
      console.log("----comparison",reportBefore.id,reportAfter.id)
      doComparison = true 
    }
    if(doComparison){
      this.compareReport(reportBefore.id,reportAfter.id)
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
      showSelect: false
    })
  },
  openSelectReport: function(e){
    console.log(e)
    this.setData({
      showSelect: true,
      ori: e.currentTarget.dataset.ori
    })
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
    let dateArr = inputDate.split("-")
    let date = null
    if(dateArr[1] == 1||dateArr[1]==3||dateArr[1]==5||dateArr[1]==7||dateArr[1]==8||dateArr[1]==10||dateArr[1]==12){
      date = dateArr[0] + "-" + dateArr[1] + "-31"
    }else if(dateArr[1]==2){
      if(parseInt(dateArr[0]) % 4 == 0){
        date = dateArr[0] + "-" + dateArr[1] + "-29"
      }else{
        date = dateArr[0] + "-" + dateArr[1] + "-28"
      }
    }else{
      date = dateArr[0] + "-" + dateArr[1] + "-30"
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
    let reportBefore = this.data.reportBefore
    if(reportBefore){
      this.selectComponent("#calendar").setTextUnique(reportBefore.date,"吃前",true,false)
    }
    let reportAfter = this.data.reportAfter
    if(reportAfter){
      this.selectComponent("#calendar").setTextUnique(reportAfter.date,"吃后",true,false)
    }
    if(reportBefore && reportAfter){
      let beforeTime = new Date(reportBefore.date)
      let afterTime = new Date(reportAfter.date)
      if(beforeTime.getFullYear() == afterTime.getFullYear() && beforeTime.getMonth() == afterTime.getMonth() && beforeTime.getDate() == afterTime.getDate()){
        this.selectComponent("#calendar").setTextUnique(reportAfter.date,"前后",true,true)
      }
    }
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
            that.selectComponent("#calendar").setReportData(reportTime)
          }else{
            that.setData({
              reports: []
            })
          }
        }
        
      },
    })     
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
            if(!(compareReport.reducing_risks)){
              compareReport.reducing_risks = [compareReport.risk[0],compareReport.risk[1],compareReport.risk[2],compareReport.risk[3]]  
            }else{
              for(let i = 0; i < compareReport.risk.length; i++){
                if(compareReport.reducing_risks.length >= 4){
                  break
                }
                for(let j = 0; j < compareReport.reducing_risks.length; j++){
                  if(compareReport.risk[i].risk_name == compareReport.reducing_risks[j].risk_name){
                    continue
                  }
                }
                compareReport.reducing_risks.push(compareReport.risk[i])
              }
            }
            let reducingRisk = []
            let name1 = compareReport.reducing_risks[0].risk_name
            let name2 = compareReport.reducing_risks[1].risk_name
            let name3 = compareReport.reducing_risks[2].risk_name
            let name4 = compareReport.reducing_risks[3].risk_name
            for(let i = 0; i < compareReport.risk.length; i++){
              if(compareReport.risk[i].risk_name == name1 || compareReport.risk[i].risk_name == name2 || compareReport.risk[i].risk_name == name3 || compareReport.risk[i].risk_name == name4){
                let item = compareReport.risk[i]
                if(!(item.former_index_value)){
                  item.former_index_value = '--'
                }
                if(!(item.later_index_value)){
                  item.later_index_value = item.former_index_value
                }
                if(item.former_index_value > 0){
                  item.widthF = parseInt(item.former_index_value * 100 / 420 )
                }else{
                  item.widthF = 0
                }
                if(item.later_index_value > 0){
                  item.widthL = parseInt(item.later_index_value * 100 / 420 )
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