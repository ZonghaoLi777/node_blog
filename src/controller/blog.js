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
module.exports = {
    getList,
    getDetail
}