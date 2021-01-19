const dateUtil = require("../../utils/date-util.js")
const app = getApp()
var headStartX, headEndX;
var headStartY, headEndY;
var headMoveFlag = true;// 判断执行滑动事件
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    days:{
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    imageArrowLeft: app.globalData.resourcesHost + 'calendar/arrow-left@2x.png',
    imageArrowRight: app.globalData.resourcesHost + 'calendar/arrow-right@2x.png',
    nowDate: dateUtil.dateToYYMMToday(),
    nowDateChinese: dateUtil.dateToYYMMToday('chinese'),
    dayAll: true,
    dayHeight: "660rpx",
  },
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      this.initDays(new Date())
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    setTextUnique: function(inputDate,text,selected,clear){
      console.log(inputDate,text,selected)
      let days = this.data.days
      let selectDay = new Date(inputDate)
      let selectI = null
      for(let i = 0;i < days.length; i++){
        let date = new Date(days[i].id)
        if(selectDay.getFullYear() == date.getFullYear() && selectDay.getMonth() == date.getMonth() && selectDay.getDate() == date.getDate()){
          days[i].text = text
          selectI = i
        }else{
          if(clear){
            if(days[i].type != 4){
              days[i].text = ''
            }
          }else{
            if(days[i].text == text){
              days[i].type = 1
              days[i].text = ''
            }
          }
          
        }
      }
      if(selected && selectI){
        days[selectI].type = 100
      }
      this.setData({
        days: days
      })
    },
    selectDay: function(e){
      let selectDay = new Date(e.currentTarget.dataset.date)
      let days = this.data.days

      for(let i = 0; i < days.length; i++){
        let date = new Date(days[i].id)
        if(selectDay.getFullYear() == date.getFullYear() && selectDay.getMonth() == date.getMonth() && selectDay.getDate() == date.getDate()){
          days[i].type = 4
        }else{
          if(days[i].type == 4){
            days[i].type = 1
          }
        }
      }
      this.setData({
        days: days,
      })
      let item = {date: selectDay}//要传给父组件的参数
      this.triggerEvent('selectDay',item)//通过triggerEvent将参数传给父组件
    },
    //页面左右滑动start
    headTouchStart: function (e) {
      headStartX = e.touches[0].pageX; // 获取触摸时的原点
      headStartY = e.touches[0].pageY; // 获取触摸时的原点
      headMoveFlag = true;
    },
    // 触摸移动事件
    headTouchMove: function (e) {
      headEndX = e.touches[0].pageX; // 获取触摸时的原点
      headEndY = e.touches[0].pageY; // 获取触摸时的原点
      if (headMoveFlag) {
        if (headEndX - headStartX > 10) {
          this.dateChange(1,this.data.nowDate)
          console.log("日历右滑")
          headMoveFlag = false;
        }
        if(headEndY - headStartX > 5){
          console.log("日历下滑")
          if(this.data.days.length < 10){
            this.showAllCalendar()
          }
        }
        if (headStartX - headEndX > 10) {
          this.dateChange(0,this.data.nowDate)
          headMoveFlag = false;
          console.log("日历左滑")
        }
        if(headStartY - headEndY > 5){
          console.log("日历上滑")
          if(this.data.days.length > 10){
            this.showSomeCalendar()
          }
        }
      }
    },
    // 触摸结束事件
    headTouchEnd: function (e) {
      headMoveFlag = true; // 回复滑动事件
    },
    dateChangeTap: function(e){
      const ori = e.currentTarget.dataset.ori
      let date = e.currentTarget.dataset.date
      if(ori != 0 && ori != 1){
        date = e.detail.value
      }
      this.dateChange(ori,date)
    },
    dateChange: function(ori,date){
      if(ori == 0){
        date = dateUtil.getLastMonthYYMM(date)
      }else if(ori == 1){
        date = dateUtil.getNextMonthYYMM(date)
      }
      let dateArr = date.split("-")
      this.setData({
        nowDate: dateArr[0] + - + dateArr[1],
        nowDateChinese: dateArr[0] + '年' + dateArr[1] + '月'
      })
      
      this.initDays(date)
      let item = {date: date}//要传给父组件的参数
      this.triggerEvent('dateChange',item)//通过triggerEvent将参数传给父组件
    },
    initDays: function(inputDate){
      const that = this
      let days = []
      days = that.pushThisMonth(inputDate,days)
      days = that.pushLastMonth(inputDate,days)
      days = that.pushNextMonth(inputDate,days)
      if(this.data.dayAll){
        let height = "550rpx"
        if(days.length > 35){
          height = "660rpx"
        }
        this.setData({
          days: days,
          dayHeight: height,
        })
      }else{
        this.setData({
          days: days.slice(0,7),
          dayHeight: "110rpx"
        })
      }
    },
    pushLastMonth: function(inputDate,days){
      let input = new Date(inputDate)
      let today = dateUtil.dateToYYMMDD(new Date)
      let m = input.getMonth() + 1
      let y = m == 1 ? input.getFullYear() - 1 : input.getFullYear()
      m = m == 1 ? 12 : m - 1//上一个月
      input.setDate(1)
      let week = input.getDay()
      
      //31天
      if(m == 1 || m == 3 || m == 5 || m == 7 || m == 8 || m == 10 || m == 12){
        for(let i = 31; 31 - i < week; i--){
          let id =  y + "-" + m + "-" + i
          let day = {
            "id": id, "value": i + "", "type": 0
          }
          days.unshift(day)
        }  
      }else if(m == 2){
          //29天
          if(y % 4 == 0){
            for(let i = 29; 29 - i < week; i--){
              let id =  y + "-" + m + "-" + i
              let day = {
                "id": id, "value": i + "", "type": 0
              }
              days.unshift(day)
            }  
          //28天
          }else{
            for(let i = 28; 28 - i < week; i--){
              let id =  y + "-" + m + "-" + i
              let day = {
                "id": id, "value": i + "", "type": 0
              }
              days.unshift(day)
            }  
          }

      //30天 
      }else{
        for(let i = 30; 30 - i < week; i--){
          let id =  y + "-" + m + "-" + i
          let day = {
            "id": id, "value": i + "", "type": 0
          }
          days.unshift(day)
        }  
      }
      return days
    },    
    pushThisMonth: function(inputDate,days){
      let input = new Date(inputDate)
      let today = new Date()
      let m = input.getMonth() + 1
      let y = input.getFullYear()
      //31天
      if(m == 1 || m == 3 || m == 5 || m == 7 || m == 8 || m == 10 || m == 12){
        for(let i = 1;i < 32;i++){
          let id =  y + "-" + m + "-" + i
          let day = {
            "id": id, "value": i + "", "type": 1
          }
          if(input.getFullYear() == today.getFullYear() && m == today.getMonth() + 1 && i == today.getDate()){
            day.type = 3
            day.text = "今天"
          }

          days.push(day)
        }
      }else if(m == 2){
          //29天
          if(y % 4 == 0){
            for(let i = 1;i < 30;i++){
              let id =  y + "-" + m + "-" + i
              let day = {
                "id": id, "value": i + "", "type": (id == today) ? 3 : 1
              }
              days.push(day)
            }
          //28天
          }else{
            for(let i = 1;i < 29;i++){
              let id =  y + "-" + m + "-" + i
              let day = {
                "id": id, "value": i + "", "type": (id == today) ? 3 : 1
              }
              days.push(day)
            }
          }

      //30天 
      }else{
        for(let i = 1;i < 31;i++){
          let id =  y + "-" + m + "-" + i
          let day = {
            "id": id, "value": i + "", "type": (id == today) ? 3 : 1
          }
          days.push(day)
        }
      }
      return days
    },
    pushNextMonth: function(inputDate,days){
      let input = new Date(inputDate)
      let today = dateUtil.dateToYYMMDD(new Date)
      let m = input.getMonth() + 1
      let y = m == 12 ? input.getFullYear() + 1 : input.getFullYear()
      m = m == 12 ? 1 : m + 1
      let length = 35
      if(days.length == 35){
        return days
      }else if(days.length > 35){
        length = 42
      }
      for(let i = 1; days.length < length; i++){
        let id =  y + "-" + m + "-" + i
        let day = {
          "id": id, "value": i + "", "type": 0
        }
        days.push(day)
      }
      return days
    },
    setReportData: function(reportData){
      let days = this.data.days
      if(reportData.length > 0){
        for(let i = 0; i < reportData.length; i++){
          let date = new Date(reportData[i]) 
          for(let j = 0;j < days.length; j ++){
            let day = days[j]
            let dayDate = new Date(day.id)
            if(date.getFullYear() == dayDate.getFullYear() && date.getMonth() == dayDate.getMonth() && date.getDate() == dayDate.getDate()){
              if(days[j].type != 4){
                days[j].type = 2
              }
              
            }
          }
        }
        this.setData({days:days})
      }
    },
    showAllCalendar: function(e){
      var that = this;
      var animation = wx.createAnimation({
          duration: 200,
          timingFunction: 'linear'
      })
      that.animation = animation
      animation.height("110rpx").step({ duration: 200 })
      that.setData({
          animationData: animation.export(),
          dayAll: true
      })

      setTimeout(function () {
          animation.height("660rpx").step();
          that.setData({
              animationData: animation.export(),
          },function(){
            that.initDays(that.data.nowDate)
          })
      }, 200)
      
      
    },
    showSomeCalendar: function(e){
      var that = this;
      var animation = wx.createAnimation({
          duration: 200,
          timingFunction: 'linear'
      })
      that.animation = animation
      let height = "550rpx"
      if(that.data.days.length > 35){
        height = "660rpx"
      }
      animation.height(height).step({ duration: 200 })
      that.setData({
          animationData: animation.export(),
          dayAll: false
      })
      setTimeout(function () {
          animation.height("110rpx").step();
          that.setData({
              animationData: animation.export(),
              days: that.data.days.slice(0,7)
          })
      }, 200)
    }
  }
})
