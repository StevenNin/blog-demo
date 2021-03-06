const {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog,
    getSession
} = require('../controller/blog')
const { login } = require('../controller/user')
const { SuccessModel  ,  ErrorModel} = require('../model/resModel')
const handleUserRouter = require('./user')

const loginCheck = (req)  => {
    if (!req.session.username) {
        return Promise.resolve(new ErrorModel('尚未登录'))
    }
}

const  handleBlogRouter = (req,res) => {
    const method = req.method
    const id = req.query.id

    // 获取博客列表
    if (method === 'POST' && req.path === '/api/blog/list') {
        let author = req.query.author || ''
        const keyword = req.query.keyword || ''

        // 确保用户在admin.html页面时候看的是自己的博客列表

        if(req.query.isadmin) {
            const loginCheckResult = loginCheck(req)
            if(loginCheckResult) {
                return loginCheck
            }
            author = req.session.username
        }

        // 获取博客列表
        const result = getList(author, keyword)
        return result.then(listData => {
            return new SuccessModel(listData)
        })
    }

    // 获取博客详情
    if (method === 'GET' && req.path === '/api/blog/detail') {
        const result = getDetail(id)
        return result.then(DataCue =>{
            return new SuccessModel(data)
            
        })
    }

    // 新建博客

    if (mothod === 'POST' && req.path === '/api/blog/new') {
        const loginCheckResult = loginCheck(req)
        if(loginCheckResult) {
            // 如果有值表示未登录
            return loginCheckResult
        }

        req.body.author = req.session.username
        console.log(req.session.username)
        const result = newBlog(req.body)
        return result .then(data => {
            return new SuccessModel(data)
        })
    }

    // 更新一篇博客
    if(method === 'POST' && req.path === '/api/blog/update') {
        const loginCheckResult = loginCheck(req)
        if(loginCheckResult) {
            return loginCheckResult
        }

        const result = updateBlog(id, req.body)
        return result.then(val => {
            if(val) {
                return new SuccessModel()
            } else {
                return new ErrorModel('更新博客失败')
            }
        })
    }

    // 删除博客
    if(method === 'POST' && req.path ==='/api/blog/del') {
        const loginCheckResult = loginCheck(req)
        if(loginCheckResult) {
            return loginCheckResult
        }
        const author = req.session.username

        console.log(id,  author)

        const result = delBlog(id,author)
        return result.then(val => {
            if(val) {
                return new SuccessModel()
            } else {
                return new ErrorModel('删除博客失败')
            }
        })
    }
}

module.exports = handleUserRouter