/**
 * @description: 文件或模块描述
 * @author: zengtiansheng
 * @update: 2017/10/21
 */
'use strict';

module.exports = {
    port: 8003,
    url: 'mongodb://localhost:27017/yqy',
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