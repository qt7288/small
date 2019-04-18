//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
  list:[],
  list1:[],
  clas:1,
  cla:2,
  zannum: 66,
  img_url: "../tabs/zan_01.png"
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    var clas=this.data.clas;
    //console.log(clas)
    var cla = this.data.clas;
    //console.log(cla)
   wx.request({
     url:'http://127.0.0.1:3000/list?clas=',
     method:'get',
     data:{clas:1},
     success:(res)=>{
    ////console.log(res.data.data)
      this.list=res.data.data;
      ////console.log(this.list);
      this.setData({
        list:res.data.data
      })
     }
   })
    wx.request({
      url: 'http://127.0.0.1:3000/list?clas=',
      method: 'get',
      data: { clas: 2 },
      success:(res) => {
        this.list1 = res.data.data;
        this.setData({
          list1: res.data.data
        })

      }
    })
  },
  detail: function (e) {
   var id=e.target.dataset.id;
   //console.log(id)
    wx.navigateTo({
      url: '/pages/detail/detail?id='+id,
    })
  },
  zan: function () {
    var n = this.data.zannum + 1
    var url = "../tabs/zan_02.png"

    this.setData({
      zannum: n,
      img_url: url
    })

  },
})
