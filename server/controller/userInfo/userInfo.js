/**
 * @description: 文件或模块描述
 * @author: zengtiansheng
 * @update: 2017/10/23
 */
import BaseComponent from '../../prototype/baseComponent'
import UserInfoModel from '../../models/userInfo/userInfo'
import config from '../../config'

class UserInfo extends BaseComponent {
    constructor() {
        super()
        this.login = this.login.bind(this)
    }
    async checkLogin(ctx) {
        const {openId} = ctx.request.body
        if (!openId) {
            ctx.body = {
                "data": {},
                "msg": "openId 不存在",
                "code": 4444,
                "success": false
            }
            return
        } else {
            const user = await UserInfoModel.findOpenId(openId);
            if (user) {
                next()
            } else {
                ctx.body = {
                    "data": {},
                    "msg": "用户不存在",
                    "code": 4999,
                    "success": false
                }
            }
        }
    }
    async login(ctx) {
        const {code, nickName, avatarUrl, gender, province, city, country} = ctx.request.body
        console.log('....code....')
        console.log(code)
        if (!code) {
            ctx.body = {
                "data": {},
                "msg": "没有 code 参数",
                "code": '1',
                "success": false
            }
            return
        }
        let responseJson = await this.fetch('https://api.weixin.qq.com/sns/jscode2session',{
            appid: config.appid,
            secret: config.secret,
            js_code: code,
            grant_type: 'authorization_code'
        })
        const  openId = responseJson.openid
        if (!openId) {
            ctx.body = {
                "data": {},
                "msg": "服务端出错",
                "code": '5555',
                "success": false
            }
            return
        }
        try {
            const user = await UserInfoModel.findOpenId(openId);
            //创建一个新的用户
            if (!user) {
                const createUser = new UserInfoModel({
                    openId,
                    nickName,
                    avatarUrl,
                    gender, // 默认男
                    province,
                    city,
                    country,
                });
                const userinfo = await createUser.save();
                ctx.body = {
                    "data": userinfo,
                    "msg": "",
                    "code": 0,
                    "success": true
                }
            } else {
                ctx.body = {
                    "data": user,
                    "msg": "",
                    "code": 0,
                    "success": true
                }
            }
        } catch (err) {
            ctx.body = {
                "data": {},
                "msg": "服务器错误",
                "code": 5999,
                "success": false
            }
        }
    }
}

export default new UserInfo()