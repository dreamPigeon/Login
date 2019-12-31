/* 
包含n个接口请求函数的模块
*/
import ajax from './ajax'

//发送短信验证码
export const  reqSendCode = (phone) => ajax.get('/sendcode', {
  params: {
    phone
  }
})
