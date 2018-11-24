// vue.config.js
module.exports = {
    // vue脚手架的配置项,测试git push -u origin c
    devServer: {
            proxy: {
            '/ajax': {
                target: 'http://m.maoyan.com',
                changeOrigin: true
                }
            }
      }
  }