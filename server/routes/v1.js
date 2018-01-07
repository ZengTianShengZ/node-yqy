/**
 * @description: 需要校验用户信息
 * @author: zengtiansheng
 * @update: 2017/10/24
 */

import Router from 'koa-router';
import Dynamic from '../controller/dynamic/dynamic'
import Comment from '../controller/comment/comment'

const router = new Router();

router.post('/postDynamic', Dynamic.postDynamic)

router.post('/joinYqy', Dynamic.joinYqy)

router.post('/commont', Comment.commont)

router.post('/getUserJoinList', Dynamic.getOpenIdInJoinIdList)

router.post('/getUserDynamicList', Dynamic.findForOpenId)

router.post('/deleteUserDynamic', Dynamic.deleteUserDynamic)


export default router