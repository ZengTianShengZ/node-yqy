/**
 * @description: 文件或模块描述
 * @author: zengtiansheng
 * @update: 2017/10/24
 */


import express from 'express';
import UserInfo from '../controller/userInfo/userInfo'
import Dynamic from '../controller/dynamic/dynamic'

const router = express.Router();

router.post('/login', UserInfo.login)
router.post('/postDynamic', Dynamic.postDynamic)
/**
 * 查一条数据
 */
router.post('/getDetailDynamic', Dynamic.getDetailOneDynamic)
/**
 * 查一组数据
 */
router.post('/getConditionDynamic', Dynamic.getConditionDynamic)

router.post('/joinYqy', Dynamic.joinYqy)

export default router