/**
 * @description: 发布动态
 * @author: zengtiansheng
 * @update: 2017/10/23
 */
import BaseComponent from '../../prototype/baseComponent'
import UserInfoModel from '../../models/userInfo/userInfo'
import DynamicModel from '../../models/dynamic/dynamic'
import * as utils from '../../utils/index'

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
    async postDynamic(ctx) {
        const bodyData = ctx.request.body
        const {openId, imgList, location} = bodyData
        if (this.isLogin(ctx)) {
            if (!openId) {
                ctx.body = {
                    "data": {},
                    "msg": "openId 不存在,请登录",
                    "code": 4444,
                    "success": false
                }
                return
            }
            try {
                const user = await UserInfoModel.findOpenId(openId);
                if (user) {
                    // 字符串转数组
                    bodyData.imgList = imgList.split(",");
                    bodyData.location = location.split(",");
                    const createDynamic = new DynamicModel(bodyData);
                    const dynamic = await createDynamic.save();
                    ctx.body = {
                        "data": {},
                        "msg": "",
                        "code": 0,
                        "success": true
                    }
                } else {
                    ctx.body = {
                        "data": {},
                        "msg": "openId 不存在",
                        "code": 4444,
                        "success": false
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
    async getDetailOneDynamic(ctx) {
        try{
            // 不传 id 默认查找第一条数据
            const data = await DynamicModel.findForId(ctx.request.body.id);
            ctx.body = {
                data,
                "msg": "",
                "code": 0,
                "success": false
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
    async findForOpenId(ctx) {
        try{
            // 不传 id 默认查找第一条数据
            const data = await DynamicModel.findForOpenId(ctx.request.body);
            ctx.body = {
                data,
                "msg": "",
                "code": 0,
                "success": false
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
    async getOpenIdInJoinIdList(ctx) {
        try{
            // 不传 id 默认查找第一条数据
            const data = await DynamicModel.findOpenIdInJoinIdList(ctx.request.body);
            ctx.body = {
                data,
                "msg": "",
                "code": 0,
                "success": false
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
    async getConditionDynamic(ctx) {
        const {location} = ctx.request.body
        try{
            // 不传 id 默认查找第一条数据
            const arr_location = location.split(",");
            arr_location[0] = parseFloat(arr_location[0])
            arr_location[1] = parseFloat(arr_location[1])
            ctx.request.body.location = arr_location
            let data = await DynamicModel.findCondition(ctx.request.body);
            ctx.body = {
                data,
                "msg": "",
                "code": 0,
                "success": false
            }
        } catch (err) {
            console.log(err)
            ctx.body = {
                "data": {},
                "msg": "服务器错误",
                "code": 5999,
                "success": false
            }
        }
    }

    async deleteUserDynamic (ctx) {
        let flag = await DynamicModel.deleteUserDynamic(ctx.request.body);
        try{
            ctx.body = {
                data: {},
                "msg": "",
                "code": 0,
                "success": flag
            }
        } catch (err){

        }
    }

    async joinYqy(ctx) {
        try{
            const data = await DynamicModel.joinYqy(ctx.request.body);
            if (data) {
                ctx.body = {
                    data,
                    "msg": "",
                    "code": 0,
                    "success": true
                }
            } else {
                ctx.body = {
                    data,
                    "msg": "您已经参加该yqy",
                    "code": 2001,
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

export default new PostDynamic()
