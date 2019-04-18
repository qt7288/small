// pages/rorder/rorder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   list:[],
   list1:[],
   select: 0,//商品详情、参数切换
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   ////console.log(options.lid)
    wx.request({
      url: 'http://127.0.0.1:3000/sel_rorderr',
      method: 'get',
      success: (res) => {
        //console.log(res)
        this.setData({
         list:res.data.data
        })
      }
    })
    wx.request({
      url: 'http://127.0.0.1:3000/sel_rorderw',
      method: 'get',
      success: (res) => {
        //console.log(res)
        this.setData({
          list2: res.data.data
        })
      }
    })
    wx.request({
      url: 'http://127.0.0.1:3000/sel_store',
      method: 'get',
      success: (res) => {
        ////console.log(res)
        this.setData({
          list1: res.data.data
        })
      }
    })
    this.cc();
  },
  /**商品详情、参数切换 */
  changeArea: function (e) {
    var that = this;
    var area = e.currentTarget.dataset.area;
    that.setData({ "select": area });
  },
  
 cc:function(){
   var list=this.data.list1;
   //console.log(list)
  
 },
//  reset:function(e){
//    //console.log(e)//
//   var did=e.currentTarget.dataset.id;
//   wx.request({
//     url: 'http://127.0.0.1:3000/del_rorder?did=',
//     data:{did},
//     method:'get',
//     success:(res)=>{
//     var msg1=res.data.msg;
//     wx.showToast({
//       title: msg1,
//     })
//       this.onLoad()
//     }
//   })
 
//  },
gg:function(){
  wx.showToast({
    title: '提醒卖家成功',
  })
},
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})