var app=getApp();
// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  list:[],
  did:'',
  animationData: {},//选择动画
  showModalStatus: false,//显示遮罩
  isHidden: 1,
  select: 0,//商品详情、参数切换
  numbers:1,
  price:'',
  uid:'',
  id:'',
  src:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id=options.id;
    var url='http://127.0.0.1:3000/detail?did='+id;
    wx.request({
      url: url,
      method:'get',
      data:{did:id},
      success:(res)=>{
      //console.log(res.data.data[0].price)
        var price=res.data.data[0].price;
       // console.log(price)
       this.setData({
         list: res.data.data
       })
    
      }
      
    })
    var name = app.globalData.userInfo.nickName;
  },
  showTan:function(e){
    var that = this;
    that.setData({
      showModalStatus: true//显示遮罩       
    })
    that.setData({//把选中值，放入判断值中
      isHidden: 1,
    })
  },
  hideModal:function(e){
   var that=this;
   this.setData({
     showModalStatus:false,//隐藏遮罩
   })
  this.setData({
    isHidden: 0
  })
  },
  /**商品详情、参数切换 */
  changeArea: function (e) {
    var that = this;
    var area = e.currentTarget.dataset.area;
    that.setData({ "select": area });
  },
  add:function(e){
  var that=this;
  var count=this.data.numbers+1;
  if(count>20){
    wx.showToast({
      title: '超出库存量'
    })
    return;
  }
  this.setData({
    numbers:count
  })
  },
  reduce:function(){
    var that=this;
    var count=this.data.numbers-1;
    this.setData({
      numbers:count
    })
  },
  //添加购物车
  addcart:function(e){
    var that=this;
    var count=this.data.numbers;
    var price = e.target.dataset.price;
    var cprice=this.data.numbers*price;
    var did=e.target.dataset.id;
    var dname=e.target.dataset.dname;
    var src=e.target.dataset.img;
  wx.request({
    url: 'http://127.0.0.1:3000/add?did='+did+'&dname='+dname+'&src='+src+'&price='+price+'&count='+count+'&cprice='+cprice,
    method:'get',
    success:(res)=>{
    console.log(res)
    }
  })
   wx.showToast({
     title: '添加购物车成功',
   })
   setTimeout(()=>{
    hideModal: this.hideModal()
  },500)
  },
  go:function(){
   wx.navigateTo({
     url: '/pages/index/index',
   })
  },
 
  f1:function(){
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  cc:function(e){
    console.log(e)
    var price = e.target.dataset.price;
    var did = e.target.dataset.id;
    console.log(did)
    var dname = e.target.dataset.dname;
    var src = e.target.dataset.img;
    wx.request({
      url: 'http://127.0.0.1:3000/store?did=',
      header: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
      },
      method: 'post',
      data:{did,dname,price,src},
      success: (res) => {
        var res1 = res.data.msg;
        wx.showToast({
          title: res1,
        })
      }
    })
  }
})