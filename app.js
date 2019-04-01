const handleUserRouter = require('./src/router/user');
const handleBlogRouter = require('./src/router/blog');
const querystring = require('querystring')

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

    getPostData(req).then(postData => {
        req.body = postData;

        // 处理blog路由
        const blogResult = handleBlogRouter(req, res)
        if (blogResult) {
            blogResult.then(blogData => {
                res.end(JSON.stringify(blogData));
            })
            return
        }

        // 处理user路由
        const userResult = handleUserRouter(req, res)
        if (userResult) {
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