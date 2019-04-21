const {exec} = require('../db/mysql')

const getList = (author, keyword) => {
    let sql = `select * from blog where isdel = 0`
    if (author) {
        sql += `and author = ${author}`
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += ` order by createtime desc;`
   
    // 返回promise
    return exec(sql);
}

const getDetail = (id) => {
    let sql = `select * from blog  where isdel = 0 and id = ${id}`

    // 返回promise
    return exec(sql).then(rows => rows[0]);
}

const newBlog = (blogData = {}) => {
    // blog对象
    const {author, title, content} = blogData
    const time = '2019-03-27 00:00:00';
    const sql = `insert into blog (title, content, createtime, updatetime, author)
     values ('${title}', '${content}', '${time}', '${time}', '${author}')`
    return exec(sql).then(data =>({id: data.insertId}))
}

const updateBlog = (id, blogData = {}) => {
    // 更新博客
    const sql = `update blog set title = '${blogData.title}', content = '${blogData.content}', 
    updatetime = '2019-03-27 00:00:00' where id = ${id} and isdel = 0`
    return exec(sql).then(data => {
        if (data.affectedRows > 0) {
            return true
        }
        return false
    })
}

const delBlog = (id, author) => {
    const sql = `update blog set isdel = 1 where id = ${id} and author = ${author}`
    return exec(sql).then(data => {
        if (data.affectedRows > 0) {
            return true
        }
        return false
    })
    return true
}
module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}