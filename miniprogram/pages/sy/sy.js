Page({
  data: {
    id: "",
    access_token: '',
    errcode: ''
  },
  input1: function (e) {
    var value = e.detail.value
    this.setData({
      id: value
    })

  },
  name: function () {
    wx.setStorage({
      key:"id",
      data:this.data.id
    })
    var that = this
    wx.request({
      url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=输入自己的哦~&secret=输入自己的哦~',
      method: 'GET',
      data: {
        access_token: ''
      },
      success: function (res) {
        wx.setStorage({
          key:"token",
          data:res.data.access_token
        })

        console.log(res.data.access_token)
        wx.request({
          url: "https://api.weixin.qq.com/wxa/msg_sec_check?access_token=" + res.data.access_token,
          method: 'POST',
          data: {
            content: that.data.id
          },
          success: function (res) {
            var id = that.data.id
            console.log(res)
            if (res.data.errcode !== 87014) {
              wx.navigateTo({
                url: '../index/index?id=' + id,
                success: function (res) {},
                fail: function (res) {},
                complete: function (res) {},
              })
            } else {
              wx.navigateTo({
                url: '../index/index?id=' +" ",
                success: function (res) {},
                fail: function (res) {},
                complete: function (res) {},
              })
            }
          },
        })

      }
    }), console.log(that.data.access_token)
  }
})