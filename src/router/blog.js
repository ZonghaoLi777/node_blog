const {SuccessModel, ErrorModel} = require('../model/resModel')
const {getList, getDetail, newBlog, updateBlog, delBlog} = require('../controller/blog')

const handleBlogRouter = (req, res) => {
    const method = req.method; // GET POST
    const id = req.query.id || '';

    // 获取博客列表
    if (method === 'GET' && req.path === '/api/blog/list') {
        const author = req.query.author || '';
        const keyword = req.query.keyword || '';
        const listData = getList(author, keyword);
        return new SuccessModel(listData, '获取博客列表成功');
    }

    // 获取博客详情
    if (method === 'GET' && req.path === '/api/blog/detail') {
        const data = getDetail(id);
        return new SuccessModel(data, '获取博客详情成功');
    }

    // 新增一篇博客
    if (method === 'POST' && req.path === '/api/blog/new') {
        const data = newBlog(req.body)
        return new SuccessModel(data, '新建博客成功');
    }

    // 更新一篇博客
    if (method === 'POST' && req.path === '/api/blog/update') {
        const isSuccess = updateBlog(id, req.body)
        return isSuccess ? new SuccessModel('博客更新成功') : new ErrorModel('博客更新失败'); 
    }

    // 删除一篇博客
    if (method === 'POST' && req.path === '/api/blog/delete') {
        const isSuccess = delBlog(id)
        return isSuccess ? new SuccessModel('博客删除成功') : new ErrorModel('博客删除失败'); 
    }
}

module.exports = handleBlogRouter;
