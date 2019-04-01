const {SuccessModel, ErrorModel} = require('../model/resModel')
const {loginCheck} = require('../controller/user')

const handleUserRouter = (req, res) => {
    const method = req.method; // GET POST

    // 登陆
    if (method === 'POST' && req.path === '/api/user/login') {
        const {username, password} = req.body;
        const result = loginCheck(username, password);
        return result.then(data => {
            return data.username ? new SuccessModel(data, '登陆成功') : new ErrorModel('登陆失败');
        })
    }
}

module.exports = handleUserRouter;
