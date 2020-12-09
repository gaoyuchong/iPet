// miniprogram/pages/sy/sy.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:"",
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
input1:function(e){
var value=e.detail.value
this.setData({
  id:value
})

}, 
name:function(){
  var id = this.data.id
    wx.navigateTo({
      url: '../index/index?id=' + id,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
},
  /**
   * 生命周期函数--监听页面加载
   */
  
   onLoad: function() {
        // 查看是否授权
        var that=this
        wx.getSetting({
          success (res){
            if (res.authSetting['scope.userInfo']) {
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称
              wx.getUserInfo({
                success: function(res) {
                  console.log(res.userInfo);
                  that.setData({
                    canIUse:0
                  })
                }
              })
              wx.cloud.callFunction({
                name:'getid',
                complete:res=>{
                  var openid = res.result.openid
                  console.log('openid--',openid)
                  wx.setStorage({
                    key:"OpenId",
                    data:openid
                  })
                }
              })
            }
          }
        })
      },
      bindGetUserInfo (e) {
        console.log(e)
      }
})
 
