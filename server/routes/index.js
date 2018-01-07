'use strict';
import Router from 'koa-router';

import UserInfo from '../controller/userInfo/userInfo'
import v1 from './v1'
import v2 from './v2'

const router = new Router();

router.use('/v1', v1.routes(), v1.allowedMethods());
router.use('/v2', v2.routes(), v2.allowedMethods());

export default router;