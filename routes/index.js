'use strict';

import UserInfo from '../controller/userInfo/userInfo'
import v1 from './v1'
import v2 from './v2'

export default app => {
    app.use('/v1',UserInfo.checkLogin, v1);
    app.use('/v2', v2);
}