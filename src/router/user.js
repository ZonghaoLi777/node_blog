const {SuccessModel, ErrorModel} = require('../model/resModel')
const {login} = require('../controller/user')
const { set } = require('../db/redis')

const handleUserRouter = (req, res) => {
    const method = req.method; // GET POST

    // 登陆
    if (method === 'POST' && req.path === '/api/user/login') {
        const {username, password} = req.body;
        const result = login(username, password);
        return result.then(data => {
            if (data.username) {
                req.session.username = data.username;
                req.session.realname = data.realname;
                // 同步到session中
                set(req.sessionId, data)
                return new SuccessModel(data, '登陆成功');
            } 
            return new ErrorModel('登陆失败');
        })
    }

    // 登陆验证的测试
    if (method === 'GET' && req.path === '/api/user/login') {
        if (req.session.username) {
            return Promise.resolve(new SuccessModel('登陆成功'))
        }
        return  Promise.resolve(new ErrorModel('登陆过期！'))
    }
}

module.exports = handleUserRouter;
