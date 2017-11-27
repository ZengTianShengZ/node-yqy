/**
 * @description: 文件或模块描述
 * @author: zengtiansheng
 * @update: 2017/10/23
 */
import BaseComponent from '../../prototype/baseComponent'
import CommentModel from '../../models/comment/comment'

class Commont extends BaseComponent {
    constructor() {
        super()
    }
    async commont(req, res, next) {
        console.log(req.body)
        try {
            const comment = await CommentModel.createComment(req.body);
            res.send({
                "data": comment,
                "msg": "",
                "code": 0,
                "success": true
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
    async getConditionComment (req, res, next) {
        console.log(req.body)
        try {
            const data = await CommentModel.findCondition(req.body);
            res.send({
                data,
                "msg": "",
                "code": 0,
                "success": true
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
}

export default new Commont()