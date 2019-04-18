// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
 searchProduct:function(e){
   var key=e.detail.value.key
   //console.log(key)
   wx.request({
     url: 'http://127.0.0.1:3000/search',
     method:'get',
     data:{key:key},
     success:(res)=>{
       //console.log(res)
       this.setData({
         list:res.data.data
       })
     }
   })
  
 },
  detail: function (e) {
    var id = e.target.dataset.id;
    ////console.log(id)
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id,
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