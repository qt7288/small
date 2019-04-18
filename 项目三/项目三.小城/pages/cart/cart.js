
Page({
  data: {
   list:[],
   number:0,
   isHidden:1,
   showModalStatus: true,
   numbers:0,
   sell_all:false,
   batchIds:'',
   a:false,
   lid:'',
   showModalStatus1: true,
   hidden:1,
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: 'http://127.0.0.1:3000/sel',
      method:'get',
      success:(res)=>{
        //console.log(res);
        var rows = res.data.data;
        for(var item of rows){
          item.ck = false;
        }
        this.setData({
          list: rows
        })
      }
    })
    //console.log("ssasas")
    setTimeout(function () {
      wx.hideLoading()
    },1000)
   

  },
  show1:function(){
    wx.showLoading({
      title: '加载中...',
    })     
    wx.request({
      url: 'http://127.0.0.1:3000/sel',
      method:'get',
      success:(res)=>{
        var rows = res.data.data;
        for(var item of rows){
          item.ck = false;
        }
        this.setData({
          list: rows
        })
      }
    })
    setTimeout(function () {
      wx.hideLoading()
    },1000)
   var  list=this.data.list
   ////console.log(list)
  var length=list.length
   this.setData({
     length:length
   })
   //console.log(length)
   },
  show:function(e){
    var that = this;
    that.setData({
      showModalStatus: false//显示编辑运算   
    })
    that.setData({//把选中值，放入判断值中
      isHidden: 0,
    })
  },
  change:function(e){
    var that = this;
    that.setData({
      showModalStatus:true//显示完成删除
    })
    // wx.request({
    //   url: 'http://127.0.0.1:3000/sel',
    //   method:'get',
    //   success:(res)=>{
    //     var rows = res.data.data;
    //     for(var item of rows){
    //       item.ck = false;
    //     }
    //     this.setData({
    //       list: rows
    //     })
    //   }
    // })
    that.setData({//把选中值，放入判断值中
      isHidden: 1,
    })
  },

  component:function(e,id){
    var list = this.data.list;
    var numbers = this.data.numbers;
    var price = e.currentTarget.dataset.price;
    //console.log(price)
    
      if (this.data.a == true) {
        numbers += price
      }else if(this.data.a==false){
        numbers -= price
      }
      this.setData({
        numbers: numbers
      })
 
  },
 rad:function(e){
   var id = e.currentTarget.dataset.id;
   var i = e.currentTarget.dataset.i;
     var list = this.data.list;
     list[i].ck = !list[i].ck;
     ////console.log(list[i].ck)
     this.setData({
       list:list
     })
   ////console.log(this.data.list)
   var count = 0,num = 0;
   for(var item of list){
     if(item.ck){
       count++;
       num+=item.cprice
     }
     ////console.log(this.item)
   }
   this.setData({
     numbers:num
   })
   if(count<this.data.list.length){
     this.setData({
       sell_all:false
     })
   }else{
     this.setData({
       sell_all: true
     })
   }
  },
  selectAll:function(e){
    this.setData({
      sell_all:!this.data.sell_all
    })
    //console.log(this.data.sell_all)
    if(this.data.sell_all){
      var list = this.data.list;
      var num = 0;
      for(var item of list){
        item.ck = true
        num += item.cprice;
      }
      this.setData({
        list:list,
        numbers:num
      })
    }else{
      var list = this.data.list;
      for (var item of list) {
        item.ck = false
        num=0
      }
      this.setData({
        list: list,
        numbers: num
      })
    }
  },
  cal:function(e){
    //console.log(e)
    var list=this.data.list;
    //console.log(list)
      
    if(this.data.numbers==0){
      wx.showToast({
        title: '请选择商品',
      })
    }else{
     for(var item of this.data.list){
      // //console.log(item.ck)
       if(item.ck){
        var did=item.did
        //console.log(did)
        var cprice=item.cprice;
        //console.log(cprice)
        var dname=item.dname;
        var src=item.src;
        var price=item.price;
        var count=item.count;
         var rand = Math.floor(Math.random() * 900) + 100;
         var tro = generateTimeReqestNumber() + rand;
        function pad2(n){
          { return n < 10 ? '0' + n : n }
        }
         function generateTimeReqestNumber() {
           var date = new Date();
           return date.getFullYear().toString() + pad2(date.getMonth() + 1) + pad2(date.getDate()) + pad2(date.getHours()) + pad2(date.getMinutes());
         }
        //  //console.log(tro)
        wx.request({
          url:'http://127.0.0.1:3000/order',
          header: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
          },
          method:'post',
          data: { did, dname, src, price, count, cprice,tro},
          success:(res)=>{
            //console.log(res)
          }
      
        })
      
       }
       wx.navigateTo({
         url: '/pages/order/order',
       })
     }
      wx.request({
        url: 'http://127.0.0.1:3000/del_order',
        method: 'get',
        success: (res) => {
          //console.log(res);
          //console.log("shanchu1wancheng")   
        }
      })    
    }
  },
  ff:function(){
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  del:function(e){ 
    wx.showLoading({
      title: '加载中...',
    })
    // wx.request({
    //   url: 'http://127.0.0.1:3000/del_order',
    //   method: 'get',
    //   success: (res) => {
    //     if(res.data.code==1){
    //       //console.log("删除成功")
    //       this.show1()
    //     }else{
    //       //console.log("删除失败")
    //     }
    //   }
    // })
    //console.log("删除成功")
    setTimeout(function () {
      wx.hideLoading()
    },1000)////console.log(e)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.show1()
    //console.log("页面加载")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.show1()
     // 加载重新发送请求刷新页面
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