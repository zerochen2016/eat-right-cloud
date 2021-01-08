// pages/components/select/select.js
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
    title: '标题',
    option: ['00','11','22'],
    defaultValue: '00',
    showArrow: true

  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindPickerChange: function (e) {
      console.log(this.data.option[e.detail.value])
      this.setData({
        defaultValue: this.data.option[e.detail.value]
      })
    }
  },
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      console.log(this.data)
      
    },
  },
})
