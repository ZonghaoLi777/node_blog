const {SuccessModel, ErrorModel} = require('../model/resModel')
const {getList, getDetail, newBlog, updateBlog, delBlog} = require('../controller/blog')

const handleBlogRouter = (req, res) => {
    const method = req.method; // GET POST
    const id = req.query.id || '';

    // 获取博客列表
    if (method === 'GET' && req.path === '/api/blog/list') {
        const author = req.query.author || '';
        const keyword = req.query.keyword || '';
        return getList(author, keyword).then(res => {
            return new SuccessModel(res, '获取博客列表成功');
        })
    }

    // 获取博客详情
    if (method === 'GET' && req.path === '/api/blog/detail') {
        return getDetail(id).then(res => {
            return new SuccessModel(res, '获取博客详情成功')
        })
    }

    // 新增一篇博客
    if (method === 'POST' && req.path === '/api/blog/new') {

        req.body.author = 'zhli13'
        return newBlog(req.body).then(res => {
            return new SuccessModel(res, '新建博客成功');
        })
    }

    // 更新一篇博客
    if (method === 'POST' && req.path === '/api/blog/update') {
        const isSuccess = updateBlog(id, req.body)
        return isSuccess.then(res => {
            return res ? new SuccessModel('博客更新成功') : new ErrorModel('博客更新失败'); 
        })
    }

    // 删除一篇博客
    if (method === 'POST' && req.path === '/api/blog/delete') {
        const isSuccess = delBlog(id)        
        return isSuccess.then(res => {
            return res ? new SuccessModel('博客删除成功') : new ErrorModel('博客删除失败'); 
        })
    }
}

module.exports = handleBlogRouter;
