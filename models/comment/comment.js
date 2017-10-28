/**
 * @description: 文件或模块描述
 * @author: zengtiansheng
 * @update: 2017/10/23
 */
import mongoose from 'mongoose'

const Schema = mongoose.Schema

const commentSchema = new Schema({
    dynamicId: String,
    nickName: String,
    avatarUrl: {type: String, default: 'default.jpg'},
    comment: String,
    replyTo: {
        nickName: String,
        comment: String
    }
}, {timestamps: true})
//﻿创建索引 openId， 1 在这里代表正向排序， -1 就逆向
commentSchema.index({dynamicId: 1})

commentSchema.statics.findCommentFormDynamicId = async function (obj_comment) {
    const comment = await this.create(obj_comment)
    return comment
}

commentSchema.statics.findCondition = async function (obj_condition) {
    let {pageNum, pageSize, dynamicId} = obj_condition
    pageNum = parseInt(pageNum)
    pageSize = parseInt(pageSize)
    const totalCount = await this.find({dynamicId: dynamicId}).count()
    const totalPageNum = Math.ceil(totalCount / pageSize)
    let dynamicList = await this.find({dynamicId: dynamicId})
        .sort({createdAt: -1})  // 默认逆向排序，取最新值
        .skip(pageNum * pageSize)
        .limit(pageSize)
    return {
        dynamicList,
        pageNum,
        pageSize,
        totalCount,
        totalPageNum
    }
}

const Comment = mongoose.model('Comment', commentSchema);

export default Comment