/*
 * @Descripttion: 
 * @Date: 2021-06-29 20:03:32
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-07-04 14:52:56
 * @Author: 作者:Mr Liu(L13831467435@163.com)
 * @CSDN Address: https://blog.csdn.net/weixin_47284756
 */
//引入express模块
const express = require('express')
// 创建 user路由
const user = express.Router()
//从../controller/user 引入sql方法
const {
    userList
} = require('../controller/user')
//引入成功失败 返回方法
var questions=[
    {
    data:213,
    num:444,
    age:12
    },
    {
        data:456,
        num:678,
        age:13
        }];
const {
    success,
    fail
} = require('../model/resModel')
//写接口   /user/userList
user.get('/userList', async (req, res) => {
    //sql返回值
    const result = await userList()
    //返回给前端
    res.send(success('返回的数据', result))
    // res.status(200),
    // res.json(questions)
})
// 暴露
module.exports = user