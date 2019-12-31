import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'lib-flexible'
import * as API from '@/api'
import 'mint-ui/lib/style.css'

// 将API对象挂载到Vue的原型对象上
Vue.prototype.$API = API
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
