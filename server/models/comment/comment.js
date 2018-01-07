/**
 * @description: 文件或模块描述
 * @author: zengtiansheng
 * @update: 2017/10/23
 */
import mongoose from 'mongoose'
import * as utils from '../../utils/index'

const Schema = mongoose.Schema

const commentSchema = new Schema({
    openId: String,
    dynamicId: String,
    nickName: String,
    avatarUrl: {type: String, default: 'http://oyn5he3v2.bkt.clouddn.com/defaultAvatar.png'},
    comment: String,
    replyTo: {
        nickName: String,
        comment: String
    }
}, {timestamps: true})
//﻿创建索引 openId， 1 在这里代表正向排序， -1 就逆向
commentSchema.index({dynamicId: 1})

function listAddTime(list) {
    let arr = []
    list.forEach((item, index) => {
        let {_id,openId,dynamicId,nickName,avatarUrl,comment,replyTo,createdAt} = item
        const time = utils.timeFormat(createdAt)
        let obj = {_id,openId,dynamicId,nickName,avatarUrl,comment,replyTo,createdAt,time}
        arr.push(obj)
    })
    return arr
}
commentSchema.statics.createComment = async function (obj_comment) {
    const comment = await this.create(obj_comment)
    return comment
}

commentSchema.statics.findCondition = async function (obj_condition) {
    let {pageNum, pageSize, dynamicId} = obj_condition
    pageNum = parseInt(pageNum)
    pageSize = parseInt(pageSize)
    const totalCount = await this.find({dynamicId: dynamicId}).count()
    const totalPageNum = Math.ceil(totalCount / pageSize)
    let list = await this.find({dynamicId: dynamicId})
        .sort({createdAt: -1})  // 默认逆向排序，取最新值
        .skip(pageNum * pageSize)
        .limit(pageSize)
    return {
        list : listAddTime(list),
        pageNum,
        pageSize,
        totalCount,
        totalPageNum
    }
}

const Comment = mongoose.model('Comment', commentSchema);

export default Comment