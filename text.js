// vue.config.js
module.exports = {
    // vue脚手架的配置项,联系切换分支,看看保存了没，再试试能不能pull
    devServer: {
            proxy: {
            '/ajax': {
                target: 'http://m.maoyan.com',
                changeOrigin: true
                }
            }
      }
  }
