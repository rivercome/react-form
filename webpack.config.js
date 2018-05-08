const QiniuPlugin = require('qiniu-webpack-plugin')
const {qiniu} = require('./pushConfig')

module.exports = function (webpackConfig, env) {
    if (env !== 'production') {} else {
        webpackConfig.plugins.push(
            new QiniuPlugin({
                ACCESS_KEY: 'd7ZKJbvhgPIYLqOaiKFtyTgV-A2W8fuMpEp13rs1',
                SECRET_KEY: 'SHbtGrVzupLB9vsY2KnGHkZRd53u8YK10vdTLaq8',
                bucket: 'laowang',
                path: 'fe/'
            })
        )
    }
    return webpackConfig
}
