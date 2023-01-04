import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/assets/style/public.scss';
import {install} from '@icon-park/vue/es/all';
import dayjs from "dayjs";
import { message } from 'ant-design-vue';
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
// use
Vue.use(mavonEditor)


Vue.config.productionTip = false;

Vue.prototype.$EventBus = new Vue();
Vue.prototype.$screenWidth = undefined;
Vue.prototype.$dayjs = dayjs;
Vue.prototype.$message = message;
install(Vue);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
