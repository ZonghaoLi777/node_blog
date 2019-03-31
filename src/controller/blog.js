const getList = (author, keyword) => {
    return [{
        id: 1,
        title: '标题',
        content: '内容',
        createTime: new Date().getTime(),
        author
    }, {
        id: 2,
        title: '标题2',
        content: '内容2',
        createTime: new Date().getTime(),
        author
    }]
}

const getDetail = (id) => {
    return {
        id: id,
        title: '标题',
        content: '内容',
        createTime: new Date().getTime(),
        author: '张三'  
    }
}

const newBlog = (blogData = {}) => {
    // blog对象
    console.log(blogData)
    return {
        id: 1
    }
}

const updateBlog = (id, blogData = {}) => {
    // 更新博客
    console.log(id, blogData)
    return true
}

const delBlog = (id) => {
    console.log(id);
    return true
}
module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}