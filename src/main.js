import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//使用插件
import commonUI from './common'
Vue.prototype.$center = new Vue();
import axios from 'axios'
Vue.use(commonUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

