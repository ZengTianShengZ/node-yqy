/**
 * @description: 文件或模块描述
 * @author: zengtiansheng
 * @update: 2017/10/23
 */
import BaseComponent from '../../prototype/baseComponent'
import UserInfoModel from '../../models/userInfo/userInfo'

class UserInfo extends BaseComponent{
    constructor(){
        super()
    }
    async login(req, res, next){
        const createUser = new UserInfoModel(userInfo);
        const userinfo = await createUser.save();
        // req.session.user_id = user_id;
        res.send({
            "data": {
                userinfo
            },
            "msg": "",
            "code": '0',
            "success": true
        })
        return
        console.log(req.query)
        const openId = req.query.openId
        const userInfo = req.query.userInfo
        if (openId) {
            console.log('验证码失效')
            res.send({
                code: 1,
                type: 'ERROR_CAPTCHA',
                message: '验证码失效',
            })
            return
        }
        try{
            const user = await UserInfoModel.findOne({openId});
            //创建一个新的用户
            if (!user) {
                const createUser = new UserInfoModel(userInfo);
                const userinfo = await createUser.save();
                // req.session.user_id = user_id;
                res.send({
                    "data": {
                        userinfo
                    },
                    "msg": "",
                    "code": '0',
                    "success": true
                })
            } else {
                res.send({
                    "data": {
                        user
                    },
                    "msg": "",
                    "code": '0',
                    "success": true
                })
            }
        }catch(err){
            console.log('用户登陆失败', err);
            res.send({
                "data": {
                },
                "msg": "用户登陆失败",
                "code": '0001',
                "success": false
            })
        }
    }
}

export default new UserInfo()