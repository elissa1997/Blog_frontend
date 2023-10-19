import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// import '@/assets/style/public.scss';
import {install} from '@icon-park/vue/es/all';
import dayjs from "dayjs";
import { message } from 'ant-design-vue';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
// import Prism from 'prismjs';


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
