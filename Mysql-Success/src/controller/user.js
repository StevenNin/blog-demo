/*
 * @Descripttion: 
 * @Date: 2021-06-29 20:02:49
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-07-04 14:54:46
 * @Author: 作者:Mr Liu(L13831467435@163.com)
 * @CSDN Address: https://blog.csdn.net/weixin_47284756
 */
//引入sql方法
const {
    exec
} = require('../db/mysql')
//查询所有用户的sql
const userList = () => {
    const sql = `select * from users`
    return exec(sql).then(rows => {
        return rows || {}
    })
}
//暴露
module.exports = {
    userList
}