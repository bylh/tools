// eslint-disable-next-line @typescript-eslint/no-var-requires
const webpack = require('webpack')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

module.exports = {
    // 部署在testkb.yunxiao.com域名的manager路径下
    publicPath: process.env.VUE_APP_FE_PATH || '/',
    devServer: {
        host: 'local.bylh.top',
        port: 3002,
        open: true,
        disableHostCheck: true
    },
    configureWebpack: {
    // https://juejin.im/post/5d5652446fb9a06afd66004b
    // 防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖(external dependencies)。
    // 例如，从 CDN 引入 jQuery，而不是把它打包：
        externals: {},
        plugins: [
            new webpack.ProvidePlugin({
                feConfig: path.resolve('.', `./src/feConfig/${process.env.VUE_APP_FE_MODE}.js`)
            })
        ]
    }
}
