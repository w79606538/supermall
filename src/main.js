import Vue from 'vue'
import App from './App.vue'
import router from "./router";

Vue.config.productionTip = false

//设置一个$bus对象，让所有组件可共享$bus中的属性集方法
Vue.prototype.$bus = new Vue();

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
