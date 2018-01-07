/**
 * @description: 文件或模块描述
 * @author: zengtiansheng
 * @update: 2017/10/23
 */
import BaseComponent from '../../prototype/baseComponent'
import CommentModel from '../../models/comment/comment'
import UserInfoModel from '../../models/userInfo/userInfo'

class Commont extends BaseComponent {
    constructor() {
        super()
    }
    async commont(ctx) {
        const {openId, dynamicId, comment, replyTo} = ctx.request.body
        try {
            const user = await UserInfoModel.findOpenId(openId);
            const commentData = {
                nickName: user.nickName,
                avatarUrl: user.avatarUrl,
                dynamicId,
                comment,
                replyTo
            }
            const createComment = await CommentModel.createComment(commentData);
            ctx.body = {
                "data": createComment,
                "msg": "",
                "code": 0,
                "success": true
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
    async getConditionComment (ctx) {
        try {
            const data = await CommentModel.findCondition(ctx.request.body);
            ctx.body = {
                data,
                "msg": "",
                "code": 0,
                "success": true
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

export default new Commont()