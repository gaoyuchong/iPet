const cloud = require('wx-server-sdk')

cloud.init()
 
exports.main = async (event, context) => {
  const { content } = event;
  try {
    var res = ''
    //一次传多个文本，如果有一个不过审，返回审核不通过
    for (var i = 0; i < event.content.length; i++) {

      res = await cloud.openapi.security.msgSecCheck({
        content: event.content[i]
      })
      if (res.errCode == '87014') {
        return res;
      }
    }
    return res;
  } catch (err) {
    return err;
  }
}