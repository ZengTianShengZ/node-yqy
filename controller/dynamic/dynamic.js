/**
 * @description: 发布动态
 * @author: zengtiansheng
 * @update: 2017/10/23
 */
import BaseComponent from '../../prototype/baseComponent'
import UserInfoModel from '../../models/userInfo/userInfo'
import DynamicModel from '../../models/dynamic/dynamic'
import * as utils from '../../utils'

class PostDynamic extends BaseComponent {
    constructor() {
        super()
        this.postDynamic = this.postDynamic.bind(this)
        this.getDetailOneDynamic = this.getDetailOneDynamic.bind(this)
    }
    /**
     * 发布说说
     * @param req
     * @param res
     * @param next
     * @returns {Promise.<void>}
     */
    async postDynamic(req, res, next) {
        console.log(req.body)

        const {openId, imgList, location} = req.body
        if (this.isLogin(req, res, next)) {
            if (!openId) {
                res.send({
                    "data": {},
                    "msg": "openId 不存在,请登录",
                    "code": 4444,
                    "success": false
                })
                return
            }
            try {
                const user = await UserInfoModel.findOpenId(openId);
                if (user) {
                    // 字符串转数组
                    req.body.imgList = imgList.split(",");
                    req.body.location = location.split(",");
                    console.log(req.body)
                    const createDynamic = new DynamicModel(req.body);
                    const dynamic = await createDynamic.save();
                    res.send({
                        "data": {
                        },
                        "msg": "",
                        "code": 0,
                        "success": true
                    })
                } else {
                    res.send({
                        "data": {
                        },
                        "msg": "openId 不存在",
                        "code": 4444,
                        "success": false
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
    async uploadImg(req, res, next) {
        console.log(req.body)
    }
    async getDetailOneDynamic(req, res, next) {
        // const {id} = req.body
        try{
            // 不传 id 默认查找第一条数据
            const data = await DynamicModel.findForId(req.body.id);
            res.send({
                data,
                "msg": "",
                "code": 0,
                "success": false
            })
        } catch (err) {
            res.send({
                "data": {},
                "msg": "服务器错误",
                "code": 5999,
                "success": false
            })
        }
    }
    async findForOpenId(req, res, next) {
        console.log(req.body)
        try{
            // 不传 id 默认查找第一条数据
            const data = await DynamicModel.findForOpenId(req.body);
            res.send({
                data,
                "msg": "",
                "code": 0,
                "success": false
            })
        } catch (err) {
            res.send({
                "data": {},
                "msg": "服务器错误",
                "code": 5999,
                "success": false
            })
        }
    }
    async getOpenIdInJoinIdList(req, res, next) {
        console.log(req.body)
        try{
            // 不传 id 默认查找第一条数据
            const data = await DynamicModel.findOpenIdInJoinIdList(req.body);
            res.send({
                data,
                "msg": "",
                "code": 0,
                "success": false
            })
        } catch (err) {
            res.send({
                "data": {},
                "msg": "服务器错误",
                "code": 5999,
                "success": false
            })
        }
    }
    async getConditionDynamic(req, res, next) {
        const {location} = req.body
        try{
            // 不传 id 默认查找第一条数据
            const arr_location = location.split(",");
            arr_location[0] = parseFloat(arr_location[0])
            arr_location[1] = parseFloat(arr_location[1])
            req.body.location = arr_location
            let data = await DynamicModel.findCondition(req.body);
            res.send({
                data,
                "msg": "",
                "code": 0,
                "success": false
            })
        } catch (err) {
            console.log(err)
            res.send({
                "data": {},
                "msg": "服务器错误",
                "code": 5999,
                "success": false
            })
        }
    }

    async deleteUserDynamic (req, res, next) {
        console.log(req.body)
        let flag = await DynamicModel.deleteUserDynamic(req.body);
        try{
            res.send({
                data: {},
                "msg": "",
                "code": 0,
                "success": flag
            })
        } catch (err){

        }
    }

    async joinYqy(req, res, next) {
        console.log(req.body)
        try{
            const data = await DynamicModel.joinYqy(req.body);
            if (data) {
                res.send({
                    data,
                    "msg": "",
                    "code": 0,
                    "success": true
                })
            } else {
                res.send({
                    data,
                    "msg": "您已经参加该yqy",
                    "code": 2001,
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

export default new PostDynamic()
