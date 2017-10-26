/**
 * @description: 文件或模块描述
 * @author: zengtiansheng
 * @update: 2017/10/24
 */
import db from '../mongodb/db.js';

import UserInfoModel from './userInfo/userInfo'

const createUser = new UserInfoModel({
    openId: '221211212',
    nickName: 'zss',
    avatarUrl: 'default.jpg',
    gender: 1, // 默认男
    province: 'dsdsds',
    city: 'ch',
    country: 'zzzz',
});
// createUser.save(function (err,r) {
//     console.log('.....')
//     console.log(err)
//     console.log(r)
// })

// UserInfoModel.findOne((err, data) => {
//     console.log(err)
//
//     console.log(data)
// })

// async function t() {
//     const one = await UserInfoModel.findOne()
//     return one
// }
// t().then((data) => {
//     console.log(data)
// })

async function t() {
    const one = await UserInfoModel.findOpenId('221211212')
    return one
}
t().then((data) => {
    console.log(data)
}).catch(err => {
    console.log(err)

})