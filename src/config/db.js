const env = process.env.NODE_ENV // 环境参数

// 配置
let MYSQL_CONF

if(env === 'dev') {
    MYSQL_CONF = {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'password',
        database: 'myblog'
    }
} else {
    MYSQL_CONF = {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'password',
        database: 'myblog'
    }
}
module.exports = {
    MYSQL_CONF
}