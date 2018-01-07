import jwt from 'jsonwebtoken';
import config from '../config';

/**
 * 解析 authorization
 * @returns {function(*, *)}
 */
export function jwtMiddleware() {
    return async (ctx, next) => {
        const authorization = ctx.header.authorization  // 获取jwt
        let payload = ''
        if (authorization) {
            try {
                // 解析 authorization 信息
                payload = await jwt.verify(authorization.split(' ')[1], config.jwtSecret)
            } catch (err) {
                payload = ''
            }
        }
        if (payload) {
            ctx.request.body.openId = payload.openId
        }
        // authorization 信息失效返回 code: 4004
        await next().catch((err) => {
            if (401 == err.status) {
                ctx.status = 200;
                ctx.body = {data: {}, code: 4004, msg: 'Authentication Error', success: false};
            } else {
                console.log(err);
            }
        });
    };
}