/**
 * @description: 文件或模块描述
 * @author: zengtiansheng
 * @update: 2017/10/24
 */

import UserInfoModel from './userInfo/userInfo'

async function t() {
    const createUser = new UserInfoModel({
        openId: '221211212',
        nickName: 'zss',
        avatarUrl: 'default.jpg',
        gender: 1, // 默认男
        province: 'dsdsds',
        city: 'ch',
        country: 'zzzz',

    });
    const userinfo = await createUser.save()
    console.log(userinfo)
    return userinfo
}
t().then(r => {
    console.log(r)
})