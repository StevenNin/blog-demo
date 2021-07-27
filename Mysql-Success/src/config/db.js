/*
 * @Descripttion: 
 * @Date: 2021-06-29 20:02:15
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-07-04 14:37:39
 * @Author: 作者:Mr Liu(L13831467435@163.com)
 * @CSDN Address: https://blog.csdn.net/weixin_47284756
 */
// 该项目是模拟实际的开发情形，因此我们需要根据不同的运行环境来进行区分不同的配置，当然在这里我们其实只有一种运行环境，那就是本地环境，但是我们写的需要规范
const env = 'dev' // 环境参数

let MYSQL_CONF

// // 本地环境
if (env == 'dev') {
    // mysql 配置
    MYSQL_CONF = {
        host: 'localhost', //主机名
        user: 'root',
        password: '123456',
        port: 3306, //端口号
        database: 'myblog'

    }

}

// // 线上环境
if (env == 'production') {
    MYSQL_CONF = {
        host: '39.107.113.49', //主机名
        user: 'liuyang',
        password: 'root',
        port: 3306, //端口号
        database: 'liuyang',
        connectionLimit: 0

    }
}

module.exports = {
    MYSQL_CONF
}