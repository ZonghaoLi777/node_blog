const {SuccessModel, ErrorModel} = require('../model/resModel')
const {loginCheck} = require('../controller/user')

const handleUserRouter = (req, res) => {
    const method = req.method; // GET POST

    // 登陆
    if (method === 'POST' && req.path === '/api/user/login') {
        const {username, password} = req.body;
        const isSuccess = loginCheck(username, password);
        return isSuccess ? new SuccessModel('登陆成功') : new ErrorModel('登陆失败');
    }
}

module.exports = handleUserRouter;
