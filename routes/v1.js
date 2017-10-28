/**
 * @description: 文件或模块描述
 * @author: zengtiansheng
 * @update: 2017/10/24
 */


import express from 'express';
import UserInfo from '../controller/userInfo/userInfo'
import Dynamic from '../controller/dynamic/dynamic'
import Comment from '../controller/comment/comment'

const router = express.Router();

router.post('/login', UserInfo.login)
router.post('/postDynamic', Dynamic.postDynamic)

router.post('/getDetailDynamic', Dynamic.getDetailOneDynamic)

router.post('/getJoinList', Dynamic.getOpenIdInJoinIdList)


router.post('/getConditionDynamic', Dynamic.getConditionDynamic)

router.post('/joinYqy', Dynamic.joinYqy)

router.post('/commont', Comment.commont)

router.post('/getConditionComment', Comment.getConditionComment)


export default router