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