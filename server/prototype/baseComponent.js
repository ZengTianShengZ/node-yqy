import fetch from 'node-fetch'

export default class BaseComponent {
	constructor(){
	}
	async fetch(url = '', data = {}, type = 'GET', resType = 'JSON'){
		type = type.toUpperCase();
		resType = resType.toUpperCase();
		if (type == 'GET') {
			let dataStr = ''; //数据拼接字符串
			Object.keys(data).forEach(key => {
				dataStr += key + '=' + data[key] + '&';
			})

			if (dataStr !== '') {
				dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
				url = url + '?' + dataStr;
			}
		}

		let requestConfig = {
			method: type,
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
		}

		if (type == 'POST') {
			Object.defineProperty(requestConfig, 'body', {
				value: JSON.stringify(data)
			})
		}
		let responseJson;
		try {
			const response = await fetch(url, requestConfig);
			if (resType === 'TEXT') {
				responseJson = await response.text();
			}else{
				responseJson = await response.json();
			}
		} catch (err) {
			console.log('获取http数据失败', err);
			throw new Error(err)
		}
		return responseJson
	}
	isLogin(ctx) {
		if (!ctx.request.body.openId) {
            ctx.body = {
                "data": {},
                "msg": "openId 不存在",
                "code": '4444',
                "success": false
			}
            return false
		} else {
			return true
		}
    }
    tryCatch(ctx, tryFun, catchFun) {
		try {
            tryFun()
		} catch (err) {
            ctx.body = {
                "data": {},
                "msg": "服务器错误",
                "code": '5999',
                "success": false
			}
		}
	}
}