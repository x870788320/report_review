import Vue from 'vue'
import router from './router'
import App from './App.vue'
import plugin from './config/plugin'
import element from './config/ui/element'
import store from './store'
import "./index.css"

Vue.config.productionTip = false
Vue.use(plugin)
Vue.use(element)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
// Vue.use(plugin)
