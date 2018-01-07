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
export function timeFormat(time) {
    let t = new Date(time)
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