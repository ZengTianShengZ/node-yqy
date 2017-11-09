/**
 * @description: 动态
 * @author: zengtiansheng
 * @update: 2017/10/26
 */
import mongoose from 'mongoose'
import * as utils from '../../utils'

const Schema = mongoose.Schema

const dynamicSchema = new Schema({
    openId: String,
    nickName: String,
    avatarUrl: {type: String, default: 'http://oyn5he3v2.bkt.clouddn.com/defaultAvatar.png'},
    location: { type: [ Number ], index: { type: '2dsphere', sparse: true } },
    address: String,
    description: String,
    imgList: [],
    joinIdList:[]
}, {timestamps: true})
//﻿创建索引 openId， 1 在这里代表正向排序， -1 就逆向
dynamicSchema.index({openId: 1})

// 地球半径
const earthRadius = 6378 // km
// 计算距离在地球表面对应的弧度 mongoDB中的maxDistance需要使用弧度
function getDistance( km ){
    return km / earthRadius
}

/**
 * 通过id查找
 * @param _id
 * @returns {Promise.<string>}
 */
dynamicSchema.statics.findForId = async function (_id) {
    let dynamic = ''
    if (_id) {
        dynamic = await this.findById({_id: _id})
    } else {
        dynamic = await this.findOne()
    }
    return dynamic
}
/**
 * 通过 openId 查找
 * @param openId
 * @returns {Promise.<string>}
 */
dynamicSchema.statics.findForOpenId = async function (openId) {
    let dynamic = ''
    if (openId) {
        dynamic = await this.findById({openId: openId})
    } else {
        dynamic = await this.findOne()
    }
    return dynamic
}

dynamicSchema.statics.findOpenIdInJoinIdList = async function (obj_condition) {
    let {pageNum, pageSize, openId} = obj_condition
    pageNum = parseInt(pageNum)
    pageSize = parseInt(pageSize)
    const totalCount = await this.find({'joinIdList.openId': openId}).count()
    const totalPageNum = Math.ceil(totalCount / pageSize)
    let dynamicList = await this.find({'joinIdList.openId': openId})
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
/**
 * 条件查询
 * 1、按时间逆向排序
 * 2、跳过 ~ 条
 * 3、取出 ~ 条
 * @param obj_condition
 * {
 *      "pageNum":1
 *      "pageSize":10,
 * }
 * @returns {Promise.<string>}
 * * {
 *      dynamicList: dynamicList
 *      "pageNum":1
 *      "pageSize":10,
 *      "totalPageNum":40,
        "totalCount":400
 * }
 */
dynamicSchema.statics.findCondition = async function (obj_condition) {
    let {pageNum, pageSize, location} = obj_condition
    pageNum = parseInt(pageNum)
    pageSize = parseInt(pageSize)
    const obj_location = { location: { $nearSphere:location, $maxDistance: getDistance( 16 ) } }
    const totalCount = await this.find(obj_location).count()
    const totalPageNum = Math.ceil(totalCount / pageSize)
    let dynamicList = await this.find(obj_location)
        .sort({createdAt: -1})  // 默认逆向排序，取最新值
        .skip(pageNum * pageSize)
        .limit(pageSize)
    let list = []
    dynamicList.forEach((item, index) => {
        let {_id,openId,nickName,avatarUrl,location,address,description,imgList,joinIdList,createdAt} = item
        const time = utils.timeFormat(createdAt)
        let obj = {
            _id,openId,nickName,avatarUrl,location,address,description,imgList,joinIdList,createdAt,
            time
        }
        list.push(obj)
    })
    return {
        list,
        pageNum,
        pageSize,
        totalCount,
        totalPageNum
    }
}
/**
 * 加入 dynamic yqy
 * @param joinInfo
 * @returns {Promise.<*>}
 */
dynamicSchema.statics.joinYqy = async function (joinInfo) {
    const {id, openId, nickName, avatarUrl} = joinInfo
    const dynamic = await this.findById({_id: id})
    const length = dynamic.joinIdList.length
    if (length) {
        for (let i = 0; i < length; i++) {
            // 遍历 joinIdList 存在该 openId 就不再添加
            if (openId === dynamic.joinIdList[i].openId) {
                return false
            }
        }
    }
    const update = this.update({_id: id},{$push:{joinIdList:{openId, nickName, avatarUrl}}})
    return update
}
const Dynamic = mongoose.model('Dynamic', dynamicSchema);

export default Dynamic