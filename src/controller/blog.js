const { exec } = require('../db/mysql')
const { get } = require('../db/redis')

const getSession = (sessionId) =>{
    return get(sessionId).then(session=>{
        return JSON.parse(session) || {}
    })
}

const getList = (author = '' ,keyword = '' ) =>{

    let sql = `select * from blogs where 1= 1`
    if(author) {
        sql += `and author = '${author}'`
    }
    if(keyword) {
        sql += `and title like '%${keyword}%'`
    }
    sql += `order by createtime desc`

    return exec(sql)
}

const getDetail = (id) =>{
    // 返回假数据
    const sql = `select * from blogs where id = ${id}`
    return exec(sql).then(rows => {
        return rows[0]
    })
}

const newBlog = (blogData ={}) =>{
    // 初始化blogData 为一个博客对象，其中包含title content  author 等属性
    const title = blogData.title
    const content  = blogData.content
    const author = blogData.author
    const createtime  = Date.now()
    const sql = `insert into blogs (title,content,createtime,author) values('${title}','${content}',${createtime},'${author}')`
}

const updateBlog = (id,blogData ={}) =>{
    const title = blogData.title
    const content = blogData.content

    const sql = `update blogs set title = '${title}',content = '${content}' where id = ${id} `
    return exec(sql),then(updateData =>{
        if(updateData.affectedRows >0) {
            return true
        }
        return false
    })
}

const delBlog = (id,author) => {
    const sql = `delete from blogs where id = ${id} and author = '${author}' `
    return exec(sql),then(deleteData => {
        if(deleteData.affectedRows > 0) {
            return true 
        }
        return false
    })
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog,
    getSession

}