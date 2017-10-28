'use strict';

import v1 from './v1'

export default app => {
    // 可以分些路由，登录态路由和业务路由等，登录态路由可以加中间件的形式校验入参
    app.use('/v1', v1);
    app.get('/', function (rq,rs) {
		rs.send('ss8888ssssdddddss')
    })
}