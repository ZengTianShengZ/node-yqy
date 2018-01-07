import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from 'kcors';
// import express from 'express';
import db from './mongodb/db.js';
import config from './config';
import router from './routes/index.js';
import winston from 'winston';
import expressWinston from 'express-winston';
// import bodyParser from 'body-parser';

// const app = express();
const app = new Koa();

// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))//extended为false表示使用querystring来解析数据，这是URL-encoded解析器
// // parse application/json
// app.use(bodyParser.json())//添加json解析器
//
// app.all('*', (req, res, next) => {
// 	res.header("Access-Control-Allow-Origin", req.headers.origin || '*');
// 	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
// 	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//   	res.header("Access-Control-Allow-Credentials", true); //可以带cookies
// 	res.header("X-Powered-By", '3.2.1')
// 	if (req.method == 'OPTIONS') {
// 	  	res.send(200);
// 	} else {
// 	    next();
// 	}
// });
// app.use(expressWinston.errorLogger({
//     transports: [
//         new winston.transports.Console({
//           json: true,
//           colorize: true
//         }),
//         new winston.transports.File({
//           filename: 'logs/error.log'
//         })
//     ]
// }));

app.use(cors());
app.use(bodyParser());
app.use(router.routes());

// router(app);

app.listen(config.port);