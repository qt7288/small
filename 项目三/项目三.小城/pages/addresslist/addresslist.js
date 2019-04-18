// pages/addresslist/addresslist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },
  searchProduct:function(e){
    var that=this;
    var uname=e.detail.value.uname;
    var phone = e.detail.value.phone;
    var addre = e.detail.value.addre;
    var address = e.detail.value.address;
    var status=0
    if (!/^1(3|4|5|7|8)\d{9}$/.test(phone)) {
      wx.showModal({
        title: '提示',
        content: '你输入的电话不符，请重新检查填写',
        showCancel: false
      })
      this.setData({
        focus: true
      })
    }
    wx.request({
      url: 'http://127.0.0.1:3000/add_ress',
      header:{
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
      },
      method:'POST',
      data:{uname,phone,addre,address,status},
      success:(res)=>{
        var res=res.data.msg;
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