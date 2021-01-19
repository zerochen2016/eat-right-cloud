// components/chart-brokeline/chart-brokeline.js
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
    points:[
      {value: 0,date: '0'},
      {value: 0,date: '0'},
      {value: 0,date: '0'},
      {value: 0,date: '0'},
      {value: 0,date: '0'},
      {value: 0,date: '0'},
      {value: 0,date: '0'},
      {value: 0,date: '0'},
      ]
  },
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
    },
    ready: function(){
      this.changeStyle(this.data.points, 2)
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    changeStyle: function(points, colorType){
      for(let i = 0; i < points.length; i++){
        let y = parseInt(points[i].value * 4.9)
        let x = i * 100
        points[i].lineHeight = 490 - y
        points[i].pointHeight = 480 - y
        points[i].y = y
        points[i].x = x
      }
      for(let j = 0; j < points.length; j ++){
        if(j < points.length - 1){
          let y1 = points[j].y
          let y2 = points[(j + 1)].y
          let x = 100
          let h = y1 - y2
          let z = Math.sqrt(h * h + x * x)
          let anger = Math.asin(h / z) * 180 / Math.PI
          points[j].z = parseInt(z)
          points[j].anger = anger
          points[j].left = parseInt(z - 100)
        }
        
        
      }
      console.log(points)
      this.changeColor(colorType)
      this.setData({
        points: points.length > 7 ? points.slice(0,7): points
      })
      
    },
    changeColor: function(colorType){
      let lineClass = 'line'
      let pointClass = 'point'
      if(colorType == 1){
        lineClass = 'line-down'
        pointClass = 'point-down'
      }else if(colorType == 3){
        lineClass = 'line-up'
        pointClass = 'point-up'
      }
      this.setData({
        lineClass: lineClass,
        pointClass: pointClass
      })
    }
  }
})
