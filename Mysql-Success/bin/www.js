/*
 * @Descripttion: 
 * @Date: 2021-06-29 20:01:28
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-07-04 14:56:20
 * @Author: 作者:Mr Liu(L13831467435@163.com)
 * @CSDN Address: https://blog.csdn.net/weixin_47284756
 */
//www.js
//引入express
const express = require('express')
// 实例化一个 express的对象
const app = express()
//监听3000端口
var server = app.listen(3000, function () {
    var host = server.address().address
    var port = server.address().port
    if (host == '::') {
        host = 'localhost:'
    }
    console.log("启动成功访问地址 http://", host, port)
})
//暴露
module.exports = app