/**
 * @description: 文件或模块描述
 * @author: zengtiansheng
 * @update: 2017/10/24
 */


import express from 'express';
import UserInfo from '../controller/userInfo/userInfo'
const router = express.Router();

router.post('/login', UserInfo.login);

export default router