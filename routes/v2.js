/**
 * @description: 不需要校验用户信息
 * @author: zengtiansheng
 * @update: 2017/10/24
 */

import express from 'express';
import utils from '../controller/utils'
import UserInfo from '../controller/userInfo/userInfo'
import Dynamic from '../controller/dynamic/dynamic'
import Comment from '../controller/comment/comment'

const router = express.Router();

router.post('/login', UserInfo.login)

router.post('/getDetailDynamic', Dynamic.getDetailOneDynamic)

router.post('/getJoinList', Dynamic.getOpenIdInJoinIdList)

router.post('/getConditionDynamic', Dynamic.getConditionDynamic)

router.post('/getConditionComment', Comment.getConditionComment)

router.get('/qnUptoken', utils.getQnUptoken)

export default router