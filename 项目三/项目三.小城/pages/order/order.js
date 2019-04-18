// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   list:[],
   num:0,
   status:'',
   list1:[],
   showModalStatus: false,//显示遮罩
   isHidden: 1,
   numbers:0 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(options.did)
    //var did=options.did
   wx.request({
     url: 'http://127.0.0.1:3000/sel_rorder',
     method:'get',
     success:(res)=>{
     this.setData({
       list:res.data.data
     })
     var num=0
     for(var item of this.data.list){
        num+=item.cprice
       this.setData({
         numbers:num
       })
     }
     }
     
   })
   wx.request({
     url: 'http://127.0.0.1:3000/sel_ad?status=',
     method:'get',
     data:{status:1},
     success:(res)=>{
       //console.log(res)
       this.setData({
         list1:res.data.data
       })
     }

   })
  },
  add:function(){
    wx.navigateTo({
      url: '/pages/address/address',
    })
  },
  showTan: function (e) {
    //console.log(e)
    var that = this;
    that.setData({
      showModalStatus: true//显示遮罩       
    })
    that.setData({//把选中值，放入判断值中
      isHidden: 1,
    })
    var did = e.currentTarget.dataset.id
    //console.log(did)
    
  },
  hideModal: function (e) {
    //console.log(e.currentTarget.dataset.did)
    var lid = e.currentTarget.dataset.did
    var that = this;
    this.setData({
      showModalStatus: false,//隐藏遮罩
    })
    this.setData({
      isHidden: 0
    })  
    wx.request({
      url: 'http://127.0.0.1:3000/up_order',
      method:'get',
      success:(res)=>{
        //console.log(res);
      }
    })
    wx.navigateTo({
      url: '/pages/rorder/rorder?lid='+lid,
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