/**
 * @description: 文件或模块描述
 * @author: zengtiansheng
 * @update: 2017/10/21
 */
'use strict';

module.exports = {
    port: 9449,
    url: 'mongodb://localhost:27017/yqy',
    appid: 'wx3bcac52d10a4c3f7',
    secret: '372e7faf186e838d609346914e2b93c8', // 改
    session: {
        name: 'SID',
        secret: 'SID',
        cookie: {
            httpOnly: true,
            secure:   false,
            maxAge:   365 * 24 * 60 * 60 * 1000,
        }
    }
}