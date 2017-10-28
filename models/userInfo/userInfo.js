/**
 * @description: 文件或模块描述
 * @author: zengtiansheng
 * @update: 2017/10/23
 */
import mongoose from 'mongoose'
mongoose.Promise = Promise

const Schema = mongoose.Schema

const userInfoSchema = new Schema({
    openId: String,
    nickName: String,
    avatarUrl: {type: String, default: 'default.jpg'},
    gender: {type: Number, default: 1}, // 默认男
    province: String,
    city: String,
    country: String,

}, {timestamps: true})
//﻿创建索引 openId， 1 在这里代表正向排序， -1 就逆向
userInfoSchema.index({openId: 1})

userInfoSchema.statics.findOpenId = async function (openId) {
    const userInfo = await this.findOne({openId: openId})
    return userInfo
}

const UserInfo = mongoose.model('UserInfo', userInfoSchema);

export default UserInfo