const mysql = require('mysql');
const {MYSQL_CONF} = require('../config/db')

// 创建连接对象
const con = mysql.createConnection(MYSQL_CONF);

// 开始链接
con.connect();

// 统一执行sql的函数
function exec(sql) {
    return new Promise((resolve, rejiect) => {
        con.query(sql, (err, result) => {
            if (err) {
                rejiect(err)
                return
            }
            resolve(result)
        })
    })
}

module.exports = {
    exec
}