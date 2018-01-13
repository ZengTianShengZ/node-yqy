/**
 * @description: 文件或模块描述
 * @author: zengtiansheng
 * @update: 2017/11/3
 */
/**
 * ISODate 日期格式化
 * "2017-10-29T15:13:49.263Z"
 * @param time
 * @returns {string}
 */
Array.prototype.unique = function(key) {
    var arr = this;
    var n = [arr[0]];
    for (var i = 1; i < arr.length; i++) {
        if (key === undefined) {
            if (n.indexOf(arr[i]) == -1) n.push(arr[i]);
        } else {
            inner: {
                var has = false;
                for (var j = 0; j < n.length; j++) {
                    if (arr[i][key] == n[j][key]) {
                        has = true;
                        break inner;
                    }
                }
            }
            if (!has) {
                n.push(arr[i]);
            }
        }
    }
    return n;
}

export function timeFormat(t) {
    let now = new Date()
    if ((now.getMonth() === t.getMonth()) && (now.getDate() === t.getDate())) {
        return `今天 ${t.getHours()}：${t.getMinutes()}`
    }
    if ((now.getMonth() === t.getMonth()) && (now.getDate() === (t.getDate()+1))) {
        return `昨天 ${t.getHours()}：${t.getMinutes()}`
    }
    return `${t.getMonth()+1}月${t.getDate()}号`
}
/**
 * $.extend方法原型
 */
export function extend() {
    var target = arguments[0] || {}; //目标对象
    var e = false; //是否进行深拷贝
    var h = 1; //参数个数
    var n = arguments.length; //实际传入的参数个数
    var temp; // 临时保存源参数
    if (typeof target === "boolean") {
        e = arguments[0];
        target = arguments[1] || {};
        //skip the boolean and target
        h = 2;
    }
    // Handle case when target is a string or something (possible in deep copy)
    if (typeof target !== "object" && typeof target !== "function") {
        target = {};
    }
    // extend object itself if only one argument is passed
    if (n === h) {
        target = this;
        --h;
    }
    for (; h < n; h++) {
        temp = arguments[h];
        if (typeof temp !== undefined) {
            for (var t in temp) {
                var src = target[t];
                var copy = temp[t];
                if (target === copy) {
                    continue;
                }
                if (
                    e &&
                    temp[t] &&
                    typeof temp[t] === "object" &&
                    !temp[t].nodeType
                ) {
                    //进行深拷贝
                    target[t] = this.extend(e, src || {}, temp[t]);
                } else {
                    //浅拷贝
                    if (temp[t] !== undefined) {
                        target[t] = temp[t];
                    }
                }
            }
        }
    }
    return target;
}

/**
 * 去重，收尾截取官方动态，避免重复
 * @param arr
 * @param dynamicList
 * @param pageNum
 * @param pageSize
 * @returns {string}
 */
export function sortDynamic(arr, dynamicList, pageNum, pageSize) {
    const len = dynamicList.length
    let arrData = arr.unique('timestamp')
    if (len > 0) {
        const firtId = dynamicList[0]._id
        const lastId = dynamicList[len-1]._id
        let firstIndex = 0
        let lastIndex = arrData.length
        arrData.forEach((item, index) => {
            if (item._id === firtId) {
                firstIndex = index
            }
            if (item._id === lastId) {
                lastIndex = index
            }
        })
        if (pageNum !== 0) {
            arrData = arrData.slice(firstIndex)
        }
        if (pageSize > lastIndex) {
            arrData = arrData.slice(0, lastIndex)
        }
        return arrData
    } else {
        return arrData
    }
}