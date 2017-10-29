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
    async checkLogin(req, res, next) {
        const {openId} = req.body
        if (!openId) {
            res.send({
                "data": {},
                "msg": "openId 不存在",
                "code": 4444,
                "success": false
            })
            return
        } else {
            const user = await UserInfoModel.findOpenId(openId);
            if (user) {
                next()
            } else {
                res.send({
                    "data": {},
                    "msg": "用户不存在",
                    "code": 4999,
                    "success": false
                })
            }
        }
    }
    async login(req, res, next) {
        const {code, nickName, avatarUrl, gender, province, city, country} = req.body
        let openId = ''
        // 1、
        const {code} = req.body
        console.log('....code....')
        console.log(code)
        //071RzdJ02oMBeX08qWJ02P04J02RzdJZ
        if (!code) {
            res.send({
                "data": {
                },
                "msg": "没有 code 参数",
                "code": '1',
                "success": false
            })
            return
        }
        let responseJson = await this.fetch('https://api.weixin.qq.com/sns/jscode2session',{
            appid: config.appid,
            secret: config.secret,
            js_code: 'JSCODE',
            grant_type: 'authorization_code'
        })
        console.log('....responseJson....')
        console.log(responseJson)
        if (!responseJson.openid) {
            res.send({
                "data": {
                },
                "msg": "服务端出错",
                "code": '5555',
                "success": false
            })
            return
        }
        openId = responseJson.openid
        // 2、先假设获取到 openid 吧
        if (!openId) {
            res.send({
                "data": {},
                "msg": "openId 不存在",
                "code": 4444,
                "success": false
            })
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
                res.send({
                    "data": {
                        userinfo
                    },
                    "msg": "",
                    "code": 0,
                    "success": true
                })
            } else {
                res.send({
                    "data": {
                        user
                    },
                    "msg": "",
                    "code": 0,
                    "success": true
                })
            }
        } catch (err) {
            res.send({
                "data": {},
                "msg": "服务器错误",
                "code": 5999,
                "success": false
            })
        }
    }
}

export default new UserInfo()