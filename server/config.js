/**
 * @description: 文件或模块描述
 * @author: zengtiansheng
 * @update: 2017/10/21
 */
'use strict';

const env = process.env.NODE_ENV || 'development'
let config = {}
const common = {
    port: 9449,
    url: 'mongodb://localhost:27017/xcx-dev',
    jwtSecret: 'xcx-server-secret',
    appid: 'wx3bcac52d10a4c3f7',
    secret: '372e7faf186e838d609346914e2b93c8',
    qnaccessKey:'mBoc0ssyOzWX35zHcYVvYw7W357OY-QvOeTqJ0D3',
    qnsecretKey: 'X7vss6_hGyWrPWg9xro98sxRJxbTZxWxCeqONQeW',
}

if (env === 'testing') {
    config = {
        port: 9448,
        url: 'mongodb://localhost:27017/xcx-test',
    }
}

if (env === 'production') {
    config = {
        port: 9449,
        url: 'mongodb://localhost:27017/xcx-prod',
    }
}

module.exports = Object.assign(common, config)