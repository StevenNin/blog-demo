/*
 * @Descripttion: 
 * @Date: 2021-06-29 20:03:11
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-07-04 14:39:24
 * @Author: 作者:Mr Liu(L13831467435@163.com)
 * @CSDN Address: https://blog.csdn.net/weixin_47284756
 */
function success(msg, data) {
    if (!data) {
        data = ''
    }
    if (!msg) {
        msg = ''
    }
    let value = {
        code: 1,
        data,
        msg
    }
    return value
}

function fail(msg, data) {
    if (!data) {
        data = ''
    }
    if (!msg) {
        msg = ''
    }
    let value = {
        code: 0,
        data,
        msg
    }
    return value
}
module.exports = {
    success,
    fail
}