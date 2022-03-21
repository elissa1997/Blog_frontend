import Vue from 'vue'
import App from './App.vue'
import router from './router'

import '@/assets/style/public.scss';
import dayjs from "dayjs";
import { message } from 'ant-design-vue';

Vue.config.productionTip = false

Vue.prototype.$dayjs = dayjs;
Vue.prototype.$message = message;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
