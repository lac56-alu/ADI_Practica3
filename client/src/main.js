import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueRouter from 'vue-router'
import JwPagination from 'jw-vue-pagination';

Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.component('jw-pagination', JwPagination);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

