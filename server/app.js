import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from 'kcors';
import jwtKoa from 'koa-jwt';
import db from './mongodb/db.js';
import config from './config';
import router from './routes/index.js';
import { jwtMiddleware } from './middleware';

const app = new Koa();

app.use(cors());
app.use(bodyParser());
app.use(jwtMiddleware());
app.use(jwtKoa({secret: config.jwtSecret}).unless({
    path: [/^\/v2/] //数组中的路径不需要通过jwt验证
}))
app.use(router.routes());

app.listen(config.port);