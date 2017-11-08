/**
 * @description: 文件或模块描述
 * @author: zengtiansheng
 * @update: 2017/10/23
 */
import qiniu from 'qiniu'
import config from '../../config'

class Utils {
    constructor() {

    }
    async getQnUptoken(req, res, next) {
        console.log('......getQnUptoken......')
        const accessKey = config.qnaccessKey;
        const secretKey = config.qnsecretKey;
        const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
        const options = {
            scope: 'yqyimg',
        };
        const putPolicy = new qiniu.rs.PutPolicy(options);
        const uploadToken = putPolicy.uploadToken(mac);
        res.send({
            uptoken: uploadToken
        })
    }
}

export default new Utils()