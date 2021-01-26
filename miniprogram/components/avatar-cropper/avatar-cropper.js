let mainTouchStartX = 0
let mainTouchStartY = 0
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
    mainHeight: 540,
    mainWidth: 540,
    mainLeft: 105,
    mainTop: 205
  },

  /**
   * 组件的方法列表
   */
  methods: {
    confirmCut: function(e){
      console.log("点击确定")
    },
    cutStart: function(e){
      console.log("cutStart-----",e.touches[0].pageX,e.touches[0].pageY)
      mainTouchStartX = e.touches[0].pageX
      mainTouchStartY = e.touches[0].pageY
    },
    cutEnd: function(e){
      console.log("cutEnd-----",e)
    },
    cutMove: function(e){
      console.log("cutMove-----",e.touches[0].pageX,e.touches[0].pageY)
      
      
    },
    initImg: function(filepath){
      wx.getImageInfo({
        src: filepath,
        success: function(info){
          let width = info.width
          let height = info.height
          console.log(info)
          
          
        }
      })
    },
  }
})
