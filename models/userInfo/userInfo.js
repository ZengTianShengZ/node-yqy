/**
 * @description: 文件或模块描述
 * @author: zengtiansheng
 * @update: 2017/10/23
 */
import mongoose from 'mongoose'
const Schema = new mongoose.Schema

const userInfoSchema = new Schema({
    openId: String,
    nickName: String,
    avatarUrl: {type: String, default: 'default.jpg'},
    gender: {type: Number, default: 1}, // 默认男
    province: String,
    city: String,
    country: String,

})
userInfoSchema.index({id: 1})

const UserInfo = mongoose.model('UserInfo', userInfoSchema);

export default UserInfo