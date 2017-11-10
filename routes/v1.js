/**
 * @description: 需要校验用户信息
 * @author: zengtiansheng
 * @update: 2017/10/24
 */

import express from 'express';
import Dynamic from '../controller/dynamic/dynamic'
import Comment from '../controller/comment/comment'

const router = express.Router();

router.post('/postDynamic', Dynamic.postDynamic)

router.post('/uploadImg', Dynamic.uploadImg)

router.post('/joinYqy', Dynamic.joinYqy)

router.post('/commont', Comment.commont)

router.post('/getUserJoinList', Dynamic.getOpenIdInJoinIdList)

router.post('/getUserDynamicList', Dynamic.findForOpenId)


export default router