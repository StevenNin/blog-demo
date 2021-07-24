const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { set } = require('../db/redis')

const handleUserRouter = (req,res) => {
    const method = req.method

    if(method === 'POST' && req.path === '/api/user/login') {
        const { username, password } = req.body
        const result = login(username,password)
        return result.then( data => {
            if(data.username) {
                // session 的设置
                req.session.username = data.username
                req.session.password = data.password
                // 登陆时把用户信息存储到redis中，这样就算服务器重启也不会影响之前的登录信息，因为redis和后端服务也是分开的
                set(req.sessionId,req.session)
                return new SuccessModel()
            }
            return new ErrorModel('用户登录失败')
        })
    }
}

module.exports = handleUserRouter