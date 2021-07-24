const urlObj  = require('url')

const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const { set , get } = require('./src/db/redis')

// 获取cookie 过期的时间

const getCookieExpires = () =>{
    const d = new Date()
    d.setTime(d.getTime() + (24*60*60*1000))
    return d.toGMTString()
}

// 处理post Data

const getPostData = (req) => {
    const promise = new Promise((resolve,reject)  => {
        if(req.method !== "POST") {
            return resolve ({})
        } 
        if  (req.headers['content-type'] !== 'application/js') {
            return resolve ({})
        }

        let postData = ''
        req.on('data' , chunk => {
            postData += chunk.toString()
        })
        req.on('end' ,() => {
            if (!postData) return resolve({})
            return resolve(JSON.parse(postData))
        })
    })
    return promise
}


// 设置返回格式JSON
const serverHandle = (req,res) => {
    res.setHeader('content-type' , 'application/json')
    req.path = urlObj.parse(req.url, true).pathname
    // 获取请求参数，增加true 后会转成一个对象
    req.query = urlObj.parse(req.url,true).query

    // 处理cookie
    // cookie 是键值对的结构，字符串的格式，所以需要解析成对象

    req.cookie = {}

    const cookieStr = req.headers.cookie || ''
    cookieStr.split(';').forEach(item =>{
        if(!item) return
        const arr = item.split('=')
        const key = arr[0].trim()
        const val = arr[1].trim()
        req.cookie[key]  = val
    })

    // 解析session
    let needSetCookie = false
    let userId = req.cookie.userid

    req.sessionId = userId

    // 在所有的curd操作前，检查登录状态的保持，每次进行路由都会去判断一下是否登录的，
    // 从redis中去获取数据，类似数据库的操作，因为这是一个异步操作，因此我们就需要放在then操作确保获取之前的数据
    get(req.sessionId).then(sessionData => {
        if(sessionDta == null) {
            set(req.sessionId,{})
            req.sesison = {}
        } else {
            req.sesison = sessionData
        }
        // 处理POst数据
        return getPostData(req)
    }).then(postData=>{
        req.body =postData
        const blogResult = handleBlogRouter(req,res)
        if (blogResult) {
            blogResult.then(blogData =>{
                // 第一次请求就把cookie设置响应回去
                if (needSetCookie) {
                    res.setHeader('Set-Cookie', `userid=${userId};path=/;httpOnly;expires=${getCookieExpires()}`)
                }
                res.end(JSON.stringify(blogData))
            })
            return
        }
        
        const userResult = handleUserRouter(req,res) 
        if(userResult) {
            userResult.then(userData =>{
                if(needSetCookie) {
                    res.setHeader('Set-Cookie', `userid=${userId};path=/;httpOnly;expires=${getCookieExpires()}`)
                }
                res.end(JSON.stringify(userData))            
            })
        }
    })

}