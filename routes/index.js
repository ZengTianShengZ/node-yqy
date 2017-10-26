'use strict';

import v1 from './v1'

export default app => {
    app.use('/v1', v1);
    app.get('/', function (rq,rs) {
		rs.send('ss8888ssssdddddss')
    })
}