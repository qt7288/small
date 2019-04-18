// pages/address/address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  list:[{}],
  idd:'',
  select:0,
  sel:true,
  i:0,
  msg:'设为默认',
  msg2:'默认地址'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   wx.request({
     url: 'http://127.0.0.1:3000/sel_add',
     method:'get',
     success:(res)=>{
       var rows = res.data.data;
       for(var item of rows){
         item.sel=false;
       }
       this.setData({
         list:rows
       })
       //console.log(this.data.list)
     }
     
   })
 
  },
  addlist:function(){
   wx.navigateTo({
     url: '/pages/addresslist/addresslist',
   })
  },
  update:function(e){
    var id=e.target.dataset.id;
    //console.log(id)
 wx.navigateTo({
   url: '/pages/updateadd/updateadd?id='+id,
 })
  },
  del(e){
    var id=e.target.dataset.lid;
    //console.log(id);
    wx.request({
      url: 'http://127.0.0.1:3000/del_add?id=',
      method:'get',
      data:{id:id},
      success:(res)=>{
        var res = res.data.msg;
        wx.showToast({
          title: res,
        })
        this.onLoad();
      }
    })
   
  },
  radiochange:function(e){
    var list = this.data.list;
    //console.log(list)
    //console.log(e.target.dataset.id)
    var idx = e.currentTarget.dataset.idx;
    list[idx].sel=!list[idx].sel;
    this.setData({
      list
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