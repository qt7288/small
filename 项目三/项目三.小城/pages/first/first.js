// pages/first/first.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    motto: '相遇,即是缘分……',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx.switchTab({
      url: '../index/index'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => { 
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        ////console.log(res.userInfo)
         //获取用户名
    var name, avatar;
    wx.request({
      url: 'http://127.0.0.1:3000/reg?uname=' + name + '&avatar=' + avatar,
      header: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
      },
      method: 'post',
      data: {
        name: app.globalData.userInfo.nickName,
        avatar: app.globalData.userInfo.avatarUrl,
      },
      success: (res) => {
        ////console.log(res)
      }
    })
     this.self()
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          //console.log(res.userInfo)
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          
        }

      })

    }
   
   },
  getUserInfo: function (e) {
    ////console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    ////console.log(e.detail.userInfo)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    
  },
  
  self: function () {
    var name = app.globalData.userInfo.nickName;
    ////console.log(name)
    wx.request({
      url: 'http://127.0.0.1:3000/login?uname=' + name,
      method: 'get',
      success: (res) => {
        ////console.log(res.data.data[0].price)
        ////console.log(res)
        this.setData({
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