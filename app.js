const handleUserRouter = require('./src/router/user');
const handleBlogRouter = require('./src/router/blog');
const querystring = require('querystring')
const { get, set } = require('./src/db/redis')

// 获取cookie的过期时间
const getCookieExpires = () => {
    const d = new Date();
    d.setTime(d.getTime() + (24 * 36000));
    return d.toGMTString();
}

// SESSION 数据
// const SESSION_DATA = {}

// 用于处理POST data
const getPostData = (req) => {
    return new Promise((resolve, reject) => {
        let postData = '';
        if (req.method !== 'POST') {
            resolve({});
            return
        }
        if (req.headers['content-type'] !== 'application/json'){
            resolve({});
            return
        }
        req.on('data', chunk => {
            postData += chunk.toString();
        })
        req.on('end', () => {
            if (!postData) {
                resolve({});
                return
            }
            resolve(JSON.parse(postData));
        })
    })
}

const serverHandle = (req, res) => {
    // 设置返回格式 JSON
    res.setHeader('Content-type', 'application/json');

    // 处理path
    const url = req.url;
    req.path = url.split('?')[0];

    // 处理query
    req.query = querystring.parse(url.split('?')[1])

    // 解析cookie
    req.cookie = {}
    const cookieStr = req.headers.cookie || ''
    cookieStr.split(';').forEach(v => {
        if (v) {
            let arr = v.split('=');
            req.cookie[arr[0].trim()] = arr[1].trim();        
        }
    })

    // 解析session
    // let userId = req.cookie.userid;
    // let needSetCookie = false;
    // if (userId) {
    //     if (!SESSION_DATA[userId]) SESSION_DATA[userId] = {};
    // } else {
    //     needSetCookie = true;
    //     userId = `${Date.now()}_${Math.random()}`;
    //     SESSION_DATA[userId] = {};
    // }
    // req.session = SESSION_DATA[userId];

    // 解析session 使用redis
    let needSetCookie = false;
    let userId = req.cookie.userid;
    if (!userId) {
        needSetCookie = true;
        userId = `${Date.now()}_${Math.random()}`;
        // 初始化redis中的session值
        set(userId, {});
    }
    // 获取session
    res.sessionId = userId
    get(res.sessionId).then(sessionData => {
        if (sessionData === null) {
            // 初始化redis中的session值
            set(req.sessionId, {})
            // 设置session
            req.session = {};
        } else {
            req.session = sessionData;
        }
        return getPostData(req);
    })
    .then(postData => {
        req.body = postData;

        // 处理blog路由
        const blogResult = handleBlogRouter(req, res)
        if (blogResult) {
            blogResult.then(blogData => {
                if (needSetCookie) {
                    res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`);
                }
                res.end(JSON.stringify(blogData));
            })
            return
        }

        // 处理user路由
        const userResult = handleUserRouter(req, res)
        if (userResult) {
            if (needSetCookie) {
                console.log(res.setHeader)
                res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`);
            }
            userResult.then(userData => {
                res.end(JSON.stringify(userData));
            })
            return
        }

        // 未命中路由，返回404
        res.writeHead(404, {'Content-type': 'text/plain'});
        res.write("404 Not Found\n");
        res.end();
    })
}

module.exports = serverHandle