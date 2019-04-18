// pages/updateadd/updateadd.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  list:[],
  id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     var id = options.id;
     //console.log(id)
    wx.request({
      url: 'http://127.0.0.1:3000/update_add?id=',
      method: 'get',
      data: { id },
      success: (res) => {
        //console.log(res.data.data)
        this.setData({
          list: res.data.data
        })
      }
    })
  },
  searchProduct:function(e){
   //console.log()
    var id = e.target.dataset.id;
  var uname=e.detail.value.uname;
  //console.log(uname)
  var phone = e.detail.value.phone;
  var addre = e.detail.value.addre;
  var address = e.detail.value.address;
  wx.request({
    url: 'http://127.0.0.1:3000/up_add?id='+id,
    method:'get',
    data:{
      uname:uname,
      phone:phone,
      addre:addre,
      address:address
    
    },
    success:(res)=>{
      var res = res.data.msg;
      wx.showToast({
        title: res,
      })
    }
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