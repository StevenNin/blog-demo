const mysql = require('mysql')
const {MYSQL_CONF} = require('../config/db')

const con = mysql.createConnection(MYSQL_CONF)

// 开始连接
con.connect()

// 执行sql的函数
// 有一点，因为p'romise操作的数据库，我们不能关闭数据，否则后面获取不到数据
function exec(sql) {
    const promise = new Promise((resolve,reject) => {
        con.query(sql,(err,result)=>{
            if(err) return reject(err)
            return resolve(result)
        })
    })
    return promise
}

module.exports = {
    exec
}